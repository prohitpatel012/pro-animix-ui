import { ArrowRight, CheckCircle2, Globe, Rocket, Shield } from "lucide-react";

export default function SaasLandingPage() {
    return (
        <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 font-sans">
            {/* Navbar */}
            <nav className="fixed top-0 w-full z-50 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="font-bold text-xl tracking-tight">SaaSify.</div>
                    <div className="hidden md:flex gap-8 text-sm font-medium text-zinc-600 dark:text-zinc-400">
                        <a href="#" className="hover:text-zinc-900 dark:hover:text-white transition-colors">Product</a>
                        <a href="#" className="hover:text-zinc-900 dark:hover:text-white transition-colors">Solutions</a>
                        <a href="#" className="hover:text-zinc-900 dark:hover:text-white transition-colors">Pricing</a>
                    </div>
                    <div className="flex gap-4">
                        <button className="text-sm font-medium hover:text-indigo-600">Sign In</button>
                        <button className="bg-zinc-900 dark:bg-white text-white dark:text-black px-4 py-2 rounded-full text-sm font-bold hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors">
                            Get Started
                        </button>
                    </div>
                </div>
            </nav>

            {/* Hero */}
            <header className="pt-32 pb-20 px-6 text-center max-w-5xl mx-auto">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 text-xs font-semibold mb-6 border border-indigo-100 dark:border-indigo-500/20">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                    </span>
                    v2.0 is now live
                </div>
                <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 bg-clip-text text-transparent bg-linear-to-b from-zinc-900 via-zinc-800 to-zinc-500 dark:from-white dark:via-zinc-200 dark:to-zinc-500">
                    Ship your startup <br /> in days, not weeks.
                </h1>
                <p className="text-xl text-zinc-500 mb-12 max-w-2xl mx-auto">
                    The ultimate boilerplate for SaaS founders. Includes authentication, payments, database, and email. Focus on your product.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button className="bg-indigo-600 text-white px-8 py-4 rounded-full font-bold hover:bg-indigo-500 transition-all shadow-lg hover:shadow-indigo-500/25 flex items-center justify-center gap-2">
                        Start Building <ArrowRight size={18} />
                    </button>
                    <button className="px-8 py-4 rounded-full border border-zinc-200 dark:border-zinc-800 font-bold hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors">
                        View Documentation
                    </button>
                </div>
            </header>

            {/* Feature Grid */}
            <section className="py-24 bg-zinc-50 dark:bg-zinc-900/50">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { title: 'Global Edge', desc: 'Deploy instantly to 35+ regions worldwide.', icon: Globe },
                            { title: 'Enterprise Security', desc: 'SOC2 compliant infrastructure out of the box.', icon: Shield },
                            { title: 'Instant Scale', desc: 'Handle millions of requests without config.', icon: Rocket },
                        ].map((feature, i) => (
                            <div key={i} className="bg-white dark:bg-zinc-900 p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-md transition-shadow">
                                <div className="w-12 h-12 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl flex items-center justify-center text-indigo-600 mb-6">
                                    <feature.icon size={24} />
                                </div>
                                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                                <p className="text-zinc-500">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
