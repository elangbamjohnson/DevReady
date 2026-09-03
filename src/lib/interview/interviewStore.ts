import type {
  InterviewMode,
  DifficultyLevel,
  TopicCategory,
  InterviewSession,
  InterviewResponse,
  InterviewResult,
} from '@/types/interview';

const STORAGE_KEY = 'swiftcraft_interview_sessions_v1';
const CURRENT_VERSION = 1;

export interface StoredInterviewSchema {
  version: number;
  sessions: Record<string, InterviewSession>;
  activeSessionId?: string;
}

// ─── Module-Level Cache & Stability ──────────────────────────────────────────

export const EMPTY_SESSIONS: InterviewSession[] = [];
export const getServerNull = () => null;
export const getServerEmptySessions = () => EMPTY_SESSIONS;

const EMPTY_SCHEMA: StoredInterviewSchema = { version: CURRENT_VERSION, sessions: {} };
let memoryStore: StoredInterviewSchema | null = null;
let cachedHistory: InterviewSession[] = EMPTY_SESSIONS;

function recomputeCache(): void {
  if (!memoryStore) {
    cachedHistory = EMPTY_SESSIONS;
    return;
  }
  cachedHistory = Object.values(memoryStore.sessions).sort(
    (a, b) => new Date(b.startedAt).getTime() - new Date(a.startedAt).getTime()
  );
}

function safeGetStore(): StoredInterviewSchema {
  if (typeof window === 'undefined') {
    return EMPTY_SCHEMA;
  }
  if (memoryStore) {
    return memoryStore;
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      memoryStore = { version: CURRENT_VERSION, sessions: {} };
    } else {
      const parsed = JSON.parse(raw) as StoredInterviewSchema;
      memoryStore = parsed && parsed.sessions ? parsed : { version: CURRENT_VERSION, sessions: {} };
    }
  } catch {
    memoryStore = { version: CURRENT_VERSION, sessions: {} };
  }
  recomputeCache();
  return memoryStore;
}

const listeners = new Set<() => void>();

export function subscribeToInterviewStore(callback: () => void): () => void {
  listeners.add(callback);
  return () => {
    listeners.delete(callback);
  };
}

function safeSaveStore(data: StoredInterviewSchema): void {
  memoryStore = data;
  recomputeCache();
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
      // Quota exceeded or private browsing — fail gracefully
    }
  }
  listeners.forEach((fn) => fn());
}

export interface CreateSessionParams {
  title?: string;
  mode: InterviewMode;
  difficulty: DifficultyLevel;
  categoryIds: TopicCategory[];
  topicIds?: string[];
  questionIds: string[];
}

