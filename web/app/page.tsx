import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { TerminalWindow } from '@/components/terminal/TerminalWindow';

const TERMINAL_LINES = [
  { command: 'whoami', output: 'David Zamora Pérez', delay: 400 },
  { command: 'cat role.txt', output: 'Backend Developer · Node.js & TypeScript', delay: 200 },
  {
    command: 'cat stack.json | jq .focus',
    output: '"Hexagonal Architecture + DDD + AI-Enhanced Dev"',
    delay: 200,
  },
  { command: 'echo $LOCATION', output: 'Valencia, España 🇪🇸', delay: 200 },
];

export default function HomePage() {
  return (
    <>
      <Navbar />

      <main className="bg-dot-grid relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 pt-14">
        {/* Radial gradient overlay */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 70% 60% at 50% 50%, transparent 0%, #0d1117 100%)',
          }}
        />

        <div className="relative z-10 flex w-full max-w-2xl flex-col items-center gap-8">
          {/* Terminal */}
          <div
            className="w-full"
            style={{ animation: 'fadeInUp 0.6s ease 0.2s both' }}
          >
            <TerminalWindow lines={TERMINAL_LINES} typingSpeed={35} />
          </div>

          {/* CTA buttons */}
          <div
            className="flex flex-wrap justify-center gap-3"
            style={{ animation: 'fadeIn 0.5s ease 0.6s both' }}
          >
            <Link
              href="/cv_interactivo"
              className="rounded border border-accent px-5 py-2.5 font-mono text-sm text-accent transition-all duration-200 hover:bg-accent hover:text-bg"
            >
              ./ver_cv_interactivo
            </Link>
            <Link
              href="/sobre_mi"
              className="rounded border border-border px-5 py-2.5 font-mono text-sm text-text-secondary transition-all duration-200 hover:border-text-secondary hover:text-text-primary"
            >
              ./sobre_mi
            </Link>
            <a
              href="https://www.linkedin.com/in/david-zamora-p%C3%A9rez-26347612b/"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded border border-border px-5 py-2.5 font-mono text-sm text-text-secondary transition-all duration-200 hover:border-text-secondary hover:text-text-primary"
            >
              ./linkedin ↗
            </a>
          </div>
        </div>
      </main>
    </>
  );
}
