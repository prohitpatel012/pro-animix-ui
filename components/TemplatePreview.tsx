"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Monitor, Smartphone, Tablet, Moon, Sun, ShoppingCart, Code, Eye, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";

interface TemplatePreviewProps {
    template: {
        title: string;
        slug: string;
        livePreviewUrl: string;
        price: string;
    };
}

export function TemplatePreview({ template }: TemplatePreviewProps) {
    const [device, setDevice] = useState<"desktop" | "tablet" | "mobile">("desktop");
    const [viewMode, setViewMode] = useState<"preview" | "code">("preview");

    return (
        <div className="flex flex-col h-screen bg-neutral-100 dark:bg-neutral-900 overflow-hidden">
            {/* Top Header Bar */}
            <header className="h-16 bg-white dark:bg-black border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between px-4 shrink-0 z-50">

                {/* Left: Back Button */}
                <div className="flex items-center gap-4">
                    <Link
                        href={`/templates/${template.slug}`}
                        className="flex items-center gap-2 text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Back to {template.title}</span>
                    </Link>
                </div>

                {/* Center: Controls */}
                <div className="flex items-center gap-2">


                    {/* Preview / Code Toggle */}
                    <div className="flex items-center p-1 bg-neutral-100 dark:bg-neutral-800 rounded-lg mr-6">
                        <button
                            onClick={() => setViewMode("preview")}
                            className={cn(
                                "flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-all",
                                viewMode === "preview"
                                    ? "bg-white dark:bg-zinc-700 text-black dark:text-white shadow-sm"
                                    : "text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-300"
                            )}
                        >
                            <Eye className="w-3.5 h-3.5" /> Preview
                        </button>

                        {/* 
                          Determining access:
                          Ideally 'template' should have a 'plan' property (Basic/Pro/Premium).
                          We compare user's plan vs template's required plan.
                          
                          Since 'template' prop currently only has title/slug/price/livePreviewUrl, 
                          we need to pass 'plan' to TemplatePreview or fetch it.
                          For this implementation, let's assume we pass 'plan' in 'template' prop or infer it.
                          
                          For demonstration, let's say:
                          - Basic plan users can only access Basic templates code.
                          - Pro/Premium access all.
                        */}
                        {(() => {
                            const { user } = useAuth();
                            // Mocking the check:
                            // In real app, 'template' prop should carry its required plan.
                            // Let's hardcode a check based on slug for demo as we did in sidebar.
                            const proTemplates = ["ecommerce", "saas-dashboard", "portfolio", "mobile-app", "gym-landing-page", "solo-portfolio", "landing-page"];
                            const isProTemplate = proTemplates.includes(template.slug);

                            const userPlan = user?.plan || "basic";
                            const hasAccess = !isProTemplate || (userPlan === "pro" || userPlan === "premium");

                            if (!hasAccess) {
                                return (
                                    <div className="group relative">
                                        <button
                                            disabled
                                            className={cn(
                                                "flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-all cursor-not-allowed opacity-60 text-neutral-500"
                                            )}
                                        >
                                            <Lock className="w-3.5 h-3.5" /> Code
                                        </button>
                                        <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 w-32 bg-black text-white text-[10px] p-2 rounded shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50 text-center">
                                            Upgrade to Pro to view code
                                        </div>
                                    </div>
                                );
                            }

                            return (
                                <button
                                    onClick={() => setViewMode("code")}
                                    className={cn(
                                        "flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-all",
                                        viewMode === "code"
                                            ? "bg-white dark:bg-zinc-700 text-black dark:text-white shadow-sm"
                                            : "text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-300"
                                    )}
                                >
                                    <Code className="w-3.5 h-3.5" /> Code
                                </button>
                            );
                        })()}
                    </div>


                    {/* Device Toggles */}
                    <div className="flex items-center gap-1">
                        <button
                            onClick={() => setDevice("desktop")}
                            className={cn(
                                "p-2 rounded-lg transition-colors",
                                device === "desktop"
                                    ? "bg-neutral-100 dark:bg-neutral-800 text-black dark:text-white"
                                    : "text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300"
                            )}
                            title="Desktop View"
                        >
                            <Monitor className="w-5 h-5" />
                        </button>
                        <button
                            onClick={() => setDevice("tablet")}
                            className={cn(
                                "p-2 rounded-lg transition-colors",
                                device === "tablet"
                                    ? "bg-neutral-100 dark:bg-neutral-800 text-black dark:text-white"
                                    : "text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300"
                            )}
                            title="Tablet View"
                        >
                            <Tablet className="w-5 h-5" />
                        </button>
                        <button
                            onClick={() => setDevice("mobile")}
                            className={cn(
                                "p-2 rounded-lg transition-colors",
                                device === "mobile"
                                    ? "bg-neutral-100 dark:bg-neutral-800 text-black dark:text-white"
                                    : "text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300"
                            )}
                            title="Mobile View"
                        >
                            <Smartphone className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Right: Actions */}
                <div className="flex items-center gap-3">
                    <button className="hidden sm:flex items-center gap-2 px-4 py-2 bg-neutral-900 dark:bg-white text-white dark:text-black rounded-lg text-sm font-bold shadow-sm hover:opacity-90 transition-opacity">
                        Get All-Access
                    </button>
                    <button className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors">
                        <ShoppingCart className="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
                    </button>
                </div>
            </header>

            {/* Main Preview Area */}
            <main className="flex-1 overflow-hidden relative flex flex-col items-center justify-center p-4">

                {viewMode === "preview" ? (
                    <div
                        className={cn(
                            "bg-white shadow-2xl transition-all duration-300 ease-in-out border border-neutral-200 dark:border-neutral-800 overflow-hidden",
                            device === "desktop" && "w-full h-full rounded-none border-none",
                            device === "tablet" && "w-[768px] h-[90%] rounded-xl",
                            device === "mobile" && "w-[375px] h-[90%] rounded-2xl"
                        )}
                    >
                        <iframe
                            src={template.livePreviewUrl}
                            className="w-full h-full bg-white"
                            title={`${template.title} Preview`}
                        />
                    </div>
                ) : (
                    <div className="w-full h-full bg-[#1e1e1e] flex flex-col shadow-2xl overflow-hidden border border-neutral-800">
                        {/* Editor Header / Tabs */}
                        <div className="flex items-center justify-between px-4 py-0 bg-[#252526] border-b border-neutral-800 shrink-0 h-10">
                            <div className="flex items-center gap-1 h-full pt-1">
                                {/* Active Tab */}
                                <div className="flex items-center gap-2 px-4 h-full bg-[#1e1e1e] text-neutral-200 text-xs font-medium border-t-2 border-t-blue-500 min-w-[120px]">
                                    <span className="text-blue-400 font-bold">TSX</span>
                                    <span>page.tsx</span>
                                </div>
                                {/* Inactive Tab */}
                                <div className="flex items-center gap-2 px-4 h-full text-neutral-500 text-xs font-medium hover:bg-[#2d2d2d] transition-colors cursor-pointer min-w-[120px]">
                                    <span className="text-yellow-400 font-bold">JS</span>
                                    <span>utils.ts</span>
                                </div>
                            </div>
                            {/* Window Controls (Decorative) */}
                            <div className="flex gap-1.5 opacity-50 hover:opacity-100 transition-opacity">
                                <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
                                <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                                <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
                            </div>
                        </div>

                        <div className="flex-1 flex overflow-hidden">
                            {/* Line Numbers */}
                            <div className="w-12 bg-[#1e1e1e] flex flex-col items-end py-4 px-3 text-neutral-600 text-xs font-mono select-none border-r border-[#2b2b2b]">
                                {Array.from({ length: 50 }).map((_, i) => (
                                    <div key={i} className="leading-6">{i + 1}</div>
                                ))}
                            </div>

                            {/* Code Content */}
                            <div className="flex-1 overflow-auto p-4 font-mono text-sm leading-6 text-[#d4d4d4]">
                                <pre><code className="block">{`import React from "react";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { Pricing } from "@/components/Pricing";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-indigo-500/30">
      
      <Navbar 
        logo="/logo.svg" 
        links={['Home', 'Features', 'Pricing']} 
      />

      {/* Hero Section */}
      <Hero 
        badge="New: AI Features 2.0"
        title="Deploy faster with our templates"
        subtitle="The ultimate starter kit for your next project. Built with Next.js 14, Tailwind CSS, and Framer Motion."
        ctaPrimary={{ label: "Get Started", href: "/signup" }}
        ctaSecondary={{ label: "View Demo", href: "/demo" }}
      />
      
      <main className="max-w-7xl mx-auto px-4 py-20">
        
        {/* Features Grid */}
        <Features 
            layout="grid-3"
            items={[
                { 
                  title: "Blazing Fast", 
                  description: "Optimized for speed with 99+ lighthouse score.",
                  icon: "zap" 
                },
                { 
                  title: "Secure by Default", 
                  description: "Enterprise-grade security built into every component.",
                  icon: "lock" 
                },
                { 
                  title: "Infinite Scalability", 
                  description: "Grow your user base without worrying about infrastructure.",
                  icon: "server" 
                }
            ]}
        />
        
        {/* Pricing Section */}
        <section className="mt-32 relative">
           <div className="absolute inset-0 bg-blue-500/5 blur-3xl rounded-full" />
           <h2 className="text-3xl font-bold text-center mb-12 relative z-10">
             Simple, transparent pricing
           </h2>
           <Pricing 
             plans={[
               { name: 'Starter', price: 0, features: ['1 User', 'Basic Analytics'] },
               { name: 'Pro', price: 29, features: ['5 Users', 'Advanced Analytics'], popular: true },
               { name: 'Business', price: 99, features: ['Unlimited', 'Custom Support'] }
             ]} 
           />
        </section>

        {/* Testimonials */}
        <div className="mt-20 border-t border-neutral-800 pt-20">
            <h3 className="text-center text-xl text-neutral-500 mb-8 font-medium">
                Trusted by industry leaders
            </h3>
            <div className="flex justify-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
               {/* Client Logos */}
               <img src="/logos/google.svg" className="h-8 w-auto" alt="Google" />
               <img src="/logos/microsoft.svg" className="h-8 w-auto" alt="Microsoft" />
               <img src="/logos/amazon.svg" className="h-8 w-auto" alt="Amazon" />
               <img src="/logos/netflix.svg" className="h-8 w-auto" alt="Netflix" />
            </div>
        </div>
      </main>

      <Footer copyright="© 2024 Pro Animix UI. All rights reserved." />
    </div>
  );
}`}</code></pre>
                            </div>
                        </div>
                    </div>
                )}

            </main>
        </div>
    );
}
