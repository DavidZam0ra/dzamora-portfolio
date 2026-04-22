'use client';

import { useEffect, useState, type FormEvent } from 'react';
import { api } from '@/lib/api';
import type { Education } from '@/lib/types';
import { Field, inputCls, textareaCls } from './AdminField';

const EMPTY_FORM = {
  institution: '', degree: '', field: '', startDate: '', endDate: '', description: '', order: 0,
};
type FormState = typeof EMPTY_FORM;

function toPayload(f: FormState) {
  return {
    institution: f.institution, degree: f.degree, field: f.field,
    startDate: f.startDate,
    endDate: f.endDate || undefined,
    description: f.description || undefined,
    order: Number(f.order),
  };
}

function fromEdu(e: Education): FormState {
  return {
    institution: e.institution, degree: e.degree, field: e.field,
    startDate: e.startDate?.slice(0, 10) ?? '',
    endDate: e.endDate?.slice(0, 10) ?? '',
    description: e.description ?? '', order: e.order,
  };
}

export function EducationSection({ token }: { token: string }) {
  const [items, setItems] = useState<Education[]>([]);
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [showForm, setShowForm] = useState(false);
  const [status, setStatus] = useState('');

  async function load() {
    const data = await api.get<Education[]>('/api/education').catch(() => []);
    setItems(data);
  }
  useEffect(() => { load(); }, []);

  function set<K extends keyof FormState>(key: K, value: FormState[K]) { setForm((f) => ({ ...f, [key]: value })); }
  function openNew() { setForm(EMPTY_FORM); setEditing(null); setShowForm(true); setStatus(''); }
  function openEdit(e: Education) { setForm(fromEdu(e)); setEditing(e.id ?? null); setShowForm(true); setStatus(''); }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    try {
      if (editing) await api.put(`/api/education/${editing}`, toPayload(form), token);
      else await api.post('/api/education', toPayload(form), token);
      setStatus('✓ Guardado'); setShowForm(false); await load();
    } catch (err) { setStatus(`✗ ${err instanceof Error ? err.message : 'Error'}`); }
  }

  async function handleDelete(id: string) {
    if (!confirm('¿Eliminar?')) return;
    await api.delete(`/api/education/${id}`, token).catch(() => {});
    await load();
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3">
        {items.map((e) => (
          <div key={e.id} className="flex items-center justify-between rounded border border-border bg-surface px-4 py-3">
            <div>
              <p className="font-mono text-sm text-purple">{e.institution}</p>
              <p className="text-xs text-text-secondary">{e.degree} · {e.field}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => openEdit(e)} className="font-mono text-xs text-text-muted hover:text-accent">edit</button>
              <button onClick={() => handleDelete(e.id!)} className="font-mono text-xs text-text-muted hover:text-red-400">del</button>
            </div>
          </div>
        ))}
        {items.length === 0 && <p className="font-mono text-xs text-text-muted">Sin registros.</p>}
      </div>

      <button onClick={openNew} className="self-start rounded border border-accent px-4 py-2 font-mono text-sm text-accent hover:bg-accent hover:text-bg transition-all">
        + ./add
      </button>

      {showForm && (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 rounded-lg border border-border bg-surface p-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="institution" id="edu-inst">
              <input id="edu-inst" required className={inputCls} value={form.institution} onChange={(e) => set('institution', e.target.value)} />
            </Field>
            <Field label="degree" id="edu-deg">
              <input id="edu-deg" required className={inputCls} value={form.degree} onChange={(e) => set('degree', e.target.value)} />
            </Field>
            <Field label="field" id="edu-field">
              <input id="edu-field" required className={inputCls} value={form.field} onChange={(e) => set('field', e.target.value)} />
            </Field>
            <Field label="order" id="edu-order">
              <input id="edu-order" type="number" className={inputCls} value={form.order} onChange={(e) => set('order', Number(e.target.value))} />
            </Field>
            <Field label="startDate" id="edu-start">
              <input id="edu-start" type="date" required className={inputCls} value={form.startDate} onChange={(e) => set('startDate', e.target.value)} />
            </Field>
            <Field label="endDate" id="edu-end">
              <input id="edu-end" type="date" className={inputCls} value={form.endDate} onChange={(e) => set('endDate', e.target.value)} />
            </Field>
          </div>
          <Field label="description (opcional)" id="edu-desc">
            <textarea id="edu-desc" rows={3} className={textareaCls} value={form.description} onChange={(e) => set('description', e.target.value)} />
          </Field>
          <div className="flex items-center gap-3">
            <button type="submit" className="rounded border border-accent px-4 py-2 font-mono text-sm text-accent hover:bg-accent hover:text-bg transition-all">
              &gt; ./save
            </button>
            <button type="button" onClick={() => setShowForm(false)} className="font-mono text-xs text-text-muted hover:text-text-primary">cancelar</button>
            {status && <span className={`font-mono text-xs ${status.startsWith('✓') ? 'text-accent' : 'text-red-400'}`}>{status}</span>}
          </div>
        </form>
      )}
    </div>
  );
}
