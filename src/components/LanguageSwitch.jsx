import { useLanguage } from '../i18n/LanguageContext.jsx'

const LANGS = [
  { code: 'en', label: 'EN', name: 'English' },
  { code: 'es', label: 'ES', name: 'Español' },
]

export default function LanguageSwitch({ className = '' }) {
  const { lang, setLang, t } = useLanguage()
  return (
    <div role="group" aria-label={t.nav.language} className={`inline-flex rounded-full bg-navy-50 p-1 ring-1 ring-navy-100 ${className}`}>
      {LANGS.map((l) => {
        const active = lang === l.code
        return (
          <button
            key={l.code}
            type="button"
            onClick={() => setLang(l.code)}
            aria-pressed={active}
            title={l.name}
            className={`rounded-full px-3 py-1.5 text-xs font-bold transition focus-visible:outline-2 focus-visible:outline-navy-900
              ${active ? 'bg-navy-900 text-white shadow' : 'text-navy-700 hover:text-navy-900'}`}
          >
            {l.label}
          </button>
        )
      })}
    </div>
  )
}
