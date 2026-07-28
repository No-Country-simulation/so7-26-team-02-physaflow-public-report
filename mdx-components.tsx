import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // prose-invert = light text for dark backgrounds (brand forest-green).
    // prose-green was for light pages and made headings nearly invisible here.
    wrapper: ({ children }) => (
      <article className="prose prose-invert lg:prose-xl mx-auto my-8 px-4 prose-headings:text-foreground prose-p:text-muted prose-strong:text-accent-light prose-a:text-accent">
        {children}
      </article>
    ),
    ...components,
  };
}