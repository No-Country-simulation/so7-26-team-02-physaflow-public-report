"use client";

import { useState, useEffect } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";
import { useRef } from "react";
import DownloadChartButton from "../DownloadChartButton";

const data = [
  { zone: "Zona A", thermal: 92, electrical: 78, cooling: 85 },
  { zone: "Zona B", thermal: 68, electrical: 72, cooling: 60 },
  { zone: "Zona C", thermal: 45, electrical: 55, cooling: 40 },
  { zone: "Zona D", thermal: 88, electrical: 82, cooling: 90 },
  { zone: "Zona E", thermal: 35, electrical: 48, cooling: 30 },
];

const COLORS = {
  thermal: "#c9a227",
  electrical: "#e8d48a",
  cooling: "#4a9e6d",
};

const CustomTooltip = ({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ name: string; value: number; color: string }>;
  label?: string;
}) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          background: "#14291e",
          border: "1px solid #2a3830",
          borderRadius: "8px",
          padding: "12px 16px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
        }}
      >
        <p style={{ color: "#f5f3ee", fontSize: "13px", fontWeight: 600, margin: "0 0 8px" }}>
          {label}
        </p>
        {payload.map((entry) => (
          <div
            key={entry.name}
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: "16px",
              marginBottom: "3px",
            }}
          >
            <span style={{ color: entry.color, fontSize: "12px" }}>
              {entry.name}
            </span>
            <span style={{ color: "#f5f3ee", fontSize: "12px", fontWeight: 500 }}>
              {entry.value}%
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

const renderLegend = (props: { payload?: ReadonlyArray<{ value?: string; color?: string }> }) => {
  const { payload } = props;
  return (
    <div style={{ display: "flex", justifyContent: "center", gap: "20px", marginTop: "8px", flexWrap: "wrap" }}>
      {payload?.map((entry) => (
        <div key={entry.value ?? ""} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <span
            style={{
              width: "10px",
              height: "10px",
              borderRadius: "2px",
              background: entry.color ?? "#a8afa9",
              display: "inline-block",
            }}
          />
          <span style={{ color: "#a8afa9", fontSize: "11px" }}>{entry.value}</span>
        </div>
      ))}
    </div>
  );
};

export default function FacilityThermalChart() {
  const [isTinyMobile, setIsTinyMobile] = useState(false);
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkTiny = () => setIsTinyMobile(window.innerWidth <= 340);
    checkTiny();
    window.addEventListener("resize", checkTiny);
    return () => window.removeEventListener("resize", checkTiny);
  }, []);

  return (
    <section style={{ margin: "2.5rem 0" }}>
      <div style={{ marginBottom: "1.25rem", display: "flex", alignItems: "center", gap: "1rem" }} >
        <span
          style={{
            fontSize: "10px",
            fontWeight: 500,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            color: "#c9a227",
          }}
        >
          Carga Térmica, Eléctrica y Enfriamiento por Zona
        </span>
        <span aria-hidden="true" style={{ height: "1px", flex: 1, background: "#2a3830" }} />
      </div>

      <div
        ref={chartRef}
        style={{
          background: "#14291e",
          border: "1px solid #2a3830",
          borderRadius: "12px",
          padding: "24px 16px 16px",
        }}
      >
        <div style={{ width: "100%", height: "320px" }}>
          <ResponsiveContainer>
            <BarChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <CartesianGrid stroke="#2a3830" strokeDasharray="3 3" vertical={false} />

              <XAxis
                dataKey="zone"
                tick={{ fill: "#a8afa9", fontSize: 12 }}
                axisLine={{ stroke: "#2a3830" }}
                tickLine={false}
                tickFormatter={(v) => (isTinyMobile ? v.replace("Zona ", "") : v)}
              />

              <YAxis
                tick={{ fill: "#a8afa9", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                domain={[0, 100]}
                tickFormatter={(v) => `${v}%`}
              />

              <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(201,162,39,0.06)" }} />

              <Legend content={renderLegend} />

              <Bar
                dataKey="thermal"
                name="Carga Térmica"
                fill={COLORS.thermal}
                radius={[6, 6, 0, 0]}
                animationDuration={800}
              />
              <Bar
                dataKey="electrical"
                name="Carga Eléctrica"
                fill={COLORS.electrical}
                radius={[6, 6, 0, 0]}
                animationDuration={800}
              />
              <Bar
                dataKey="cooling"
                name="Enfriamiento"
                fill={COLORS.cooling}
                radius={[6, 6, 0, 0]}
                animationDuration={800}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <DownloadChartButton chartRef={chartRef} /> 
      </div>
    </section>
  );
}
