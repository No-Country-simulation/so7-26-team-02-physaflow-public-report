export default function Home() {
  return (
    // Ajustamos padding horizontal: px-4 para mobile, sm:px-6 para el resto
    <main className="flex min-h-screen w-full justify-center bg-background px-4 py-8 sm:px-6 sm:py-16">
      <article className="flex w-full max-w-3xl flex-col">
        
        <header className="mb-10 border-b border-border pb-6 sm:mb-12 sm:pb-8">
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

        <section className="prose prose-invert lg:prose-lg max-w-none">
          <h2 className="mt-10 mb-4 border-b border-border pb-2 text-xl font-semibold text-foreground sm:mt-12 sm:text-2xl md:text-3xl">
            Resumen Ejecutivo
          </h2>
          <p className="mb-6 leading-relaxed text-foreground/90">
            A medida que los data centers modernos escalan para soportar cargas de trabajo de Inteligencia Artificial, surge una ineficiencia silenciosa: la <strong className="text-accent-light">stranded capacity</strong> (capacidad varada). Este fenómeno ocurre cuando la infraestructura física y las capas operativas no se coordinan, dejando capacidad energética o computacional encendida y pagada, pero inutilizable.
          </p>
          <p className="mb-6 leading-relaxed text-foreground/90">
            Este reporte presenta una taxonomía estandarizada para clasificar el desperdicio en tres capas críticas: Facility, IT y Workload. El objetivo es proveer a operadores y stakeholders con el vocabulario necesario para diagnosticar estas restricciones de forma precisa.
          </p>

          <blockquote className="my-6 border-l-4 border-accent bg-surface py-2 pl-4 pr-3 text-sm italic text-foreground sm:pl-6 sm:pr-4 sm:text-base">
            Illustrative data — not based on measured PhysaFlow results. Este reporte utiliza métricas de ejemplo para demostrar la estructura de la taxonomía.
          </blockquote>
        </section>

      </article>
    </main>
  );
}