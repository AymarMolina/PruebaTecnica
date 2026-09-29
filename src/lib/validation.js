
export function formatUSPhone(value) {
  let digits = value.replace(/\D/g, '')
  if (digits.length === 11 && digits.startsWith('1')) digits = digits.slice(1)
  digits = digits.slice(0, 10)
  if (digits.length < 4) return digits
  if (digits.length < 7) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export function validateLead(values) {
  const errors = {}
  const phoneDigits = values.phone.replace(/\D/g, '')

  if (values.fullName.trim().length > 120) errors.fullName = 'nameLong'

  if (!phoneDigits) errors.phone = 'phoneRequired'
  else if (phoneDigits.length !== 10 || /^[01]/.test(phoneDigits)) errors.phone = 'phoneInvalid'

  if (values.email.trim() && !EMAIL_RE.test(values.email.trim())) errors.email = 'emailInvalid'

  const address = values.address.trim()
  if (!address) errors.address = 'addressRequired'
  else if (address.length < 5 || !/\d/.test(address) || !/[a-zA-ZÀ-ÿ]{2,}/.test(address)) errors.address = 'addressShort'

  if (!values.terms) errors.terms = 'termsRequired'

  return errors
}
