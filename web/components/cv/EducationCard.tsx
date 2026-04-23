'use client';

import { useState } from 'react';
import type { Education } from '@/lib/types';

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('es-ES', {
    month: 'short',
    year: 'numeric',
  });
}

interface EducationCardProps {
  education: Education;
}

export function EducationCard({ education: edu }: EducationCardProps) {
  const [open, setOpen] = useState(true);
  const endLabel = edu.endDate ? formatDate(edu.endDate) : 'En curso';
  const hasBody = !!edu.description;

  return (
    <div className="rounded-lg border border-border bg-surface transition-colors hover:border-purple/30">
      {/* Header */}
      <button
        onClick={() => hasBody && setOpen((o) => !o)}
        className={`flex w-full items-center justify-between gap-2 p-5 text-left ${
          !hasBody ? 'cursor-default' : ''
        }`}
        aria-expanded={open}
        disabled={!hasBody}
      >
        <div>
          <p className="font-mono text-sm font-semibold text-purple">{edu.institution}</p>
          <p className="text-sm text-text-primary">
            {edu.degree} · <span className="text-text-secondary">{edu.field}</span>
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-3">
          <span className="hidden font-mono text-xs text-text-muted sm:inline">
            {formatDate(edu.startDate)} — {endLabel}
          </span>
          {hasBody && (
            <span
              className={`font-mono text-xs text-text-muted transition-transform duration-200 ${
                open ? 'rotate-180' : ''
              }`}
            >
              ▾
            </span>
          )}
        </div>
      </button>

      {/* Collapsible body */}
      {hasBody && (
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            open ? 'max-h-[300px] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <p className="border-t border-border px-5 pb-5 pt-4 text-sm leading-relaxed text-text-secondary">
            {edu.description}
          </p>
        </div>
      )}
    </div>
  );
}
