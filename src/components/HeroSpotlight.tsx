'use client';
import { motion } from 'framer-motion';

export default function HeroSpotlight() {
    return (
        <section className="h-[90vh] w-full relative flex flex-col justify-center items-center overflow-hidden bg-background">

            {/* Background Texture/Elements */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="absolute top-20 left-20 w-64 h-64 bg-journal-accent rounded-full blur-[120px]" />
                <div className="absolute bottom-20 right-20 w-80 h-80 bg-journal-secondary rounded-full blur-[100px]" />
            </div>

            <div className="z-10 text-center flex flex-col items-center gap-8 px-4 max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <p className="font-hand text-3xl text-journal-secondary mb-4 rotate-[-2deg]">
                        Welcome to the journal
                    </p>
                    <h1 className="text-6xl md:text-8xl font-serif italic text-foreground leading-tight">
                        Stories told <br />
                        <span className="text-journal-accent">in color & light.</span>
                    </h1>
                </motion.div>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="font-sans text-lg text-journal-secondary max-w-md leading-relaxed"
                >
                    A curated collection of one-of-a-kind pieces, capturing fleeting moments and permanent feelings.
                </motion.p>

                <motion.button
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 }}
                    className="mt-8 px-12 py-4 bg-journal-accent text-white font-serif italic text-xl hover:bg-journal-secondary transition-all shadow-lg hover:shadow-xl rounded-sm"
                >
                    Open Collection
                </motion.button>
            </div>
        </section>
    );
}
