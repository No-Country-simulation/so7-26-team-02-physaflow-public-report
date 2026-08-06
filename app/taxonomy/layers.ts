export type TaxonomyLayer = {
  slug: string;
  navLabel: string;
  title: string;
  shortDescription: string;
  order: number;
};

const layers: TaxonomyLayer[] = [
  {
    slug: "facility",
    navLabel: "Facility",
    title: "Facility — Energía y Enfriamiento",
    shortDescription:
      "Capacidad eléctrica y térmica instalada que está pagada y encendida, pero no puede entregar trabajo computacional.",
    order: 1,
  },
  {
    slug: "it",
    navLabel: "IT",
    title: "IT — Red y Almacenamiento",
    shortDescription:
      "Red, almacenamiento y cómputo instalados y energizados, donde el tráfico o los datos no fluyen a su rendimiento nominal.",
    order: 2,
  },
  {
    slug: "workload",
    navLabel: "Workload",
    title: "Workload — Orquestación de Cargas",
    shortDescription:
      "Cómputo ya disponible que el planificador no logra ocupar: núcleos reservados sin tareas y ventanas desaprovechadas.",
    order: 3,
  },
];

export function taxonomyPath(slug: string): string {
  return `/taxonomy/${slug}`;
}

export function getTaxonomyLayers(): TaxonomyLayer[] {
  return [...layers].sort((a, b) => a.order - b.order);
}