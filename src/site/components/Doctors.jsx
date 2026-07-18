import { GraduationCap, CalendarClock } from 'lucide-react'
import Reveal from './Reveal'
import { useActiveDoctors } from '../hooks/useActiveDoctors'
import { useLang } from '../i18n/LanguageContext'

export default function Doctors() {
  const { doctors, loading } = useActiveDoctors()
  const { t } = useLang()

  return (
    <section id="doctors" className="bg-slate-50 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-5 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">{t.doctors.eyebrow}</span>
          <h2 className="section-heading mt-4">{t.doctors.heading}</h2>
          <p className="mt-4 text-ink-soft">{t.doctors.desc}</p>
        </Reveal>

        {loading ? (
          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="card w-full overflow-hidden">
                <div className="aspect-[4/5] animate-pulse bg-slate-200" />
                <div className="space-y-2 p-6">
                  <div className="h-4 w-2/3 animate-pulse rounded bg-slate-200" />
                  <div className="h-3 w-1/2 animate-pulse rounded bg-slate-200" />
                </div>
              </div>
            ))}
          </div>
        ) : doctors.length === 0 ? (
          <p className="mt-14 text-center text-ink-soft">{t.doctors.empty}</p>
        ) : (
          <div
            className={`mt-14 ${doctors.length === 1
              ? 'flex justify-center'
              : 'grid gap-8 sm:grid-cols-2 lg:grid-cols-3 justify-items-center'
              }`}
          >            {doctors.map((doctor, i) => (
            <Reveal
              key={doctor.id}
              delay={0.1 * i}
              className={`card group overflow-hidden hover:-translate-y-1.5 hover:shadow-floaty ${doctors.length === 1 ? 'w-full max-w-md' : 'w-full max-w-sm'
                }`}
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <img
                  src={
                    doctor.image?.secure_url ||
                    doctor.image ||
                    'https://via.placeholder.com/500x600'
                  }
                  alt={doctor.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-ink/60 to-transparent" />

                <span className="absolute bottom-4 right-4 rounded-full bg-white/95 px-3 py-1 text-xs font-bold text-primary-700">
                  {doctor.experience}{t.doctors.yearsExp}
                </span>
              </div>

              <div className="p-5 sm:p-6">
                <h3 className="text-xl font-extrabold text-ink">{doctor.name}</h3>

                <p className="mt-1 flex items-center gap-1.5 text-sm font-semibold text-primary-600">
                  <GraduationCap size={16} />
                  {doctor.specialty}
                </p>

                <p className="mt-3 text-sm leading-relaxed text-ink-soft">{doctor.bio}</p>

                <a
                  href="#booking"
                  className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-primary-600 transition-colors hover:text-primary-700"
                >
                  <CalendarClock size={16} />
                  {t.doctors.viewSlots}
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
