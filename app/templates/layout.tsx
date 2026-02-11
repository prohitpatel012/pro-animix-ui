import { TemplatesSidebar } from "@/components/TemplatesSidebar";
import dbConnect from "@/lib/db";
import Template from "@/models/Template";

export default async function TemplatesLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    // Fetch templates directly from DB on the server
    await dbConnect();
    const fetchedTemplates = await Template.find({}).sort({ createdAt: -1 }).lean();

    // Convert to plain objects for client component
    const templates = JSON.parse(JSON.stringify(fetchedTemplates));

    return (
        <div className="flex flex-col md:flex-row min-h-screen pt-16 bg-white dark:bg-black">
            <TemplatesSidebar templates={templates} />
            <main className="flex-1 w-full relative">
                {children}
            </main>
        </div>
    );
}
