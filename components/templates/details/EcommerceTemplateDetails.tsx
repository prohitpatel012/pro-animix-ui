"use client";

import React from "react";
import Link from "next/link";
import { ShoppingCart, Star, CreditCard, Box, TrendingUp, Search, Globe } from "lucide-react";
import { motion } from "framer-motion";

export function EcommerceTemplateDetails({ template }: { template: any }) {
    return (
        <div className="min-h-screen bg-stone-50 dark:bg-stone-950 p-6 md:p-10 font-serif">
            <div className="max-w-7xl mx-auto">
                {/* Top Right Actions - FIXED & CONSISTENT */}
                <div className="fixed top-24 right-6 z-50">
                    <Link href={`/templates/${template.slug}/preview`}>
                        <button className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full font-bold text-sm flex items-center gap-2 shadow-lg shadow-indigo-500/30 transition-all font-sans">
                            <Globe className="w-4 h-4" /> Live Preview
                        </button>
                    </Link>
                </div>

                {/* Header */}
                <div className="text-center mb-16 pt-12 relative">
                    <span className="text-xs font-bold tracking-widest uppercase text-stone-500 mb-4 block">New Collection</span>
                    <h1 className="text-5xl md:text-8xl font-medium text-stone-900 dark:text-stone-100 mb-6 tracking-tight">
                        {template.title}
                    </h1>
                    <p className="text-xl text-stone-600 dark:text-stone-400 max-w-2xl mx-auto font-light italic">
                        "{template.description}"
                    </p>
                </div>

                {/* Main Action Area */}
                <div className="flex justify-center mb-20 max-w-4xl mx-auto">
                    <Link href={`/templates/${template.slug}/preview`} className="w-full md:w-auto">
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full md:w-auto px-12 py-5 bg-stone-900 dark:bg-stone-100 text-white dark:text-black text-lg uppercase tracking-widest hover:bg-stone-800 dark:hover:bg-stone-200 transition-colors"
                        >
                            View Showroom
                        </motion.button>
                    </Link>
                </div>

                {/* Imagery Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
                    <div className="aspect-3/4 bg-stone-200 dark:bg-stone-900 overflow-hidden relative group">
                        <img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8" alt="Store" className="object-cover w-full h-full grayscale group-hover:grayscale-0 transition-all duration-700" />
                        <div className="absolute bottom-6 left-6 text-white text-xs font-bold uppercase tracking-widest">Product Page</div>
                    </div>
                    <div className="aspect-3/4 bg-stone-200 dark:bg-stone-900 overflow-hidden relative group md:-mt-12">
                        <img src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04" alt="Cart" className="object-cover w-full h-full grayscale group-hover:grayscale-0 transition-all duration-700" />
                        <div className="absolute bottom-6 left-6 text-white text-xs font-bold uppercase tracking-widest">Checkout Flow</div>
                    </div>
                    <div className="aspect-3/4 bg-stone-200 dark:bg-stone-900 overflow-hidden relative group">
                        <img src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b" alt="Account" className="object-cover w-full h-full grayscale group-hover:grayscale-0 transition-all duration-700" />
                        <div className="absolute bottom-6 left-6 text-white text-xs font-bold uppercase tracking-widest">User Dashboard</div>
                    </div>
                </div>

                {/* Features List */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-12 border-t border-stone-200 dark:border-stone-800 pt-16">
                    <Feature icon={CreditCard} title="Payments" desc="Stripe & PayPal integrated." />
                    <Feature icon={Box} title="Inventory" desc="Real-time stock management." />
                    <Feature icon={Search} title="Search" desc="Instant product filtering." />
                    <Feature icon={TrendingUp} title="Analytics" desc="Sales reporting built-in." />
                </div>
            </div>
        </div>
    );
}

function Feature({ icon: Icon, title, desc }: { icon: any, title: string, desc: string }) {
    return (
        <div className="text-center font-sans">
            <Icon className="w-8 h-8 mx-auto mb-4 text-stone-400" />
            <h3 className="font-bold text-stone-900 dark:text-white uppercase tracking-wider text-sm mb-2">{title}</h3>
            <p className="text-stone-500 text-sm leading-relaxed">{desc}</p>
        </div>
    );
}
