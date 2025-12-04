"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, PenTool, Layout, Settings, LogOut, Compass, CreditCard } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";
import { useAuth } from "@/components/auth/auth-context";

const navItems = [
    { icon: Home, label: "Overview", href: "/dashboard" },
    { icon: Compass, label: "Explore", href: "/dashboard/explore" },
    { icon: PenTool, label: "Write", href: "/dashboard/write" },
    { icon: Layout, label: "My Content", href: "/dashboard/content" },
    // { icon: CreditCard, label: "Subscription", href: "/dashboard/subscription" }, // Hidden for now
    { icon: Settings, label: "Settings", href: "/dashboard/settings" },
];

export default function Sidebar() {
    const pathname = usePathname();
    const { data: session } = useSession();
    const user = session?.user;
    const { logout } = useAuth();

    const avatars = [
        "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix",
        "https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka",
        "https://api.dicebear.com/7.x/avataaars/svg?seed=Zoe",
        "https://api.dicebear.com/7.x/avataaars/svg?seed=Jack",
    ];

    return (
        <aside className="w-72 h-screen bg-background border-r border-foreground/10 fixed left-0 top-0 flex flex-col p-6 z-50">
            <div className="mb-8 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden border border-foreground/10 flex-shrink-0">
                    <img
                        src={user?.image || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name || "User"}`}
                        alt="User Avatar"
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="overflow-hidden">
                    <h1 className="text-sm font-bold font-serif italic truncate">Writer's Block</h1>
                    <p className="text-xs text-muted-foreground truncate">Welcome, {user?.name || "Writer"}</p>
                </div>
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

            <button
                onClick={logout}
                className="flex items-center gap-3 px-4 py-3 text-muted-foreground hover:text-red-500 transition-colors mt-auto"
            >
                <LogOut className="w-5 h-5" />
                Sign Out
            </button>
        </aside>
    );
}
