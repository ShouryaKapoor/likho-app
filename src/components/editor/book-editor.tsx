"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Trash2, Book, ChevronRight, Save } from "lucide-react";
import Editor from "./editor";

interface Chapter {
    id: string;
    title: string;
    content: string;
}

export default function BookEditor() {
    const [chapters, setChapters] = useState<Chapter[]>([
        { id: "1", title: "Chapter 1", content: "" }
    ]);
    const [activeChapterId, setActiveChapterId] = useState("1");
    const [bookTitle, setBookTitle] = useState("");

    const activeChapter = chapters.find(c => c.id === activeChapterId) || chapters[0];

    const addChapter = () => {
        const newId = (chapters.length + 1).toString();
        const newChapter = { id: newId, title: `Chapter ${newId}`, content: "" };
        setChapters([...chapters, newChapter]);
        setActiveChapterId(newId);
    };

    const updateChapterContent = (content: string) => {
        setChapters(chapters.map(c =>
            c.id === activeChapterId ? { ...c, content } : c
        ));
    };

    const updateChapterTitle = (id: string, title: string) => {
        setChapters(chapters.map(c =>
            c.id === id ? { ...c, title } : c
        ));
    };

    const deleteChapter = (id: string) => {
        if (chapters.length === 1) return;
        const newChapters = chapters.filter(c => c.id !== id);
        setChapters(newChapters);
        if (activeChapterId === id) {
            setActiveChapterId(newChapters[0].id);
        }
    };

    return (
        <div className="flex h-[calc(100vh-8rem)] gap-6">
            {/* Sidebar for Chapters */}
            <div className="w-64 flex-shrink-0 flex flex-col bg-foreground/5 rounded-2xl p-4 border border-foreground/10">
                <div className="mb-6">
                    <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2 block">Book Title</label>
                    <input
                        type="text"
                        value={bookTitle}
                        onChange={(e) => setBookTitle(e.target.value)}
                        placeholder="Untitled Book"
                        className="w-full bg-transparent border-b border-foreground/20 py-1 font-serif font-bold text-lg outline-none focus:border-foreground transition-colors"
                    />
                </div>

                <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-sm">Chapters</h3>
                    <button
                        onClick={addChapter}
                        className="p-1 hover:bg-foreground/10 rounded-lg transition-colors"
                    >
                        <Plus className="w-4 h-4" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto space-y-2 pr-2">
                    {chapters.map((chapter) => (
                        <div
                            key={chapter.id}
                            onClick={() => setActiveChapterId(chapter.id)}
                            className={`group flex items-center gap-2 p-3 rounded-xl cursor-pointer transition-all ${activeChapterId === chapter.id
                                    ? "bg-foreground text-background shadow-md"
                                    : "hover:bg-foreground/10"
                                }`}
                        >
                            <Book className="w-4 h-4 flex-shrink-0" />
                            <input
                                type="text"
                                value={chapter.title}
                                onChange={(e) => updateChapterTitle(chapter.id, e.target.value)}
                                className={`bg-transparent outline-none w-full text-sm truncate ${activeChapterId === chapter.id ? "placeholder:text-background/50" : ""
                                    }`}
                                onClick={(e) => e.stopPropagation()}
                            />
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    deleteChapter(chapter.id);
                                }}
                                className={`opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-red-500/20 hover:text-red-500 transition-all ${chapters.length === 1 ? "hidden" : ""
                                    }`}
                            >
                                <Trash2 className="w-3 h-3" />
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Main Editor Area */}
            <div className="flex-1 bg-foreground/5 rounded-2xl p-8 border border-foreground/10 overflow-y-auto relative">
                <div className="max-w-3xl mx-auto">
                    <div className="mb-8 flex items-center gap-2 text-muted-foreground text-sm">
                        <span>{bookTitle || "Untitled Book"}</span>
                        <ChevronRight className="w-4 h-4" />
                        <span className="text-foreground font-medium">{activeChapter.title}</span>
                    </div>

                    {/* Reusing the generic Editor but passing content/onChange if it supported props, 
                        but for now I'll just inline a simple textarea or modify Editor to accept props.
                        Let's assume I'll modify Editor later or just use a textarea here for the specific book flow 
                        to ensure it works perfectly with the chapter state. 
                        Actually, the user wants "customized" so I should probably make the Editor component reusable.
                        For this step, I will implement a specific editor view here to ensure state sync.
                    */}
                    <textarea
                        value={activeChapter.content}
                        onChange={(e) => updateChapterContent(e.target.value)}
                        placeholder="Start writing your chapter..."
                        className="w-full min-h-[60vh] text-xl leading-relaxed bg-transparent border-none outline-none resize-none placeholder:text-muted-foreground/50 font-serif"
                    />
                </div>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="absolute bottom-8 right-8 bg-foreground text-background p-4 rounded-full shadow-xl hover:shadow-2xl transition-shadow"
                >
                    <Save className="w-6 h-6" />
                </motion.button>
            </div>
        </div>
    );
}
