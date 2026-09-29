import { Mail, MapPin, Phone } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext.jsx'
import { COMPANY } from '../lib/company.js'
import { SocialIcon } from './ui/SocialIcons.jsx'
import Container from './ui/Container.jsx'

const SOCIALS = [
  { name: 'facebook', label: 'Facebook', href: 'https://facebook.com' },
  { name: 'instagram', label: 'Instagram', href: 'https://instagram.com' },
  { name: 'youtube', label: 'YouTube', href: 'https://youtube.com' },
]

export default function Footer({ onOpenLegal }) {
  const { t } = useLanguage()
  const f = t.footer
  const year = new Date().getFullYear()

  return (
    <footer className="bg-navy-950 pb-24 text-white md:pb-0">
      <Container className="grid grid-cols-2 gap-x-6 gap-y-7 pb-4 pt-8 lg:grid-cols-[1.3fr_1.3fr_1fr_0.9fr] lg:gap-6">
        {/* Logo horizontal en versión clara */}
        <div className="col-span-2 flex items-start lg:col-span-1 lg:items-center lg:justify-center lg:pt-2">
          <img
            src="/logo-horizontal-light.png"
            alt={COMPANY.name}
            width="900"
            height="234"
            loading="lazy"
            className="h-12 w-auto lg:h-14"
          />
        </div>

        <div className="col-span-2 lg:col-span-1">
          <h3 className="text-[15px] font-semibold text-white">{f.contact}</h3>
          <ul className="mt-2.5 space-y-2 text-[13px] text-white/90">
            <li>
              <a href={COMPANY.phoneHref} className="flex items-center gap-4 hover:text-white">
                <Phone className="size-4 shrink-0" strokeWidth={1.5} aria-hidden="true" />
                {COMPANY.phoneShort}
              </a>
            </li>
            <li>
              <a href={`mailto:${COMPANY.email}`} className="flex items-center gap-4 break-all hover:text-white">
                <Mail className="size-4 shrink-0" strokeWidth={1.5} aria-hidden="true" />
                {COMPANY.email}
              </a>
            </li>
            <li className="flex items-center gap-4">
              <MapPin className="size-4 shrink-0" strokeWidth={1.5} aria-hidden="true" />
              {COMPANY.city}
            </li>
          </ul>
        </div>

        <div className="lg:pt-3">
          <h3 className="text-[15px] font-semibold text-white">{f.links}</h3>
          <ul className="mt-2.5 space-y-1.5 text-[13px] text-white/90">
            <li>
              <button type="button" onClick={() => onOpenLegal('privacy')} className="hover:text-white hover:underline">
                {f.privacy}
              </button>
            </li>
            <li>
              <button type="button" onClick={() => onOpenLegal('terms')} className="hover:text-white hover:underline">
                {f.terms}
              </button>
            </li>
          </ul>
        </div>

        <div className="lg:pt-3">
          <h3 className="text-[15px] font-semibold text-white">{f.follow}</h3>
          <div className="mt-3 flex gap-3">
            {SOCIALS.map((s) => (
              <a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
                className="grid size-7 place-items-center rounded-full bg-white/55 text-navy-900 transition hover:bg-white"
              >
                <SocialIcon name={s.name} className="size-4" />
              </a>
            ))}
          </div>
        </div>
      </Container>

      <p className="pb-4 text-center text-xs text-white/85">
        © {year} {COMPANY.name}. {f.rights}
      </p>
    </footer>
  )
}