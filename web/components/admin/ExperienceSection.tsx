'use client';

import { useEffect, useState, type FormEvent } from 'react';
import { api } from '@/lib/api';
import type { Experience } from '@/lib/types';
import { Field, inputCls, textareaCls } from './AdminField';

const EMPTY_FORM = {
  company: '', role: '', startDate: '', endDate: '', isCurrent: false,
  description: '', achievements: '', techStack: '', order: 0,
};

type FormState = typeof EMPTY_FORM;

function toPayload(f: FormState) {
  return {
    company: f.company,
    role: f.role,
    startDate: f.startDate,
    endDate: f.isCurrent ? undefined : f.endDate || undefined,
    isCurrent: f.isCurrent,
    description: f.description,
    achievements: f.achievements.split('\n').map((s) => s.trim()).filter(Boolean),
    techStack: f.techStack.split(',').map((s) => s.trim()).filter(Boolean),
    order: Number(f.order),
  };
}

function fromExp(e: Experience): FormState {
  return {
    company: e.company,
    role: e.role,
    startDate: e.startDate?.slice(0, 10) ?? '',
    endDate: e.endDate?.slice(0, 10) ?? '',
    isCurrent: e.isCurrent,
    description: e.description,
    achievements: e.achievements.join('\n'),
    techStack: e.techStack.join(', '),
    order: e.order,
  };
}

export function ExperienceSection({ token }: { token: string }) {
  const [items, setItems] = useState<Experience[]>([]);
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [showForm, setShowForm] = useState(false);
  const [status, setStatus] = useState('');

  async function load() {
    const data = await api.get<Experience[]>('/api/experience').catch(() => []);
    setItems(data);
  }

  useEffect(() => { load(); }, []);

  function set<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function openNew() {
    setForm(EMPTY_FORM);
    setEditing(null);
    setShowForm(true);
    setStatus('');
  }

  function openEdit(exp: Experience) {
    setForm(fromExp(exp));
    setEditing(exp.id ?? null);
    setShowForm(true);
    setStatus('');
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus('');
    try {
      if (editing) {
        await api.put(`/api/experience/${editing}`, toPayload(form), token);
      } else {
        await api.post('/api/experience', toPayload(form), token);
      }
      setStatus('✓ Guardado');
      setShowForm(false);
      await load();
    } catch (err) {
      setStatus(`✗ ${err instanceof Error ? err.message : 'Error'}`);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('¿Eliminar esta experiencia?')) return;
    await api.delete(`/api/experience/${id}`, token).catch(() => {});
    await load();
  }

  return (
    <div className="flex flex-col gap-6">
      {/* List */}
      <div className="flex flex-col gap-3">
        {items.map((exp) => (
          <div key={exp.id} className="flex items-center justify-between rounded border border-border bg-surface px-4 py-3">
            <div>
              <p className="font-mono text-sm text-accent">{exp.company}</p>
              <p className="text-xs text-text-secondary">{exp.role}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => openEdit(exp)} className="font-mono text-xs text-text-muted hover:text-accent">edit</button>
              <button onClick={() => handleDelete(exp.id!)} className="font-mono text-xs text-text-muted hover:text-red-400">del</button>
            </div>
          </div>
        ))}
        {items.length === 0 && (
          <p className="font-mono text-xs text-text-muted">Sin registros.</p>
        )}
      </div>

      <button onClick={openNew} className="self-start rounded border border-accent px-4 py-2 font-mono text-sm text-accent hover:bg-accent hover:text-bg transition-all">
        + ./add
      </button>

      {/* Form */}
      {showForm && (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 rounded-lg border border-border bg-surface p-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="company" id="company">
              <input id="company" required className={inputCls} value={form.company} onChange={(e) => set('company', e.target.value)} />
            </Field>
            <Field label="role" id="exp-role">
              <input id="exp-role" required className={inputCls} value={form.role} onChange={(e) => set('role', e.target.value)} />
            </Field>
            <Field label="startDate" id="startDate">
              <input id="startDate" type="date" required className={inputCls} value={form.startDate} onChange={(e) => set('startDate', e.target.value)} />
            </Field>
            <Field label="endDate" id="endDate">
              <input id="endDate" type="date" className={inputCls} value={form.endDate} onChange={(e) => set('endDate', e.target.value)} disabled={form.isCurrent} />
            </Field>
          </div>
          <label className="flex items-center gap-2 font-mono text-xs text-text-secondary">
            <input type="checkbox" checked={form.isCurrent} onChange={(e) => set('isCurrent', e.target.checked)} />
            Trabajo actual
          </label>
          <Field label="description" id="exp-desc">
            <textarea id="exp-desc" rows={3} className={textareaCls} value={form.description} onChange={(e) => set('description', e.target.value)} />
          </Field>
          <Field label="achievements (una por línea)" id="achievements">
            <textarea id="achievements" rows={4} className={textareaCls} value={form.achievements} onChange={(e) => set('achievements', e.target.value)} placeholder="Reducé el tiempo de respuesta en un 40%&#10;Migré de monolito a microservicios" />
          </Field>
          <Field label="techStack (separado por comas)" id="techStack">
            <input id="techStack" className={inputCls} value={form.techStack} onChange={(e) => set('techStack', e.target.value)} placeholder="Node.js, TypeScript, MongoDB" />
          </Field>
          <Field label="order" id="exp-order">
            <input id="exp-order" type="number" className={inputCls} value={form.order} onChange={(e) => set('order', Number(e.target.value))} />
          </Field>
          <div className="flex items-center gap-3">
            <button type="submit" className="rounded border border-accent px-4 py-2 font-mono text-sm text-accent hover:bg-accent hover:text-bg transition-all">
              &gt; ./save
            </button>
            <button type="button" onClick={() => setShowForm(false)} className="font-mono text-xs text-text-muted hover:text-text-primary">
              cancelar
            </button>
            {status && <span className={`font-mono text-xs ${status.startsWith('✓') ? 'text-accent' : 'text-red-400'}`}>{status}</span>}
          </div>
        </form>
      )}
    </div>
  );
}
