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
import { getTaxonomyLayers, taxonomyPath } from "../taxonomy/layers";

const layerIcons: Record<string, typeof Building2> = {
facility: Building2,
it: Server,
workload: Workflow,
};

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
...getTaxonomyLayers().map((layer) => ({
    label: layer.navLabel,
    href: taxonomyPath(layer.slug),
    icon: layerIcons[layer.slug],
})),
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
const [isHeaderVisible, setIsHeaderVisible] = useState(true);

useEffect(() => {
    setIsMobileOpen(false);
    setIsHeaderVisible(true);
}, [pathname]);

// El scroll en esta app ocurre dentro de #app-scroll-container (el <main>
// del layout), NO en el window. Oculta el header fijo al scrollear hacia
// abajo y lo muestra al scrollear hacia arriba (solo aplica en mobile,
// donde ese header es fixed; en md+ no se renderiza).
useEffect(() => {
    const scroller = document.getElementById("app-scroll-container");
    if (!scroller) return;

    let lastScrollY = scroller.scrollTop;
    let ticking = false;

    const onScroll = () => {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(() => {
            const currentScrollY = scroller.scrollTop;
            const delta = currentScrollY - lastScrollY;

            if (delta > 8 && currentScrollY > 120) {
                // Scroll hacia abajo: ocultar. Umbral de 120px para no
                // esconder el header justo arriba de todo.
                setIsHeaderVisible(false);
            } else if (delta < -12) {
                // Scroll hacia arriba: mostrarlo. Umbral más exigente para
                // que el gesto sea un poco más decidido que el de ocultar.
                setIsHeaderVisible(true);
            }

            lastScrollY = currentScrollY;
            ticking = false;
        });
    };

    scroller.addEventListener("scroll", onScroll, { passive: true });
    return () => scroller.removeEventListener("scroll", onScroll);
}, []);

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
                            <Icon className={`h-5 w-5 shrink-0 ${isActive ? "text-accent": "text-muted"}`} aria-hidden="true"/>
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
                PHYSA<span className="text-accent">FLOW</span>
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
                        <PanelLeftClose className="h-5 w-5" aria-hidden="true" />
                    ) : (
                        <PanelLeftOpen className="h-5 w-5" aria-hidden="true" />
                    )}
                </button>
            </div>

            {renderNavigation(!isOpen)}
        </aside>

        <div className="md:hidden">
            <header
                className={`fixed inset-x-0 top-0 z-40 flex items-center justify-between border-b border-border bg-background px-4 py-3 transition-transform duration-300 ${
                    isHeaderVisible ? "translate-y-0" : "-translate-y-full"
                }`}
            >
                <h1 className="text-xl font-extrabold tracking-tight text-foreground">
                    PHYSA<span className="text-accent">
                        FLOW
                    </span>
                </h1>

                <button
                    type="button"
                    aria-label="Open menu"
                    onClick={() => setIsMobileOpen(true)}
                    className={buttonStyles}
                >
                    <Menu className="h-5 w-5" aria-hidden="true" />
                </button>
            </header>

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
                        <X className="h-5 w-5" aria-hidden="true" />
                    </button>
                </div>

                {renderNavigation()}
            </aside>
        </div>
    </>
);


}