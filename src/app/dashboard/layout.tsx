"use client";

import { useState } from "react";
import Sidebar from "@/components/dashboard/sidebar";
import ThemeCustomizer from "@/components/dashboard/theme-customizer";
import { Menu } from "lucide-react";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col md:flex-row">
            {/* Mobile Header */}
            <div className="md:hidden flex items-center p-4 border-b border-foreground/10 bg-background sticky top-0 z-30">
                <button
                    onClick={() => setIsSidebarOpen(true)}
                    className="p-2 hover:bg-foreground/5 rounded-lg"
                >
                    <Menu className="w-6 h-6" />
                </button>
                <span className="ml-4 font-serif font-bold italic">Writer's Block</span>
            </div>

            <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

            <main className="flex-1 md:ml-72 p-4 md:p-8 overflow-y-auto w-full">
                {children}
            </main>
            <ThemeCustomizer />
        </div>
    );
}
