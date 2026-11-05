// EDIT THIS FILE: single source of truth for company facts.
// Any value left as null / "" renders as a visible "TO BE CONFIRMED" placeholder. Nothing here is invented.
export const site = {
  name: 'NEOTECH MOULDING INDUSTRIES',
  short: 'NEOTECH',
  tagline: 'MOULDING THE FUTURE',
  url: 'https://www.example.com', // TODO: production domain
  city: 'Bahadurgarh',
  serviceArea: '' as string, // TODO: e.g. "Delhi NCR"
  address: 'Rohad, Bahadurgarh, Haryana 124507',
  phone: '97297 71818, 97298 24727',
  email: '' as string,
  whatsapp: '919729771818',
  gstin: '' as string,
  hours: '' as string,
  social: { linkedin: '', facebook: '', instagram: '' },
  // Verified statistics only. Leave null until supplied; counters hide automatically.
  stats: [
    { key: 'experience', label: 'Years of experience', value: null as number | null, suffix: '+' },
    { key: 'machines', label: 'Injection moulding machines', value: null as number | null, suffix: '' },
    { key: 'tonnage', label: 'Max clamping force (tons)', value: null as number | null, suffix: 'T' },
  ],
}
export const placeholder = (v: string | null | undefined, label: string) => (v && v.length ? v : `[${label} — to be confirmed]`)
export const waLink = (msg = 'Hello NEOTECH, I would like to discuss a plastic component requirement.') =>
  site.whatsapp ? `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(msg)}` : '/contact'
