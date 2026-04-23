'use client';

import { useEffect, useState } from 'react';

const SECTIONS = [
  { id: 'inicio',     label: './inicio' },
  { id: 'cv',        label: './cv' },
  { id: 'stack',     label: './stack' },
  { id: 'proyectos', label: './proyectos' },
];

export function SideNav() {
  const [active, setActive] = useState('inicio');

  useEffect(() => {
    const handleScroll = () => {
      const threshold = window.scrollY + window.innerHeight * 0.35;
      let current = SECTIONS[0].id;
      for (const { id } of SECTIONS) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= threshold) current = id;
      }
      setActive(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center md:flex">
      {/* vertical timeline line */}
      <div
        className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-border"
        aria-hidden
      />

      {SECTIONS.map(({ id, label }) => {
        const isActive = active === id;
        return (
          <button
            key={id}
            onClick={() => scrollTo(id)}
            aria-label={label}
            className="group relative flex items-center py-4"
          >
            {/* label — appears on hover to the left of the dot */}
            <span
              className={[
                'absolute right-5 whitespace-nowrap font-mono text-xs transition-all duration-200',
                'pointer-events-none opacity-0 translate-x-1',
                'group-hover:opacity-100 group-hover:translate-x-0',
                isActive ? 'text-accent' : 'text-text-secondary',
              ].join(' ')}
            >
              {label}
            </span>

            {/* dot */}
            <span
              className={[
                'relative z-10 block rounded-full transition-all duration-300',
                isActive
                  ? 'h-3 w-3 bg-accent shadow-[0_0_8px_rgba(0,229,160,0.5)]'
                  : 'h-2 w-2 bg-border group-hover:bg-text-muted',
              ].join(' ')}
            />
          </button>
        );
      })}
    </div>
  );
}
