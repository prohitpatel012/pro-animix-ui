"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, ShoppingCart, Check, Zap, Globe, Layout, Code2, Smartphone } from "lucide-react";

export function DefaultTemplateDetails({ template }: { template: any }) {
    return (
        <div className="min-h-screen bg-white dark:bg-black p-6 md:p-10">
            <div className="flex flex-col xl:flex-row gap-12">

                {/* Main Content Area */}
                <div className="flex-1">
                    {/* Header Section */}
                    <div className="flex flex-col lg:flex-row justify-between items-start gap-8 mb-12">
                        <div className="max-w-2xl">
                            <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white mb-4">
                                {template.title}
                            </h1>
                            <p className="text-lg text-neutral-500 dark:text-neutral-400 leading-relaxed mb-6">
                                {template.description}
                            </p>

                            {/* Tech Stack Icons */}
                            <div className="flex items-center gap-3">
                                <TechIcon label="Next.js" color="bg-black dark:bg-white text-white dark:text-black">N</TechIcon>
                                <TechIcon label="React" color="bg-blue-500 text-white">Ra</TechIcon>
                                <TechIcon label="Tailwind" color="bg-cyan-500 text-white">Tw</TechIcon>
                                <TechIcon label="TypeScript" color="bg-blue-600 text-white">TS</TechIcon>
                                <TechIcon label="Framer" color="bg-pink-500 text-white">Fm</TechIcon>
                            </div>
                        </div>

                        {/* Header Actions - FIXED & CONSISTENT */}
                        <div className="fixed top-24 right-6 z-50">
                            <Link href={`/templates/${template.slug}/preview`} target="_blank">
                                <button className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full font-bold text-sm flex items-center gap-2 shadow-lg shadow-indigo-500/30 transition-all">
                                    <Globe className="w-4 h-4" /> Live Preview
                                </button>
                            </Link>
                        </div>
                    </div>

                    {/* Screenshot Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Mock Screenshots - placeholders for now */}
                        <div className="aspect-16/10 bg-neutral-100 dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 p-8 flex flex-col justify-between group overflow-hidden relative">
                            <div className="text-center z-10">
                                <h3 className="font-semibold text-neutral-900 dark:text-white mb-2">Hero Section</h3>
                                <p className="text-sm text-neutral-500">High conversion header</p>
                            </div>
                            <div className="absolute inset-x-8 -bottom-12 h-40 bg-white dark:bg-zinc-950 rounded-t-lg shadow-xl border-t border-x border-neutral-200 dark:border-neutral-800 transition-transform duration-500 group-hover:-translate-y-4" />
                        </div>

                        <div className="aspect-16/10 bg-neutral-100 dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 p-8 flex flex-col justify-between group overflow-hidden relative">
                            <div className="text-center z-10">
                                <h3 className="font-semibold text-neutral-900 dark:text-white mb-2">Deployments</h3>
                                <p className="text-sm text-neutral-500">Dashboard integration</p>
                            </div>
                            <div className="absolute inset-x-12 bottom-8 h-32 flex gap-4">
                                <div className="flex-1 bg-white dark:bg-zinc-950 rounded-lg shadow-md border border-neutral-200 dark:border-neutral-800 transition-transform duration-500 group-hover:scale-105" />
                                <div className="flex-1 bg-white dark:bg-zinc-950 rounded-lg shadow-md border border-neutral-200 dark:border-neutral-800 transition-transform duration-500 group-hover:scale-105 delay-75" />
                            </div>
                        </div>

                        <div className="aspect-16/10 bg-neutral-100 dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 p-8 flex flex-col justify-between group overflow-hidden relative">
                            <div className="text-center z-10">
                                <h3 className="font-semibold text-neutral-900 dark:text-white mb-2">Pricing Plans</h3>
                                <p className="text-sm text-neutral-500">Clear pricing tables</p>
                            </div>
                            <div className="absolute inset-x-8 -bottom-16 h-48 flex items-end justify-center">
                                <div className="w-full max-w-xs h-full bg-white dark:bg-zinc-950 rounded-t-xl shadow-xl border border-neutral-200 dark:border-neutral-800 p-4 transition-transform duration-500 group-hover:-translate-y-4">
                                    <div className="text-3xl font-bold text-neutral-900 dark:text-white mb-1">$99</div>
                                    <div className="h-2 w-12 bg-indigo-500 rounded-full" />
                                </div>
                            </div>
                        </div>

                        <div className="aspect-16/10 bg-neutral-100 dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 p-8 flex flex-col justify-between group overflow-hidden relative">
                            <div className="text-center z-10">
                                <h3 className="font-semibold text-neutral-900 dark:text-white mb-2">Sign Up</h3>
                                <p className="text-sm text-neutral-500">Authentication forms</p>
                            </div>
                            <div className="absolute left-1/2 -translate-x-1/2 -bottom-12 w-64 bg-white dark:bg-zinc-950 rounded-lg shadow-xl border border-neutral-200 dark:border-neutral-800 p-6 transition-transform duration-500 group-hover:-translate-y-4">
                                <div className="space-y-3">
                                    <div className="h-8 bg-neutral-100 dark:bg-neutral-800 rounded w-full" />
                                    <div className="h-8 bg-neutral-100 dark:bg-neutral-800 rounded w-full" />
                                    <div className="h-8 bg-indigo-600 rounded w-full mt-2" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Sidebar - Sticky */}
                <div className="w-full xl:w-80 shrink-0">
                    <div className="sticky top-24 bg-neutral-50 dark:bg-zinc-900/50 rounded-2xl p-6 border border-neutral-200 dark:border-neutral-800">
                        <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-4">
                            Build faster with All-Access
                        </h3>

                        <ul className="space-y-4 mb-8">
                            <FeatureItem>100+ templates and component blocks combined</FeatureItem>
                            <FeatureItem>Built with Typescript, React, Tailwind CSS v4</FeatureItem>
                            <FeatureItem>One click copy and paste, save days of development time</FeatureItem>
                            <FeatureItem>Shaden CLI 3.0 compatible, ready to use within your terminal</FeatureItem>
                        </ul>

                        <button className="w-full py-3 bg-zinc-900 dark:bg-white text-white dark:text-black rounded-lg font-bold text-sm hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors shadow-lg">
                            Get All-Access
                        </button>

                        <p className="text-xs text-neutral-400 text-center mt-4">
                            Trusted by 120,000+ users worldwide
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
}

function TechIcon({ label, color, children }: { label: string, color: string, children: React.ReactNode }) {
    return (
        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold shadow-sm ${color}`} title={label}>
            {children}
        </div>
    );
}

function FeatureItem({ children }: { children: React.ReactNode }) {
    return (
        <li className="flex items-start gap-3 text-sm text-neutral-600 dark:text-neutral-400">
            <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center shrink-0 mt-0.5">
                <Check className="w-3 h-3 text-white" />
            </div>
            <span className="leading-snug">{children}</span>
        </li>
    );
}
