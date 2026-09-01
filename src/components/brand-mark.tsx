export function BrandMark({ className = "" }: { className?: string }) {
  return (
    <span className={`pc-brand-mark ${className}`} aria-hidden="true">
      <i />
      <i />
      <i />
    </span>
  );
}
