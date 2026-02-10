"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Pricing } from "../../components/Pricing";

export default function ProPlanPage() {
    return (
        <div className="bg-white dark:bg-black min-h-screen">
            {/* 1. Hero Section */}
            <section className="relative pt-24 pb-20 md:pt-32 md:pb-32 overflow-hidden w-full">
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                    <div className="absolute top-[-10%] left-[20%] w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[100px] opacity-50" />
                </div>

                <div className="w-full px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-900/10 text-indigo-600 dark:text-indigo-400 text-xs font-semibold mb-6 border border-indigo-100 dark:border-indigo-500/20">
                            Pro Plan
                        </div>
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-neutral-900 dark:text-white mb-6 leading-tight max-w-6xl mx-auto">
                            Unlock the power of <br />
                            <span className="bg-clip-text text-transparent bg-linear-to-r from-indigo-500 to-purple-500">
                                development
                            </span>
                        </h1>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="max-w-3xl mx-auto text-lg md:text-xl text-neutral-600 dark:text-neutral-400 mb-10 font-medium leading-relaxed"
                    >
                        Perfect for professionals who need more resources and support.
                    </motion.p>
                </div>
            </section>

            {/* Pricing with Pro Highlighted */}
            <Pricing activePlan="Pro" />

            {/* CTA Section */}
            <section className="py-32 relative overflow-hidden">
                <div className="absolute inset-0 bg-neutral-900 dark:bg-black">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px]"></div>
                    <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-indigo-500 opacity-20 blur-[100px]"></div>
                </div>
                <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
                    <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 tracking-tight">
                        Go Pro today.
                    </h2>
                    <Link href="/login">
                        <button className="px-8 py-4 bg-indigo-600 text-white rounded-full font-bold hover:bg-indigo-700 transition-colors shadow-lg">
                            Upgrade to Pro
                        </button>
                    </Link>
                </div>
            </section>
        </div>
    );
}
