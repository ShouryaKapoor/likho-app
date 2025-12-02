"use client";

import { useState, useEffect } from "react";
import { Paintbrush } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const themes = [
    { name: "Default", primary: "#000000", background: "#ffffff" },
    { name: "Midnight", primary: "#ffffff", background: "#0f172a" },
    { name: "Sepia", primary: "#4a3b32", background: "#f4ecd8" },
    { name: "Forest", primary: "#e2e8f0", background: "#1a2f1c" },
];

export default function ThemeCustomizer() {
    const [isOpen, setIsOpen] = useState(false);

    const applyTheme = (theme: typeof themes[0]) => {
        const root = document.documentElement;
        root.style.setProperty("--background", theme.background);
        root.style.setProperty("--foreground", theme.primary);
        // In a real app, we'd save this to local storage or DB
    };

    return (
        <div className="fixed bottom-8 right-8 z-50">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                        className="absolute bottom-16 right-0 bg-background border border-foreground/10 p-4 rounded-2xl shadow-2xl w-64 mb-2"
                    >
                        <h3 className="font-bold mb-4">Customize Theme</h3>
                        <div className="space-y-2">
                            {themes.map((theme) => (
                                <button
                                    key={theme.name}
                                    onClick={() => applyTheme(theme)}
                                    className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-foreground/5 transition-colors"
                                >
                                    <div
                                        className="w-6 h-6 rounded-full border border-gray-300"
                                        style={{ backgroundColor: theme.background }}
                                    />
                                    <div
                                        className="w-6 h-6 rounded-full border border-gray-300 -ml-4"
                                        style={{ backgroundColor: theme.primary }}
                                    />
                                    <span className="text-sm">{theme.name}</span>
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-14 h-14 bg-foreground text-background rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
            >
                <Paintbrush className="w-6 h-6" />
            </button>
        </div>
    );
}
