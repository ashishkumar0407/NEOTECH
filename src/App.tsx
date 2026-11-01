import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Intro from './components/Intro'
import Home from './pages/Home'

const About = lazy(() => import('./pages/About'))
const Products = lazy(() => import('./pages/Products'))
const Capabilities = lazy(() => import('./pages/Capabilities'))
const Industries = lazy(() => import('./pages/Industries'))
const Quality = lazy(() => import('./pages/Quality'))
const Insights = lazy(() => import('./pages/Insights'))
const Quote = lazy(() => import('./pages/Forms').then(m => ({ default: m.Quote })))
const Contact = lazy(() => import('./pages/Forms').then(m => ({ default: m.Contact })))
const Soon = lazy(() => import('./pages/Forms').then(m => ({ default: m.Soon })))

export default function App() {
  return (
    <>
      <Intro />
      <Suspense fallback={<div className="min-h-screen bg-navy" />}>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="products" element={<Products />} />
            <Route path="capabilities" element={<Capabilities />} />
            <Route path="industries" element={<Industries />} />
            <Route path="quality" element={<Quality />} />
            <Route path="insights" element={<Insights />} />
            <Route path="quote" element={<Quote />} />
            <Route path="contact" element={<Contact />} />
            <Route path="*" element={<Soon title="Page not found" />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  )
}
