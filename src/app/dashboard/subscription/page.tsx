import { auth } from "@/auth";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import SubscriptionCard from "@/components/monetization/subscription-card";

const plans = [
    {
        title: "Free Spirit",
        price: "₹0",
        features: ["Basic Text Editor", "Read Unlimited Stories", "Post 3 Stories/Month", "Community Support"],
    },
    {
        title: "Creative Soul",
        price: "₹499",
        features: ["Rich Media Editor", "Unlimited Posts", "Custom Themes", "Priority Support", "Monetization Enabled"],
        isPopular: true,
    },
    {
        title: "Literary Legend",
        price: "₹1499",
        features: ["All Creative Soul Features", "Featured on Homepage", "Advanced Analytics", "Exclusive Workshops", "0% Commission"],
    },
];

export default async function SubscriptionPage() {
    const session = await auth();
    const user = session?.user;

    let subscriptionTier = "Free";

    if (user?.id) {
        const [dbUser] = await db.select().from(users).where(eq(users.id, user.id));
        subscriptionTier = dbUser?.subscriptionTier || "Free";
    }

    return (
        <div className="max-w-5xl mx-auto pb-20">
            <header className="mb-12">
                <h1 className="text-4xl font-bold mb-2">Subscription Plans</h1>
                <p className="text-muted-foreground">Choose the plan that fits your creative journey.</p>
                {subscriptionTier !== "Free" && (
                    <div className="mt-4 p-4 bg-accent/10 border border-accent rounded-lg inline-block">
                        Current Plan: <span className="font-bold">{subscriptionTier}</span>
                    </div>
                )}
            </header>

            <section className="mb-16">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {plans.map((plan, index) => (
                        <SubscriptionCard key={index} {...plan} />
                    ))}
                </div>
            </section>
        </div>
    );
}
