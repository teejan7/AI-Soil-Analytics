// Task: Create a reusable English, Hindi, and Malayalam language selector.

"use client";

import { useLanguage } from "../translations/LanguageProvider";
import type { Language } from "../translations/translations";

export default function LanguageSelector() {
  const { language, setLanguage } = useLanguage();


  const handleLanguageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setLanguage(event.target.value as Language);
  };

  return (
    <select
      value={language}
      onChange={handleLanguageChange}
      className="min-h-12 rounded-xl border border-green-200 bg-white px-3 py-2 text-sm font-semibold text-gray-700 outline-none focus:border-green-500 dark:bg-slate-900 dark:text-white"
      aria-label="Select language"
    >
      <option value="en">English</option>
      <option value="hi">हिन्दी</option>
      <option value="ml">മലയാളം</option>
    </select>
  );
}
