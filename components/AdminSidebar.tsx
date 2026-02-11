"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Users, Settings, ArrowLeft, LayoutDashboard, BarChart3, ShieldAlert, Lock } from "lucide-react";

export function AdminSidebar() {
    const pathname = usePathname();
    const [hoveredPath, setHoveredPath] = useState<string | null>(null);

    const menuItems = [
        { name: "Overview", href: "/dashboard/admin", icon: LayoutDashboard },
        { name: "User Management", href: "/dashboard/admin/users", icon: Users },
        { name: "Templates", href: "/dashboard/admin/templates", icon: LayoutDashboard }, // Reusing icon or different one
        { name: "Analytics", href: "/dashboard/admin/analytics", icon: BarChart3, disabled: true },
        { name: "Security", href: "/dashboard/admin/security", icon: ShieldAlert, disabled: true },
        { name: "Settings", href: "/dashboard/admin/settings", icon: Settings, disabled: true },
    ];

    return (
        <aside className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 border-r border-neutral-200 dark:border-neutral-800 bg-white dark:bg-black overflow-y-auto hidden md:block z-40">
            <div className="flex flex-col h-full bg-white dark:bg-black/50 backdrop-blur-sm">
                <div className="p-4 flex-1">
                    <div className="mb-6 px-3">
                        <h2 className="text-[11px] font-bold text-neutral-400 uppercase tracking-widest">
                            Admin Console
                        </h2>
                    </div>

                    <nav className="space-y-0.5 relative">
                        {menuItems.map((item) => {
                            const isActive = item.href === "/dashboard/admin"
                                ? pathname === item.href
                                : pathname.startsWith(item.href);

                            const Icon = item.icon;
                            // Use href or name as unique key for hover state
                            const hoverKey = item.name;
                            const isHovered = hoveredPath === hoverKey;

                            if (item.disabled) {
                                return (
                                    <div key={item.name} className="flex items-center gap-3 px-3 py-2 text-[13px] font-medium rounded-lg text-neutral-400 dark:text-neutral-600 cursor-not-allowed opacity-60">
                                        <Icon size={16} />
                                        <span>{item.name}</span>
                                        <Lock size={10} className="ml-auto opacity-50" />
                                    </div>
                                );
                            }

                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    onMouseEnter={() => setHoveredPath(hoverKey)}
                                    onMouseLeave={() => setHoveredPath(null)}
                                    className={`group flex items-center gap-3 px-3 py-2 text-[13px] font-medium rounded-lg transition-all relative z-10 ${isActive
                                        ? "text-neutral-900 dark:text-white"
                                        : "text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
                                        }`}
                                >
                                    <Icon size={16} className={`transition-colors ${isActive ? "text-indigo-600 dark:text-indigo-400" : "text-neutral-400 group-hover:text-neutral-500"}`} />
                                    <span>{item.name}</span>

                                    {/* Hover Pipe & Background Animation */}
                                    {isHovered && (
                                        <motion.div
                                            layoutId="admin-sidebar-hover"
                                            className="absolute inset-0 bg-neutral-100 dark:bg-neutral-800/50 rounded-lg -z-10"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 0.15 }}
                                        >
                                            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-4 bg-indigo-500 rounded-r-full" />
                                        </motion.div>
                                    )}

                                    {/* Active State Indicator */}
                                    {isActive && !isHovered && (
                                        <motion.div
                                            layoutId="admin-sidebar-active"
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
                </div>

                <div className="p-4 border-t border-neutral-100 dark:border-neutral-800">
                    <Link
                        href="/dashboard"
                        className="flex items-center gap-3 px-3 py-2 text-[13px] font-medium text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors"
                    >
                        <ArrowLeft size={16} />
                        Back to App
                    </Link>
                </div>
            </div>
        </aside>
    );
}
