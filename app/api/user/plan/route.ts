import { NextResponse } from 'next/server';
import { verifySession } from '@/lib/auth';
import dbConnect from '@/lib/db';
import User from '@/models/User';

export async function POST(req: Request) {
    try {
        const session = await verifySession();

        if (!session || !session.userId) {
            return NextResponse.json(
                { message: 'Unauthorized' },
                { status: 401 }
            );
        }

        const body = await req.json();
        const { plan, paymentSuccess } = body;

        if (!['basic', 'pro', 'premium'].includes(plan)) {
            return NextResponse.json(
                { message: 'Invalid plan selected' },
                { status: 400 }
            );
        }

        // Mock Payment Verification
        // In a real app, you would verify the payment with Stripe/Razorpay here
        if (!paymentSuccess) {
            return NextResponse.json(
                { message: 'Payment failed' },
                { status: 402 }
            );
        }

        await dbConnect();

        const updatedUser = await User.findByIdAndUpdate(
            session.userId,
            { plan: plan },
            { new: true }
        ).select('-password');

        if (!updatedUser) {
            return NextResponse.json(
                { message: 'User not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            message: `Successfully upgraded to ${plan} plan`,
            user: updatedUser
        });

    } catch (error: any) {
        console.error('Plan upgrade error:', error);
        return NextResponse.json(
            { message: 'Internal server error' },
            { status: 500 }
        );
    }
}
