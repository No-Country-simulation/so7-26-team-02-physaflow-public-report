import Link from "next/link";
import { getTaxonomyLayers, taxonomyPath } from "./layers";

export const metadata = {
  title: "Taxonomy — PhysaFlow",
  description:
    "Las tres capas donde aparece stranded capacity: Facility, IT y Workload.",
};

export default function TaxonomyPage() {
  const layers = getTaxonomyLayers();

  return (
    <article className="prose prose-invert mx-auto max-w-3xl py-12">
      <h1>Taxonomy</h1>
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
        {layers.map((layer) => (
          <li key={layer.slug}>
            <Link
              href={taxonomyPath(layer.slug)}
              className="block border border-border bg-surface p-6 transition-colors hover:border-accent"
            >
              <span className="block text-lg font-semibold text-accent">
                {layer.navLabel}
              </span>
              <span className="mt-2 block text-sm text-muted">
                {layer.shortDescription}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </article>
  );
}