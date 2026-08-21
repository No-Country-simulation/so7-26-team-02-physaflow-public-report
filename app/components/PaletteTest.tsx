export default function PaletteTest() {
    return (
      <div className="max-w-md rounded-xl bg-background border border-border p-6 space-y-4">
        <h2 className="text-xl font-bold text-foreground">
          PhysaFlow Palette
        </h2>
  
        <p className="text-muted">
          This is a preview of the design system colors.
        </p>
  
        <div className="flex gap-3">
          <button type="button" className="px-4 py-2 rounded-lg bg-accent text-background font-medium hover:bg-accent-light transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">
            Primary
          </button>
  
          <button type="button" className="px-4 py-2 rounded-lg border border-border text-foreground hover:bg-primary transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">
            Secondary
          </button>
        </div>
  
        <div className="flex gap-2">
          <span className="h-8 w-8 rounded bg-background border border-border" aria-hidden="true" />
          <span className="h-8 w-8 rounded bg-surface" aria-hidden="true" />
          <span className="h-8 w-8 rounded bg-primary" aria-hidden="true" />
          <span className="h-8 w-8 rounded bg-accent" aria-hidden="true" />
          <span className="h-8 w-8 rounded bg-accent-light" aria-hidden="true" />
        </div>
      </div>
    );
  }