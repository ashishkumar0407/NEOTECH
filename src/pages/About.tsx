import { ArrowUpRight, Check, ShieldCheck, Factory, Cpu, Target } from 'lucide-react'
import { PageHero } from '../components/PageHero'
import { Seo } from '../components/Seo'
import { Button, Eyebrow, Photo, Reveal } from '../components/ui'
import { assets } from '../config/assets'
import { site, waLink } from '../config/site'

export default function About() {
  const values = [
    {
      icon: Cpu,
      title: 'Precision-Led Engineering',
      desc: 'Tooling and moulding calibrated down to exacting tolerances for repeatable, defect-free production runs.',
    },
    {
      icon: Target,
      title: 'Application-Specific Focus',
      desc: 'Components tailored to the thermal, mechanical, and electrical demands of each customer application.',
    },
    {
      icon: ShieldCheck,
      title: 'Rigorous Quality Checks',
      desc: 'First-piece inspections, continuous dimension monitoring, and standardized packaging from batch to batch.',
    },
    {
      icon: Factory,
      title: 'Modern Machinery Fleet',
      desc: 'High-tonnage injection moulding machines with precision robotic handling and automated drying systems.',
    },
  ]

  return (
    <>
      <Seo
        title="About Us — Precision Plastic Injection Moulding"
        desc="Learn about NEOTECH Moulding Industries: our manufacturing infrastructure, high-tonnage machines, engineering values, and OEM partnership capabilities."
        path="/about"
      />

      <PageHero
        eyebrow="Company Overview"
        eyebrowNumber="01"
        title="Engineering Precision in Plastic Moulding Since Day One."
        highlight="Built for OEMs."
        description="NEOTECH Moulding Industries is a custom injection moulding manufacturer delivering mission-critical plastic components for automotive, EV platforms, electrical infrastructure, and appliance industries."
        image={assets.factory}
        imageAlt="NEOTECH factory floor with injection moulding machine line"
        imageSlot="factory · production floor"
        stats={[
          { label: 'Core Focus', value: 'Custom Moulding' },
          { label: 'Engineering', value: 'Drawing to Part' },
          { label: 'Materials', value: 'PP, ABS, HDPE, PA' },
        ]}
      />

      {/* Infrastructure & Philosophy */}
      <section className="grid-bg-light py-24">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10">
          <div className="grid gap-14 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <Reveal>
                <Eyebrow n="02">Manufacturing Philosophy</Eyebrow>
              </Reveal>
              <Reveal delay={0.1}>
                <h2 className="mt-6 text-[clamp(2rem,4vw,3.2rem)] font-bold leading-tight text-navy">
                  High-capacity infrastructure engineered for repeat consistency.
                </h2>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="mt-6 text-lg leading-relaxed text-graphite/80">
                  We bridge the gap between engineering design and scalable manufacturing. Whether you supply an existing mould, need tooling development assistance, or require rapid prototype evaluation, our facility is equipped to handle complex part geometries and high-volume cycles.
                </p>
              </Reveal>

              <Reveal delay={0.3}>
                <ul className="mt-8 space-y-4 border-t border-navy/15 pt-6 text-graphite">
                  {[
                    'Multi-tonnage injection moulding machinery line',
                    'Dedicated quality inspection and dimensional verification bench',
                    'Engineering review for manufacturability (DFM) and material optimization',
                    'Controlled storage for raw polymers and customer moulds',
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-orange/15 text-orange">
                        <Check size={14} />
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>

            <div className="lg:col-span-6">
              <Reveal delay={0.2}>
                <div className="border border-navy/15 bg-white p-8 md:p-12 shadow-sm">
                  <span className="mono text-xs uppercase tracking-wider text-orange">Core Pillars</span>
                  <div className="mt-8 grid gap-8 sm:grid-cols-2">
                    {values.map((v, i) => (
                      <div key={i} className="space-y-3">
                        <v.icon className="h-8 w-8 text-orange" />
                        <h3 className="text-xl font-bold text-navy">{v.title}</h3>
                        <p className="text-sm leading-relaxed text-graphite/70">{v.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Action CTA */}
      <section className="bg-navy py-24 text-white">
        <div className="mx-auto max-w-[1400px] px-5 text-center md:px-10">
          <Reveal>
            <h2 className="mx-auto max-w-3xl text-3xl font-bold md:text-5xl">
              Ready to collaborate on your next component?
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-6 max-w-xl text-lg text-steel-2">
              Send us your drawing or sample and get a comprehensive manufacturing feasibility and cost estimate.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Button to="/quote">Request a Quote <ArrowUpRight size={18} /></Button>
              <Button href={waLink('Hello NEOTECH, I want to discuss manufacturing.')} variant="ghost">WhatsApp Us</Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
