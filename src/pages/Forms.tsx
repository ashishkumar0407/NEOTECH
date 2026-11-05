import { useRef, useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { Seo } from '../components/Seo'
import { Eyebrow, Reveal } from '../components/ui'
import { site, placeholder, waLink } from '../config/site'

const MAX_MB = 10, MAX_FILES = 3
const OK = ['.pdf', '.png', '.jpg', '.jpeg', '.webp', '.dwg', '.dxf', '.step', '.stp', '.iges', '.igs', '.stl']
type Status = { kind: 'idle' | 'sending' | 'ok' | 'err'; msg?: string; dev?: boolean }

const Field = ({ id, label, required, error, children }: { id: string; label: string; required?: boolean; error?: string; children: React.ReactNode }) => (
  <div>
    <label htmlFor={id} className="mono mb-2 block text-navy">{label}{required && <span className="text-orange"> *</span>}</label>
    {children}
    {error && <p id={`${id}-err`} role="alert" className="mt-1 text-sm text-red-700">{error}</p>}
  </div>
)
const inp = 'min-h-12 w-full border border-navy/25 bg-white px-4 py-3 text-navy outline-none transition-colors focus:border-orange'

function useSubmit(kind: 'quote' | 'contact') {
  const [status, setStatus] = useState<Status>({ kind: 'idle' })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const formRef = useRef<HTMLFormElement>(null)
  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    const er: Record<string, string> = {}
    const v = (k: string) => String(fd.get(k) || '').trim()
    if (v('name').length < 2) er.name = 'Please enter your full name.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v('email'))) er.email = 'Enter a valid business email.'
    if (kind === 'quote' && !/^[+\d][\d\s()-]{7,}$/.test(v('phone'))) er.phone = 'Enter a valid phone number.'
    if (v('message').length < 10) er.message = 'Please describe your requirement (at least 10 characters).'
    const files = fd.getAll('files').filter((f): f is File => f instanceof File && f.size > 0)
    if (files.length > MAX_FILES) er.files = `Attach at most ${MAX_FILES} files.`
    for (const f of files) {
      if (f.size > MAX_MB * 1024 * 1024) er.files = `${f.name} exceeds ${MAX_MB} MB.`
      else if (!OK.some(x => f.name.toLowerCase().endsWith(x))) er.files = `${f.name}: unsupported type. Allowed: ${OK.join(' ')}`
    }
    setErrors(er)
    if (Object.keys(er).length) { formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus(); return }
    fd.set('kind', kind)
    setStatus({ kind: 'sending' })
    try {
      const r = await fetch('/api/enquiry', { method: 'POST', body: fd })
      const j = await r.json().catch(() => ({}))
      if (!r.ok) throw new Error(j.error || `Server responded ${r.status}`)
      setStatus({ kind: 'ok', dev: j.mode === 'dev' }); formRef.current?.reset()
    } catch (err) {
      setStatus({ kind: 'err', msg: err instanceof TypeError ? 'Could not reach the server. Start it with “npm run server” or use WhatsApp below.' : (err as Error).message })
    }
  }
  return { status, errors, submit, formRef }
}

const Hp = () => <div aria-hidden className="absolute -left-[9999px]"><label>Leave empty<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
const Result = ({ s }: { s: Status }) => s.kind === 'ok' ? (
  <div role="status" className="border border-navy bg-white p-5 text-navy"><strong>Enquiry received.</strong> Our team will respond to your email.{s.dev && <span className="mono mt-2 block text-orange">Dev mode — saved locally, not emailed. Configure SMTP in .env.</span>}</div>
) : s.kind === 'err' ? <div role="alert" className="border border-red-700 bg-white p-5 text-red-800">{s.msg}</div> : null

import { assets } from '../config/assets'
import { PageHero } from '../components/PageHero'

