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
    <article className="prose prose-invert mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1>Taxonomy</h1>
      <p>
        Stranded capacity aparece en tres capas distintas del data center.
        Cada una tiene su propia forma de desperdiciar capacidad ya pagada.
      </p>

      <ul className="not-prose space-y-4">
        {layers.map((layer) => (
          <li key={layer.slug}>
            <Link
              href={taxonomyPath(layer.slug)}
              className="block border border-border bg-surface p-6 transition-colors hover:border-primary"
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