"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, Eye, EyeOff, AlertCircle, CheckCircle } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { z } from "zod";

// --- Validation Schema ---
const loginSchema = z.object({
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(1, "Password is required"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
    const router = useRouter();
    const { login } = useAuth();

    // Form State
    const [formData, setFormData] = useState<LoginFormData>({
        email: "",
        password: "",
    });
    const [errors, setErrors] = useState<Partial<LoginFormData>>({});
    const [globalError, setGlobalError] = useState("");

    // UI State
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [touched, setTouched] = useState<Record<string, boolean>>({});

    const validateField = (name: keyof LoginFormData, value: string) => {
        const result = loginSchema.shape[name].safeParse(value);
        if (result.success) {
            setErrors(prev => ({ ...prev, [name]: undefined }));
        } else {
            setErrors(prev => ({
                ...prev,
                [name]: result.error.issues[0]?.message
            }));
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        // Validate immediately if already touched
        if (touched[name]) {
            validateField(name as keyof LoginFormData, value);
        }
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setTouched(prev => ({ ...prev, [name]: true }));
        validateField(name as keyof LoginFormData, value);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setGlobalError("");

        // Validate all
        const result = loginSchema.safeParse(formData);
        if (!result.success) {
            const fieldErrors: Partial<LoginFormData> = {};
            result.error.issues.forEach(err => {
                if (err.path[0]) {
                    fieldErrors[err.path[0] as keyof LoginFormData] = err.message;
                }
            });
            setErrors(fieldErrors);
            setTouched({ email: true, password: true });
            return;
        }

        setLoading(true);

        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (!res.ok) {
                // If the error message is generic, we can try to guess or use it
                // Often better to say "Invalid email or password" for security,
                // but user asked for "proper message if something failed"
                if (res.status === 401 || res.status === 404) {
                    setGlobalError("Invalid email or password. Please try again.");
                } else {
                    setGlobalError(data.message || "Login failed due to a server error.");
                }
                return; // Stop here
            }

            login(data.user);
            router.push("/dashboard");

        } catch (err: any) {
            console.error(err);
            setGlobalError(err.message || "Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full flex bg-white dark:bg-black overflow-hidden">
            {/* Left Side - Visuals (same as register for consistency) */}
            <div className="hidden lg:flex w-1/2 relative bg-zinc-900 text-white overflow-hidden p-12 flex-col justify-between">
                {/* Abstract Background - slightly different hue for login */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-blue-600/20 via-zinc-900 to-zinc-950" />
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/20 blur-[120px] rounded-full mix-blend-screen" />
                    <div className="absolute bottom-1/2 left-1/2 -translate-x-1/2 translate-y-1/2 w-[800px] h-[800px] bg-blue-500/10 blur-[100px] rounded-full animate-pulse opacity-50" />

                    {/* Grid Pattern Overlay */}
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150" />
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px]" />
                </div>

                {/* Content */}
                <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-8">
                        <div className="w-8 h-8 rounded-lg bg-white text-black flex items-center justify-center font-bold">
                            P
                        </div>
                        <span className="font-bold text-xl tracking-tight">ProAnimix</span>
                    </div>
                </div>

                <div className="relative z-10 max-w-lg">
                    <h2 className="text-4xl font-bold leading-tight mb-6 text-transparent bg-clip-text bg-linear-to-b from-white to-white/60">
                        Welcome back to the future of development.
                    </h2>
                    <p className="text-zinc-400 text-lg leading-relaxed mb-8">
                        Access your dashboard, manage your projects, and continue building world-class interfaces.
                    </p>

                    {/* Testimonial or feature highlight */}
                    <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                        <p className="text-zinc-300 italic mb-4">"The components are simply beautiful. It saved us weeks of dev time."</p>
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-linear-to-tr from-blue-500 to-purple-500" />
                            <div>
                                <p className="text-sm font-bold text-white">Alex Chen</p>
                                <p className="text-xs text-zinc-500">CTO at TechFlow</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="relative z-10 flex justify-between items-end text-xs text-zinc-600 font-mono">
                    <p>© 2026 ProAnimix UI</p>
                    <p>Secure Login</p>
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-8 lg:p-12 relative">
                <Link href="/" className="absolute top-8 right-8 text-sm font-medium text-neutral-500 hover:text-black dark:hover:text-white transition-colors">
                    Back to website
                </Link>

                <div className="w-full max-w-md space-y-8">
                    <div className="text-center lg:text-left">
                        <h1 className="text-3xl font-bold text-neutral-900 dark:text-white mb-2">Welcome back</h1>
                        <p className="text-neutral-500 dark:text-neutral-400">
                            Please enter your details to sign in
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">

                        {/* Email */}
                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder="m@example.com"
                                disabled={loading}
                                className={`w-full px-4 py-3 rounded-lg bg-neutral-50 dark:bg-neutral-900 border ${errors.email ? "border-red-500 focus:ring-red-500" : "border-neutral-200 dark:border-neutral-800 focus:ring-black dark:focus:ring-white"
                                    } focus:outline-none focus:ring-2 transition-all outline-none disabled:opacity-50 disabled:cursor-not-allowed`}
                            />
                            {errors.email && (
                                <p className="text-xs text-red-500 font-medium flex items-center gap-1">
                                    <AlertCircle size={12} /> {errors.email}
                                </p>
                            )}
                        </div>

                        {/* Password */}
                        <div className="space-y-1.5">
                            <div className="flex justify-between items-center">
                                <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                                    Password
                                </label>
                                <Link href="#" className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline">
                                    Forgot password?
                                </Link>
                            </div>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder="••••••••"
                                    disabled={loading}
                                    className={`w-full px-4 py-3 rounded-lg bg-neutral-50 dark:bg-neutral-900 border ${errors.password ? "border-red-500 focus:ring-red-500" : "border-neutral-200 dark:border-neutral-800 focus:ring-black dark:focus:ring-white"
                                        } focus:outline-none focus:ring-2 transition-all outline-none pr-10 disabled:opacity-50 disabled:cursor-not-allowed`}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    disabled={loading}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 disabled:opacity-50"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                            {errors.password && (
                                <p className="text-xs text-red-500 font-medium flex items-center gap-1">
                                    <AlertCircle size={12} /> {errors.password}
                                </p>
                            )}
                        </div>

                        {/* Global Error */}
                        <AnimatePresence>
                            {globalError && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 text-red-600 dark:text-red-400 text-sm font-medium"
                                >
                                    <AlertCircle size={16} />
                                    {globalError}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 px-4 rounded-lg bg-black dark:bg-white text-white dark:text-black font-bold text-sm hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-all shadow-sm hover:shadow-md disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <Loader2 size={16} className="animate-spin" /> Signing in...
                                </>
                            ) : (
                                "Sign In"
                            )}
                        </button>

                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t border-neutral-200 dark:border-neutral-800" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-white dark:bg-black px-2 text-neutral-500">
                                    Or continue with
                                </span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <button type="button" className="flex items-center justify-center gap-2 px-4 py-2 border border-neutral-200 dark:border-neutral-800 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors text-sm font-medium">
                                <svg className="w-4 h-4" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" /></svg>
                                Google
                            </button>
                            <button type="button" className="flex items-center justify-center gap-2 px-4 py-2 border border-neutral-200 dark:border-neutral-800 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors text-sm font-medium">
                                <svg className="w-4 h-4 text-neutral-900 dark:text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                                GitHub
                            </button>
                        </div>

                        <p className="text-center text-sm text-neutral-500 dark:text-neutral-400 mt-6">
                            Don't have an account?{" "}
                            <Link href="/register" className="text-black dark:text-white font-semibold hover:underline">
                                Create an account
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}
