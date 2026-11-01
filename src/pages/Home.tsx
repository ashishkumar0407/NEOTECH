import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion, useScroll, useTransform, useReducedMotion, useMotionValue, useSpring, animate, useInView } from 'framer-motion'
import { ArrowUpRight, Check, Circle } from 'lucide-react'
import { Button, Eyebrow, Photo, Reveal } from '../components/ui'
import { Seo } from '../components/Seo'
import { site, waLink } from '../config/site'
import { assets } from '../config/assets'
import { useI18n } from '../i18n'

const Words = ({ text, delay = 0 }: { text: string; delay?: number }) => {
  const rm = useReducedMotion()
  return <>{text.split(' ').map((w, i) => (
    <span key={i} className="inline-block overflow-hidden align-bottom">
      <motion.span className="inline-block" initial={rm ? false : { y: '110%' }} animate={{ y: 0 }} transition={{ duration: 0.8, delay: delay + i * 0.07, ease: [0.22, 1, 0.36, 1] }}>{w}&nbsp;</motion.span>
    </span>))}</>
}

function Hero() {
  const { t } = useI18n()
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '14%'])
  return (
    <section ref={ref} className="relative isolate flex min-h-[100svh] items-end overflow-hidden bg-navy text-white">
      <motion.div style={{ y }} className="absolute inset-0 -z-10 scale-110"><Photo src={assets.heroMachine} slot="heroMachine · Toshiba injection moulding machine, wide" alt="Toshiba injection moulding machine on the NEOTECH factory floor" scan className="h-full w-full" /></motion.div>
      <div aria-hidden className="absolute inset-0 -z-10 bg-navy/70" />
      <div aria-hidden className="grid-bg absolute inset-0 -z-10" />
      <div aria-hidden className="absolute left-5 top-28 hidden h-40 w-px bg-white/30 md:left-10 md:block" />
      <div className="mx-auto w-full max-w-[1400px] px-5 pb-28 pt-40 md:px-10">
        <div className="mono mb-8 inline-flex items-center gap-3 border border-white/25 px-3 py-2 text-steel-2">
          <span className="status-dot h-2 w-2 rounded-full bg-orange" />Precision manufacturing
        </div>
        <h1 className="max-w-5xl text-[clamp(2.4rem,7vw,6.2rem)] font-bold leading-[0.98] tracking-tight">
          <Words text={t.h1[0]} /><br /><span className="text-orange"><Words text={t.h1[1]} delay={0.5} /></span>
        </h1>
        <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2, duration: 0.7 }} className="mt-8 max-w-xl text-lg text-steel-2">{t.sub}</motion.p>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} className="mt-10 flex flex-wrap gap-4">
          <Button to="/quote">{t.cta1} <ArrowUpRight size={18} /></Button>
          <Button to="/capabilities" variant="ghost">{t.cta2}</Button>
        </motion.div>
      </div>
    </section>
  )
}

function TrustStrip() {
  const items = ['Injection moulding', 'Custom components', 'OEM production', 'Prototype to production', 'Automotive · Electrical · Appliances']
  return (
    <div className="border-y border-navy/10 bg-white">
      <ul className="mx-auto flex max-w-[1400px] flex-wrap gap-x-10 gap-y-3 px-5 py-5 md:px-10">
        {items.map(i => <li key={i} className="mono flex items-center gap-3 text-navy"><span className="h-1.5 w-1.5 bg-orange" />{i}</li>)}
      </ul>
    </div>
  )
}

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  const mv = useMotionValue(0)
  const rm = useReducedMotion()
  const [n, setN] = useState(rm ? value : 0)
  useEffect(() => {
    if (!inView || rm) return
    const c = animate(mv, value, { duration: 1.6, ease: 'easeOut', onUpdate: v => setN(Math.round(v)) })
    return () => c.stop()
  }, [inView, rm, value, mv])
  return <span ref={ref}>{n}{suffix}</span>
}

