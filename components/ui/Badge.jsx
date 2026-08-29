const tones = { brand: "bg-brand-100 text-brand-700", success: "bg-emerald-50 text-success", danger: "bg-red-50 text-danger", neutral: "bg-canvas text-muted" };
export default function Badge({ tone = "neutral", className = "", children }) { return <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${tones[tone]} ${className}`}>{children}</span>; }
