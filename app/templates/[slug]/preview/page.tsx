import { notFound } from "next/navigation";
import dbConnect from "@/lib/db";
import Template from "@/models/Template";
import { TemplatePreview } from "@/components/TemplatePreview";

export default async function PreviewPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    await dbConnect();
    const templateDoc = await Template.findOne({ slug }).lean();

    if (!templateDoc) {
        return notFound();
    }

    const template = JSON.parse(JSON.stringify(templateDoc));

    return <TemplatePreview template={template} />;
}
