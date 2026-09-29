function Svg({ className = 'size-16', children }) {
  return (
    <svg viewBox="0 0 64 64" fill="currentColor" aria-hidden="true" className={className}>
      {children}
    </svg>
  )
}

export function HouseAlertIcon(props) {
  return (
    <Svg {...props}>
      <path d="M32 6 4 30l3.4 4L12 30v26h40V30l4.6 4 3.4-4-9-7.7V10h-7v6.3z" />
      <rect x="29" y="30" width="6" height="14" rx="3" fill="#fff" />
      <circle cx="32" cy="50" r="3.2" fill="#fff" />
    </Svg>
  )
}

export function KeyIcon(props) {
  return (
    <Svg {...props}>
      <path d="M44 4a16 16 0 0 0-15.3 20.7L4 49.4V60h10.6v-5.3h5.3v-5.3h5.3l4.1-4.1A16 16 0 1 0 44 4z" />
      <circle cx="46.5" cy="17.5" r="5" fill="#fff" />
      <path d="M10 55 31 34" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
    </Svg>
  )
}

export function HammerIcon(props) {
  return (
    <Svg {...props}>
      <g transform="rotate(45 32 32) translate(0 2)">
        <rect x="27.5" y="22" width="9" height="42" rx="4.5" />
        <path d="M12 4h26c8 0 14 4 18 11H42v11H12a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3z" />
      </g>
    </Svg>
  )
}

export function TruckIcon(props) {
  return (
    <Svg {...props}>
      <rect x="2" y="14" width="36" height="30" rx="3" />
      <path d="M41 22h11.5a3 3 0 0 1 2.5 1.3l6.5 9.6a3 3 0 0 1 .5 1.7V44H41z" />
      <path d="M45 26h7.2l5 7.5H45z" fill="#fff" />
      <circle cx="14" cy="47" r="7" />
      <circle cx="14" cy="47" r="3" fill="#fff" />
      <circle cx="50" cy="47" r="7" />
      <circle cx="50" cy="47" r="3" fill="#fff" />
    </Svg>
  )
}

export function HeartBrokenIcon(props) {
  return (
    <Svg {...props}>
      <path d="M32 57S4 41 4 21.5A13.5 13.5 0 0 1 32 15a13.5 13.5 0 0 1 28 6.5C60 41 32 57 32 57z" />
      <path d="m33 14-6 12 9 6-7 11 3 12" fill="none" stroke="#fff" strokeWidth="3" strokeLinejoin="round" />
    </Svg>
  )
}

export function HouseDoorIcon(props) {
  return (
    <Svg {...props}>
      <path d="M32 6 4 30l3.4 4L12 30v26h40V30l4.6 4 3.4-4z" />
      <path d="M27 56V38h10v18z" fill="#fff" />
      <path d="M27 38l7 3v17l-7-2z" />
    </Svg>
  )
}

export function BuildingIcon(props) {
  return (
    <Svg {...props}>
      <rect x="10" y="4" width="34" height="56" rx="2" />
      <rect x="44" y="22" width="14" height="38" rx="2" />
      {[12, 22, 32].map((y) => [16, 30].map((x) => (
        <rect key={`${x}-${y}`} x={x} y={y} width="8" height="6" rx="1" fill="#fff" />
      )))}
      <rect x="23" y="46" width="8" height="14" fill="#fff" />
      <rect x="48" y="30" width="6" height="5" rx="1" fill="#fff" />
      <rect x="48" y="40" width="6" height="5" rx="1" fill="#fff" />
    </Svg>
  )
}

export function FlameIcon(props) {
  return (
    <Svg {...props}>
      <path d="M33 4c2 10 14 16 14 32a15 15 0 0 1-30 0c0-7 3-11 6-14 0 5 2 8 5 9-3-10 1-19 5-27z" />
      <path d="M32 58c-5 0-8-3.5-8-8 0-5 4-7 5-11 3 4 11 6 11 12 0 4-3.5 7-8 7z" fill="#fff" />
    </Svg>
  )
}

export function DocumentPenIcon(props) {
  return (
    <Svg {...props}>
      <path d="M8 4h28l12 12v12.5L30 46.5 28 60H8a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3z" fill="none" stroke="currentColor" strokeWidth="4" strokeLinejoin="round" />
      <path d="M36 4v12h12" fill="none" stroke="currentColor" strokeWidth="4" strokeLinejoin="round" />
      <path d="M14 22h20M14 31h20M14 40h12" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      <path d="M52.5 26.5a4 4 0 0 1 5.7 0l1.3 1.3a4 4 0 0 1 0 5.7L39 54l-9 2.5 2.5-9z" />
    </Svg>
  )
}

export function MoneyBagIcon(props) {
  return (
    <Svg {...props}>
      <path d="M22 4h20l-5 10H27z" />
      <rect x="25" y="15" width="14" height="5" rx="2.5" />
      <path d="M26 21h12c10 7 18 17 18 27 0 8-6 13-14 13H22C14 61 8 56 8 48c0-10 8-20 18-27z" />
      <text x="32" y="53" textAnchor="middle" fontSize="26" fontWeight="800" fill="#fff" fontFamily="Arial, sans-serif">$</text>
    </Svg>
  )
}

export function CalendarCheckIcon(props) {
  return (
    <Svg {...props}>
      <path d="M6 12a4 4 0 0 1 4-4h40a4 4 0 0 1 4 4v22.5A15 15 0 0 0 36.5 56H10a4 4 0 0 1-4-4z" />
      <rect x="10" y="20" width="40" height="32" fill="#fff" />
      <path d="M10 20h40v14.5A15 15 0 0 0 36.5 52H10z" fill="#fff" />
      {[[14, 25], [24, 25], [34, 25], [14, 34], [24, 34], [14, 43], [24, 43]].map(([x, y]) => (
        <rect key={`${x}-${y}`} x={x} y={y} width="7" height="6" rx="1" />
      ))}
      <rect x="15" y="3" width="5" height="11" rx="2.5" />
      <rect x="40" y="3" width="5" height="11" rx="2.5" />
      <circle cx="48" cy="48" r="13" fill="#fff" />
      <circle cx="48" cy="48" r="11" fill="none" stroke="currentColor" strokeWidth="3.5" />
      <path d="m42.5 48 4 4 7.5-8" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  )
}