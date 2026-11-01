import { motion, useReducedMotion, useMotionValue, useSpring } from 'framer-motion'
import { useRef, type ReactNode, type MouseEvent } from 'react'
import { Link } from 'react-router-dom'

export const Reveal = ({ children, delay = 0, className = '' }: { children: ReactNode; delay?: number; className?: string }) => {
  const rm = useReducedMotion()
  return (
    <motion.div className={className} initial={rm ? false : { opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  )
}

export const Eyebrow = ({ n, children, dark }: { n?: string; children: ReactNode; dark?: boolean }) => (
  <div className={`mono flex items-center gap-3 ${dark ? 'text-steel-2' : 'text-steel'}`}>
    <span className="inline-block h-px w-8 bg-orange" />{n && <span className="text-orange">{n}</span>}{children}
  </div>
)

// Labelled placeholder until a real photograph is configured in config/assets.ts
export const Photo = ({ src, slot, alt, className = '', scan }: { src?: string; slot: string; alt: string; className?: string; scan?: boolean }) => (
  <div className={`relative overflow-hidden bg-navy-2 ${className}`} role="img" aria-label={alt}>
    {src ? <img src={src} alt="" loading="lazy" className="h-full w-full object-cover" /> : (
      <div className="absolute inset-0 grid-bg flex flex-col items-center justify-center gap-2 text-steel">
        <svg width="56" height="56" viewBox="0 0 56 56" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden><rect x="6" y="12" width="44" height="32"/><circle cx="20" cy="24" r="4"/><path d="M6 40l14-12 10 8 8-6 12 10"/></svg>
        <span className="mono text-center px-4">Photo slot · {slot}</span>
      </div>
    )}
    {scan && <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-orange shadow-[0_0_18px_3px_rgba(242,106,27,.8)]" style={{ animation: 'scan 4.5s ease-in-out infinite' }} />}
  </div>
)

export const Button = ({ to, href, children, variant = 'primary', onClick, className = '' }: { to?: string; href?: string; children: ReactNode; variant?: 'primary' | 'ghost' | 'dark'; onClick?: () => void; className?: string }) => {
  const x = useMotionValue(0), y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 220, damping: 18 }), sy = useSpring(y, { stiffness: 220, damping: 18 })
  const ref = useRef<HTMLDivElement>(null)
  const rm = useReducedMotion()
  const move = (e: MouseEvent) => {
    if (rm || !ref.current || window.matchMedia('(pointer: coarse)').matches) return
    const r = ref.current.getBoundingClientRect()
    x.set((e.clientX - (r.left + r.width / 2)) * 0.2); y.set((e.clientY - (r.top + r.height / 2)) * 0.25)
  }
  const cls = `inline-flex min-h-12 items-center gap-2 px-6 py-3 text-sm font-semibold tracking-wide transition-colors ${
    variant === 'primary' ? 'bg-orange text-white hover:bg-white hover:text-navy' :
    variant === 'dark' ? 'bg-navy text-white hover:bg-orange' : 'border border-white/40 text-white hover:border-orange hover:text-orange'} ${className}`

  const inner = to ? <Link to={to} className={cls} onClick={onClick}>{children}</Link>
    : <a href={href} className={cls} target={href?.startsWith('http') ? '_blank' : undefined} rel="noreferrer">{children}</a>
  return <motion.div ref={ref} style={{ x: sx, y: sy }} onMouseMove={move} onMouseLeave={() => { x.set(0); y.set(0) }} className="inline-block">{inner}</motion.div>
}
