import { useState } from 'react'
import { ArrowUpRight, CheckCircle2 } from 'lucide-react'
import { PageHero } from '../components/PageHero'
import { Seo } from '../components/Seo'
import { Button, Eyebrow, Photo, Reveal } from '../components/ui'
import { assets } from '../config/assets'

const categories = [
  {
    id: 'mobility',
    number: '01',
    name: 'Mobility & EV Support Parts',
    image: assets.catMobility,
    slot: 'catMobility',
    desc: 'Precision plastic components engineered to withstand vibrations, thermal variations, and mechanical loads in automotive and e-mobility applications.',
    items: [
      'Car interior plastic clips & trim retainers',
      'Under-hood wire harness holders and cable channels',
      'Dashboard & console mounting brackets',
      'EV & 2-wheeler battery pack casing components',
      'Motor controller & electronics plastic covers',
      'Protective caps, grommets and bushings',
    ],
    materials: ['PA6 / PA66 (Nylon)', 'ABS', 'Polypropylene (PP)', 'PBT / PC'],
  },
  {
    id: 'electrical',
    number: '02',
    name: 'Electrical & Infrastructure',
    image: assets.catElectrical,
    slot: 'catElectrical',
    desc: 'Flame-retardant and dimensionally stable enclosures, distribution boxes, and cable management components for electrical systems.',
    items: [
      'Switchboard back plates & mounting boxes',
      'MCB distribution boxes & modular enclosures',
      'Weather-proof electrical junction boxes',
      'Single & three-phase energy meter housings',
      'Heavy-duty plastic cable clips and tie mounts',
      'Conduit fittings, bushings and blanking plates',
    ],
    materials: ['Flame-Retardant ABS (UL94-V0)', 'Polycarbonate (PC)', 'HDPE', 'Engineering PP'],
  },
  {
    id: 'appliances',
    number: '03',
    name: 'Appliance & Utility Components',
    image: assets.catAppliance,
    slot: 'catAppliance',
    desc: 'Aesthetic and functional components manufactured for consumer white goods, commercial appliances, and filtration systems.',
    items: [
      'Washing machine selector knobs & structural brackets',
      'Refrigerator internal shelf supports, sliders & spacers',
      'Air-conditioner front covers, louvers & filter frames',
      'Water purifier multi-stage filter housings & connectors',
      'Mixer-grinder base shells, handles & couplers',
      'Sanitary fittings, valve bodies & drainage parts',
    ],
    materials: ['High-Impact Polystyrene (HIPS)', 'ABS', 'SAN', 'Food-Grade PP'],
  },
]

export default function Products() {
  const [selectedCat, setSelectedCat] = useState<string>('mobility')

  return (
    <>
      <Seo
        title="Products & Component Catalog — NEOTECH Moulding Industries"
        desc="Explore our product families: Mobility & EV parts, Electrical & Infrastructure enclosures, and Consumer Appliance moulded components."
        path="/products"
      />

      <PageHero
        eyebrow="Component Families"
        eyebrowNumber="02"
        title="Engineered Plastic Mouldings for Demanding Applications."
        highlight="Custom Formulations."
        description="We manufacture custom and OEM plastic components across mobility, electrical distribution, and consumer appliance verticals, strictly aligned to your technical drawings."
        image={assets.catMobility}
        imageAlt="NEOTECH precision plastic moulded components"
        imageSlot="catMobility · automotive & EV parts"
        stats={[
          { label: 'Families', value: '3 Major Lines' },
          { label: 'Quality', value: '100% Inspected' },
          { label: 'Tooling', value: 'Custom Moulds' },
        ]}
      />

      {/* Product Categories Section */}
      <section className="bg-paper py-24">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10">
          <Reveal>
            <Eyebrow n="01">Product Categories</Eyebrow>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-4 text-[clamp(2rem,4vw,3.2rem)] font-bold text-navy">
              Three core product disciplines, endless custom possibilities.
            </h2>
          </Reveal>

          {/* Category Cards */}
          <div className="mt-16 space-y-20">
            {categories.map((cat, idx) => (
              <Reveal key={cat.id}>
                <div className={`grid items-center gap-12 border border-navy/15 bg-white p-8 md:p-12 lg:grid-cols-12 ${idx % 2 === 1 ? 'lg:[&>*:first-child]:order-2' : ''}`}>
                  {/* Photo */}
                  <div className="lg:col-span-6">
                    <div className="overflow-hidden border border-navy/10 shadow-md">
                      <Photo
                        src={cat.image}
                        slot={cat.slot}
                        alt={`${cat.name} components`}
                        className="aspect-[4/3] w-full"
                        scan={idx === 0}
                      />
                    </div>
                  </div>

                  {/* Details */}
                  <div className="lg:col-span-6">
                    <span className="mono text-sm font-semibold text-orange">{cat.number} / 03</span>
                    <h3 className="mt-2 text-2xl font-bold text-navy md:text-3xl">{cat.name}</h3>
                    <p className="mt-4 text-base leading-relaxed text-graphite/80">{cat.desc}</p>

                    <h4 className="mono mt-6 text-xs uppercase tracking-wider text-steel">Representative Parts</h4>
                    <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
                      {cat.items.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-navy">
                          <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-orange" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-6 flex flex-wrap items-center gap-2 border-t border-navy/10 pt-5">
                      <span className="mono text-xs text-steel">Typical Materials:</span>
                      {cat.materials.map((m, i) => (
                        <span key={i} className="mono bg-paper px-2.5 py-1 text-xs font-medium text-navy border border-navy/10">
                          {m}
                        </span>
                      ))}
                    </div>

                    <div className="mt-8">
                      <Button to="/quote">Enquire for this Category <ArrowUpRight size={16} /></Button>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Polymer Material Matrix */}
      <section className="bg-navy py-24 text-white">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10">
          <Reveal>
            <Eyebrow n="02" dark>Engineering Resins</Eyebrow>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-4 text-3xl font-bold md:text-4xl">
              Materials processed at our facility
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { name: 'Polypropylene (PP)', use: 'Hinges, automotive trims, housings, chemical resistance.' },
                { name: 'ABS & PC-ABS', use: 'High impact enclosures, structural brackets, dimensional accuracy.' },
                { name: 'Nylon (PA6 / PA66)', use: 'Wear components, gear housings, high thermal and tensile strength.' },
                { name: 'HDPE / Delrin (POM)', use: 'Low friction parts, sliding guides, rigid fluid containers.' },
              ].map((m, idx) => (
                <div key={idx} className="border border-white/15 bg-navy-2/60 p-6">
                  <h3 className="text-xl font-bold text-orange">{m.name}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-steel-2">{m.use}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
