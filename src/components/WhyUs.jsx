import { useEffect, useState } from 'react'
import { Check } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext.jsx'
import { COMPANY } from '../lib/company.js'
import Container from './ui/Container.jsx'

function QuoteMark() {
  return (
    <svg viewBox="0 0 32 24" className="h-6 w-8 text-navy-700" fill="currentColor" aria-hidden="true">
      <path d="M0 24V14C0 6.5 4 1.6 11.5 0l1.4 3.3C8.6 4.8 6.4 7.6 6.2 11H12v13zm19 0V14c0-7.5 4-12.4 11.5-14l1.4 3.3c-4.3 1.5-6.5 4.3-6.7 7.7H31v13z" />
    </svg>
  )
}

export default function WhyUs() {
  const { t } = useLanguage()
  const w = t.why
  const total = w.testimonials.length
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused) return
    const id = setInterval(() => setIndex((i) => (i + 1) % total), 6000)
    return () => clearInterval(id)
  }, [paused, total])

  const current = w.testimonials[index]

  return (
    <section id="why-us" className="bg-slate-50 py-12 sm:py-16">
      <Container className="grid items-center gap-8 md:grid-cols-2 lg:grid-cols-[1fr_1.15fr_1.1fr] lg:gap-10">
        {/* Lista */}
        <div className="lg:pl-6">
          <h2 className="text-2xl font-bold text-navy-950 sm:text-[1.7rem]">{w.title}</h2>
          <ul className="mt-5 space-y-3">
            {w.points.map((p) => (
              <li key={p} className="flex items-center gap-3 text-base text-slate-800 sm:text-[17px]">
                <span className="grid size-5 shrink-0 place-items-center rounded-full bg-palm-600 text-white">
                  <Check className="size-3.5" strokeWidth={3.5} aria-hidden="true" />
                </span>
                {p}
              </li>
            ))}
          </ul>
        </div>

        {/* Foto */}
        <div className="order-last aspect-[3/2] overflow-hidden rounded-xl shadow-lg shadow-navy-900/10 md:order-none md:col-span-2 lg:col-span-1">
          {COMPANY.whyImage ? (
            <img src={COMPANY.whyImage} alt={w.photoAlt} loading="lazy" className="size-full object-cover" />
          ) : (
            <div className="grid size-full place-items-center bg-gradient-to-br from-navy-700 to-navy-950">
              <img src="/logo-mark-light.png" alt="" aria-hidden="true" className="w-1/2 opacity-90" />
            </div>
          )}
        </div>

        {/* Testimonio */}
        <figure
          className="rounded-xl border border-slate-200 bg-white px-7 pb-5 pt-6 shadow-sm"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          aria-roledescription="carousel"
        >
          <QuoteMark />
          <div aria-live="polite" className="min-h-36">
            <blockquote key={index} className="mt-3 text-lg italic leading-relaxed text-slate-800 animate-fade-up">
              “{current.quote}”
            </blockquote>
            <figcaption className="mt-4">
              <span className="block font-semibold text-navy-700">- {current.name}</span>
              <span className="block pl-2 text-sm text-slate-700">{current.city}</span>
            </figcaption>
          </div>
          <div className="mt-4 flex justify-center gap-2.5">
            {w.testimonials.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`${i + 1} / ${total}`}
                aria-current={i === index}
                className={`size-2.5 rounded-full transition-colors ${i === index ? 'bg-navy-900' : 'bg-navy-200 hover:bg-navy-600'}`}
              />
            ))}
          </div>
        </figure>
      </Container>
    </section>
  )
}