import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // El contenedor principal de todo el MDX
    wrapper: ({ children }) => (
      <article className="prose lg:prose-lg mx-auto w-full max-w-3xl px-6 py-12 sm:py-16">
        {children}
      </article>
    ),
    
    // Título principal de la sección
    h1: ({ children }) => (
      <h1 className="mb-8 mt-0 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
        {children}
      </h1>
    ),
    
    // Subtítulos (ej. "Qué se observa", "Qué cuesta")
    h2: ({ children }) => (
      <h2 className="mt-12 mb-4 border-b border-border pb-2 text-2xl font-semibold text-foreground sm:text-3xl">
        {children}
      </h2>
    ),
    
    // Títulos menores (ej. "Indicadores")
    h3: ({ children }) => (
      <h3 className="mt-8 mb-3 text-xl font-semibold text-accent-light sm:text-2xl">
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
      <blockquote className="my-6 border-l-4 border-accent bg-surface py-2 pl-6 pr-4 text-foreground italic">
        {children}
      </blockquote>
    ),
    
    // Tablas de datos (crítico para las métricas)
    table: ({ children }) => (
      <div className="my-8 overflow-x-auto">
        <table className="w-full border-collapse text-left text-sm text-foreground/90">
          {children}
        </table>
      </div>
    ),
    th: ({ children }) => (
      <th className="border-b border-border bg-primary px-4 py-3 font-semibold text-accent-light">
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td className="border-b border-border px-4 py-3">
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