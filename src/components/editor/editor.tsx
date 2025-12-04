"use client";

import { useState, useRef, useEffect, useActionState } from "react";
import { motion } from "framer-motion";
import { Image as ImageIcon, Type, AlignLeft, AlignCenter, AlignRight } from "lucide-react";
import { createPost } from "@/app/actions/post";

const initialState = {
    error: "",
};

export default function Editor() {
    const [state, formAction, isPending] = useActionState(createPost, initialState);

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [isPremium, setIsPremium] = useState(false);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    // Auto-resize textarea
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
            textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
        }
    }, [content]);

    return (
        <form action={formAction} className="max-w-3xl mx-auto">
            {state?.error && (
                <div className="mb-4 p-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-xl text-sm">
                    {state.error}
                </div>
            )}

            {/* Toolbar */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="sticky top-0 z-10 bg-background/80 backdrop-blur-md py-4 mb-8 flex items-center justify-between border-b border-foreground/10"
            >
                <div className="flex items-center gap-4">
                    <button type="button" className="p-2 hover:bg-foreground/5 rounded-lg transition-colors">
                        <Type className="w-5 h-5" />
                    </button>
                    <div className="h-6 w-px bg-foreground/10" />
                    <button type="button" className="p-2 hover:bg-foreground/5 rounded-lg transition-colors">
                        <AlignLeft className="w-5 h-5" />
                    </button>
                    <button type="button" className="p-2 hover:bg-foreground/5 rounded-lg transition-colors">
                        <AlignCenter className="w-5 h-5" />
                    </button>
                    <button type="button" className="p-2 hover:bg-foreground/5 rounded-lg transition-colors">
                        <AlignRight className="w-5 h-5" />
                    </button>
                    <div className="h-6 w-px bg-foreground/10" />
                    <button type="button" className="p-2 hover:bg-foreground/5 rounded-lg transition-colors">
                        <ImageIcon className="w-5 h-5" />
                    </button>
                </div>

                <div className="flex items-center gap-4">
                    <label className="flex items-center gap-2 text-sm font-bold cursor-pointer">
                        <input
                            type="checkbox"
                            name="isPremium"
                            checked={isPremium}
                            onChange={(e) => setIsPremium(e.target.checked)}
                            className="w-4 h-4 accent-accent"
                        />
                        Premium
                    </label>
                    <button
                        type="submit"
                        disabled={isPending}
                        className="px-6 py-2 bg-accent text-white rounded-lg font-bold hover:bg-accent/90 transition-colors disabled:opacity-50"
                    >
                        {isPending ? "Publishing..." : "Publish"}
                    </button>
                </div>
            </motion.div>

            {/* Title Input */}
            <input
                type="text"
                name="title"
                placeholder="Title of your masterpiece..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full text-5xl font-bold bg-transparent border-none outline-none placeholder:text-muted-foreground/50 mb-8 font-serif"
                required
            />

            {/* Content Editor */}
            <textarea
                ref={textareaRef}
                name="content"
                placeholder="Start writing..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full min-h-[50vh] text-xl leading-relaxed bg-transparent border-none outline-none resize-none placeholder:text-muted-foreground/50 font-serif"
                required
            />
        </form>
    );
}
