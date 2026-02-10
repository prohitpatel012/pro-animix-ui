import { ArrowRight, ShoppingBag, Star, TrendingUp } from "lucide-react";

export default function EcommercePage() {
    return (
        <div className="min-h-screen bg-neutral-50 dark:bg-zinc-950 font-sans">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800">
                <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="text-2xl font-bold tracking-tight">STOREFRONT</div>
                    <div className="flex gap-6 text-sm font-medium">
                        <a href="#" className="hover:text-indigo-600">New Arrivals</a>
                        <a href="#" className="hover:text-indigo-600">Categories</a>
                        <a href="#" className="hover:text-indigo-600">Sale</a>
                    </div>
                    <div className="relative">
                        <ShoppingBag className="w-6 h-6" />
                        <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-white text-[10px] flex items-center justify-center font-bold">2</span>
                    </div>
                </div>
            </header>

            {/* Hero Banner */}
            <section className="relative h-[600px] flex items-center justify-center bg-zinc-900 text-white overflow-hidden">
                <div className="absolute inset-0 bg-linear-to-r from-black/80 to-transparent z-10" />
                <img
                    src="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop"
                    alt="Fashion Collection"
                    className="absolute inset-0 w-full h-full object-cover"
                />

                <div className="relative z-20 max-w-7xl w-full px-6 flex flex-col justify-center h-full">
                    <div className="max-w-xl">
                        <span className="text-indigo-400 font-bold tracking-wider mb-4 block uppercase text-sm">Spring Collection 2024</span>
                        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">Define Your Style.</h1>
                        <p className="text-lg text-gray-300 mb-8 max-w-md">Discover the latest trends in fashion. Premium quality, sustainable materials, and timeless designs.</p>
                        <button className="bg-white text-black px-8 py-4 font-bold uppercase hover:bg-gray-100 transition-colors">
                            Shop Collection
                        </button>
                    </div>
                </div>
            </section>

            {/* Featured Products */}
            <section className="py-20 px-6 max-w-7xl mx-auto">
                <div className="flex items-center justify-between mb-12">
                    <h2 className="text-3xl font-bold">Trending Now</h2>
                    <a href="#" className="text-indigo-600 font-semibold flex items-center gap-1 hover:underline">View All <ArrowRight size={16} /></a>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {[1, 2, 3, 4].map((item) => (
                        <div key={item} className="group cursor-pointer">
                            <div className="relative aspect-3/4 bg-gray-200 rounded-xl overflow-hidden mb-4">
                                <img
                                    src={`https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop`}
                                    alt="Product"
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute bottom-4 left-4 bg-white px-3 py-1 rounded-full text-xs font-bold shadow-md">
                                    Running Shoes
                                </div>
                            </div>
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="font-semibold text-lg hover:text-indigo-600 transition-colors">Performance Runner</h3>
                                    <p className="text-gray-500 text-sm">Pro Series</p>
                                </div>
                                <span className="font-bold text-lg">$129</span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
