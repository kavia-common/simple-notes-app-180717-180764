"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type HeaderProps = {
  onCreate?: () => void;
  right?: React.ReactNode;
};

export default function Header({ onCreate, right }: HeaderProps) {
  const router = useRouter();
  return (
    <header className="app-header">
      <div className="mx-auto max-w-screen-2xl px-4 md:px-6">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-blue-600/10 flex items-center justify-center">
              <span className="h-3 w-3 rounded bg-blue-600 block" />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-sm text-gray-500">Simple</span>
              <span className="text-base font-semibold text-gray-900">Ocean Notes</span>
            </div>
          </Link>

          <div className="flex items-center gap-2">
            {right}
            <button
              type="button"
              className="ocean-btn-primary"
              onClick={() => (onCreate ? onCreate() : router.push("/notes/new"))}
              aria-label="Create new note"
            >
              + New Note
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
