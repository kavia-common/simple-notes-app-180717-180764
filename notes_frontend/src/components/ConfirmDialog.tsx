"use client";

type Props = {
  open: boolean;
  title: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function ConfirmDialog({
  open,
  title,
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
}: Props) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 p-4">
      <div className="ocean-card max-w-sm w-full p-5">
        <h4 className="text-base font-semibold text-gray-900">{title}</h4>
        {description && <p className="mt-1 text-sm text-gray-600">{description}</p>}
        <div className="mt-4 flex justify-end gap-2">
          <button className="ocean-btn-ghost" onClick={onCancel}>
            {cancelText}
          </button>
          <button className="ocean-btn" style={{ backgroundColor: "var(--ocean-error)", color: "white" }} onClick={onConfirm}>
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
