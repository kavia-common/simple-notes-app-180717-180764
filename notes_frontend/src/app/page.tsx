"use client";

import SearchBar from "@/components/SearchBar";
import NoteList from "@/components/NoteList";
import Toast from "@/components/Toast";
import { useNotes } from "@/hooks/useNotes";
import Link from "next/link";

export default function Home() {
  const { filtered, query, setQuery, loading, error, toasts } = useNotes();

  return (
    <div className="space-y-4">
      <div className="ocean-card ocean-gradient p-4 md:p-5">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-xl font-semibold text-gray-900">All Notes</h1>
            <p className="text-sm text-gray-600">Create, search, and manage your notes.</p>
          </div>
          <div className="md:min-w-[320px]">
            <SearchBar value={query} onChange={setQuery} />
          </div>
        </div>
      </div>

      {loading && (
        <div className="ocean-card p-6">Loading notes…</div>
      )}
      {error && (
        <div className="ocean-card p-6 border-red-200">
          <div className="text-red-600 text-sm">{error}</div>
        </div>
      )}

      {!loading && <NoteList notes={filtered} />}

      <div className="fixed bottom-4 left-4">
        <Link href="/notes/new" className="ocean-btn-secondary shadow">
          + New Note
        </Link>
      </div>

      <Toast toasts={toasts} />
    </div>
  );
}
