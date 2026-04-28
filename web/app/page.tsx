import { Navbar } from '@/components/layout/Navbar';
import { SideNav } from '@/components/layout/SideNav';
import { FooterBar } from '@/components/layout/FooterBar';
import { TerminalWindow } from '@/components/terminal/TerminalWindow';
import { SkillCard } from '@/components/cv/SkillCard';
import { ExperienceTimeline } from '@/components/cv/ExperienceTimeline';
import { ProjectCard } from '@/components/cv/ProjectCard';
import type {
  Experience,
  Skill,
  Project,
  SkillCategory,
  Profile,
} from '@/lib/types';

const API = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001';

async function fetchJSON<T>(path: string, fallback: T): Promise<T> {
  try {
    const res = await fetch(`${API}${path}`, { cache: 'no-store' });
    if (!res.ok) return fallback;
    const data = await res.json();
    return data ?? fallback;
  } catch {
    return fallback;
  }
}

const PROFILE_FALLBACK: Profile = {
  name: 'David Zamora Pérez',
  role: 'Backend Developer · Node.js & TypeScript',
  focus: 'Hexagonal Architecture + DDD + AI-Enhanced Dev',
  location: 'Valencia, España',
  bio: 'Soy desarrollador Backend especializado en el ecosistema de Node.js y TypeScript. En los últimos años me he enfocado en construir sistemas donde la fiabilidad del dato es crítica, pasando de crear paneles de métricas complejos en mi etapa de Reports a gestionar microservicios de facturación internacional en mi rol actual. Me apasiona trabajar con Arquitectura Hexagonal y DDD porque creo que el código debe ser escalable y fácil de mantener. Además, soy un adoptante entusiasta de la IA, integrándola en mi día a día para ser más eficiente y asegurar la calidad del software que entrego.',
  email: 'david@example.com',
  github: 'https://github.com/DavidZam0ra',
  linkedin: 'https://www.linkedin.com/in/david-zamora-p%C3%A9rez-26347612b/',
};


const CATEGORY_ORDER: SkillCategory[] = [
  'Backend', 'Frontend', 'Database', 'DevOps', 'AI', 'Testing',
];

const LEGEND_COLORS: Record<string, string> = {
  expert: 'bg-accent',
  advanced: 'bg-text-secondary',
  intermediate: 'bg-border',
};

function groupSkills(skills: Skill[]): Map<SkillCategory, Skill[]> {
  const map = new Map<SkillCategory, Skill[]>();
  for (const skill of skills) {
    const arr = map.get(skill.category) ?? [];
    map.set(skill.category, [...arr, skill]);
  }
  return map;
}

