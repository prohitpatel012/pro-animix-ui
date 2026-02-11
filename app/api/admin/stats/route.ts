import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import Analytics from '@/models/Analytics';

export async function GET() {
    try {
        await dbConnect();

        // 1. User Stats
        const totalUsers = await User.countDocuments({});
        const adminUsers = await User.countDocuments({ role: 'admin' });
        // const newUsersToday = await User.countDocuments({ createdAt: { $gte: new Date().setHours(0,0,0,0) } }); // Approx

        // 2. Analytics Stats (Total)
        const analyticsData = await Analytics.find({});
        const totalPageViews = analyticsData.reduce((acc, curr) => acc + curr.pageViews, 0);
        // const totalVisitors = analyticsData.reduce((acc, curr) => acc + curr.uniqueVisitors, 0);

        // Get recent page views (last 7 days for chart)
        const last7Days = await Analytics.find().sort({ date: -1 }).limit(7);

        return NextResponse.json({
            stats: {
                totalUsers,
                adminUsers,
                totalPageViews,
                // totalVisitors
            },
            chartData: last7Days.reverse() // Send chronological
        });
    } catch (error) {
        console.error('Stats error:', error);
        return NextResponse.json({ message: 'Error fetching stats' }, { status: 500 });
    }
}
