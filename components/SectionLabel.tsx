// A section header with the crimson/ink double-rule style

interface SectionLabelProps {
  children: React.ReactNode;
  className?: string;
}

export default function SectionLabel({ children, className = '' }: SectionLabelProps) {
  return (
    <div className={`section-rule ${className}`}>
      <h2 className="text-xs font-sans font-semibold tracking-[0.2em] uppercase text-ink">
        {children}
      </h2>
    </div>
  );
}
