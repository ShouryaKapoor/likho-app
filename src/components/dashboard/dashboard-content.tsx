"use client";

import { motion } from "framer-motion";
import { BookOpen, Heart, Eye, TrendingUp, Calendar, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface DashboardContentProps {
    user: {
        name?: string | null;
    };
    recentWorks: {
        id: string;
        title: string;
        type: string | null;
        createdAt: Date | null;
        isPremium: boolean | null;
        views: number;
    }[];
    stats: {
        totalViews: number;
        totalLikes: number;
        publishedCount: number;
        readingTimeHours: number;
    };
}

export default function DashboardContent({ user, recentWorks, stats }: DashboardContentProps) {
    const realStats = [
        { label: "Total Views", value: stats.totalViews.toLocaleString(), change: "+0%", icon: Eye, color: "text-blue-500", bg: "bg-blue-500/10" },
        { label: "Total Likes", value: stats.totalLikes.toLocaleString(), change: "+0%", icon: Heart, color: "text-red-500", bg: "bg-red-500/10" },
        { label: "Published", value: stats.publishedCount.toString(), change: "+1", icon: BookOpen, color: "text-green-500", bg: "bg-green-500/10" },
        { label: "Reading Time", value: `${stats.readingTimeHours}h`, change: "+0%", icon: TrendingUp, color: "text-purple-500", bg: "bg-purple-500/10" },
    ];

    const [currentDate, setCurrentDate] = useState("");

    useEffect(() => {
        setCurrentDate(new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }));
    }, []);

    return (
        <div className="space-y-8 pb-10">
            <header className="flex items-center justify-between">
                <div>
                    <h1 className="text-4xl font-bold mb-2 font-serif">Welcome back, {user?.name || "Writer"}</h1>
                    <p className="text-muted-foreground">Here's what's happening with your creative universe today.</p>
                </div>
                <div className="text-right hidden md:block">
                    <p className="text-sm text-muted-foreground">{currentDate}</p>
                </div>
            </header>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {realStats.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="p-6 rounded-2xl bg-foreground/5 border border-foreground/10 hover:border-foreground/20 transition-colors"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className={`p-3 rounded-xl ${stat.bg}`}>
                                    <Icon className={`w-5 h-5 ${stat.color}`} />
                                </div>
                                {/* <span className="text-xs font-medium text-green-500 bg-green-500/10 px-2 py-1 rounded-full">{stat.change}</span> */}
                            </div>
                            <div className="text-3xl font-bold mb-1">{stat.value}</div>
                            <div className="text-sm text-muted-foreground">{stat.label}</div>
                        </motion.div>
                    );
                })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Works */}
                <section className="lg:col-span-2">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold">Recent Works</h2>
                        <Link href="/dashboard/explore" className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors">
                            View All <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                    <div className="space-y-4">
                        {recentWorks.length > 0 ? (
                            recentWorks.map((work, index) => (
                                <Link href={`/post/${work.id}`} key={work.id}>
                                    <motion.div
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.3 + index * 0.1 }}
                                        className="group p-4 rounded-2xl bg-foreground/5 border border-foreground/10 flex items-center justify-between hover:bg-foreground/10 transition-all cursor-pointer mb-4"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-xl bg-background flex items-center justify-center text-xl font-serif font-bold text-muted-foreground group-hover:text-foreground transition-colors">
                                                {work.title.charAt(0)}
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-lg group-hover:text-accent transition-colors">{work.title}</h3>
                                                <div className="flex gap-3 text-sm text-muted-foreground">
                                                    <span className="flex items-center gap-1 capitalize"><BookOpen className="w-3 h-3" /> {work.type || "Story"}</span>
                                                    <span>•</span>
                                                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {work.createdAt ? new Date(work.createdAt).toLocaleDateString() : "Unknown"}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-6">
                                            <div className="hidden md:flex items-center gap-2 text-muted-foreground">
                                                <Eye className="w-4 h-4" />
                                                <span>{work.views}</span>
                                            </div>
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${work.isPremium ? "bg-yellow-500/10 text-yellow-500" : "bg-green-500/10 text-green-500"
                                                }`}>
                                                {work.isPremium ? "Premium" : "Public"}
                                            </span>
                                        </div>
                                    </motion.div>
                                </Link>
                            ))
                        ) : (
                            <div className="text-center py-10 text-muted-foreground">
                                <p>No works yet. Start writing!</p>
                            </div>
                        )}
                    </div>
                </section>

                {/* Quick Actions / Inspiration */}
                <section>
                    <h2 className="text-2xl font-bold mb-6">Quick Actions</h2>
                    <div className="space-y-4">
                        <Link href="/dashboard/write">
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                className="p-6 rounded-2xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-purple-500/20 cursor-pointer mb-4"
                            >
                                <h3 className="font-bold text-lg mb-2">Publish a new post</h3>
                                <p className="text-sm text-muted-foreground mb-4">Share your thoughts with the world.</p>
                                <span className="text-sm font-bold text-purple-400 flex items-center gap-2">
                                    Create Now <ArrowRight className="w-4 h-4" />
                                </span>
                            </motion.div>
                        </Link>

                        <div className="p-6 rounded-2xl bg-foreground/5 border border-foreground/10">
                            <h3 className="font-bold text-lg mb-4">Daily Inspiration</h3>
                            <p className="italic text-muted-foreground mb-4">"The scariest moment is always just before you start."</p>
                            <p className="text-sm font-bold text-right">— Stephen King</p>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
