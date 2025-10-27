"use client";

import { Note } from "@/lib/notesApi";
import NoteItem from "./NoteItem";

type Props = {
  notes: Note[];
};

export default function NoteList({ notes }: Props) {
  if (!notes.length) {
    return (
      <div className="ocean-card p-10 text-center">
        <div className="mx-auto mb-3 h-10 w-10 rounded-full bg-blue-600/10 flex items-center justify-center">
          <span className="text-blue-600">📝</span>
        </div>
        <h3 className="text-lg font-semibold text-gray-900">No notes yet</h3>
        <p className="mt-1 text-sm text-gray-600">Create your first note to get started.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {notes.map((n) => (
        <NoteItem key={n.id} note={n} />
      ))}
    </div>
  );
}
