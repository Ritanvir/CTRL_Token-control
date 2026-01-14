export default function SectionCard({
    title,
    children,
    subtitle,
  }: {
    title: string;
    subtitle?: string;
    children: React.ReactNode;
  }) {
    return (
      <div className="rounded-3xl bg-white/5 border border-white/10 p-5 backdrop-blur-xl shadow-xl">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="text-xl font-semibold text-white">{title}</h3>
          {subtitle ? <span className="text-xs text-white/60">{subtitle}</span> : null}
        </div>
        <div className="mt-4">{children}</div>
      </div>
    );
  }
  