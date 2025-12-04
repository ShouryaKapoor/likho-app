"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { PenTool } from "lucide-react";

export default function Hero() {
    return (
        <section className="relative h-full w-full flex items-center justify-center overflow-hidden bg-background">
            <div className="absolute inset-0 z-0 opacity-20">
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 180, 360],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                    className="w-[800px] h-[800px] bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-3xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                />
                {/* Floating Shapes */}
                <motion.div
                    animate={{ y: [0, -20, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-20 left-20 w-12 h-12 border-4 border-accent/20 rounded-full"
                />
                <motion.div
                    animate={{ y: [0, 20, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="absolute bottom-20 right-20 w-16 h-16 bg-accent/10 rounded-lg rotate-12"
                />
            </div>

            <div className="relative z-10 text-center px-4 pt-10">
                <motion.h1
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="mb-8 py-4" // Added py-4 to prevent cropping
                >
                    <div className="flex items-center justify-center gap-6">
                        <span className="font-serif text-7xl md:text-9xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground via-accent to-foreground pb-4 leading-normal">
                            लिखो
                        </span>
                        <motion.div
                            initial={{ rotate: -45, scale: 0.8 }}
                            animate={{ rotate: 0, scale: 1 }}
                            transition={{ delay: 0.5, type: "spring" }}
                        >
                            <PenTool className="w-12 h-12 md:w-20 md:h-20 text-accent" />
                        </motion.div>
                    </div>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed"
                >
                    A crazy interactive platform for poets, storytellers, and dreamers.
                </motion.p>

                <Link href="/signup">
                    <motion.button
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ delay: 0.6, duration: 0.5 }}
                        className="px-8 py-4 bg-foreground text-background rounded-full text-lg font-medium hover:bg-foreground/90 transition-colors"
                    >
                        Start Writing
                    </motion.button>
                </Link>
            </div>
        </section>
    );
}
