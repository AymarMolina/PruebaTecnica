import { useId, useRef, useState } from 'react'
import { ChevronDown, CircleAlert, CircleCheck, Clock, Lock, LoaderCircle, Mail, MapPin, Phone, User } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext.jsx'
import { createLead } from '../lib/supabase.js'
import { formatUSPhone, validateLead } from '../lib/validation.js'
import { COMPANY } from '../lib/company.js'

const INITIAL = { fullName: '', phone: '', email: '', address: '', timeline: '', terms: false, website: '' }
const FIELD_ORDER = ['fullName', 'phone', 'email', 'address', 'terms']

function Field({ id, label, icon: Icon, error, errorText, children }) {
  return (
    <div>
      {/* Label accesible pero oculto: el mockup usa el placeholder como guía visual */}
      <label htmlFor={id} className="sr-only">{label}</label>
      <div className="relative">
        <Icon aria-hidden="true" strokeWidth={1.75} className={`pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 ${error ? 'text-red-500' : 'text-slate-500'}`} />
        {children}
      </div>
      {error && (
        <p id={`${id}-error`} className="mt-1.5 flex items-center gap-1 text-xs font-medium text-red-600">
          <CircleAlert className="size-3.5 shrink-0" aria-hidden="true" /> {errorText}
        </p>
      )}
    </div>
  )
}

