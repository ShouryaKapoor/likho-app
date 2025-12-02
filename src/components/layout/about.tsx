"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function About() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
    const opacity = useTransform(scrollYProgress, [0, 0.3, 0.8, 1], [0, 1, 1, 0]);

    return (
        <section
            ref={containerRef}
            className="h-full flex items-center justify-center py-20 bg-foreground text-background relative overflow-hidden"
        >
            <div className="container mx-auto px-4 relative z-10">
                <motion.div style={{ y, opacity }} className="max-w-4xl mx-auto text-center">
                    <h2 className="text-5xl md:text-7xl font-bold mb-12 leading-tight">
                        Where Words Come <span className="text-accent italic">Alive</span>
                    </h2>
                    <p className="text-xl md:text-3xl leading-relaxed font-light">
                        We believe that every writer deserves a canvas as boundless as their imagination.
                        Our platform is designed to break the mold of traditional publishing, offering
                        a fluid, interactive space where your stories, poems, and thoughts can breathe.
                    </p>
                </motion.div>
            </div>

            {/* Decorative background elements */}
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-background rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent rounded-full blur-3xl" />
            </div>
        </section>
    );
}
