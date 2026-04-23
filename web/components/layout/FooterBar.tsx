'use client';

import { useEffect, useState } from 'react';

interface FooterBarProps {
  name: string;
  role: string;
  location: string;
  github?: string;
  linkedin?: string;
  email?: string;
}

export function FooterBar({ name, role, location, github, linkedin, email }: FooterBarProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const onScroll = () => {
      setVisible(false);
      clearTimeout(timer);
      timer = setTimeout(() => setVisible(true), 600);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      clearTimeout(timer);
    };
  }, []);

  const handle = name
    .toLowerCase()
    .replace(/\s+/g, '-')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');

  return (
    <footer className={[
      'fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-surface/95 backdrop-blur-sm',
      'transition-all duration-300 ease-in-out',
      visible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0',
    ].join(' ')}>
      <div className="mx-auto max-w-6xl px-4 py-3 md:px-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

          {/* Identity */}
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded border border-accent/30 bg-accent/10 font-mono text-xs font-bold text-accent">
              DZ
            </div>
            <div>
              <div className="flex items-center gap-2 font-mono text-sm text-text-primary">
                <span className="text-accent">~</span>
                <span>/</span>
                <span>{handle}</span>
              </div>
              <div className="font-mono text-xs text-text-muted">
                {role} · {location}
              </div>
            </div>
          </div>

          {/* Links */}
          <div className="flex items-center gap-2">
            {github && (
              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded border border-border px-3 py-1.5 font-mono text-xs text-text-secondary transition-all hover:border-accent hover:text-accent"
              >
                ./github ↗
              </a>
            )}
            {linkedin && (
              <a
                href={linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded border border-border px-3 py-1.5 font-mono text-xs text-text-secondary transition-all hover:border-purple hover:text-purple"
              >
                ./linkedin ↗
              </a>
            )}
            {email && (
              <a
                href={`mailto:${email}`}
                className="rounded border border-border px-3 py-1.5 font-mono text-xs text-text-secondary transition-all hover:border-amber hover:text-amber"
              >
                ./email ↗
              </a>
            )}
          </div>

        </div>
      </div>
    </footer>
  );
}
