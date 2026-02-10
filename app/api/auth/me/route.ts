import { NextResponse } from 'next/server';
import { verifySession, deleteSession } from '@/lib/auth';
// Import dbConnect and User if you want to fetch fresh user data from DB
// Otherwise, just returning session payload is faster but less secure if role changed
import dbConnect from '@/lib/db';
import User from '@/models/User';

export async function GET() {
    try {
        const session = await verifySession();

        if (!session) {
            return NextResponse.json(
                { message: 'Unauthorized' },
                { status: 401 }
            );
        }

        // Optional: Fetch fresh user data from DB to ensure role/status is current
        await dbConnect();
        const user = await User.findById(session.userId).select('-password');

        if (!user) {
            return NextResponse.json(
                { message: 'User not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({ user });
    } catch (error: any) {
        return NextResponse.json(
            { message: 'Internal server error' },
            { status: 500 }
        );
    }
}

export async function POST() {
    await deleteSession();
    return NextResponse.json({ message: 'Logged out successfully' });
}
