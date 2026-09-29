import { Phone } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext.jsx'
import { COMPANY } from '../lib/company.js'

export default function MobileCTABar({ hidden }) {
  const { t } = useLanguage()
  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-30 border-t border-navy-100 bg-white/95 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur transition-transform duration-300 md:hidden
        ${hidden ? 'translate-y-full' : 'translate-y-0'}`}
      inert={hidden}
    >
      <div className="flex gap-3">
        <a href={COMPANY.phoneHref}
          className="flex items-center justify-center gap-2 rounded-xl px-4 py-3.5 text-sm font-bold text-navy-900 ring-1 ring-navy-200">
          <Phone className="size-4" aria-hidden="true" /> {t.mobileBar.call}
        </a>
        <a href="#offer"
          className="flex flex-1 items-center justify-center rounded-xl bg-palm-700 px-4 py-3.5 text-sm font-extrabold uppercase tracking-wide text-white shadow-lg shadow-palm-700/30">
          {t.mobileBar.cta}
        </a>
      </div>
    </div>
  )
}
