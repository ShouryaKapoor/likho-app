import { db } from "@/db";
import { posts, users } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import PostCard from "@/components/social/post-card";
import { auth } from "@/auth";

export default async function ExplorePage() {
    const session = await auth();
    const allPosts = await db
        .select({
            id: posts.id,
            title: posts.title,
            excerpt: posts.excerpt,
            isPremium: posts.isPremium,
            userId: posts.userId,
            authorName: users.name,
            authorImage: users.image,
        })
        .from(posts)
        .leftJoin(users, eq(posts.userId, users.id))
        .orderBy(desc(posts.createdAt));

    return (
        <div className="max-w-3xl mx-auto space-y-8 pb-20">
            <header className="mb-8">
                <h1 className="text-4xl font-bold mb-2">Explore</h1>
                <p className="text-muted-foreground">Discover stories, poems, and thoughts from the community.</p>
            </header>

            <div className="space-y-6">
                {allPosts.length > 0 ? (
                    allPosts.map((post) => (
                        <PostCard
                            key={post.id}
                            title={post.title}
                            excerpt={post.excerpt || ""}
                            author={post.authorName || "Unknown"}
                            likes={0}
                            comments={0}
                            rating={0}
                            isPremium={post.isPremium || false}
                            userId={post.userId}
                        />
                    ))
                ) : (
                    <div className="text-center py-12 text-muted-foreground bg-foreground/5 rounded-2xl">
                        <p>No posts yet. Be the first to write something!</p>
                    </div>
                )}
            </div>
        </div>
    );
}
