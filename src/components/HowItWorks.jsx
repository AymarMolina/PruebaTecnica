import { Fragment } from 'react'
import { ArrowRight } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext.jsx'
import Container from './ui/Container.jsx'
import { CalendarCheckIcon, DocumentPenIcon, MoneyBagIcon } from './ui/SolidIcons.jsx'

const ICONS = [DocumentPenIcon, MoneyBagIcon, CalendarCheckIcon]

export default function HowItWorks() {
  const { t } = useLanguage()
  const h = t.how

  return (
    <section id="how-it-works" className="border-b border-slate-200 bg-white pb-12 pt-4 sm:pb-16">
      <Container>
        <h2 className="text-center text-2xl font-bold text-navy-950 sm:text-3xl">{h.title}</h2>

        <ol className="mx-auto mt-8 flex max-w-6xl flex-col gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-4">
          {h.steps.map((step, i) => {
            const Icon = ICONS[i]
            return (
              <Fragment key={step.title}>
                <li className="flex items-start gap-4 sm:gap-5 lg:flex-1">
                  <span className="grid size-9 shrink-0 place-items-center rounded-full bg-palm-600 text-lg font-bold text-white">
                    {i + 1}
                  </span>
                  <Icon className="size-16 shrink-0 text-navy-900 sm:size-18" />
                  <div>
                    <h3 className="max-w-[11rem] text-base font-semibold leading-snug text-navy-600 sm:text-[17px]">
                      {step.title}
                    </h3>
                    <p className="mt-2 max-w-[14rem] text-sm leading-relaxed text-slate-800">{step.text}</p>
                  </div>
                </li>
                {i < h.steps.length - 1 && (
                  <li aria-hidden="true" className="hidden shrink-0 text-slate-900 lg:block">
                    <ArrowRight className="size-6" strokeWidth={1.5} />
                  </li>
                )}
              </Fragment>
            )
          })}
        </ol>
      </Container>
    </section>
  )
}