export function Quote() {
  const { status, errors, submit, formRef } = useSubmit('quote')
  const e = errors
  const aria = (k: string) => ({ 'aria-invalid': !!e[k], 'aria-describedby': e[k] ? `${k}-err` : undefined })
  return (<>
    <Seo title="Custom Plastic Component Quote" desc="Request a quote for custom plastic injection-moulded components from your drawing, CAD file, sample or reference photographs." path="/quote" />
    <PageHero
      eyebrow="Custom Manufacturing"
      eyebrowNumber="01"
      title="From Drawing to Production."
      highlight="Your Component, Our Manufacturing Expertise."
      description="Upload your engineering drawings, CAD files, or reference samples to receive a full manufacturing feasibility and unit cost estimate."
      image={assets.catMobility}
      imageAlt="Precision moulded plastic parts"
      imageSlot="catMobility · custom quote parts"
      stats={[
        { label: 'Turnaround', value: '24-48 Hours' },
        { label: 'File Types', value: 'CAD, STEP, PDF' },
        { label: 'Confidentiality', value: 'NDA Covered' },
      ]}
      primaryCtaText="Jump to Form"
      primaryCtaLink="#quote-form"
    />
    <section id="quote-form" className="mx-auto grid max-w-[1400px] gap-14 px-5 py-20 md:grid-cols-12 md:px-10">
      <div className="md:col-span-4"><h2 className="text-2xl font-bold text-navy">Start from what you have</h2>
        <ul className="mt-6 divide-y divide-navy/15 border-y border-navy/15">{['Engineering drawings', 'CAD files', 'Physical samples', 'Reference photographs', 'Functional requirements'].map(x => <li key={x} className="flex gap-3 py-3"><span className="mt-2 h-1 w-3 bg-orange" />{x}</li>)}</ul>
        <p className="mt-6 text-sm text-graphite/70">Files: up to {MAX_FILES} files, {MAX_MB} MB each. PDF, images, DWG/DXF, STEP/IGES, STL.</p>
        <a href={waLink('Hello NEOTECH, I would like a quote for a plastic component.')} className="mt-6 inline-flex min-h-12 items-center border border-navy px-5 font-semibold text-navy hover:bg-navy hover:text-white">Enquire on WhatsApp instead</a></div>
      <Reveal className="md:col-span-8"><form ref={formRef} onSubmit={submit} noValidate className="relative grid gap-6 sm:grid-cols-2" encType="multipart/form-data">
        <Hp />
        <Field id="name" label="Full name" required error={e.name}><input id="name" name="name" autoComplete="name" className={inp} {...aria('name')} /></Field>
        <Field id="company" label="Company name"><input id="company" name="company" autoComplete="organization" className={inp} /></Field>
        <Field id="email" label="Business email" required error={e.email}><input id="email" name="email" type="email" autoComplete="email" className={inp} {...aria('email')} /></Field>
        <Field id="phone" label="Phone number" required error={e.phone}><input id="phone" name="phone" type="tel" autoComplete="tel" className={inp} {...aria('phone')} /></Field>
        <Field id="category" label="Product category"><select id="category" name="category" className={inp}><option>Mobility &amp; EV support parts</option><option>Electrical &amp; infrastructure</option><option>Appliance &amp; utility products</option><option>Other / custom</option></select></Field>
        <Field id="material" label="Required material"><select id="material" name="material" className={inp}><option>Not sure — advise me</option><option>PP</option><option>ABS</option><option>HDPE</option><option>Other (describe below)</option></select></Field>
        <Field id="quantity" label="Estimated quantity"><input id="quantity" name="quantity" placeholder="e.g. per month or per batch" className={inp} /></Field>
        <Field id="mould" label="Mould requirement"><select id="mould" name="mould" className={inp}><option>I have an existing mould</option><option>New mould required</option><option>Not sure</option></select></Field>
        <div className="sm:col-span-2"><Field id="message" label="Project description" required error={e.message}><textarea id="message" name="message" rows={5} className={inp} {...aria('message')} /></Field></div>
        <div className="sm:col-span-2"><Field id="reference" label="Drawing or sample reference"><input id="reference" name="reference" placeholder="Drawing number, link, or sample description" className={inp} /></Field></div>
        <div className="sm:col-span-2"><Field id="files" label={`Upload CAD / PDF / images (max ${MAX_FILES} files, ${MAX_MB} MB each)`} error={e.files}><input id="files" name="files" type="file" multiple accept={OK.join(',')} className={`${inp} file:mr-4 file:border-0 file:bg-navy file:px-4 file:py-2 file:text-white`} {...aria('files')} /></Field></div>
        <div className="sm:col-span-2 flex flex-wrap items-center gap-4"><button disabled={status.kind === 'sending'} className="min-h-12 bg-orange px-8 font-semibold text-white hover:bg-navy disabled:opacity-60">{status.kind === 'sending' ? 'Sending…' : 'Submit quote request'}</button></div>
        <div className="sm:col-span-2" aria-live="polite"><Result s={status} /></div>
      </form></Reveal>
    </section></>)
}

