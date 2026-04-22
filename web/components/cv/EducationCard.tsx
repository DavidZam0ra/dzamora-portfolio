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
  const endLabel = edu.endDate ? formatDate(edu.endDate) : 'En curso';

  return (
    <div className="rounded-lg border border-border bg-surface p-5 transition-colors hover:border-purple/30 hover:bg-surface-hover">
      <div className="mb-2 flex flex-wrap items-start justify-between gap-2">
        <div>
          <p className="font-mono text-sm font-semibold text-purple">{edu.institution}</p>
          <p className="text-sm text-text-primary">
            {edu.degree} · <span className="text-text-secondary">{edu.field}</span>
          </p>
        </div>
        <span className="shrink-0 font-mono text-xs text-text-muted">
          {formatDate(edu.startDate)} — {endLabel}
        </span>
      </div>
      {edu.description && (
        <p className="mt-2 text-sm leading-relaxed text-text-secondary">{edu.description}</p>
      )}
    </div>
  );
}
