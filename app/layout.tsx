import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Slidebar from "./components/Slidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PhysaFlow — Stranded Capacity Index",
  description: "Reporte de referencia de la industria sobre stranded capacity en data centers de IA. Taxonomía de capas Facility, IT y Workload.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="h-screen flex flex-row" suppressHydrationWarning>
        <Slidebar />
        {/* Gutter horizontal único del contenido: px-5 (20px) en mobile,
            sm:px-6 (24px) en el resto. pt-16 reserva el alto del header
            fijo del sidebar en mobile; en md+ el sidebar es estático. */}
        <main className="w-full flex-1 overflow-y-auto px-5 pt-16 sm:px-6 md:pt-0">
          {children}
        </main>
      </body>
    </html>
  );
}