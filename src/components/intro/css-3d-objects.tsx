"use client";

import { motion } from "framer-motion";

// Helper for a 3D Box
const Box = ({ w, h, d, color, className = "" }: { w: number; h: number; d: number; color: string; className?: string }) => {
    return (
        <div className={`relative transform-style-3d ${className}`} style={{ width: w, height: h }}>
            {/* Front */}
            <div className={`absolute inset-0 ${color} backface-hidden`} style={{ transform: `translateZ(${d / 2}px)` }} />
            {/* Back */}
            <div className={`absolute inset-0 ${color} backface-hidden`} style={{ transform: `rotateY(180deg) translateZ(${d / 2}px)` }} />
            {/* Right */}
            <div className={`absolute inset-y-0 right-0 ${color} brightness-90 backface-hidden origin-right`} style={{ width: d, transform: `rotateY(90deg)` }} />
            {/* Left */}
            <div className={`absolute inset-y-0 left-0 ${color} brightness-90 backface-hidden origin-left`} style={{ width: d, transform: `rotateY(-90deg)` }} />
            {/* Top */}
            <div className={`absolute inset-x-0 top-0 ${color} brightness-110 backface-hidden origin-top`} style={{ height: d, transform: `rotateX(90deg)` }} />
            {/* Bottom */}
            <div className={`absolute inset-x-0 bottom-0 ${color} brightness-75 backface-hidden origin-bottom`} style={{ height: d, transform: `rotateX(-90deg)` }} />
        </div>
    );
};

export const Laptop3D = () => {
    return (
        <div className="relative transform-style-3d group">
            {/* Base */}
            <Box w={200} h={12} d={140} color="bg-neutral-800" />

            {/* Screen (Hinged) */}
            <div className="absolute top-0 left-0 w-[200px] h-[12px] transform-style-3d origin-bottom transition-transform duration-500" style={{ transform: "rotateX(-100deg) translateY(-140px) translateZ(6px)" }}>
                {/* Lid Back */}
                <div className="absolute inset-0 bg-neutral-700 backface-hidden" style={{ height: 140, transform: "rotateX(180deg)" }} />
                {/* Screen Face */}
                <div className="absolute inset-0 bg-black backface-hidden border-8 border-neutral-800 flex items-center justify-center overflow-hidden" style={{ height: 140 }}>
                    <div className="w-full h-full p-2 text-[6px] font-mono text-green-500 opacity-80 leading-tight">
                        {`import { Future } from 'creativity';\n\nconst App = () => {\n  return <Life mode="awesome" />;\n};\n\n// Rendering dreams...`}
                    </div>
                </div>
            </div>
        </div>
    );
};

export const Monitor3D = () => {
    return (
        <div className="relative transform-style-3d">
            {/* Screen */}
            <div className="relative transform-style-3d">
                <Box w={300} h={180} d={10} color="bg-neutral-900" />
                {/* Display Content */}
                <div className="absolute inset-0 bg-neutral-950 border-8 border-neutral-900 flex items-center justify-center translate-z-[6px]">
                    <div className="w-full h-full bg-gradient-to-br from-blue-900/20 to-purple-900/20 flex items-center justify-center">
                        <div className="w-16 h-16 rounded-full bg-blue-500/20 blur-xl animate-pulse" />
                    </div>
                </div>
            </div>
            {/* Stand Neck */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full transform-style-3d">
                <Box w={20} h={60} d={10} color="bg-neutral-700" />
            </div>
            {/* Stand Base */}
            <div className="absolute bottom-[-60px] left-1/2 -translate-x-1/2 transform-style-3d">
                <Box w={100} h={10} d={60} color="bg-neutral-800" />
            </div>
        </div>
    );
};

export const CoffeeMug3D = () => {
    return (
        <div className="relative transform-style-3d">
            {/* Cup Body (Cylinder approximation with 8 sides) */}
            <div className="relative w-12 h-16 transform-style-3d">
                {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => (
                    <div
                        key={i}
                        className="absolute inset-0 w-full h-full bg-white border border-neutral-100"
                        style={{ transform: `rotateY(${deg}deg) translateZ(14px)`, width: 12 }}
                    />
                ))}
                {/* Coffee Liquid */}
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-8 h-8 bg-[#3e2723] rounded-full transform rotate-x-90" />
            </div>
            {/* Handle */}
            <div className="absolute top-4 right-[-10px] w-6 h-8 border-4 border-white rounded-r-lg transform rotate-y-90" />
        </div>
    );
};

export const BookStack3D = () => {
    return (
        <div className="relative transform-style-3d">
            <div className="transform translate-y-0 rotate-y-12">
                <Box w={140} h={20} d={100} color="bg-red-900" />
            </div>
            <div className="transform -translate-y-[20px] rotate-y-[-5deg]">
                <Box w={130} h={18} d={95} color="bg-blue-900" />
            </div>
            <div className="transform -translate-y-[38px] rotate-y-[8deg]">
                <Box w={120} h={15} d={90} color="bg-green-900" />
            </div>
        </div>
    );
};
