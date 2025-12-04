import { auth } from "@/auth";
import { db } from "@/db";
import { posts } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import DashboardContent from "@/components/dashboard/dashboard-content";

export default async function DashboardPage() {
    const session = await auth();
    const user = session?.user;

    if (!user) {
        redirect("/login");
    }

    const allPosts = await db
        .select()
        .from(posts)
        .where(eq(posts.userId, user.id!));

    const totalViews = allPosts.reduce((acc, post) => acc + (post.views || 0), 0);
    const totalLikes = allPosts.reduce((acc, post) => acc + (post.likesCount || 0), 0);
    const totalWords = allPosts.reduce((acc, post) => acc + (post.content.split(/\s+/).length || 0), 0);
    const readingTimeHours = Math.round(totalWords / 200 / 60); // 200 wpm, converted to hours

    const recentWorks = allPosts
        .sort((a, b) => (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0))
        .slice(0, 5)
        .map(post => ({
            id: post.id,
            title: post.title,
            type: post.type,
            createdAt: post.createdAt,
            isPremium: post.isPremium,
            views: post.views || 0,
        }));

    return (
        <DashboardContent
            user={{ name: user.name }}
            recentWorks={recentWorks}
            stats={{
                totalViews,
                totalLikes,
                publishedCount: allPosts.length,
                readingTimeHours
            }}
        />
    );
}
