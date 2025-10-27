"use client";

import Link from "next/link";
import { Note } from "@/lib/notesApi";

export default function NoteItem({ note }: { note: Note }) {
  const date = new Date(note.updatedAt).toLocaleString();
  const snippet = note.content.length > 140 ? note.content.slice(0, 140) + "…" : note.content;

  return (
    <Link href={`/notes/${note.id}`} className="block">
      <article className="ocean-card ocean-card-hover p-4 h-full">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-base font-semibold text-gray-900">{note.title || "Untitled"}</h3>
          <span className="ocean-badge">{date}</span>
        </div>
        <p className="mt-2 text-sm text-gray-600 whitespace-pre-line">{snippet || "No content"}</p>
      </article>
    </Link>
  );
}
