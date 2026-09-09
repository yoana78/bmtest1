import React, { createContext, useContext, useState } from 'react';
import ko from './ko';
import en from './en';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('ko');
  const t = lang === 'ko' ? ko : en;
  const toggleLang = () => setLang(prev => prev === 'ko' ? 'en' : 'ko');
  
  return (
    <LanguageContext.Provider value={{ lang, language: lang, setLang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
