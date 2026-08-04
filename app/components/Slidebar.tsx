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
        <aside className="bg-background w-64 h-full p-4">
            <div className="px-3 py-6 mb-2 border-b border-border">
                <h1 className="text-foreground text-3xl font-sans font-extrabold tracking-tight">
                    PHYSHA<span className="text-accent">FLOW</span>
                </h1>
                <p className="text-accent-light text-xs uppercase tracking-widest mt-1">
                    Stranded capacity report
                </p>
            </div>
            <nav>
                <ul className="m-3 space-y-1">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <li key={item.href} className="flex flex-col justify-center">
                                <Link
                                    href={item.href}
                                    className={`flex gap-3 h-11 rounded-lg justify-start items-center pl-7 w-full transition-all duration-200 ${
                                        isActive
                                            ? "bg-accent/10 text-accent border-l-2 border-accent font-semibold shadow-sm"
                                            : "text-muted hover:bg-surface hover:text-foreground hover:translate-x-1"}`}>
                                <item.icon className={`w-5 h-5 transition-colors ${isActive ? "text-accent" : "text-muted"}`}/>
                                    <span className="text-[18px]">{item.label}</span>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </aside>
    );
}