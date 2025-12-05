"use client";

import { useRef, useState, useEffect } from "react";
import NextImage from "next/image";
import { useScroll, useTransform, motion, useSpring, useMotionValue, animate } from "framer-motion";
import BookPage from "./book-page";
import Lightbulb from "../intro/lightbulb";
import Window from "../intro/window";
import Clock from "../intro/clock";
import SwipePrompt from "./swipe-prompt";
import deskBg from "@/assets/images/desk-background.png";
import mobileBg from "@/assets/images/mobile-background.jpg";

// --- CONFIGURATION: EDIT THESE VALUES TO ALIGN THE BOOK ---
const LAPTOP_CONFIG = {
    scale: 0.19,    // Size of the book (0.1 = 10% of full size)
    rotateX: 0,     // Tilt angle in degrees (match the laptop screen tilt)
    y: -70,         // Vertical position (Positive = Down, Negative = Up)
    x: 4.0          // Horizontal position (Positive = Right, Negative = Left)
};

// --- MOBILE CONFIGURATION: ALIGN CONTENT ON PHONE SCREEN ---
const MOBILE_CONFIG = {
    scale: 0.2,    // Smaller scale for phone screen
    rotateX: 0,
    y: 90,          // Lower down to match phone position in hand
    x: 29            // Centered
};

// --- CONFIGURATION: EDIT THESE VALUES TO ALIGN THE CLOCK ---
const CLOCK_CONFIG = {
    bottom: "46.5%",  // Vertical position from bottom
    right: "19.2%",   // Horizontal position from right
    width: "8%",    // Width relative to screen
    height: "8%",   // Height relative to screen
    scale: 1,       // Size multiplier
    rotate: 10,      // Rotation in degrees
    skewX: 0,       // Horizontal skew in degrees
    skewY: 0        // Vertical skew in degrees
};

// --- CONFIGURATION: EDIT THESE VALUES TO ALIGN THE WINDOW ---
const WINDOW_CONFIG = {
    top: "0.8%",      // Vertical position from top
    right: "-7.7%",    // Horizontal position from right
    width: "19%",   // Width relative to screen
    height: "45%",  // Height relative to screen
    opacity: 1,   // Transparency (0.0 to 1.0)
    scale: 1.5,       // Size multiplier
    rotate: 11,      // Rotation in degrees
    skewX: 0,       // Horizontal skew in degrees
    skewY: 11        // Vertical skew in degrees
};

interface BookContainerProps {
    cover: React.ReactNode;
    page1: React.ReactNode;
    page2: React.ReactNode;
    page3: React.ReactNode;
}

