import { db } from "@/db";
import { users, posts } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { notFound } from "next/navigation";
import Image from "next/image";
import PostCard from "@/components/social/post-card";

export default async function ProfilePage({ params }: { params: Promise<{ userId: string }> }) {
    const { userId } = await params;

    const [user] = await db.select().from(users).where(eq(users.id, userId));

    if (!user) {
        notFound();
    }

    const userPosts = await db
        .select()
        .from(posts)
        .where(eq(posts.userId, userId))
        .orderBy(desc(posts.createdAt));

    return (
        <div className="min-h-screen bg-background text-foreground pb-20">
            {/* Header / Cover */}
            <div className="h-64 bg-gradient-to-r from-neutral-900 to-neutral-800 relative">
                <div className="absolute -bottom-16 left-8 md:left-16 flex items-end gap-6">
                    <div className="w-32 h-32 rounded-full border-4 border-background bg-neutral-700 overflow-hidden relative">
                        <Image
                            src={user.image || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`}
                            alt={user.name || "User"}
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div className="mb-4">
                        <h1 className="text-3xl font-bold">{user.name}</h1>
                        <p className="text-muted-foreground">@{user.name?.toLowerCase().replace(/\s+/g, "")}</p>
                    </div>
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-8 md:px-16 pt-24">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {/* Sidebar Info */}
                    <div className="space-y-6">
                        {user.bio && (
                            <div>
                                <h3 className="font-bold mb-2">About</h3>
                                <p className="text-muted-foreground leading-relaxed">{user.bio}</p>
                            </div>
                        )}

                        {(user.location || user.website) && (
                            <div className="space-y-2 text-sm text-muted-foreground">
                                {user.location && <div>📍 {user.location}</div>}
                                {user.website && <a href={user.website} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">🔗 {user.website}</a>}
                            </div>
                        )}

                        <div className="pt-6 border-t border-foreground/10">
                            <div className="flex justify-between text-sm mb-2">
                                <span>Joined</span>
                                <span>{new Date().toLocaleDateString()}</span> {/* Placeholder for joined date if not in DB */}
                            </div>
                            <div className="flex justify-between text-sm">
                                <span>Subscription</span>
                                <span className="capitalize text-accent">{user.subscriptionTier || "Free"}</span>
                            </div>
                        </div>
                    </div>

                    {/* Main Content (Posts) */}
                    <div className="md:col-span-2 space-y-8">
                        <h2 className="text-2xl font-bold border-b border-foreground/10 pb-4">Published Works</h2>

                        {userPosts.length > 0 ? (
                            <div className="space-y-6">
                                {userPosts.map((post) => (
                                    <PostCard
                                        key={post.id}
                                        id={post.id}
                                        userId={user.id}
                                        title={post.title}
                                        excerpt={post.excerpt || ""}
                                        author={user.name || "Unknown"}
                                        likes={0} // Placeholder
                                        comments={0} // Placeholder
                                        rating={0} // Placeholder
                                        isPremium={post.isPremium || false}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12 text-muted-foreground bg-foreground/5 rounded-2xl">
                                <p>No published works yet.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
