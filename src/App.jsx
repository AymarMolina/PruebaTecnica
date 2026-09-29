import { useState } from 'react'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import TrustBar from './components/TrustBar.jsx'
import Situations from './components/Situations.jsx'
import HowItWorks from './components/HowItWorks.jsx'
import WhyUs from './components/WhyUs.jsx'
import FAQ from './components/FAQ.jsx'
import CTABand from './components/CTABand.jsx'
import Footer from './components/Footer.jsx'
import LegalModal from './components/LegalModal.jsx'
import MobileCTABar from './components/MobileCTABar.jsx'
import { useInView } from './hooks/useInView.js'

export default function App() {
  const [legal, setLegal] = useState(null) // 'terms' | 'privacy' | null
  const [heroRef, heroInView] = useInView({ threshold: 0.05 }, true)

  return (
    <>
      <Header />
      <main>
        <div ref={heroRef}>
          <Hero onOpenTerms={() => setLegal('terms')} />
        </div>
        <TrustBar />
        <Situations />
        <HowItWorks />
        <WhyUs />
        <FAQ />
        <CTABand />
      </main>
      <Footer onOpenLegal={setLegal} />
      <MobileCTABar hidden={heroInView} />
      <LegalModal type={legal} onClose={() => setLegal(null)} />
    </>
  )
}
