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
} from "recharts";

const data = [
  { hour: "00:00", utilization: 32 },
  { hour: "01:00", utilization: 28 },
  { hour: "02:00", utilization: 25 },
  { hour: "03:00", utilization: 45 },
  { hour: "04:00", utilization: 82 },
  { hour: "05:00", utilization: 88 },
  { hour: "06:00", utilization: 75 },
  { hour: "07:00", utilization: 50 },
  { hour: "08:00", utilization: 42 },
  { hour: "09:00", utilization: 65 },
  { hour: "10:00", utilization: 78 },
  { hour: "11:00", utilization: 70 },
  { hour: "12:00", utilization: 40 },
  { hour: "13:00", utilization: 48 },
  { hour: "14:00", utilization: 62 },
  { hour: "15:00", utilization: 85 },
  { hour: "16:00", utilization: 91 },
  { hour: "17:00", utilization: 73 },
  { hour: "18:00", utilization: 52 },
  { hour: "19:00", utilization: 38 },
  { hour: "20:00", utilization: 35 },
  { hour: "21:00", utilization: 33 },
  { hour: "22:00", utilization: 30 },
  { hour: "23:00", utilization: 29 },
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
        <p style={{ color: "#4a9e6d", fontSize: "18px", fontWeight: 600, margin: "4px 0 0" }}>
          {payload[0].value}% utilización
        </p>
      </div>
    );
  }
  return null;
};

export default function WorkloadUtilizationChart() {
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
            color: "#4a9e6d",
          }}
        >
          Perfil de Utilización de Cómputo — 24h
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
                <linearGradient id="workloadGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#4a9e6d" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#4a9e6d" stopOpacity={0.02} />
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
                domain={[0, 100]}
                tickFormatter={(v) => `${v}%`}
              />

              <Tooltip content={<CustomTooltip />} cursor={{ stroke: "#4a9e6d", strokeWidth: 1, strokeDasharray: "4 4" }} />

              <Area
                type="monotone"
                dataKey="utilization"
                stroke="#4a9e6d"
                strokeWidth={2}
                fill="url(#workloadGradient)"
                animationDuration={800}
                dot={false}
                activeDot={{
                  r: 5,
                  fill: "#a3e0b8",
                  stroke: "#4a9e6d",
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
