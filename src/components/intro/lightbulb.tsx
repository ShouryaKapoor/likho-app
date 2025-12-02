"use client";

import { motion, useSpring, useMotionValue, useTransform } from "framer-motion";
import { useState } from "react";
import { Lightbulb as LucideBulb } from "lucide-react";

interface LightbulbProps {
    onToggle: (isOn: boolean) => void;
}

export default function Lightbulb({ onToggle }: LightbulbProps) {
    const [isOn, setIsOn] = useState(false);

    // Physics simulation for swinging
    const x = useMotionValue(0);
    const rotate = useTransform(x, [-100, 100], [-45, 45]);

    const handleClick = () => {
        const newState = !isOn;
        setIsOn(newState);
        onToggle(newState);
    };

    return (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center origin-top">
            {/* The Wire */}
            <motion.div
                style={{ rotate, height: 100 }}
                className="w-1 bg-foreground/50 origin-top relative"
                drag="x"
                dragConstraints={{ left: -50, right: 50 }}
                dragElastic={0.1}
                whileDrag={{ cursor: "grabbing" }}
            >
                {/* The Bulb */}
                <motion.button
                    onClick={handleClick}
                    className={`absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 ${isOn
                            ? "bg-yellow-400 shadow-[0_0_100px_rgba(250,204,21,0.6)]"
                            : "bg-neutral-800 border border-neutral-700"
                        }`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <LucideBulb className={`w-8 h-8 ${isOn ? "text-white" : "text-neutral-500"}`} />
                </motion.button>
            </motion.div>
        </div>
    );
}
