# NEOTECH MOULDING INDUSTRIES — website (pass 1: design system + homepage)

## Run
    npm install
    cp .env.example .env
    npm run server        # API on :8787 (DEV MODE saves to ./uploads until SMTP is set)
    npm run dev           # site on :5173 (proxies /api)
    npm run build         # production build in dist/ (serve dist/ and run the API behind /api)

## Fill in real content
- `src/config/site.ts` — address, phone, email, WhatsApp, GSTIN, city/service area, verified stats (counters stay hidden while `null`).
- `src/config/assets.ts` + `public/images/` — logo and Toshiba/factory photos. Empty paths render labelled "Photo slot" placeholders.
- `.env` — SMTP_HOST/PORT/USER/PASS, MAIL_TO, MAIL_FROM to switch the forms from DEV MODE to emailed delivery with attachments.
- Replace `https://www.example.com` in `public/sitemap.xml`, `public/robots.txt`, `site.url`.

## Status
Built: intro, nav, EN/HI switch (nav + hero), homepage, /quote (validated, uploads), /contact, SEO tags + JSON-LD, honeypot + rate limit.
Next pass: About, Products (+detail), Capabilities, Industries, Quality & Materials, Gallery, Insights articles.
