import type { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { ExperienceTimeline } from '@/components/cv/ExperienceTimeline';
import { SkillCard, CATEGORY_CONFIG } from '@/components/cv/SkillCard';
import { EducationCard } from '@/components/cv/EducationCard';
import { ProjectCard } from '@/components/cv/ProjectCard';
import type { Experience, Education, Skill, Project, SkillCategory } from '@/lib/types';

export const metadata: Metadata = {
  title: 'CV Interactivo — David Zamora',
};

const API = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001';
const OPTS = { cache: 'no-store' } as const;

async function fetchJSON<T>(path: string): Promise<T> {
  try {
    const res = await fetch(`${API}${path}`, OPTS);
    if (!res.ok) return [] as unknown as T;
    return res.json();
  } catch {
    return [] as unknown as T;
  }
}

const CATEGORY_ORDER: SkillCategory[] = [
  'Backend', 'Frontend', 'Database', 'DevOps', 'AI', 'Testing',
];

function groupSkills(skills: Skill[]): Map<SkillCategory, Skill[]> {
  const map = new Map<SkillCategory, Skill[]>();
  for (const skill of skills) {
    const arr = map.get(skill.category) ?? [];
    map.set(skill.category, [...arr, skill]);
  }
  return map;
}

export default async function CvInteractivoPage() {
  const [experiences, skills, educations, projects] = await Promise.all([
    fetchJSON<Experience[]>('/api/experience'),
    fetchJSON<Skill[]>('/api/skills'),
    fetchJSON<Education[]>('/api/education'),
    fetchJSON<Project[]>('/api/projects'),
  ]);

  const groupedSkills = groupSkills(skills);
  const categoriesWithSkills = CATEGORY_ORDER.filter((c) => groupedSkills.has(c));

  return (
    <>
      <Navbar />

      <main className="mx-auto max-w-4xl px-4 pb-24 pt-28 md:px-8">

        {/* ── Experiencia ─────────────────────── */}
        <Section
          command="cat experience.json"
          title="Experiencia"
          accent="accent"
        >
          <ExperienceTimeline experiences={experiences} />
        </Section>

        {/* ── Skills ──────────────────────────── */}
        {skills.length > 0 && (
          <Section
            command="ls ./skills --short"
            title="Stack"
            accent="accent"
          >
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {categoriesWithSkills.map((cat) => (
                <SkillCard key={cat} category={cat} skills={groupedSkills.get(cat)!} />
              ))}
            </div>
          </Section>
        )}

        {/* ── Educación ───────────────────────── */}
        {educations.length > 0 && (
          <Section
            command="cat education.json"
            title="Educación"
            accent="purple"
          >
            <div className="flex flex-col gap-3">
              {educations.map((edu) => (
                <EducationCard key={edu.id ?? edu.institution} education={edu} />
              ))}
            </div>
          </Section>
        )}

        {/* ── Proyectos ───────────────────────── */}
        {projects.length > 0 && (
          <Section
            command="ls ./projects --featured"
            title="Proyectos"
            accent="accent"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              {projects.map((proj) => (
                <ProjectCard key={proj.id ?? proj.title} project={proj} />
              ))}
            </div>
          </Section>
        )}

        {experiences.length === 0 && skills.length === 0 && (
          <div className="rounded-lg border border-border bg-surface p-10 text-center">
            <p className="font-mono text-sm text-text-secondary">
              <span className="text-accent">$</span> Base de datos vacía. Ejecuta el seed.
            </p>
          </div>
        )}
      </main>
    </>
  );
}

/* ── Section wrapper ─────────────────────────────── */
function Section({
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
        <h2 className="text-2xl font-bold text-text-primary">{title}</h2>
        <div className={`h-px flex-1 ${dividerColor}`} />
      </div>
      {children}
    </section>
  );
}
