"use client";

import { useState, useEffect } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ReferenceArea,
} from "recharts";

const data = [
  { hour: "00:00", latency: 2.1, throughput: 12 },
  { hour: "01:00", latency: 1.8, throughput: 10 },
  { hour: "02:00", latency: 1.5, throughput: 8 },
  { hour: "03:00", latency: 8.2, throughput: 38 },
  { hour: "04:00", latency: 12.5, throughput: 42 },
  { hour: "05:00", latency: 6.8, throughput: 35 },
  { hour: "06:00", latency: 3.2, throughput: 22 },
  { hour: "07:00", latency: 2.8, throughput: 18 },
  { hour: "08:00", latency: 4.5, throughput: 28 },
  { hour: "09:00", latency: 5.2, throughput: 32 },
  { hour: "10:00", latency: 4.8, throughput: 30 },
  { hour: "11:00", latency: 3.5, throughput: 25 },
  { hour: "12:00", latency: 2.9, throughput: 20 },
  { hour: "13:00", latency: 3.8, throughput: 26 },
  { hour: "14:00", latency: 5.0, throughput: 31 },
  { hour: "15:00", latency: 9.5, throughput: 40 },
  { hour: "16:00", latency: 14.2, throughput: 44 },
  { hour: "17:00", latency: 7.8, throughput: 36 },
  { hour: "18:00", latency: 4.2, throughput: 24 },
  { hour: "19:00", latency: 2.5, throughput: 15 },
  { hour: "20:00", latency: 2.0, throughput: 12 },
  { hour: "21:00", latency: 1.9, throughput: 11 },
  { hour: "22:00", latency: 1.7, throughput: 9 },
  { hour: "23:00", latency: 1.6, throughput: 8 },
];

const CustomTooltip = ({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ name: string; value: number; color: string; unit: string }>;
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
        <p style={{ color: "#a8afa9", fontSize: "11px", margin: "0 0 8px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
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
              {entry.value} {entry.unit}
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
              height: "3px",
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

export default function ITNetworkLatencyChart() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 420);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <section style={{ margin: "2.5rem 0" }}>
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
          Latencia y Throughput de Red — 24h
        </span>
        <span aria-hidden="true" style={{ height: "1px", flex: 1, background: "#2a3830" }} />
      </div>

      <div
        style={{
          background: "#14291e",
          border: "1px solid #2a3830",
          borderRadius: "12px",
          padding: "24px 16px 16px",
        }}
      >
        <div style={{ width: "100%", height: "320px" }}>
          <ResponsiveContainer>
            <LineChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <CartesianGrid stroke="#2a3830" strokeDasharray="3 3" vertical={false} />

              <ReferenceArea x1="03:00" x2="05:00" fill="#c9a227" fillOpacity={0.06} />
              <ReferenceArea x1="15:00" x2="17:00" fill="#c9a227" fillOpacity={0.06} />

              <XAxis
                dataKey="hour"
                tick={{ fill: "#a8afa9", fontSize: 11 }}
                axisLine={{ stroke: "#2a3830" }}
                tickLine={false}
                interval={2}
                tickFormatter={(v) => (isMobile ? `${parseInt(v)}h` : v)}
              />

              <YAxis
                yAxisId="latency"
                tick={{ fill: "#a8afa9", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `${v} ms`}
                orientation="left"
              />

              <YAxis
                yAxisId="throughput"
                tick={{ fill: "#a8afa9", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `${v} Gb`}
                orientation="right"
              />

              <Tooltip content={<CustomTooltip />} cursor={{ stroke: "#c9a227", strokeWidth: 1, strokeDasharray: "4 4" }} />

              <Legend content={renderLegend} />

              <Line
                yAxisId="latency"
                type="monotone"
                dataKey="latency"
                name="Latencia"
                stroke="#c9a227"
                strokeWidth={2.5}
                dot={false}
                activeDot={{ r: 5, fill: "#e8d48a", stroke: "#c9a227", strokeWidth: 2 }}
                unit=" ms"
                animationDuration={800}
              />

              <Line
                yAxisId="throughput"
                type="monotone"
                dataKey="throughput"
                name="Throughput"
                stroke="#4a9e6d"
                strokeWidth={2}
                strokeDasharray="6 3"
                dot={false}
                activeDot={{ r: 4, fill: "#4a9e6d", stroke: "#1f3d2b", strokeWidth: 2 }}
                unit=" Gbps"
                animationDuration={800}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div style={{ display: "flex", justifyContent: "center", gap: "16px", marginTop: "12px", flexWrap: "wrap" }}>
          <span style={{ fontSize: "10px", color: "#a8afa9", display: "flex", alignItems: "center", gap: "4px" }}>
            <span style={{ width: "20px", height: "8px", background: "rgba(201,162,39,0.12)", borderRadius: "2px", display: "inline-block" }} />
            Ventanas ETL
          </span>
        </div>
      </div>
    </section>
  );
}
