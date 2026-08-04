"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import {
    LayoutDashboard,
    TriangleAlert,
    Network,
    Building2,
    Server,
    Workflow,
    ChartNoAxesCombined,
    Quote,
    PanelLeftClose,
    PanelLeftOpen,
} from "lucide-react";

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
    const [isOpen, setIsOpen] = useState(true);
    const pathname = usePathname();

    return (
        <aside
            className={`bg-background h-full p-4 transition-all duration-300 ${isOpen ? "w-64" : "w-20"}`}>
            <div className={`flex items-center gap-3 px-3 py-6 mb-2 border-b border-border 
                ${isOpen ? "justify-between" : "justify-center"}`}>
                {isOpen && (
                    <div >
                        <h1 className="text-foreground text-3xl font-sans font-extrabold tracking-tight">
                            PHYSHA<span className="text-accent">FLOW</span>
                        </h1>
                        <p className="text-accent-light text-xs uppercase tracking-widest mt-1">
                            Stranded capacity report
                        </p>
                    </div>
                )}
                
                <button onClick={() => setIsOpen(!isOpen)}
                className="flex items-center justify-center w-10 h-10 ml-auto rounded-md text-accent bg-surface ... z-10 border-1
              hover:bg-surface hover:text-foreground transition-colors shrink-0">
                    {isOpen ? (
                        <PanelLeftClose className="w-5 h-5" />
                    ) : (
                        <PanelLeftOpen className="w-5 h-5" />
                    )}
                </button>
            </div>
            <nav>
                <ul className="m-3 space-y-1">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <li key={item.href} className="flex flex-col justify-center">
                                <Link
                                    href={item.href}
                                    className={`group relative flex gap-3 h-11 rounded-lg items-center w-full transition-all duration-200 ${
                                        isOpen ? "justify-start pl-7" : "justify-center px-0"
                                    } ${
                                        isActive
                                            ? `bg-accent/10 text-accent font-semibold shadow-sm ${isOpen ? "border-l-2 border-accent" : ""}`
                                            : "text-muted hover:bg-surface hover:text-foreground hover:translate-x-1"
                                    }`}
                                >
                                <item.icon className={`w-5 h-5 transition-colors ${isActive ? "text-accent" : "text-muted"}`} />
                                {isOpen && <span className="text-[18px]">{item.label}</span>}

                                {!isOpen && (
                                    <span className="absolute left-full ml-3 px-2 py-1 rounded-md bg-surface text-accent text-sm whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 z-50 border">
                                        {item.label}
                                    </span>
                                 )}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </aside>
    );
}