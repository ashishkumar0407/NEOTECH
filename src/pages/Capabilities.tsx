import { ArrowUpRight, Check, Cog, Gauge, Layers, Wrench } from 'lucide-react'
import { PageHero } from '../components/PageHero'
import { Seo } from '../components/Seo'
import { Button, Eyebrow, Photo, Reveal } from '../components/ui'
import { assets } from '../config/assets'
import { waLink } from '../config/site'

export default function Capabilities() {
  const capabilities = [
    {
      icon: Gauge,
      title: 'Precision Injection Moulding Machines',
      desc: 'High-performance machines equipped with multi-zone PID temperature control, closed-loop pressure monitoring, and robotic part extractors for consistent cycle times.',
      highlights: ['Toshiba Machine injection moulding line', 'Uniform clamping pressure distribution', 'Energy-efficient servo-hydraulic drives'],
    },
    {
      icon: Wrench,
      title: 'Tooling & Mould Maintenance',
      desc: 'Dedicated tooling maintenance bench for mould inspection, ultrasonic cleaning, preventive core/cavity maintenance, and ejector pin lubrication.',
      highlights: ['In-house mould inspection and trials', 'Quick-change clamping systems', 'Preventive cycle tracking'],
    },
    {
      icon: Cog,
      title: 'DFM & Engineering Review',
      desc: 'Collaborative manufacturability assessment on part thickness, draft angles, ribbing, gate locations, and shrink rates before starting serial production.',
      highlights: ['CAD drawing review (STEP/IGES/DWG)', 'Sink mark and warpage risk mitigation', 'Cycle time optimization'],
    },
    {
      icon: Layers,
      title: 'Secondary & Assembly Operations',
      desc: 'Complete post-moulding capabilities including brass threaded insert moulding, ultrasonic plastic welding, pad printing, and custom assembly packaging.',
      highlights: ['Threaded brass insert moulding', 'De-gating and trimming', 'ESD-safe protective packaging'],
    },
  ]

  return (
    <>
      <Seo
        title="Manufacturing Capabilities & Machinery — NEOTECH Moulding Industries"
        desc="Explore NEOTECH's moulding infrastructure: precision injection moulding machines, tooling maintenance, material processing, and DFM design review."
        path="/capabilities"
      />

      <PageHero
        eyebrow="Manufacturing Infrastructure"
        eyebrowNumber="03"
        title="High-Precision Moulding Capabilities for Demanding Tolerances."
        highlight="End-to-End."
        description="From raw granule drying to automated injection moulding and dimensional metrology, our production floor is engineered for high throughput and consistent part quality."
        image={assets.heroMachine}
        imageAlt="Heavy industrial injection moulding machine"
        imageSlot="heroMachine · Toshiba machine wide"
        stats={[
          { label: 'Control', value: 'Closed-Loop PID' },
          { label: 'Tooling', value: 'Mould Support' },
          { label: 'Capacity', value: 'High Batch Run' },
        ]}
      />

      {/* Capabilities List */}
      <section className="grid-bg-light py-24">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10">
          <Reveal>
            <Eyebrow n="01">Core Capabilities</Eyebrow>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-4 text-[clamp(2rem,4vw,3.2rem)] font-bold text-navy">
              Integrated infrastructure from tooling trials to serial dispatch.
            </h2>
          </Reveal>

          <div className="mt-16 grid gap-8 md:grid-cols-2">
            {capabilities.map((cap, idx) => (
              <Reveal key={idx} delay={idx * 0.1}>
                <div className="flex h-full flex-col justify-between border border-navy/15 bg-white p-8 md:p-10 shadow-sm">
                  <div>
                    <cap.icon className="h-10 w-10 text-orange" />
                    <h3 className="mt-6 text-2xl font-bold text-navy">{cap.title}</h3>
                    <p className="mt-4 text-base leading-relaxed text-graphite/80">{cap.desc}</p>
                  </div>
                  <ul className="mt-8 space-y-2.5 border-t border-navy/10 pt-6">
                    {cap.highlights.map((h, i) => (
                      <li key={i} className="flex items-center gap-3 text-sm text-navy">
                        <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-orange/15 text-orange">
                          <Check size={12} />
                        </span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Factory Floor Feature */}
      <section className="bg-navy py-24 text-white">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10">
          <div className="grid items-center gap-12 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <Reveal>
                <Eyebrow n="02" dark>Quality & Metrology</Eyebrow>
              </Reveal>
              <Reveal delay={0.1}>
                <h2 className="mt-4 text-3xl font-bold md:text-4xl">
                  Tight process control at every production stage.
                </h2>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="mt-6 text-lg text-steel-2 leading-relaxed">
                  Every batch begins with raw resin dehumidification and first-piece dimensional verification against approved technical drawings before full-scale production proceeds.
                </p>
              </Reveal>
              <Reveal delay={0.3}>
                <div className="mt-8">
                  <Button to="/quote">Submit Your Drawing for Review <ArrowUpRight size={18} /></Button>
                </div>
              </Reveal>
            </div>

            <div className="lg:col-span-6">
              <Reveal delay={0.2}>
                <div className="overflow-hidden border border-white/15 shadow-2xl">
                  <Photo
                    src={assets.quality}
                    slot="quality · precision metrology"
                    alt="Quality caliper metrology inspection"
                    className="aspect-[16/11] w-full"
                    scan
                  />
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
