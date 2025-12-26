'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

interface ThemeContextType {
    headingFont: string;
    bodyFont: string;
    heroBackground: string;
    colorScheme: 'warm' | 'minimal' | 'dark';
    updateSettings: (heading: string, body: string, hero: string, color: string) => Promise<void>;
}

const ThemeContext = createContext<ThemeContextType>({
    headingFont: 'var(--font-playfair)',
    bodyFont: 'var(--font-lato)',
    heroBackground: '',
    colorScheme: 'warm',
    updateSettings: async () => { },
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    // Default to Journal theme
    const [headingFont, setHeadingFont] = useState('var(--font-playfair)');
    const [bodyFont, setBodyFont] = useState('var(--font-lato)');
    const [heroBackground, setHeroBackground] = useState('');
    const [colorScheme, setColorScheme] = useState<'warm' | 'minimal' | 'dark'>('warm');

    useEffect(() => {
        // Fetch initial settings
        const fetchSettings = async () => {
            const { data } = await supabase.from('site_settings').select('*').single();
            if (data) {
                setHeadingFont(data.heading_font || 'var(--font-playfair)');
                setBodyFont(data.body_font || 'var(--font-lato)');
                setHeroBackground(data.hero_background || '');
                setColorScheme(data.color_scheme || 'warm');
            }
        };
        fetchSettings();

        // Realtime subscription for instant updates
        const channel = supabase.channel('settings_box')
            .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'site_settings' },
                (payload: any) => {
                    setHeadingFont(payload.new.heading_font);
                    setBodyFont(payload.new.body_font);
                    setHeroBackground(payload.new.hero_background);
                    setColorScheme(payload.new.color_scheme);
                })
            .subscribe();

        return () => { supabase.removeChannel(channel); };
    }, []);

    const updateSettings = async (h: string, b: string, hero: string, color: string) => {
        // Optimistic update
        setHeadingFont(h);
        setBodyFont(b);
        setHeroBackground(hero);
        setColorScheme(color as any);

        // Save to DB
        // Check if row exists, if not insert, else update
        const payload = {
            heading_font: h,
            body_font: b,
            hero_background: hero,
            color_scheme: color
        };

        const { data } = await supabase.from('site_settings').select('id').single();
        if (!data) {
            await supabase.from('site_settings').insert({ id: 'global', ...payload });
        } else {
            await supabase.from('site_settings').update(payload).eq('id', 'global');
        }
    };

    // Apply color scheme to document element or body
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', colorScheme);
    }, [colorScheme]);

    return (
        <ThemeContext.Provider value={{ headingFont, bodyFont, heroBackground, colorScheme, updateSettings }}>
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
