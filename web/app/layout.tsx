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
  title: 'David Zamora Pérez — Full Stack Developer',
  description:
    'Portfolio de David Zamora Pérez, Full Stack Developer especializado en Node.js & TypeScript · Hexagonal Architecture + DDD',
  keywords: ['full stack', 'backend', 'frontend', 'nodejs', 'typescript', 'hexagonal architecture', 'ddd'],
  icons: {
    icon: '/logo.png',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
