"use client";

import { motion } from "framer-motion";
import { PenTool, Image as ImageIcon, MessageCircle, DollarSign } from "lucide-react";

const features = [
    {
        icon: <PenTool className="w-10 h-10" />,
        title: "Rich Text Editor",
        description: "Craft your masterpieces with our distraction-free, powerful editor designed for poets and storytellers.",
    },
    {
        icon: <ImageIcon className="w-10 h-10" />,
        title: "Multimedia Support",
        description: "Enhance your words with images, videos, and audio to create a truly immersive experience.",
    },
    {
        icon: <MessageCircle className="w-10 h-10" />,
        title: "Community Feedback",
        description: "Get valuable critiques, ratings, and comments from a community of passionate writers and readers.",
    },
    {
        icon: <DollarSign className="w-10 h-10" />,
        title: "Monetization",
        description: "Turn your passion into profit. Enable subscriptions or receive tips from your loyal fans.",
    },
];

export default function Features() {
    return (
        <section className="h-full py-20 bg-background text-foreground overflow-y-auto">
            <div className="container mx-auto px-4">
                <motion.h2
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-4xl md:text-6xl font-bold text-center mb-20"
                >
                    Features Built for <span className="text-accent">You</span>
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                            className="p-8 border border-foreground/10 rounded-2xl hover:bg-foreground/5 transition-colors group cursor-none"
                        >
                            <div className="mb-6 text-accent group-hover:scale-110 transition-transform duration-300">
                                {feature.icon}
                            </div>
                            <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                            <p className="text-muted-foreground text-lg">{feature.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
