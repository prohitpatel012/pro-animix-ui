import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Template from "@/models/Template";

export async function GET() {
    try {
        await dbConnect();
        const templates = await Template.find({}).sort({ createdAt: -1 });
        return NextResponse.json(templates);
    } catch (error) {
        return NextResponse.json({ message: "Error fetching templates" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        await dbConnect();
        const body = await req.json();
        const template = await Template.create(body);
        return NextResponse.json(template, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ message: "Error creating template", error: error.message }, { status: 500 });
    }
}
