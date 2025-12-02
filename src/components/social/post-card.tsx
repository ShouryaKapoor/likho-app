"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, MessageCircle, Star, Lock } from "lucide-react";

interface PostCardProps {
    title: string;
    excerpt: string;
    author: string;
    likes: number;
    comments: number;
    rating: number;
    isPremium?: boolean;
}

export default function PostCard({ title, excerpt, author, likes, comments, rating, isPremium }: PostCardProps) {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-foreground/5 border border-foreground/10 rounded-2xl overflow-hidden hover:bg-foreground/10 transition-colors"
        >
            <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h3 className="text-xl font-bold mb-1">{title}</h3>
                        <p className="text-sm text-muted-foreground">by <span className="text-accent">{author}</span></p>
                    </div>
                    {isPremium && (
                        <div className="bg-accent/10 text-accent px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                            <Lock className="w-3 h-3" />
                            Premium
                        </div>
                    )}
                </div>

                <p className="text-muted-foreground mb-6 leading-relaxed">
                    {excerpt}
                    {!isExpanded && "..."}
                </p>

                <div className="flex items-center gap-6 text-sm text-muted-foreground">
                    <button className="flex items-center gap-2 hover:text-red-500 transition-colors">
                        <Heart className="w-4 h-4" />
                        {likes}
                    </button>
                    <button className="flex items-center gap-2 hover:text-blue-500 transition-colors">
                        <MessageCircle className="w-4 h-4" />
                        {comments}
                    </button>
                    <div className="flex items-center gap-2 text-yellow-500">
                        <Star className="w-4 h-4 fill-current" />
                        {rating.toFixed(1)}
                    </div>
                </div>
            </div>

            {/* Interactive Footer (Mock) */}
            <div className="bg-foreground/5 px-6 py-3 flex items-center justify-between">
                <input
                    type="text"
                    placeholder="Leave a review..."
                    className="bg-transparent text-sm outline-none w-full placeholder:text-muted-foreground/50"
                />
                <button className="text-xs font-bold text-accent uppercase tracking-wider hover:underline">
                    Post
                </button>
            </div>
        </motion.div>
    );
}
