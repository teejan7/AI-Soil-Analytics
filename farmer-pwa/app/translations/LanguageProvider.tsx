// Task: Create a language provider for English, Hindi, and Malayalam.

"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import {
  translations,
  type Language,
  type TranslationKey,
} from "./translations";

type LanguageContextType = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: TranslationKey) => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");

  useEffect(() => {
    // Task: Load the previously selected language from localStorage.
    const savedLanguage = localStorage.getItem("soilcare_language");

    if (
      savedLanguage === "en" ||
      savedLanguage === "hi" ||
      savedLanguage === "kn" ||
      savedLanguage === "ml"
    ) {
      setLanguageState(savedLanguage);
    }
  }, []);

  const setLanguage = (newLanguage: Language) => {
    // Task: Save the selected language and update the application.
    setLanguageState(newLanguage);
    localStorage.setItem("soilcare_language", newLanguage);
  };

  const t = (key: TranslationKey) => {
    // Task: Return the translated text for the selected language.
    return translations[language][key];
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  // Task: Provide access to the language context.
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useLanguage must be used inside LanguageProvider");
  }

  return context;
}
