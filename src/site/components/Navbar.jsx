import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Phone, MessageCircle, Languages } from 'lucide-react'
import { useClinicSettings } from '../hooks/useClinicSettings'
import { useLang } from '../i18n/LanguageContext'

export default function Navbar() {
  const settings = useClinicSettings()
  const { t, toggleLang } = useLang()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const phoneDigits = settings?.phone?.replace(/[^0-9+]/g, '') || '+201234567890'
  const whatsappDigits = settings?.whatsapp?.replace(/[^0-9]/g, '') || '201234567890'
  const clinicName = settings?.clinicName || 'دنتافلو'

  const navLinks = [
    { href: '#home', label: t.nav.home },
    { href: '#services', label: t.nav.services },
    { href: '#offers', label: t.nav.offers },
    { href: '#gallery', label: t.nav.gallery },
    { href: '#doctors', label: t.nav.doctors },
    { href: '#booking', label: t.nav.booking },
    { href: '#contact', label: t.nav.contact },
  ]

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock background scroll while the mobile menu is open so the menu behaves
  // identically no matter how far down the page the user has scrolled, and
  // restore the scroll position when it closes.
  useEffect(() => {
    if (!open) return
    const scrollY = window.scrollY
    const { style } = document.body
    const prevPosition = style.position
    const prevTop = style.top
    const prevWidth = style.width
    style.position = 'fixed'
    style.top = `-${scrollY}px`
    style.width = '100%'
    return () => {
      style.position = prevPosition
      style.top = prevTop
      style.width = prevWidth
      window.scrollTo(0, scrollY)
    }
  }, [open])

  // Close the mobile menu automatically if the viewport is resized past the
  // mobile breakpoint (e.g. device rotation), avoiding a stuck-open overlay.
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setOpen(false)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const handleNavClick = (e, href) => {
    e.preventDefault()
    setOpen(false)
    // Let the menu-close animation/scroll-unlock settle before jumping to
    // the section so the browser measures the correct scroll position.
    requestAnimationFrame(() => {
      const target = document.querySelector(href)
      if (target) target.scrollIntoView({ behavior: 'smooth' })
    })
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[55] transition-all duration-300 ${
        scrolled ? 'bg-white/90 backdrop-blur-lg shadow-card py-2' : 'bg-transparent py-4'
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-5 lg:px-8">
        <a href="#home" onClick={(e) => handleNavClick(e, '#home')} className="flex min-w-0 flex-1 items-center gap-2 sm:gap-2.5 lg:flex-none">
          <span className="flex h-9 w-9 sm:h-10 sm:w-10 flex-shrink-0 items-center justify-center rounded-2xl bg-primary-500 text-white shadow-card">
            <svg width="20" height="20" viewBox="0 0 48 48" fill="none">
              <path
                d="M24 6c-4.5 0-6.8 2.4-9.6 2.4-3.6 0-6.4 2.9-6.4 8.2 0 5 1.6 9.9 2.9 14.6.9 3.4 1.7 7.6 4.6 7.6 3.3 0 3-9.2 8.5-9.2s5.2 9.2 8.5 9.2c2.9 0 3.7-4.2 4.6-7.6 1.3-4.7 2.9-9.6 2.9-14.6 0-5.3-2.8-8.2-6.4-8.2C30.8 8.4 28.5 6 24 6z"
                fill="currentColor"
              />
            </svg>
          </span>
          <span className="min-w-0 flex-1 truncate text-sm font-extrabold leading-tight text-ink xs:text-base sm:text-lg lg:flex-none lg:truncate-0">
            {clinicName}
          </span>
        </a>

        {/* Desktop nav links */}
        <ul className="hidden items-center gap-5 xl:gap-8 lg:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-sm font-semibold text-ink-soft transition-colors hover:text-primary-600 whitespace-nowrap"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop action buttons */}
        <div className="hidden items-center gap-2 lg:flex">
          <button
            onClick={toggleLang}
            className="inline-flex items-center gap-1.5 rounded-full border border-primary-200 bg-primary-50 px-3 py-2 text-xs font-bold text-primary-700 transition-colors hover:bg-primary-100"
            aria-label="Switch language"
          >
            <Languages size={14} />
            {t.nav.switchLang}
          </button>
          <a href={`tel:${phoneDigits}`} className="btn-outline !px-4 !py-2.5 text-sm">
            <Phone size={16} />
            {t.nav.callNow}
          </a>
          <a
            href={`https://wa.me/${whatsappDigits}`}
            target="_blank"
            rel="noreferrer"
            className="btn-whatsapp !px-4 !py-2.5 text-sm"
          >
            <MessageCircle size={16} />
            {t.nav.whatsapp}
          </a>
        </div>

        {/* Mobile: hamburger only — language switcher moved inside the menu */}
        <div className="flex flex-shrink-0 items-center lg:hidden">
          <button
            onClick={() => setOpen(true)}
            className="flex h-10 w-10 items-center justify-center rounded-xl text-ink"
            aria-label={t.nav.openMenu}
            aria-expanded={open}
          >
            <Menu size={26} />
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay + drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] bg-ink/40 lg:hidden"
            aria-hidden="true"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.28 }}
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-label={t.nav.menu}
              className="absolute inset-y-0 right-0 flex w-[min(18rem,85vw)] flex-col bg-white shadow-floaty"
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
                <span className="text-base font-extrabold text-ink">{t.nav.menu}</span>
                <button
                  onClick={() => setOpen(false)}
                  aria-label={t.nav.close}
                  className="flex h-9 w-9 items-center justify-center rounded-xl text-ink-soft hover:bg-slate-100"
                >
                  <X size={22} />
                </button>
              </div>

              {/* Scrollable body */}
              <div className="flex flex-1 flex-col gap-6 overflow-y-auto px-5 py-5">
                {/* Navigation links */}
                <ul className="flex flex-col gap-1">
                  {navLinks.map((link) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        onClick={(e) => handleNavClick(e, link.href)}
                        className="flex items-center rounded-xl px-3 py-3 text-base font-semibold text-ink-soft transition-colors hover:bg-primary-50 hover:text-primary-600 active:bg-primary-100"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>

                {/* Divider */}
                <div className="border-t border-slate-100" />

                {/* Language switcher inside mobile menu (Task 3) */}
                <div>
                  <p className="mb-2 px-3 text-xs font-bold uppercase tracking-wider text-ink-soft/70">
                    {t.nav.switchLangLabel}
                  </p>
                  <button
                    onClick={toggleLang}
                    className="flex w-full items-center gap-2 rounded-xl border border-primary-200 bg-primary-50 px-3 py-3 text-sm font-bold text-primary-700 transition-colors hover:bg-primary-100"
                    aria-label="Switch language"
                  >
                    <Languages size={16} />
                    {t.nav.switchLang}
                  </button>
                </div>

                {/* Divider */}
                <div className="border-t border-slate-100" />

                {/* Contact actions */}
                <div className="flex flex-col gap-3 pb-2">
                  <a
                    href={`tel:${phoneDigits}`}
                    onClick={() => setOpen(false)}
                    className="btn-outline"
                  >
                    <Phone size={18} />
                    {t.nav.callNow}
                  </a>
                  <a
                    href={`https://wa.me/${whatsappDigits}`}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => setOpen(false)}
                    className="btn-whatsapp"
                  >
                    <MessageCircle size={18} />
                    {t.nav.whatsappContact}
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
