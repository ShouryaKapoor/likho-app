"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function FlashlightEffect() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);

    // Smooth mouse movement for the light
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 25, stiffness: 150 };
    const springX = useSpring(mouseX, springConfig);
    const springY = useSpring(mouseY, springConfig);

    useEffect(() => {
        const updateMousePosition = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };

        window.addEventListener("mousemove", updateMousePosition);
        return () => window.removeEventListener("mousemove", updateMousePosition);
    }, [mouseX, mouseY]);

    return (
        <div className="fixed inset-0 z-[60] pointer-events-none overflow-hidden">
            {/* Dark Overlay with Flashlight Mask */}
            <motion.div
                className="absolute inset-0 bg-black/90"
                style={{
                    maskImage: `radial-gradient(circle 150px at ${mousePosition.x}px ${mousePosition.y}px, transparent 0%, black 100%)`,
                    WebkitMaskImage: `radial-gradient(circle 150px at ${mousePosition.x}px ${mousePosition.y}px, transparent 0%, black 100%)`,
                }}
            />

            {/* White-Grey Cursor Ring */}
            <motion.div
                className="absolute w-8 h-8 border-2 border-white/50 rounded-full z-[110]"
                style={{
                    x: springX,
                    y: springY,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
            >
                {/* Inner Glow */}
                <div className="absolute inset-0 bg-white/20 rounded-full blur-[2px]" />
            </motion.div>

            {/* Mini Particles Animation */}
            {[...Array(6)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-white/40 rounded-full"
                    style={{
                        x: springX,
                        y: springY,
                    }}
                    animate={{
                        x: [0, (Math.random() - 0.5) * 60],
                        y: [0, (Math.random() - 0.5) * 60],
                        opacity: [0, 1, 0],
                        scale: [0, 1.5, 0],
                    }}
                    transition={{
                        duration: 1 + Math.random(),
                        repeat: Infinity,
                        ease: "easeOut",
                        delay: Math.random() * 0.5,
                    }}
                />
            ))}
        </div>
    );
}
