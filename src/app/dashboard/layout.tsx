import Sidebar from "@/components/dashboard/sidebar";
import ThemeCustomizer from "@/components/dashboard/theme-customizer";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-background text-foreground flex">
            <Sidebar />
            <main className="flex-1 ml-64 p-8 overflow-y-auto">
                {children}
            </main>
            <ThemeCustomizer />
        </div>
    );
}
