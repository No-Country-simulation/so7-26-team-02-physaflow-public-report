"use client";

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
  { hour: "00:00", utilization: 18 },
  { hour: "01:00", utilization: 15 },
  { hour: "02:00", utilization: 12 },
  { hour: "03:00", utilization: 14 },
  { hour: "04:00", utilization: 16 },
  { hour: "05:00", utilization: 22 },
  { hour: "06:00", utilization: 35 },
  { hour: "07:00", utilization: 48 },
  { hour: "08:00", utilization: 62 },
  { hour: "09:00", utilization: 74 },
  { hour: "10:00", utilization: 78 },
  { hour: "11:00", utilization: 72 },
  { hour: "12:00", utilization: 58 },
  { hour: "13:00", utilization: 65 },
  { hour: "14:00", utilization: 76 },
  { hour: "15:00", utilization: 80 },
  { hour: "16:00", utilization: 71 },
  { hour: "17:00", utilization: 55 },
  { hour: "18:00", utilization: 42 },
  { hour: "19:00", utilization: 34 },
  { hour: "20:00", utilization: 28 },
  { hour: "21:00", utilization: 24 },
  { hour: "22:00", utilization: 20 },
  { hour: "23:00", utilization: 17 },
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
          {payload[0].value}%
        </p>
      </div>
    );
  }
  return null;
};

export default function WorkloadUtilizationChart() {
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
          Utilización de Cómputo — 24h
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
                <linearGradient id="goldGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#c9a227" stopOpacity={0.4} />
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
              />

              <YAxis
                tick={{ fill: "#a8afa9", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                domain={[0, 100]}
                tickFormatter={(v) => `${v}%`}
              />

              <Tooltip content={<CustomTooltip />} cursor={{ stroke: "#c9a227", strokeWidth: 1, strokeDasharray: "4 4" }} />

              <ReferenceLine
                y={47}
                stroke="#c9a227"
                strokeDasharray="6 4"
                strokeOpacity={0.5}
                label={{
                  value: "Promedio 47%",
                  position: "insideTopRight",
                  fill: "#a8afa9",
                  fontSize: 10,
                }}
              />

              <Area
                type="monotone"
                dataKey="utilization"
                stroke="#c9a227"
                strokeWidth={2}
                fill="url(#goldGradient)"
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
