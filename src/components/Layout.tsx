import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowUp, Menu, X } from 'lucide-react'
import { site, placeholder, waLink } from '../config/site'
import { assets } from '../config/assets'
import { useI18n } from '../i18n'

const routes = ['/', '/about', '/products', '/capabilities', '/industries', '/quality', '/insights', '/contact']

export const Logo = ({ light = true }: { light?: boolean }) => assets.logo
  ? <img src={assets.logo} alt={site.name} className="h-9" />
  : (
    <span className="flex items-center gap-3">
      <span aria-hidden className="grid h-9 w-9 place-items-center bg-orange"><span className="h-3.5 w-3.5 bg-navy" /></span>
      <span className={`leading-none ${light ? 'text-white' : 'text-navy'}`}>
        <span className="block text-lg font-bold tracking-[0.18em]">NEOTECH</span>
        <span className="mono block text-[0.55rem] text-steel">Moulding Industries</span>
      </span>
    </span>
  )

export default function Layout() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [top, setTop] = useState(false)
  const { t, l, setL } = useI18n()
  const loc = useLocation()
  const rm = useReducedMotion()
  useEffect(() => {
    const f = () => { setScrolled(scrollY > 40); setTop(scrollY > 900) }
    f(); addEventListener('scroll', f, { passive: true }); return () => removeEventListener('scroll', f)
  }, [])
  useEffect(() => { setOpen(false); scrollTo(0, 0) }, [loc.pathname])
  useEffect(() => { document.body.style.overflow = open ? 'hidden' : '' }, [open])

  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[100] focus:bg-orange focus:px-4 focus:py-2 focus:text-white">Skip to content</a>
      <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-navy/95 backdrop-blur-md py-2.5 shadow-xl border-b border-white/10' : 'bg-navy/85 backdrop-blur-md py-4 border-b border-white/10'}`}>
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-5 md:px-10">
          <Link to="/" aria-label={`${site.name} home`}><Logo light={true} /></Link>
          <nav aria-label="Primary" className="hidden items-center gap-1 xl:flex">
            {routes.map((r, i) => (
              <NavLink key={r} to={r} end={r === '/'} className={({ isActive }) => `relative px-3 py-2 text-sm font-medium transition-colors ${isActive ? 'text-white font-semibold' : 'text-steel-2 hover:text-white'}`}>
                {({ isActive }) => (<>{t.nav[i]}{isActive && <motion.span layoutId="nav-active" className="absolute inset-x-3 -bottom-1 h-0.5 bg-orange" />}</>)}
              </NavLink>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <div className="hidden items-center border border-white/20 text-xs sm:flex" role="group" aria-label="Language">
              {(['en', 'hi'] as const).map(k => (
                <button key={k} onClick={() => setL(k)} aria-pressed={l === k} className={`min-h-9 px-3 font-semibold ${l === k ? 'bg-white text-navy' : 'text-steel-2 hover:text-white'}`}>{k === 'en' ? 'EN' : 'हिं'}</button>
              ))}
            </div>
            <Link to="/quote" className="hidden min-h-11 items-center bg-orange px-5 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-navy sm:inline-flex">{t.quote}</Link>
            <button className="grid h-11 w-11 place-items-center text-white xl:hidden" aria-expanded={open} aria-controls="mobile-nav" aria-label={open ? 'Close menu' : 'Open menu'} onClick={() => setOpen(!open)}>
              {open ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div id="mobile-nav" initial={rm ? false : { clipPath: 'inset(0 0 100% 0)' }} animate={{ clipPath: 'inset(0 0 0% 0)' }} exit={{ clipPath: 'inset(0 0 100% 0)' }} transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
            className="grid-bg fixed inset-0 z-40 overflow-auto bg-navy px-6 pb-10 pt-28 xl:hidden">
            <nav aria-label="Mobile" className="flex flex-col">
              {routes.map((r, i) => (
                <Link key={r} to={r} className="flex min-h-14 items-center justify-between border-b border-white/10 text-2xl font-semibold text-white"><span>{t.nav[i]}</span><span className="mono text-steel">0{i + 1}</span></Link>
              ))}
            </nav>
            <div className="mt-8 flex gap-3">
              <Link to="/quote" className="inline-flex min-h-12 flex-1 items-center justify-center bg-orange font-semibold text-white">{t.quote}</Link>
              <button onClick={() => setL(l === 'en' ? 'hi' : 'en')} className="min-h-12 border border-white/30 px-5 text-white">{l === 'en' ? 'हिंदी' : 'English'}</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        <motion.main id="main" key={loc.pathname} initial={rm ? false : { opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
          <Outlet />
        </motion.main>
      </AnimatePresence>

      <footer className="bg-graphite text-steel-2">
        <div className="grid-bg">
          <div className="mx-auto grid max-w-[1400px] gap-12 px-5 py-20 md:grid-cols-12 md:px-10">
            <div className="md:col-span-4">
              <Logo />
              <p className="mt-6 max-w-sm text-sm leading-relaxed">Custom plastic components and precision injection moulding for OEMs and manufacturers.</p>
              <p className="mono mt-6 text-orange">{site.tagline}</p>
            </div>
            <div className="md:col-span-2">
              <h2 className="mono mb-4 text-white">Company</h2>
              <ul className="space-y-2 text-sm">{routes.slice(1).map((r, i) => <li key={r}><Link className="hover:text-orange" to={r}>{t.nav[i + 1]}</Link></li>)}</ul>
            </div>
            <div className="md:col-span-3">
              <h2 className="mono mb-4 text-white">Product categories</h2>
              <ul className="space-y-2 text-sm">
                <li><Link className="hover:text-orange" to="/products">Mobility &amp; EV support parts</Link></li>
                <li><Link className="hover:text-orange" to="/products">Electrical &amp; infrastructure</Link></li>
                <li><Link className="hover:text-orange" to="/products">Appliance &amp; utility products</Link></li>
              </ul>
            </div>
            <div className="md:col-span-3">
              <h2 className="mono mb-4 text-white">Contact</h2>
              <address className="space-y-2 text-sm not-italic">
                <p>{placeholder(site.address, 'Address')}</p>
                <p>{placeholder(site.phone, 'Phone')}</p>
                <p>{placeholder(site.email, 'Email')}</p>
                <a className="inline-block text-orange hover:underline" href={waLink()}>WhatsApp us</a>
              </address>
            </div>
          </div>
          <div className="border-t border-white/10">
            <div className="mx-auto flex max-w-[1400px] flex-wrap items-center justify-between gap-3 px-5 py-5 text-xs md:px-10">
              <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
              <p className="flex gap-5"><Link to="/contact" className="hover:text-orange">Privacy policy</Link><Link to="/contact" className="hover:text-orange">Terms</Link></p>
            </div>
          </div>
        </div>
      </footer>

      <AnimatePresence>
        {top && (
          <motion.button initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 12 }} aria-label="Back to top"
            onClick={() => scrollTo({ top: 0, behavior: rm ? 'auto' : 'smooth' })} className="fixed bottom-5 right-5 z-40 grid h-12 w-12 place-items-center bg-orange text-white hover:bg-white hover:text-navy">
            <ArrowUp size={20} />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  )
}
