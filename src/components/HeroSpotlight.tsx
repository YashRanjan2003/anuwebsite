'use client';
import { motion } from 'framer-motion';

export default function HeroSpotlight() {
    return (
        <section className="h-[100vh] w-full relative flex flex-col justify-end items-center pb-32 overflow-hidden">
            {/* Background Image Placeholder */}
            <div className="absolute inset-0 bg-neutral-900 z-0">
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/20 to-transparent z-10" />
                {/* Simulating an image with a div for now since image gen is down, keeping it abstract */}
                <div className="absolute inset-0 opacity-50 bg-[radial-gradient(circle_at_50%_50%,_rgba(204,255,0,0.15),transparent_70%)]" />
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[100px] animate-pulse" />
                <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-brand-neon/20 rounded-full blur-[80px]" />
            </div>

            <div className="z-10 text-center flex flex-col items-center gap-6 px-4">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="text-6xl md:text-9xl font-black uppercase tracking-tighter text-white drop-shadow-2xl leading-[0.9]">
                        The <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">Winter</span> <br />
                        Drop
                    </h1>
                </motion.div>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="font-mono text-sm md:text-base text-brand-neon tracking-widest uppercase"
                >
                    Limited Edition • 1 of 1
                </motion.p>

                <motion.button
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.8, type: "spring" }}
                    className="mt-4 px-10 py-4 bg-brand-neon text-brand-dark rounded-full font-bold uppercase tracking-wide hover:scale-105 hover:bg-white transition-all shadow-[0_0_20px_rgba(204,255,0,0.4)]"
                >
                    Shop Now
                </motion.button>
            </div>
        </section>
    );
}
