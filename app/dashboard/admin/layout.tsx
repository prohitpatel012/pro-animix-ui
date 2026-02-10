"use client";

import React from "react";
import { AdminSidebar } from "@/components/AdminSidebar";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex bg-neutral-50 dark:bg-black min-h-screen pt-16">
            {/* Sidebar is fixed, so we need ml-64 on main content */}
            <AdminSidebar />

            <main className="flex-1 md:ml-64 w-full relative">
                <div className="max-w-7xl mx-auto p-6 md:p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
