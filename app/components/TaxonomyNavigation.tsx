"use client";

import Link from "next/link";
import {
  Building2,
  Server,
  Workflow,
  ArrowLeft,
  ArrowRight,
  Network,
  Quote,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Navigation Map                                                     */
/* ------------------------------------------------------------------ */

type NavTarget = {
  href: string;
  label: string;
  shortLabel: string;
  badgeLabel?: string;
  subtitle: string;
  icon: typeof Building2;
};

type NavEntry = {
  step: number;
  prev: NavTarget | null;
  next: NavTarget | null;
};

const TOTAL_STEPS = 3;

const navigationMap: Record<string, NavEntry> = {
  facility: {
    step: 1,
    prev: {
      href: "/taxonomy",
      label: "Taxonomy",
      shortLabel: "Taxonomía",
      badgeLabel: "Volver a Taxonomía",
      subtitle: "Índice y visión general de las 3 capas",
      icon: Network,
    },
    next: {
      href: "/taxonomy/it",
      label: "IT — Red y Almacenamiento",
      shortLabel: "IT",
      badgeLabel: "Siguiente Capa",
      subtitle: "Red, almacenamiento y cuellos de botella en la malla",
      icon: Server,
    },
  },
  it: {
    step: 2,
    prev: {
      href: "/taxonomy/facility",
      label: "Facility — Energía y Enfriamiento",
      shortLabel: "Facility",
      badgeLabel: "Capa Anterior",
      subtitle: "Capacidad eléctrica y térmica instalada",
      icon: Building2,
    },
    next: {
      href: "/taxonomy/workload",
      label: "Workload — Orquestación de Cargas",
      shortLabel: "Workload",
      badgeLabel: "Siguiente Capa",
      subtitle: "Planificación y cómputo ocioso reservado",
      icon: Workflow,
    },
  },
  workload: {
    step: 3,
    prev: {
      href: "/taxonomy/it",
      label: "IT — Red y Almacenamiento",
      shortLabel: "IT",
      badgeLabel: "Capa Anterior",
      subtitle: "Red, almacenamiento y cuellos de botella en la malla",
      icon: Server,
    },
    next: {
      href: "/evidence",
      label: "Evidence — Datos y Casos",
      shortLabel: "Evidencia",
      badgeLabel: "Siguiente Sección",
      subtitle: "Pasar a la siguiente página del reporte: Evidencia",
      icon: Quote,
    },
  },
};

/* ------------------------------------------------------------------ */
/*  HEADER — Minimal top nav: ← Taxonomía · ●○○ →                    */
/* ------------------------------------------------------------------ */

type TaxonomyNavProps = {
  currentSlug: string;
};

/**
 * Minimal contextual header with centered "Taxonomía" link,
 * step progress dots, and prev/next arrow buttons on each side.
 */
export function TaxonomyHeaderNav({ currentSlug }: TaxonomyNavProps) {
  const entry = navigationMap[currentSlug];
  if (!entry) return null;

  const { step, prev, next } = entry;

  return (
    <div className="not-prose -mt-[46px] mb-[10px] flex items-center justify-between border-b border-border/50 pb-2 sm:-mt-[56px] sm:mb-5 md:-mt-16 md:mb-7">
      {/* Left arrow */}
      {prev ? (
        <Link
          href={prev.href}
          title={`Anterior: ${prev.label}`}
          className="group flex h-8 w-8 items-center justify-center rounded-md border border-border bg-surface text-muted transition-all hover:border-accent/40 hover:bg-accent/10 hover:text-accent active:scale-95"
        >
          <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
        </Link>
      ) : (
        <span className="flex h-8 w-8 items-center justify-center rounded-md border border-border/20 text-muted/25" aria-disabled="true" role="img" aria-label="Sin página anterior">
          <ChevronLeft className="h-4 w-4" aria-hidden="true" />
        </span>
      )}

      {/* Center: Taxonomy link + step dots */}
      <div className="flex items-center gap-3">
        <Link
          href="/taxonomy"
          className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-widest text-muted transition-colors hover:text-accent"
        >
          <Network className="h-3.5 w-3.5" aria-hidden="true" />
          <span>Taxonomía</span>
        </Link>

        <span aria-hidden="true" className="text-border/60">·</span>

        {/* Progress dots */}
        <div className="flex items-center gap-1" aria-label={`Paso ${step} de ${TOTAL_STEPS}`}>
          {Array.from({ length: TOTAL_STEPS }, (_, i) => i + 1).map((s) => (
            <span
              key={s}
              className={`block rounded-full transition-all ${
                s === step
                  ? "h-2 w-5 bg-accent"
                  : "h-2 w-2 bg-border"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Right arrow */}
      {next ? (
        <Link
          href={next.href}
          title={`Siguiente: ${next.label}`}
          className="group flex h-8 w-8 items-center justify-center rounded-md border border-border bg-surface text-muted transition-all hover:border-accent/40 hover:bg-accent/10 hover:text-accent active:scale-95"
        >
          <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      ) : (
        <span className="flex h-8 w-8 items-center justify-center rounded-md border border-border/20 text-muted/25" aria-disabled="true" role="img" aria-label="Sin página siguiente">
          <ChevronRight className="h-4 w-4" aria-hidden="true" />
        </span>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  BOTTOM — Editorial navigation cards                                */
/* ------------------------------------------------------------------ */

/**
 * Bottom navigation block with perfectly aligned, equal-height prev/next cards.
 */
export default function TaxonomyNavigation({ currentSlug }: TaxonomyNavProps) {
  const entry = navigationMap[currentSlug];
  if (!entry) return null;

  const { prev, next } = entry;

  return (
    <nav
      aria-label="Navegación entre capas de taxonomía"
      className="not-prose mt-16 mb-6"
    >
      {/* Divider */}
      <div className="mb-6 flex items-center gap-4">
        <span className="text-[10px] font-semibold uppercase tracking-widest text-accent">
          Continuar leyendo
        </span>
        <span aria-hidden="true" className="h-px flex-1 bg-border/80" />
      </div>

      {/* Cards grid — always 2 cols on md+, perfectly aligned */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* Previous card or empty placeholder for alignment */}
        {prev ? (
          <NavCard target={prev} direction="prev" />
        ) : (
          <div aria-hidden="true" className="hidden md:block" />
        )}

        {/* Next card or empty placeholder for alignment */}
        {next ? (
          <NavCard target={next} direction="next" />
        ) : (
          <div aria-hidden="true" className="hidden md:block" />
        )}
      </div>
    </nav>
  );
}

/* ------------------------------------------------------------------ */
/*  NavCard — equal-size, leveled card subcomponent                   */
/* ------------------------------------------------------------------ */

function NavCard({
  target,
  direction,
}: {
  target: NavTarget;
  direction: "prev" | "next";
}) {
  const Icon = target.icon;
  const isPrev = direction === "prev";
  const badge = target.badgeLabel ?? (isPrev ? "Anterior" : "Siguiente");

  return (
    <Link
      href={target.href}
      className="group relative flex min-h-[136px] flex-col justify-between overflow-hidden rounded-xl border border-border bg-gradient-to-b from-surface to-surface/80 p-5 transition-all duration-300 hover:border-accent/50 hover:bg-surface hover:shadow-[0_8px_30px_rgba(201,162,39,0.08)]"
    >
      {/* Top accent highlight */}
      <span
        aria-hidden="true"
        className={`absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r ${
          isPrev
            ? "from-accent/70 via-accent/30 to-transparent"
            : "from-transparent via-accent/30 to-accent/70"
        } opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
      />

      {/* Top row: Label badge + Icon (level on both cards) */}
      <div
        className={`flex items-center justify-between gap-3 ${
          isPrev ? "flex-row" : "flex-row-reverse"
        }`}
      >
        <div
          className={`flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-widest text-muted transition-colors group-hover:text-accent/90 ${
            isPrev ? "flex-row" : "flex-row-reverse"
          }`}
        >
          {isPrev ? (
            <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" aria-hidden="true" />
          ) : (
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          )}
          <span>{badge}</span>
        </div>

        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border bg-background/80 text-accent transition-all duration-300 group-hover:border-accent/40 group-hover:bg-accent/10 group-hover:scale-105 shadow-inner">
          <Icon className="h-4.5 w-4.5" />
        </span>
      </div>

      {/* Bottom row: Title and subtitle (level baseline) */}
      <div className={`mt-3 ${isPrev ? "text-left" : "text-right"}`}>
        <span className="block text-base font-bold tracking-tight text-foreground transition-colors duration-300 group-hover:text-accent sm:text-lg">
          {target.label}
        </span>

        <span className="mt-1 line-clamp-1 block text-xs leading-relaxed text-muted transition-colors group-hover:text-foreground/80">
          {target.subtitle}
        </span>
      </div>
    </Link>
  );
}
