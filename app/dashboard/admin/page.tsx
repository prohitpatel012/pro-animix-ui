"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { Loader2, Users, Eye, TrendingUp, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

export default function AdminDashboardOverview() {
    const { user, loading } = useAuth();
    const router = useRouter();
    const [stats, setStats] = useState<any>(null);
    const [chartData, setChartData] = useState<any[]>([]);
    const [isLoadingStats, setIsLoadingStats] = useState(true);

    useEffect(() => {
        if (!loading) {
            if (!user || user.role !== 'admin') {
                router.push("/dashboard");
            } else {
                fetchStats();
            }
        }
    }, [user, loading, router]);

    const fetchStats = async () => {
        try {
            const res = await fetch("/api/admin/stats");
            const data = await res.json();
            if (res.ok) {
                setStats(data.stats);
                setChartData(data.chartData);
            }
        } catch (error) {
            console.error("Failed to fetch admin stats", error);
        } finally {
            setIsLoadingStats(false);
        }
    };

    if (loading || isLoadingStats) {
        return (
            <div className="h-96 flex items-center justify-center">
                <Loader2 className="animate-spin w-8 h-8 text-indigo-500" />
            </div>
        );
    }

    const StatCard = ({ title, value, icon: Icon, color, trend }: any) => (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 bg-white dark:bg-neutral-900/50 rounded-xl border border-neutral-200 dark:border-neutral-800 shadow-sm"
        >
            <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${color} bg-opacity-10 dark:bg-opacity-20`}>
                    <Icon className={`w-6 h-6 ${color.replace('bg-', 'text-')}`} />
                </div>
                {trend && (
                    <span className="text-xs font-medium text-green-500 flex items-center gap-1">
                        +{trend}% <TrendingUp className="w-3 h-3" />
                    </span>
                )}
            </div>
            <div>
                <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400">{title}</p>
                <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mt-1">{value}</h3>
            </div>
        </motion.div>
    );

    return (
        <div className="w-full space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-neutral-900 dark:text-white">Admin Overview</h1>
                <p className="text-neutral-500 dark:text-neutral-400 mt-1">Platform usage statistics and metric overview.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Total Users"
                    value={stats?.totalUsers || 0}
                    icon={Users}
                    color="bg-indigo-500"
                    trend={12}
                />
                <StatCard
                    title="Total Page Views"
                    value={stats?.totalPageViews?.toLocaleString() || 0}
                    icon={Eye}
                    color="bg-pink-500"
                    trend={8}
                />
                <StatCard
                    title="Active Admins"
                    value={stats?.adminUsers || 0}
                    icon={ShieldCheck}
                    color="bg-green-500"
                />
                {/* Placeholder for Revenue or other metric */}
                <StatCard
                    title="Conversion Rate"
                    value="2.4%"
                    icon={TrendingUp}
                    color="bg-orange-500"
                    trend={4}
                />
            </div>

            {/* Analytics Chart Area */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-white dark:bg-neutral-900/50 rounded-xl border border-neutral-200 dark:border-neutral-800 p-6 shadow-sm">
                    <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-6">Traffic Overview (Last 7 Days)</h3>

                    {/* CSS-only Bar Chart Visualization */}
                    <div className="h-64 flex items-end justify-between gap-4 px-2">
                        {chartData && chartData.length > 0 ? (
                            chartData.map((day: any, i: number) => {
                                // Calculate height percentage relative to max
                                const maxViews = Math.max(...chartData.map((d: any) => d.pageViews)) || 1;
                                const height = Math.max((day.pageViews / maxViews) * 100, 5); // min 5% height

                                return (
                                    <div key={i} className="flex flex-col items-center gap-2 flex-1 group">
                                        <div className="relative w-full max-w-[40px] h-full flex items-end bg-neutral-100 dark:bg-neutral-800 rounded-lg overflow-hidden">
                                            <motion.div
                                                initial={{ height: 0 }}
                                                animate={{ height: `${height}%` }}
                                                transition={{ duration: 1, ease: "easeOut" }}
                                                className="w-full bg-indigo-500 group-hover:bg-indigo-600 transition-colors rounded-b-lg"
                                            />

                                            {/* Tooltip */}
                                            <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-black text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 pointer-events-none">
                                                {day.pageViews} Views
                                            </div>
                                        </div>
                                        <span className="text-xs text-neutral-500 dark:text-neutral-400 font-medium">
                                            {new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}
                                        </span>
                                    </div>
                                );
                            })
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-neutral-400">
                                No traffic data available yet
                            </div>
                        )}
                    </div>
                </div>

                {/* Quick User Actions / Recent */}
                <div className="bg-white dark:bg-neutral-900/50 rounded-xl border border-neutral-200 dark:border-neutral-800 p-6 shadow-sm">
                    <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-4">Quick Actions</h3>
                    <div className="space-y-3">
                        <button
                            onClick={() => router.push('/dashboard/admin/users')}
                            className="w-full flex items-center justify-between p-3 rounded-lg bg-neutral-50 dark:bg-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors text-sm font-medium text-neutral-700 dark:text-neutral-300"
                        >
                            <span>Manage Users</span>
                            <Users className="w-4 h-4" />
                        </button>
                        <button className="w-full flex items-center justify-between p-3 rounded-lg bg-neutral-50 dark:bg-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors text-sm font-medium text-neutral-700 dark:text-neutral-300">
                            <span>System Settings</span>
                            <TrendingUp className="w-4 h-4" />
                        </button>
                        <div className="pt-4 mt-4 border-t border-neutral-100 dark:border-neutral-800">
                            <p className="text-xs text-neutral-500 mb-2">System Health</p>
                            <div className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                <span className="text-sm font-medium text-green-600">Operational</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
