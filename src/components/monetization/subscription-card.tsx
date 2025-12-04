"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

interface SubscriptionCardProps {
    title: string;
    price: string;
    features: string[];
    isPopular?: boolean;
}

export default function SubscriptionCard({ title, price, features, isPopular }: SubscriptionCardProps) {
    const handleSubscribe = () => {
        alert("Online payments are currently disabled. Please contact support to upgrade.");
    };

    return (
        <motion.div
            whileHover={{ y: -10 }}
            className={`p-8 rounded-3xl border ${isPopular ? "border-accent bg-accent/5" : "border-foreground/10 bg-foreground/5"} relative`}
        >
            {isPopular && (
                <div className="absolute top-0 right-0 bg-accent text-white text-xs font-bold px-3 py-1 rounded-bl-xl rounded-tr-2xl">
                    POPULAR
                </div>
            )}
            <h3 className="text-xl font-bold mb-2">{title}</h3>
            <div className="text-4xl font-bold mb-6">
                {price}<span className="text-lg font-normal text-muted-foreground">/mo</span>
            </div>
            <ul className="space-y-4 mb-8">
                {features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-3 text-sm">
                        <Check className="w-4 h-4 text-accent" />
                        {feature}
                    </li>
                ))}
            </ul>
            <button
                onClick={handleSubscribe}
                className={`w-full py-3 rounded-xl font-bold transition-colors ${isPopular ? "bg-accent text-white hover:bg-accent/90" : "bg-foreground text-background hover:bg-foreground/90"}`}
            >
                Choose Plan
            </button>
        </motion.div>
    );
}
