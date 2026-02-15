import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Language, TRANSLATIONS, getTranslation } from '../constants/translations';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (path: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');
  
  // Load saved language preference from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('aaharmitra-language') as Language;
    if (saved && (saved === 'en' || saved === 'hi')) {
      setLanguage(saved);
    }
  }, []);
  
  const toggleLanguage = () => {
    const newLanguage = language === 'en' ? 'hi' : 'en';
    setLanguage(newLanguage);
    localStorage.setItem('aaharmitra-language', newLanguage);
  };
  
  const t = (path: string): string => {
    return getTranslation(language, path);
  };
  
  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

/**
 * Hook to access language context
 * Usage: const { language, toggleLanguage, t } = useLanguage();
 */
export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};
