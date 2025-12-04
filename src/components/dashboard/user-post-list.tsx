"use client";

import { motion } from "framer-motion";
import { FileText, Trash2 } from "lucide-react";
import Link from "next/link";
import { deletePost } from "@/app/actions/post";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Post {
    id: string;
    title: string;
    excerpt: string | null;
    createdAt: Date | null;
    isPremium: boolean | null;
}

export default function UserPostList({ posts }: { posts: Post[] }) {
    const router = useRouter();
    const [deletingId, setDeletingId] = useState<string | null>(null);

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this post?")) return;

        setDeletingId(id);
        const result = await deletePost(id);
        setDeletingId(null);

        if (result.error) {
            alert(result.error);
        } else {
            router.refresh();
        }
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post, index) => (
                <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="group relative bg-foreground/5 rounded-2xl p-6 hover:bg-foreground/10 transition-colors border border-transparent hover:border-foreground/10"
                >
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-background rounded-xl">
                            <FileText className="w-6 h-6 text-foreground" />
                        </div>
                        <button
                            onClick={() => handleDelete(post.id)}
                            disabled={deletingId === post.id}
                            className="p-2 hover:bg-red-500/10 hover:text-red-500 rounded-lg transition-colors disabled:opacity-50"
                            title="Delete post"
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>
                    </div>

                    <h3 className="text-xl font-bold mb-2 line-clamp-1">{post.title}</h3>
                    <p className="text-muted-foreground mb-4 line-clamp-2 text-sm">
                        {post.excerpt || "No excerpt available"}
                    </p>

                    <div className="flex items-center justify-between text-xs text-muted-foreground mt-auto">
                        <span>
                            {post.createdAt
                                ? new Date(post.createdAt).toLocaleDateString()
                                : "Unknown date"}
                        </span>
                        {post.isPremium && (
                            <span className="bg-yellow-500/10 text-yellow-600 px-2 py-1 rounded-full font-medium">
                                Premium
                            </span>
                        )}
                    </div>
                </motion.div>
            ))}
        </div>
    );
}
