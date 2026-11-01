import { ArrowUpRight, BookOpen, Clock } from 'lucide-react'
import { PageHero } from '../components/PageHero'
import { Seo } from '../components/Seo'
import { Button, Eyebrow, Reveal } from '../components/ui'
import { assets } from '../config/assets'

const articles = [
  {
    title: 'Design for Manufacturing (DFM) Guidelines for Injection Moulded Plastic Parts',
    category: 'Engineering & DFM',
    readTime: '5 min read',
    desc: 'Key rules of thumb for draft angles, uniform wall thickness, rib design, and gate placement to eliminate sink marks, warpage, and costly tooling revisions.',
  },
  {
    title: 'Selecting Engineering Plastics: PP vs. ABS vs. PA66 (Nylon) for Electrical Enclosures',
    category: 'Material Science',
    readTime: '6 min read',
    desc: 'A comparative breakdown of impact resistance, dielectric properties, flammability ratings (UL94), and thermal tolerances across common polymer grades.',
  },
  {
    title: 'Single-Cavity vs. Multi-Cavity Moulds: Evaluating Tooling Investment vs. Unit Cost',
    category: 'Tooling & Economics',
    readTime: '4 min read',
    desc: 'How production volume, cycle times, and upfront tooling amortization determine whether family or multi-cavity moulds are right for your manufacturing rollout.',
  },
  {
    title: 'Best Practices for Preventative Mould Maintenance in High-Volume Runs',
    category: 'Shop Floor Best Practices',
    readTime: '4 min read',
    desc: 'How regular ultrasonic cleaning, ejector pin lubrication, and parting line checks prevent flash, maintain tolerances, and extend mould life beyond 500,000 shots.',
  },
]

export default function Insights() {
  return (
    <>
      <Seo
        title="Manufacturing Insights & Engineering Guides — NEOTECH Moulding"
        desc="Technical articles and manufacturing guides on injection moulding, DFM rules, polymer selection, and mould maintenance from NEOTECH engineers."
        path="/insights"
      />

      <PageHero
        eyebrow="Technical Knowledge"
        eyebrowNumber="06"
        title="Engineering Guides & Manufacturing Insights."
        highlight="Practical Knowledge."
        description="Explore technical articles, DFM guidelines, and material selection best practices compiled by our plastic injection moulding engineers."
        image={assets.factory}
        imageAlt="Modern factory production plant"
        imageSlot="factory · production floor"
        stats={[
          { label: 'Focus', value: 'DFM & Tooling' },
          { label: 'Materials', value: 'Resin Guides' },
          { label: 'Level', value: 'Engineering' },
        ]}
      />

      {/* Insights Article List */}
      <section className="bg-paper py-24">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10">
          <Reveal>
            <Eyebrow n="01">Articles & Guides</Eyebrow>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-4 text-[clamp(2rem,4vw,3.2rem)] font-bold text-navy">
              Practical manufacturing knowledge from the factory floor.
            </h2>
          </Reveal>

          <div className="mt-16 grid gap-8 md:grid-cols-2">
            {articles.map((art, idx) => (
              <Reveal key={idx} delay={idx * 0.1}>
                <article className="flex h-full flex-col justify-between border border-navy/15 bg-white p-8 md:p-10 shadow-sm transition-all hover:border-orange">
                  <div>
                    <div className="flex items-center justify-between text-xs text-steel">
                      <span className="mono bg-paper px-2.5 py-1 text-orange border border-navy/10">{art.category}</span>
                      <span className="flex items-center gap-1.5"><Clock size={14} />{art.readTime}</span>
                    </div>
                    <h3 className="mt-6 text-xl font-bold text-navy md:text-2xl">{art.title}</h3>
                    <p className="mt-4 text-base leading-relaxed text-graphite/80">{art.desc}</p>
                  </div>

                  <div className="mt-8 border-t border-navy/10 pt-5">
                    <Button to="/quote" variant="dark">
                      Discuss this in your project <ArrowUpRight size={16} />
                    </Button>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
