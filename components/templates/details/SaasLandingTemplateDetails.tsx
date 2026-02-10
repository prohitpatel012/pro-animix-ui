"use client";

import React from "react";
import Link from "next/link";
import { ShoppingCart, Globe, Check, Briefcase, Zap, Star, ShieldCheck, Mail, Users, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export function SaasLandingTemplateDetails({ template }: { template: any }) {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-black p-6 md:p-10 font-sans relative">

            {/* Top Right Actions */}
            <div className="absolute top-10 right-10 hidden lg:flex flex-col gap-4 items-end">
                <Link href={`/templates/${template.slug}/preview`}>
                    <button className="px-6 py-2.5 bg-indigo-600 text-white rounded-lg font-bold hover:bg-indigo-700 transition-all shadow-md flex items-center gap-2 text-sm z-20">
                        <Globe className="w-4 h-4" /> Live Preview
                    </button>
                </Link>
                <button className="px-6 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 rounded-lg font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-sm z-20">
                    Buy Now {template.price}
                </button>
            </div>

            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                {/* Left Side: Product Info */}
                <div className="space-y-8">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider">
                        <Star className="w-3 h-3 text-indigo-500" /> Bestseller
                    </div>
                    <h1 className="text-5xl lg:text-7xl font-black text-slate-900 dark:text-white leading-tight tracking-tight">
                        {template.title}
                    </h1>
                    <p className="text-xl text-slate-500 dark:text-slate-400 leading-relaxed font-light">
                        {template.description}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                        <Link href={`/templates/${template.slug}/preview`}>
                            <button className="px-8 py-4 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-500/20 flex items-center gap-3 text-lg w-full sm:w-auto justify-center">
                                <Globe className="w-5 h-5" /> View Demo
                            </button>
                        </Link>
                        <button className="px-8 py-4 bg-white dark:bg-slate-900 text-indigo-600 dark:text-white border-2 border-slate-100 dark:border-slate-800 rounded-xl font-bold hover:border-indigo-200 transition-colors flex items-center justify-center gap-3 text-lg w-full sm:w-auto shadow-sm">
                            <ShoppingCart className="w-5 h-5" /> Buy for {template.price}
                        </button>
                    </div>

                    <div className="pt-8 border-t border-slate-200 dark:border-slate-800 grid grid-cols-2 gap-6 text-sm text-slate-500">
                        <div className="flex items-center gap-2">
                            <Check className="w-4 h-4 text-green-500" /> Lifetime Updates
                        </div>
                        <div className="flex items-center gap-2">
                            <Check className="w-4 h-4 text-green-500" /> Commercial License
                        </div>
                        <div className="flex items-center gap-2">
                            <Check className="w-4 h-4 text-green-500" /> Premium Support
                        </div>
                        <div className="flex items-center gap-2">
                            <Check className="w-4 h-4 text-green-500" /> Figma File Included
                        </div>
                    </div>
                </div>

                {/* Right Side: Hero Visual */}
                <div className="relative">
                    <div className="absolute inset-0 bg-linear-to-t from-neutral-100 via-transparent to-transparent dark:from-zinc-950 opacity-50 animate-pulse" />
                    <div className="relative bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden aspect-square flex items-center justify-center">
                        {/* This would be the template hero image */}
                        <div className="absolute inset-x-8 top-8 bottom-0 bg-slate-50 dark:bg-black rounded-t-xl border-t border-x border-slate-200 dark:border-slate-800 shadow-inner flex flex-col items-center pt-16 px-8 text-center space-y-4">
                            <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900/30 rounded-2xl mb-2 flex items-center justify-center text-indigo-600">
                                <Zap className="w-8 h-8" />
                            </div>
                            <div className="aspect-3/4 bg-stone-200 dark:bg-stone-900 overflow-hidden relative group" />
                            <div className="h-4 w-1/2 bg-slate-200 dark:bg-slate-800 rounded mx-auto" />
                            <div className="pt-8 w-full grid grid-cols-3 gap-4">
                                <div className="h-24 bg-white dark:bg-slate-900 rounded-lg shadow-sm border border-slate-100 dark:border-slate-800" />
                                <div className="h-24 bg-white dark:bg-slate-900 rounded-lg shadow-sm border border-slate-100 dark:border-slate-800" />
                                <div className="h-24 bg-white dark:bg-slate-900 rounded-lg shadow-sm border border-slate-100 dark:border-slate-800" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Features Strip */}
            <div className="mt-24 border-t border-slate-200 dark:border-slate-800 pt-16">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center md:text-left">
                    <Feature icon={ShieldCheck} title="Production Ready" desc="Secure, accessible, and fast." />
                    <Feature icon={Mail} title="Email Templates" desc="Transactional emails included." />
                    <Feature icon={Users} title="Auth & Users" desc="User management system built-in." />
                    <Feature icon={Globe} title="SEO Optimized" desc="Meta tags, sitemap, and schema." />
                </div>
            </div>
        </div>
    );
}

function Feature({ icon: Icon, title, desc }: { icon: any, title: string, desc: string }) {
    return (
        <div className="group">
            <div className="w-12 h-12 bg-white dark:bg-slate-800 rounded-xl flex items-center justify-center shadow-sm border border-slate-100 dark:border-slate-700 text-slate-900 dark:text-white mb-4 group-hover:scale-110 transition-transform">
                <Icon className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{title}</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{desc}</p>
        </div>
    );
}
