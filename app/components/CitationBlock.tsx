"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Copy } from "lucide-react";

// TODO: reemplazar con la URL pública real al publicar el reporte.
const REPORT_URL = "https://physaflow.example";

type CitationBlockProps = {
  /** Título del reporte o sección que se cita. */
  title?: string;
  /** Organización o autoría. */
  author?: string;
  /** Año de publicación. */
  year?: string;
  /** URL pública del reporte. */
  url?: string;
};

function buildAcademicCitation(
  title: string,
  author: string,
  year: string,
  url: string,
): string {
  return `${author}. (${year}). ${title}. ${url}`;
}

function buildJournalisticCitation(
  title: string,
  author: string,
  year: string,
  url: string,
): string {
  return `"${title}", por ${author}, ${year}. Disponible en: ${url}`;
}

async function copyText(text: string): Promise<boolean> {
  // Ruta moderna: solo disponible en contextos seguros (https/localhost).
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    // Se cae a la ruta legacy.
  }

  // Fallback: textarea oculta + execCommand("copy").
  try {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();
    const ok = document.execCommand("copy");
    textarea.remove();
    return ok;
  } catch {
    return false;
  }
}

export default function CitationBlock(props: CitationBlockProps) {
  const {
    title = "Taxonomía de la Capacidad Varada en Data Centers de IA",
    author = "PhysaFlow",
    year = "2026",
    url = REPORT_URL,
  } = props;

  const citations = [
    {
      id: "academic",
      label: "Formato académico (APA)",
      text: buildAcademicCitation(title, author, year, url),
    },
    {
      id: "journalistic",
      label: "Formato periodístico",
      text: buildJournalisticCitation(title, author, year, url),
    },
  ];

  const [copiedId, setCopiedId] = useState<string | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    },
    [],
  );

  const handleCopy = async (id: string, text: string) => {
    const ok = await copyText(text);
    if (!ok) return;
    setCopiedId(id);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section
      aria-labelledby="citation-heading"
      className="mt-14 border-t border-border pt-10"
    >
      <div className="mb-5 flex items-center gap-4">
        <h2
          id="citation-heading"
          className="text-xs font-medium uppercase tracking-widest text-accent"
        >
          Cómo citar este reporte
        </h2>
        <span aria-hidden="true" className="h-px flex-1 bg-border" />
      </div>

      <div className="space-y-4">
        {citations.map(({ id, label, text }) => {
          const isCopied = copiedId === id;
          return (
            <div
              key={id}
              className="flex flex-col gap-3 border border-border bg-surface p-4 sm:flex-row sm:items-center sm:gap-4 sm:p-5"
            >
              <div className="min-w-0 flex-1">
                <p className="mb-1.5 text-[10px] uppercase tracking-widest text-muted">
                  {label}
                </p>
                <p className="break-words font-mono text-sm leading-relaxed text-foreground/90">
                  {text}
                </p>
              </div>

              <button
                type="button"
                onClick={() => handleCopy(id, text)}
                className={`inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-md border px-4 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                  isCopied
                    ? "border-accent bg-accent/10 text-accent"
                    : "border-border bg-background text-accent hover:bg-primary hover:text-foreground"
                }`}
              >
                {isCopied ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
                {isCopied ? "Copiado" : "Copiar"}
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
}
