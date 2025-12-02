"use client";

import { motion } from "framer-motion";
import { BookOpen, Heart, Eye } from "lucide-react";

const stats = [
    { label: "Total Views", value: "12.5k", icon: Eye, color: "text-blue-500" },
    { label: "Likes", value: "843", icon: Heart, color: "text-red-500" },
    { label: "Published", value: "24", icon: BookOpen, color: "text-green-500" },
];

const recentWorks = [
    { title: "The Midnight Symphony", type: "Poem", date: "2 days ago", views: 124 },
    { title: "Whispers in the Wind", type: "Story", date: "5 days ago", views: 89 },
    { title: "Urban Solitude", type: "Essay", date: "1 week ago", views: 456 },
];

export default function DashboardPage() {
    return (
        <div className="space-y-8">
            <header className="mb-8">
                <h1 className="text-4xl font-bold mb-2">Welcome back, Writer</h1>
                <p className="text-muted-foreground">Here's what's happening with your creative universe.</p>
            </header>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {stats.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="p-6 rounded-2xl bg-foreground/5 border border-foreground/10"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-muted-foreground">{stat.label}</span>
                                <Icon className={`w-6 h-6 ${stat.color}`} />
                            </div>
                            <div className="text-3xl font-bold">{stat.value}</div>
                        </motion.div>
                    );
                })}
            </div>

            {/* Recent Works */}
            <section>
                <h2 className="text-2xl font-bold mb-6">Recent Works</h2>
                <div className="space-y-4">
                    {recentWorks.map((work, index) => (
                        <motion.div
                            key={work.title}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 + index * 0.1 }}
                            className="p-4 rounded-xl bg-foreground/5 border border-foreground/10 flex items-center justify-between hover:bg-foreground/10 transition-colors cursor-pointer"
                        >
                            <div>
                                <h3 className="font-bold text-lg">{work.title}</h3>
                                <div className="flex gap-2 text-sm text-muted-foreground">
                                    <span>{work.type}</span>
                                    <span>•</span>
                                    <span>{work.date}</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 text-muted-foreground">
                                <Eye className="w-4 h-4" />
                                <span>{work.views}</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>
        </div>
    );
}
