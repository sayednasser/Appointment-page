import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'
import Offers from './components/Offers'
import Gallery from './components/Gallery'
import Doctors from './components/Doctors'
import Booking from './components/Booking'
import Testimonials from './components/Testimonials'
import Contact from './components/Contact'
import Footer from './components/Footer'
import FloatingWhatsapp from './components/FloatingWhatsapp'
import { LanguageProvider, useLang } from './i18n/LanguageContext'

function HomePageInner() {
  const { isRTL } = useLang()
  return (
    <div dir={isRTL ? 'rtl' : 'ltr'} className="font-cairo">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Offers />
        <Gallery />
        <Doctors />
        <Booking />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <FloatingWhatsapp />
    </div>
  )
}

export default function HomePage() {
  return (
    <LanguageProvider>
      <HomePageInner />
    </LanguageProvider>
  )
}
