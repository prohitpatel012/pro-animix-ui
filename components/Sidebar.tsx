"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Box, Bell, MousePointer2, Layout } from "lucide-react";

export function Sidebar() {
    const pathname = usePathname();

    const components = [
        { name: "Modal", href: "/ui-design/modal", icon: Box },
        { name: "Toast", href: "/ui-design/toast", icon: Bell },
        // Add more placeholders if needed to show what's possible
        { name: "Buttons", href: "#", icon: MousePointer2, disabled: true },
        { name: "Cards", href: "#", icon: Layout, disabled: true },
    ];

    return (
        <aside className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 border-r border-neutral-200 dark:border-neutral-800 bg-white dark:bg-black overflow-y-auto hidden md:block z-40">
            <div className="p-6">
                <h2 className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-4 px-2">
                    Components
                </h2>
                <nav className="space-y-1">
                    {components.map((item) => {
                        const isActive = pathname === item.href;
                        const Icon = item.icon;

                        if (item.disabled) {
                            return (
                                <div key={item.name} className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg text-neutral-400 dark:text-neutral-600 cursor-not-allowed opacity-60">
                                    <Icon size={16} />
                                    <span>{item.name}</span>
                                    <span className="ml-auto text-[10px] font-bold bg-neutral-100 dark:bg-neutral-800 px-1.5 py-0.5 rounded text-neutral-500">SOON</span>
                                </div>
                            );
                        }

                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors relative ${isActive
                                        ? "text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20"
                                        : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800"
                                    }`}
                            >
                                {isActive && (
                                    <motion.div
                                        layoutId="sidebar-active-component"
                                        className="absolute left-0 w-1 h-6 bg-indigo-600 rounded-r-full"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                    />
                                )}
                                <Icon size={16} className={`mr-3 ${isActive ? "text-indigo-600 dark:text-indigo-400" : "text-neutral-400 group-hover:text-neutral-500"}`} />
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>

                {/* Promo Card similar to templates sidebar */}
                <div className="mt-8 pt-8 border-t border-neutral-200 dark:border-neutral-800 px-2">
                    <div className="bg-neutral-100 dark:bg-zinc-900 rounded-xl p-4">
                        <p className="text-xs font-medium text-neutral-500 dark:text-neutral-400 mb-2">Need premium templates?</p>
                        <Link href="/templates" className="block w-full py-1.5 bg-white dark:bg-black border border-neutral-200 dark:border-zinc-800 text-neutral-900 dark:text-white text-xs font-bold rounded-lg hover:border-indigo-500 transition-colors text-center shadow-sm">
                            View Templates
                        </Link>
                    </div>
                </div>
            </div>
        </aside>
    );
}
