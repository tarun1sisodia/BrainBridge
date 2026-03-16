import { create } from 'zustand';
import en from '../localization/en.json';
import hi from '../localization/hi.json';

type Language = 'en' | 'hi';

interface LanguageState {
  language: Language;
  t: (key: string) => string;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
}

const translations = { en, hi };

export const useLanguageStore = create<LanguageState>((set, get) => ({
  language: 'en',
  t: (keyPath: string) => {
    const { language } = get();
    const dictionary = translations[language] as Record<string, unknown>;
    
    // Simple dot notation parser (e.g., 'landing.title')
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return keyPath.split('.').reduce((obj: any, key) => (obj && obj[key] ? obj[key] : keyPath), dictionary) as string;
  },
  setLanguage: (lang) => set({ language: lang }),
  toggleLanguage: () => set((state) => ({ language: state.language === 'en' ? 'hi' : 'en' }))
}));
