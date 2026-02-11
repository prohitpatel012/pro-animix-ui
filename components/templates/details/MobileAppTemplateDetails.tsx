"use client";

import React from "react";
import Link from "next/link";
import { ShoppingCart, Layout, Smartphone, Globe, Check, Smartphone as SmartphoneIcon, Tablet } from "lucide-react";

export function MobileAppTemplateDetails({ template }: { template: any }) {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-black p-6 md:p-10 font-sans relative">

            {/* Top Right Actions - FIXED & CONSISTENT */}
            <div className="fixed top-24 right-6 z-50">
                <Link href={`/templates/${template.slug}/preview`}>
                    <button className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full font-bold text-sm flex items-center gap-2 shadow-lg shadow-indigo-500/30 transition-all">
                        <Globe className="w-4 h-4" /> Live Preview
                    </button>
                </Link>
            </div>

            <div className="max-w-6xl mx-auto">
                {/* Mobile App Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm font-bold mb-6">
                        <Smartphone className="w-4 h-4" /> iOS & Android Ready
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">
                        {template.title}
                    </h1>
                    <p className="text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
                        {template.description}
                    </p>

                    <div className="mt-8 flex justify-center gap-4">
                        <Link href={`/templates/${template.slug}/preview`}>
                            <button className="px-8 py-4 bg-blue-600 text-white rounded-full font-bold text-lg hover:bg-blue-700 transition-transform hover:-translate-y-1 shadow-lg shadow-blue-500/30 flex items-center gap-3">
                                <Globe className="w-5 h-5" /> Live Demo
                            </button>
                        </Link>
                    </div>
                </div>

                {/* Mobile App Specific Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
                    <div className="bg-white dark:bg-zinc-900 rounded-3xl p-8 shadow-sm border border-slate-100 dark:border-zinc-800">
                        <div className="w-14 h-14 bg-purple-100 dark:bg-purple-900/20 rounded-2xl flex items-center justify-center text-purple-600 mb-6">
                            <SmartphoneIcon className="w-7 h-7" />
                        </div>
                        <h3 className="text-xl font-bold mb-3 dark:text-white">Native Feel</h3>
                        <p className="text-slate-500">Smooth animations and gestures that feel just like a native app.</p>
                    </div>
                    <div className="bg-white dark:bg-zinc-900 rounded-3xl p-8 shadow-sm border border-slate-100 dark:border-zinc-800">
                        <div className="w-14 h-14 bg-pink-100 dark:bg-pink-900/20 rounded-2xl flex items-center justify-center text-pink-600 mb-6">
                            <Tablet className="w-7 h-7" />
                        </div>
                        <h3 className="text-xl font-bold mb-3 dark:text-white">Responsive Features</h3>
                        <p className="text-slate-500">Adapts perfectly to tablets and larger screens automatically.</p>
                    </div>
                    <div className="bg-white dark:bg-zinc-900 rounded-3xl p-8 shadow-sm border border-slate-100 dark:border-zinc-800">
                        <div className="w-14 h-14 bg-green-100 dark:bg-green-900/20 rounded-2xl flex items-center justify-center text-green-600 mb-6">
                            <Layout className="w-7 h-7" />
                        </div>
                        <h3 className="text-xl font-bold mb-3 dark:text-white">App Store Assets</h3>
                        <p className="text-slate-500">Includes Figma files for App Store screenshots and icons.</p>
                    </div>
                </div>

                {/* Screenshots Carousel Placeholder */}
                <div className="bg-slate-900 rounded-3xl p-12 text-center text-white mb-20 relative overflow-hidden">
                    <div className="relative z-10">
                        <h2 className="text-3xl font-bold mb-8">Screens included</h2>
                        <div className="flex gap-6 justify-center overflow-x-auto pb-4">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="w-64 h-[500px] bg-slate-800 rounded-3xl border-4 border-slate-700 shrink-0 flex items-center justify-center">
                                    <span className="font-mono text-slate-500">Screen {i}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