function Intro() {
  const verified = site.stats.filter(s => s.value !== null)
  return (
    <section className="grid-bg-light relative py-28">
      <div className="mx-auto grid max-w-[1400px] gap-14 px-5 md:grid-cols-12 md:px-10">
        <div className="md:col-span-7">
          <Reveal><Eyebrow n="01">The manufacturer</Eyebrow></Reveal>
          <Reveal delay={0.1}><p className="mt-8 text-[clamp(2rem,4.6vw,4rem)] font-bold leading-[1.05] tracking-tight text-navy">Plastic parts are rarely generic. <span className="text-steel">Yours shouldn’t be made as if they are.</span></p></Reveal>
          <Reveal delay={0.2}><p className="mt-8 max-w-xl text-lg leading-relaxed text-graphite/80">NEOTECH Moulding Industries is a manufacturing partner for businesses that need reliable, application-specific plastic components — developed around your drawing, sample or functional requirement.</p></Reveal>
          {verified.length > 0 && <dl className="mt-12 grid grid-cols-3 gap-6 border-t border-navy/15 pt-8">{verified.map(s => <div key={s.key}><dd className="text-4xl font-bold text-navy"><Counter value={s.value!} suffix={s.suffix} /></dd><dt className="mono mt-2 text-steel">{s.label}</dt></div>)}</dl>}
        </div>
        <Reveal className="md:col-span-5 md:pt-24"><Photo src={assets.factory} slot="factory · production floor" alt="NEOTECH factory production floor" className="aspect-[4/5]" scan /></Reveal>
      </div>
    </section>
  )
}

