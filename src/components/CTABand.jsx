import { CircleDollarSign, Clock3, ShieldCheck } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext.jsx'
import Container from './ui/Container.jsx'

const ICONS = [ShieldCheck, CircleDollarSign, Clock3]
const CTA_IMAGE = '/cta-house.jpg'

export default function CTABand() {
  const { t } = useLanguage()
  const c = t.ctaBand

  return (
    <section className="relative isolate overflow-hidden bg-navy-800">
      {/* Imagen: arriba en móvil, a la izquierda en desktop, fundida con el azul */}
      <div className="relative h-44 sm:h-56 lg:absolute lg:inset-y-0 lg:left-0 lg:h-auto lg:w-[26%]">
        <img src={CTA_IMAGE} alt={c.imageAlt} loading="lazy" className="size-full object-cover" />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-transparent from-50% to-navy-800 lg:bg-gradient-to-r lg:from-60% lg:to-navy-800"
        />
      </div>

      <Container className="relative flex flex-col gap-8 py-10 lg:gap-6 lg:py-8 lg:pl-[28%] xl:flex-row xl:items-center xl:justify-between">
        <div className="shrink-0 text-center lg:text-left">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">{c.title}</h2>
          <p className="mt-2 text-base text-white/90">{c.subtitle}</p>
          <a
            href="#offer"
            className="mt-5 inline-flex w-full items-center justify-center rounded-md bg-palm-600 px-7 py-3 text-base font-bold uppercase tracking-wide text-white shadow-md transition hover:bg-palm-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:w-auto"
          >
            {c.cta}
          </a>
        </div>

        <ul className="grid grid-cols-3 gap-3 sm:gap-8 lg:flex lg:gap-10 xl:gap-8">
          {c.badges.map((b, i) => {
            const Icon = ICONS[i]
            return (
              <li key={b.title} className="flex flex-col items-center gap-2 text-center sm:flex-row sm:text-left">
                <Icon className="size-10 shrink-0 text-white" strokeWidth={1.4} aria-hidden="true" />
                <span className="text-xs leading-tight text-white sm:whitespace-nowrap sm:text-[13px]">
                  <span className="block font-medium">{b.title}</span>
                  <span className="block">{b.text}</span>
                </span>
              </li>
            )
          })}
        </ul>
      </Container>
    </section>
  )
}