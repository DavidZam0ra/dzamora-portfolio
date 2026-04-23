'use client';

import { useEffect, useRef, useState } from 'react';
import type { Experience } from '@/lib/types';

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('es-ES', {
    month: 'short',
    year: 'numeric',
  });
}

function TimelineCard({ exp }: { exp: Experience }) {
  const ref = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('opacity-100', 'translate-y-0');
          el.classList.remove('opacity-0', 'translate-y-4');
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const startYear = new Date(exp.startDate).getFullYear();
  const endLabel = exp.isCurrent ? 'Actual' : exp.endDate ? formatDate(exp.endDate) : '';

  return (
    <div
      ref={ref}
      className="translate-y-4 opacity-0 transition-all duration-500 ease-out"
    >
      {/* Date badge */}
      <div className="mb-3 font-mono text-xs text-text-muted">
        {startYear} — {endLabel}
      </div>

      {/* Card */}
      <div className="rounded-lg border border-border bg-surface transition-colors hover:border-accent/30">
        {/* Header — always visible, click to toggle */}
        <button
          onClick={() => setOpen((o) => !o)}
          className="flex w-full items-center justify-between gap-2 p-5 text-left"
          aria-expanded={open}
        >
          <div>
            <p className="font-mono text-base font-semibold text-accent">{exp.company}</p>
            <p className="text-sm font-medium text-text-primary">{exp.role}</p>
          </div>
          <div className="flex shrink-0 items-center gap-3">
            <span className="hidden rounded border border-border px-2 py-0.5 font-mono text-xs text-text-muted sm:inline">
              {formatDate(exp.startDate)} — {endLabel}
            </span>
            <span
              className={`font-mono text-xs text-text-muted transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
            >
              ▾
            </span>
          </div>
        </button>

        {/* Collapsible body */}
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            open ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="border-t border-border px-5 pb-5 pt-4">
            {exp.description && (
              <p className="mb-4 text-sm leading-relaxed text-text-secondary">{exp.description}</p>
            )}

            {exp.achievements.length > 0 && (
              <ul className="mb-4 flex flex-col gap-1.5">
                {exp.achievements.map((ach, i) => (
                  <li key={i} className="flex items-start gap-2 font-mono text-xs">
                    <span className="mt-px shrink-0 text-accent">&gt;</span>
                    <span className="text-text-secondary">{ach}</span>
                  </li>
                ))}
              </ul>
            )}

            {exp.techStack.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {exp.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded border border-border bg-bg px-2 py-0.5 font-mono text-xs text-text-secondary"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

interface ExperienceTimelineProps {
  experiences: Experience[];
}

export function ExperienceTimeline({ experiences }: ExperienceTimelineProps) {
  if (experiences.length === 0) {
    return (
      <p className="font-mono text-sm text-text-muted">
        No hay experiencia cargada todavía.
      </p>
    );
  }

  return (
    <div className="relative">
      {/* Vertical line */}
      <div className="absolute left-3 top-2 bottom-2 w-px bg-border" />

      <div className="flex flex-col gap-10">
        {experiences.map((exp) => (
          <div key={exp.id ?? exp.company} className="relative flex gap-6">
            {/* Timeline dot */}
            <div className="relative mt-1 flex shrink-0 flex-col items-center">
              <span className="relative z-10 h-2.5 w-2.5 rounded-full border-2 border-accent bg-bg" />
            </div>

            {/* Card */}
            <div className="min-w-0 flex-1">
              <TimelineCard exp={exp} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
