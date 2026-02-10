import { NextResponse } from 'next/server';
import { verifySession } from '@/lib/auth';
import dbConnect from '@/lib/db';
import User from '@/models/User';

export async function GET() {
    try {
        const session = await verifySession();

        if (!session || !session.userId) {
            return NextResponse.json(
                { message: 'Unauthorized' },
                { status: 401 }
            );
        }

        await dbConnect();

        // Verify admin role
        const currentUser = await User.findById(session.userId);
        if (!currentUser || currentUser.role !== 'admin') {
            return NextResponse.json(
                { message: 'Forbidden: Admin access required' },
                { status: 403 }
            );
        }

        const users = await User.find({}).select('-password').sort({ createdAt: -1 });

        return NextResponse.json({ users });
    } catch (error: any) {
        console.error('Fetch users error:', error);
        return NextResponse.json(
            { message: 'Internal server error' },
            { status: 500 }
        );
    }
}
