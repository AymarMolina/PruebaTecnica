const variants = {
  primary:
    'bg-palm-700 text-white shadow-lg shadow-palm-700/25 hover:bg-palm-800 focus-visible:outline-palm-700',
  secondary:
    'bg-white text-navy-900 ring-1 ring-inset ring-navy-200 hover:bg-navy-50 focus-visible:outline-navy-900',
  navy: 'bg-navy-900 text-white hover:bg-navy-800 focus-visible:outline-navy-900',
}
const sizes = {
  md: 'px-5 py-3 text-sm',
  lg: 'px-7 py-4 text-base',
}

/** Botón reutilizable: renderiza <a> si recibe href, si no <button>. */
export default function Button({ href, variant = 'primary', size = 'md', className = '', children, ...props }) {
  const cls = `inline-flex items-center justify-center gap-2 rounded-xl font-bold uppercase tracking-wide transition
    focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-70
    ${variants[variant]} ${sizes[size]} ${className}`
  return href ? (
    <a href={href} className={cls} {...props}>{children}</a>
  ) : (
    <button className={cls} {...props}>{children}</button>
  )
}
