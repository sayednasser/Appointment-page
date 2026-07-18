import { Tag, BadgePercent, CalendarCheck } from 'lucide-react'
import Reveal from './Reveal'
import { useActiveOffers } from '../hooks/useActiveOffers'
import { useLang } from '../i18n/LanguageContext'

export default function Offers() {
  const { offers, loading } = useActiveOffers()
  const { t } = useLang()

  return (
    <section id="offers" className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-5 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">
            <Tag size={14} />
            {t.offers.eyebrow}
          </span>
          <h2 className="section-heading mt-4">{t.offers.heading}</h2>
          <p className="mt-4 text-ink-soft">{t.offers.desc}</p>
        </Reveal>

        {loading ? (
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="card overflow-hidden p-3">
                <div className="aspect-[4/3] animate-pulse rounded-xl bg-slate-200" />
                <div className="space-y-2 p-4">
                  <div className="h-4 w-2/3 animate-pulse rounded bg-slate-200" />
                  <div className="h-3 w-full animate-pulse rounded bg-slate-200" />
                </div>
              </div>
            ))}
          </div>
        ) : offers.length === 0 ? (
          <div className="mt-14 flex flex-col items-center justify-center gap-3 rounded-3xl border border-dashed border-slate-200 bg-slate-50 px-6 py-16 text-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-slate-400 shadow-card">
              <Tag size={28} />
            </span>
            <p className="text-base font-extrabold text-ink">{t.offers.emptyTitle}</p>
            <p className="max-w-xs text-sm text-ink-soft">{t.offers.emptyDesc}</p>
          </div>
        ) : (
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {offers.map((offer, i) => (
              <Reveal
                key={offer.id}
                delay={0.08 * i}
                className="card group flex flex-col overflow-hidden hover:-translate-y-1.5 hover:shadow-floaty"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={offer.image}
                    alt={offer.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-red-500 px-3 py-1 text-xs font-extrabold text-white shadow-md">
                    <BadgePercent size={13} />
                    {t.offers.discount} {offer.discountPercentage}%
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <h3 className="text-lg font-extrabold text-ink">{offer.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">
                    {offer.description}
                  </p>
                  <div className="mt-4 flex items-baseline gap-2">
                    <span className="text-2xl font-extrabold text-primary-600">
                      {offer.newPrice} {t.offers.currency}
                    </span>
                    <span className="text-sm text-ink-soft line-through">
                      {offer.oldPrice} {t.offers.currency}
                    </span>
                  </div>
                  <a href="#booking" className="btn-primary mt-5 w-full !py-3">
                    <CalendarCheck size={17} />
                    {t.offers.bookNow}
                  </a>
                </div>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
