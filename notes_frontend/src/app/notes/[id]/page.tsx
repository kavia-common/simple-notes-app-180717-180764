"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getNote } from "@/lib/notesApi";
import { useNotes } from "@/hooks/useNotes";
import NoteEditor from "@/components/NoteEditor";
import Toast from "@/components/Toast";

export function generateStaticParams(): { id: string }[] {
  // No pre-rendered IDs at build time; rely on client navigation.
  return [];
}

export default function NoteDetailPage() {
  const params = useParams<{ id: string }>();
  const id = params?.id as string;
  const router = useRouter();
  const { notes, saveNote, removeNote, toasts } = useNotes();

  const existing = useMemo(() => notes.find((n) => n.id === id), [notes, id]);
  const [loading, setLoading] = useState(!existing);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    let mounted = true;
    async function loadIfNeeded() {
      if (existing) {
        setLoading(false);
        return;
      }
      try {
        const n = await getNote(id);
        if (!mounted) return;
        if (!n) {
          setNotFound(true);
        }
      } finally {
        setLoading(false);
      }
    }
    loadIfNeeded();
    return () => {
      mounted = false;
    };
  }, [existing, id]);

  if (loading) {
    return <div className="ocean-card p-6">Loading…</div>;
  }
  if (notFound) {
    return <div className="ocean-card p-6">Note not found.</div>;
  }

  const note = existing!;
  return (
    <div className="space-y-4">
      <div className="ocean-card ocean-gradient p-4 md:p-5">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-gray-900">{note?.title || "Untitled"}</h1>
            <p className="text-sm text-gray-600">Last updated {new Date(note.updatedAt).toLocaleString()}</p>
          </div>
        </div>
      </div>

      <NoteEditor
        initialTitle={note?.title}
        initialContent={note?.content}
        onSave={async (title, content) => {
          await saveNote(id, { title, content });
        }}
        onCancel={() => router.push("/")}
        onDelete={async () => {
          await removeNote(id);
          router.push("/");
        }}
      />

      <Toast toasts={toasts} />
    </div>
  );
}
