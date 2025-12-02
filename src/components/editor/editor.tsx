"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Image as ImageIcon, Type, AlignLeft, AlignCenter, AlignRight } from "lucide-react";

export default function Editor() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    // Auto-resize textarea
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
            textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
        }
    }, [content]);

    return (
        <div className="max-w-3xl mx-auto">
            {/* Toolbar */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="sticky top-0 z-10 bg-background/80 backdrop-blur-md py-4 mb-8 flex items-center gap-4 border-b border-foreground/10"
            >
                <button className="p-2 hover:bg-foreground/5 rounded-lg transition-colors">
                    <Type className="w-5 h-5" />
                </button>
                <div className="h-6 w-px bg-foreground/10" />
                <button className="p-2 hover:bg-foreground/5 rounded-lg transition-colors">
                    <AlignLeft className="w-5 h-5" />
                </button>
                <button className="p-2 hover:bg-foreground/5 rounded-lg transition-colors">
                    <AlignCenter className="w-5 h-5" />
                </button>
                <button className="p-2 hover:bg-foreground/5 rounded-lg transition-colors">
                    <AlignRight className="w-5 h-5" />
                </button>
                <div className="h-6 w-px bg-foreground/10" />
                <button className="p-2 hover:bg-foreground/5 rounded-lg transition-colors">
                    <ImageIcon className="w-5 h-5" />
                </button>
            </motion.div>

            {/* Title Input */}
            <input
                type="text"
                placeholder="Title of your masterpiece..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full text-5xl font-bold bg-transparent border-none outline-none placeholder:text-muted-foreground/50 mb-8 font-serif"
            />

            {/* Content Editor */}
            <textarea
                ref={textareaRef}
                placeholder="Start writing..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full min-h-[50vh] text-xl leading-relaxed bg-transparent border-none outline-none resize-none placeholder:text-muted-foreground/50 font-serif"
            />
        </div>
    );
}
