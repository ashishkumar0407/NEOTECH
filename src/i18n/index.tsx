import { createContext, useContext, useState, type ReactNode } from 'react'
const dict = {
  en: { nav: ['Home','About Us','Products','Capabilities','Industries','Quality','Insights','Contact'], quote: 'Get a Quote',
    h1: ['Precision-Moulded Components.','Engineered for Performance.'],
    sub: 'Your manufacturing partner for custom plastic components, precision injection moulding, and scalable OEM production.',
    cta1: 'Request a Quote', cta2: 'Explore Our Capabilities' },
  hi: { nav: ['होम','हमारे बारे में','उत्पाद','क्षमताएँ','उद्योग','गुणवत्ता','इनसाइट्स','संपर्क'], quote: 'कोटेशन पाएँ',
    h1: ['सटीक मोल्डेड कंपोनेंट्स।','प्रदर्शन के लिए इंजीनियर्ड।'],
    sub: 'कस्टम प्लास्टिक कंपोनेंट्स, प्रिसिज़न इंजेक्शन मोल्डिंग और स्केलेबल OEM उत्पादन के लिए आपका निर्माण साझेदार।',
    cta1: 'कोटेशन का अनुरोध करें', cta2: 'हमारी क्षमताएँ देखें' },
}
type L = 'en' | 'hi'
const C = createContext<{ l: L; t: typeof dict.en; setL: (l: L) => void }>({ l: 'en', t: dict.en, setL: () => {} })
export const I18n = ({ children }: { children: ReactNode }) => {
  const [l, setL] = useState<L>(() => { try { return (localStorage.getItem('lang') as L) || 'en' } catch { return 'en' } })
  const set = (x: L) => { setL(x); try { localStorage.setItem('lang', x) } catch {} document.documentElement.lang = x }
  return <C.Provider value={{ l, t: dict[l], setL: set }}>{children}</C.Provider>
}
export const useI18n = () => useContext(C)
