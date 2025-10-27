# Ocean Notes Frontend

This is a simple notes UI built with Next.js (App Router) and an Ocean Professional theme.

Features:
- Header + Sidebar + Main responsive layout
- Notes list with search/filter
- Create, edit, delete notes with client-side state and optimistic updates
- Confirmation dialog for delete
- Toasts for success/error
- Placeholder API client using localStorage

Structure:
- src/lib/notesApi.ts — API abstraction (PUBLIC_INTERFACE)
- src/hooks/useNotes.ts — state management, optimistic updates, toasts
- src/components/* — UI components (Header, Sidebar, NoteList, NoteEditor, etc.)
- src/app/* — pages and layout

Wiring to backend later:
Replace the localStorage logic in `src/lib/notesApi.ts` with real fetch calls to your notes backend (notes_database).
Suggested endpoints:
- GET    /api/notes
- GET    /api/notes/:id
- POST   /api/notes
- PATCH  /api/notes/:id
- DELETE /api/notes/:id

Environment variables:
Create a `.env.local` and add e.g.
- NEXT_PUBLIC_API_BASE_URL=https://your-notes-backend

Then update `notesApi.ts` to use `process.env.NEXT_PUBLIC_API_BASE_URL`.

Styling:
Theme variables are in `src/styles/theme.css` and global helpers in `src/app/globals.css`.
