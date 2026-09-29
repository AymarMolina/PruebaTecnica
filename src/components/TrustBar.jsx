import { CalendarDays, CircleDollarSign, Star, Tag } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext.jsx'
import Container from './ui/Container.jsx'
import { useState } from 'react'

function GoogleLogo() {
  const [failed, setFailed] = useState(false)
  if (failed) {
    return <span className="text-3xl font-semibold tracking-tight text-slate-600">Google</span>
  }
  return (
    <img
      src="/google.svg"
      alt="Google"
      width="92"
      height="10"
      className="h-10 w-auto lg:h-15"
      onError={() => setFailed(true)}
    />
  )
}

function RingIcon({ icon: Icon }) {
  return (
    <span className="grid size-14 shrink-0 place-items-center rounded-full border-2 border-navy-900 text-navy-900">
      <Icon className="size-7" strokeWidth={1.75} aria-hidden="true" />
    </span>
  )
}

const ITEMS = [
  { icon: <RingIcon icon={Tag} /> },
  { icon: <RingIcon icon={CircleDollarSign} /> },
  { icon: <CalendarDays className="size-14 shrink-0 text-navy-900" strokeWidth={1.5} aria-hidden="true" /> },
]

export default function TrustBar() {
  const { t } = useLanguage()

  return (
    <section aria-label="Benefits" className="border-b border-slate-200 bg-slate-50">
      <Container className="grid grid-cols-1 gap-6 py-7 min-[480px]:grid-cols-2 lg:grid-cols-[repeat(3,1fr)_auto] lg:gap-0">
        {t.trust.map((item, i) => (
          <div
            key={item.title}
            className="flex items-center gap-4 lg:border-r lg:border-slate-300 lg:px-8 lg:first:pl-0"
          >
            {ITEMS[i].icon}
            <div>
              <p className="text-base font-semibold text-navy-900">{item.title}</p>
              <p className="mt-0.5 text-sm leading-snug text-slate-700">{item.text}</p>
            </div>
          </div>
        ))}

        {/* Calificación */}
        <div className="flex items-center gap-4 min-[480px]:justify-center lg:flex-col lg:gap-1 lg:pl-8 lg:pr-2">
          <GoogleLogo />
          <div className="flex flex-col items-start lg:items-center">
            <span className="flex gap-0.5 text-amber-400" role="img" aria-label="5 / 5">
              {Array.from({ length: 5 }).map((_, k) => (
                <Star key={k} className="size-5 fill-current" aria-hidden="true" />
              ))}
            </span>
            <span className="mt-0.5 text-sm text-slate-700">{t.rating.label}</span>
          </div>
        </div>
      </Container>
    </section>
  )
}