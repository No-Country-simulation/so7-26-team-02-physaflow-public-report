type IndicatorItem = {
  label: string;
  value: string;
};

type IndicatorsPanelProps = {
  title: string;
  items: IndicatorItem[];
};

export default function IndicatorsPanel({ title, items }: IndicatorsPanelProps) {
  const headingId = `indicators-${title.toLowerCase().replace(/\s+/g, "-")}`;
  return (
    <section className="my-10" aria-labelledby={headingId}>
      <div className="mb-5 flex items-center gap-4">
        <span
          id={headingId}
          style={{
            fontSize: "10px",
            fontWeight: 500,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            color: "#c9a227",
          }}
        >
          {title}
        </span>
        <span aria-hidden="true" style={{ height: "1px", flex: 1, background: "#2a3830" }} />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <div
            key={item.label}
            className="border border-border bg-surface p-6 transition-colors hover:border-primary"
          >
            <span className="block text-[10px] uppercase tracking-widest text-muted">
              {item.label}
            </span>
            <span className="mt-3 block text-2xl font-semibold tracking-tight text-accent">
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
