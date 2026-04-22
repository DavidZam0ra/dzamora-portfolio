'use client';

import { useEffect, useState, type FormEvent } from 'react';
import { api } from '@/lib/api';
import type { Profile } from '@/lib/types';
import { Field, inputCls, textareaCls } from './AdminField';

const EMPTY: Omit<Profile, 'id'> = {
  name: '', role: '', focus: '', location: '', bio: '',
  email: '', github: '', linkedin: '', avatarUrl: '',
};

export function ProfileSection({ token }: { token: string }) {
  const [form, setForm] = useState(EMPTY);
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    api.get<Profile>('/api/profile')
      .then((p) => setForm({ ...EMPTY, ...p }))
      .catch(() => {});
  }, []);

  function set(key: keyof typeof form, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setStatus('');
    try {
      await api.put('/api/profile', form, token);
      setStatus('✓ Guardado');
    } catch (err) {
      setStatus(`✗ ${err instanceof Error ? err.message : 'Error'}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="name" id="name">
          <input id="name" className={inputCls} value={form.name} onChange={(e) => set('name', e.target.value)} />
        </Field>
        <Field label="email" id="email">
          <input id="email" type="email" className={inputCls} value={form.email} onChange={(e) => set('email', e.target.value)} />
        </Field>
        <Field label="role" id="role">
          <input id="role" className={inputCls} value={form.role} onChange={(e) => set('role', e.target.value)} />
        </Field>
        <Field label="location" id="location">
          <input id="location" className={inputCls} value={form.location} onChange={(e) => set('location', e.target.value)} />
        </Field>
        <Field label="focus" id="focus">
          <input id="focus" className={inputCls} value={form.focus} onChange={(e) => set('focus', e.target.value)} />
        </Field>
        <Field label="github" id="github">
          <input id="github" className={inputCls} value={form.github} onChange={(e) => set('github', e.target.value)} />
        </Field>
        <Field label="linkedin" id="linkedin">
          <input id="linkedin" className={inputCls} value={form.linkedin} onChange={(e) => set('linkedin', e.target.value)} />
        </Field>
        <Field label="avatarUrl" id="avatar">
          <input id="avatar" className={inputCls} value={form.avatarUrl ?? ''} onChange={(e) => set('avatarUrl', e.target.value)} />
        </Field>
      </div>
      <Field label="bio" id="bio">
        <textarea id="bio" rows={5} className={textareaCls} value={form.bio} onChange={(e) => set('bio', e.target.value)} />
      </Field>
      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={loading}
          className="rounded border border-accent px-5 py-2 font-mono text-sm text-accent transition-all hover:bg-accent hover:text-bg disabled:opacity-50"
        >
          {loading ? '&gt; guardando...' : '&gt; ./save'}
        </button>
        {status && (
          <span className={`font-mono text-xs ${status.startsWith('✓') ? 'text-accent' : 'text-red-400'}`}>
            {status}
          </span>
        )}
      </div>
    </form>
  );
}
