"use client";

import React, { useEffect, useState } from "react";
import ConfirmDialog from "./ConfirmDialog";

type Props = {
  initialTitle?: string;
  initialContent?: string;
  onSave: (title: string, content: string) => Promise<void> | void;
  onCancel?: () => void;
  onDelete?: (() => Promise<void> | void) | null;
  saving?: boolean;
};

export default function NoteEditor({
  initialTitle = "",
  initialContent = "",
  onSave,
  onCancel,
  onDelete,
  saving = false,
}: Props) {
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
  const [confirmOpen, setConfirmOpen] = useState(false);

  useEffect(() => {
    setTitle(initialTitle);
    setContent(initialContent);
  }, [initialTitle, initialContent]);

  return (
    <div className="space-y-4">
      <div className="ocean-card p-4">
        <input
          className="ocean-input text-base font-semibold"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="ocean-textarea mt-3"
          placeholder="Write your note..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      <div className="flex items-center justify-between">
        {onDelete ? (
          <button
            type="button"
            className="ocean-btn-ghost text-red-600 border-red-200"
            onClick={() => setConfirmOpen(true)}
          >
            Delete
          </button>
        ) : <span />}
        <div className="flex items-center gap-2">
          {onCancel && (
            <button type="button" className="ocean-btn-ghost" onClick={onCancel}>
              Cancel
            </button>
          )}
          <button
            type="button"
            className="ocean-btn-primary"
            onClick={() => onSave(title, content)}
            disabled={saving}
          >
            {saving ? "Saving..." : "Save"}
          </button>
        </div>
      </div>

      <ConfirmDialog
        open={confirmOpen}
        title="Delete this note?"
        description="This action cannot be undone."
        confirmText="Delete"
        onCancel={() => setConfirmOpen(false)}
        onConfirm={async () => {
          setConfirmOpen(false);
          if (onDelete) await onDelete();
        }}
      />
    </div>
  );
}
