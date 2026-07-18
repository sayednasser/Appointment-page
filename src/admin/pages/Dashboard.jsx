import { useEffect, useState } from 'react'
import { Stethoscope, CalendarCheck, Star, Images, TrendingUp, Clock } from 'lucide-react'
import StatCard from '../components/ui/StatCard'
import { StatCardSkeleton } from '../components/ui/Skeleton'
import { getDoctors } from '../services/doctorsService'
import { getAppointments } from '../services/appointmentsService'
import { getReviews } from '../services/reviewsService'
import { getGalleryCases } from '../services/galleryService'

export default function Dashboard() {
  const [stats, setStats] = useState(null)
  const [recent, setRecent] = useState([])

  useEffect(() => {
    async function load() {
      try {
        const [doctors, appointments, reviews, gallery] = await Promise.all([
          getDoctors(),
          getAppointments(),
          getReviews(),
          getGalleryCases(),
        ])
        const aptList = Array.isArray(appointments) ? appointments : []
        setStats({
          doctors: Array.isArray(doctors) ? doctors.length : 0,
          appointments: aptList.length,
          reviews: Array.isArray(reviews) ? reviews.length : 0,
          gallery: Array.isArray(gallery) ? gallery.length : 0,
          pending: aptList.filter((a) => a.status === 'pending').length,
        })
        setRecent(aptList.slice(0, 5))
      } catch {
        setStats({ doctors: 0, appointments: 0, reviews: 0, gallery: 0, pending: 0 })
      }
    }
    load()
  }, [])

  return (
    <div className="space-y-6">
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {!stats ? (
          Array.from({ length: 4 }).map((_, i) => <StatCardSkeleton key={i} />)
        ) : (
          <>
            <StatCard icon={Stethoscope} label="عدد الدكاترة" value={stats.doctors} tint="primary" />
            <StatCard icon={CalendarCheck} label="عدد الحجوزات" value={stats.appointments} tint="emerald" delay={0.05} />
            <StatCard icon={Star} label="عدد التقييمات" value={stats.reviews} tint="amber" delay={0.1} />
            <StatCard icon={Images} label="عدد الحالات" value={stats.gallery} tint="violet" delay={0.15} />
          </>
        )}
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        <div className="admin-card p-5 lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-base font-extrabold text-ink">أحدث الحجوزات</h3>
            <span className="flex items-center gap-1.5 text-xs font-bold text-primary-600">
              <TrendingUp size={14} />
              آخر التحديثات
            </span>
          </div>
          <div className="space-y-3">
            {recent.length === 0 && (
              <p className="py-8 text-center text-sm text-ink-soft">لا توجد حجوزات حديثة</p>
            )}
            {recent.map((a) => (
              <div key={a.id} className="flex items-center justify-between rounded-xl bg-slate-50/70 px-4 py-3">
                <div>
                  <p className="text-sm font-bold text-ink">{a.patientName}</p>
                  <p className="text-xs text-ink-soft">{a.doctor}</p>
                </div>
                <div className="text-left text-xs text-ink-soft">
                  <p>{a.date}</p>
                  <p>{a.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="admin-card p-5">
          <h3 className="mb-4 text-base font-extrabold text-ink">تنبيهات سريعة</h3>
          <div className="flex items-start gap-3 rounded-xl bg-amber-50 p-4">
            <Clock className="mt-0.5 flex-shrink-0 text-amber-500" size={20} />
            <div>
              <p className="text-sm font-bold text-amber-700">
                {stats ? stats.pending : '—'} حجوزات قيد الانتظار
              </p>
              <p className="mt-1 text-xs text-amber-600/80">تحتاج إلى تأكيد أو إلغاء من صفحة الحجوزات.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
