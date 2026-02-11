import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Template from "@/models/Template";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        await dbConnect();
        const { id } = await params;
        const template = await Template.findById(id);
        if (!template) {
            return NextResponse.json({ message: "Template not found" }, { status: 404 });
        }
        return NextResponse.json(template);
    } catch (error) {
        return NextResponse.json({ message: "Error fetching template" }, { status: 500 });
    }
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        await dbConnect();
        const { id } = await params;
        const body = await req.json();
        const updatedTemplate = await Template.findByIdAndUpdate(id, body, {
            new: true,
            runValidators: true,
        });

        if (!updatedTemplate) {
            return NextResponse.json({ message: "Template not found" }, { status: 404 });
        }

        return NextResponse.json(updatedTemplate);
    } catch (error: any) {
        return NextResponse.json({ message: "Error updating template", error: error.message }, { status: 500 });
    }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        await dbConnect();
        const { id } = await params;
        const deletedTemplate = await Template.findByIdAndDelete(id);
        if (!deletedTemplate) {
            return NextResponse.json({ message: "Template not found" }, { status: 404 });
        }
        return NextResponse.json({ message: "Template deleted successfully" });
    } catch (error) {
        return NextResponse.json({ message: "Error deleting template" }, { status: 500 });
    }
}
