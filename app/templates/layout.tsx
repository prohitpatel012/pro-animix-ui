import { TemplatesSidebar } from "@/components/TemplatesSidebar";

export default function TemplatesLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex flex-col md:flex-row min-h-screen pt-16 bg-white dark:bg-black">
            <TemplatesSidebar />
            <main className="flex-1 w-full relative">
                {children}
            </main>
        </div>
    );
}
