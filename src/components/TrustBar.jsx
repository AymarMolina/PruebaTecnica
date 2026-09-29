import { useRef, useState } from 'react'
import { CalendarDays, CircleDollarSign, Star, Tag } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { useLanguage } from '../i18n/LanguageContext.jsx'
import Container from './ui/Container.jsx'

gsap.registerPlugin(ScrollTrigger, useGSAP)

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
      height="30"
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
  const sectionRef = useRef(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      // Solo anima si el usuario no pidió "reducir movimiento" en su sistema
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%', // arranca cuando la sección entra al 85% de la pantalla
            once: true, // se anima una sola vez
          },
        })

        // 1. Cada bloque sube y aparece, uno tras otro
        tl.from('.trust-item', {
          y: 24,
          autoAlpha: 0,
          duration: 0.6,
          ease: 'power3.out',
          stagger: 0.12,
        })
          // 2. Los íconos hacen un "pop" con rebote
          .from(
            '.trust-icon',
            { scale: 0, rotate: -20, duration: 0.5, ease: 'back.out(2)', stagger: 0.12 },
            '<0.1', // empieza 0.1s después del paso anterior
          )
          // 3. Las estrellas se encienden una por una
          .from(
            '.trust-star',
            { scale: 0, autoAlpha: 0, duration: 0.3, ease: 'back.out(3)', stagger: 0.08 },
            '-=0.2',
          )
      })

      // Hover: el ícono gira un poco al pasar el mouse sobre su bloque
      const cleanups = gsap.utils.toArray('.trust-item').map((item) => {
        const icon = item.querySelector('.trust-icon')
        if (!icon) return () => {}
        const enter = () => gsap.to(icon, { rotate: 8, scale: 1.08, duration: 0.3, ease: 'power2.out' })
        const leave = () => gsap.to(icon, { rotate: 0, scale: 1, duration: 0.3, ease: 'power2.out' })
        item.addEventListener('mouseenter', enter)
        item.addEventListener('mouseleave', leave)
        return () => {
          item.removeEventListener('mouseenter', enter)
          item.removeEventListener('mouseleave', leave)
        }
      })

      return () => cleanups.forEach((fn) => fn())
    },
    { scope: sectionRef }, // los selectores solo buscan dentro de esta sección
  )

  return (
    <section ref={sectionRef} aria-label="Benefits" className="border-b border-slate-200 bg-slate-50">
      <Container className="grid grid-cols-1 gap-6 py-7 min-[480px]:grid-cols-2 lg:grid-cols-[repeat(3,1fr)_auto] lg:gap-0">
        {t.trust.map((item, i) => (
          <div
            key={i}
            className="trust-item flex items-center gap-4 lg:border-r lg:border-slate-300 lg:px-8 lg:first:pl-0"
          >
            <span className="trust-icon inline-flex shrink-0">{ITEMS[i].icon}</span>
            <div>
              <p className="text-base font-semibold text-navy-900">{item.title}</p>
              <p className="mt-0.5 text-sm leading-snug text-slate-700">{item.text}</p>
            </div>
          </div>
        ))}

        {/* Calificación */}
        <div className="trust-item flex items-center gap-4 min-[480px]:justify-center lg:flex-col lg:gap-1 lg:pl-8 lg:pr-2">
          <GoogleLogo />
          <div className="flex flex-col items-start lg:items-center">
            <span className="flex gap-0.5 text-amber-400" role="img" aria-label="5 / 5">
              {Array.from({ length: 5 }).map((_, k) => (
                <Star key={k} className="trust-star size-5 fill-current" aria-hidden="true" />
              ))}
            </span>
            <span className="mt-0.5 text-sm text-slate-700">{t.rating.label}</span>
          </div>
        </div>
      </Container>
    </section>
  )
}