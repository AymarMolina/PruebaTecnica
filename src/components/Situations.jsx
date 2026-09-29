import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { useLanguage } from '../i18n/LanguageContext.jsx'
import Container from './ui/Container.jsx'
import {
  BuildingIcon,
  FlameIcon,
  HammerIcon,
  HeartBrokenIcon,
  HouseAlertIcon,
  HouseDoorIcon,
  KeyIcon,
  TruckIcon,
} from './ui/SolidIcons.jsx'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const ICONS = {
  foreclosure: HouseAlertIcon,
  inherited: KeyIcon,
  repairs: HammerIcon,
  relocating: TruckIcon,
  divorce: HeartBrokenIcon,
  vacant: HouseDoorIcon,
  rental: BuildingIcon,
  fire: FlameIcon,
}

const HOVER = {
  foreclosure: (el) => gsap.timeline().to(el, { y: -6, duration: 0.15 }).to(el, { y: 0, duration: 0.4, ease: 'bounce.out' }),
  inherited: (el) => gsap.to(el, { rotate: -25, duration: 0.25, yoyo: true, repeat: 1, ease: 'power2.inOut' }), // gira la llave
  repairs: (el) => gsap.to(el, { rotate: -30, transformOrigin: '20% 80%', duration: 0.15, yoyo: true, repeat: 3, ease: 'power1.inOut' }), // martilla
  relocating: (el) => gsap.timeline().to(el, { x: 14, duration: 0.25, ease: 'power2.in' }).to(el, { x: 0, duration: 0.45, ease: 'back.out(2)' }), // arranca el camión
  divorce: (el) => gsap.to(el, { scale: 1.15, duration: 0.15, yoyo: true, repeat: 3 }), // late el corazón
  vacant: (el) => gsap.timeline().to(el, { y: -6, duration: 0.15 }).to(el, { y: 0, duration: 0.4, ease: 'bounce.out' }),
  rental: (el) => gsap.fromTo(el, { scaleY: 0.85 }, { scaleY: 1, transformOrigin: 'bottom', duration: 0.5, ease: 'elastic.out(1, 0.4)' }),
  fire: (el) => gsap.to(el, { scaleY: 1.15, scaleX: 0.92, transformOrigin: 'bottom', duration: 0.12, yoyo: true, repeat: 5 }), // llama que parpadea
}

export default function Situations() {
  const { t } = useLanguage()
  const s = t.situations
  const sectionRef = useRef(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.from('.sit-title', {
          y: 20,
          autoAlpha: 0,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.sit-title', start: 'top 85%', once: true },
        })

        gsap.set('.sit-card', { y: 40, autoAlpha: 0 })
        ScrollTrigger.batch('.sit-card', {
          start: 'top 90%',
          once: true,
          onEnter: (cards) =>
            gsap.timeline()
              .to(cards, { y: 0, autoAlpha: 1, duration: 0.6, ease: 'power3.out', stagger: 0.1 })
              .from(
                cards.map((c) => c.querySelector('.sit-icon')),
                { scale: 0, rotate: -15, duration: 0.5, ease: 'back.out(2.5)', stagger: 0.1 },
                '<0.15',
              ),
        })
      })

      mm.add('(hover: hover) and (prefers-reduced-motion: no-preference)', () => {
        const cleanups = gsap.utils.toArray('.sit-card').map((card) => {
          const icon = card.querySelector('.sit-icon')
          const play = HOVER[card.dataset.key]
          const enter = () => {
            gsap.to(card, { y: -6, duration: 0.3, ease: 'power2.out' })
            if (!gsap.isTweening(icon)) play?.(icon)
          }
          const leave = () => gsap.to(card, { y: 0, duration: 0.3, ease: 'power2.out' })
          card.addEventListener('mouseenter', enter)
          card.addEventListener('mouseleave', leave)
          return () => {
            card.removeEventListener('mouseenter', enter)
            card.removeEventListener('mouseleave', leave)
          }
        })
        return () => cleanups.forEach((fn) => fn())
      })
    },
    { scope: sectionRef },
  )

  return (
    <section ref={sectionRef} id="situations" className="bg-white py-12 sm:py-16">
      <Container>
        <h2 className="sit-title text-center text-2xl font-bold text-navy-950 sm:text-3xl">{s.title}</h2>

        <ul className="mx-auto mt-8 grid max-w-6xl grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-4">
          {s.items.map((item) => {
            const Icon = ICONS[item.key]
            return (
              <li
                key={item.key}
                data-key={item.key}
                className="sit-card flex flex-col items-center rounded-md border border-slate-200 bg-white px-3 pb-5 pt-6 text-center shadow-sm transition-shadow duration-300 hover:shadow-lg sm:px-4 sm:pb-6 sm:pt-7"
              >
                <span className="sit-icon inline-flex">
                  <Icon className="size-12 text-navy-600 sm:size-16" />
                </span>
                <h3 className="mt-3 text-[15px] font-semibold leading-snug text-navy-700 sm:mt-4 sm:text-lg">{item.title}</h3>
                <p className="mt-1.5 max-w-[15rem] text-[13px] leading-snug text-slate-800 sm:text-[15px]">{item.text}</p>
              </li>
            )
          })}
        </ul>
      </Container>
    </section>
  )
}