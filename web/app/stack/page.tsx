import type { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { SkillCard, CATEGORY_CONFIG } from '@/components/cv/SkillCard';
import type { Skill, SkillCategory } from '@/lib/types';

export const metadata: Metadata = {
  title: 'Stack técnico — David Zamora',
};

const CATEGORY_ORDER: SkillCategory[] = [
  'Backend', 'Frontend', 'Database', 'DevOps', 'AI', 'Testing',
];

async function getSkills(): Promise<Skill[]> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001'}/api/skills`,
      { next: { revalidate: 60 } }
    );
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

function groupByCategory(skills: Skill[]): Map<SkillCategory, Skill[]> {
  const map = new Map<SkillCategory, Skill[]>();
  for (const skill of skills) {
    const existing = map.get(skill.category) ?? [];
    map.set(skill.category, [...existing, skill]);
  }
  return map;
}

const LEVEL_LABEL: Record<string, string> = {
  expert: 'expert',
  advanced: 'advanced',
  intermediate: 'intermediate',
};

const LEGEND_COLORS: Record<string, string> = {
  expert: 'bg-accent',
  advanced: 'bg-text-secondary',
  intermediate: 'bg-border',
};

export default async function StackPage() {
  const skills = await getSkills();
  const grouped = groupByCategory(skills);

  return (
    <>
      <Navbar />

      <main className="mx-auto max-w-6xl px-4 pb-24 pt-28 md:px-8">
        {/* Terminal header */}
        <div className="mb-2 font-mono text-sm text-accent">
          $ ls ./skills --group-by category
        </div>

        {/* Page title */}
        <h1 className="mb-10 text-3xl font-bold text-text-primary md:text-4xl">
          Stack técnico
        </h1>

        {skills.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            {/* Grid */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {CATEGORY_ORDER.filter((cat) => grouped.has(cat)).map((cat) => (
                <SkillCard key={cat} category={cat} skills={grouped.get(cat)!} />
              ))}
            </div>

            {/* Legend */}
            <div className="mt-10 flex flex-wrap items-center gap-5 border-t border-border pt-6">
              {(['expert', 'advanced', 'intermediate'] as const).map((level) => (
                <div key={level} className="flex items-center gap-2">
                  <span className={`inline-block h-2.5 w-2.5 rounded-sm ${LEGEND_COLORS[level]}`} />
                  <span className="font-mono text-xs text-text-secondary">
                    {LEVEL_LABEL[level]}
                  </span>
                </div>
              ))}
            </div>
          </>
        )}
      </main>
    </>
  );
}

function EmptyState() {
  return (
    <div className="rounded-lg border border-border bg-surface p-10 text-center">
      <p className="font-mono text-sm text-text-secondary">
        <span className="text-accent">$</span> No hay skills cargadas todavía.
      </p>
      <p className="mt-2 font-mono text-xs text-text-muted">
        Ejecuta el seed para poblar la base de datos.
      </p>
    </div>
  );
}
