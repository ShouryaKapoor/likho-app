"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FileText, Plus, Search } from "lucide-react";
import Link from "next/link";

export default function ContentPage() {
    // Mock content state - initially empty to show the empty state as requested
    // In a real app, this would fetch from an API or local storage
    const [content, setContent] = useState<any[]>([]);

    return (
        <div className="h-full flex flex-col">
            <header className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold mb-2">My Content</h1>
                    <p className="text-muted-foreground">Manage your stories, poems, and drafts.</p>
                </div>
                <div className="flex gap-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Search..."
                            className="bg-foreground/5 border border-foreground/10 rounded-xl py-2 pl-10 pr-4 outline-none focus:border-foreground/20 transition-colors"
                        />
                    </div>
                    <Link
                        href="/dashboard/write"
                        className="bg-foreground text-background px-4 py-2 rounded-xl font-medium hover:bg-foreground/90 transition-colors flex items-center gap-2"
                    >
                        <Plus className="w-4 h-4" />
                        New Project
                    </Link>
                </div>
            </header>

            {content.length === 0 ? (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex-1 flex flex-col items-center justify-center text-center p-12 border-2 border-dashed border-foreground/10 rounded-3xl bg-foreground/5"
                >
                    <div className="w-20 h-20 rounded-full bg-foreground/10 flex items-center justify-center mb-6">
                        <FileText className="w-10 h-10 text-muted-foreground" />
                    </div>
                    <h2 className="text-2xl font-bold mb-2">No content yet</h2>
                    <p className="text-muted-foreground max-w-md mb-8">
                        Your library is looking a bit empty. Start writing your next masterpiece today.
                    </p>
                    <Link
                        href="/dashboard/write"
                        className="bg-foreground text-background px-8 py-4 rounded-xl font-bold text-lg hover:bg-foreground/90 transition-all hover:scale-105 flex items-center gap-2"
                    >
                        <Plus className="w-5 h-5" />
                        Start Writing
                    </Link>
                </motion.div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Content list would go here */}
                </div>
            )}
        </div>
    );
}
