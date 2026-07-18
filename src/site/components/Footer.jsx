import { Facebook, Instagram, Youtube } from 'lucide-react'
import { useClinicSettings } from '../hooks/useClinicSettings'
import { useLang } from '../i18n/LanguageContext'

export default function Footer() {
  const settings = useClinicSettings()
  const { t } = useLang()
  const clinicName = settings?.clinicName || t.footer.defaultName

  const quickLinks = [
    { href: '#home', label: t.nav.home },
    { href: '#services', label: t.nav.services },
    { href: '#offers', label: t.nav.offers },
    { href: '#gallery', label: t.nav.gallery },
    { href: '#doctors', label: t.nav.doctors },
    { href: '#booking', label: t.nav.booking },
    { href: '#contact', label: t.nav.contact },
  ]

  return (
    <footer className="bg-ink text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-5 py-12 sm:py-14 lg:px-8">
        <div className="grid gap-8 sm:gap-10 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary-500 text-white flex-shrink-0">
                <svg width="20" height="20" viewBox="0 0 48 48" fill="none">
                  <path
                    d="M24 6c-4.5 0-6.8 2.4-9.6 2.4-3.6 0-6.4 2.9-6.4 8.2 0 5 1.6 9.9 2.9 14.6.9 3.4 1.7 7.6 4.6 7.6 3.3 0 3-9.2 8.5-9.2s5.2 9.2 8.5 9.2c2.9 0 3.7-4.2 4.6-7.6 1.3-4.7 2.9-9.6 2.9-14.6 0-5.3-2.8-8.2-6.4-8.2C30.8 8.4 28.5 6 24 6z"
                    fill="currentColor"
                  />
                </svg>
              </span>
              <span className="text-lg font-extrabold">{clinicName}</span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-loose text-white/60">
              {t.footer.tagline}
            </p>
          </div>

          <div>
            <h4 className="font-extrabold">{t.footer.quickLinks}</h4>
            <ul className="mt-4 grid grid-cols-2 gap-y-3 sm:grid-cols-1">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-white/60 transition-colors hover:text-primary-400"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-extrabold">{t.footer.follow}</h4>
            <div className="mt-4 flex gap-3">
              {[Facebook, Instagram, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-primary-500"
                  aria-label="social link"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 sm:mt-12 border-t border-white/10 pt-6 text-center text-sm text-white/50">
          © {new Date().getFullYear()} {clinicName}. {t.footer.rights}
        </div>
      </div>
    </footer>
  )
}
