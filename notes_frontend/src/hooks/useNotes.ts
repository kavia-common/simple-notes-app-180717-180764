"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Note, listNotes, createNote, updateNote, deleteNote } from "@/lib/notesApi";

export type ToastMessage = { id: string; type: "success" | "error" | "info"; title: string; message?: string };

export function useNotes() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  // Toast queue simple
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const pushToast = useCallback((t: Omit<ToastMessage, "id">) => {
    const id = crypto.randomUUID();
    setToasts((prev) => [...prev, { ...t, id }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((x) => x.id !== id));
    }, 3500);
  }, []);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await listNotes();
      setNotes(data);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Failed to load notes";
      setError(msg);
      pushToast({ type: "error", title: "Load failed", message: "Could not load notes." });
    } finally {
      setLoading(false);
    }
  }, [pushToast]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const filtered = useMemo(() => {
    if (!query.trim()) return notes;
    const q = query.toLowerCase();
    return notes.filter(
      (n) => n.title.toLowerCase().includes(q) || n.content.toLowerCase().includes(q)
    );
  }, [notes, query]);

  const addNote = useCallback(
    async (title: string, content: string) => {
      const optimistic: Note = {
        id: `tmp-${crypto.randomUUID()}`,
        title,
        content,
        updatedAt: new Date().toISOString(),
      };
      setNotes((prev) => [optimistic, ...prev]);
      try {
        const created = await createNote({ title, content });
        setNotes((prev) => [created, ...prev.filter((n) => n.id !== optimistic.id)]);
        pushToast({ type: "success", title: "Note created" });
        return created;
      } catch (e: unknown) {
        // rollback
        setNotes((prev) => prev.filter((n) => n.id !== optimistic.id));
        const msg = e instanceof Error ? e.message : "Unknown error";
        pushToast({ type: "error", title: "Create failed", message: msg });
        throw e;
      }
    },
    [pushToast]
  );

  const saveNote = useCallback(
    async (id: string, patch: Partial<Pick<Note, "title" | "content">>) => {
      // optimistic update
      setNotes((prev) =>
        prev.map((n) => (n.id === id ? { ...n, ...patch, updatedAt: new Date().toISOString() } : n))
      );
      try {
        const updated = await updateNote(id, patch);
        setNotes((prev) => prev.map((n) => (n.id === id ? updated : n)));
        pushToast({ type: "success", title: "Saved" });
        return updated;
      } catch (e: unknown) {
        const msg = e instanceof Error ? e.message : "Unknown error";
        pushToast({ type: "error", title: "Save failed", message: msg });
        await refresh(); // restore server truth (or local storage truth here)
        throw e;
      }
    },
    [pushToast, refresh]
  );

  const removeNote = useCallback(
    async (id: string) => {
      const prev = notes;
      setNotes((p) => p.filter((n) => n.id !== id));
      try {
        await deleteNote(id);
        pushToast({ type: "success", title: "Deleted" });
      } catch (e: unknown) {
        setNotes(prev);
        const msg = e instanceof Error ? e.message : "Unknown error";
        pushToast({ type: "error", title: "Delete failed", message: msg });
        throw e;
      }
    },
    [notes, pushToast]
  );

  return {
    notes,
    filtered,
    loading,
    error,
    query,
    setQuery,
    addNote,
    saveNote,
    removeNote,
    refresh,
    toasts,
    setToasts,
  };
}
