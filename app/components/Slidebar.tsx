"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
    LayoutDashboard,
    TriangleAlert,
    Network,
    Building2,
    Server,
    Workflow,
    ChartNoAxesCombined,
    Quote,} from "lucide-react";

const navItems = [
    {
        label: "Overview",
        href: "/",
        icon: LayoutDashboard,
    },
    {
        label: "Problem",
        href: "/problem",
        icon: TriangleAlert,
    },
    {
        label: "Taxonomy",
        href: "/taxonomy",
        icon: Network,
    },
    {
        label: "Facility",
        href: "/facility",
        icon: Building2,
    },
    {
        label: "IT",
        href: "/it",
        icon: Server,
    },
    {
        label: "Workload",
        href: "/workload",
        icon: Workflow,
    },
    {
        label: "Evidence",
        href: "/evidence",
        icon: Quote,
    },
    {
        label: "Citations",
        href: "/citations",
        icon: ChartNoAxesCombined,
    },
];

export default function Slidebar() {
    const pathname = usePathname();
    return (
        <aside className="bg-surface w-64 h-full p-4">
           <div>
              <h1>PHYSHAFLOW</h1>
              <p>Stranded capacity report</p>
           </div>
           <nav>
            <ul>
                {navItems.map(item => (
                    <li key={item.href}>
                        <Link href={item.href}>
                            <item.icon className="w-5 h-5 " />
                            {item.label}
                        </Link>
                    </li>
                ))}
            </ul>
           </nav>
        </aside>
    );
}