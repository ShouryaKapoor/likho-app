"use server";

import { auth } from "@/auth";
import { db } from "@/db";
import { posts } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createPost(prevState: any, formData: FormData) {
    const session = await auth();
    if (!session?.user?.id) return { error: "Unauthorized" };

    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const isPremium = formData.get("isPremium") === "on";

    console.log("[CREATE_POST] Attempting to create post:", { userId: session.user.id, title, contentLength: content?.length, isPremium });

    if (!title || !content) {
        console.log("[CREATE_POST] Missing title or content");
        return { error: "Title and content are required" };
    }

    try {
        await db.insert(posts).values({
            userId: session.user.id,
            title,
            content,
            excerpt: content.substring(0, 150) + "...",
            isPremium,
            type: "story", // Default for now
        });

        revalidatePath("/dashboard/explore");
        revalidatePath(`/profile/${session.user.id}`);
    } catch (error) {
        console.error("Create post error:", error);
        return { error: "Failed to create post" };
    }

    redirect("/dashboard/explore");
}

export async function deletePost(postId: string) {
    const session = await auth();
    if (!session?.user?.id) return { error: "Unauthorized" };

    try {
        const post = await db.query.posts.findFirst({
            where: (posts, { eq }) => eq(posts.id, postId),
        });

        if (!post) return { error: "Post not found" };

        if (post.userId !== session.user.id) {
            return { error: "Unauthorized" };
        }

        await db.delete(posts).where(eq(posts.id, postId));

        revalidatePath("/dashboard/content");
        revalidatePath("/dashboard/explore");
        revalidatePath(`/profile/${session.user.id}`);
        return { success: true };
    } catch (error) {
        console.error("Delete post error:", error);
        return { error: "Failed to delete post" };
    }
}
