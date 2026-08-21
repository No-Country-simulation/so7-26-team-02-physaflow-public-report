import Image from "next/image";

export default function Home() {
  return (
    <div className="w-full">
      <article className="mx-auto flex w-full max-w-3xl flex-col pt-8 pb-16 sm:pt-12 sm:pb-24 md:pt-16 md:pb-32">
        <header className="mb-8 sm:mb-10">
          <p className="mb-2 text-xs font-medium uppercase tracking-widest text-accent sm:text-sm">
            PhysaFlow Stranded Capacity Index
          </p>
          <h1 className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
            Taxonomía de la Capacidad Varada en Data Centers de IA
          </h1>
          <p className="text-base text-muted sm:text-lg">
            Un reporte de referencia de la industria que define el vocabulario operativo para identificar y medir la capacidad pagada y encendida que no produce trabajo computacional.
          </p>
        </header>

        {/* Hero image — reemplazar src cuando la imagen esté lista */}
        <figure className="not-prose mb-10 overflow-hidden rounded-xl border border-border sm:mb-12">
          <div className="relative aspect-[16/9] w-full bg-surface">
            <Image
              src="/images/hero-datacenter-v1.png"
              alt="Ilustración conceptual de las tres capas de un data center: Facility, IT y Workload, mostrando la capacidad varada entre ellas"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 768px"
            />
          </div>
          <figcaption className="border-t border-border bg-surface/50 px-4 py-2.5 text-center text-xs text-muted">
            <strong className="font-semibold text-accent">Figura 1.</strong> Arquitectura de tres capas y focos de capacidad varada en data centers de IA.
          </figcaption>
        </figure>

        <section className="prose prose-invert lg:prose-lg max-w-none">
          <h2 className="mt-0 mb-4 border-b border-border pb-2 text-xl font-semibold tracking-tight text-foreground sm:text-2xl md:text-3xl">
            Resumen Ejecutivo
          </h2>
          <p className="mb-6 leading-relaxed text-foreground/90">
            A medida que los data centers modernos escalan para soportar cargas de trabajo de Inteligencia Artificial, surge una ineficiencia silenciosa: la <strong className="text-accent-light">stranded capacity</strong> (capacidad varada). Este fenómeno ocurre cuando la infraestructura física y las capas operativas no se coordinan, dejando capacidad energética o computacional encendida y pagada, pero inutilizable.
          </p>
          <p className="mb-6 leading-relaxed text-foreground/90">
            Este reporte presenta una taxonomía estandarizada para clasificar el desperdicio en tres capas críticas: Facility, IT y Workload. El objetivo es proveer a operadores y stakeholders con el vocabulario necesario para diagnosticar estas restricciones de forma precisa.
          </p>
        </section>
      </article>
    </div>
  );
}