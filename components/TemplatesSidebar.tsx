"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Layout, ShoppingCart, Briefcase, FileText, Smartphone, Dumbbell } from "lucide-react";

const templates = [
    { name: "Modern Landing Page", slug: "landing-page", icon: Layout, plan: "Pro" },
    { name: "E-commerce Store", slug: "ecommerce", icon: ShoppingCart, plan: "Pro" },
    { name: "SaaS Dashboard", slug: "saas-dashboard", icon: Briefcase, plan: "Pro" },
    { name: "Portfolio", slug: "portfolio", icon: FileText, plan: "Pro" },
    { name: "Mobile App", slug: "mobile-app", icon: Smartphone, plan: "Pro" },
    { name: "Gym Website", slug: "gym-landing-page", icon: Dumbbell, plan: "Pro" },
    { name: "Solo Portfolio", slug: "solo-portfolio", icon: FileText, plan: "Pro" },
];

export function TemplatesSidebar() {
    const pathname = usePathname();

    return (
        <div className="w-full md:w-80 shrink-0 md:border-r md:border-neutral-200 md:dark:border-neutral-800 bg-white dark:bg-black md:min-h-[calc(100vh-4rem)]">
            <div className="p-4 md:p-6 sticky top-20">
                <h2 className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-4 px-2">
                    Discover Templates
                </h2>
                <nav className="space-y-1">
                    {templates.map((template) => {
                        const isActive = pathname === `/templates/${template.slug}`;
                        return (
                            <Link
                                key={template.slug}
                                href={`/templates/${template.slug}`}
                                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors relative ${isActive
                                    ? "text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20"
                                    : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                                    }`}
                            >
                                <template.icon className="w-4 h-4" />
                                {template.name}
                                {template.plan && template.plan !== "Basic" && (
                                    <span className="ml-auto text-[10px] font-bold px-1.5 py-0.5 rounded text-white bg-indigo-500">
                                        {template.plan}
                                    </span>
                                )}
                                {isActive && (
                                    <motion.div
                                        layoutId="activeTemplate"
                                        className="absolute left-0 w-1 h-6 bg-indigo-600 rounded-r-full"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                    />
                                )}
                            </Link>
                        );
                    })}
                </nav>

                <div className="mt-8 pt-8 border-t border-neutral-200 dark:border-neutral-800 px-2">
                    <div className="bg-linear-to-br from-indigo-500 to-purple-600 rounded-xl p-4 text-white">
                        <h3 className="font-bold text-sm mb-1">Get All Access</h3>
                        <p className="text-xs text-indigo-100 mb-3">Unlock all premium templates and components.</p>
                        <button className="w-full py-1.5 bg-white text-indigo-600 text-xs font-bold rounded-lg hover:bg-indigo-50 transition-colors">
                            Upgrade Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
