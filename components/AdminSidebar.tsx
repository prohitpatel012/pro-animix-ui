"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Users, Settings, ArrowLeft, LayoutDashboard, BarChart3, ShieldAlert } from "lucide-react";

export function AdminSidebar() {
    const pathname = usePathname();

    const menuItems = [
        { name: "Overview", href: "/dashboard/admin", icon: LayoutDashboard },
        { name: "User Management", href: "/dashboard/admin/users", icon: Users }, // Note: we only have one page now, but good to have structure
        { name: "Analytics", href: "/dashboard/admin/analytics", icon: BarChart3, disabled: true },
        { name: "Security", href: "/dashboard/admin/security", icon: ShieldAlert, disabled: true },
        { name: "Settings", href: "/dashboard/admin/settings", icon: Settings, disabled: true },
    ];

    return (
        <aside className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 border-r border-neutral-200 dark:border-neutral-800 bg-white dark:bg-black overflow-y-auto hidden md:block z-40">
            <div className="flex flex-col h-full bg-white dark:bg-black/50 backdrop-blur-sm">
                <div className="p-6 flex-1">
                    <div className="mb-6 px-2">
                        <h2 className="text-xs font-bold text-neutral-400 uppercase tracking-widest">
                            Admin Console
                        </h2>
                    </div>

                    <nav className="space-y-1">
                        {menuItems.map((item) => {
                            // Perfect match for root, startsWith for others to handle sub-routes
                            const isActive = item.href === "/dashboard/admin"
                                ? pathname === item.href
                                : pathname.startsWith(item.href);

                            const Icon = item.icon;

                            if (item.disabled) {
                                return (
                                    <div key={item.name} className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg text-neutral-400 dark:text-neutral-600 cursor-not-allowed opacity-60">
                                        <Icon size={18} />
                                        <span>{item.name}</span>
                                        <span className="ml-auto text-[10px] font-bold bg-neutral-100 dark:bg-neutral-800 px-1.5 py-0.5 rounded text-neutral-500">SOON</span>
                                    </div>
                                );
                            }

                            return (
                                <Link
                                    key={item.name}
                                    href={item.href === "/dashboard/admin/users" ? "/dashboard/admin" : item.href} // Temporary redirect for users to main admin page since that's where the table is
                                    className={`group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all relative ${isActive
                                        ? "text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20"
                                        : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800"
                                        }`}
                                >
                                    {isActive && (
                                        <motion.div
                                            layoutId="admin-sidebar-active"
                                            className="absolute left-0 w-1 h-6 bg-indigo-600 rounded-r-full"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                        />
                                    )}
                                    <Icon size={18} className={`mr-3 transition-colors ${isActive ? "text-indigo-600 dark:text-indigo-400" : "text-neutral-400 group-hover:text-neutral-500"}`} />
                                    {item.name}
                                </Link>
                            );
                        })}
                    </nav>
                </div>

                <div className="p-4 border-t border-neutral-200 dark:border-neutral-800">
                    <Link
                        href="/dashboard"
                        className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors"
                    >
                        <ArrowLeft size={18} />
                        Back to App
                    </Link>
                </div>
            </div>
        </aside>
    );
}
