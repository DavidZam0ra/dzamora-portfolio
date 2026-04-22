import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'David Zamora Pérez — Backend Developer',
  description:
    'Portfolio de David Zamora Pérez, Backend Developer especializado en Node.js & TypeScript · Hexagonal Architecture + DDD',
  keywords: ['backend', 'nodejs', 'typescript', 'hexagonal architecture', 'ddd'],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
