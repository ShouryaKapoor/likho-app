"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, User, ArrowRight, Loader2, Camera } from "lucide-react";
import { useRouter } from "next/navigation";

interface AuthFormProps {
    type: "login" | "signup";
}

const avatars = [
    "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix",
    "https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka",
    "https://api.dicebear.com/7.x/avataaars/svg?seed=Zoe",
    "https://api.dicebear.com/7.x/avataaars/svg?seed=Jack",
];

export default function AuthForm({ type }: AuthFormProps) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [selectedAvatar, setSelectedAvatar] = useState(0);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        // Mock Auth Logic
        await new Promise((resolve) => setTimeout(resolve, 1500));

        if (type === "login") {
            if (formData.email === "admin" && formData.password === "admin123") {
                router.push("/dashboard");
            } else {
                setError("Invalid credentials. Try admin / admin123");
                setIsLoading(false);
            }
        } else {
            // Mock Signup
            router.push("/login"); // Redirect to login after signup
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl relative overflow-hidden"
        >
            {/* Background blobs */}
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-accent/30 rounded-full blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-purple-500/30 rounded-full blur-3xl" />

            <div className="relative z-10">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold mb-2">
                        {type === "login" ? "Welcome Back" : "Join the Circle"}
                    </h2>
                    <p className="text-muted-foreground">
                        {type === "login"
                            ? "Enter your details to access your workspace."
                            : "Start your creative journey today."}
                    </p>
                </div>

                {type === "signup" && (
                    <div className="mb-8">
                        <p className="text-sm font-medium mb-3 text-center">Choose your Avatar</p>
                        <div className="flex justify-center gap-4">
                            {avatars.map((avatar, index) => (
                                <button
                                    key={index}
                                    type="button"
                                    onClick={() => setSelectedAvatar(index)}
                                    className={`relative w-12 h-12 rounded-full overflow-hidden transition-all ${selectedAvatar === index ? "ring-2 ring-accent scale-110" : "opacity-50 hover:opacity-100"
                                        }`}
                                >
                                    <img src={avatar} alt="Avatar" className="w-full h-full object-cover" />
                                </button>
                            ))}
                            <button className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
                                <Camera className="w-5 h-5 text-muted-foreground" />
                            </button>
                        </div>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    {type === "signup" && (
                        <div className="relative">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                            <input
                                type="text"
                                placeholder="Full Name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 outline-none focus:border-accent transition-colors"
                                required
                            />
                        </div>
                    )}

                    <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Email or Username"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 outline-none focus:border-accent transition-colors"
                            required
                        />
                    </div>

                    <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <input
                            type="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 outline-none focus:border-accent transition-colors"
                            required
                        />
                    </div>

                    {error && (
                        <p className="text-red-400 text-sm text-center">{error}</p>
                    )}

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-foreground text-background font-bold py-4 rounded-xl hover:bg-foreground/90 transition-all flex items-center justify-center gap-2 group"
                    >
                        {isLoading ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                            <>
                                {type === "login" ? "Sign In" : "Create Account"}
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </>
                        )}
                    </button>
                </form>
            </div>
        </motion.div>
    );
}
