import Link from "next/link";
import Image from "next/image";
import { Building2, Server, Workflow, ArrowRight } from "lucide-react";
import { getTaxonomyLayers, taxonomyPath } from "./layers";

const iconMap: Record<string, React.ElementType> = {
  facility: Building2,
  it: Server,
  workload: Workflow,
};

const layerNumberMap: Record<string, string> = {
  facility: "Capa 01",
  it: "Capa 02",
  workload: "Capa 03",
};

export const metadata = {
  title: "Taxonomy — PhysaFlow",
  description:
    "Las tres capas donde aparece stranded capacity: Facility, IT y Workload.",
};

export default function TaxonomyPage() {
  const layers = getTaxonomyLayers();

  return (
    <div className="w-full">
      <article className="prose prose-invert lg:prose-lg mx-auto w-full max-w-3xl pt-14 pb-16 sm:pt-[76px] sm:pb-24 md:pt-[92px] md:pb-32 prose-headings:text-foreground prose-p:text-muted prose-strong:text-accent-light prose-a:text-accent">
        <h1 className="mb-8 mt-0 text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
          Taxonomy — Las tres capas
        </h1>

        <figure className="not-prose mb-10 overflow-hidden rounded-xl border border-border sm:mb-12">
          <div className="relative aspect-[16/9] w-full bg-surface">
            <Image
              src="/images/hero-datacenter-v3.png"
              alt="Ilustración conceptual de las tres capas de un data center"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 768px"
            />
          </div>
          <figcaption className="border-t border-border bg-surface/50 px-4 py-2.5 text-center text-xs text-muted">
            <strong className="font-semibold text-accent">Figura 2.</strong> Desglose taxonómico de recursos: Facility, IT y Workload.
          </figcaption>
        </figure>

        <p>
          La <em>stranded capacity</em> no es un fenómeno homogéneo: aparece en tres capas distintas del data center: <strong>Facility</strong>, <strong>IT</strong> y <strong>Workload</strong>. La taxonomía las separa porque cada una tiene su propia unidad de medida, sus propios responsables y su propia forma de desperdiciar capacidad ya pagada.
        </p>
        <p>
          <strong>Facility</strong> aporta la energía y el enfriamiento que hacen utilizable la infraestructura. <strong>IT</strong> mueve los datos entre esa energía y las cargas. <strong>Workload</strong> decide qué se ejecuta y cuándo. Una capa puede operar dentro de sus propios márgenes y aun así dejar sin uso la capacidad que las otras dos ya entregaron.
        </p>

        <p className="mb-6">
          <strong>El problema no nace dentro de una capa, sino entre ellas.</strong> <strong>Facility</strong> dimensiona para una densidad promedio y planifica el balanceo sin retroalimentación desde el cómputo; <strong>IT</strong> provisiona contra picos teóricos en lugar del perfil real de las cargas; <strong>Workload</strong> conserva márgenes de seguridad heredados y lanza sus lotes en ventanas fijas.
        </p>

        <blockquote className="my-8 border-l-4 border-accent bg-surface py-3 pl-4 pr-3 text-base italic text-foreground sm:pl-6 sm:pr-4 sm:text-lg">
          Cada decisión es razonable de forma aislada, pero ninguna ve las restricciones de las otras. Esa falta de coordinación es la que convierte capacidad instalada y pagada en capacidad varada.
        </blockquote>

        <div className="mb-6 mt-12 flex items-center gap-4">
          <span className="text-xs font-medium uppercase tracking-widest text-accent">
            Capas del reporte
          </span>
          <span aria-hidden="true" className="h-px flex-1 bg-border" />
        </div>

        <ul className="not-prose space-y-4">
          {layers.map((layer) => {
            const Icon = iconMap[layer.slug];
            const layerNumber = layerNumberMap[layer.slug];

            return (
              <li key={layer.slug}>
                <Link
                  href={taxonomyPath(layer.slug)}
                  className="group flex flex-col sm:flex-row sm:items-start justify-between gap-5 rounded-xl border border-border bg-gradient-to-b from-surface to-surface/80 p-6 transition-all duration-300 hover:border-accent/50 hover:bg-surface hover:shadow-[0_8px_30px_rgba(201,162,39,0.08)]"
                >
                  <div className="flex items-start gap-4">
                    {Icon && (
                      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-border bg-background/80 text-accent transition-all duration-300 group-hover:border-accent/40 group-hover:bg-accent/10 group-hover:scale-105 shadow-inner">
                        <Icon className="h-6 w-6" />
                      </span>
                    )}
                    <div>
                      <div className="flex items-center">
                        <span className="text-[12px] font-bold uppercase tracking-widest text-accent">
                          {layerNumber}
                        </span>
                      </div>
                      <span className="mt-1 block text-lg font-bold tracking-tight text-foreground transition-colors duration-300 group-hover:text-accent sm:text-xl">
                        {layer.title}
                      </span>
                      <span className="mt-2 block text-sm leading-relaxed text-muted transition-colors group-hover:text-foreground/80">
                        {layer.shortDescription}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 self-end sm:self-center text-xs font-semibold text-accent/80 transition-all group-hover:text-accent group-hover:translate-x-1 shrink-0 pt-2 sm:pt-0">
                    <span>Ver capa</span>
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>

      </article>
    </div>
  );
}