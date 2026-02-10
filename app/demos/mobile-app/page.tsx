import { ArrowRight, Apple, Play } from "lucide-react";

export default function MobileAppLanding() {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 font-sans">

            {/* Header */}
            <header className="absolute top-0 w-full z-10 py-6 px-4">
                <div className="max-w-6xl mx-auto flex items-center justify-between">
                    <div className="text-xl font-bold text-sky-600 tracking-tight">FocusUp.</div>
                    <button className="bg-sky-600 text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-sky-500 transition-colors shadow-lg hover:shadow-sky-500/30">
                        Download App
                    </button>
                </div>
            </header>

            {/* Hero */}
            <section className="relative pt-32 pb-20 px-4 flex flex-col items-center">
                <div className="max-w-2xl text-center mb-16">
                    <span className="text-sky-600 font-bold tracking-wider text-xs bg-sky-100 dark:bg-sky-900/30 px-3 py-1 rounded-full mb-6 inline-block">Productivity App of the Year</span>
                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 text-zinc-900 dark:text-white leading-tight">
                        Organize your life <br /> <span className="text-sky-600">in seconds.</span>
                    </h1>
                    <p className="text-lg text-zinc-500 max-w-lg mx-auto mb-10">
                        The minimal todo app for high achievers. Sync across all devices and never miss a deadline again.
                    </p>

                    <div className="flex justify-center gap-4">
                        <button className="bg-zinc-900 text-white px-6 py-3 rounded-xl flex items-center gap-3 hover:bg-zinc-800 transition-colors">
                            <Apple size={24} />
                            <div className="text-left leading-none">
                                <span className="text-[10px] block font-medium uppercase text-zinc-400">Download on the</span>
                                <span className="text-sm font-bold">App Store</span>
                            </div>
                        </button>
                        <button className="bg-zinc-900 text-white px-6 py-3 rounded-xl flex items-center gap-3 hover:bg-zinc-800 transition-colors">
                            <Play size={24} className="fill-current" />
                            <div className="text-left leading-none">
                                <span className="text-[10px] block font-medium uppercase text-zinc-400">Get it on</span>
                                <span className="text-sm font-bold">Google Play</span>
                            </div>
                        </button>
                    </div>
                </div>

                {/* Phone Mockups */}
                <div className="relative">
                    {/* Background blob */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-sky-500/20 rounded-full blur-3xl -z-10 animate-pulse" />

                    <div className="flex justify-center gap-8 items-end relative z-10">
                        <div className="hidden md:block w-64 h-[500px] bg-zinc-900 rounded-[3rem] border-8 border-zinc-800 shadow-2xl overflow-hidden transform translate-y-12">
                            <div className="w-full h-full bg-slate-800 relative">
                                {/* Screen Content Placeholder */}
                                <div className="p-6 text-white space-y-4">
                                    <div className="h-2 w-12 bg-zinc-700 rounded-full mx-auto mb-8" />
                                    <div className="h-8 w-3/4 bg-zinc-700 rounded-lg" />
                                    <div className="space-y-2">
                                        {[1, 2, 3].map(i => <div key={i} className="h-16 bg-zinc-700/50 rounded-xl" />)}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="w-72 h-[580px] bg-zinc-900 rounded-[3.5rem] border-8 border-zinc-800 shadow-2xl overflow-hidden relative z-20">
                            <div className="absolute top-0 w-full h-6 bg-zinc-800 z-30 flex justify-center">
                                <div className="w-20 h-4 bg-black rounded-b-xl" />
                            </div>
                            <div className="w-full h-full bg-sky-600 relative flex flex-col items-center justify-center text-white">
                                <div className="w-16 h-16 bg-white/20 rounded-2xl mb-6 backdrop-blur-lg flex items-center justify-center">
                                    <CheckIcon className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-2xl font-bold mb-2">Focus Mode</h3>
                                <p className="text-sky-100 text-center px-8 text-sm">Stay in the zone with our distraction-free interface.</p>
                            </div>
                        </div>

                        <div className="hidden md:block w-64 h-[500px] bg-zinc-900 rounded-[3rem] border-8 border-zinc-800 shadow-2xl overflow-hidden transform translate-y-12">
                            <div className="w-full h-full bg-slate-800 relative">
                                {/* Screen Content Placeholder */}
                                <div className="p-6 text-white space-y-4">
                                    <div className="h-2 w-12 bg-zinc-700 rounded-full mx-auto mb-8" />
                                    <div className="h-40 w-full bg-zinc-700 rounded-2xl" />
                                    <div className="h-4 w-1/2 bg-zinc-700 rounded" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </section>
        </div>
    );
}

function CheckIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <polyline points="20 6 9 17 4 12" />
        </svg>
    )
}
