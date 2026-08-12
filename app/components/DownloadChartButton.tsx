"use client";

import type { RefObject } from "react";
import { Download } from 'lucide-react';

interface DownloadChartButtonProps {
  chartRef: RefObject<HTMLDivElement | null>;
  fileName?: string;
  backgroundColor?: string;
  format?: "svg" | "png";
}

export default function DownloadChartButton({
  chartRef,
  fileName = "chart",
  backgroundColor = "#14291e",
  format = "svg",
}: DownloadChartButtonProps) {
  const handleDownload = () => {
    const chart = chartRef.current;

    if (!chart) {
      console.error("No se encontró el gráfico");
      return;
    }

    const svg = chart.querySelector("svg");

    if (!svg) {
      console.error("No se encontró el SVG del gráfico");
      return;
    }

    const svgClone = svg.cloneNode(true) as SVGSVGElement;

    const viewBox = svgClone.viewBox.baseVal;

    const originalWidth =
      viewBox.width || svg.clientWidth;

    const originalHeight =
      viewBox.height || svg.clientHeight;

    const attributionHeight = 36;
    const newHeight = originalHeight + attributionHeight;

    svgClone.setAttribute(
      "height",
      String(newHeight),
    );

    svgClone.setAttribute(
      "viewBox",
      `0 0 ${originalWidth} ${newHeight}`,
    );

    const background = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "rect",
    );

    background.setAttribute("width", "100%");
    background.setAttribute("height", "100%");
    background.setAttribute("fill", backgroundColor);

    svgClone.insertBefore(
      background,
      svgClone.firstChild,
    );

    const separator = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "line",
    );

    separator.setAttribute("x1", "16");
    separator.setAttribute(
      "x2",
      String(originalWidth - 16),
    );
    separator.setAttribute(
      "y1",
      String(originalHeight + 4),
    );
    separator.setAttribute(
      "y2",
      String(originalHeight + 4),
    );
    separator.setAttribute("stroke", "#2a3830");
    separator.setAttribute("stroke-width", "1");

    svgClone.appendChild(separator);

    const attribution = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "text",
    );

    attribution.setAttribute("x", "16");
    attribution.setAttribute(
      "y",
      String(originalHeight + 24),
    );
    attribution.setAttribute("fill", "#a8afa9");
    attribution.setAttribute("font-size", "10");
    attribution.setAttribute(
      "font-family",
      "Arial, sans-serif",
    );

    attribution.textContent =
      "PhysaFlow | Stranded Capacity Report | Source: PhysaFlow";

    svgClone.appendChild(attribution);

    const svgData =
      new XMLSerializer().serializeToString(
        svgClone,
      );

    if (format === "svg") {
      const blob = new Blob([svgData], {
        type: "image/svg+xml;charset=utf-8",
      });

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");

      link.href = url;
      link.download = `${fileName}.svg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      return;
    }

    const svgBlob = new Blob([svgData], {
      type: "image/svg+xml;charset=utf-8",
    });

    const svgUrl = URL.createObjectURL(svgBlob);
    const image = new Image();

    image.onload = () => {
      const scale = 2;

      const canvas = document.createElement("canvas");
      canvas.width = originalWidth * scale;
      canvas.height = newHeight * scale;

      const context = canvas.getContext("2d");

      if (!context) {
        console.error(
          "No se pudo crear el contexto del canvas",
        );
        URL.revokeObjectURL(svgUrl);
        return;
      }

      context.scale(scale, scale);
      context.drawImage(
        image,
        0,
        0,
        originalWidth,
        newHeight,
      );

      canvas.toBlob(
        (pngBlob) => {
          if (!pngBlob) {
            console.error(
              "No se pudo crear el PNG",
            );

            URL.revokeObjectURL(svgUrl);

            return;
          }

          const pngUrl =
            URL.createObjectURL(pngBlob);
          const link =
            document.createElement("a");

          link.href = pngUrl;
          link.download = `${fileName}.png`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(pngUrl);
          URL.revokeObjectURL(svgUrl);
        },
        "image/png",
      );
    };

    image.onerror = () => {
      console.error(
        "No se pudo convertir el SVG a imagen",
      );

      URL.revokeObjectURL(svgUrl);
    };

    image.src = svgUrl;
  };

  return (
    <button type="button" onClick={handleDownload} className="flex items-center 
      gap-2 rounded-full bg-accent px-3 py-2.5 font-medium text-background transition-colors hover:bg-accent-light sm:px-4">
      < Download size={18}></Download>
      <span className="hidden sm:inline">Download</span>
    </button>
  );
}