"use client";

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
  { resource: "Network Links", utilized: 58, stranded: 14, unusable: 9, available: 19 },
  { resource: "Storage IOPS", utilized: 52, stranded: 18, unusable: 8, available: 22 },
  { resource: "Compute Nodes", utilized: 61, stranded: 12, unusable: 10, available: 17 },
  { resource: "Backup Nodes", utilized: 35, stranded: 20, unusable: 11, available: 34 },
];

const COLORS = {
  utilized: "#c9a227",
  stranded: "#e8d48a",
  unusable: "#a8afa9",
  available: "#2a3830",
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

export default function ITCapacityBreakdownChart() {
  const chartRef = useRef<HTMLDivElement>(null);

  return (
    <section style={{ margin: "2.5rem 0" }} aria-label="Gráfico: Desglose de capacidad IT por recurso">
      <div style={{ marginBottom: "1.25rem", display: "flex", alignItems: "center", gap: "1rem" }}>
        <span
          style={{
            fontSize: "10px",
            fontWeight: 500,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            color: "#c9a227",
          }}
        >
          Desglose de Capacidad IT
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
          position: "relative",
        }}
      >
        <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginBottom: "12px",
            }}
        >
          <DownloadChartButton chartRef={chartRef} title="IT capacity - Desglose de Capacidad IT "/>
        </div>
        <div style={{ width: "100%", height: "300px" }}>
          <ResponsiveContainer>
            <BarChart
              data={data}
              layout="vertical"
              margin={{ top: 10, right: 10, left: 20, bottom: 0 }}
            >
              <CartesianGrid stroke="#2a3830" strokeDasharray="3 3" horizontal={false} />

              <XAxis
                type="number"
                tick={{ fill: "#a8afa9", fontSize: 11 }}
                axisLine={{ stroke: "#2a3830" }}
                tickLine={false}
                domain={[0, 100]}
                tickFormatter={(v) => `${v}%`}
              />

              <YAxis
                type="category"
                dataKey="resource"
                tick={{ fill: "#a8afa9", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                width={110}
              />

              <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(201,162,39,0.06)" }} />

              <Legend content={renderLegend} />

              <Bar
                dataKey="utilized"
                name="Utilizado"
                stackId="capacity"
                fill={COLORS.utilized}
                animationDuration={800}
              />
              <Bar
                dataKey="stranded"
                name="Stranded"
                stackId="capacity"
                fill={COLORS.stranded}
                animationDuration={800}
              />
              <Bar
                dataKey="unusable"
                name="No utilizable"
                stackId="capacity"
                fill={COLORS.unusable}
                animationDuration={800}
              />
              <Bar
                dataKey="available"
                name="Disponible"
                stackId="capacity"
                fill={COLORS.available}
                radius={[0, 6, 6, 0]}
                animationDuration={800}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
}
