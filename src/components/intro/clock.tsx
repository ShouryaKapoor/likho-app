"use client";

import { useState, useEffect } from "react";

export default function Clock() {
    const [time, setTime] = useState<Date | null>(null);

    useEffect(() => {
        setTime(new Date());
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    if (!time) return null;

    return (
        <div className="flex items-center justify-center">
            <div className="font-mono text-red-500/90 text-sm font-bold tracking-widest drop-shadow-[0_0_2px_rgba(239,68,68,0.8)]">
                {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
        </div>
    );
}
