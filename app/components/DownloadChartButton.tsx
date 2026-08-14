"use client";

import type { RefObject } from "react";
import { toPng } from "html-to-image";
import { Download } from 'lucide-react';

interface DownloadChartButtonProps {
  chartRef: RefObject<HTMLDivElement | null>;
  fileName?: string;
  backgroundColor?: string;
}

export default function DownloadChartButton({
  chartRef,
  fileName = "chart",
  backgroundColor = "#14291e",
}: DownloadChartButtonProps) {
  const handleDownload = async () => {
    const chart = chartRef.current;

    if (!chart) {
      console.error("No se encontró el gráfico");
      return;
    }

    const footer = document.createElement("div");
    footer.style.cssText = `
      padding: 12px 16px 4px 16px;
      border-top: 1px solid #2a3830;
      margin-top: 8px;
      font: 10px Arial, sans-serif;
      color: #a8afa9;
    `;
    footer.textContent = "PhysaFlow | Stranded Capacity Report | Source: PhysaFlow";
    chart.appendChild(footer);

    try {
      const dataUrl = await toPng(chart, {
        backgroundColor,
        pixelRatio: 2, 
        cacheBust: true,
      });

      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = `${fileName}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error("No se pudo generar la imagen", err);
    } finally {
      chart.removeChild(footer);
    }
  };

  return (
    <button
      type="button"
      onClick={handleDownload}
      className="flex items-center gap-2 rounded-full bg-accent px-3 py-2.5 font-medium text-background transition-colors hover:bg-accent-light sm:px-4"
    >
      <Download size={18} />
      <span className="hidden sm:inline">Download</span>
    </button>
  );
}