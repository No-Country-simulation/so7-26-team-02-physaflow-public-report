import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // El contenedor principal de todo el MDX
    wrapper: ({ children }) => (
      <article className="prose prose-invert lg:prose-xl mx-auto my-8 prose-headings:text-foreground prose-p:text-muted prose-strong:text-accent-light prose-a:text-accent">
        {children}
      </article>
    ),
    
    // Título principal de la sección
    h1: ({ children }) => (
      <h1 className="mb-8 mt-0 text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
        {children}
      </h1>
    ),
    
    // Subtítulos (ej. "Qué se observa", "Qué cuesta")
    h2: ({ children }) => (
      <h2 className="mt-10 mb-4 border-b border-border pb-2 text-xl font-semibold text-foreground sm:mt-12 sm:text-2xl md:text-3xl">
        {children}
      </h2>
    ),
    
    // Títulos menores (ej. "Indicadores")
    h3: ({ children }) => (
      <h3 className="mt-6 mb-3 text-lg font-semibold text-accent-light sm:mt-8 sm:text-xl md:text-2xl">
        {children}
      </h3>
    ),
    
    // Párrafos: máxima legibilidad
    p: ({ children }) => (
      <p className="mb-6 leading-relaxed text-foreground/90">
        {children}
      </p>
    ),
    
    // Listas (para los indicadores)
    ul: ({ children }) => (
      <ul className="mb-6 list-disc space-y-2 pl-6 text-foreground/90 marker:text-accent">
        {children}
      </ul>
    ),
    
    // Citas o definiciones importantes
    blockquote: ({ children }) => (
      <blockquote className="my-6 border-l-4 border-accent bg-surface py-2 pl-4 pr-3 text-sm italic text-foreground sm:pl-6 sm:pr-4 sm:text-base">
        {children}
      </blockquote>
    ),
    
    // Tablas de datos (crítico para las métricas en móvil)
    table: ({ children }) => (
      <div className="my-8 overflow-x-auto">
        <table className="w-full border-collapse text-left text-sm text-foreground/90">
          {children}
        </table>
      </div>
    ),
    th: ({ children }) => (
      <th className="border-b border-border bg-primary px-3 py-2 font-semibold text-accent-light sm:px-4 sm:py-3">
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td className="border-b border-border px-3 py-2 sm:px-4 sm:py-3">
        {children}
      </td>
    ),

    // Enlaces
    a: ({ children, href }) => (
      <a href={href} className="text-accent underline decoration-accent/40 underline-offset-2 transition-colors hover:text-accent-light hover:decoration-accent">
        {children}
      </a>
    ),

    ...components,
  };
}