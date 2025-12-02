"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function BookWrapper({ children }: { children: React.ReactNode }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    // 3D rotation effect
    const rotateX = useTransform(scrollYProgress, [0, 0.2], [0, 10]);
    const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);
    const perspective = useTransform(scrollYProgress, [0, 1], [1000, 800]);

    return (
        <div ref={containerRef} className="relative min-h-[200vh] perspective-1000">
            <motion.div
                style={{
                    rotateX,
                    scale,
                    perspective,
                    transformStyle: "preserve-3d",
                }}
                className="sticky top-0 h-screen w-full overflow-hidden origin-top bg-background shadow-2xl"
            >
                {children}
            </motion.div>
        </div>
    );
}
