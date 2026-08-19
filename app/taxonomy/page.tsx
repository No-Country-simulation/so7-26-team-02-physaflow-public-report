import Link from "next/link";
import { Building2, Server, Workflow } from "lucide-react";
import { getTaxonomyLayers, taxonomyPath } from "./layers";

const iconMap: Record<string, React.ElementType> = {
  facility: Building2,
  it: Server,
  workload: Workflow,
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
      <article className="prose prose-invert lg:prose-lg mx-auto w-full max-w-3xl pt-8 pb-16 sm:pt-12 sm:pb-24 md:pt-16 md:pb-32">
      <h1 className="mb-8 mt-0 text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">Taxonomy — Las tres capas</h1>
      <p>
        Stranded capacity aparece en tres capas distintas del data center:
        Facility, IT y Workload. La taxonomía las separa porque cada una tiene
        su propia unidad de medida, sus propios responsables y su propia forma
        de desperdiciar capacidad ya pagada.
      </p>
      <p>
        Facility aporta la energía y el enfriamiento que hacen utilizable la
        infraestructura. IT mueve los datos entre esa energía y las cargas.
        Workload decide qué se ejecuta y cuándo. Una capa puede operar dentro de
        sus propios márgenes y aun así dejar sin uso la capacidad que las otras
        dos ya entregaron.
      </p>
      <p>
        El problema no nace dentro de una capa, sino entre ellas. Facility
        dimensiona para una densidad promedio y planifica el balanceo sin
        retroalimentación desde el cómputo; IT provisiona contra picos teóricos
        en lugar del perfil real de las cargas; Workload conserva márgenes de
        seguridad heredados y lanza sus lotes en ventanas fijas. Cada decisión
        es razonable de forma aislada, pero ninguna ve las restricciones de las
        otras. Esa falta de coordinación es la que convierte capacidad instalada
        y pagada en capacidad varada.
      </p>

      <ul className="not-prose space-y-4">
        {layers.map((layer) => {
          const Icon = iconMap[layer.slug];
          return (
            <li key={layer.slug}>
              <Link
                href={taxonomyPath(layer.slug)}
                className="group flex flex-col sm:flex-row sm:items-start gap-4 rounded-xl border border-border bg-gradient-to-b from-surface to-surface/80 p-6 transition-all duration-300 hover:border-accent/50 hover:bg-surface hover:shadow-[0_8px_30px_rgba(201,162,39,0.08)]"
              >
                {Icon && (
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-border bg-background/80 text-accent transition-all duration-300 group-hover:border-accent/40 group-hover:bg-accent/10 group-hover:scale-105 shadow-inner">
                    <Icon className="h-6 w-6" />
                  </span>
                )}
                <div>
                  <span className="block text-lg font-bold tracking-tight text-foreground transition-colors duration-300 group-hover:text-accent sm:text-xl">
                    {layer.navLabel}
                  </span>
                  <span className="mt-2 block text-sm leading-relaxed text-muted transition-colors group-hover:text-foreground/80">
                    {layer.shortDescription}
                  </span>
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