import { ArrowUpRight, Car, Zap, Power, Home, Building2, Wrench } from 'lucide-react'
import { PageHero } from '../components/PageHero'
import { Seo } from '../components/Seo'
import { Button, Eyebrow, Photo, Reveal } from '../components/ui'
import { assets } from '../config/assets'

const industries = [
  {
    icon: Car,
    name: 'Automotive & Mobility',
    desc: 'Interior trims, wiring clips, mounting brackets and under-bonnet plastic components designed for automotive OEMs and tier-1 suppliers.',
    parts: ['Door panel & upholstery clips', 'Engine bay wire harness holders', 'Air duct dampers & connectors', 'Fuse box covers & housings'],
    image: assets.catMobility,
  },
  {
    icon: Zap,
    name: 'Electric Vehicles (EV)',
    desc: 'Lightweight, flame-retardant enclosures, controller casings and cell holder modules for 2-wheeler and 3-wheeler EV platforms.',
    parts: ['EV battery module casings & spacers', 'BMS controller housings', 'Charging port caps & seals', 'Cable management grommets'],
    image: assets.catMobility,
  },
  {
    icon: Power,
    name: 'Electrical & Power Distribution',
    desc: 'Heavy-duty insulated enclosures, distribution board fittings, and switchboard components meeting safety compliance standards.',
    parts: ['MCB distribution box bodies & transparent covers', 'Switchboard modular backplates', 'Modular junction boxes', 'Single & three-phase meter boxes'],
    image: assets.catElectrical,
  },
  {
    icon: Home,
    name: 'Consumer Appliances',
    desc: 'High-aesthetic, durable injection moulded parts for washing machines, refrigerators, air conditioners and kitchen appliances.',
    parts: ['Control dials, knobs & buttons', 'Internal shelves & slide brackets', 'Water purifier filter bowls & heads', 'Mixer grinder base housings'],
    image: assets.quality,
  },
  {
    icon: Building2,
    name: 'Infrastructure & Utilities',
    desc: 'Durable outdoor-rated electrical enclosures, cable clamp assemblies, and pipeline support brackets for urban infrastructure.',
    parts: ['UV-stabilized utility boxes', 'Heavy-duty conduit pipe clips', 'Wall mount brackets', 'Cable protection caps'],
    image: assets.catElectrical,
  },
  {
    icon: Wrench,
    name: 'Industrial & Agriculture',
    desc: 'Impact-resistant machine guards, pump fittings, spray nozzles and drip irrigation components built for harsh operating environments.',
    parts: ['Pump impellers & covers', 'Drip irrigation drip caps & connectors', 'Equipment safety guards', 'Heavy machinery caps & spacers'],
    image: assets.factory,
  },
]

export default function Industries() {
  return (
    <>
      <Seo
        title="Industries Served — NEOTECH Moulding Industries"
        desc="NEOTECH manufactures precision plastic injection mouldings for Automotive, EV, Electrical, Appliances, and Industrial equipment sectors."
        path="/industries"
      />

      <PageHero
        eyebrow="Sector Expertise"
        eyebrowNumber="04"
        title="Custom Moulded Solutions for Key Industry Verticals."
        highlight="Domain Tested."
        description="We partner with OEMs and tier suppliers across diverse sectors, understanding each industry’s specific polymer certification, thermal resistance, and tolerance requirements."
        image={assets.catElectrical}
        imageAlt="Electrical and infrastructure moulded components"
        imageSlot="catElectrical · electrical components"
        stats={[
          { label: 'Sectors', value: '6+ Verticals' },
          { label: 'Compliance', value: 'RoHS / UL94' },
          { label: 'Partnership', value: 'OEM Supply' },
        ]}
      />

      {/* Industries Grid */}
      <section className="bg-paper py-24">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10">
          <Reveal>
            <Eyebrow n="01">Market Sectors</Eyebrow>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-4 text-[clamp(2rem,4vw,3.2rem)] font-bold text-navy">
              Application-specific engineering across every vertical.
            </h2>
          </Reveal>

          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {industries.map((ind, idx) => (
              <Reveal key={idx} delay={idx * 0.08}>
                <div className="flex h-full flex-col justify-between border border-navy/15 bg-white p-8 shadow-sm transition-all hover:border-orange">
                  <div>
                    <div className="flex items-center justify-between">
                      <ind.icon className="h-9 w-9 text-orange" />
                      <span className="mono text-xs text-steel">0{idx + 1}</span>
                    </div>
                    <h3 className="mt-6 text-2xl font-bold text-navy">{ind.name}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-graphite/80">{ind.desc}</p>
                  </div>

                  <div className="mt-6 border-t border-navy/10 pt-5">
                    <span className="mono text-xs text-steel uppercase tracking-wider block mb-3">Key Components:</span>
                    <ul className="space-y-1.5 text-xs text-navy">
                      {ind.parts.map((p, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <span className="h-1 w-2 bg-orange" />
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Button to="/quote">Get a Quote for Your Industry <ArrowUpRight size={18} /></Button>
          </div>
        </div>
      </section>
    </>
  )
}
