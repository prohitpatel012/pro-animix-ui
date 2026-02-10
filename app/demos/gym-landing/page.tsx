export default function GymLandingPage() {
    return (
        <div className="min-h-screen bg-black text-white font-sans">
            {/* Navigation */}
            <nav className="flex justify-between items-center p-6 max-w-7xl mx-auto">
                <div className="text-2xl font-bold uppercase tracking-tighter text-yellow-500">
                    IRON GYM
                </div>
                <div className="hidden md:flex gap-8 font-medium text-gray-300">
                    <a href="#" className="hover:text-white transition-colors">Classes</a>
                    <a href="#" className="hover:text-white transition-colors">Trainers</a>
                    <a href="#" className="hover:text-white transition-colors">Membership</a>
                </div>
                <button className="bg-yellow-500 text-black px-6 py-2 font-bold uppercase hover:bg-yellow-400 transition-colors">
                    Join Now
                </button>
            </nav>

            {/* Hero Section */}
            <header className="relative flex items-center justify-center min-h-[80vh] text-center px-4">
                {/* Background Image Overlay */}
                <div
                    className="absolute inset-0 z-0 bg-cover bg-center opacity-40"
                    style={{ backgroundImage: "url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop')" }}
                />
                <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent z-0" />

                <div className="relative z-10 max-w-4xl mx-auto">
                    <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter mb-6">
                        Build Your <span className="text-transparent bg-clip-text bg-linear-to-r from-yellow-400 to-yellow-600">Legend</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-2xl mx-auto font-light">
                        Premium equipment. Expert trainers. A community that pushes limits. Start your transformation today.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="bg-yellow-500 text-black px-8 py-4 text-lg font-bold uppercase hover:bg-yellow-400 transition-transform hover:scale-105">
                            Start Free Trial
                        </button>
                        <button className="border-2 border-white text-white px-8 py-4 text-lg font-bold uppercase hover:bg-white hover:text-black transition-colors">
                            View Schedule
                        </button>
                    </div>
                </div>
            </header>

            {/* Features / Stats */}
            <section className="py-20 bg-zinc-900">
                <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    <div>
                        <div className="text-4xl md:text-5xl font-black text-white mb-2">50+</div>
                        <div className="text-gray-500 uppercase tracking-wider text-sm">Expert Trainers</div>
                    </div>
                    <div>
                        <div className="text-4xl md:text-5xl font-black text-white mb-2">24/7</div>
                        <div className="text-gray-500 uppercase tracking-wider text-sm">Access</div>
                    </div>
                    <div>
                        <div className="text-4xl md:text-5xl font-black text-white mb-2">100+</div>
                        <div className="text-gray-500 uppercase tracking-wider text-sm">Machines</div>
                    </div>
                    <div>
                        <div className="text-4xl md:text-5xl font-black text-white mb-2">15k</div>
                        <div className="text-gray-500 uppercase tracking-wider text-sm">Members</div>
                    </div>
                </div>
            </section>
        </div>
    );
}
