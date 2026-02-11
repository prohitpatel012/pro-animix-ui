"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Layout, ShoppingCart, Briefcase, FileText, Smartphone, Dumbbell, Sparkles } from "lucide-react";
import { useState } from "react";

interface Template {
    title: string;
    slug: string;
    plan: string;
}

// Helper to map icons
const getIcon = (slug: string) => {
    if (slug.includes("landing")) return Layout;
    if (slug.includes("ecommerce")) return ShoppingCart;
    if (slug.includes("dashboard")) return Briefcase;
    if (slug.includes("portfolio")) return FileText;
    if (slug.includes("app")) return Smartphone;
    if (slug.includes("gym")) return Dumbbell;
    return Layout;
};

export function TemplatesSidebar({ templates }: { templates: any[] }) {
    const pathname = usePathname();
    const [hoveredPath, setHoveredPath] = useState<string | null>(null);

    // If no templates passed (e.g. loading or error), maybe show skeleton or empty?
    // But layout should handle fetching.

    // safe fallback
    const safeTemplates = templates || [];

    return (
        <aside className="w-full md:w-64 shrink-0 md:border-r border-neutral-200 dark:border-neutral-800 bg-white dark:bg-black md:min-h-[calc(100vh-4rem)] relative z-20">
            <div className="sticky top-20 p-4">
                <div className="mb-6 px-3">
                    <h2 className="text-[11px] font-bold text-neutral-400 uppercase tracking-widest">
                        Templates Library
                    </h2>
                </div>

                <nav className="space-y-0.5 relative">
                    {safeTemplates.map((template) => {
                        const href = `/templates/${template.slug}`;
                        const isActive = pathname === href;
                        const isHovered = hoveredPath === href;
                        const Icon = getIcon(template.slug);

                        return (
                            <Link
                                key={template.slug}
                                href={href}
                                onMouseEnter={() => setHoveredPath(href)}
                                onMouseLeave={() => setHoveredPath(null)}
                                className={`group flex items-center gap-3 px-3 py-2 rounded-lg text-[13px] font-medium transition-all relative z-10 ${isActive
                                    ? "text-neutral-900 dark:text-white"
                                    : "text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
                                    }`}
                            >
                                {/* Static Icon */}
                                <Icon
                                    size={16}
                                    className={`transition-colors ${isActive ? "text-indigo-600 dark:text-indigo-400" : "text-neutral-400 group-hover:text-neutral-500"
                                        }`}
                                />

                                <span>{template.title}</span>

                                {/* Premium Plan Badge */}
                                {(template.plan === "Pro" || template.plan === "Premium") && (
                                    <div className="ml-auto flex items-center">
                                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-linear-to-r from-indigo-500/10 to-purple-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-900/50 flex items-center gap-1">
                                            <Sparkles size={8} />
                                            {template.plan.toUpperCase()}
                                        </span>
                                    </div>
                                )}

                                {/* Hover Pipe & Background Animation */}
                                {isHovered && (
                                    <motion.div
                                        layoutId="sidebar-hover"
                                        className="absolute inset-0 bg-neutral-100 dark:bg-neutral-800/50 rounded-lg -z-10"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.15 }}
                                    >
                                        {/* The moving pipe on the left */}
                                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-4 bg-indigo-500 rounded-r-full" />
                                    </motion.div>
                                )}

                                {/* Active State Indicator (if not hovering, or distinct) */}
                                {isActive && !isHovered && (
                                    <motion.div
                                        layoutId="sidebar-active"
                                        className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-4 bg-indigo-600 rounded-r-full"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                    />
                                )}
                            </Link>
                        );
                    })}
                </nav>

                <div className="mt-8 pt-6 border-t border-neutral-100 dark:border-neutral-800 px-1">
                    <div className="group relative overflow-hidden rounded-xl bg-neutral-900 dark:bg-neutral-800 p-4 transition-all hover:shadow-lg">
                        <div className="relative z-10">
                            <h3 className="font-bold text-xs text-white mb-1 flex items-center gap-2">
                                <Sparkles size={12} className="text-amber-400" />
                                All Access Pass
                            </h3>
                            <p className="text-[10px] text-neutral-400 mb-3 leading-relaxed">
                                Get unlimited access to all premium templates and components.
                            </p>
                            <button className="w-full py-1.5 bg-white text-black text-[10px] font-bold uppercase tracking-wide rounded hover:bg-neutral-200 transition-colors">
                                Upgrade Plan
                            </button>
                        </div>

                        {/* Abstract Background Effect */}
                        <div className="absolute top-0 right-0 -mr-4 -mt-4 w-24 h-24 rounded-full bg-indigo-500/20 blur-2xl group-hover:bg-indigo-500/30 transition-colors" />
                    </div>
                </div>
            </div>
        </aside>
    );
}
