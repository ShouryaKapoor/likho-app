"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Lightbulb from "./lightbulb";
import FlashlightEffect from "@/components/ui/flashlight-effect";

interface RoomProps {
    children: React.ReactNode; // The Book Cover (Hero)
    onEnter: () => void;
}

export default function Room({ children, onEnter }: RoomProps) {
    const [isLit, setIsLit] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    // Map scroll to zoom
    // 0 -> 1: Zoom from 1x to 5x (or enough to fill screen)
    const scale = useTransform(scrollYProgress, [0, 1], [1, 15]);
    const y = useTransform(scrollYProgress, [0, 1], [0, 500]); // Move down to center the book
    const opacity = useTransform(scrollYProgress, [0.9, 1], [1, 0]); // Fade out room at the very end

    // Trigger onEnter when scroll completes
    useEffect(() => {
        const unsubscribe = scrollYProgress.on("change", (v) => {
            if (v >= 0.99) {
                onEnter();
            }
        });
        return () => unsubscribe();
    }, [scrollYProgress, onEnter]);

    return (
        <div ref={containerRef} className={`relative z-50 bg-black transition-colors duration-1000 ${isLit ? "h-[300vh]" : "h-screen overflow-hidden"}`}>
            <div className="sticky top-0 h-screen w-full overflow-hidden perspective-1000">
                <Lightbulb onToggle={setIsLit} />

                {/* Flashlight Effect when bulb is off */}
                {!isLit && <FlashlightEffect />}

                {/* Darkness Overlay */}
                {/* Darkness Overlay - Only show when lit (fading out) or handle transition */}
                {/* Since FlashlightEffect handles the darkness when !isLit, we only need this overlay to handle the transition to light */}
                {isLit && (
                    <motion.div
                        initial={{ opacity: 1 }}
                        animate={{ opacity: 0 }}
                        transition={{ duration: 1.5 }}
                        className="absolute inset-0 bg-black z-40 pointer-events-none"
                    />
                )}

                {/* The Room Content */}
                <motion.div
                    className="relative w-full h-full flex items-center justify-center"
                    style={{ scale, y, opacity }}
                >
                    {/* The Table */}
                    <div className="relative w-[80vw] h-[40vh] bg-neutral-800 rounded-lg transform rotate-x-12 shadow-2xl flex items-center justify-center mt-40">
                        {/* Table Texture/Items */}
                        <div className="absolute top-4 left-4 w-20 h-24 bg-neutral-700 rounded rotate-12" />
                        <div className="absolute top-10 right-10 w-12 h-12 bg-neutral-600 rounded-full" />
                        <div className="absolute bottom-10 left-20 w-32 h-2 bg-neutral-500 rounded" />

                        {/* The Book on the table */}
                        <div className="w-[40vw] h-[50vh] bg-background rounded-r-2xl shadow-xl transform -rotate-x-12 scale-50 overflow-hidden border-l-4 border-neutral-700">
                            {/* This renders the Hero component (Cover) */}
                            <div className="w-full h-full pointer-events-none">
                                {children}
                            </div>
                        </div>
                    </div>
                </motion.div>

                {!isLit && (
                    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 text-sm animate-pulse">
                        Click the lightbulb to begin
                    </div>
                )}

                {isLit && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-[100] pointer-events-none"
                    >
                        <span className="text-white text-xs uppercase tracking-[0.2em] font-bold drop-shadow-md">Scroll to Enter</span>
                        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center p-1 shadow-lg bg-black/20 backdrop-blur-sm">
                            <motion.div
                                animate={{ y: [0, 12, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                                className="w-1 h-2 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)]"
                            />
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
}
