import { ArrowUpRight, CheckCircle2, ShieldCheck, Scale, FileText, Microscope } from 'lucide-react'
import { PageHero } from '../components/PageHero'
import { Seo } from '../components/Seo'
import { Button, Eyebrow, Photo, Reveal } from '../components/ui'
import { assets } from '../config/assets'

export default function Quality() {
  const steps = [
    {
      icon: Scale,
      title: 'Incoming Polymer Inspection',
      desc: 'Raw resin lot validation, moisture dehumidification checks, and virgin-to-regrind ratio monitoring according to OEM specifications.',
    },
    {
      icon: Microscope,
      title: 'First Article Inspection (FAI)',
      desc: 'Detailed dimensional metrology of initial sample shots against 2D/3D drawings before approving production runs.',
    },
    {
      icon: ShieldCheck,
      title: 'In-Process Statistical Control',
      desc: 'Periodic dimension sampling, flash and sink mark checks, clamping pressure audits, and thermal consistency monitoring.',
    },
    {
      icon: FileText,
      title: 'Traceability & Batch Release',
      desc: 'Batch-coded packaging, inspection certificates upon request, and controlled warehousing to prevent contamination.',
    },
  ]

  return (
    <>
      <Seo
        title="Quality Assurance & Material Engineering — NEOTECH Moulding Industries"
        desc="Discover NEOTECH's rigorous quality control standards, dimensional metrology, polymer selection guidelines, and testing protocols."
        path="/quality"
      />

      <PageHero
        eyebrow="Quality Standards"
        eyebrowNumber="05"
        title="Zero-Defect Philosophy in Every Moulded Cycle."
        highlight="Precision Inspected."
        description="We implement stringent quality gates at incoming polymer receipt, during active moulding cycles, and prior to final dispatch to ensure part compliance."
        image={assets.quality}
        imageAlt="Engineer inspecting plastic component with digital caliper"
        imageSlot="quality · caliper metrology inspection"
        stats={[
          { label: 'Metrology', value: 'FAI & In-Process' },
          { label: 'Inspection', value: '100% Visual' },
          { label: 'Testing', value: 'Dimensionally Checked' },
        ]}
      />

      {/* Quality Gates */}
      <section className="grid-bg-light py-24">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10">
          <Reveal>
            <Eyebrow n="01">Quality Framework</Eyebrow>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-4 text-[clamp(2rem,4vw,3.2rem)] font-bold text-navy">
              Four-stage quality validation on the factory floor.
            </h2>
          </Reveal>

          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, idx) => (
              <Reveal key={idx} delay={idx * 0.1}>
                <div className="flex h-full flex-col justify-between border border-navy/15 bg-white p-8 shadow-sm">
                  <div>
                    <s.icon className="h-10 w-10 text-orange" />
                    <span className="mono mt-4 block text-xs text-steel">STAGE 0{idx + 1}</span>
                    <h3 className="mt-2 text-xl font-bold text-navy">{s.title}</h3>
                    <p className="mt-4 text-sm leading-relaxed text-graphite/80">{s.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Visual Metrology Section */}
      <section className="bg-navy py-24 text-white">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10">
          <div className="grid items-center gap-12 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <Reveal>
                <Eyebrow n="02" dark>Metrology & Tooling Care</Eyebrow>
              </Reveal>
              <Reveal delay={0.1}>
                <h2 className="mt-4 text-3xl font-bold md:text-4xl">
                  Dedicated tool maintenance for long-term repeatable tolerances.
                </h2>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="mt-6 text-lg text-steel-2 leading-relaxed">
                  Tool wear is the #1 enemy of dimensional accuracy. Our preventative tooling maintenance schedule includes ultrasonic mould cleaning, guide pin lubrication, and vent cleaning after every production run.
                </p>
              </Reveal>

              <Reveal delay={0.3}>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Button to="/quote">Request Quality Specs <ArrowUpRight size={18} /></Button>
                </div>
              </Reveal>
            </div>

            <div className="lg:col-span-6">
              <Reveal delay={0.2}>
                <div className="border border-white/15 shadow-2xl">
                  <Photo
                    src={assets.quality}
                    slot="quality · precision metrology"
                    alt="Quality caliper metrology inspection"
                    className="aspect-[4/3] w-full"
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
