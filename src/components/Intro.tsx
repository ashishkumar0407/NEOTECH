import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Logo } from './Layout'

export default function Intro() {
  const rm = useReducedMotion()
  const [show, setShow] = useState(() => { try { return !sessionStorage.getItem('intro') } catch { return true } })
  useEffect(() => {
    if (!show) return
    const t = setTimeout(() => { setShow(false); try { sessionStorage.setItem('intro', '1') } catch {} }, rm ? 300 : 2200)
    return () => clearTimeout(t)
  }, [show, rm])
  return (
    <AnimatePresence>
      {show && (
        <motion.div className="grid-bg fixed inset-0 z-[200] grid place-items-center bg-navy" exit={{ clipPath: 'inset(0 0 100% 0)' }} transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }} aria-hidden>
          <div className="relative">
            <motion.div initial={{ clipPath: 'inset(0 100% 0 0)' }} animate={{ clipPath: 'inset(0 0% 0 0)' }} transition={{ duration: 1.1, delay: 0.2, ease: [0.76, 0, 0.24, 1] }}><Logo /></motion.div>
            <motion.span className="absolute -top-3 h-[calc(100%+24px)] w-px bg-orange" initial={{ left: '0%' }} animate={{ left: '100%', opacity: [1, 1, 0] }} transition={{ duration: 1.1, delay: 0.2, ease: [0.76, 0, 0.24, 1] }} />
            <motion.p className="mono mt-4 text-center text-steel" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3 }}>Moulding the future</motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
