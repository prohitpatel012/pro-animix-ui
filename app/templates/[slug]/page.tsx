import React from "react";
import { DefaultTemplateDetails } from "@/components/templates/details/DefaultTemplateDetails";
import { MobileAppTemplateDetails } from "@/components/templates/details/MobileAppTemplateDetails";
import { SaasLandingTemplateDetails } from "@/components/templates/details/SaasLandingTemplateDetails";
import { EcommerceTemplateDetails } from "@/components/templates/details/EcommerceTemplateDetails";
import { DashboardTemplateDetails } from "@/components/templates/details/DashboardTemplateDetails";
import { PortfolioTemplateDetails } from "@/components/templates/details/PortfolioTemplateDetails";
import { GymTemplateDetails } from "@/components/templates/details/GymTemplateDetails";
import { templatesData } from "@/lib/templates";

export default async function TemplatePage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const template = templatesData[slug] || templatesData["landing-page"]; // Default fallback

    // Map logic: Return different component based on slug
    switch (slug) {
        case "mobile-app":
            return <MobileAppTemplateDetails template={template} />;
        case "landing-page":
            return <SaasLandingTemplateDetails template={template} />;
        case "ecommerce":
            return <EcommerceTemplateDetails template={template} />;
        case "saas-dashboard":
            return <DashboardTemplateDetails template={template} />;
        case "portfolio":
        case "solo-portfolio":
            return <PortfolioTemplateDetails template={template} />;
        case "gym-landing-page":
            return <GymTemplateDetails template={template} />;
        default:
            return <DefaultTemplateDetails template={template} />;
    }
}

