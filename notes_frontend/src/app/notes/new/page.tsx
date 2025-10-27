"use client";

import { useRouter } from "next/navigation";
import NoteEditor from "@/components/NoteEditor";
import Toast from "@/components/Toast";
import { useNotes } from "@/hooks/useNotes";

export default function NewNotePage() {
  const { addNote, toasts } = useNotes();
  const router = useRouter();

  return (
    <div className="space-y-4">
      <div className="ocean-card ocean-gradient p-4 md:p-5">
        <h1 className="text-xl font-semibold text-gray-900">Create Note</h1>
        <p className="text-sm text-gray-600">Compose a new note and click save.</p>
      </div>

      <NoteEditor
        onSave={async (title, content) => {
          const created = await addNote(title, content);
          router.push(`/notes/${created.id}`);
        }}
        onCancel={() => router.push("/")}
        onDelete={null}
      />

      <Toast toasts={toasts} />
    </div>
  );
}
