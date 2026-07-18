import { useState } from 'react'
import { Star, Quote, MessageSquarePlus } from 'lucide-react'
import Reveal from './Reveal'
import AddReviewModal from './AddReviewModal'
import { useApprovedReviews } from '../hooks/useApprovedReviews'
import { useLang } from '../i18n/LanguageContext'

export default function Testimonials() {
  const { reviews, loading } = useApprovedReviews()
  const { t } = useLang()
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <section className="overflow-hidden bg-slate-50 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-5 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">{t.testimonials.eyebrow}</span>
          <h2 className="section-heading mt-4">{t.testimonials.heading}</h2>
          <button
            onClick={() => setModalOpen(true)}
            className="btn-outline mx-auto mt-6 !px-6 !py-2.5 text-sm"
          >
            <MessageSquarePlus size={16} />
            {t.testimonials.addReview}
          </button>
        </Reveal>

        {loading ? (
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="card space-y-3 p-7">
                <div className="h-4 w-24 animate-pulse rounded bg-slate-200" />
                <div className="h-3 w-full animate-pulse rounded bg-slate-200" />
                <div className="h-3 w-2/3 animate-pulse rounded bg-slate-200" />
              </div>
            ))}
          </div>
        ) : reviews.length === 0 ? (
          <p className="mt-14 text-center text-ink-soft">{t.testimonials.empty}</p>
        ) : (
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {reviews.map((review, i) => (
              <Reveal
                key={review.id}
                delay={0.06 * i}
                className="card relative p-6 sm:p-7 hover:-translate-y-1 hover:shadow-floaty"
              >
                <Quote className="absolute left-6 top-6 text-primary-100" size={38} />
                <div className="flex gap-1 text-amber-400">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <Star
                      key={idx}
                      size={16}
                      className={idx < review.rating ? 'fill-amber-400' : 'fill-slate-200 text-slate-200'}
                    />
                  ))}
                </div>
                <p className="relative z-10 mt-4 leading-loose text-ink-soft">{review.comment}</p>
                <p className="mt-5 font-extrabold text-ink">{review.patientName}</p>
              </Reveal>
            ))}
          </div>
        )}
      </div>

      <AddReviewModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </section>
  )
}
