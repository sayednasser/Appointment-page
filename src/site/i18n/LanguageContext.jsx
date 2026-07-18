import { createContext, useContext, useState, useEffect } from 'react'
import translations from './translations'

const LanguageContext = createContext(null)

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('ar')

  // Persist language preference across page refreshes
  useEffect(() => {
    const saved = localStorage.getItem('dentaflow_lang')
    if (saved === 'en' || saved === 'ar') setLang(saved)
  }, [])

  const toggleLang = () => {
    setLang((prev) => {
      const next = prev === 'ar' ? 'en' : 'ar'
      localStorage.setItem('dentaflow_lang', next)
      return next
    })
  }

  const t = translations[lang]
  const isRTL = lang === 'ar'

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t, isRTL }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLang() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLang must be used inside LanguageProvider')
  return ctx
}
