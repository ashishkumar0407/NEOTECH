import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { Button, Eyebrow, Photo, Reveal } from './ui'
import { waLink } from '../config/site'

export interface PageHeroProps {
  eyebrow: string
  eyebrowNumber?: string
  title: string
  highlight?: string
  description: string
  image: string
  imageAlt: string
  imageSlot?: string
  stats?: { label: string; value: string }[]
  primaryCtaText?: string
  primaryCtaLink?: string
  showWhatsApp?: boolean
}

export function PageHero({
  eyebrow,
  eyebrowNumber,
  title,
  highlight,
  description,
  image,
  imageAlt,
  imageSlot = 'hero-image',
  stats,
  primaryCtaText = 'Request a Quote',
  primaryCtaLink = '/quote',
  showWhatsApp = true,
}: PageHeroProps) {
  const rm = useReducedMotion()

  return (
    <section className="relative isolate overflow-hidden bg-navy pt-36 pb-20 text-white md:pt-44 md:pb-28">
      {/* Background Ambience */}
      <div aria-hidden className="grid-bg absolute inset-0 -z-20 opacity-75" />
      <div aria-hidden className="absolute -top-40 right-0 -z-10 h-96 w-96 rounded-full bg-orange/10 blur-3xl" />
      <div aria-hidden className="absolute bottom-0 left-0 -z-10 h-72 w-72 rounded-full bg-navy-2/50 blur-2xl" />

      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          {/* Text Column */}
          <div className="lg:col-span-7">
            <Reveal>
              <Eyebrow n={eyebrowNumber} dark>{eyebrow}</Eyebrow>
            </Reveal>

            <Reveal delay={0.1}>
              <h1 className="mt-6 text-[clamp(2.2rem,5vw,4.2rem)] font-bold leading-[1.05] tracking-tight">
                {title}{' '}
                {highlight && <span className="text-orange">{highlight}</span>}
              </h1>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-steel-2">
                {description}
              </p>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <Button to={primaryCtaLink}>
                  {primaryCtaText} <ArrowUpRight size={18} />
                </Button>
                {showWhatsApp && (
                  <Button href={waLink(`Hello NEOTECH, I am interested in ${title}.`)} variant="ghost">
                    Talk on WhatsApp
                  </Button>
                )}
              </div>
            </Reveal>

            {stats && stats.length > 0 && (
              <Reveal delay={0.4}>
                <div className="mt-12 grid grid-cols-2 gap-6 border-t border-white/10 pt-8 sm:grid-cols-3">
                  {stats.map((s, idx) => (
                    <div key={idx}>
                      <div className="text-2xl font-bold text-white md:text-3xl">{s.value}</div>
                      <div className="mono mt-1 text-xs text-steel-2">{s.label}</div>
                    </div>
                  ))}
                </div>
              </Reveal>
            )}
          </div>

          {/* Hero Image Column */}
          <div className="lg:col-span-5">
            <Reveal delay={0.2}>
              <motion.div
                initial={rm ? false : { opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="relative overflow-hidden border border-white/15 bg-navy-2 shadow-2xl"
              >
                <Photo
                  src={image}
                  slot={imageSlot}
                  alt={imageAlt}
                  className="aspect-[4/3] w-full md:aspect-[16/11]"
                  scan
                />
                <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent pointer-events-none" />
              </motion.div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
