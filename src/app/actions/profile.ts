"use server";

import { auth } from "@/auth";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function updateProfile(formData: FormData) {
    const session = await auth();
    if (!session?.user?.id) return { error: "Unauthorized" };

    const name = formData.get("name") as string;
    const bio = formData.get("bio") as string;
    const location = formData.get("location") as string;
    const website = formData.get("website") as string;

    try {
        await db.update(users).set({
            name,
            bio,
            location,
            website,
        }).where(eq(users.id, session.user.id));

        revalidatePath("/dashboard/settings");
        revalidatePath(`/profile/${session.user.id}`);

        return { success: "Profile updated successfully" };
    } catch (error) {
        console.error("Profile update error:", error);
        return { error: "Failed to update profile" };
    }
}
