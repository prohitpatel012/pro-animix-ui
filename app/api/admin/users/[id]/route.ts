import { NextResponse } from 'next/server';
import { verifySession } from '@/lib/auth';
import dbConnect from '@/lib/db';
import User from '@/models/User';

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const session = await verifySession();

        if (!session || !session.userId) {
            return NextResponse.json(
                { message: 'Unauthorized' },
                { status: 401 }
            );
        }

        await dbConnect();

        // Verify admin role of requester
        const currentUser = await User.findById(session.userId);
        if (!currentUser || currentUser.role !== 'admin') {
            return NextResponse.json(
                { message: 'Forbidden: Admin access required' },
                { status: 403 }
            );
        }

        const { id } = await params;
        const body = await req.json();
        const { role, plan } = body;

        const updatedUser = await User.findByIdAndUpdate(
            id,
            {
                ...(role && { role }),
                ...(plan && { plan })
            },
            { new: true }
        ).select('-password');

        if (!updatedUser) {
            return NextResponse.json(
                { message: 'User not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            message: 'User updated successfully',
            user: updatedUser
        });

    } catch (error: any) {
        console.error('Update user error:', error);
        return NextResponse.json(
            { message: 'Internal server error' },
            { status: 500 }
        );
    }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const session = await verifySession();

        if (!session || !session.userId) {
            return NextResponse.json(
                { message: 'Unauthorized' },
                { status: 401 }
            );
        }

        await dbConnect();

        // Verify admin role of requester
        const currentUser = await User.findById(session.userId);
        if (!currentUser || currentUser.role !== 'admin') {
            return NextResponse.json(
                { message: 'Forbidden: Admin access required' },
                { status: 403 }
            );
        }

        const { id } = await params;

        if (id === session.userId) {
            return NextResponse.json(
                { message: 'Cannot delete your own admin account' },
                { status: 400 }
            );
        }

        const deletedUser = await User.findByIdAndDelete(id);

        if (!deletedUser) {
            return NextResponse.json(
                { message: 'User not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            message: 'User deleted successfully'
        });

    } catch (error: any) {
        console.error('Delete user error:', error);
        return NextResponse.json(
            { message: 'Internal server error' },
            { status: 500 }
        );
    }
}
