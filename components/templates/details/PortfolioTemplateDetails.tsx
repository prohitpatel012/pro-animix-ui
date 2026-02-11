"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, Github, Instagram, Linkedin, Twitter, Download, Share2 } from "lucide-react";

export function PortfolioTemplateDetails({ template }: { template: any }) {
    return (
        <div className="min-h-screen bg-black text-white font-mono p-6 md:p-12 relative">
            {/* Top Right Actions - FIXED & CONSISTENT */}
            <div className="fixed top-24 right-6 z-50">
                <Link href={`/templates/${template.slug}/preview`}>
                    <button className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full font-bold text-sm flex items-center gap-2 shadow-lg shadow-indigo-500/30 transition-all font-sans">
                        <ArrowUpRight className="w-4 h-4" /> Live Preview
                    </button>
                </Link>
            </div>

            <div className="max-w-5xl mx-auto space-y-24">

                {/* Header */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-end border-b border-neutral-800 pb-12">
                    <div>
                        <div className="text-xs font-bold uppercase tracking-widest text-neutral-500 mb-8">Role: Creative Developer</div>
                        <h1 className="text-5xl md:text-7xl font-bold uppercase leading-none tracking-tighter mb-6">{template.title}</h1>
                        <p className="text-neutral-400 max-w-sm text-sm leading-relaxed">{template.description}</p>
                    </div>
                    <div className="flex flex-col gap-4">
                        <Link href={`/templates/${template.slug}/preview`}>
                            <button className="w-full py-4 bg-white text-black font-bold uppercase tracking-widest hover:bg-neutral-200 transition-colors flex justify-between px-6 group">
                                <span>Live Site</span>
                                <ArrowUpRight className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </Link>
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8">

                    {/* Left: Project List */}
                    <div className="md:col-span-8 space-y-2">
                        <div className="text-xs font-bold uppercase tracking-widest text-neutral-500 mb-8">Included Pages</div>
                        {['Home', 'About', 'Projects', 'Single Project', 'Contact', 'Blog'].map((page, i) => (
                            <div key={i} className="flex justify-between items-center py-6 border-b border-neutral-900 group hover:bg-neutral-900/50 px-4 transition-colors cursor-default">
                                <span className="text-2xl font-light uppercase">{page}</span>
                                <span className="text-neutral-600 group-hover:text-white font-mono text-sm">0{i + 1}</span>
                            </div>
                        ))}
                    </div>

                    {/* Right: Technical Details */}
                    <div className="md:col-span-4 space-y-12">
                        <div>
                            <div className="text-xs font-bold uppercase tracking-widest text-neutral-500 mb-4">Tech Stack</div>
                            <div className="flex flex-wrap gap-2">
                                {['Next.js', 'React', 'Tailwind', 'Framer Motion', 'WebGL'].map(tech => (
                                    <span key={tech} className="px-3 py-1 border border-neutral-800 rounded-full text-xs hover:bg-white hover:text-black cursor-default transition-colors">{tech}</span>
                                ))}
                            </div>
                        </div>
                        <div>
                            <div className="text-xs font-bold uppercase tracking-widest text-neutral-500 mb-4">Features</div>
                            <ul className="space-y-2 text-sm text-neutral-400">
                                <li>• Smooth Scroll (Lenis)</li>
                                <li>• Page Transitions</li>
                                <li>• Custom Cursor</li>
                                <li>• Magnetic Buttons</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex justify-between items-center pt-12 border-t border-neutral-900">
                    <div className="flex gap-4">
                        <SocialIcon icon={Github} />
                        <SocialIcon icon={Twitter} />
                        <SocialIcon icon={Instagram} />
                    </div>
                    <div className="text-xs text-neutral-600 uppercase tracking-widest">
                        Designed by ProAnimix
                    </div>
                </div>

            </div>
        </div>
    );
}

function SocialIcon({ icon: Icon }: { icon: any }) {
    return (
        <a href="#" className="text-neutral-500 hover:text-white transition-colors">
            <Icon size={20} />
        </a>
    )
}
