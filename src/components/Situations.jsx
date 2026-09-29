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

export default function Situations() {
  const { t } = useLanguage()
  const s = t.situations

  return (
    <section id="situations" className="bg-white py-12 sm:py-16">
      <Container>
        <h2 className="text-center text-2xl font-bold text-navy-950 sm:text-3xl">{s.title}</h2>

        <ul className="mx-auto mt-8 grid max-w-6xl grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-4">
          {s.items.map((item) => {
            const Icon = ICONS[item.key]
            return (
              <li
                key={item.key}
                className="flex flex-col items-center rounded-md border border-slate-200 bg-white px-3 pb-5 pt-6 text-center sm:px-4 sm:pb-6 sm:pt-7 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <Icon className="size-12 text-navy-600 sm:size-16" />
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