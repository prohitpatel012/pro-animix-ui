"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { DashboardMockup } from "../components/DashboardMockup";
import {
  ArrowRight, Layout, Zap, Smartphone, Code2, Layers, Cpu,
  CheckCircle2, Star, Globe, ShieldCheck, Palette, MousePointer2
} from "lucide-react";
import Image from "next/image";
import { Pricing } from "../components/Pricing";

export default function Home() {
  return (
    <div className="bg-white dark:bg-black min-h-screen">

      {/* 1. Hero Section */}
      <section className="relative pt-24 pb-20 md:pt-32 md:pb-32 overflow-hidden w-full">
        {/* Background Gradients */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
          <div className="absolute top-[-10%] left-[20%] w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[100px] opacity-50" />
          <div className="absolute top-[10%] right-[10%] w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[100px] opacity-50" />
        </div>

        <div className="w-full px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-900/10 text-indigo-600 dark:text-indigo-400 text-xs font-semibold mb-6 border border-indigo-100 dark:border-indigo-500/20">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
              </span>
              New: Dashboard Templates v2.0
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-neutral-900 dark:text-white mb-6 leading-tight max-w-6xl mx-auto">
              Build modern websites <br />
              <span className="bg-clip-text text-transparent bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500">
                at lightspeed
              </span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="max-w-3xl mx-auto text-lg md:text-xl text-neutral-600 dark:text-neutral-400 mb-10 font-medium leading-relaxed"
          >
            ProAnimix provides a comprehensive suite of copy-paste UI components,
            landing page templates, and dashboard kits. Built with Tailwind CSS & Framer Motion.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-20"
          >
            <Link href="/templates">
              <button className="px-8 py-4 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-black font-semibold hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:-translate-y-0.5 min-w-[180px]">
                Browse Templates <ArrowRight size={18} />
              </button>
            </Link>
            <Link href="/ui-design">
              <button className="px-8 py-4 rounded-full border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-all duration-200 font-semibold min-w-[180px]">
                View Components
              </button>
            </Link>
          </motion.div>

          {/* Full Width Hero Image */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="relative w-full max-w-[1400px] mx-auto"
          >
            {/* Glow Effect behind image - Wider and stronger */}
            <div className="absolute inset-0 -top-20 bg-linear-to-t from-indigo-500/30 via-purple-500/10 to-transparent blur-3xl -z-10 rounded-full" />

            <div className="relative rounded-xl md:rounded-3xl overflow-hidden border border-neutral-200 dark:border-neutral-800 shadow-2xl bg-neutral-100 dark:bg-neutral-900 group">
              <div className="absolute inset-0 bg-black/5 dark:bg-black/20 z-10 pointer-events-none group-hover:bg-transparent transition-colors duration-500" />
              <img
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop"
                alt="Dashboard Preview"
                className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
              />

              {/* Overlay Badge */}
              <div className="absolute bottom-4 left-4 md:bottom-8 md:left-8 z-20 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-lg text-white text-sm font-medium">
                Captured on iPhone 16 Pro Max
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. Trusted By Section */}
      <section className="py-10 border-y border-neutral-100 dark:border-neutral-900 bg-neutral-50/50 dark:bg-black">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm font-semibold text-neutral-500 mb-6 uppercase tracking-wider">Trusted by innovative teams worldwide</p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
            {['Acme Corp', 'GlobalTech', 'Nebula', 'Circle', 'FoxRun'].map((brand) => (
              <div key={brand} className="text-xl font-bold text-neutral-400 dark:text-neutral-600 flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-neutral-300 dark:bg-neutral-700" /> {brand}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Bento Grid Section */}
      <section className="py-32 px-4 bg-white dark:bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-neutral-900 dark:text-white">
              Crafted for perfection. <br />
              <span className="text-neutral-400 dark:text-neutral-600">Designed for speed.</span>
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-400">
              Our bento grid layout system allows you to showcase features in a modern, digestible way.
              Every pixel is obsessed over.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">

            {/* Large Item: Main Feature */}
            <div className="md:col-span-2 row-span-1 md:row-span-2 rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50 p-8 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 z-10 text-right">
                <Palette className="w-10 h-10 text-indigo-500 mb-4 ml-auto" />
                <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-2">Theming Engine</h3>
                <p className="text-neutral-500 dark:text-neutral-400 max-w-xs ml-auto">
                  Switch between dark and light modes seamlessly. Customize primary colors variables.
                </p>
              </div>
              {/* Visual representation */}
              <div className="absolute -bottom-10 -left-10 w-[80%] h-[80%] rounded-tr-3xl bg-white dark:bg-black border border-neutral-200 dark:border-neutral-800 shadow-2xl p-6 transition-transform duration-500 group-hover:scale-105 group-hover:-translate-y-2">
                <div className="flex gap-4 mb-6">
                  <div className="w-10 h-10 rounded-full bg-indigo-500" />
                  <div className="w-10 h-10 rounded-full bg-purple-500" />
                  <div className="w-10 h-10 rounded-full bg-pink-500" />
                </div>
                <div className="space-y-3">
                  <div className="h-4 w-3/4 bg-neutral-100 dark:bg-neutral-800 rounded" />
                  <div className="h-4 w-1/2 bg-neutral-100 dark:bg-neutral-800 rounded" />
                </div>
              </div>
            </div>

            {/* Medium Item: Responsive */}
            <div className="md:col-span-1 rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50 p-8 flex flex-col justify-between group overflow-hidden relative">
              <div>
                <Smartphone className="w-8 h-8 text-pink-500 mb-4" />
                <h3 className="text-xl font-bold text-neutral-900 dark:text-white">Mobile First</h3>
                <p className="text-neutral-500 text-sm mt-2">Responsive capability built-in.</p>
              </div>
              <div className="absolute -right-4 -bottom-4 w-32 h-48 bg-white dark:bg-black border border-neutral-200 dark:border-neutral-800 rounded-xl shadow-lg transform rotate-12 transition-transform group-hover:rotate-6" />
            </div>

            {/* Medium Item: Code */}
            <div className="md:col-span-1 rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50 p-8 flex flex-col justify-between group overflow-hidden relative">
              <div>
                <Code2 className="w-8 h-8 text-blue-500 mb-4" />
                <h3 className="text-xl font-bold text-neutral-900 dark:text-white">Clean Code</h3>
                <p className="text-neutral-500 text-sm mt-2">Typescript & Tailwind ready.</p>
              </div>
              <div className="absolute -right-4 top-1/2 w-40 h-32 bg-[#1e1e1e] rounded-l-xl shadow-lg transform translate-y-12 transition-transform group-hover:translate-x-2 p-3">
                <div className="space-y-2">
                  <div className="h-2 w-full bg-neutral-700 rounded" />
                  <div className="h-2 w-2/3 bg-blue-500/50 rounded" />
                  <div className="h-2 w-3/4 bg-neutral-700 rounded" />
                </div>
              </div>
            </div>

            {/* Large Wide Item: Animation */}
            <div className="md:col-span-3 rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50 p-8 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
              <div className="flex-1 z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 dark:bg-orange-900/10 text-orange-600 dark:text-orange-400 text-xs font-semibold mb-4">
                  <Zap className="w-3 h-3" /> Framer Motion
                </div>
                <h3 className="text-3xl font-bold text-neutral-900 dark:text-white mb-4">Animations that feel natural</h3>
                <p className="text-neutral-600 dark:text-neutral-400 max-w-md">Add life to your application with our pre-configured animation variants. Slide, fade, scale, and spring animations ready to drop in.</p>
              </div>
              <div className="flex-1 w-full max-w-md">
                <div className="grid grid-cols-2 gap-4">
                  {[1, 2, 3, 4].map((i) => (
                    <motion.div
                      key={i}
                      whileHover={{ scale: 1.05 }}
                      className="aspect-square rounded-2xl bg-white dark:bg-black border border-neutral-200 dark:border-neutral-800 shadow-sm flex items-center justify-center"
                    >
                      <div className={`w-12 h-12 rounded-full bg-linear-to-tr from-neutral-200 to-neutral-100 dark:from-neutral-800 dark:to-neutral-900`} />
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. Features List (Grid) */}
      <section className="py-24 bg-neutral-50 dark:bg-zinc-900/20 border-t border-neutral-200 dark:border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-zinc-900 dark:text-white sm:text-4xl">
              Everything needed to ship faster
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="group p-6 bg-white dark:bg-black border border-neutral-200 dark:border-neutral-800 rounded-2xl hover:border-indigo-500/30 transition-all"
              >
                <div className="w-12 h-12 rounded-lg bg-indigo-50 dark:bg-indigo-900/10 flex items-center justify-center mb-6 text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed text-sm">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Pricing />

      {/* 5. CTA Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-neutral-900 dark:bg-black">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px]"></div>
          <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-indigo-500 opacity-20 blur-[100px]"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 tracking-tight">
            Ready to build your masterpiece?
          </h2>
          <p className="text-xl text-neutral-400 mb-12 max-w-2xl mx-auto">
            Join thousands of developers building faster, better, and more beautiful interfaces with ProAnimix.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-white text-black rounded-full font-bold hover:bg-neutral-200 transition-colors shadow-lg hover:shadow-white/20">
              Get Started Now
            </button>
            <button className="px-8 py-4 bg-transparent border border-neutral-700 text-white rounded-full font-bold hover:bg-neutral-800 transition-colors">
              View Documentation
            </button>
          </div>
        </div>
      </section>

    </div >
  );
}

const features = [
  {
    title: "Beautiful Animations",
    description: "Built with Framer Motion for buttery smooth interactions.",
    icon: Zap,
  },
  {
    title: "Modern Design",
    description: "Clean, minimal, and responsive designs following latest trends.",
    icon: Layout,
  },
  {
    title: "Responsive Ready",
    description: "Every component is fully responsive for all devices.",
    icon: Smartphone,
  },
  {
    title: "TypeScript Support",
    description: "Fully typed components for better developer experience.",
    icon: Code2,
  },
  {
    title: "Easy Integration",
    description: "Copy and paste implementation. No configuration needed.",
    icon: Cpu,
  },
  {
    title: "Themeable",
    description: "Supports dark mode out of the box and customizable colors.",
    icon: Layers,
  },
];
