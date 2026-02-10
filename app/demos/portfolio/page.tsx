import { ArrowUpRight, Github, Instagram, Link, Linkedin, Twitter } from "lucide-react";

export default function PortfolioPage() {
    return (
        <div className="min-h-screen bg-black text-white font-sans selection:bg-rose-500 selection:text-white">

            {/* Header */}
            <header className="fixed top-0 w-full z-50 mix-blend-difference px-8 py-6 flex justify-between items-center">
                <div className="font-bold text-2xl tracking-tighter">ALEX.</div>
                <nav className="hidden md:flex gap-8 text-sm uppercase tracking-widest font-light">
                    <a href="#" className="hover:text-rose-500 transition-colors">Work</a>
                    <a href="#" className="hover:text-rose-500 transition-colors">About</a>
                    <a href="#" className="hover:text-rose-500 transition-colors">Contact</a>
                </nav>
            </header>

            {/* Hero */}
            <section className="h-screen flex flex-col justify-center px-8 md:px-20 max-w-6xl mx-auto">
                <p className="text-xl md:text-2xl font-light text-gray-400 mb-4 animate-fade-in-up">Hello, I'm Alex.</p>
                <h1 className="text-6xl md:text-9xl font-black uppercase leading-none mb-8 tracking-tighter">
                    Creative <br />
                    <span className="text-rose-500">Developer</span>
                </h1>
                <p className="max-w-xl text-lg md:text-xl text-gray-400 font-light leading-relaxed">
                    I craft digital experiences with a focus on motion, typography, and clean code. Based in San Francisco.
                </p>

                <div className="mt-12 flex gap-6">
                    <SocialLink icon={Github} />
                    <SocialLink icon={Twitter} />
                    <SocialLink icon={Linkedin} />
                    <SocialLink icon={Instagram} />
                </div>
            </section>

            {/* Selected Work */}
            <section className="py-32 px-8 md:px-20 bg-zinc-900">
                <h2 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-16">Selected Works (2023-2024)</h2>

                <div className="space-y-32">
                    {[
                        { title: 'Neon Bank', cat: 'Fintech App', color: 'bg-emerald-500' },
                        { title: 'Amnesia', cat: 'Music Festival', color: 'bg-purple-600' },
                        { title: 'Flux Arch', cat: 'Architecture Firm', color: 'bg-orange-500' },
                    ].map((project, i) => (
                        <div key={i} className="group relative cursor-pointer">
                            <div className={`aspect-video w-full ${project.color} rounded-sm overflow-hidden mb-6 opacity-80 group-hover:opacity-100 transition-all transform group-hover:scale-[1.01] duration-500`}>
                                {/* Placeholder for Project Image */}
                                <div className="w-full h-full bg-linear-to-br from-black/20 to-transparent" />
                            </div>
                            <div className="flex justify-between items-baseline border-b border-gray-800 pb-4 group-hover:border-white transition-colors">
                                <h3 className="text-4xl md:text-6xl font-black uppercase">{project.title}</h3>
                                <span className="text-sm md:text-lg text-gray-400 font-mono hidden md:block">{project.cat}</span>
                                <ArrowUpRight className="w-8 h-8 md:w-12 md:h-12 transform group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform duration-300" />
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}

function SocialLink({ icon: Icon }: { icon: any }) {
    return (
        <a href="#" className="w-12 h-12 border border-gray-800 rounded-full flex items-center justify-center hover:bg-white hover:text-black hover:border-white transition-all duration-300 group">
            <Icon size={20} />
        </a>
    )
}
