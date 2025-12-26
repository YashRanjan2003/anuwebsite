'use client';
import { motion } from 'framer-motion';

export default function AboutPage() {
    return (
        <div className="min-h-screen pt-32 pb-20 px-4 bg-background text-foreground">
            <div className="max-w-3xl mx-auto space-y-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center"
                >
                    <h1 className="font-serif italic text-5xl md:text-6xl text-journal-accent mb-6">About the Artist</h1>
                    <div className="w-24 h-1 bg-journal-secondary/20 mx-auto rounded-full" />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="space-y-6 font-sans text-lg leading-relaxed text-journal-secondary"
                >
                    <p>
                        Welcome to my digital studio. I am an artist obsessed with capturing the fleeting moments of life—the way light hits a leaf in the afternoon, the quiet melancholy of a rainy street, or the vibrant chaos of a crowded market.
                    </p>
                    <p>
                        My work is a journal of these observations, translated into color and form. Whether through digital mediums, traditional sketches, or oil on canvas, my goal is to evoke a feeling, a memory, or a dream.
                    </p>
                    <p>
                        Every piece in this collection is created with intention and love. I hope you find something here that speaks to your own story.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="pt-12 border-t border-journal-paper/50 flex flex-col items-center"
                >
                    <p className="font-serif italic text-2xl text-foreground">"Art is not what you see, but what you make others see."</p>
                    <span className="font-sans text-sm text-journal-secondary mt-2 uppercase tracking-widest">— Edgar Degas</span>
                </motion.div>
            </div>
        </div>
    );
}
