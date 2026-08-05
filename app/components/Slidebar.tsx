"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
Building2,
ChartNoAxesCombined,
LayoutDashboard,
Menu,
Network,
PanelLeftClose,
PanelLeftOpen,
Quote,
Server,
TriangleAlert,
Workflow,
X,
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
const pathname = usePathname();

const [isOpen, setIsOpen] = useState(true);
const [isMobileOpen, setIsMobileOpen] = useState(false);

useEffect(() => {
    setIsMobileOpen(false);
}, [pathname]);

const renderNavigation = (collapsed = false) => (
    <nav aria-label="Main navigation">
        <ul className="m-3 space-y-1">
            {navItems.map(({ label, href, icon: Icon }) => {
                const isActive = pathname === href;
                return (
                    <li key={href}>
                        <Link
                            href={href}
                            className={`group relative flex h-11 w-full items-center gap-3 rounded-lg transition-all duration-200 ${
                                collapsed
                                    ? "justify-center"
                                    : "justify-start pl-7"
                            } ${
                                isActive
                                    ? `bg-accent/10 font-semibold text-accent shadow-sm ${
                                          !collapsed
                                              ? "border-l-2 border-accent"
                                              : ""
                                      }`
                                    : "text-muted hover:translate-x-1 hover:bg-background hover:text-foreground"
                            }`}
                        >
                            <Icon className={`h-5 w-5 shrink-0 ${isActive ? "text-accent": "text-muted"}`}/>
                            {!collapsed && (
                                <span className="text-[18px]">{label}</span>
                            )}
                            {collapsed && (
                                <span className="pointer-events-none absolute left-full z-50 ml-3 whitespace-nowrap rounded-md border border-border bg-surface px-2 py-1 text-sm text-accent opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                                    {label}
                                </span>
                            )}
                        </Link>
                    </li>
                );
            })}
        </ul>
    </nav>
);

const renderBrand = (collapsed = false) => {
    if (collapsed) {
        return null;
    }

    return (
        <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-foreground">
                PHYSHA<span className="text-accent">FLOW</span>
            </h1>

            <p className="mt-1 text-xs uppercase tracking-widest text-accent-light">
                Stranded capacity report
            </p>
        </div>
    );
};

const buttonStyles =
    "flex ...z-10 h-10 w-10 shrink-0 items-center justify-center rounded-md border border-border bg-surface text-accent transition-colors hover:text-foreground";

return (
    <>
        <aside
            className={`hidden h-full bg-surface p-4 transition-[width] duration-300 md:block ${
                isOpen ? "w-64" : "w-20"
            }`}
        >
            <div
                className={`mb-2 flex items-center gap-3 border-b border-border px-3 py-6 ${
                    isOpen
                        ? "justify-between"
                        : "justify-center"
                }`}
            >
                {renderBrand(!isOpen)}

                <button
                    type="button"
                    aria-label={
                        isOpen
                            ? "Collapse sidebar"
                            : "Expand sidebar"
                    }
                    onClick={() =>
                        setIsOpen((current) => !current)
                    }
                    className={`z-10 ${buttonStyles}`}
                >
                    {isOpen ? (
                        <PanelLeftClose className="h-5 w-5" />
                    ) : (
                        <PanelLeftOpen className="h-5 w-5" />
                    )}
                </button>
            </div>

            {renderNavigation(!isOpen)}
        </aside>

        <div className="md:hidden">
            <header className="fixed inset-x-0 top-0 z-40 flex items-center justify-between border-b border-border bg-background px-4 py-3">
                <h1 className="text-xl font-extrabold tracking-tight text-foreground">
                    PHYSHA<span className="text-accent">
                        FLOW
                    </span>
                </h1>

                <button
                    type="button"
                    aria-label="Open menu"
                    onClick={() => setIsMobileOpen(true)}
                    className={buttonStyles}
                >
                    <Menu className="h-5 w-5" />
                </button>
            </header>

            <div className="h-16" />

            <button
                type="button"
                aria-label="Close menu"
                onClick={() => setIsMobileOpen(false)}
                className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 ${
                    isMobileOpen
                        ? "pointer-events-auto opacity-100"
                        : "pointer-events-none opacity-0"
                }`}
            />

            <aside
                className={`fixed inset-y-0 left-0 z-50 h-full w-72 bg-background p-4 shadow-xl transition-transform duration-300 ${
                    isMobileOpen
                        ? "translate-x-0"
                        : "-translate-x-full"
                }`}
            >
                <div className="mb-2 flex items-center justify-between border-b border-border px-3 py-6">
                    {renderBrand()}

                    <button
                        type="button"
                        aria-label="Close menu"
                        onClick={() =>
                            setIsMobileOpen(false)
                        }
                        className={`ml-3 ${buttonStyles}`}
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                {renderNavigation()}
            </aside>
        </div>
    </>
);


}
