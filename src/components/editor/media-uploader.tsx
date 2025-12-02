"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, X, Image as ImageIcon, Film } from "lucide-react";

export default function MediaUploader() {
    const [isDragging, setIsDragging] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            setFile(e.dataTransfer.files[0]);
        }
    };

    const handleClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    return (
        <div className="w-full">
            <AnimatePresence>
                {!file ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className={`
              border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-colors
              ${isDragging ? "border-accent bg-accent/10" : "border-foreground/20 hover:border-foreground/40 hover:bg-foreground/5"}
            `}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        onClick={handleClick}
                    >
                        <input
                            type="file"
                            ref={fileInputRef}
                            className="hidden"
                            accept="image/*,video/*"
                            onChange={handleFileChange}
                        />
                        <div className="flex justify-center gap-4 mb-4 text-muted-foreground">
                            <ImageIcon className="w-8 h-8" />
                            <Film className="w-8 h-8" />
                        </div>
                        <h3 className="text-lg font-bold mb-2">Upload Media</h3>
                        <p className="text-muted-foreground text-sm">
                            Drag & drop or click to upload images or videos
                        </p>
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="relative rounded-2xl overflow-hidden bg-foreground/5 border border-foreground/10 p-4 flex items-center gap-4"
                    >
                        <div className="w-16 h-16 bg-foreground/10 rounded-lg flex items-center justify-center">
                            {file.type.startsWith("image/") ? (
                                <ImageIcon className="w-8 h-8 text-muted-foreground" />
                            ) : (
                                <Film className="w-8 h-8 text-muted-foreground" />
                            )}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="font-medium truncate">{file.name}</p>
                            <p className="text-sm text-muted-foreground">
                                {(file.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                        </div>
                        <button
                            onClick={() => setFile(null)}
                            className="p-2 hover:bg-red-500/10 hover:text-red-500 rounded-full transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
