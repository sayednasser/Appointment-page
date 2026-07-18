import * as Icons from 'lucide-react'
import Reveal from './Reveal'
import SmileDivider from './SmileDivider'
import { useActiveServices } from '../hooks/useActiveServices'
import { useLang } from '../i18n/LanguageContext'

export default function Services() {
  const { services, loading } = useActiveServices()
  const { t } = useLang()

  return (
    <section id="services" className="relative bg-slate-50 py-16 sm:py-20 lg:py-24">
      <SmileDivider flip color="#ffffff" />
      <div className="mx-auto max-w-7xl px-4 sm:px-5 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">{t.services.eyebrow}</span>
          <h2 className="section-heading mt-4">{t.services.heading}</h2>
          <p className="mt-4 text-ink-soft">{t.services.desc}</p>
        </Reveal>

        {loading ? (
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="card space-y-4 p-8">
                <div className="h-14 w-14 animate-pulse rounded-2xl bg-slate-200" />
                <div className="h-4 w-2/3 animate-pulse rounded bg-slate-200" />
                <div className="h-3 w-full animate-pulse rounded bg-slate-200" />
              </div>
            ))}
          </div>
        ) : services.length === 0 ? (
          <p className="mt-14 text-center text-ink-soft">{t.services.empty}</p>
        ) : (
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, i) => {
              const Icon = Icons[service.icon] || Icons.Sparkles
              return (
                <Reveal
                  key={service.id}
                  delay={0.08 * i}
                  className="card group relative overflow-hidden p-6 sm:p-8 hover:-translate-y-1.5 hover:shadow-floaty"
                >
                  <div className="absolute -left-8 -top-8 h-24 w-24 rounded-full bg-primary-50 transition-transform duration-500 group-hover:scale-150" />
                  <span className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-500 text-white shadow-card transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-105">
                    <Icon size={26} />
                  </span>
                  <h3 className="relative mt-6 text-xl font-extrabold text-ink">
                    {service.name}
                  </h3>
                  <p className="relative mt-3 leading-loose text-ink-soft">
                    {service.description}
                  </p>
                </Reveal>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
