export default function TemplatePreviewLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="fixed inset-0 z-100 bg-white dark:bg-black">
            {children}
        </div>
    );
}
