"use client";

import Hero from "@/components/layout/hero";
import About from "@/components/layout/about";
import Features from "@/components/layout/features";
import Contact from "@/components/layout/contact";
import BookContainer from "@/components/layout/book-container";

export default function Home() {
  return (
    <main className="min-h-screen bg-neutral-900">
      <BookContainer
        cover={<Hero />}
        page1={<About />}
        page2={<Features />}
        page3={<Contact />}
      />
    </main>
  );
}
