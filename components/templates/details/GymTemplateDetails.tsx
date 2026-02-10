"use client";

import React from "react";
import Link from "next/link";
import { Dumbbell, Clock, Users, Trophy, Play, CheckCircle } from "lucide-react";

export function GymTemplateDetails({ template }: { template: any }) {
    return (
        <div className="min-h-screen bg-neutral-900 text-white font-sans">

            {/* Hero Header */}
            <div className="relative h-[60vh] flex items-end pb-20 px-6 md:px-20 overflow-hidden">
                <div className="absolute inset-0 bg-linear-to-t from-neutral-900 via-neutral-900/40 to-transparent z-10" />
                <img
                    src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop"
                    alt="Gym Background"
                    className="absolute inset-0 w-full h-full object-cover grayscale opacity-60"
                />
                <div className="absolute top-10 right-10 z-30 hidden md:flex flex-col gap-4 items-end">
                    <Link href={`/templates/${template.slug}/preview`}>
                        <button className="bg-yellow-500 text-black px-6 py-3 font-bold uppercase tracking-wide hover:bg-yellow-400 transition-transform hover:scale-105 skew-x-[-10deg] shadow-lg shadow-yellow-500/20">
                            <span className="skew-x-10 block text-sm">Live Preview</span>
                        </button>
                    </Link>
                    <button className="bg-neutral-900 border border-neutral-700 text-white px-6 py-3 font-bold uppercase tracking-wide hover:bg-neutral-800 transition-colors skew-x-[-10deg]">
                        <span className="skew-x-10 block text-sm">Buy for {template.price}</span>
                    </button>
                </div>

                <div className="relative z-20 max-w-4xl">
                    <div className="text-yellow-500 font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
                        <Dumbbell className="w-5 h-5" /> Gym Template v1.0
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter mb-8 leading-none">
                        Build Your <br /><span className="text-transparent bg-clip-text bg-linear-to-r from-yellow-400 to-yellow-600">Fitness Empire</span>
                    </h1>
                </div>
            </div>

            {/* Content Stats Strip */}
            <div className="bg-neutral-800 py-12 border-y border-neutral-700">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
                    <Stat icon={Users} val="Member Area" label="Login / Signup" />
                    <Stat icon={Clock} val="Schedule" label="Class Calendar" />
                    <Stat icon={Trophy} val="Trainers" label="Profile Pages" />
                    <Stat icon={Play} val="Video" label="Hero Component" />
                </div>
            </div>

            {/* Features Description */}
            <div className="max-w-5xl mx-auto py-24 px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                <div className="space-y-6">
                    <h2 className="text-3xl font-bold uppercase tracking-tight">Why Choose This Template?</h2>
                    <p className="text-neutral-400 text-lg leading-relaxed">
                        Designed for high-impact visual storytelling. Perfect for gyms, personal trainers, crossfit boxes, and sports clubs.
                        Includes all necessary sections to convert visitors into members.
                    </p>
                    <ul className="space-y-4 pt-4">
                        <li className="flex items-center gap-3 text-lg font-medium">
                            <CheckCircle className="text-yellow-500 w-6 h-6" /> Mobile Optimized
                        </li>
                        <li className="flex items-center gap-3 text-lg font-medium">
                            <CheckCircle className="text-yellow-500 w-6 h-6" /> Booking System Ready
                        </li>
                        <li className="flex items-center gap-3 text-lg font-medium">
                            <CheckCircle className="text-yellow-500 w-6 h-6" /> SEO Best Practices
                        </li>
                    </ul>
                </div>
                <div className="grid grid-cols-2 gap-4 skew-y-3">
                    <div className="bg-neutral-800 h-64 rounded-xl border border-neutral-700" />
                    <div className="bg-yellow-600 h-64 rounded-xl border border-yellow-500 mt-12" />
                </div>
            </div>

        </div>
    );
}

function Stat({ icon: Icon, val, label }: { icon: any, val: string, label: string }) {
    return (
        <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-neutral-900 rounded-lg flex items-center justify-center text-yellow-500 border border-neutral-700">
                <Icon className="w-6 h-6" />
            </div>
            <div>
                <div className="font-bold text-xl uppercase italic">{val}</div>
                <div className="text-sm text-neutral-500 uppercase tracking-widest">{label}</div>
            </div>
        </div>
    );
}
