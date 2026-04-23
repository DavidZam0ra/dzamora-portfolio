'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const NAV_LINKS = [
  { href: '/#inicio',     label: './inicio' },
  { href: '/#cv',        label: './cv' },
  { href: '/#stack',     label: './stack' },
  { href: '/#proyectos', label: './proyectos' },
];

export function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-bg/80 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 md:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="font-mono text-sm text-text-secondary transition-colors hover:text-accent"
        >
          <span className="text-accent">~</span>
          <span className="text-text-muted"> / </span>
          <span className="text-text-primary">david-zamora</span>
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map(({ href, label }) => {
            const isActive = href.startsWith('/#') ? false : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={[
                  'rounded px-3 py-1.5 font-mono text-sm transition-all duration-200',
                  isActive
                    ? 'border border-accent text-accent'
                    : 'border border-transparent text-text-secondary hover:border-border hover:text-text-primary',
                ].join(' ')}
              >
                {label}
              </Link>
            );
          })}
        </div>

        {/* Mobile hamburger */}
        <button
          className="flex flex-col gap-1.5 p-2 md:hidden"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Abrir menú"
        >
          <span
            className={`block h-0.5 w-5 bg-text-secondary transition-transform duration-200 ${menuOpen ? 'translate-y-2 rotate-45' : ''}`}
          />
          <span
            className={`block h-0.5 w-5 bg-text-secondary transition-opacity duration-200 ${menuOpen ? 'opacity-0' : ''}`}
          />
          <span
            className={`block h-0.5 w-5 bg-text-secondary transition-transform duration-200 ${menuOpen ? '-translate-y-2 -rotate-45' : ''}`}
          />
        </button>
      </div>

        {/* Mobile menu */}
      {menuOpen && (
        <div className="border-t border-border bg-bg px-4 pb-4 pt-2 md:hidden">
          {NAV_LINKS.map(({ href, label }) => {
            const isActive = href.startsWith('/#') ? false : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                className={[
                  'block rounded px-3 py-2 font-mono text-sm transition-colors',
                  isActive
                    ? 'text-accent'
                    : 'text-text-secondary hover:text-text-primary',
                ].join(' ')}
              >
                {label}
              </Link>
            );
          })}
        </div>
      )}
    </nav>
  );
}
