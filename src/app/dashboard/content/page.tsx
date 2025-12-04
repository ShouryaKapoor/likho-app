import { auth } from "@/auth";
import { db } from "@/db";
import { posts } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { FileText, Plus, Search } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import UserPostList from "@/components/dashboard/user-post-list";

export default async function ContentPage() {
    const session = await auth();
    if (!session?.user?.id) return redirect("/login");

    const userPosts = await db
        .select()
        .from(posts)
        .where(eq(posts.userId, session.user.id))
        .orderBy(desc(posts.createdAt));

    return (
        <div className="h-full flex flex-col">
            <header className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold mb-2">My Content</h1>
                    <p className="text-muted-foreground">Manage your stories, poems, and drafts.</p>
                </div>
                <div className="flex gap-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Search..."
                            className="bg-foreground/5 border border-foreground/10 rounded-xl py-2 pl-10 pr-4 outline-none focus:border-foreground/20 transition-colors"
                        />
                    </div>
                    <Link
                        href="/dashboard/write"
                        className="bg-foreground text-background px-4 py-2 rounded-xl font-medium hover:bg-foreground/90 transition-colors flex items-center gap-2"
                    >
                        <Plus className="w-4 h-4" />
                        New Project
                    </Link>
                </div>
            </header>

            {userPosts.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center p-12 border-2 border-dashed border-foreground/10 rounded-3xl bg-foreground/5">
                    <div className="w-20 h-20 rounded-full bg-foreground/10 flex items-center justify-center mb-6">
                        <FileText className="w-10 h-10 text-muted-foreground" />
                    </div>
                    <h2 className="text-2xl font-bold mb-2">No content yet</h2>
                    <p className="text-muted-foreground max-w-md mb-8">
                        Your library is looking a bit empty. Start writing your next masterpiece today.
                    </p>
                    <Link
                        href="/dashboard/write"
                        className="bg-foreground text-background px-8 py-4 rounded-xl font-bold text-lg hover:bg-foreground/90 transition-all hover:scale-105 flex items-center gap-2"
                    >
                        <Plus className="w-5 h-5" />
                        Start Writing
                    </Link>
                </div>
            ) : (
                <UserPostList posts={userPosts} />
            )}
        </div>
    );
}
