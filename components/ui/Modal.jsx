import { X } from "lucide-react";

export default function Modal({ open, onClose, title, children }) {
  if (!open) return null;
  return <div className="fixed inset-0 z-50 grid place-items-center bg-ink/40 p-4" role="presentation" onMouseDown={onClose}>
    <section role="dialog" aria-modal="true" aria-labelledby="modal-title" className="w-full max-w-lg rounded-lg border border-line bg-surface p-6 shadow-raised" onMouseDown={(event) => event.stopPropagation()}>
      <div className="flex items-start justify-between gap-4"><h2 id="modal-title" className="text-lg font-semibold text-ink">{title}</h2><button type="button" aria-label="Close dialog" onClick={onClose} className="rounded-md p-1 text-muted hover:bg-brand-50 hover:text-ink"><X className="h-5 w-5" /></button></div>
      <div className="mt-4">{children}</div>
    </section>
  </div>;
}
