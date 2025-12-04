"use client";

import { useActionState } from "react";
import { signUp } from "@/app/actions/auth";
import Link from "next/link";
import { Loader2, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { motion } from "framer-motion";

export default function SignupPage() {
    const [state, action, isPending] = useActionState(signUp, undefined);
    const router = useRouter();

    useEffect(() => {
        if (state?.success) {
            router.push("/login");
        }
    }, [state?.success, router]);

    return (
        <div className="flex min-h-screen items-center justify-center bg-neutral-950 px-4 py-12 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-pink-500/10 rounded-full blur-[120px]" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md space-y-8 relative z-10"
            >
                <div className="text-center">
                    <motion.h2
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-4xl font-bold tracking-tight text-white font-serif"
                    >
                        Join the Revolution
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="mt-2 text-sm text-neutral-400"
                    >
                        Create your account and start writing today
                    </motion.p>
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 }}
                    className="bg-neutral-900/50 backdrop-blur-xl border border-white/10 p-8 rounded-2xl shadow-2xl"
                >
                    <form action={action} className="space-y-6">
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-neutral-300 mb-1">
                                    Full Name
                                </label>
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    autoComplete="name"
                                    required
                                    className="block w-full rounded-xl border-0 bg-neutral-800/50 py-3 px-4 text-white shadow-sm ring-1 ring-inset ring-white/10 placeholder:text-neutral-500 focus:ring-2 focus:ring-inset focus:ring-purple-500 sm:text-sm sm:leading-6 transition-all"
                                    placeholder="John Doe"
                                />
                            </div>
                            <div>
                                <label htmlFor="email-address" className="block text-sm font-medium text-neutral-300 mb-1">
                                    Email address
                                </label>
                                <input
                                    id="email-address"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="block w-full rounded-xl border-0 bg-neutral-800/50 py-3 px-4 text-white shadow-sm ring-1 ring-inset ring-white/10 placeholder:text-neutral-500 focus:ring-2 focus:ring-inset focus:ring-purple-500 sm:text-sm sm:leading-6 transition-all"
                                    placeholder="name@example.com"
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-neutral-300 mb-1">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="new-password"
                                    required
                                    className="block w-full rounded-xl border-0 bg-neutral-800/50 py-3 px-4 text-white shadow-sm ring-1 ring-inset ring-white/10 placeholder:text-neutral-500 focus:ring-2 focus:ring-inset focus:ring-purple-500 sm:text-sm sm:leading-6 transition-all"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        {state?.error && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                className="text-sm text-red-400 bg-red-500/10 p-3 rounded-lg text-center border border-red-500/20"
                            >
                                {state.error}
                            </motion.div>
                        )}

                        {state?.success && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                className="text-sm text-green-400 bg-green-500/10 p-3 rounded-lg text-center border border-green-500/20"
                            >
                                {state.success} Redirecting...
                            </motion.div>
                        )}

                        <button
                            type="submit"
                            disabled={isPending}
                            className="group relative flex w-full justify-center items-center gap-2 rounded-xl bg-white px-3 py-3 text-sm font-semibold text-neutral-950 hover:bg-neutral-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white disabled:opacity-50 transition-all"
                        >
                            {isPending ? (
                                <Loader2 className="animate-spin h-5 w-5" />
                            ) : (
                                <>
                                    Sign up <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-sm text-neutral-400">
                            Already have an account?{" "}
                            <Link
                                href="/login"
                                className="font-medium text-purple-400 hover:text-purple-300 transition-colors"
                            >
                                Sign in instead
                            </Link>
                        </p>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
}
