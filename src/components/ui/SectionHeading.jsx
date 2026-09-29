export default function SectionHeading({ eyebrow, title, subtitle, align = 'center', light = false }) {
  const alignCls = align === 'center' ? 'mx-auto text-center' : 'text-left'
  return (
    <div className={`max-w-2xl ${alignCls}`}>
      {eyebrow && (
        <p className={`text-xs font-bold uppercase tracking-[0.18em] ${light ? 'text-palm-400' : 'text-palm-700'}`}>
          {eyebrow}
        </p>
      )}
      <h2 className={`mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl ${light ? 'text-white' : ''}`}>{title}</h2>
      {subtitle && <p className={`mt-4 text-base sm:text-lg ${light ? 'text-navy-100' : 'text-slate-600'}`}>{subtitle}</p>}
    </div>
  )
}
