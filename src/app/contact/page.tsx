'use client';
import { motion } from 'framer-motion';
import { Mail, Instagram, Twitter } from 'lucide-react';

export default function ContactPage() {
    return (
        <div className="min-h-screen pt-32 pb-20 px-4 bg-background text-foreground">
            <div className="max-w-3xl mx-auto text-center space-y-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="font-serif italic text-5xl md:text-6xl text-journal-accent mb-6">Get in Touch</h1>
                    <p className="font-sans text-xl text-journal-secondary">Commissions, collaborations, or just to say hello.</p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 }}
                    className="bg-white p-8 md:p-12 border border-journal-paper shadow-sm max-w-xl mx-auto"
                >
                    <div className="space-y-8">
                        <a href="mailto:hello@artistjournal.com" className="flex items-center gap-4 justify-center text-journal-secondary hover:text-journal-accent transition-colors group">
                            <div className="w-12 h-12 rounded-full bg-journal-paper/30 flex items-center justify-center group-hover:bg-journal-paper/60 transition-colors">
                                <Mail size={24} />
                            </div>
                            <span className="font-serif text-2xl italic">hello@artistjournal.com</span>
                        </a>

                        <div className="flex justify-center gap-8 pt-8 border-t border-journal-paper/50">
                            <a href="#" className="text-journal-secondary hover:text-journal-accent transition-colors">
                                <Instagram size={32} strokeWidth={1.5} />
                            </a>
                            <a href="#" className="text-journal-secondary hover:text-journal-accent transition-colors">
                                <Twitter size={32} strokeWidth={1.5} />
                            </a>
                        </div>
                    </div>
                </motion.div>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="font-sans text-sm text-journal-secondary max-w-md mx-auto"
                >
                    I typically respond within 24-48 hours. For urgent inquiries regarding an order, please include your Order ID in the subject line.
                </motion.p>
            </div>
        </div>
    );
}
