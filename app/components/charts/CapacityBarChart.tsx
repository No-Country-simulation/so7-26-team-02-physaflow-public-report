"use client";

import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid
} from "recharts";
import { useRef } from "react";
import DownloadChartButton from "../DownloadChartButton";

const data = [
    {
        layer: "Facility",
        capacity: 82,
    },
    {
        layer: "IT",
        capacity: 61,
    },
    {
        layer: "Workload",
        capacity: 47,
    },
];

export default function CapacityBarChart() {
    const chartRef = useRef<HTMLDivElement>(null);
    return (
        <div className="h-96 w-full" aria-label="Gráfico: Capacidad por capa — Facility 82%, IT 61%, Workload 47%" ref={chartRef}>
            <ResponsiveContainer>
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis dataKey="layer" />

                    <YAxis />

                    <Tooltip />

                    <Bar
                        dataKey="capacity"
                        radius={[6,6,0,0]}
                    />
                </BarChart>
            </ResponsiveContainer>   
        </div>
    );
}