interface FieldProps {
  label: string;
  id: string;
  children: React.ReactNode;
}

export function Field({ label, id, children }: FieldProps) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block font-mono text-xs text-text-secondary">
        {label}
      </label>
      {children}
    </div>
  );
}

export const inputCls =
  'w-full rounded border border-border bg-bg px-3 py-2 font-mono text-sm text-text-primary outline-none transition-colors placeholder:text-text-muted focus:border-accent';

export const selectCls =
  'w-full rounded border border-border bg-bg px-3 py-2 font-mono text-sm text-text-primary outline-none focus:border-accent';

export const textareaCls =
  'w-full resize-y rounded border border-border bg-bg px-3 py-2 font-mono text-sm text-text-primary outline-none transition-colors placeholder:text-text-muted focus:border-accent';
