import { useEffect, useState } from 'react'
import { Phone } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext.jsx'
import { COMPANY } from '../lib/company.js'
import Container from './ui/Container.jsx'

const LANGS = [
  { code: 'en', label: 'EN', name: 'English' },
  { code: 'es', label: 'ES', name: 'Español' },
  { code: 'pt', label: 'PT', name: 'Português' },
]

function LanguageLinks() {
  const { lang, setLang, t } = useLanguage()
  return (
    <div role="group" aria-label={t.nav.language} className="flex items-center text-sm font-medium sm:text-[15px]">
      {LANGS.map((l, i) => {
        const active = lang === l.code
        return (
          <span key={l.code} className="flex items-center">
            {i > 0 && <span aria-hidden="true" className="px-1.5 text-navy-900/60 min-[360px]:px-2.5 sm:px-3.5">|</span>}
            <button
              type="button"
              onClick={() => setLang(l.code)}
              aria-pressed={active}
              title={l.name}
              className={`relative py-1 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy-900
                ${active ? 'text-navy-900' : 'text-navy-600 hover:text-navy-900'}`}
            >
              {l.label}
              <span
                aria-hidden="true"
                className={`absolute inset-x-0 -bottom-0.5 h-0.5 rounded-full bg-navy-900 transition-transform ${active ? 'scale-x-100' : 'scale-x-0'}`}
              />
            </button>
          </span>
        )
      })}
    </div>
  )
}

export default function Header() {
  const { t } = useLanguage()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-40 border-b border-slate-200/80 bg-white transition-shadow ${scrolled ? 'shadow-md shadow-navy-900/5' : ''}`}
    >
      <Container className="flex h-16 items-center justify-between gap-4 sm:h-20">
        {/* Logo horizontal armado con las piezas de logo.png */}
        <a href="#top" aria-label={COMPANY.name} className="shrink-0">
          <img
            src="/logo-horizontal.png"
            alt={COMPANY.name}
            width="900"
            height="234"
            className="h-9 w-auto min-[360px]:h-10 sm:h-12 lg:h-14"
          />
        </a>

        <div className="flex items-center gap-3 min-[360px]:gap-4 sm:gap-8 lg:gap-12">
          <a href={COMPANY.phoneHref} className="group flex items-center gap-3" aria-label={`${t.nav.callUs} ${COMPANY.phoneDisplay}`}>
            <Phone className="size-6 fill-navy-900 text-navy-900 sm:size-7" strokeWidth={1.5} aria-hidden="true" />
            <span className="hidden leading-tight sm:block">
              <span className="block text-base font-medium text-navy-900 group-hover:text-navy-700 lg:text-lg">
                {COMPANY.phoneShort}
              </span>
              <span className="block text-sm font-medium text-palm-600">{t.nav.callUs}</span>
            </span>
          </a>

          <LanguageLinks />
        </div>
      </Container>
    </header>
  )
}