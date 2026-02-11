import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Template from "@/models/Template";
import { templatesData } from "@/lib/templates";

// Sidebar data with plans
const sidebarData: Record<string, string> = {
    "landing-page": "Free",
    "ecommerce": "Pro",
    "saas-dashboard": "Pro",
    "portfolio": "Free",
    "mobile-app": "Pro",
    "gym-landing-page": "Pro",
    "solo-portfolio": "Pro",
};

export async function POST() {
    try {
        await dbConnect();

        // Check if templates already exist to avoid duplicates/overwrite
        const existingCount = await Template.countDocuments();
        if (existingCount > 0) {
            return NextResponse.json({ message: "Templates already seeded" }, { status: 200 });
        }

        const templatesToInsert = Object.values(templatesData).map((t) => ({
            title: t.title,
            slug: t.slug,
            description: t.description,
            price: t.price,
            plan: sidebarData[t.slug] || "Free",
            features: t.features,
            livePreviewUrl: t.livePreviewUrl || "#",
            image: t.image || "",
            rating: t.rating || 0,
            reviews: t.reviews || 0,
        }));

        await Template.insertMany(templatesToInsert);

        return NextResponse.json({ message: "Templates seeded successfully", count: templatesToInsert.length }, { status: 201 });
    } catch (error: any) {
        console.error("Seed error:", error);
        return NextResponse.json({ message: "Error seeding templates", error: error.message }, { status: 500 });
    }
}
