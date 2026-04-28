import type { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { TerminalWindow } from '@/components/terminal/TerminalWindow';
import type { Profile } from '@/lib/types';

export const metadata: Metadata = {
  title: 'Sobre mí — David Zamora',
};

const API = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001';

async function getProfile(): Promise<Profile | null> {
  try {
    const res = await fetch(`${API}/api/profile`, { cache: 'no-store' });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

const FALLBACK: Profile = {
  name: 'David Zamora Pérez',
  role: 'Software Developer · Node.js & TypeScript',
  focus: 'Hexagonal Architecture + DDD + AI-Enhanced Dev',
  location: 'Valencia, España',
  bio: 'Desarrollador Fullstack con más de 4 años en el sector. Especializado en Backend y centrado en construir sistemas escalables con Node.js (TS/JS) y arquitecturas sólidas como Hexagonal y DDD. Me motiva el aprendizaje constante y actualmente aprovecho las herramientas de IA para optimizar mis flujos de desarrollo y mantenerme a la vanguardia de las soluciones técnicas actuales.',
  email: 'david@example.com',
  github: 'https://github.com/DavidZam0ra',
  linkedin: 'https://linkedin.com/in/david-zamora-perez',
};

const QUICK_STATS = (profile: Profile) => [
  {
    icon: '▸',
    label: 'Especialidad',
    value: 'Node.js & TypeScript',
    color: 'text-accent',
  },
  {
    icon: '▸',
    label: 'Arquitectura',
    value: profile.focus.split('+')[0].trim(),
    color: 'text-purple',
  },
  {
    icon: '▸',
    label: 'Ubicación',
    value: profile.location,
    color: 'text-amber',
  },
  {
    icon: '▸',
    label: 'Stack',
    value: 'Backend · APIs · Microservicios',
    color: 'text-accent',
  },
];

export default async function SobreMiPage() {
  const profile = (await getProfile()) ?? FALLBACK;

  const terminalLines = [
    { command: 'cat about.md', delay: 300 },
    { output: profile.name },
    { output: '' },
    ...profile.bio
      .split('. ')
      .filter(Boolean)
      .flatMap((sentence, i, arr) => [
        { output: sentence.trim() + (i < arr.length - 1 ? '.' : '') },
      ]),
  ];

  const stats = QUICK_STATS(profile);

  return (
    <>
      <Navbar />

      <main className="mx-auto max-w-4xl px-4 pb-24 pt-28 md:px-8">

        {/* ── Hero terminal ───────────────────── */}
        <div style={{ animation: 'fadeInUp 0.5s ease 0.1s both' }}>
          <TerminalWindow
            lines={terminalLines}
            typingSpeed={30}
            className="mb-12"
          />
        </div>

        {/* ── Título ──────────────────────────── */}
        <div
          className="mb-10"
          style={{ animation: 'fadeInUp 0.5s ease 0.3s both' }}
        >
          <div className="mb-1 font-mono text-xs text-accent">$ whoami --verbose</div>
          <h1 className="text-3xl font-bold text-text-primary md:text-4xl">
            {profile.name}
          </h1>
          <p className="mt-2 font-mono text-sm text-text-secondary">{profile.role}</p>
        </div>

        {/* ── Quick stats ─────────────────────── */}
        <div
          className="mb-12 grid gap-4 sm:grid-cols-2"
          style={{ animation: 'fadeInUp 0.5s ease 0.4s both' }}
        >
          {stats.map(({ icon, label, value, color }) => (
            <div
              key={label}
              className="flex items-start gap-3 rounded-lg border border-border bg-surface p-4 transition-colors hover:bg-surface-hover"
            >
              <span className={`mt-0.5 font-mono text-sm ${color}`}>{icon}</span>
              <div>
                <p className="font-mono text-xs text-text-muted">{label}</p>
                <p className="mt-0.5 text-sm text-text-primary">{value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ── Links ───────────────────────────── */}
        <div
          className="flex flex-wrap gap-3"
          style={{ animation: 'fadeIn 0.5s ease 0.6s both' }}
        >
          {profile.github && (
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded border border-border px-4 py-2 font-mono text-sm text-text-secondary transition-all hover:border-accent hover:text-accent"
            >
              ./github ↗
            </a>
          )}
          {profile.linkedin && (
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded border border-border px-4 py-2 font-mono text-sm text-text-secondary transition-all hover:border-purple hover:text-purple"
            >
              ./linkedin ↗
            </a>
          )}
          {profile.email && (
            <a
              href={`mailto:${profile.email}`}
              className="rounded border border-border px-4 py-2 font-mono text-sm text-text-secondary transition-all hover:border-amber hover:text-amber"
            >
              ./email ↗
            </a>
          )}
        </div>
      </main>
    </>
  );
}
