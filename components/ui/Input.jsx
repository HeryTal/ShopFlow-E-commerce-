export default function Input({ className = "", ...props }) {
  return <input className={`min-h-11 w-full rounded-md border border-line bg-surface px-3 text-sm text-ink placeholder:text-muted transition-colors focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100 disabled:cursor-not-allowed disabled:bg-canvas disabled:opacity-60 ${className}`} {...props} />;
}
