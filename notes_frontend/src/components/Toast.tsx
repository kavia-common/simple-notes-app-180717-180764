"use client";

import { ToastMessage } from "@/hooks/useNotes";

export default function Toast({ toasts }: { toasts: ToastMessage[] }) {
  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-2">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`ocean-card px-4 py-3 shadow-md border ${
            t.type === "success"
              ? "border-green-100"
              : t.type === "error"
              ? "border-red-100"
              : "border-gray-100"
          }`}
          style={{
            borderLeft: `4px solid ${
              t.type === "success" ? "var(--ocean-success)" : t.type === "error" ? "var(--ocean-error)" : "var(--ocean-primary)"
            }`,
          }}
        >
          <div className="text-sm font-medium text-gray-900">{t.title}</div>
          {t.message && <div className="text-xs text-gray-600 mt-0.5">{t.message}</div>}
        </div>
      ))}
    </div>
  );
}
