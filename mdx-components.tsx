import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    wrapper: ({ children }) => (
      <article className="prose prose-green lg:prose-xl mx-auto my-8 px-4">
        {children}
      </article>
    ),
    ...components,
  };
}