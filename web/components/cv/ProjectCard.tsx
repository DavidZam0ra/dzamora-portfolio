import type { Project } from '@/lib/types';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="flex h-full flex-col rounded-lg border border-border bg-surface p-5 transition-colors hover:border-accent/30 hover:bg-surface-hover">
      {/* Header */}
      <div className="mb-3 flex items-start justify-between gap-2">
        <h3 className="font-mono text-sm font-semibold text-text-primary">
          {project.title}
        </h3>
        {project.featured && (
          <span className="shrink-0 rounded border border-amber/40 bg-amber/10 px-1.5 py-0.5 font-mono text-[10px] text-amber">
            featured
          </span>
        )}
      </div>

      {/* Description */}
      <p className="mb-4 flex-1 text-sm leading-relaxed text-text-secondary">
        {project.description}
      </p>

      {/* TechStack */}
      {project.techStack.length > 0 && (
        <div className="mb-4 flex flex-wrap gap-1.5">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="rounded border border-border bg-bg px-2 py-0.5 font-mono text-xs text-text-secondary"
            >
              {tech}
            </span>
          ))}
        </div>
      )}

      {/* Links */}
      <div className="flex gap-3">
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs text-accent transition-colors hover:text-accent-dim"
          >
            ./github ↗
          </a>
        )}
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs text-text-secondary transition-colors hover:text-text-primary"
          >
            ./live ↗
          </a>
        )}
      </div>
    </div>
  );
}
