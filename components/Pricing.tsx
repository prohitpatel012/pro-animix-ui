"use client";

import { CheckCircle2, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import { useRouter } from "next/navigation";

const pricingPlans = [
    {
        name: "Basic",
        price: "Free",
        description: "Essential components for personal projects",
        features: [
            "Access to basic components",
            "Community support",
            "Personal license",
            "1 Project",
        ],
        cta: "Get Started",
        popular: false,
        gradient: "from-zinc-500 to-zinc-400",
    },
    {
        name: "Pro",
        price: "₹300",
        period: "/month",
        description: "Advanced tools for professional developers",
        features: [
            "All Basic features",
            "Premium components",
            "Priority email support",
            "Commercial license",
            "Unlimited Projects",
        ],
        cta: "Upgrade to Pro",
        popular: true,
        gradient: "from-indigo-500 to-purple-500",
    },
    {
        name: "Premium",
        price: "₹1000",
        period: "/month",
        description: "Complete suite for agencies and teams",
        features: [
            "All Pro features",
            "Source code access",
            "1-on-1 Mentorship",
            "Extended license",
            "Team collaboration tools",
        ],
        cta: "Go Premium",
        popular: false,
        gradient: "from-pink-500 to-rose-500",
    },
];

export function Pricing({ activePlan }: { activePlan?: string }) {
    const { user, login } = useAuth();
    const router = useRouter();
    const [loadingPlan, setLoadingPlan] = useState<string | null>(null);

    const handleUpgrade = async (planName: string) => {
        if (!user) {
            router.push("/login");
            return;
        }

        const normalizedPlan = planName.toLowerCase();

        // Don't upgrade if already on this plan or higher (simplified logic for now)
        if (user.plan === normalizedPlan) return;

        if (confirm(`Mock Payment Gateway:\n\nProceed to pay for ${planName} Plan?`)) {
            setLoadingPlan(planName);
            try {
                const res = await fetch("/api/user/plan", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        plan: normalizedPlan,
                        paymentSuccess: true, // Mocking success
                    }),
                });

                if (res.ok) {
                    const data = await res.json();
                    // Update global auth state with new user data (including new plan)
                    login(data.user);
                    alert(`Successfully upgraded to ${planName}!`);
                } else {
                    const err = await res.json();
                    alert(`Upgrade failed: ${err.message}`);
                }
            } catch (error) {
                console.error("Upgrade error:", error);
                alert("An error occurred during upgrade.");
            } finally {
                setLoadingPlan(null);
            }
        }
    };

    return (
        <section className="py-24 bg-white dark:bg-black relative overflow-hidden" id="pricing">
            {/* Background decoration */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
                <div className="absolute top-[20%] right-[10%] w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[120px]" />
                <div className="absolute bottom-[10%] left-[10%] w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[120px]" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16 max-w-3xl mx-auto">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6 text-neutral-900 dark:text-white tracking-tight">
                        Simple, transparent pricing
                    </h2>
                    <p className="text-lg text-neutral-600 dark:text-neutral-400">
                        Choose the plan that fits your needs. No hidden fees.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {pricingPlans.map((plan, index) => {
                        // If user is logged in, use their plan for styling highlights. 
                        // Otherwise fall back to 'activePlan' prop or default 'popular' flag.
                        const userPlanName = user?.plan ? user.plan.charAt(0).toUpperCase() + user.plan.slice(1) : null;
                        const isCurrentPlan = userPlanName === plan.name;

                        // Highlight logic: 
                        // 1. If user is logged in -> Highlight their current plan
                        // 2. If 'activePlan' prop is passed -> Highlight that plan (e.g. on /pro page)
                        // 3. Default -> Highlight 'popular' plan
                        const isHighlighted = user
                            ? isCurrentPlan
                            : (activePlan ? plan.name === activePlan : plan.popular);

                        return (
                            <motion.div
                                key={plan.name}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                                viewport={{ once: true }}
                                className={`relative flex flex-col p-8 rounded-3xl border ${isHighlighted
                                    ? "border-indigo-500/50 bg-neutral-50 dark:bg-neutral-900/60 shadow-xl shadow-indigo-500/10"
                                    : "border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950/50"
                                    } backdrop-blur-sm`}
                            >
                                {isHighlighted && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-linear-to-r from-indigo-500 to-purple-500 text-white text-xs font-bold uppercase tracking-widest rounded-full shadow-lg">
                                        {user && isCurrentPlan ? 'Current Plan' : 'Most Popular'}
                                    </div>
                                )}

                                {/* Tag for Basic/Pro/Premium */}
                                <div className={`inline-flex self-start px-3 py-1 rounded-full text-xs font-semibold mb-6 bg-linear-to-r ${plan.gradient} bg-opacity-10 text-white`}>
                                    {plan.name}
                                </div>

                                <div className="mb-8">
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-4xl font-bold text-neutral-900 dark:text-white">
                                            {plan.price}
                                        </span>
                                        {plan.period && (
                                            <span className="text-neutral-500 dark:text-neutral-400">
                                                {plan.period}
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-neutral-500 dark:text-neutral-400 mt-2 text-sm">
                                        {plan.description}
                                    </p>
                                </div>

                                <div className="grow space-y-4 mb-8">
                                    {plan.features.map((feature) => (
                                        <div key={feature} className="flex items-start gap-3">
                                            <CheckCircle2 className={`w-5 h-5 shrink-0 ${isHighlighted ? 'text-indigo-500' : 'text-neutral-400'}`} />
                                            <span className="text-sm text-neutral-600 dark:text-neutral-300">
                                                {feature}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                <button
                                    onClick={() => handleUpgrade(plan.name)}
                                    disabled={isCurrentPlan || loadingPlan === plan.name}
                                    className={`w-full py-4 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2 ${isCurrentPlan
                                            ? "bg-green-500/10 text-green-600 dark:text-green-400 cursor-default border border-green-500/20"
                                            : isHighlighted
                                                ? "bg-zinc-900 dark:bg-white text-white dark:text-black hover:bg-zinc-800 dark:hover:bg-zinc-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                                                : "bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white hover:bg-neutral-200 dark:hover:bg-neutral-700"
                                        }`}
                                >
                                    {loadingPlan === plan.name ? (
                                        <>
                                            <Loader2 size={18} className="animate-spin" /> Processing...
                                        </>
                                    ) : (
                                        isCurrentPlan ? "Active Plan" :
                                            (user ? `Switch to ${plan.name}` : plan.cta)
                                    )}
                                </button>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
