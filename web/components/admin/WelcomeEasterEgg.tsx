'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

const LINES = [
  'Iniciando sesión...',
  'Verificando credenciales...',
  'Acceso concedido ✓',
  'Bienvenido al panel de administrador, David.',
];

export function WelcomeEasterEgg() {
  const [visible, setVisible] = useState(false);
  const [fading, setFading] = useState(false);
  const [shownLines, setShownLines] = useState<string[]>([]);

  useEffect(() => {
    if (sessionStorage.getItem('admin-welcomed')) return;
    sessionStorage.setItem('admin-welcomed', '1');
    setVisible(true);

    // Type lines one by one
    LINES.forEach((line, i) => {
      setTimeout(() => {
        setShownLines((prev) => [...prev, line]);
      }, 600 + i * 700);
    });

    // Start fade-out after all lines + pause
    const dismissAt = 600 + LINES.length * 700 + 1800;
    setTimeout(() => setFading(true), dismissAt);
    setTimeout(() => setVisible(false), dismissAt + 500);
  }, []);

  if (!visible) return null;

  return (
    <div
      className={[
        'fixed inset-0 z-50 flex items-center justify-center bg-bg/95 backdrop-blur-sm',
        'transition-opacity duration-500',
        fading ? 'opacity-0' : 'opacity-100',
      ].join(' ')}
      onClick={() => { setFading(true); setTimeout(() => setVisible(false), 500); }}
      role="dialog"
      aria-label="Bienvenida"
    >
      <div
        className="flex flex-col items-center gap-6 px-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Pixel image */}
        <div
          className="relative"
          style={{ imageRendering: 'pixelated' }}
        >
          {/* Retro glow border */}
          <div className="absolute -inset-1 rounded-lg bg-accent/20 blur-md" />
          <div className="relative rounded-lg border-2 border-accent/50 bg-surface p-1">
            <Image
              src="/dzamora-traje-pixel.jpeg"
              alt="David Zamora pixel art"
              width={200}
              height={200}
              className="rounded"
              style={{ imageRendering: 'pixelated' }}
              priority
            />
          </div>
        </div>

        {/* Terminal dialog */}
        <div className="w-full max-w-sm rounded-lg border border-border bg-surface shadow-2xl shadow-black/60">
          {/* Title bar */}
          <div className="flex items-center gap-2 border-b border-border px-4 py-2">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
            <span className="ml-2 font-mono text-xs text-text-muted">admin@portfolio:~</span>
          </div>

          {/* Lines */}
          <div className="min-h-[120px] p-4 font-mono text-sm">
            {shownLines.map((line, i) => (
              <div
                key={i}
                className={[
                  'flex items-start gap-2',
                  i === LINES.length - 1 ? 'text-accent' : 'text-text-secondary',
                ].join(' ')}
                style={{ animation: 'fadeInUp 0.3s ease both' }}
              >
                <span className="shrink-0 text-accent">{'>'}</span>
                <span>{line}</span>
              </div>
            ))}
            {shownLines.length < LINES.length && (
              <div className="flex items-center gap-2">
                <span className="text-accent">{'>'}</span>
                <span className="animate-blink inline-block h-4 w-2 bg-accent" />
              </div>
            )}
          </div>

          {/* Dismiss hint */}
          {shownLines.length === LINES.length && (
            <div
              className="border-t border-border px-4 py-2 text-center font-mono text-xs text-text-muted"
              style={{ animation: 'fadeIn 0.4s ease both' }}
            >
              click para continuar
            </div>
          )}
        </div>
      </div>

      {/* Countdown bar */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-border overflow-hidden">
        <div
          className="h-full bg-accent origin-left"
          style={{
            animation: `shrink ${((600 + LINES.length * 700 + 1800) / 1000).toFixed(1)}s linear forwards`,
          }}
        />
      </div>

      <style>{`
        @keyframes shrink {
          from { transform: scaleX(1); }
          to   { transform: scaleX(0); }
        }
      `}</style>
    </div>
  );
}
