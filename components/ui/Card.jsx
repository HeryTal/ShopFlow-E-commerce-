export default function Card({ className = "", children, ...props }) {
  return <section className={`rounded-lg border border-line bg-surface shadow-card ${className}`} {...props}>{children}</section>;
}
