import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import { createSession } from '@/lib/auth';

const registerSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
});

export async function POST(req: Request) {
    try {
        const body = await req.json();

        // Validate input
        const result = registerSchema.safeParse(body);
        if (!result.success) {
            return NextResponse.json(
                { message: 'Validation failed', errors: result.error.format() },
                { status: 400 }
            );
        }

        const { name, email, password } = result.data;

        await dbConnect();

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json(
                { message: 'User already exists' },
                { status: 409 }
            );
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Create user
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            role: 'user', // Always default to 'user'
        });

        // Create session (sets a cookie)
        await createSession({
            userId: newUser._id.toString(),
            role: newUser.role,
            name: newUser.name,
            email: newUser.email,
        });

        // Remove password from response
        const { password: _, ...userWithoutPassword } = newUser.toObject();

        return NextResponse.json(
            { message: 'User registered successfully', user: userWithoutPassword },
            { status: 201 }
        );
    } catch (error: any) {
        console.error('Registration error:', error);
        return NextResponse.json(
            { message: 'Internal server error', error: error.message },
            { status: 500 }
        );
    }
}
