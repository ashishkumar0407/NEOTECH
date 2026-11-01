import { useEffect } from 'react'
import { site } from '../config/site'
export const Seo = ({ title, desc, path = '/' }: { title: string; desc: string; path?: string }) => {
  useEffect(() => {
    document.title = `${title} | ${site.short}`
    const set = (sel: string, attr: string, key: string, val: string) => {
      let el = document.head.querySelector<HTMLElement>(sel)
      if (!el) { el = document.createElement(sel.startsWith('link') ? 'link' : 'meta'); el.setAttribute(attr, key); document.head.appendChild(el) }
      el.setAttribute(sel.startsWith('link') ? 'href' : 'content', val)
    }
    set('meta[name="description"]', 'name', 'description', desc)
    set('link[rel="canonical"]', 'rel', 'canonical', site.url + path)
    set('meta[property="og:title"]', 'property', 'og:title', title)
    set('meta[property="og:description"]', 'property', 'og:description', desc)
    set('meta[property="og:type"]', 'property', 'og:type', 'website')
    set('meta[property="og:url"]', 'property', 'og:url', site.url + path)
    let ld = document.getElementById('ld-org')
    if (!ld) { ld = document.createElement('script'); ld.id = 'ld-org'; ld.setAttribute('type', 'application/ld+json'); document.head.appendChild(ld) }
    ld.textContent = JSON.stringify({ '@context': 'https://schema.org', '@type': 'Organization', name: site.name, url: site.url, slogan: site.tagline,
      ...(site.phone && { telephone: site.phone }), ...(site.email && { email: site.email }),
      ...(site.address && { address: { '@type': 'PostalAddress', streetAddress: site.address, addressLocality: site.city } }) })
  }, [title, desc, path])
  return null
}
