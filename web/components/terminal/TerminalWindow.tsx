'use client';

import { useEffect, useRef, useState } from 'react';

export interface TerminalLine {
  command?: string;
  output?: string;
  /** ms to wait BEFORE processing this line. Default 0 */
  delay?: number;
}

interface TerminalWindowProps {
  lines: TerminalLine[];
  title?: string;
  /** ms between typed chars. Default 40 */
  typingSpeed?: number;
  className?: string;
}

type DisplayLine =
  | { kind: 'command'; text: string; complete: boolean }
  | { kind: 'output'; text: string };

export function TerminalWindow({
  lines,
  title = 'david@portfolio:~',
  typingSpeed = 40,
  className = '',
}: TerminalWindowProps) {
  const [displayed, setDisplayed] = useState<DisplayLine[]>([]);
  const [done, setDone] = useState(false);
  // Shared ref: each animation run gets a unique generation id.
  // Any stale async continuation checks this and bails out.
  const genRef = useRef(0);

  useEffect(() => {
    const gen = ++genRef.current;
    const alive = () => genRef.current === gen;

    setDisplayed([]);
    setDone(false);

    async function animate() {
      for (const line of lines) {
        if (!alive()) return;

        if (line.delay) await wait(line.delay);
        if (!alive()) return;

        if (line.command) {
          setDisplayed((prev) => [
            ...prev,
            { kind: 'command', text: '', complete: false },
          ]);

          for (let i = 1; i <= line.command.length; i++) {
            if (!alive()) return;
            await wait(typingSpeed);
            if (!alive()) return;
            const partial = line.command.slice(0, i);
            setDisplayed((prev) => {
              const next = [...prev];
              next[next.length - 1] = { kind: 'command', text: partial, complete: false };
              return next;
            });
          }

          if (!alive()) return;
          setDisplayed((prev) => {
            const next = [...prev];
            next[next.length - 1] = { kind: 'command', text: line.command!, complete: true };
            return next;
          });

          await wait(80);
          if (!alive()) return;
        }

        if (line.output !== undefined) {
          setDisplayed((prev) => [...prev, { kind: 'output', text: line.output! }]);
          await wait(line.output === '' ? 40 : 120);
          if (!alive()) return;
        }
      }

      if (alive()) setDone(true);
    }

    animate();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className={[
        'overflow-hidden rounded-lg border border-border bg-surface shadow-2xl shadow-black/50',
        className,
      ].join(' ')}
    >
      {/* Title bar */}
      <div className="flex items-center gap-2 border-b border-border bg-surface px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
        <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
        <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        <span className="ml-3 font-mono text-xs text-text-secondary">{title}</span>
      </div>

      {/* Terminal body */}
      <div className="min-h-[220px] p-5 font-mono text-sm leading-relaxed">
        {displayed.map((line, idx) => {
          if (line.kind === 'command') {
            const isLast = idx === displayed.length - 1;
            return (
              <div key={idx} className="flex items-center gap-2">
                <span className="select-none text-accent">$</span>
                <span className="text-accent">{line.text}</span>
                {!line.complete && isLast && (
                  <span className="animate-blink inline-block h-4 w-2 bg-accent" />
                )}
              </div>
            );
          }

          if (line.text === '') {
            return <div key={idx} className="h-3" />;
          }
          return (
            <div key={idx} className="flex items-start gap-2">
              <span className="select-none text-text-muted">&gt;</span>
              <span className="text-text-primary">{line.text}</span>
            </div>
          );
        })}

        {/* Idle blinking cursor after all animation done */}
        {done && (
          <div className="flex items-center gap-2">
            <span className="select-none text-accent">$</span>
            <span className="animate-blink inline-block h-4 w-2 bg-accent" />
          </div>
        )}

      </div>
    </div>
  );
}

function wait(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
