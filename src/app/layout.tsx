import type { Metadata } from 'next';
import { PRODUCT_NAME, PRODUCT_TAGLINE } from '@/lib/constants';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: `${PRODUCT_NAME} — ${PRODUCT_TAGLINE}`,
    template: `%s | ${PRODUCT_NAME}`,
  },
  description:
    'Master Swift, SwiftUI, UIKit, Objective-C and iOS architecture through practical explanations, production-quality code and interview-focused learning.',
  keywords: [
    'iOS developer',
    'Swift',
    'SwiftUI',
    'UIKit',
    'Objective-C',
    'iOS interview',
    'Swift concurrency',
    'iOS architecture',
    'mobile development',
  ],
  openGraph: {
    title: `${PRODUCT_NAME} — ${PRODUCT_TAGLINE}`,
    description:
      'Master Swift, SwiftUI, UIKit, Objective-C and iOS architecture through practical explanations, production-quality code and interview-focused learning.',
    type: 'website',
    locale: 'en_US',
    siteName: PRODUCT_NAME,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${PRODUCT_NAME} — ${PRODUCT_TAGLINE}`,
    description: 'Master iOS development through interview-focused learning.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Prevent flash of wrong theme */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (theme === 'light') {
                    document.documentElement.setAttribute('data-theme', 'light');
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}

