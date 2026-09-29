import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext.jsx'
import Container from './ui/Container.jsx'

function FaqItem({ id, q, a, open, onToggle }) {
  return (
    <div className="rounded-md border border-slate-200 bg-white shadow-sm">
      <h3>
        <button
          type="button"
          id={`${id}-q`}
          aria-expanded={open}
          aria-controls={`${id}-a`}
          onClick={onToggle}
          className="flex w-full items-center justify-between gap-4 px-6 py-2.5 text-left text-[15px] text-slate-900 transition hover:text-navy-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy-600"
        >
          {q}
          <ChevronDown
            className={`size-5 shrink-0 text-slate-800 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
            aria-hidden="true"
          />
        </button>
      </h3>
      <div
        id={`${id}-a`}
        role="region"
        aria-labelledby={`${id}-q`}
        className={`grid transition-[grid-template-rows] duration-300 ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
      >
        <div className="min-h-0 overflow-hidden" inert={!open}>
          <p className="border-t border-slate-100 px-6 pb-4 pt-3 text-sm leading-relaxed text-slate-600">{a}</p>
        </div>
      </div>
    </div>
  )
}

export default function FAQ() {
  const { t } = useLanguage()
  const [open, setOpen] = useState(-1)
  const items = t.faq.items
  const half = Math.ceil(items.length / 2)
  const columns = [items.slice(0, half), items.slice(half)]

  return (
    <section id="faq" className="bg-white py-10 sm:py-12">
      <Container>
        <h2 className="text-center text-2xl font-bold text-navy-950 sm:text-3xl">{t.faq.title}</h2>
        <div className="mx-auto mt-6 grid max-w-5xl items-start gap-2 md:grid-cols-2 md:gap-8">
          {columns.map((col, c) => (
            <div key={c} className="space-y-2">
              {col.map((item, k) => {
                const i = c * half + k
                return (
                  <FaqItem
                    key={i}
                    id={`faq-${i}`}
                    q={item.q}
                    a={item.a}
                    open={open === i}
                    onToggle={() => setOpen(open === i ? -1 : i)}
                  />
                )
              })}
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}