export default async function HomePage() {
  const [profile, skills, experiences, projects] = await Promise.all([
    fetchJSON<Profile>('/api/profile', PROFILE_FALLBACK),
    fetchJSON<Skill[]>('/api/skills', []),
    fetchJSON<Experience[]>('/api/experience', []),
    fetchJSON<Project[]>('/api/projects', []),
  ]);

  const groupedSkills = groupSkills(skills);
  const categoriesWithSkills = CATEGORY_ORDER.filter((c) => groupedSkills.has(c));

  const introLines = [
    { command: 'whoami', output: profile.name, delay: 400 },
    { output: '' },
    { command: 'cat role.txt', output: profile.role, delay: 200 },
    { output: '' },
    { command: 'echo $LOCATION', output: `${profile.location} 🇪🇸`, delay: 150 },
    { output: '' },
    { command: 'cat about.md', delay: 300 },
    { output: '' },
    ...profile.bio
      .split('. ')
      .filter(Boolean)
      .map((s, i, arr) => ({
        output: s.trim() + (i < arr.length - 1 ? '.' : ''),
      })),
  ];

  return (
    <>
      <Navbar />
      <SideNav />
      <FooterBar
        name={profile.name}
        role={profile.role}
        location={profile.location}
        github={profile.github}
        linkedin={profile.linkedin}
        email={profile.email}
      />

      {/* ══════════════════════════════════════════════
          § 1 — INICIO
      ══════════════════════════════════════════════ */}
      <section
        id="inicio"
        className="bg-dot-grid relative flex min-h-screen scroll-mt-14 flex-col items-center justify-center overflow-hidden px-4 pt-14 pb-20"
      >
        {/* radial vignette */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 70% 60% at 50% 50%, transparent 0%, #0d1117 100%)',
          }}
        />

        <div
          className="relative z-10 w-full max-w-3xl"
          style={{ animation: 'fadeInUp 0.6s ease 0.2s both' }}
        >
          <TerminalWindow lines={introLines} typingSpeed={30} />
        </div>

        {/* scroll hint */}
        <a
          href="#cv"
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 font-mono text-xs text-text-muted transition-colors hover:text-text-secondary"
          style={{ animation: 'fadeIn 1s ease 1.5s both' }}
          aria-label="Ir al CV"
        >
          <span>scroll</span>
          <span className="block h-4 w-px bg-border" />
          <span>↓</span>
        </a>
      </section>

      {/* ══════════════════════════════════════════════
          § 2 — CV
      ══════════════════════════════════════════════ */}
      <section id="cv" className="scroll-mt-14 border-t border-border">
        <div className="mx-auto max-w-4xl px-4 py-24 md:px-8">
          <div className="mb-2 font-mono text-sm text-accent">$ cat cv.json</div>
          <h2 className="mb-10 text-3xl font-bold text-text-primary md:text-4xl">CV - David Zamora</h2>

          {/* Experiencia */}
          <SubSection command="cat experience.json" title="Experiencia" accent="accent">
            {experiences.length > 0 ? (
              <ExperienceTimeline experiences={experiences} />
            ) : (
              <EmptyState message="No hay experiencia cargada todavía." />
            )}
          </SubSection>

          {experiences.length === 0 && (
            <EmptyState
              message="Base de datos vacía."
              hint="Ejecuta el seed para poblar la base de datos."
            />
          )}

          {/* Descargar CV */}
          <div className="mt-10 border-t border-border pt-8">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="flex flex-col items-center gap-3">
                <a
                  href="/CV-ES-David Zamora Pérez.pdf"
                  download
                  className="flex items-center gap-2 rounded border border-accent px-5 py-2.5 font-mono text-sm text-accent transition-all duration-200 hover:bg-accent hover:text-bg"
                >
                  <span>↓</span>
                  <span>./descargar_cv_es.pdf</span>
                </a>
                <span className="font-mono text-xs text-text-muted">CV — David Zamora Pérez - Spanish.pdf</span>
              </div>

              <div className="flex flex-col items-center gap-3">
                <a
                  href="/CV-EN-David Zamora Pérez.pdf"
                  download
                  className="flex items-center gap-2 rounded border border-accent px-5 py-2.5 font-mono text-sm text-accent transition-all duration-200 hover:bg-accent hover:text-bg"
                >
                  <span>↓</span>
                  <span>./descargar_cv_en.pdf</span>
                </a>
                <span className="font-mono text-xs text-text-muted">CV — David Zamora Pérez - English.pdf</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          § 3 — STACK TÉCNICO
      ══════════════════════════════════════════════ */}
      <section id="stack" className="scroll-mt-14 border-t border-border">
        <div className="mx-auto max-w-6xl px-4 py-24 md:px-8">
          <div className="mb-2 font-mono text-sm text-accent">
            $ ls ./skills --group-by category
          </div>
          <h2 className="mb-10 text-3xl font-bold text-text-primary md:text-4xl">
            Stack técnico
          </h2>

          {skills.length === 0 ? (
            <EmptyState
              message="No hay skills cargadas todavía."
              hint="Ejecuta el seed para poblar la base de datos."
            />
          ) : (
            <>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {categoriesWithSkills.map((cat) => (
                  <SkillCard key={cat} category={cat} skills={groupedSkills.get(cat)!} />
                ))}
              </div>
              <div className="mt-10 flex flex-wrap items-center gap-5 border-t border-border pt-6">
                {(['expert', 'advanced', 'intermediate'] as const).map((level) => (
                  <div key={level} className="flex items-center gap-2">
                    <span className={`inline-block h-2.5 w-2.5 rounded-sm ${LEGEND_COLORS[level]}`} />
                    <span className="font-mono text-xs text-text-secondary">{level}</span>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          § 4 — PROYECTOS
      ══════════════════════════════════════════════ */}
      <section id="proyectos" className="scroll-mt-14 min-h-screen border-t border-border">
        <div className="mx-auto max-w-4xl px-4 pb-32 pt-24 md:px-8">
          <div className="mb-2 font-mono text-sm text-accent">
            $ ls ./projects --featured
          </div>
          <h2 className="mb-10 text-3xl font-bold text-text-primary md:text-4xl">
            Proyectos
          </h2>

          {projects.length === 0 ? (
            <EmptyState
              message="No hay proyectos cargados todavía."
              hint="Ejecuta el seed para poblar la base de datos."
            />
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              {projects.map((proj) => (
                <ProjectCard key={proj.id ?? proj.title} project={proj} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

/* ── Helpers ─────────────────────────────────────────── */

function SubSection({
  command,
  title,
  accent,
  children,
}: {
  command: string;
  title: string;
  accent: 'accent' | 'purple';
  children: React.ReactNode;
}) {
  const cmdColor = accent === 'purple' ? 'text-purple' : 'text-accent';
  const dividerColor = accent === 'purple' ? 'bg-purple/20' : 'bg-accent/20';

  return (
    <section className="mb-16">
      <div className={`mb-1 font-mono text-xs ${cmdColor}`}>$ {command}</div>
      <div className="mb-6 flex items-center gap-4">
        <h3 className="text-2xl font-bold text-text-primary">{title}</h3>
        <div className={`h-px flex-1 ${dividerColor}`} />
      </div>
      {children}
    </section>
  );
}

function EmptyState({ message, hint }: { message: string; hint?: string }) {
  return (
    <div className="rounded-lg border border-border bg-surface p-10 text-center">
      <p className="font-mono text-sm text-text-secondary">
        <span className="text-accent">$</span> {message}
      </p>
      {hint && <p className="mt-2 font-mono text-xs text-text-muted">{hint}</p>}
    </div>
  );
}
