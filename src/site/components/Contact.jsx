import { Phone, MessageCircle, MapPin, Clock, ExternalLink, Navigation } from 'lucide-react'
import Reveal from './Reveal'
import { useClinicSettings } from '../hooks/useClinicSettings'
import { useLang } from '../i18n/LanguageContext'

export default function Contact() {
  const settings = useClinicSettings()
  const { t } = useLang()

  const phone = settings?.phone || '+20 123 456 7890'
  const whatsapp = settings?.whatsapp || '+20 123 456 7890'
  const phoneDigits = phone.replace(/[^0-9+]/g, '')
  const whatsappDigits = whatsapp.replace(/[^0-9]/g, '')
  const address = settings?.address || t.contact.defaultAddress
  const mapsUrl = settings?.googleMapsUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`

  return (
    <section id="contact" className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-5 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">{t.contact.eyebrow}</span>
          <h2 className="section-heading mt-4">{t.contact.heading}</h2>
        </Reveal>

        <div className="mt-12 sm:mt-14 grid gap-8 sm:gap-10 lg:grid-cols-2">
          <Reveal className="space-y-4 sm:space-y-5">
            <ContactRow icon={Phone} label={t.contact.callUs} value={phone} href={`tel:${phoneDigits}`} />
            <ContactRow
              icon={MessageCircle}
              label={t.contact.whatsapp}
              value={whatsapp}
              href={`https://wa.me/${whatsappDigits}`}
            />
            <ContactRow icon={MapPin} label={t.contact.address} value={address} />
            <ContactRow icon={Clock} label={t.contact.hours} value={t.contact.hoursValue} />

            <div className="flex flex-wrap gap-3 sm:gap-4 pt-2">
              <a href={`tel:${phoneDigits}`} className="btn-outline">
                <Phone size={18} />
                {t.contact.callNow}
              </a>
              <a
                href={`https://wa.me/${whatsappDigits}`}
                target="_blank"
                rel="noreferrer"
                className="btn-whatsapp"
              >
                <MessageCircle size={18} />
                {t.contact.whatsappBtn}
              </a>
            </div>
          </Reveal>

          {/* Location card — replaces the embedded map */}
          <Reveal delay={0.1}>
            <a
              href={mapsUrl}
              target="_blank"
              rel="noreferrer"
              aria-label={t.contact.viewOnMap}
              className="group card flex h-full min-h-[240px] sm:min-h-[300px] flex-col items-center justify-center gap-5 p-6 sm:p-8 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-floaty hover:border-primary-200 cursor-pointer"
            >
              {/* Animated map-pin icon */}
              <div className="relative flex items-center justify-center">
                <span className="absolute h-24 w-24 rounded-full bg-primary-50 transition-transform duration-500 group-hover:scale-110" />
                <span className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-500 text-white shadow-card transition-transform duration-300 group-hover:scale-105">
                  <MapPin size={28} />
                </span>
              </div>

              {/* Title */}
              <div className="space-y-2">
                <p className="text-lg font-extrabold text-ink">{t.contact.locationTitle}</p>
                <p className="text-sm leading-relaxed text-ink-soft">{address}</p>
                <p className="text-xs text-ink-soft/70">{t.contact.locationDesc}</p>
              </div>

              {/* CTA */}
              <span className="inline-flex items-center gap-2 rounded-full bg-primary-500 px-5 py-2.5 text-sm font-bold text-white shadow-card transition-all duration-300 group-hover:bg-primary-600 group-hover:shadow-floaty">
                <Navigation size={15} />
                {t.contact.viewOnMap}
                <ExternalLink size={13} />
              </span>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function ContactRow({ icon: Icon, label, value, href }) {
  const content = (
    <div className="flex items-center gap-3 sm:gap-4 rounded-2xl border border-slate-100 bg-slate-50/60 p-3 sm:p-4 transition-colors hover:bg-primary-50">
      <span className="flex h-11 w-11 sm:h-12 sm:w-12 flex-shrink-0 items-center justify-center rounded-xl bg-primary-500 text-white">
        <Icon size={20} />
      </span>
      <div className="min-w-0">
        <p className="text-xs text-ink-soft">{label}</p>
        <p className="font-bold text-ink truncate">{value}</p>
      </div>
    </div>
  )
  return href ? (
    <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">
      {content}
    </a>
  ) : (
    content
  )
}
