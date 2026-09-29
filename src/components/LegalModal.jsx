import { useEffect, useRef } from 'react'
import { X } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext.jsx'

export default function LegalModal({ type, onClose }) {
  const { t } = useLanguage()
  const ref = useRef(null)

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    if (type && !dialog.open) dialog.showModal()
    if (!type && dialog.open) dialog.close()
  }, [type])

  const content = type ? t.legal[type] : null

  return (
    <dialog ref={ref} onClose={onClose} onClick={(e) => e.target === ref.current && onClose()}
      className="m-auto w-[calc(100%-2rem)] max-w-lg rounded-3xl p-0 shadow-2xl backdrop:bg-navy-950/60 backdrop:backdrop-blur-sm">
      {content && (
        <div className="p-6 sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <h2 className="text-2xl font-extrabold">{content.title}</h2>
            <button type="button" onClick={onClose} aria-label={t.legal.close}
              className="grid size-9 shrink-0 place-items-center rounded-full bg-navy-50 text-navy-900 hover:bg-navy-100">
              <X className="size-5" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-4 space-y-3 text-sm leading-relaxed text-slate-600">
            {content.body.map((p) => <p key={p}>{p}</p>)}
          </div>
          <button type="button" onClick={onClose}
            className="mt-6 w-full rounded-xl bg-navy-900 py-3 text-sm font-bold uppercase tracking-wide text-white hover:bg-navy-800">
            {t.legal.close}
          </button>
        </div>
      )}
    </dialog>
  )
}
