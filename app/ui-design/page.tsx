"use client";

import Link from "next/link";
import { ArrowRight, Box, Bell, Layout, MousePointer2 } from "lucide-react";
import { motion } from "framer-motion";

const components = [
    {
        name: "Modal",
        description: "A highly customizable modal component with smooth animations and focus management.",
        href: "/ui-design/modal",
        icon: Box,
        status: "Ready",
    },
    {
        name: "Toast",
        description: "Flexible toast notifications for your application. Supports multiple types and positions.",
        href: "/ui-design/toast",
        icon: Bell,
        status: "Ready",
    },
    {
        name: "Buttons",
        description: "Beautiful button variants including solid, outline, ghost, and link styles.",
        href: "#",
        icon: MousePointer2,
        status: "Coming Soon",
    },
    {
        name: "Cards",
        description: "Versatile card components for displaying content in a structured way.",
        href: "#",
        icon: Layout,
        status: "Coming Soon",
    },
];

export default function UIDesignPage() {
    return (
        <div className="max-w-6xl mx-auto">
            <div className="mb-12">
                <h1 className="text-4xl font-bold tracking-tight text-neutral-900 dark:text-white mb-4">
                    UI Components
                </h1>
                <p className="text-xl text-neutral-500 dark:text-neutral-400 max-w-2xl">
                    A collection of copy-paste components for your next project.
                    Built with React, Tailwind CSS, and Framer Motion.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {components.map((component, index) => (
                    <motion.div
                        key={component.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <Link
                            href={component.href}
                            className={`group block h-full p-6 bg-white dark:bg-zinc-900/50 border border-neutral-200 dark:border-neutral-800 rounded-2xl hover:border-indigo-500/50 transition-all hover:shadow-lg ${component.status === "Coming Soon" ? "opacity-60 pointer-events-none" : ""}`}
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className="w-10 h-10 rounded-lg bg-neutral-100 dark:bg-zinc-800 flex items-center justify-center text-neutral-600 dark:text-neutral-300 group-hover:bg-indigo-50 dark:group-hover:bg-indigo-900/20 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                                    <component.icon className="w-5 h-5" />
                                </div>
                                {component.status === "Coming Soon" ? (
                                    <span className="px-2 py-1 text-[10px] uppercase font-bold tracking-wider text-neutral-500 bg-neutral-100 dark:bg-neutral-800 rounded-full">
                                        Soon
                                    </span>
                                ) : (
                                    <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:text-indigo-500 -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all" />
                                )}
                            </div>

                            <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                                {component.name}
                            </h3>
                            <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
                                {component.description}
                            </p>
                        </Link>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
