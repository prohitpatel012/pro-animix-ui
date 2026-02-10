import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import { createSession } from '@/lib/auth';
import { z } from 'zod';

const loginSchema = z.object({
    email: z.string().email(),
    password: z.string(),
});

export async function POST(req: Request) {
    try {
        const body = await req.json();

        // Validate request body
        const result = loginSchema.safeParse(body);
        if (!result.success) {
            return NextResponse.json(
                { message: 'Invalid input', error: result.error.flatten() },
                { status: 400 }
            );
        }
        const { email, password } = result.data;

        await dbConnect();

        // Find user
        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json(
                { message: 'Invalid credentials' },
                { status: 401 }
            );
        }

        // Check password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return NextResponse.json(
                { message: 'Invalid credentials' },
                { status: 401 }
            );
        }

        // Create session (sets a cookie)
        await createSession({
            userId: user._id.toString(),
            role: user.role,
            name: user.name,
            email: user.email,
        });

        // Return user info (omit sensitive data)
        const { password: _, ...userInfo } = user.toObject();

        return NextResponse.json(
            { message: 'Login successful', user: userInfo },
            { status: 200 }
        );
    } catch (error: any) {
        console.error('Login error:', error);
        return NextResponse.json(
            { message: 'Internal server error', error: error.message },
            { status: 500 }
        );
    }
}