export default function BookContainer({ cover, page1, page2, page3 }: BookContainerProps) {
    const [isLit, setIsLit] = useState(false);
    const [isReady, setIsReady] = useState(false); // New state to delay animation start
    const containerRef = useRef<HTMLDivElement>(null);
    const [isMobile, setIsMobile] = useState(false);

    // Mobile Navigation State
    const [mobileStep, setMobileStep] = useState(0); // 0: Laptop, 1: Reading (Cover), 2: Page 1, 3: Page 2
    const mobileProgress = useMotionValue(0);

    // Detect Mobile
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    // Use global page scroll instead of element target to avoid layout shift calculation errors
    const { scrollYProgress: rawScrollYProgress } = useScroll();

    // Smooth out the scroll progress to prevent jumpiness and initial glitches
    const smoothScrollYProgress = useSpring(rawScrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    // Unified Progress Value (Switches between Scroll and Manual Mobile State)
    const progress = isMobile ? mobileProgress : smoothScrollYProgress;

    // Mobile Step Logic
    useEffect(() => {
        if (isMobile) {
            // Map steps to progress values
            // 0: Laptop -> 0
            // 1: Reading -> 0.4 (Start of reading phase)
            // 2: Page 1 -> 0.7 (Mid reading)
            // 3: Page 2 -> 1.0 (End)
            const target = mobileStep === 0 ? 0 :
                mobileStep === 1 ? 0.4 :
                    mobileStep === 2 ? 0.7 : 1.0;

            animate(mobileProgress, target, {
                duration: 0.8,
                ease: "easeInOut"
            });
        }
    }, [mobileStep, isMobile, mobileProgress]);

    // Handle Swipe
    const handleSwipe = (event: any, info: any) => {
        if (!isMobile || !isLit) return;

        const swipeThreshold = 50;
        if (info.offset.y < -swipeThreshold) {
            // Swipe Up (Next)
            if (mobileStep < 3) setMobileStep(prev => prev + 1);
        } else if (info.offset.y > swipeThreshold) {
            // Swipe Down (Prev)
            if (mobileStep > 0) setMobileStep(prev => prev - 1);
        }
    };

    // --- SCROLL MAPPING ---
    // 0.0 -> 0.2: ZOOM PHASE (Laptop -> Full Screen)
    // 0.2 -> 0.4: HOLD PHASE (Stable for clicking button - Widened for better UX)
    // 0.4 -> 1.0: READING PHASE (Page Flips)

    // Background Zoom (Simulate camera moving in)
    const bgScale = useTransform(progress, [0, 0.2], [1, 2.5]); // Deep zoom into laptop
    const bgOpacity = useTransform(progress, [0.15, 0.2], [1, 0]); // Fade out bg as we get close

    // Background Position (Center on Laptop)
    // We need to shift the background so the laptop stays central as we zoom
    const bgY = useTransform(progress, [0, 0.2], ["0%", "10%"]);

    // Book Zoom (From Laptop Screen to Full Screen)
    // Uses the LAPTOP_CONFIG values for the initial state
    const scale = useTransform(progress, [0, 0.2], [isMobile ? MOBILE_CONFIG.scale : LAPTOP_CONFIG.scale, 1]);
    const rotateX = useTransform(progress, [0, 0.2], [isMobile ? MOBILE_CONFIG.rotateX : LAPTOP_CONFIG.rotateX, 0]);
    const y = useTransform(progress, [0, 0.2], [isMobile ? MOBILE_CONFIG.y : LAPTOP_CONFIG.y, 0]);
    const x = useTransform(progress, [0, 0.2], [isMobile ? MOBILE_CONFIG.x : LAPTOP_CONFIG.x, 0]);

    // Room Opacity (Fade out room as we zoom in)
    const roomOpacity = useTransform(progress, [0.15, 0.2], [1, 0]);

    // Page Flip Transforms (Start after HOLD phase at 0.4)
    const coverRotateY = useTransform(progress, [0.4, 0.6], [0, -180]);
    const page1RotateY = useTransform(progress, [0.6, 0.8], [0, -180]);
    const page2RotateY = useTransform(progress, [0.8, 1.0], [0, -180]);

    // Z-Index Management (Switch at 90deg to avoid clipping)
    const coverZ = useTransform(progress, [0.4, 0.5, 0.501, 0.6], [40, 40, 0, 0]);
    const page1Z = useTransform(progress, [0.6, 0.7, 0.701, 0.8], [30, 30, 10, 10]);
    const page2Z = useTransform(progress, [0.8, 0.9, 0.901, 1.0], [20, 20, 10, 10]);

    // Force scroll to top on mount to ensure sequence starts correctly
    useEffect(() => {
        if (history.scrollRestoration) {
            history.scrollRestoration = "manual";
        }
        window.scrollTo(0, 0);
    }, []);

    // Lock body scroll when not lit OR when on mobile (to prevent native scroll)
    useEffect(() => {
        if (!isLit || isMobile) {
            document.body.style.overflow = "hidden";
            if (!isMobile) window.scrollTo(0, 0);
        } else {
            document.body.style.overflow = "auto";
        }
    }, [isLit, isMobile]);

    const handleToggle = (val: boolean) => {
        if (val) {
            setIsLit(true);
            // Small delay to allow layout to update and scroll to reset
            setTimeout(() => {
                setIsReady(true);
            }, 100);
        } else {
            setIsLit(false);
            setIsReady(false);
            setMobileStep(0); // Reset mobile step
        }
    };

    // Helper to determine if we should use scroll values or static initial values
    const showScrollState = isLit && isReady;

    return (
        <div
            ref={containerRef}
            className={`relative bg-neutral-900 transition-all duration-1000 ${isMobile ? "h-screen overflow-hidden" : "h-[500vh]"}`}
        >
            {isMobile && isLit && <SwipePrompt />}

            <motion.div
                className="sticky top-0 h-screen w-full flex items-center justify-center perspective-2000 overflow-hidden"
                onPanEnd={handleSwipe}
            >

                {/* --- SCENE 1: THE ROOM (Background) --- */}
                <motion.div
                    style={{ opacity: isLit ? roomOpacity : 1 }}
                    className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none"
                >
                    {/* Background Image - Custom User Desk */}
                    <motion.div
                        style={{ scale: isLit ? bgScale : 1, y: isLit ? bgY : 0, opacity: isLit ? bgOpacity : 1 }}
                        className="absolute inset-0 z-0 origin-center"
                    >
                        <NextImage
                            src={isMobile ? mobileBg : deskBg}
                            alt="Creative Desk"
                            fill
                            className="object-cover"
                            priority
                            placeholder="blur"
                        />

                        {/* --- DYNAMIC OVERLAYS --- */}

                        {/* Window Overlay (Right Side) - HIDDEN ON MOBILE */}
                        <div
                            className="hidden md:block absolute overflow-hidden rounded-lg z-10"
                            style={{
                                top: WINDOW_CONFIG.top,
                                right: WINDOW_CONFIG.right,
                                width: WINDOW_CONFIG.width,
                                height: WINDOW_CONFIG.height,
                                opacity: WINDOW_CONFIG.opacity,
                                transform: `scale(${WINDOW_CONFIG.scale}) rotate(${WINDOW_CONFIG.rotate}deg) skew(${WINDOW_CONFIG.skewX}deg, ${WINDOW_CONFIG.skewY}deg)`
                            }}
                        >
                            <Window />
                        </div>

                        {/* Clock Overlay (Right Desk) - HIDDEN ON MOBILE */}
                        <div
                            className="hidden md:flex absolute items-center justify-center z-10"
                            style={{
                                bottom: CLOCK_CONFIG.bottom,
                                right: CLOCK_CONFIG.right,
                                width: CLOCK_CONFIG.width,
                                height: CLOCK_CONFIG.height,
                                transform: `rotate(${CLOCK_CONFIG.rotate}deg) skew(${CLOCK_CONFIG.skewX}deg, ${CLOCK_CONFIG.skewY}deg)`
                            }}
                        >
                            <div style={{ transform: `scale(${CLOCK_CONFIG.scale})` }}>
                                <Clock />
                            </div>
                        </div>

                        {/* Vignette Overlay for focus */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/40 pointer-events-none" />
                    </motion.div>

                    {/* Lightbulb - High Z-index to be clickable */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 z-[60] pointer-events-auto">
                        <Lightbulb onToggle={handleToggle} />
                    </div>

                    {/* Darkness Overlay - Blocks clicks when visible */}
                    <motion.div
                        animate={{ opacity: isLit ? 0 : 1 }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                        className={`absolute inset-0 bg-black z-40 ${isLit ? "pointer-events-none" : "pointer-events-auto"}`}
                    />
                </motion.div>


                {/* --- SCENE 2: THE BOOK (Foreground) --- */}
                <motion.div
                    className="relative w-[90vw] md:w-[80vw] h-[85vh] md:h-[90vh] bg-background shadow-2xl rounded-r-2xl z-50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isLit ? 1 : 0 }}
                    transition={{ duration: 1 }}
                    style={{
                        scale: showScrollState ? scale : LAPTOP_CONFIG.scale,
                        rotateX: showScrollState ? rotateX : LAPTOP_CONFIG.rotateX,
                        y: showScrollState ? y : LAPTOP_CONFIG.y,
                        x: showScrollState ? x : LAPTOP_CONFIG.x,
                        transformStyle: "preserve-3d",
                    }}
                >
                    {/* Static Last Page (Page 3 / Contact) */}
                    <div className="absolute inset-0 z-0 bg-background rounded-r-2xl overflow-hidden">
                        {page3}
                    </div>

                    {/* Page 2 (Features) */}
                    <BookPage
                        zIndex={showScrollState ? page2Z : 20}
                        rotateY={showScrollState ? page2RotateY : 0}
                        className="rounded-r-2xl"
                    >
                        {page2}
                    </BookPage>

                    {/* Page 1 (About) */}
                    <BookPage
                        zIndex={showScrollState ? page1Z : 30}
                        rotateY={showScrollState ? page1RotateY : 0}
                        className="rounded-r-2xl"
                    >
                        {page1}
                    </BookPage>

                    {/* Cover (Hero) */}
                    <BookPage
                        zIndex={showScrollState ? coverZ : 40}
                        rotateY={showScrollState ? coverRotateY : 0}
                        className="rounded-r-2xl border-l-8 border-l-neutral-800"
                    >
                        {cover}
                    </BookPage>
                </motion.div>

                {/* Helper Text */}
                {!isLit && (
                    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 text-sm animate-pulse z-[60] pointer-events-none">
                        Click the lightbulb to begin
                    </div>
                )}
            </motion.div>
        </div>
    );
}
