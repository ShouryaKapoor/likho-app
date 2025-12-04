import { auth } from "@/auth";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import ProfileForm from "@/components/dashboard/profile-form";

export default async function SettingsPage() {
    const session = await auth();
    if (!session?.user?.id) return null;

    const [user] = await db.select().from(users).where(eq(users.id, session.user.id));

    return (
        <div className="max-w-5xl mx-auto pb-20">
            <header className="mb-12">
                <h1 className="text-4xl font-bold mb-2">Settings</h1>
                <p className="text-muted-foreground">Manage your account and preferences.</p>
            </header>

            <section className="space-y-8 max-w-2xl">
                <div>
                    <h2 className="text-2xl font-bold mb-6">Profile Details</h2>
                    <ProfileForm user={user} />
                </div>

                <div className="pt-8 border-t border-foreground/10">
                    <h2 className="text-2xl font-bold mb-6">Account Preferences</h2>

                    <div className="space-y-4">
                        <div className="p-6 rounded-2xl bg-foreground/5 border border-foreground/10 flex items-center justify-between">
                            <div>
                                <h3 className="font-bold">Email Notifications</h3>
                                <p className="text-sm text-muted-foreground">Receive updates about your stories and followers.</p>
                            </div>
                            <div className="w-12 h-6 bg-accent rounded-full relative cursor-pointer">
                                <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
                            </div>
                        </div>

                        <div className="p-6 rounded-2xl bg-foreground/5 border border-foreground/10 flex items-center justify-between">
                            <div>
                                <h3 className="font-bold">Public Profile</h3>
                                <p className="text-sm text-muted-foreground">Allow others to find your profile in search.</p>
                            </div>
                            <div className="w-12 h-6 bg-accent rounded-full relative cursor-pointer">
                                <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
