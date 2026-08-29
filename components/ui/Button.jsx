import { LoaderCircle } from "lucide-react";

const variants = {
  primary: "bg-brand-600 text-white hover:bg-brand-700 active:bg-brand-700",
  secondary: "border border-line bg-surface text-ink hover:border-brand-500 hover:bg-brand-50",
  ghost: "text-ink hover:bg-brand-50",
  danger: "bg-danger text-white hover:opacity-90",
};
const sizes = { sm: "min-h-9 px-3 text-sm", md: "min-h-11 px-4 text-sm", lg: "min-h-12 px-5 text-base" };

export default function Button({ className = "", variant = "primary", size = "md", loading = false, disabled, children, type = "button", ...props }) {
  return <button type={type} disabled={disabled || loading} className={`inline-flex items-center justify-center gap-2 rounded-md font-semibold transition-colors duration-200 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-45 ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
    {loading && <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" />}{children}
  </button>;
}
