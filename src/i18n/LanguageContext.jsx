import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { translations } from './translations.js'

const LanguageContext = createContext(null)
const STORAGE_KEY = 'fhb-lang'

function getInitialLang() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved in translations) return saved
  } catch { /* storage bloqueado */ }
  const browser = navigator.language?.toLowerCase().slice(0, 2)
  return browser in translations ? browser : 'en'
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(getInitialLang)

  useEffect(() => {
    document.documentElement.lang = lang
    document.title = translations[lang].meta.title
    try { localStorage.setItem(STORAGE_KEY, lang) } catch { /* noop */ }
  }, [lang])

  const value = useMemo(() => ({ lang, setLang, t: translations[lang] }), [lang])
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used inside <LanguageProvider>')
  return ctx
}