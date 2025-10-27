"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const path = usePathname();
  const linkClass = (href: string) =>
    `flex items-center gap-2 rounded-md px-3 py-2 text-sm transition ${
      path === href ? "bg-blue-50 text-blue-700 font-medium" : "text-gray-700 hover:bg-gray-50"
    }`;

  return (
    <aside className="app-sidebar">
      <div className="h-16 border-b border-gray-100 flex items-center px-4">
        <span className="text-sm text-gray-500">Navigation</span>
      </div>
      <nav className="p-3 space-y-1">
        <Link href="/" className={linkClass("/")}>
          📝 All Notes
        </Link>
        <Link href="/notes/new" className={linkClass("/notes/new")}>
          ➕ Create
        </Link>
      </nav>
      <div className="px-4 pt-4">
        <div className="ocean-card p-3">
          <div className="text-sm font-medium text-gray-900">Tips</div>
          <p className="text-xs text-gray-600 mt-1">
            Use the search bar to quickly filter notes by title or content.
          </p>
        </div>
      </div>
    </aside>
  );
}
