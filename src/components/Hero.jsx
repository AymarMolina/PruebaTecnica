import { Check } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext.jsx'
import { COMPANY } from '../lib/company.js'
import Container from './ui/Container.jsx'
import LeadForm from './LeadForm.jsx'

export default function Hero({ onOpenTerms }) {
  const { t } = useLanguage()
  const h = t.hero

  return (
    <section id="top" className="relative isolate overflow-hidden">
      {/* Fondo de respaldo (cielo → pasto) mientras no haya foto */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-30 bg-[linear-gradient(180deg,#9fd3f2_0%,#d7eefa_45%,#eef7ea_70%,#8ccb6e_88%,#5fae45_100%)]"
      />
      {/* Foto del hero: public/images/hero.jpg */}
      {COMPANY.heroImage && (
        <img
          src={COMPANY.heroImage}
          alt=""
          aria-hidden="true"
          fetchPriority="high"
          className="absolute inset-0 -z-20 size-full object-cover object-[70%_center]"
        />
      )}
      {/* Degradado blanco a la izquierda para que el texto se lea (arriba en móvil) */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-b from-white via-white/90 to-white/40 lg:bg-gradient-to-r lg:from-white lg:from-25% lg:via-white/80 lg:via-40% lg:to-transparent lg:to-60%"
      />

      <Container className="grid items-center gap-8 py-10 sm:py-14 lg:grid-cols-[1fr_27rem] lg:gap-12 lg:py-8 xl:grid-cols-[1fr_28rem]">
        <div className="animate-fade-up lg:py-10">
          <h1 className="max-w-2xl text-[2.5rem] font-extrabold leading-[1.1] tracking-tight text-navy-950 sm:text-5xl lg:text-[3.4rem]">
            {h.title}
          </h1>
          <p className="mt-4 text-xl font-medium text-slate-900 sm:text-2xl lg:text-[1.7rem]">{h.subtitle}</p>

          <ul className="mt-6 space-y-3">
            {h.bullets.map((b) => (
              <li key={b} className="flex items-center gap-3 text-lg text-slate-900 lg:text-xl">
                <span className="grid size-7 shrink-0 place-items-center rounded-full bg-palm-600 text-white">
                  <Check className="size-4" strokeWidth={3.5} aria-hidden="true" />
                </span>
                {b}
              </li>
            ))}
          </ul>

          {/* En móvil el formulario va justo debajo, así que el CTA solo se muestra en desktop */}
          <div className="mt-8 hidden w-full max-w-[21rem] lg:block">
            <a
              href="#offer"
              className="flex w-full items-center justify-center rounded-md bg-palm-600 px-6 py-4 text-xl font-bold uppercase tracking-wide text-white shadow-md shadow-palm-700/20 transition hover:bg-palm-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-palm-700"
            >
              {h.cta}
            </a>
            <p className="mt-3 text-center text-sm text-slate-800">{h.ctaNote}</p>
          </div>
        </div>

        <div
          id="offer"
          className="scroll-mt-24 rounded-xl bg-white p-5 shadow-2xl shadow-navy-900/20 ring-1 ring-slate-200 animate-fade-up [animation-delay:120ms] sm:p-6"
        >
          <div className="mb-5 text-center">
            <h2 className="text-2xl font-bold text-slate-900">{t.form.title} </h2>
            <p className="mt-1 text-sm font-medium text-palm-600">{t.form.subtitle} </p>
          </div>
          <LeadForm onOpenTerms={onOpenTerms} />
        </div>
      </Container>
    </section>
  )
}