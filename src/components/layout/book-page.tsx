"use client";

import { motion, MotionValue } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface BookPageProps {
    children: ReactNode;
    zIndex: number | MotionValue<number>;
    rotateX?: number | MotionValue<number>;
    rotateY?: number | MotionValue<number>;
    className?: string;
    frontContent?: ReactNode;
    backContent?: ReactNode;
}

export default function BookPage({
    children,
    zIndex,
    rotateY,
    className,
}: BookPageProps) {
    return (
        <motion.div
            style={{
                rotateY,
                zIndex,
                transformStyle: "preserve-3d",
                transformOrigin: "left center",
            }}
            className={cn(
                "absolute top-0 left-0 w-full h-full bg-background backface-hidden shadow-2xl border-r border-foreground/5",
                className
            )}
        >
            {/* Front of the page */}
            <div className="absolute inset-0 backface-hidden bg-background overflow-hidden">
                {children}
            </div>

            {/* Back of the page (optional styling) */}
            <div
                className="absolute inset-0 backface-hidden bg-secondary/80 overflow-hidden"
                style={{ transform: "rotateY(180deg)" }}
            />
        </motion.div>
    );
}
