"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
    ArrowRight, Layout, Zap, Smartphone, Code2, Layers, Cpu,
    Palette
} from "lucide-react";
import { Pricing } from "../../components/Pricing";

export default function BasicPlanPage() {
    return (
        <div className="bg-white dark:bg-black min-h-screen">
            {/* 1. Hero Section */}
            <section className="relative pt-24 pb-20 md:pt-32 md:pb-32 overflow-hidden w-full">
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                    <div className="absolute top-[-10%] left-[20%] w-[500px] h-[500px] bg-zinc-500/10 rounded-full blur-[100px] opacity-50" />
                </div>

                <div className="w-full px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-50 dark:bg-zinc-900/10 text-zinc-600 dark:text-zinc-400 text-xs font-semibold mb-6 border border-zinc-100 dark:border-zinc-500/20">
                            Basic Plan
                        </div>
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-neutral-900 dark:text-white mb-6 leading-tight max-w-6xl mx-auto">
                            Start building <br />
                            <span className="bg-clip-text text-transparent bg-linear-to-r from-zinc-500 to-zinc-700">
                                for free
                            </span>
                        </h1>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="max-w-3xl mx-auto text-lg md:text-xl text-neutral-600 dark:text-neutral-400 mb-10 font-medium leading-relaxed"
                    >
                        Everything you need to get your personal project off the ground.
                    </motion.p>
                </div>
            </section>

            {/* Pricing with Basic Highlighted */}
            <Pricing activePlan="Basic" />

            {/* CTA Section */}
            <section className="py-32 relative overflow-hidden">
                <div className="absolute inset-0 bg-neutral-900 dark:bg-black">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px]"></div>
                </div>
                <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
                    <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 tracking-tight">
                        Start your journey today.
                    </h2>
                    <Link href="/login">
                        <button className="px-8 py-4 bg-white text-black rounded-full font-bold hover:bg-neutral-200 transition-colors shadow-lg">
                            Get Started for Free
                        </button>
                    </Link>
                </div>
            </section>
        </div>
    );
}
