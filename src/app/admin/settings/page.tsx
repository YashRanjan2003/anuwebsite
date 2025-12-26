'use client';
import { useTheme } from '@/context/ThemeContext';
import { useState } from 'react';
import { supabase } from '@/lib/supabase';

const FONT_OPTIONS = [
    { name: 'Playfair Display (Serif)', value: 'var(--font-playfair)' },
    { name: 'Lato (Sans)', value: 'var(--font-lato)' },
    { name: 'Caveat (Hand)', value: 'var(--font-caveat)' },
    { name: 'System Sans', value: 'sans-serif' },
    { name: 'System Serif', value: 'serif' },
    { name: 'Courier Prime (Mono)', value: 'monospace' },
];

export default function SettingsPage() {
    const { headingFont, bodyFont, heroBackground, colorScheme, updateSettings } = useTheme();
    const [hFont, setHFont] = useState(headingFont);
    const [bFont, setBFont] = useState(bodyFont);
    const [hBg, setHBg] = useState(heroBackground);
    const [cScheme, setCScheme] = useState(colorScheme);
    const [saving, setSaving] = useState(false);

    const handleSave = async () => {
        setSaving(true);
        try {
            await updateSettings(hFont, bFont, hBg, cScheme);
            alert('Theme updated successfully!');
        } catch (e) {
            console.error(e);
            alert('Failed to update theme.');
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-serif italic text-journal-accent mb-8">Studio Settings</h1>

            <div className="bg-white border border-journal-paper p-8 space-y-8 shadow-sm">

                <div className="space-y-4 pt-8 border-t border-journal-paper/50">
                    <h2 className="text-2xl font-serif text-foreground">Visual Theme</h2>
                    <p className="text-journal-secondary">Customize the look and feel.</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <label className="block text-sm font-bold uppercase tracking-widest text-journal-secondary mb-2">Color Scheme</label>
                            <select
                                value={cScheme}
                                onChange={(e) => setCScheme(e.target.value as any)}
                                className="w-full p-3 bg-journal-paper/20 border border-journal-secondary/20 font-sans text-lg"
                            >
                                <option value="warm">Warm Journal (Default)</option>
                                <option value="minimal">Minimal Gallery (B&W)</option>
                                <option value="dark">Midnight Studio (Dark)</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-bold uppercase tracking-widest text-journal-secondary mb-2">Hero Background Image</label>
                            <input
                                type="text"
                                value={hBg}
                                onChange={(e) => setHBg(e.target.value)}
                                placeholder="https://example.com/image.jpg"
                                className="w-full p-3 bg-journal-paper/20 border border-journal-secondary/20 font-sans text-lg"
                            />
                            <p className="text-xs text-journal-secondary mt-1">Leave empty for default abstract background.</p>
                        </div>
                    </div>
                </div>

                <div className="space-y-4 pt-8 border-t border-journal-paper/50">
                    <h2 className="text-2xl font-serif text-foreground">Typography</h2>
                    <p className="text-journal-secondary">Choose the voice of your journal.</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <label className="block text-sm font-bold uppercase tracking-widest text-journal-secondary mb-2">Heading Font</label>
                            <select
                                value={hFont}
                                onChange={(e) => setHFont(e.target.value)}
                                className="w-full p-3 bg-journal-paper/20 border border-journal-secondary/20 font-serif text-lg"
                            >
                                {FONT_OPTIONS.map(opt => (
                                    <option key={opt.value} value={opt.value}>{opt.name}</option>
                                ))}
                            </select>
                            <p className="mt-4 text-3xl" style={{ fontFamily: hFont }}>
                                The Quick Brown Fox
                            </p>
                        </div>

                        <div>
                            <label className="block text-sm font-bold uppercase tracking-widest text-journal-secondary mb-2">Body Font</label>
                            <select
                                value={bFont}
                                onChange={(e) => setBFont(e.target.value)}
                                className="w-full p-3 bg-journal-paper/20 border border-journal-secondary/20 font-sans text-lg"
                            >
                                {FONT_OPTIONS.map(opt => (
                                    <option key={opt.value} value={opt.value}>{opt.name}</option>
                                ))}
                            </select>
                            <p className="mt-4 text-base leading-relaxed" style={{ fontFamily: bFont }}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="pt-8 border-t border-journal-paper/50 flex justify-end">
                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="bg-journal-secondary text-white px-8 py-3 font-serif italic hover:bg-journal-accent transition-colors disabled:opacity-50"
                    >
                        {saving ? 'Applying...' : 'Save Changes'}
                    </button>
                </div>

            </div>
        </div>
    );
}
