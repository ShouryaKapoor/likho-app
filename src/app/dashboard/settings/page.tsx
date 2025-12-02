import SubscriptionCard from "@/components/monetization/subscription-card";

const plans = [
    {
        title: "Free Spirit",
        price: "$0",
        features: ["Basic Text Editor", "Read Unlimited Stories", "Post 3 Stories/Month", "Community Support"],
    },
    {
        title: "Creative Soul",
        price: "$9",
        features: ["Rich Media Editor", "Unlimited Posts", "Custom Themes", "Priority Support", "Monetization Enabled"],
        isPopular: true,
    },
    {
        title: "Literary Legend",
        price: "$29",
        features: ["All Creative Soul Features", "Featured on Homepage", "Advanced Analytics", "Exclusive Workshops", "0% Commission"],
    },
];

export default function SettingsPage() {
    return (
        <div className="max-w-5xl mx-auto pb-20">
            <header className="mb-12">
                <h1 className="text-4xl font-bold mb-2">Settings</h1>
                <p className="text-muted-foreground">Manage your account, preferences, and subscription.</p>
            </header>

            <section className="mb-16">
                <h2 className="text-2xl font-bold mb-6">Subscription Plans</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {plans.map((plan, index) => (
                        <SubscriptionCard key={index} {...plan} />
                    ))}
                </div>
            </section>

            <section className="space-y-6 max-w-2xl">
                <h2 className="text-2xl font-bold mb-6">Account Preferences</h2>

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
            </section>
        </div>
    );
}
