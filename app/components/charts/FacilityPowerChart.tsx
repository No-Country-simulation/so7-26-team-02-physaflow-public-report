"use client";

import { useState, useEffect } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ReferenceLine,
} from "recharts";

const data = [
  { hour: "00:00", power: 5.8 },
  { hour: "01:00", power: 5.5 },
  { hour: "02:00", power: 5.2 },
  { hour: "03:00", power: 5.4 },
  { hour: "04:00", power: 5.6 },
  { hour: "05:00", power: 6.0 },
  { hour: "06:00", power: 6.5 },
  { hour: "07:00", power: 7.0 },
  { hour: "08:00", power: 7.8 },
  { hour: "09:00", power: 8.4 },
  { hour: "10:00", power: 8.8 },
  { hour: "11:00", power: 8.5 },
  { hour: "12:00", power: 7.6 },
  { hour: "13:00", power: 7.9 },
  { hour: "14:00", power: 8.6 },
  { hour: "15:00", power: 9.0 },
  { hour: "16:00", power: 8.2 },
  { hour: "17:00", power: 7.4 },
  { hour: "18:00", power: 6.8 },
  { hour: "19:00", power: 6.3 },
  { hour: "20:00", power: 6.0 },
  { hour: "21:00", power: 5.8 },
  { hour: "22:00", power: 5.6 },
  { hour: "23:00", power: 5.5 },
];

const CustomTooltip = ({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ value: number }>;
  label?: string;
}) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          background: "#14291e",
          border: "1px solid #2a3830",
          borderRadius: "8px",
          padding: "10px 14px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
        }}
      >
        <p style={{ color: "#a8afa9", fontSize: "11px", margin: 0, textTransform: "uppercase", letterSpacing: "0.05em" }}>
          {label}
        </p>
        <p style={{ color: "#e8d48a", fontSize: "18px", fontWeight: 600, margin: "4px 0 0" }}>
          {payload[0].value} MW
        </p>
      </div>
    );
  }
  return null;
};

export default function FacilityPowerChart() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 480);
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
          Consumo Eléctrico — 24h
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
            <AreaChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <defs>
                <linearGradient id="powerGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#c9a227" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="#c9a227" stopOpacity={0.02} />
                </linearGradient>
              </defs>

              <CartesianGrid stroke="#2a3830" strokeDasharray="3 3" vertical={false} />

              <XAxis
                dataKey="hour"
                tick={{ fill: "#a8afa9", fontSize: 11 }}
                axisLine={{ stroke: "#2a3830" }}
                tickLine={false}
                interval={2}
                tickFormatter={(v) => (isMobile ? `${parseInt(v)}h` : v)}
              />

              <YAxis
                tick={{ fill: "#a8afa9", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                domain={[0, 12]}
                tickFormatter={(v) => `${v} MW`}
              />

              <Tooltip content={<CustomTooltip />} cursor={{ stroke: "#c9a227", strokeWidth: 1, strokeDasharray: "4 4" }} />

              <ReferenceLine
                y={10}
                stroke="#e8d48a"
                strokeDasharray="6 4"
                strokeOpacity={0.6}
                label={{
                  value: "Cap. Instalada 10 MW",
                  position: "insideTopRight",
                  fill: "#e8d48a",
                  fontSize: 10,
                }}
              />

              <ReferenceLine
                y={8.2}
                stroke="#a8afa9"
                strokeDasharray="4 4"
                strokeOpacity={0.5}
                label={{
                  value: "Cap. Utilizable 8.2 MW",
                  position: "insideBottomRight",
                  fill: "#a8afa9",
                  fontSize: 10,
                }}
              />

              <Area
                type="monotone"
                dataKey="power"
                stroke="#c9a227"
                strokeWidth={2}
                fill="url(#powerGradient)"
                animationDuration={800}
                dot={false}
                activeDot={{
                  r: 5,
                  fill: "#e8d48a",
                  stroke: "#c9a227",
                  strokeWidth: 2,
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
}