export default function LeadForm({ onOpenTerms }) {
  const { t, lang } = useLanguage()
  const f = t.form
  const uid = useId()
  const formRef = useRef(null)
  const [values, setValues] = useState(INITIAL)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [status, setStatus] = useState('idle')
  const [submitError, setSubmitError] = useState('')

  const id = (name) => `${uid}-${name}`

  const inputCls = (name) =>
    `block h-13 w-full rounded-md border bg-white pl-12 pr-4 text-base text-slate-900 placeholder:text-slate-500
     transition focus:outline-none focus:ring-4
     ${errors[name] ? 'border-red-400 focus:border-red-500 focus:ring-red-100' : 'border-slate-300 focus:border-navy-600 focus:ring-navy-100'}`

  const describe = (name) => (errors[name] ? { 'aria-invalid': true, 'aria-describedby': `${id(name)}-error` } : {})

  function update(name, value) {
    const next = { ...values, [name]: name === 'phone' ? formatUSPhone(value) : value }
    setValues(next)
    if (touched[name]) setErrors((prev) => ({ ...prev, [name]: validateLead(next)[name] }))
  }

  function blur(name) {
    setTouched((prev) => ({ ...prev, [name]: true }))
    setErrors((prev) => ({ ...prev, [name]: validateLead(values)[name] }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (status === 'loading') return

    const found = validateLead(values)
    setErrors(found)
    setTouched({ fullName: true, phone: true, email: true, address: true, terms: true })
    if (Object.keys(found).length) {
      const first = FIELD_ORDER.find((k) => found[k])
      formRef.current?.querySelector(`#${CSS.escape(id(first))}`)?.focus()
      return
    }

    if (values.website) {
      setStatus('success')
      return
    }

    setStatus('loading')
    setSubmitError('')
    try {
      await createLead({
        full_name: values.fullName.trim() || null,
        phone: values.phone,
        email: values.email.trim().toLowerCase() || null,
        property_address: values.address.trim(),
        sell_timeline: values.timeline || null,
        accepted_terms: true,
        language: lang,
        source: 'landing',
      })
      setStatus('success')
    } catch (err) {
      console.error('[lead] insert failed', err)
      const msg = err?.message === 'SUPABASE_NOT_CONFIGURED'
        ? f.errors.notConfigured
        : err?.message?.toLowerCase().includes('fetch')
          ? f.errors.network
          : f.errors.generic
      setSubmitError(msg)
      setStatus('error')
    }
  }

  function reset() {
    setValues(INITIAL)
    setErrors({})
    setTouched({})
    setStatus('idle')
  }

  if (status === 'success') {
    return (
      <div role="status" className="flex flex-col items-center px-2 py-8 text-center animate-fade-up">
        <span className="grid size-16 place-items-center rounded-full bg-palm-50 text-palm-700 ring-8 ring-palm-50/60">
          <CircleCheck className="size-9" aria-hidden="true" />
        </span>
        <h3 className="mt-5 text-2xl font-extrabold">{f.successTitle}</h3>
        <p className="mt-3 text-slate-600">{f.successBody}</p>
        <a href={COMPANY.phoneHref} className="mt-5 inline-flex items-center gap-2 font-bold text-navy-900">
          <Phone className="size-4" aria-hidden="true" /> {COMPANY.phoneDisplay}
        </a>
        <button type="button" onClick={reset} className="mt-6 text-sm font-semibold text-palm-700 underline underline-offset-4 hover:text-palm-800">
          {f.successAgain}
        </button>
      </div>
    )
  }

  const err = (name) => errors[name] && f.errors[errors[name]]

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate className="relative space-y-3.5">
      <Field id={id('fullName')} label={f.fullName} icon={User} error={errors.fullName} errorText={err('fullName')}>
        <input id={id('fullName')} name="fullName" type="text" autoComplete="name" maxLength={120}
          placeholder={f.fullNamePh} value={values.fullName}
          onChange={(e) => update('fullName', e.target.value)} onBlur={() => blur('fullName')}
          className={inputCls('fullName')} {...describe('fullName')} />
      </Field>

      <>
        <Field id={id('phone')} label={`${f.phone} *`} icon={Phone} error={errors.phone} errorText={err('phone')}>
          <input id={id('phone')} name="phone" type="tel" inputMode="tel" autoComplete="tel-national" required
            placeholder={f.phonePh} value={values.phone}
            onChange={(e) => update('phone', e.target.value)} onBlur={() => blur('phone')}
            className={inputCls('phone')} {...describe('phone')} />
        </Field>
        <Field id={id('email')} label={f.email} icon={Mail} error={errors.email} errorText={err('email')}>
          <input id={id('email')} name="email" type="email" inputMode="email" autoComplete="email" maxLength={160}
            placeholder={f.emailPh} value={values.email}
            onChange={(e) => update('email', e.target.value)} onBlur={() => blur('email')}
            className={inputCls('email')} {...describe('email')} />
        </Field>
      </>

      <Field id={id('address')} label={`${f.address} *`} icon={MapPin} error={errors.address} errorText={err('address')}>
        <input id={id('address')} name="address" type="text" autoComplete="street-address" required maxLength={250}
          placeholder={f.addressPh} value={values.address}
          onChange={(e) => update('address', e.target.value)} onBlur={() => blur('address')}
          className={inputCls('address')} {...describe('address')} />
      </Field>

      <Field id={id('timeline')} label={f.timeline} icon={Clock}>
        <select id={id('timeline')} name="timeline" value={values.timeline}
          onChange={(e) => update('timeline', e.target.value)}
          className={`${inputCls('timeline').replace('text-slate-900', values.timeline ? 'text-slate-900' : 'text-slate-500')} cursor-pointer appearance-none pr-11`}>
          {Object.entries(f.timelineOptions).map(([value, label]) => (
            <option key={value} value={value} disabled={value === ''} className="text-navy-900">{label}</option>
          ))}
        </select>
        <ChevronDown aria-hidden="true" className="pointer-events-none absolute right-4 top-1/2 size-5 -translate-y-1/2 text-slate-700" />
      </Field>

      {/* Honeypot: invisible para personas */}
      <div aria-hidden="true" className="absolute -left-[9999px] size-px overflow-hidden">
        <label htmlFor={id('website')}>Website</label>
        <input id={id('website')} name="website" type="text" tabIndex={-1} autoComplete="off"
          value={values.website} onChange={(e) => update('website', e.target.value)} />
      </div>

      <div>
        <label htmlFor={id('terms')} className="flex cursor-pointer items-start gap-2.5 text-xs leading-relaxed text-slate-600">
          <input id={id('terms')} name="terms" type="checkbox" checked={values.terms}
            onChange={(e) => { update('terms', e.target.checked); setTouched((p) => ({ ...p, terms: true })); if (e.target.checked) setErrors((p) => ({ ...p, terms: undefined })) }}
            className={`mt-px size-4.5 shrink-0 cursor-pointer rounded accent-palm-700 ${errors.terms ? 'outline-2 outline-red-400' : ''}`}
            {...describe('terms')} />
          <span>
            {f.termsA}{' '}
            <button type="button" onClick={onOpenTerms} className="font-semibold text-navy-800 underline underline-offset-2 hover:text-palm-700">
              {f.termsLink}
            </button>{' '}
            {f.termsB} *
          </span>
        </label>
        {errors.terms && (
          <p id={`${id('terms')}-error`} className="mt-1.5 flex items-center gap-1 pl-7 text-xs font-medium text-red-600">
            <CircleAlert className="size-3.5 shrink-0" aria-hidden="true" /> {err('terms')}
          </p>
        )}
      </div>

      {status === 'error' && (
        <div role="alert" className="flex items-start gap-2 rounded-xl bg-red-50 p-3 text-sm text-red-700 ring-1 ring-red-200">
          <CircleAlert className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
          <span>{submitError}</span>
        </div>
      )}

      <button type="submit" disabled={status === 'loading'} aria-busy={status === 'loading'}
        className="flex w-full items-center justify-center gap-2 rounded-md bg-palm-600 px-6 py-4 text-xl font-bold uppercase tracking-wide text-white shadow-md shadow-palm-700/20 transition hover:bg-palm-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-palm-700 disabled:cursor-wait disabled:opacity-80">
        {status === 'loading' ? (<><LoaderCircle className="size-5 animate-spin" aria-hidden="true" /> {f.sending}</>) : f.submit}
      </button>

      <p className="flex items-center justify-center gap-1.5 text-sm text-slate-700">
        <Lock className="size-4 fill-slate-700 text-slate-700" aria-hidden="true" /> {f.secure}
      </p>
    </form>
  )
}