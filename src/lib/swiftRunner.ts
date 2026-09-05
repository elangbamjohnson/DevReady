// File: src/lib/swiftRunner.ts
// Local native Swift runner helper using child_process.spawn.
// Used as a fallback when Wandbox is unreachable or experiencing upstream outages.

import { spawn } from 'child_process';
import path from 'path';
import fs from 'fs';

export interface RunOutcome {
  kind: 'success' | 'compile' | 'runtime';
  compiler: string;
  output: string;
  error: string;
  exitCode: number;
  signal: string | null;
}

const LOCAL_SWIFT_TIMEOUT_MS = 10000;

export function runLocalSwift(code: string): Promise<RunOutcome> {
  return new Promise((resolve, reject) => {
    try {
      const cacheDir = path.join(process.cwd(), '.swift-cache');
      try {
        if (!fs.existsSync(cacheDir)) {
          fs.mkdirSync(cacheDir, { recursive: true });
        }
      } catch {
        // directory may already exist or cannot be created
      }

      const child = spawn('swift', ['-module-cache-path', cacheDir, '-'], {
        timeout: LOCAL_SWIFT_TIMEOUT_MS,
        stdio: ['pipe', 'pipe', 'pipe'],
      });

      let stdout = '';
      let stderr = '';

      child.stdout.on('data', (chunk) => {
        stdout += chunk.toString();
      });

      child.stderr.on('data', (chunk) => {
        stderr += chunk.toString();
      });

      child.on('error', (err) => {
        reject(err);
      });

      child.on('close', (code, signal) => {
        const exitCode = code ?? (signal ? 137 : 0);
        const trimmedStdout = stdout.trim();
        const trimmedStderr = stderr.trim();

        let kind: 'success' | 'compile' | 'runtime';
        if (exitCode === 0 && !signal) {
          kind = 'success';
        } else if (trimmedStderr.includes('error:') && !trimmedStderr.includes('Fatal error:')) {
          kind = 'compile';
        } else {
          kind = 'runtime';
        }

        resolve({
          kind,
          compiler: 'Apple Swift 6 (native)',
          output: trimmedStdout,
          error: trimmedStderr,
          exitCode,
          signal: signal ?? null,
        });
      });

      child.stdin.write(code);
      child.stdin.end();
    } catch (err) {
      reject(err);
    }
  });
}
