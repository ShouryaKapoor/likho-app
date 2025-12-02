"use client";

import { motion } from "framer-motion";
import { Mail, Github, Twitter, Linkedin } from "lucide-react";

export default function Contact() {
    return (
        <section className="h-full flex items-center justify-center bg-neutral-900 text-white relative overflow-hidden">
            <div className="container mx-auto px-4 text-center z-10">
                <motion.h2
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-5xl md:text-7xl font-bold mb-8"
                >
                    Let's Create <br /> <span className="text-accent italic">Together</span>
                </motion.h2>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="flex justify-center gap-8 mb-12"
                >
                    {[Mail, Github, Twitter, Linkedin].map((Icon, index) => (
                        <a
                            key={index}
                            href="#"
                            className="p-4 bg-white/10 rounded-full hover:bg-accent hover:text-white transition-colors backdrop-blur-sm"
                        >
                            <Icon className="w-6 h-6" />
                        </a>
                    ))}
                </motion.div>

                <motion.form
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    className="max-w-md mx-auto space-y-4"
                >
                    <input
                        type="email"
                        placeholder="Your Email"
                        className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-accent transition-colors"
                    />
                    <textarea
                        placeholder="Your Message"
                        rows={4}
                        className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-accent transition-colors resize-none"
                    />
                    <button className="w-full py-4 bg-accent text-white font-bold rounded-xl hover:bg-accent/90 transition-colors">
                        Send Message
                    </button>
                </motion.form>
            </div>

            {/* Background decoration */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-500/30 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/30 rounded-full blur-3xl" />
            </div>
        </section>
    );
}
