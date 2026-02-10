import { ArrowRight, BarChart, Bell, Calendar, Home, PieChart, Users, Settings, Search } from "lucide-react";

export default function DashboardDemo() {
    return (
        <div className="min-h-screen bg-neutral-100 dark:bg-zinc-900 font-sans flex">

            {/* Sidebar */}
            <aside className="fixed inset-y-0 left-0 w-64 bg-white dark:bg-zinc-950 border-r border-zinc-200 dark:border-zinc-800 p-6 z-20 hidden md:block">
                <div className="flex items-center gap-3 mb-10 text-indigo-600 dark:text-indigo-400">
                    <BarChart className="w-8 h-8" />
                    <span className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white">AdminUI</span>
                </div>

                <nav className="space-y-2">
                    {[
                        { name: "Dashboard", icon: Home, active: true },
                        { name: "Analytics", icon: PieChart, active: false },
                        { name: "Customers", icon: Users, active: false },
                        { name: "Schedules", icon: Calendar, active: false },
                        { name: "Settings", icon: Settings, active: false },
                    ].map((item) => (
                        <a key={item.name} href="#" className={`flex items-center gap-3 px-3 py-2 rounded-lg font-medium transition-colors ${item.active ? 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400' : 'text-zinc-500 hover:bg-zinc-50 dark:hover:bg-zinc-900'}`}>
                            <item.icon className="w-5 h-5" />
                            {item.name}
                        </a>
                    ))}
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 md:ml-64 p-8">

                {/* Top Bar */}
                <div className="flex justify-between items-center mb-10">
                    <div className="relative w-96">
                        <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
                        <input type="text" placeholder="Search data..." className="w-full pl-10 pr-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="relative p-2 rounded-full hover:bg-white transition-colors">
                            <Bell className="w-6 h-6 text-zinc-500" />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full" />
                        </button>
                        <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold">JD</div>
                    </div>
                </div>

                {/* KPI Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
                    {[
                        { label: 'Total Revenue', value: '$45,231', change: '+12%', color: 'bg-green-100 text-green-600' },
                        { label: 'Active Users', value: '2,345', change: '+5%', color: 'bg-blue-100 text-blue-600' },
                        { label: 'Bounce Rate', value: '42.3%', change: '-2%', color: 'bg-orange-100 text-orange-600' },
                        { label: 'New Signups', value: '342', change: '+18%', color: 'bg-purple-100 text-purple-600' },
                    ].map((kpi, i) => (
                        <div key={i} className="bg-white dark:bg-zinc-800 p-6 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-700">
                            <div className="text-zinc-500 text-sm font-medium mb-2">{kpi.label}</div>
                            <div className="text-3xl font-bold text-zinc-900 dark:text-white mb-2">{kpi.value}</div>
                            <span className={`text-xs font-bold px-2 py-1 rounded-full ${kpi.color}`}>{kpi.change}</span>
                        </div>
                    ))}
                </div>

                {/* Example Chart Area */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 bg-white dark:bg-zinc-800 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-700 shadow-sm h-96">
                        <h3 className="text-lg font-bold mb-4">Revenue Overview</h3>
                        <div className="flex items-end justify-between h-64 gap-2">
                            {[40, 65, 30, 80, 55, 90, 45, 70].map((h, i) => (
                                <div key={i} className="w-full bg-indigo-100 dark:bg-indigo-900/30 rounded-t-lg relative group">
                                    <div
                                        className="absolute bottom-0 left-0 w-full bg-indigo-500 rounded-t-lg transition-all duration-500 group-hover:bg-indigo-600"
                                        style={{ height: `${h}%` }}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white dark:bg-zinc-800 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-700 shadow-sm">
                        <h3 className="text-lg font-bold mb-4">Traffic Sources</h3>
                        <div className="space-y-4">
                            {[
                                { name: 'Direct', val: '40%', color: 'bg-indigo-500' },
                                { name: 'Social', val: '35%', color: 'bg-purple-500' },
                                { name: 'Referral', val: '15%', color: 'bg-pink-500' },
                                { name: 'Organic', val: '10%', color: 'bg-orange-500' },
                            ].map((source) => (
                                <div key={source.name}>
                                    <div className="flex justify-between text-sm mb-1">
                                        <span>{source.name}</span>
                                        <span className="font-bold">{source.val}</span>
                                    </div>
                                    <div className="w-full h-2 bg-zinc-100 dark:bg-zinc-700 rounded-full overflow-hidden">
                                        <div className={`h-full ${source.color}`} style={{ width: source.val }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </main>
        </div>
    );
}
