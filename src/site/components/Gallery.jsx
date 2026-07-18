import Reveal from './Reveal'
import BeforeAfterSlider from './BeforeAfterSlider'
import { useGalleryCases } from '../hooks/useGalleryCases'
import { useLang } from '../i18n/LanguageContext'

export default function Gallery() {
  const { cases, loading } = useGalleryCases()
  const { t } = useLang()

  return (
    <section id="gallery" className="overflow-hidden bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-5 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">{t.gallery.eyebrow}</span>
          <h2 className="section-heading mt-4">{t.gallery.heading}</h2>
          <p className="mt-4 text-ink-soft">{t.gallery.desc}</p>
        </Reveal>

        {loading ? (
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="card overflow-hidden p-3">
                <div className="aspect-[4/3] animate-pulse rounded-xl bg-slate-200" />
              </div>
            ))}
          </div>
        ) : cases.length === 0 ? (
          <p className="mt-12 text-center text-ink-soft">{t.gallery.empty}</p>
        ) : (
          <>
            {/* Mobile: horizontal snap carousel */}
            <div className="gallery-mobile-scroll mt-12 -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 sm:hidden">
              {cases.map((item) => (
                <div key={item.id} className="w-[min(85vw,320px)] flex-shrink-0 snap-center">
                  <GalleryCard item={item} />
                </div>
              ))}
            </div>

            {/* Tablet / desktop grid */}
            <div className="mt-12 hidden gap-8 sm:grid sm:grid-cols-2 lg:grid-cols-3">
              {cases.map((item, i) => (
                <Reveal key={item.id} delay={0.06 * i}>
                  <GalleryCard item={item} />
                </Reveal>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  )
}

function GalleryCard({ item }) {
  return (
    <div className="card overflow-hidden p-3">
      <BeforeAfterSlider before={item.before} after={item.after} alt={item.title} />
      <div className="p-3">
        <h3 className="font-extrabold text-ink">{item.title}</h3>
        <p className="mt-1 text-sm leading-relaxed text-ink-soft">{item.description}</p>
      </div>
    </div>
  )
}
