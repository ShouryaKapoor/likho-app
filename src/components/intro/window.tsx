"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, Cloud, Sun as SunIcon } from "lucide-react";

type TimeOfDay = "morning" | "day" | "evening" | "night";

export default function Window() {
    const [timeOfDay, setTimeOfDay] = useState<TimeOfDay>("day");
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const checkTime = () => {
            const hour = new Date().getHours();
            if (hour >= 5 && hour < 11) setTimeOfDay("morning");
            else if (hour >= 11 && hour < 17) setTimeOfDay("day");
            else if (hour >= 17 && hour < 20) setTimeOfDay("evening");
            else setTimeOfDay("night");
        };

        checkTime();
        const timer = setInterval(checkTime, 60000); // Check every minute
        return () => clearInterval(timer);
    }, []);

    const getGradient = () => {
        switch (timeOfDay) {
            case "morning": return "bg-gradient-to-b from-orange-200 via-sky-300 to-sky-400";
            case "day": return "bg-gradient-to-b from-sky-400 via-sky-300 to-sky-200";
            case "evening": return "bg-gradient-to-b from-indigo-900 via-purple-800 to-orange-500";
            case "night": return "bg-gradient-to-b from-slate-950 via-slate-900 to-slate-800";
        }
    };

    const getSunPosition = () => {
        switch (timeOfDay) {
            case "morning": return { top: "60%", right: "20%", scale: 0.8 };
            case "day": return { top: "15%", right: "15%", scale: 1 };
            case "evening": return { top: "70%", right: "30%", scale: 0.9 };
            default: return { top: "100%", right: "50%", scale: 0 }; // Hidden
        }
    };

    if (!mounted) return null;

    return (
        <div className="relative w-full h-full overflow-hidden">
            {/* Dynamic Sky Gradient */}
            <div className={`absolute inset-0 transition-colors duration-3000 ${getGradient()}`} />

            {/* --- CELESTIAL BODIES --- */}

            {/* SUN (Morning, Day, Evening) */}
            {timeOfDay !== "night" && (
                <motion.div
                    initial={false}
                    animate={getSunPosition()}
                    transition={{ duration: 2, ease: "easeInOut" }}
                    className="absolute z-10"
                >
                    <div className="relative flex items-center justify-center">
                        {/* Sun Core */}
                        <div className="w-20 h-20 bg-yellow-400 rounded-full shadow-[0_0_40px_rgba(255,200,0,0.8)] z-20" />

                        {/* Sun Rays/Beams - Rotating */}
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-0 z-10"
                        >
                            {[...Array(12)].map((_, i) => (
                                <div
                                    key={i}
                                    className="absolute top-1/2 left-1/2 w-32 h-1 bg-yellow-200/50 rounded-full origin-left"
                                    style={{
                                        transform: `translate(-50%, -50%) rotate(${i * 30}deg) translateX(20px)`,
                                    }}
                                />
                            ))}
                        </motion.div>

                        {/* Outer Glow/Halo */}
                        <div className="absolute w-40 h-40 bg-yellow-500/20 rounded-full blur-xl z-0" />
                    </div>
                </motion.div>
            )}

            {/* MOON (Night) */}
            {timeOfDay === "night" && (
                <motion.div
                    initial={{ top: "100%", opacity: 0 }}
                    animate={{ top: "15%", right: "15%", opacity: 1 }}
                    transition={{ duration: 2 }}
                    className="absolute z-10"
                >
                    <Moon className="w-16 h-16 text-yellow-100 drop-shadow-[0_0_20px_rgba(255,255,200,0.3)]" />
                </motion.div>
            )}

            {/* --- CLOUDS (All Day, fewer at night) --- */}
            <div className="absolute inset-0 z-20 overflow-hidden">
                {/* Generate multiple cloud layers */}
                {[...Array(timeOfDay === "night" ? 3 : 8)].map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{ x: -100, opacity: 0 }}
                        animate={{
                            x: ["-20%", "120%"],
                            opacity: [0, 0.8, 0.8, 0]
                        }}
                        transition={{
                            duration: 15 + Math.random() * 20,
                            repeat: Infinity,
                            ease: "linear",
                            delay: Math.random() * -20 // Start at random positions
                        }}
                        className="absolute"
                        style={{
                            top: `${Math.random() * 80}%`,
                            scale: 0.5 + Math.random() * 1.5,
                        }}
                    >
                        <Cloud
                            className={`w-16 h-16 ${timeOfDay === "night" ? "text-slate-600/50" :
                                    timeOfDay === "evening" ? "text-orange-100/60" : "text-white/80"
                                }`}
                        />
                    </motion.div>
                ))}
            </div>

            {/* --- STARS (Night only) --- */}
            {timeOfDay === "night" && (
                <div className="absolute inset-0 z-0">
                    {[...Array(20)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
                            style={{
                                top: `${Math.random() * 100}%`,
                                left: `${Math.random() * 100}%`,
                                animationDelay: `${Math.random() * 2}s`,
                                opacity: Math.random()
                            }}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
