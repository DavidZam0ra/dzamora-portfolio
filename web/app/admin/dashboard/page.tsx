'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAdmin } from '@/lib/useAdmin';
import { ProfileSection } from '@/components/admin/ProfileSection';
import { ExperienceSection } from '@/components/admin/ExperienceSection';
import { SkillsSection } from '@/components/admin/SkillsSection';
import { ProjectsSection } from '@/components/admin/ProjectsSection';
import { EducationSection } from '@/components/admin/EducationSection';

type Section = 'profile' | 'experience' | 'skills' | 'projects' | 'education';

const SECTIONS: { id: Section; label: string; icon: string }[] = [
  { id: 'profile',    label: 'Profile',    icon: '▸' },
  { id: 'experience', label: 'Experience', icon: '▸' },
  { id: 'skills',     label: 'Skills',     icon: '▸' },
  { id: 'projects',   label: 'Projects',   icon: '▸' },
  { id: 'education',  label: 'Education',  icon: '▸' },
];

export default function DashboardPage() {
  const { token, ready, logout } = useAdmin();
  const [active, setActive] = useState<Section>('profile');


  if (!ready) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-bg">
        <span className="animate-blink font-mono text-sm text-accent">█</span>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-bg">
      {/* Sidebar */}
      <aside className="flex w-56 shrink-0 flex-col border-r border-border bg-surface">
        <div className="border-b border-border px-4 py-4">
          <p className="font-mono text-xs text-accent">david@admin:~$</p>
          <p className="mt-0.5 font-mono text-[10px] text-text-muted">dashboard</p>
        </div>

        <nav className="flex flex-1 flex-col gap-0.5 p-2">
          {SECTIONS.map(({ id, label, icon }) => (
            <button
              key={id}
              onClick={() => setActive(id)}
              className={[
                'flex items-center gap-2 rounded px-3 py-2 font-mono text-sm transition-colors text-left',
                active === id
                  ? 'bg-accent/10 text-accent'
                  : 'text-text-secondary hover:bg-surface-hover hover:text-text-primary',
              ].join(' ')}
            >
              <span className={active === id ? 'text-accent' : 'text-text-muted'}>{icon}</span>
              {label}
            </button>
          ))}
        </nav>

        <div className="border-t border-border p-3 flex flex-col gap-1">
          <Link
            href="/"
            className="flex items-center gap-2 rounded px-3 py-2 font-mono text-xs text-text-muted transition-colors hover:bg-surface-hover hover:text-accent"
          >
            <span>↗</span> ./ver sitio
          </Link>
          <button
            onClick={logout}
            className="w-full rounded px-3 py-2 font-mono text-xs text-text-muted transition-colors hover:bg-surface-hover hover:text-red-400 text-left"
          >
            ./logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto p-8">
        <div className="mx-auto max-w-3xl">
          <div className="mb-1 font-mono text-xs text-text-muted">
            $ ./admin/{active}
          </div>
          <h1 className="mb-8 text-2xl font-bold text-text-primary capitalize">{active}</h1>

          {active === 'profile'    && <ProfileSection    token={token!} />}
          {active === 'experience' && <ExperienceSection token={token!} />}
          {active === 'skills'     && <SkillsSection     token={token!} />}
          {active === 'projects'   && <ProjectsSection   token={token!} />}
          {active === 'education'  && <EducationSection  token={token!} />}
        </div>
      </main>
    </div>
  );
}
