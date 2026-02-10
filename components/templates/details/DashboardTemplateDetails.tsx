"use client";

import React from "react";
import Link from "next/link";
import { ShoppingCart, Globe, Check, Briefcase, PieChart, BarChart3, Lock, Settings } from "lucide-react";

export function DashboardTemplateDetails({ template }: { template: any }) {
    return (
        <div className="min-h-screen bg-neutral-50 dark:bg-zinc-950 p-6 md:p-10 font-sans">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex flex-col lg:flex-row justify-between items-center gap-8 mb-16 border-b border-neutral-200 dark:border-neutral-800 pb-10">
                    <div className="max-w-2xl text-center lg:text-left">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 text-xs font-bold uppercase tracking-wider mb-4 border border-indigo-200 dark:border-indigo-800">
                            <Briefcase className="w-3 h-3" /> Enterprise Ready
                        </div>
                        <h1 className="text-4xl lg:text-5xl font-bold text-neutral-900 dark:text-white mb-4 tracking-tight">
                            {template.title}
                        </h1>
                        <p className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
                            {template.description}
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
                        <Link href={`/templates/${template.slug}/preview`}>
                            <button className="px-8 py-3 bg-indigo-600 text-white rounded-lg font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-500/20 flex items-center justify-center gap-2 w-full sm:w-auto">
                                <Globe className="w-4 h-4" /> Live Demo
                            </button>
                        </Link>
                        <button className="px-8 py-3 bg-white dark:bg-zinc-900 text-neutral-900 dark:text-white border border-neutral-200 dark:border-neutral-700 rounded-lg font-bold hover:bg-neutral-50 dark:hover:bg-zinc-800 transition-colors flex items-center justify-center gap-2 w-full sm:w-auto">
                            <ShoppingCart className="w-4 h-4" /> Purchase {template.price}
                        </button>
                    </div>
                </div>

                {/* Dashboard Specific Features */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                    <FeatureCard icon={PieChart} title="Data Viz" desc="Recharts integration for beautiful analytics." />
                    <FeatureCard icon={Lock} title="Auth Ready" desc="Login, Register, and Forgot Password screens." />
                    <FeatureCard icon={BarChart3} title="Tables" desc="Sortable, filterable data tables included." />
                    <FeatureCard icon={Settings} title="Settings" desc="Profile and efficient account management pages." />
                </div>

                {/* Main Preview Area */}
                <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-neutral-200 dark:border-neutral-800 p-2 overflow-hidden mb-12">
                    <div className="bg-neutral-100 dark:bg-zinc-950 rounded-xl aspect-video relative flex items-center justify-center border border-neutral-200 dark:border-neutral-800 h-[500px]">
                        <span className="text-neutral-400 font-medium">Main Dashboard View Preview</span>
                        {/* In a real app, this would be a high-res image */}
                        <div className="absolute inset-0 bg-linear-to-t from-neutral-100 via-transparent to-transparent dark:from-zinc-950 opacity-50" />
                    </div>
                </div>

                {/* Tech Stack Bar */}
                <div className="flex flex-wrap justify-center gap-8 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
                    <div className="text-neutral-400 font-bold">React</div>
                    <div className="text-neutral-400 font-bold">Next.js 14</div>
                    <div className="text-neutral-400 font-bold">Tailwind CSS</div>
                    <div className="text-neutral-400 font-bold">TypeScript</div>
                    <div className="text-neutral-400 font-bold">Recharts</div>
                </div>

            </div>
        </div>
    );
}

function FeatureCard({ icon: Icon, title, desc }: { icon: any, title: string, desc: string }) {
    return (
        <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl border border-neutral-200 dark:border-neutral-800 shadow-xs hover:shadow-md transition-shadow">
            <div className="w-10 h-10 bg-neutral-100 dark:bg-zinc-800 rounded-lg flex items-center justify-center text-neutral-900 dark:text-white mb-4">
                <Icon className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-neutral-900 dark:text-white mb-2">{title}</h3>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">{desc}</p>
        </div>
    );
}
