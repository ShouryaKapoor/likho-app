"use client";

import { useActionState } from "react";
import { updateProfile } from "@/app/actions/profile";
import { User } from "next-auth";

const initialState = {
    message: "",
    error: "",
};

export default function ProfileForm({ user }: { user: User & { bio?: string | null, location?: string | null, website?: string | null } }) {
    const [state, formAction, isPending] = useActionState(async (prevState: any, formData: FormData) => {
        const result = await updateProfile(formData);
        if (result.error) return { error: result.error, message: "" };
        return { message: result.success, error: "" };
    }, initialState);

    return (
        <form action={formAction} className="space-y-6 max-w-2xl">
            {state?.error && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-xl text-sm">
                    {state.error}
                </div>
            )}
            {state?.message && (
                <div className="p-4 bg-green-500/10 border border-green-500/20 text-green-500 rounded-xl text-sm">
                    {state.message}
                </div>
            )}

            <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-bold">Display Name</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    defaultValue={user.name || ""}
                    className="w-full p-3 rounded-xl bg-foreground/5 border border-foreground/10 focus:outline-none focus:border-accent transition-colors"
                />
            </div>

            <div className="space-y-2">
                <label htmlFor="bio" className="text-sm font-bold">Bio</label>
                <textarea
                    id="bio"
                    name="bio"
                    rows={4}
                    defaultValue={user.bio || ""}
                    className="w-full p-3 rounded-xl bg-foreground/5 border border-foreground/10 focus:outline-none focus:border-accent transition-colors resize-none"
                    placeholder="Tell your story..."
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label htmlFor="location" className="text-sm font-bold">Location</label>
                    <input
                        type="text"
                        id="location"
                        name="location"
                        defaultValue={user.location || ""}
                        className="w-full p-3 rounded-xl bg-foreground/5 border border-foreground/10 focus:outline-none focus:border-accent transition-colors"
                        placeholder="City, Country"
                    />
                </div>
                <div className="space-y-2">
                    <label htmlFor="website" className="text-sm font-bold">Website</label>
                    <input
                        type="url"
                        id="website"
                        name="website"
                        defaultValue={user.website || ""}
                        className="w-full p-3 rounded-xl bg-foreground/5 border border-foreground/10 focus:outline-none focus:border-accent transition-colors"
                        placeholder="https://your-site.com"
                    />
                </div>
            </div>

            <button
                type="submit"
                disabled={isPending}
                className="px-8 py-3 bg-accent text-white rounded-xl font-bold hover:bg-accent/90 transition-colors disabled:opacity-50"
            >
                {isPending ? "Saving..." : "Save Changes"}
            </button>
        </form>
    );
}
