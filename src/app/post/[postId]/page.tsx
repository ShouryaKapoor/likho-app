import { db } from "@/db";
import { posts, users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound, redirect } from "next/navigation";
import { auth } from "@/auth";
import Link from "next/link";
import { Lock } from "lucide-react";

export default async function PostPage({ params }: { params: Promise<{ postId: string }> }) {
    const { postId } = await params;
    const session = await auth();

    const [post] = await db
        .select({
            id: posts.id,
            title: posts.title,
            content: posts.content,
            isPremium: posts.isPremium,
            authorName: users.name,
            authorId: users.id,
        })
        .from(posts)
        .leftJoin(users, eq(posts.userId, users.id))
        .where(eq(posts.id, postId));

    if (!post) {
        notFound();
    }

    // Check for access
    let hasAccess = true;
    if (post.isPremium) {
        if (!session?.user?.id) {
            hasAccess = false;
        } else {
            const [user] = await db.select().from(users).where(eq(users.id, session.user.id));
            // Check if user has a paid subscription (Creative or Literary)
            // Assuming "Free" is the default free tier
            if (user?.subscriptionTier === "Free" && post.authorId !== session.user.id) {
                hasAccess = false;
            }
        }
    }

    return (
        <div className="max-w-3xl mx-auto py-12 px-6 pb-20">
            <header className="mb-8 border-b border-foreground/10 pb-8">
                <div className="flex justify-between items-start mb-4">
                    <h1 className="text-4xl font-bold">{post.title}</h1>
                    {post.isPremium && (
                        <div className="bg-accent/10 text-accent px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 flex-shrink-0">
                            <Lock className="w-3 h-3" />
                            Premium
                        </div>
                    )}
                </div>
                <p className="text-muted-foreground">
                    Written by <Link href={`/profile/${post.authorId}`} className="text-accent hover:underline">{post.authorName}</Link>
                </p>
            </header>

            {hasAccess ? (
                <article className="prose prose-invert max-w-none">
                    <div dangerouslySetInnerHTML={{ __html: post.content }} />
                </article>
            ) : (
                <div className="bg-foreground/5 border border-foreground/10 rounded-2xl p-12 text-center space-y-6">
                    <Lock className="w-12 h-12 text-accent mx-auto" />
                    <h2 className="text-2xl font-bold">This story is for Premium Members only</h2>
                    <p className="text-muted-foreground max-w-md mx-auto">
                        Upgrade your subscription to unlock this story and support the author.
                    </p>
                    <Link
                        href="/dashboard/subscription"
                        className="inline-block px-8 py-3 bg-accent text-white rounded-xl font-bold hover:bg-accent/90 transition-colors"
                    >
                        Upgrade Membership
                    </Link>
                </div>
            )}
        </div>
    );
}
