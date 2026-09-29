import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'SimpleNews Media Group - Current Events & Global News',
  description: 'SimpleNews Media Group presents current events, technology, nature, and space in clear language with key vocabulary explanations.',
  openGraph: {
    title: 'SimpleNews Media Group - Current Events & Global News',
    description: 'SimpleNews Media Group presents current events, technology, nature, and space in clear language with key vocabulary explanations.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,600;1,6..72,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-stone-50 text-stone-800 antialiased selection:bg-amber-100 selection:text-amber-900 min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  );
}
