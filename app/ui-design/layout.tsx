import React from "react";
import { Sidebar } from "../../components/Sidebar";

export default function UIDesignLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen bg-white dark:bg-black pt-16">
            <Sidebar />
            <main className="flex-1 ml-0 md:ml-64 p-8 min-h-[calc(100vh-4rem)]">
                {children}
            </main>
        </div>
    );
}
