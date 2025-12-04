"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Book, Feather, Music, FileText, Layout } from "lucide-react";
import Editor from "@/components/editor/editor";
import BookEditor from "@/components/editor/book-editor";

const categories = [
    // { id: "book", label: "Book", icon: Book, description: "Write a novel with chapters" },
    { id: "blog", label: "Blog", icon: Layout, description: "Create a blog post" },
    { id: "poem", label: "Poem", icon: Feather, description: "Compose poetry" },
    { id: "song", label: "Song", icon: Music, description: "Write lyrics" },
    { id: "other", label: "Other", icon: FileText, description: "Free writing" },
];

export default function WritePage() {
    const [selectedCategory, setSelectedCategory] = useState("blog");

    return (
        <div className="h-full flex flex-col">
            <header className="mb-6">
                <h1 className="text-3xl font-bold mb-4">Start Writing</h1>

                {/* Category Selector */}
                <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                    {categories.map((category) => {
                        const Icon = category.icon;
                        const isSelected = selectedCategory === category.id;
                        return (
                            <button
                                key={category.id}
                                onClick={() => setSelectedCategory(category.id)}
                                className={`flex items-center gap-3 px-5 py-3 rounded-xl border transition-all whitespace-nowrap ${isSelected
                                    ? "bg-foreground text-background border-foreground shadow-lg scale-105"
                                    : "bg-foreground/5 border-foreground/10 text-muted-foreground hover:bg-foreground/10 hover:text-foreground"
                                    }`}
                            >
                                <Icon className="w-4 h-4" />
                                <div className="text-left">
                                    <div className="font-bold text-sm">{category.label}</div>
                                </div>
                            </button>
                        );
                    })}
                </div>
            </header>

            <div className="flex-1">
                {selectedCategory === "book" ? (
                    <BookEditor />
                ) : (
                    <Editor />
                )}
            </div>
        </div>
    );
}