export const interviewStore = {
  /**
   * Initializes a new interview session and sets it as the active session.
   */
  createSession(params: CreateSessionParams): InterviewSession {
    const store = safeGetStore();
    const id = `session_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;

    const sessionTitle = params.title || `${params.difficulty.toUpperCase()} iOS Interview`;

    const newSession: InterviewSession = {
      id,
      title: sessionTitle,
      mode: params.mode,
      difficulty: params.difficulty,
      categoryIds: params.categoryIds,
      topicIds: params.topicIds || [],
      questionIds: params.questionIds,
      currentIndex: 0,
      startedAt: new Date().toISOString(),
      status: 'active',
      responses: {},
    };

    const updatedSessions = {
      ...store.sessions,
      [id]: newSession,
    };

    safeSaveStore({
      ...store,
      sessions: updatedSessions,
      activeSessionId: id,
    });

    return newSession;
  },

  /**
   * Retrieves a session by its unique ID.
   */
  getSession(sessionId: string): InterviewSession | null {
    const store = safeGetStore();
    return store.sessions[sessionId] ?? null;
  },

  /**
   * Returns the currently active in-progress session, if one exists.
   */
  getActiveSession(): InterviewSession | null {
    const store = safeGetStore();
    if (!store.activeSessionId) return null;
    const session = store.sessions[store.activeSessionId];
    if (session && session.status === 'active') {
      return session;
    }
    return null;
  },

  /**
   * Updates an individual question response in the session.
   */
  updateResponse(sessionId: string, response: InterviewResponse): InterviewSession | null {
    const store = safeGetStore();
    const existing = store.sessions[sessionId];
    if (!existing || existing.status !== 'active') return null;

    const updatedSession: InterviewSession = {
      ...existing,
      responses: {
        ...existing.responses,
        [response.questionId]: {
          ...(existing.responses[response.questionId] || {}),
          ...response,
        },
      },
    };

    safeSaveStore({
      ...store,
      sessions: {
        ...store.sessions,
        [sessionId]: updatedSession,
      },
    });

    return updatedSession;
  },

  /**
   * Advances the question index safely.
   */
  advanceQuestion(sessionId: string): InterviewSession | null {
    const store = safeGetStore();
    const existing = store.sessions[sessionId];
    if (!existing || existing.status !== 'active') return null;

    if (existing.currentIndex < existing.questionIds.length - 1) {
      const updatedSession: InterviewSession = {
        ...existing,
        currentIndex: existing.currentIndex + 1,
      };

      safeSaveStore({
        ...store,
        sessions: {
          ...store.sessions,
          [sessionId]: updatedSession,
        },
      });

      return updatedSession;
    }
    return existing;
  },

  /**
   * Sets previous question index safely.
   */
  previousQuestion(sessionId: string): InterviewSession | null {
    const store = safeGetStore();
    const existing = store.sessions[sessionId];
    if (!existing || existing.status !== 'active') return null;

    if (existing.currentIndex > 0) {
      const updatedSession: InterviewSession = {
        ...existing,
        currentIndex: existing.currentIndex - 1,
      };

      safeSaveStore({
        ...store,
        sessions: {
          ...store.sessions,
          [sessionId]: updatedSession,
        },
      });

      return updatedSession;
    }
    return existing;
  },

  /**
   * Marks a session completed, records the final result, and clears active session ID.
   */
  completeSession(sessionId: string, result: InterviewResult): InterviewSession | null {
    const store = safeGetStore();
    const existing = store.sessions[sessionId];
    if (!existing) return null;

    const updatedSession: InterviewSession = {
      ...existing,
      status: 'completed',
      completedAt: new Date().toISOString(),
      result,
    };

    const nextActive = store.activeSessionId === sessionId ? undefined : store.activeSessionId;

    safeSaveStore({
      ...store,
      sessions: {
        ...store.sessions,
        [sessionId]: updatedSession,
      },
      activeSessionId: nextActive,
    });

    return updatedSession;
  },

  /**
   * Marks a session abandoned and clears active session ID.
   */
  abandonSession(sessionId: string): void {
    const store = safeGetStore();
    const existing = store.sessions[sessionId];
    const nextSessions = { ...store.sessions };

    if (existing) {
      nextSessions[sessionId] = {
        ...existing,
        status: 'abandoned',
        completedAt: new Date().toISOString(),
      };
    }

    const nextActive = store.activeSessionId === sessionId ? undefined : store.activeSessionId;

    safeSaveStore({
      ...store,
      sessions: nextSessions,
      activeSessionId: nextActive,
    });
  },

  /**
   * Returns all previous sessions sorted newest first (stable reference).
   */
  getHistory(): InterviewSession[] {
    safeGetStore();
    return cachedHistory;
  },

  /**
   * Deletes a session by ID.
   */
  deleteSession(sessionId: string): void {
    const store = safeGetStore();
    const nextSessions = { ...store.sessions };
    delete nextSessions[sessionId];

    const nextActive = store.activeSessionId === sessionId ? undefined : store.activeSessionId;

    safeSaveStore({
      ...store,
      sessions: nextSessions,
      activeSessionId: nextActive,
    });
  },
};