const cats = [
  { n: '01', title: 'Mobility & EV Support Parts', img: assets.catMobility, slot: 'catMobility', desc: 'Interior and under-panel plastic components for two-wheeler, four-wheeler and EV applications.', parts: ['Car interior plastic clips', 'Wire harness holders', 'Dashboard mounting brackets', 'Two-wheeler & EV battery casing components', 'Controller & electronics plastic covers'] },
  { n: '02', title: 'Electrical & Infrastructure', img: assets.catElectrical, slot: 'catElectrical', desc: 'Enclosures, plates and cable-management components for electrical distribution.', parts: ['Switchboard back plates', 'MCB boxes & distribution board enclosures', 'Electrical junction boxes', 'Meter boxes', 'Cable clips & cable management'] },
  { n: '03', title: 'Appliance & Utility Products', img: assets.catAppliance, slot: 'catAppliance', desc: 'Functional housings, knobs and internal supports for domestic and utility appliances.', parts: ['Washing machine knobs & internal brackets', 'Refrigerator internal supports & spacers', 'Air-conditioner plastic covers & clips', 'Water purifier housings, connectors & holders', 'Mixer-grinder base housings'] },
]
function Categories() {
  const rm = useReducedMotion()
  const [hover, setHover] = useState<string | null>(null)
  return (
    <section className="bg-navy py-28 text-white">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <Reveal><Eyebrow n="02" dark>Product categories</Eyebrow></Reveal>
        <Reveal delay={0.1}><h2 className="mt-6 max-w-3xl text-[clamp(2rem,4.4vw,3.8rem)] font-bold leading-[1.05]">Three families of components, one moulding discipline.</h2></Reveal>
        <div className="mt-20 space-y-24">
          {cats.map((c, i) => (
            <Reveal key={c.n}>
              <article className={`grid items-center gap-10 md:grid-cols-12 ${i % 2 ? 'md:[&>*:first-child]:order-2' : ''}`} onMouseEnter={() => setHover(c.n)} onMouseLeave={() => setHover(null)}>
                <motion.div className="md:col-span-7" animate={!rm && hover === c.n ? { rotateX: 1.5, rotateY: i % 2 ? 2 : -2, scale: 1.01 } : { rotateX: 0, rotateY: 0, scale: 1 }} style={{ transformPerspective: 1200 }}>
                  <Photo src={c.img} slot={c.slot} alt={`${c.title} product reference`} className="aspect-[16/10]" scan={i === 0} />
                </motion.div>
                <div className="md:col-span-5">
                  <span className="mono text-orange">{c.n} / 03</span>
                  <h3 className="mt-3 text-3xl font-bold">{c.title}</h3>
                  <p className="mt-4 text-steel-2">{c.desc}</p>
                  <ul className="mt-6 divide-y divide-white/10 border-y border-white/10 text-sm">{c.parts.map(p => <li key={p} className="flex items-center gap-3 py-2.5"><span className="h-1 w-3 bg-orange" />{p}</li>)}</ul>
                  <Link to="/products" className="group mt-8 inline-flex min-h-11 items-center gap-2 font-semibold text-orange">Explore Category <ArrowUpRight className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" size={18} /></Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

const caps = [
  { t: 'Injection moulding machinery', s: 'confirmed', d: 'Toshiba Machine injection moulding machines on the shop floor. Tonnage and shot capacity to be published once supplied.' },
  { t: 'Custom mould development', s: 'tbc', d: 'In-house tooling or mould-making partnerships — to be confirmed by NEOTECH.' },
  { t: 'Prototype-to-production support', s: 'tbc', d: 'From sample approval to repeat production — scope to be confirmed.' },
  { t: 'Design & manufacturability review', s: 'tbc', d: 'Review of drawings for moulding feasibility — scope to be confirmed.' },
  { t: 'Material selection', s: 'tbc', d: 'Guidance on PP, ABS, HDPE and other materials against the application — grades to be confirmed.' },
  { t: 'Batch & volume manufacturing', s: 'tbc', d: 'Production runs scaled to your requirement — capacity figures to be confirmed.' },
]
function Capabilities() {
  const rm = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const x = useTransform(scrollYProgress, [0, 1], ['2%', '-62%'])
  const body = (
    <>
      {caps.map((c, i) => (
        <article key={c.t} className="relative w-[min(82vw,420px)] shrink-0 border border-navy/15 bg-white p-8">
          <span className="mono text-orange">0{i + 1}</span>
          <h3 className="mt-6 text-2xl font-bold text-navy">{c.t}</h3>
          <p className="mt-4 text-graphite/75">{c.d}</p>
          <span className={`mono mt-8 inline-flex items-center gap-2 px-2 py-1 ${c.s === 'confirmed' ? 'bg-navy text-white' : 'border border-dashed border-steel text-steel'}`}>{c.s === 'confirmed' ? <Check size={12} /> : <Circle size={10} />}{c.s === 'confirmed' ? 'Confirmed' : 'To be confirmed'}</span>
        </article>
      ))}
    </>
  )
  return (
    <section className="bg-paper">
      <div className="mx-auto max-w-[1400px] px-5 pt-28 md:px-10"><Reveal><Eyebrow n="03">Manufacturing capabilities</Eyebrow></Reveal><Reveal delay={0.1}><h2 className="mt-6 max-w-3xl text-[clamp(2rem,4.4vw,3.8rem)] font-bold leading-[1.05] text-navy">From drawing to dispatch, under one roof.</h2></Reveal></div>
      {rm ? <div className="flex gap-6 overflow-x-auto px-5 py-16 md:px-10" tabIndex={0} aria-label="Capabilities">{body}</div> : (
        <>
          <div ref={ref} className="relative hidden h-[220vh] md:block"><div className="sticky top-0 flex h-screen items-center overflow-hidden"><motion.div style={{ x }} className="flex gap-6 px-10">{body}</motion.div></div></div>
          <div className="flex gap-6 overflow-x-auto px-5 py-16 md:hidden" tabIndex={0} aria-label="Capabilities">{body}</div>
        </>
      )}
      <p className="mx-auto max-w-[1400px] px-5 pb-20 text-sm text-steel md:px-10">Items marked “to be confirmed” are editable placeholders — NEOTECH to confirm before publishing.</p>
    </section>
  )
}

function Why() {
  const pts = [['Precision-focused manufacturing', 'Moulded parts held to the tolerances your drawing specifies.'], ['Custom component development', 'Built around your application rather than picked from a catalogue.'], ['Application-specific materials', 'Material choice matched to load, environment and finish.'], ['Consistent quality processes', 'Inspection steps defined from first piece to dispatch.'], ['Scalable production', 'From trial batches to repeat volume runs.'], ['Long-term OEM partnerships', 'Built for repeat orders and continuity of supply.']]
  return (
    <section className="grid-bg-light py-28">
      <div className="mx-auto grid max-w-[1400px] gap-14 px-5 md:grid-cols-12 md:px-10">
        <div className="md:col-span-4 md:sticky md:top-32 md:self-start"><Reveal><Eyebrow n="04">Why NEOTECH</Eyebrow></Reveal><Reveal delay={0.1}><h2 className="mt-6 text-[clamp(2rem,4vw,3.4rem)] font-bold leading-[1.05] text-navy">Engineering first. Everything else follows.</h2></Reveal></div>
        <ol className="md:col-span-8">
          {pts.map(([h, d], i) => (
            <Reveal key={h}><li className="group grid grid-cols-[3.5rem_1fr] items-baseline gap-4 border-t border-navy/15 py-8 first:border-t-0 md:grid-cols-[5rem_1fr_1.2fr]">
              <span className="text-5xl font-bold text-steel-2 transition-colors group-hover:text-orange">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="text-xl font-bold text-navy md:text-2xl">{h}</h3><p className="col-start-2 text-graphite/75 md:col-start-auto">{d}</p></li></Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}

const inds = [
  { k: 'automotive', t: 'Automotive', d: 'Interior clips, harness holders and mounting brackets for passenger and commercial vehicles.' },
  { k: 'ev', t: 'EV & mobility', d: 'Battery casing components, controller covers and electronics housings for e-mobility platforms.' },
  { k: 'electrical', t: 'Electrical equipment', d: 'MCB boxes, junction boxes, switchboard plates and enclosures for electrical products.' },
  { k: 'appliances', t: 'Consumer appliances', d: 'Knobs, brackets, covers and housings for washing machines, refrigerators, ACs and kitchen appliances.' },
  { k: 'infrastructure', t: 'Infrastructure', d: 'Meter boxes, cable management and distribution components for utility installations.' },
  { k: 'industrial', t: 'Industrial equipment', d: 'Custom guards, covers and functional components built to your specification.' },
  { k: 'agriculture', t: 'Agriculture', d: 'Durable plastic parts for agricultural and irrigation equipment.' },
]
function Industries() {
  const [a, setA] = useState(0)
  const cur = inds[a]
  return (
    <section className="bg-graphite py-28 text-white">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <Reveal><Eyebrow n="05" dark>Industries served</Eyebrow></Reveal>
        <div className="mt-12 grid gap-10 md:grid-cols-12">
          <div role="tablist" aria-label="Industries" className="md:col-span-5">
            {inds.map((x, i) => (
              <button key={x.k} role="tab" id={`ind-${x.k}`} aria-selected={a === i} aria-controls="ind-panel" onClick={() => setA(i)}
                onKeyDown={e => { if (e.key === 'ArrowDown') setA((i + 1) % inds.length); if (e.key === 'ArrowUp') setA((i + inds.length - 1) % inds.length) }}
                className={`relative flex min-h-14 w-full items-center justify-between border-b border-white/10 px-1 text-left text-2xl font-bold transition-colors ${a === i ? 'text-white' : 'text-steel hover:text-steel-2'}`}>
                <span>{x.t}</span><span className="mono">0{i + 1}</span>
                {a === i && <motion.span layoutId="ind-bar" className="absolute inset-y-0 -left-4 w-1 bg-orange" />}
              </button>
            ))}
          </div>
          <div id="ind-panel" role="tabpanel" aria-labelledby={`ind-${cur.k}`} className="md:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div key={cur.k} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -14 }} transition={{ duration: 0.3 }}>
                <Photo src={assets.ind[cur.k]} slot={`ind.${cur.k} · representative component`} alt={`Representative ${cur.t} component`} className="aspect-[16/9]" />
                <p className="mt-6 max-w-xl text-lg text-steel-2">{cur.d}</p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}

const steps = [
  ['Requirement discussion', true], ['Design & drawing review', true], ['Material selection', true], ['Tooling & mould development', false], ['Trial production', true], ['Quality inspection', true], ['Production & dispatch', true],
] as [string, boolean][]
function Process() {
  const [a, setA] = useState(0)
  return (
    <section className="py-28">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <Reveal><Eyebrow n="06">Manufacturing process</Eyebrow></Reveal>
        <Reveal delay={0.1}><h2 className="mt-6 max-w-3xl text-[clamp(2rem,4.4vw,3.8rem)] font-bold leading-[1.05] text-navy">Seven steps from requirement to dispatch.</h2></Reveal>
        <div className="mt-16">
          <div className="relative h-px bg-navy/20" aria-hidden><motion.div className="absolute inset-y-0 left-0 h-0.5 -translate-y-px bg-orange" animate={{ width: `${(a / (steps.length - 1)) * 100}%` }} transition={{ duration: 0.5 }} /></div>
          <ol className="mt-0 grid grid-cols-2 gap-y-6 md:grid-cols-7">
            {steps.map(([s, ok], i) => (
              <li key={s}><button onClick={() => setA(i)} aria-current={a === i ? 'step' : undefined} className={`group -mt-2.5 flex min-h-11 w-full flex-col items-start gap-3 pr-3 text-left`}>
                <span className={`h-5 w-5 border-2 transition-colors ${i <= a ? 'border-orange bg-orange' : 'border-navy/30 bg-paper'}`} />
                <span className={`mono ${i === a ? 'text-orange' : 'text-steel'}`}>Step 0{i + 1}</span>
                <span className={`text-sm font-semibold ${i === a ? 'text-navy' : 'text-graphite/60'}`}>{s}</span>
              </button></li>
            ))}
          </ol>
          <div className="mt-10 border border-navy/15 bg-white p-8 md:flex md:items-center md:justify-between" aria-live="polite">
            <div><h3 className="text-2xl font-bold text-navy">0{a + 1} · {steps[a][0]}</h3>
              <p className="mt-2 text-graphite/75">{steps[a][1] ? 'Part of the NEOTECH process.' : 'Optional service — availability to be confirmed (in-house or through tooling partners).'}</p></div>
            <span className={`mono mt-4 inline-block px-2 py-1 md:mt-0 ${steps[a][1] ? 'bg-navy text-white' : 'border border-dashed border-steel text-steel'}`}>{steps[a][1] ? 'Offered' : 'To be confirmed'}</span>
          </div>
        </div>
      </div>
    </section>
  )
}

function FinalCta() {
  return (
    <section className="relative isolate overflow-hidden bg-navy py-32 text-white">
      <motion.svg aria-hidden className="absolute inset-0 -z-10 h-full w-full text-orange/40" preserveAspectRatio="none" viewBox="0 0 1000 400" fill="none" stroke="currentColor" strokeWidth="1.2" vectorEffect="non-scaling-stroke">
        <motion.rect x="40" y="40" width="920" height="320" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 2.2, ease: 'easeInOut' }} />
        <motion.path d="M40 120H140M860 280H960M500 40V90M500 310V360" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 2, delay: 0.8 }} />
      </motion.svg>
      <div className="grid-bg absolute inset-0 -z-20" />
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <Reveal><h2 className="max-w-4xl text-[clamp(2.2rem,5.4vw,4.8rem)] font-bold leading-[1.02]">Have a Component in Mind? <span className="text-orange">Let’s Manufacture It.</span></h2></Reveal>
        <Reveal delay={0.1}><p className="mt-6 max-w-xl text-lg text-steel-2">Share your drawing, sample, or product requirements with our team.</p></Reveal>
        <Reveal delay={0.2}><div className="mt-10 flex flex-wrap gap-4"><Button to="/quote">Request a Manufacturing Quote <ArrowUpRight size={18} /></Button><Button href={waLink()} variant="ghost">Talk to Our Team on WhatsApp</Button></div></Reveal>
      </div>
    </section>
  )
}

export default function Home() {
  return (<>
    <Seo title="Custom Plastic Injection Moulding Manufacturer" desc="NEOTECH Moulding Industries — custom plastic components, precision injection moulding and OEM production for automotive, electrical and appliance applications." />
    <Hero /><TrustStrip /><Intro /><Categories /><Capabilities /><Why /><Industries /><Process /><FinalCta />
  </>)
}
