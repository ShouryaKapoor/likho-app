import PostCard from "@/components/social/post-card";

const posts = [
    {
        title: "The Art of Silence",
        excerpt: "In the quiet moments between breaths, we find the truth that screams louder than any words ever could...",
        author: "Elena V.",
        likes: 1240,
        comments: 85,
        rating: 4.8,
        isPremium: true,
    },
    {
        title: "Neon Dreams",
        excerpt: "The city lights blurred into a kaleidoscope of colors as the rain lashed against the windowpane...",
        author: "CyberPunk99",
        likes: 856,
        comments: 42,
        rating: 4.5,
    },
    {
        title: "Ode to the Morning",
        excerpt: "Golden rays pierce the veil of night, awakening the sleeping world with a gentle kiss...",
        author: "PoetSoul",
        likes: 2100,
        comments: 156,
        rating: 4.9,
        isPremium: true,
    },
];

export default function ExplorePage() {
    return (
        <div className="max-w-3xl mx-auto space-y-8 pb-20">
            <header className="mb-8">
                <h1 className="text-4xl font-bold mb-2">Explore</h1>
                <p className="text-muted-foreground">Discover stories, poems, and thoughts from the community.</p>
            </header>

            <div className="space-y-6">
                {posts.map((post, index) => (
                    <PostCard key={index} {...post} />
                ))}
            </div>
        </div>
    );
}
