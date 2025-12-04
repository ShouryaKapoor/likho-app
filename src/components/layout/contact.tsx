"use client";

import { motion } from "framer-motion";
import { Mail, Github, Linkedin } from "lucide-react";

const XIcon = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
);

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
                    {[
                        { icon: Mail, href: "mailto:shouryakapoor2003@gmail.com" },
                        { icon: Github, href: "https://github.com/shouryakapoor" },
                        { icon: XIcon, href: "https://twitter.com/shouryakapoor" },
                        { icon: Linkedin, href: "https://www.linkedin.com/in/shouryakapoor/" }
                    ].map((item, index) => (
                        <a
                            key={index}
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-4 bg-white/10 rounded-full hover:bg-accent hover:text-white transition-colors backdrop-blur-sm"
                        >
                            <item.icon className="w-6 h-6" />
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

            {/* Developer Details */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute bottom-6 right-6 text-right z-20"
            >
                <p className="text-sm text-white/40 font-serif italic">Developed by</p>
                <p className="text-lg font-bold text-white/80">Shourya Kapoor</p>
                <p className="text-xs text-accent">Full Stack Developer</p>
            </motion.div>
        </section>
    );
}
