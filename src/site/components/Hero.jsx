import { motion } from 'framer-motion'
import { MessageCircle, CalendarCheck, Users, Award, Star } from 'lucide-react'
import Reveal from './Reveal'
import { useClinicSettings } from '../hooks/useClinicSettings'
import { useLang } from '../i18n/LanguageContext'

export default function Hero() {
  const settings = useClinicSettings()
  const { t } = useLang()
  const whatsappNumber = settings?.whatsapp?.replace(/[^0-9]/g, '') || '201234567890'

  const stats = t.stats.map((s, i) => {
    const icons = [Users, Award, Star]
    return { ...s, icon: icons[i] }
  })

  return (
    <section
      id="home"
      className="relative overflow-hidden bg-arc-glow pb-20 pt-28 sm:pb-28 sm:pt-36 md:pt-40"
    >
      <div className="absolute inset-0 -z-10 bg-dot-grid bg-dot-sm opacity-60 [mask-image:radial-gradient(ellipse_at_top,black_15%,transparent_70%)]" />

      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-5 lg:grid-cols-2 lg:gap-8 lg:px-8">
        <Reveal className="order-2 lg:order-1">
          <span className="eyebrow">
            <Star size={14} className="fill-primary-500 text-primary-500" />
            {t.hero.badge}
          </span>
          <h1 className="mt-5 text-balance text-3xl font-extrabold leading-[1.25] text-ink sm:text-4xl md:text-5xl lg:text-6xl">
            {settings?.heroTitle || t.hero.defaultTitle}
          </h1>
          <p className="mt-5 max-w-lg text-base sm:text-lg leading-loose text-ink-soft">
            {settings?.heroDescription || t.hero.defaultDesc}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
            <a href="#booking" className="btn-primary">
              <CalendarCheck size={19} />
              {t.hero.bookNow}
            </a>
            <a
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noreferrer"
              className="btn-whatsapp"
            >
              <MessageCircle size={19} />
              {t.hero.whatsapp}
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.15} className="relative order-1 lg:order-2">
          <div className="relative mx-auto max-w-xs sm:max-w-sm md:max-w-md">
            <div className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-primary-100/60 blur-2xl" />
            <img
              src={
                settings?.heroImage ||
                'https://images.pexels.com/photos/35438269/pexels-photo-35438269.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop'
              }
              alt="dental clinic"
              className="aspect-[4/5] w-full rounded-[2.5rem] object-cover shadow-floaty"
            />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="absolute right-0 top-6 flex items-center gap-2 sm:gap-3 rounded-2xl bg-white/95 px-3 py-2 sm:px-4 sm:py-3 shadow-floaty backdrop-blur sm:-right-8"
            >
              <span className="flex h-8 w-8 sm:h-10 sm:w-10 flex-shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
                <Users size={18} />
              </span>
              <div>
                <p className="text-sm sm:text-base font-extrabold text-ink">+5000</p>
                <p className="text-xs text-ink-soft">{t.hero.patients}</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="absolute -bottom-5 left-0 flex items-center gap-2 sm:gap-3 rounded-2xl bg-white/95 px-3 py-2 sm:px-4 sm:py-3 shadow-floaty backdrop-blur sm:-left-8"
            >
              <span className="flex h-8 w-8 sm:h-10 sm:w-10 flex-shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
                <Star size={18} className="fill-primary-500 text-primary-500" />
              </span>
              <div>
                <p className="text-sm sm:text-base font-extrabold text-ink">4.9 / 5</p>
                <p className="text-xs text-ink-soft">{t.hero.rating}</p>
              </div>
            </motion.div>
          </div>
        </Reveal>
      </div>

      <div className="mx-auto mt-16 sm:mt-20 grid max-w-4xl grid-cols-3 gap-2 sm:gap-4 px-3 sm:px-5 lg:px-8">
        {stats.map((stat, i) => (
          <Reveal key={stat.label} delay={0.1 * i} className="card flex flex-col items-center gap-1 sm:gap-2 py-3 sm:py-6 text-center px-1 sm:px-2">
            <stat.icon className="text-primary-500" size={18} />
            <p className="text-lg font-extrabold text-ink sm:text-2xl lg:text-3xl leading-tight">{stat.value}</p>
            <p className="text-[10px] sm:text-sm text-ink-soft leading-snug">{stat.label}</p>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
