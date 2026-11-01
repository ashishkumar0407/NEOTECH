// NEOTECH enquiry API. DEV MODE (no SMTP configured): saves submissions to ./uploads/submissions.jsonl.
// PRODUCTION: set SMTP_* and MAIL_TO in .env (see .env.example) and submissions are emailed with attachments.
import express from 'express'
import multer from 'multer'
import nodemailer from 'nodemailer'
import fs from 'node:fs'
import path from 'node:path'
import crypto from 'node:crypto'

try { for (const l of fs.readFileSync('.env', 'utf8').split('\n')) { const m = l.match(/^\s*([A-Z_]+)\s*=\s*(.*)\s*$/); if (m && !process.env[m[1]]) process.env[m[1]] = m[2] } } catch {}
const { PORT = 8787, SMTP_HOST, SMTP_PORT = 587, SMTP_USER, SMTP_PASS, MAIL_TO, MAIL_FROM } = process.env
const DEV = !(SMTP_HOST && MAIL_TO)
const ALLOWED = new Set(['.pdf', '.png', '.jpg', '.jpeg', '.webp', '.dwg', '.dxf', '.step', '.stp', '.iges', '.igs', '.stl'])
const dir = path.resolve('uploads'); fs.mkdirSync(dir, { recursive: true })

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024, files: 3, fields: 20 },
  fileFilter: (_r, f, cb) => cb(ALLOWED.has(path.extname(f.originalname).toLowerCase()) ? null : new Error(`File type not allowed: ${f.originalname}`), ALLOWED.has(path.extname(f.originalname).toLowerCase())),
})
const hits = new Map()
const limited = ip => { const n = Date.now(), a = (hits.get(ip) || []).filter(t => n - t < 600000); a.push(n); hits.set(ip, a); return a.length > 8 }
const esc = s => String(s ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]))
const str = (v, n = 4000) => String(v ?? '').trim().slice(0, n)

const app = express()
app.disable('x-powered-by')
app.get('/api/health', (_q, r) => r.json({ ok: true, mode: DEV ? 'dev' : 'smtp' }))
app.post('/api/enquiry', (req, res) => {
  if (limited(req.ip)) return res.status(429).json({ error: 'Too many submissions. Please try again later.' })
  upload.array('files', 3)(req, res, async err => {
    if (err) return res.status(400).json({ error: err.code === 'LIMIT_FILE_SIZE' ? 'A file exceeds 10 MB.' : err.message })
    const b = req.body || {}
    if (str(b.website)) return res.json({ ok: true, mode: 'dev' }) // honeypot: silently drop bots
    const d = { kind: b.kind === 'quote' ? 'quote' : 'contact', name: str(b.name, 120), company: str(b.company, 160), email: str(b.email, 200), phone: str(b.phone, 40), category: str(b.category, 120), material: str(b.material, 80), quantity: str(b.quantity, 120), mould: str(b.mould, 80), reference: str(b.reference, 300), message: str(b.message) }
    if (d.name.length < 2 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email) || d.message.length < 10) return res.status(400).json({ error: 'Please complete name, valid email and message.' })
    if (d.kind === 'quote' && !/^[+\d][\d\s()-]{7,}$/.test(d.phone)) return res.status(400).json({ error: 'Please enter a valid phone number.' })
    const files = req.files || []
    try {
      if (DEV) {
        const id = crypto.randomUUID(), saved = []
        for (const f of files) { const n = `${id}-${path.basename(f.originalname).replace(/[^\w.-]/g, '_')}`; fs.writeFileSync(path.join(dir, n), f.buffer); saved.push(n) }
        fs.appendFileSync(path.join(dir, 'submissions.jsonl'), JSON.stringify({ id, at: new Date().toISOString(), ...d, files: saved }) + '\n')
        console.log(`[DEV MODE] enquiry saved (${d.kind}) from ${d.email}`)
        return res.json({ ok: true, mode: 'dev' })
      }
      const tx = nodemailer.createTransport({ host: SMTP_HOST, port: Number(SMTP_PORT), secure: Number(SMTP_PORT) === 465, auth: SMTP_USER ? { user: SMTP_USER, pass: SMTP_PASS } : undefined })
      await tx.sendMail({ from: MAIL_FROM || SMTP_USER, to: MAIL_TO, replyTo: d.email, subject: `[${d.kind === 'quote' ? 'Quote' : 'Contact'}] ${d.name}${d.company ? ' — ' + d.company : ''}`,
        html: `<table>${Object.entries(d).filter(([, v]) => v).map(([k, v]) => `<tr><th align="left">${esc(k)}</th><td>${esc(v).replace(/\n/g, '<br>')}</td></tr>`).join('')}</table>`,
        attachments: files.map(f => ({ filename: f.originalname, content: f.buffer })) })
      res.json({ ok: true, mode: 'smtp' })
    } catch (e) { console.error(e); res.status(500).json({ error: 'Could not deliver your enquiry. Please use WhatsApp or email us directly.' }) }
  })
})
app.listen(PORT, () => console.log(`API on :${PORT} — ${DEV ? 'DEV MODE (saving to ./uploads)' : 'SMTP delivery'}`))