export function Contact() {
  const { status, errors, submit, formRef } = useSubmit('contact')
  const e = errors
  const rows: [string, string][] = [['Address', placeholder(site.address, 'Address')], ['Phone', placeholder(site.phone, 'Phone')], ['Email', placeholder(site.email, 'Email')], ['Business hours', placeholder(site.hours, 'Hours')], ['GSTIN', placeholder(site.gstin, 'GSTIN')]]
  return (<>
    <Seo title="Contact" desc="Contact NEOTECH Moulding Industries for plastic injection moulding enquiries and manufacturing quotes." path="/contact" />
    <PageHero
      eyebrow="Contact"
      eyebrowNumber="02"
      title="Talk to our Engineering & Plant Team."
      highlight="Direct Factory Line."
      description="Connect directly with our manufacturing unit for inquiries, site visits, production planning, or commercial agreements."
      image={assets.heroMachine}
      imageAlt="NEOTECH injection moulding facility"
      imageSlot="heroMachine · factory machinery"
      stats={[
        { label: 'Plant Response', value: '< 24 Hours' },
        { label: 'Communication', value: 'Direct Call / WA' },
        { label: 'Location', value: 'Industrial Hub' },
      ]}
      primaryCtaText="Send Message Below"
      primaryCtaLink="#contact-form"
    />
    <section id="contact-form" className="mx-auto grid max-w-[1400px] gap-14 px-5 py-20 md:grid-cols-12 md:px-10">
      <dl className="md:col-span-5">{rows.map(([k, v]) => <div key={k} className="border-b border-navy/15 py-4"><dt className="mono text-steel">{k}</dt><dd className="mt-1 text-lg text-navy">{v}</dd></div>)}
        <div className="mt-8 flex flex-wrap gap-3"><a href={waLink()} className="inline-flex min-h-12 items-center bg-navy px-5 font-semibold text-white hover:bg-orange">WhatsApp</a><Link to="/quote" className="inline-flex min-h-12 items-center bg-orange px-5 font-semibold text-white hover:bg-navy">Manufacturing quote</Link></div>
      </dl>
      <form ref={formRef} onSubmit={submit} noValidate className="relative grid gap-6 md:col-span-7"><Hp />
        <Field id="name" label="Full name" required error={e.name}><input id="name" name="name" autoComplete="name" className={inp} aria-invalid={!!e.name} /></Field>
        <Field id="email" label="Email" required error={e.email}><input id="email" name="email" type="email" autoComplete="email" className={inp} aria-invalid={!!e.email} /></Field>
        <Field id="message" label="Message" required error={e.message}><textarea id="message" name="message" rows={6} className={inp} aria-invalid={!!e.message} /></Field>
        <div><button disabled={status.kind === 'sending'} className="min-h-12 bg-orange px-8 font-semibold text-white hover:bg-navy disabled:opacity-60">{status.kind === 'sending' ? 'Sending…' : 'Send message'}</button></div>
        <div aria-live="polite"><Result s={status} /></div></form>
    </section></>)
}

export function Soon({ title, children }: { title: string; children?: React.ReactNode }) {
  return (<><Seo title={title} desc={`${title} — NEOTECH Moulding Industries.`} />
    <PageHero
      eyebrow="NEOTECH"
      title={title}
      highlight="Under Active Manufacturing."
      description={typeof children === 'string' ? children : 'This section is being updated with verified plant specifications and technical data.'}
      image={assets.factory}
      imageAlt="NEOTECH manufacturing plant"
      imageSlot="factory · production floor"
    />
    <section className="grid-bg-light min-h-[40vh] px-5 py-20 md:px-10"><div className="mx-auto max-w-[1400px]">
      <p className="max-w-xl text-lg text-graphite/75">{children || 'For immediate questions or component manufacturing quotes, please connect with our team.'}</p>
      <div className="mt-8 flex gap-4">
        <Link to="/quote" className="inline-flex min-h-12 items-center bg-orange px-6 font-semibold text-white hover:bg-navy">Request a quote</Link>
        <Link to="/" className="inline-flex min-h-12 items-center border border-navy px-6 font-semibold text-navy hover:bg-navy hover:text-white">Return Home</Link>
      </div>
    </div></section></>)
}

