'use client';

import { useEffect, useState, type FormEvent } from 'react';
import { api } from '@/lib/api';
import type { Project } from '@/lib/types';
import { Field, inputCls, textareaCls } from './AdminField';

const EMPTY_FORM = {
  title: '', description: '', techStack: '', githubUrl: '', liveUrl: '', featured: false, order: 0,
};
type FormState = typeof EMPTY_FORM;

function toPayload(f: FormState) {
  return {
    title: f.title, description: f.description,
    techStack: f.techStack.split(',').map((s) => s.trim()).filter(Boolean),
    githubUrl: f.githubUrl || undefined,
    liveUrl: f.liveUrl || undefined,
    featured: f.featured,
    order: Number(f.order),
  };
}

function fromProject(p: Project): FormState {
  return {
    title: p.title, description: p.description,
    techStack: p.techStack.join(', '),
    githubUrl: p.githubUrl ?? '', liveUrl: p.liveUrl ?? '',
    featured: p.featured, order: p.order,
  };
}

export function ProjectsSection({ token }: { token: string }) {
  const [items, setItems] = useState<Project[]>([]);
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [showForm, setShowForm] = useState(false);
  const [status, setStatus] = useState('');

  async function load() {
    const data = await api.get<Project[]>('/api/projects').catch(() => []);
    setItems(data);
  }
  useEffect(() => { load(); }, []);

  function set<K extends keyof FormState>(key: K, value: FormState[K]) { setForm((f) => ({ ...f, [key]: value })); }
  function openNew() { setForm(EMPTY_FORM); setEditing(null); setShowForm(true); setStatus(''); }
  function openEdit(p: Project) { setForm(fromProject(p)); setEditing(p.id ?? null); setShowForm(true); setStatus(''); }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    try {
      if (editing) await api.put(`/api/projects/${editing}`, toPayload(form), token);
      else await api.post('/api/projects', toPayload(form), token);
      setStatus('✓ Guardado'); setShowForm(false); await load();
    } catch (err) { setStatus(`✗ ${err instanceof Error ? err.message : 'Error'}`); }
  }

  async function handleDelete(id: string) {
    if (!confirm('¿Eliminar?')) return;
    await api.delete(`/api/projects/${id}`, token).catch(() => {});
    await load();
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3">
        {items.map((p) => (
          <div key={p.id} className="flex items-center justify-between rounded border border-border bg-surface px-4 py-3">
            <div>
              <p className="font-mono text-sm text-text-primary">{p.title}</p>
              {p.featured && <span className="font-mono text-[10px] text-amber">featured</span>}
            </div>
            <div className="flex gap-2">
              <button onClick={() => openEdit(p)} className="font-mono text-xs text-text-muted hover:text-accent">edit</button>
              <button onClick={() => handleDelete(p.id!)} className="font-mono text-xs text-text-muted hover:text-red-400">del</button>
            </div>
          </div>
        ))}
        {items.length === 0 && <p className="font-mono text-xs text-text-muted">Sin proyectos.</p>}
      </div>

      <button onClick={openNew} className="self-start rounded border border-accent px-4 py-2 font-mono text-sm text-accent hover:bg-accent hover:text-bg transition-all">
        + ./add
      </button>

      {showForm && (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 rounded-lg border border-border bg-surface p-5">
          <Field label="title" id="proj-title">
            <input id="proj-title" required className={inputCls} value={form.title} onChange={(e) => set('title', e.target.value)} />
          </Field>
          <Field label="description" id="proj-desc">
            <textarea id="proj-desc" rows={3} className={textareaCls} value={form.description} onChange={(e) => set('description', e.target.value)} />
          </Field>
          <Field label="techStack (comas)" id="proj-tech">
            <input id="proj-tech" className={inputCls} value={form.techStack} onChange={(e) => set('techStack', e.target.value)} placeholder="Node.js, Docker, MongoDB" />
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="githubUrl" id="proj-gh">
              <input id="proj-gh" className={inputCls} value={form.githubUrl} onChange={(e) => set('githubUrl', e.target.value)} />
            </Field>
            <Field label="liveUrl" id="proj-live">
              <input id="proj-live" className={inputCls} value={form.liveUrl} onChange={(e) => set('liveUrl', e.target.value)} />
            </Field>
            <Field label="order" id="proj-order">
              <input id="proj-order" type="number" className={inputCls} value={form.order} onChange={(e) => set('order', Number(e.target.value))} />
            </Field>
          </div>
          <label className="flex items-center gap-2 font-mono text-xs text-text-secondary">
            <input type="checkbox" checked={form.featured} onChange={(e) => set('featured', e.target.checked)} />
            Featured
          </label>
          <div className="flex items-center gap-3">
            <button type="submit" className="rounded border border-accent px-4 py-2 font-mono text-sm text-accent hover:bg-accent hover:text-bg transition-all">
              > ./save
            </button>
            <button type="button" onClick={() => setShowForm(false)} className="font-mono text-xs text-text-muted hover:text-text-primary">cancelar</button>
            {status && <span className={`font-mono text-xs ${status.startsWith('✓') ? 'text-accent' : 'text-red-400'}`}>{status}</span>}
          </div>
        </form>
      )}
    </div>
  );
}
