import type { Skill, SkillCategory } from '@/lib/types';

interface CategoryConfig {
  dotClass: string;
  textClass: string;
  borderClass: string;
  bgClass: string;
}

export const CATEGORY_CONFIG: Record<SkillCategory, CategoryConfig> = {
  Backend:  { dotClass: 'bg-accent',  textClass: 'text-accent',  borderClass: 'border-accent/20',  bgClass: 'bg-accent/5'  },
  Frontend: { dotClass: 'bg-purple',  textClass: 'text-purple',  borderClass: 'border-purple/20',  bgClass: 'bg-purple/5'  },
  Database: { dotClass: 'bg-amber',   textClass: 'text-amber',   borderClass: 'border-amber/20',   bgClass: 'bg-amber/5'   },
  DevOps:   { dotClass: 'bg-accent',  textClass: 'text-accent',  borderClass: 'border-accent/20',  bgClass: 'bg-accent/5'  },
  AI:       { dotClass: 'bg-pink',    textClass: 'text-pink',    borderClass: 'border-pink/20',    bgClass: 'bg-pink/5'    },
  Testing:  { dotClass: 'bg-blue',    textClass: 'text-blue',    borderClass: 'border-blue/20',    bgClass: 'bg-blue/5'    },
};

const LEVEL_DOTS: Record<Skill['level'], number> = {
  expert: 3,
  advanced: 2,
  intermediate: 1,
};

function LevelDots({ level, colorClass }: { level: Skill['level']; colorClass: string }) {
  const filled = LEVEL_DOTS[level];
  return (
    <span className="flex items-center gap-0.5">
      {Array.from({ length: 3 }).map((_, i) => (
        <span
          key={i}
          className={[
            'inline-block h-1.5 w-1.5 rounded-full',
            i < filled ? colorClass : 'bg-border',
          ].join(' ')}
        />
      ))}
    </span>
  );
}

interface SkillCardProps {
  category: SkillCategory;
  skills: Skill[];
}

export function SkillCard({ category, skills }: SkillCardProps) {
  const cfg = CATEGORY_CONFIG[category];

  return (
    <div
      className={[
        'rounded-lg border p-5 transition-colors duration-200 hover:bg-surface-hover',
        cfg.borderClass,
        'bg-surface',
      ].join(' ')}
    >
      {/* Card header */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className={`h-2.5 w-2.5 rounded-full ${cfg.dotClass}`} />
          <span className={`font-mono text-sm font-medium ${cfg.textClass}`}>{category}</span>
        </div>
        <span className="font-mono text-xs text-text-muted">{skills.length} items</span>
      </div>

      {/* Skill list */}
      <ul className="flex flex-col gap-2.5">
        {skills.map((skill) => (
          <li key={skill.id ?? skill.name} className="flex items-center justify-between">
            <span className="font-mono text-sm text-text-primary">{skill.name}</span>
            <LevelDots level={skill.level} colorClass={cfg.dotClass} />
          </li>
        ))}
      </ul>
    </div>
  );
}
