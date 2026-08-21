"use client";

import { Download } from "lucide-react";
import { RefObject, useState } from "react";
import { toPng, toSvg } from "html-to-image";

interface DownloadChartButtonProps {
  chartRef: RefObject<HTMLDivElement | null>;
  title: string;
  format?: "png" | "svg";
}

const ATTRIBUTION = "PhysaFlow Report";

const DISCLAIMER =
  "Illustrative data — not based on measured PhysaFlow results.";

const EXPORT_BACKGROUND = "#0B1F16";

function sanitizeFileName(title: string) {
  return title
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase();
}

function getTimestamp() {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");

  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

  return `${year}-${month}-${day}_${hours}h${minutes}m${seconds}s`;
}

function downloadDataUrl(dataUrl: string, fileName: string) {
  const link = document.createElement("a");

  link.href = dataUrl;
  link.download = fileName;

  document.body.appendChild(link);
  link.click();
  link.remove();
}

export default function DownloadChartButton({
  chartRef,
  title,
  format = "png",
}: DownloadChartButtonProps) {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    const element = chartRef.current;

    if (!element || !title || isDownloading) {
      return;
    }

    let titleElement: HTMLDivElement | null = null;
    let footerElement: HTMLDivElement | null = null;

    try {
      setIsDownloading(true);

      titleElement = document.createElement("div");

      titleElement.textContent = title;

      titleElement.style.color = "#F5F3EE";
      titleElement.style.fontFamily = "Arial, sans-serif";
      titleElement.style.fontSize = "22px";
      titleElement.style.fontWeight = "600";
      titleElement.style.lineHeight = "1.3";
      titleElement.style.marginBottom = "20px";

      footerElement = document.createElement("div");

      footerElement.style.color = "#A8AFA9";
      footerElement.style.fontFamily = "Arial, sans-serif";
      footerElement.style.fontSize = "12px";
      footerElement.style.lineHeight = "1.5";
      footerElement.style.marginTop = "20px";

      const attributionElement = document.createElement("div");
      attributionElement.textContent = ATTRIBUTION;

      const disclaimerElement = document.createElement("div");
      disclaimerElement.textContent = DISCLAIMER;

      footerElement.appendChild(attributionElement);
      footerElement.appendChild(disclaimerElement);

      element.prepend(titleElement);
      element.appendChild(footerElement);

      const fileName = `${sanitizeFileName(title)}_${getTimestamp()}`;

      await new Promise<void>((resolve) => {
        requestAnimationFrame(() => resolve());
      });

      if (format === "svg") {
        const dataUrl = await toSvg(element, {
          cacheBust: true,
          backgroundColor: EXPORT_BACKGROUND,
          filter: (node) => {
            if (!(node instanceof HTMLElement)) {
              return true;
            }

            return !node.hasAttribute("data-chart-download-button");
          },
        });

        downloadDataUrl(dataUrl, `${fileName}.svg`);
      } else {
        const dataUrl = await toPng(element, {
          cacheBust: true,
          pixelRatio: 2,
          backgroundColor: EXPORT_BACKGROUND,
          filter: (node) => {
            if (!(node instanceof HTMLElement)) {
              return true;
            }

            return !node.hasAttribute("data-chart-download-button");
          },
        });

        downloadDataUrl(dataUrl, `${fileName}.png`);
      }
    } catch (error) {
      console.error("Error exporting chart:", error);
    } finally {
      titleElement?.remove();
      footerElement?.remove();

      setIsDownloading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleDownload}
      disabled={isDownloading}
      data-chart-download-button
      aria-label={isDownloading ? "Exportando grafico" : "Descargar grafico"}
      title={isDownloading ? "Exportando..." : "Descargar grafico"}
      className="
        right-4
        top-4
        z-10
        flex
        items-center
        justify-center
        gap-2
        rounded-full
        bg-accent
        px-2.5
        py-2
        text-sm
        font-medium
        text-background
        shadow-sm
        transition-all
        duration-200
        hover:bg-accent-light
        hover:shadow-md
        disabled:cursor-not-allowed
        disabled:opacity-60
        sm:bottom-4
        sm:top-auto
        sm:px-4
        sm:py-2
      "
    >
      <Download size={17} aria-hidden="true" />

      <span className="hidden sm:inline">
        {isDownloading ? "Exportando..." : "Descargar"}
      </span>
    </button>
  );
}
