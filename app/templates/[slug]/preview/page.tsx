import React from "react";
import { templatesData } from "@/lib/templates";
import { TemplatePreview } from "@/components/TemplatePreview";

export default async function PreviewPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const template = templatesData[slug] || templatesData["landing-page"];

    return <TemplatePreview template={template} />;
}
