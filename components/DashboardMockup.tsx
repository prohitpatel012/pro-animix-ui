"use client";

import React from "react";
import { BarChart3, Users, CreditCard, Activity, ArrowUpRight, Search, Bell } from "lucide-react";

export function DashboardMockup() {
    return (
        <div className="flex h-full w-full bg-white dark:bg-black rounded-xl overflow-hidden shadow-sm border border-neutral-200 dark:border-neutral-800">
            {/* Sidebar - Visual only */}
            <div className="w-16 md:w-64 border-r border-neutral-200 dark:border-neutral-800 p-4 flex flex-col gap-4">
                <div className="h-8 w-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                    <div className="h-4 w-4 bg-white rounded-full opacity-50" />
                </div>
                <div className="flex flex-col gap-2 mt-4">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className={`h-8 w-full rounded-lg ${i === 1 ? 'bg-neutral-100 dark:bg-neutral-800' : 'hover:bg-neutral-50 dark:hover:bg-neutral-900'} transition-colors flex items-center px-2`}>
                            <div className="h-4 w-4 bg-neutral-300 dark:bg-neutral-700 rounded-sm" />
                            <div className="hidden md:block ml-3 h-2 w-20 bg-neutral-200 dark:bg-neutral-800 rounded-full" />
                        </div>
                    ))}
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Header */}
                <div className="h-16 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between px-6">
                    <div className="flex items-center gap-3 bg-neutral-100 dark:bg-neutral-900 px-3 py-1.5 rounded-md w-64">
                        <Search className="w-4 h-4 text-neutral-400" />
                        <div className="h-2 w-20 bg-neutral-300 dark:bg-neutral-700 rounded-full" />
                    </div>
                    <div className="flex items-center gap-3">
                        <Bell className="w-5 h-5 text-neutral-400" />
                        <div className="h-8 w-8 bg-neutral-200 dark:bg-neutral-800 rounded-full" />
                    </div>
                </div>

                {/* Dashboard Content */}
                <div className="p-6 md:p-8 overflow-hidden">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <div className="h-4 w-32 bg-neutral-300 dark:bg-neutral-700 rounded-full mb-2" />
                            <div className="h-6 w-48 bg-neutral-900 dark:bg-neutral-100 rounded-full" />
                        </div>
                        <div className="h-9 w-24 bg-indigo-600 rounded-lg" />
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                        {stats.map((stat, i) => (
                            <div key={i} className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50">
                                <div className="flex items-center justify-between mb-4">
                                    <stat.icon className="w-5 h-5 text-neutral-500" />
                                    <span className="text-xs font-semibold text-green-500 flex items-center gap-1">
                                        +{stat.growth}% <ArrowUpRight className="w-3 h-3" />
                                    </span>
                                </div>
                                <div className="h-6 w-24 bg-neutral-900 dark:bg-neutral-100 rounded-full mb-1" />
                                <div className="h-3 w-16 bg-neutral-400 dark:bg-neutral-600 rounded-full" />
                            </div>
                        ))}
                    </div>

                    {/* Charts Area */}
                    <div className="grid grid-cols-3 gap-6 h-64">
                        <div className="col-span-2 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50 p-6 flex flex-col">
                            <div className="flex items-center justify-between mb-6">
                                <div className="h-4 w-24 bg-neutral-400 dark:bg-neutral-600 rounded-full" />
                                <div className="flex gap-2">
                                    <div className="h-6 w-16 bg-neutral-200 dark:bg-neutral-800 rounded-md" />
                                    <div className="h-6 w-16 bg-neutral-200 dark:bg-neutral-800 rounded-md" />
                                </div>
                            </div>
                            <div className="flex-1 flex items-end gap-2 px-2">
                                {[40, 65, 45, 80, 55, 70, 40, 60, 50, 75, 60, 85].map((h, i) => (
                                    <div key={i} className="flex-1 bg-indigo-500/20 rounded-t-sm relative group overflow-hidden">
                                        <div
                                            className="absolute bottom-0 left-0 w-full bg-indigo-500 rounded-t-sm transition-all duration-1000"
                                            style={{ height: `${h}%` }}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="col-span-1 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50 p-6">
                            <div className="h-4 w-24 bg-neutral-400 dark:bg-neutral-600 rounded-full mb-6" />
                            <div className="space-y-4">
                                {[1, 2, 3, 4].map((i) => (
                                    <div key={i} className="flex items-center gap-3">
                                        <div className="h-8 w-8 rounded-full bg-neutral-200 dark:bg-neutral-800" />
                                        <div className="flex-1">
                                            <div className="h-3 w-20 bg-neutral-300 dark:bg-neutral-700 rounded-full mb-1" />
                                            <div className="h-2 w-12 bg-neutral-200 dark:bg-neutral-800 rounded-full" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const stats = [
    { icon: BarChart3, growth: 12 },
    { icon: Users, growth: 8 },
    { icon: CreditCard, growth: 24 },
    { icon: Activity, growth: 4 },
];
