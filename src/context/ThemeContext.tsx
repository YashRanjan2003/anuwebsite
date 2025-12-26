'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

interface ThemeContextType {
    headingFont: string;
    bodyFont: string;
    updateFonts: (heading: string, body: string) => Promise<void>;
}

const ThemeContext = createContext<ThemeContextType>({
    headingFont: 'var(--font-playfair)',
    bodyFont: 'var(--font-lato)',
    updateFonts: async () => { },
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    // Default to Journal theme
    const [headingFont, setHeadingFont] = useState('var(--font-playfair)');
    const [bodyFont, setBodyFont] = useState('var(--font-lato)');

    useEffect(() => {
        // Fetch initial settings
        const fetchSettings = async () => {
            const { data } = await supabase.from('site_settings').select('*').single();
            if (data) {
                setHeadingFont(data.heading_font || 'var(--font-playfair)');
                setBodyFont(data.body_font || 'var(--font-lato)');
            }
        };
        fetchSettings();

        // Realtime subscription for instant updates
        const channel = supabase.channel('settings_box')
            .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'site_settings' },
                (payload: any) => {
                    setHeadingFont(payload.new.heading_font);
                    setBodyFont(payload.new.body_font);
                })
            .subscribe();

        return () => { supabase.removeChannel(channel); };
    }, []);

    const updateFonts = async (h: string, b: string) => {
        // Optimistic update
        setHeadingFont(h);
        setBodyFont(b);

        // Save to DB
        // Check if row exists, if not insert, else update
        const { data } = await supabase.from('site_settings').select('id').single();
        if (!data) {
            await supabase.from('site_settings').insert({ id: 'global', heading_font: h, body_font: b });
        } else {
            await supabase.from('site_settings').update({ heading_font: h, body_font: b }).eq('id', 'global');
        }
    };

    return (
        <ThemeContext.Provider value={{ headingFont, bodyFont, updateFonts }}>
            <div style={{
                '--font-serif': headingFont,
                '--font-sans': bodyFont
            } as React.CSSProperties}>
                {children}
            </div>
        </ThemeContext.Provider>
    );
}

export const useTheme = () => useContext(ThemeContext);
