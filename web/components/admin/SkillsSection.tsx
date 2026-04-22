'use client';

import { useEffect, useState, type FormEvent } from 'react';
import { api } from '@/lib/api';
import type { Skill, SkillCategory, SkillLevel } from '@/lib/types';
import { Field, inputCls, selectCls } from './AdminField';

const CATEGORIES: SkillCategory[] = ['Backend', 'Frontend', 'Database', 'DevOps', 'AI', 'Testing'];
const LEVELS: SkillLevel[] = ['expert', 'advanced', 'intermediate'];

const EMPTY_FORM = { name: '', category: 'Backend' as SkillCategory, level: 'advanced' as SkillLevel, order: 0 };

export function SkillsSection({ token }: { token: string }) {
  const [items, setItems] = useState<Skill[]>([]);
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [showForm, setShowForm] = useState(false);
  const [status, setStatus] = useState('');

  async function load() {
    const data = await api.get<Skill[]>('/api/skills').catch(() => []);
    setItems(data);
  }

  useEffect(() => { load(); }, []);

  function openNew() { setForm(EMPTY_FORM); setEditing(null); setShowForm(true); setStatus(''); }

  function openEdit(s: Skill) {
    setForm({ name: s.name, category: s.category, level: s.level, order: s.order });
    setEditing(s.id ?? null);
    setShowForm(true);
    setStatus('');
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    try {
      if (editing) await api.put(`/api/skills/${editing}`, { ...form, order: Number(form.order) }, token);
      else await api.post('/api/skills', { ...form, order: Number(form.order) }, token);
      setStatus('✓ Guardado');
      setShowForm(false);
      await load();
    } catch (err) {
      setStatus(`✗ ${err instanceof Error ? err.message : 'Error'}`);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('¿Eliminar?')) return;
    await api.delete(`/api/skills/${id}`, token).catch(() => {});
    await load();
  }

  const grouped = CATEGORIES.reduce<Record<string, Skill[]>>((acc, cat) => {
    acc[cat] = items.filter((s) => s.category === cat);
    return acc;
  }, {});

  return (
    <div className="flex flex-col gap-6">
      {/* Grouped list */}
      {CATEGORIES.filter((c) => grouped[c].length > 0).map((cat) => (
        <div key={cat}>
          <p className="mb-2 font-mono text-xs text-text-muted">{cat}</p>
          <div className="flex flex-col gap-2">
            {grouped[cat].map((s) => (
              <div key={s.id} className="flex items-center justify-between rounded border border-border bg-surface px-4 py-2">
                <span className="font-mono text-sm text-text-primary">{s.name}</span>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-text-muted">{s.level}</span>
                  <button onClick={() => openEdit(s)} className="font-mono text-xs text-text-muted hover:text-accent">edit</button>
                  <button onClick={() => handleDelete(s.id!)} className="font-mono text-xs text-text-muted hover:text-red-400">del</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
      {items.length === 0 && <p className="font-mono text-xs text-text-muted">Sin skills.</p>}

      <button onClick={openNew} className="self-start rounded border border-accent px-4 py-2 font-mono text-sm text-accent hover:bg-accent hover:text-bg transition-all">
        + ./add
      </button>

      {showForm && (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 rounded-lg border border-border bg-surface p-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="name" id="skill-name">
              <input id="skill-name" required className={inputCls} value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} />
            </Field>
            <Field label="order" id="skill-order">
              <input id="skill-order" type="number" className={inputCls} value={form.order} onChange={(e) => setForm((f) => ({ ...f, order: Number(e.target.value) }))} />
            </Field>
            <Field label="category" id="skill-cat">
              <select id="skill-cat" className={selectCls} value={form.category} onChange={(e) => setForm((f) => ({ ...f, category: e.target.value as SkillCategory }))}>
                {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
              </select>
            </Field>
            <Field label="level" id="skill-lvl">
              <select id="skill-lvl" className={selectCls} value={form.level} onChange={(e) => setForm((f) => ({ ...f, level: e.target.value as SkillLevel }))}>
                {LEVELS.map((l) => <option key={l}>{l}</option>)}
              </select>
            </Field>
          </div>
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
