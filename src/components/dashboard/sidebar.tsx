"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, PenTool, Layout, Settings, LogOut, Compass } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
    { icon: Home, label: "Overview", href: "/dashboard" },
    { icon: Compass, label: "Explore", href: "/dashboard/explore" },
    { icon: PenTool, label: "Write", href: "/dashboard/write" },
    { icon: Layout, label: "My Content", href: "/dashboard/content" },
    { icon: Settings, label: "Settings", href: "/dashboard/settings" },
];

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="w-64 h-screen bg-background border-r border-foreground/10 fixed left-0 top-0 flex flex-col p-6">
            <div className="mb-10">
                <h1 className="text-2xl font-bold font-serif italic">Writer's Block</h1>
            </div>

            <nav className="flex-1 space-y-2">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200",
                                isActive
                                    ? "bg-foreground text-background font-medium shadow-lg"
                                    : "text-muted-foreground hover:bg-foreground/5 hover:text-foreground"
                            )}
                        >
                            <Icon className="w-5 h-5" />
                            {item.label}
                        </Link>
                    );
                })}
            </nav>

            <button className="flex items-center gap-3 px-4 py-3 text-muted-foreground hover:text-red-500 transition-colors mt-auto">
                <LogOut className="w-5 h-5" />
                Sign Out
            </button>
        </aside>
    );
}
