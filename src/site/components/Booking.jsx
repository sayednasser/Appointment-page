import { useMemo, useRef, useState } from 'react'
import { CalendarCheck, CheckCircle2, AlertCircle, User, Phone, Stethoscope } from 'lucide-react'
import Reveal from './Reveal'
import { useActiveDoctors } from '../hooks/useActiveDoctors'
import { useCreateAppointment } from '../hooks/useCreateAppointment'
import { useBookedSlots } from '../hooks/useBookedSlots'
import { generateSlots, getNextDateForDay } from '../../shared/scheduleUtils'
import { useActiveServices } from '../hooks/useActiveServices'
import { useLang } from '../i18n/LanguageContext'

export default function Booking() {
  const { doctors, loading: doctorsLoading } = useActiveDoctors()
  const { services, loading: servicesLoading } = useActiveServices()
  const { createAppointment } = useCreateAppointment()
  const { t } = useLang()

  const [serviceId, setServiceId] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [doctorId, setDoctorId] = useState('')
  const [day, setDay] = useState('')
  const [slot, setSlot] = useState('')
  const [confirmed, setConfirmed] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [bookingError, setBookingError] = useState('')
  const submittingRef = useRef(false)

  const resolvedDate = day ? getNextDateForDay(day) : ''
  const { bookedSlots } = useBookedSlots(doctorId, resolvedDate)

  const selectedDoctor = useMemo(
    () => doctors.find((d) => String(d.id) === String(doctorId)),
    [doctors, doctorId]
  )

  const availableDays = selectedDoctor?.schedule?.map((s) => s.day) || []

  const daySchedule = useMemo(() => {
    if (!selectedDoctor || !day) return null
    return selectedDoctor.schedule.find((s) => s.day === day)
  }, [selectedDoctor, day])

  const slotsForDay = useMemo(() => {
    if (!daySchedule) return []
    return generateSlots(daySchedule.from, daySchedule.to, daySchedule.slotDuration)
  }, [daySchedule])

  const handleDoctorChange = (e) => {
    setDoctorId(e.target.value)
    setDay('')
    setSlot('')
    setConfirmed(false)
  }

  const handleDayChange = (chosenDay) => {
    setDay(chosenDay)
    setSlot('')
    setConfirmed(false)
  }

  const canConfirm =
    name.trim() &&
    phone.trim() &&
    selectedDoctor &&
    serviceId &&
    day &&
    slot

  const handleConfirm = async () => {
    if (!canConfirm || submittingRef.current) return
    submittingRef.current = true
    setBookingError('')
    setSubmitting(true)
    try {
      await createAppointment({
        patientName: name.trim(),
        phone: phone.trim(),
        doctor: selectedDoctor.id,
        service: serviceId,
        appointmentDate: resolvedDate,
        appointmentTime: convertTimeTo24(slot),
      })
      setConfirmed(true)
    } catch (err) {
      setBookingError(t.booking.errorGeneric)
    } finally {
      submittingRef.current = false
      setSubmitting(false)
    }
  }

  const resetForNewBooking = () => {
    setName('')
    setServiceId('')
    setPhone('')
    setDoctorId('')
    setDay('')
    setSlot('')
    setConfirmed(false)
    setBookingError('')
  }

  function convertTimeTo24(time) {
    if (!time) return ''
    const parts = time.split(' ')
    if (parts.length === 1) return time
    const [timePart, period] = parts
    let [hour, minute] = timePart.split(':').map(Number)
    if (period === 'م' && hour < 12) hour += 12
    if (period === 'ص' && hour === 12) hour = 0
    return `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`
  }

  return (
    <section id="booking" className="relative overflow-hidden bg-white py-16 sm:py-20 lg:py-24">
      <div className="absolute inset-x-0 top-0 -z-10 h-full bg-arc-glow" />
      <div className="mx-auto max-w-6xl px-4 sm:px-5 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">
            <CalendarCheck size={14} />
            {t.booking.eyebrow}
          </span>
          <h2 className="section-heading mt-4">{t.booking.heading}</h2>
          <p className="mt-4 text-ink-soft">{t.booking.desc}</p>
        </Reveal>

        <Reveal delay={0.1} className="mt-10 sm:mt-12 grid gap-6 lg:grid-cols-[1.3fr_1fr]">
          {/* Form */}
          <div className="card p-5 sm:p-8">
            <div className="grid gap-4 sm:gap-5 sm:grid-cols-2">
              <div className="sm:col-span-1">
                <label className="mb-2 flex items-center gap-2 text-sm font-bold text-ink">
                  <User size={16} className="text-primary-500" />
                  {t.booking.patientName}
                </label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  placeholder={t.booking.namePlaceholder}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition-colors focus:border-primary-400 focus:ring-2 focus:ring-primary-100"
                />
              </div>
              <div className="sm:col-span-1">
                <label className="mb-2 flex items-center gap-2 text-sm font-bold text-ink">
                  <Phone size={16} className="text-primary-500" />
                  {t.booking.phone}
                </label>
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  type="tel"
                  placeholder="01xxxxxxxxx"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition-colors focus:border-primary-400 focus:ring-2 focus:ring-primary-100"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="mb-2 flex items-center gap-2 text-sm font-bold text-ink">
                  <Stethoscope size={16} className="text-primary-500" />
                  {t.booking.selectDoctor}
                </label>
                <select
                  value={doctorId}
                  onChange={handleDoctorChange}
                  disabled={doctorsLoading}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-primary-400 focus:ring-2 focus:ring-primary-100"
                >
                  <option value="">
                    {doctorsLoading ? t.booking.loadingDoctors : t.booking.selectDoctorDefault}
                  </option>
                  {doctors.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.name} — {d.specialty}
                    </option>
                  ))}
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className="mb-2 flex items-center gap-2 text-sm font-bold text-ink">
                  {t.booking.selectService}
                </label>
                <select
                  value={serviceId}
                  onChange={(e) => setServiceId(e.target.value)}
                  disabled={servicesLoading}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none"
                >
                  <option value="">
                    {servicesLoading ? t.booking.loadingServices : t.booking.selectServiceDefault}
                  </option>
                  {services.map((service) => (
                    <option key={service.id} value={service.id}>
                      {service.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {selectedDoctor && (
              <div className="mt-6 animate-fadeUp">
                <p className="mb-3 text-sm font-bold text-ink">{t.booking.availableDays}</p>
                {availableDays.length === 0 ? (
                  <p className="text-sm text-ink-soft">{t.booking.noDays}</p>
                ) : (
                  <div className="flex flex-wrap gap-2 sm:gap-3">
                    {availableDays.map((d) => (
                      <button
                        key={d}
                        onClick={() => handleDayChange(d)}
                        className={`rounded-full border-2 px-4 sm:px-5 py-2 text-sm font-bold transition-all ${
                          day === d
                            ? 'border-primary-500 bg-primary-500 text-white shadow-card'
                            : 'border-slate-200 text-ink-soft hover:border-primary-300'
                        }`}
                      >
                        {t.booking.days[d] || d}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {day && (
              <div className="mt-6 animate-fadeUp">
                <p className="mb-3 text-sm font-bold text-ink">
                  {t.booking.availableSlots} ({resolvedDate})
                </p>
                {slotsForDay.length === 0 ? (
                  <p className="text-sm text-ink-soft">{t.booking.noSlots}</p>
                ) : (
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
                    {slotsForDay.map((time) => {
                      const isBooked = bookedSlots.includes(convertTimeTo24(time))
                      const isSelected = slot === time
                      return (
                        <button
                          key={time}
                          disabled={isBooked}
                          onClick={() => {
                            setSlot(time)
                            setConfirmed(false)
                          }}
                          className={`rounded-xl border-2 px-2 py-2.5 text-xs sm:text-sm font-bold transition-all ${
                            isBooked
                              ? 'cursor-not-allowed border-slate-100 bg-slate-50 text-slate-300 line-through'
                              : isSelected
                              ? 'border-primary-500 bg-primary-500 text-white shadow-card'
                              : 'border-slate-200 text-ink-soft hover:border-primary-300'
                          }`}
                        >
                          {time}
                        </button>
                      )
                    })}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Summary */}
          <div className="card flex flex-col justify-between p-5 sm:p-8">
            <div>
              <h3 className="text-lg font-extrabold text-ink">{t.booking.summary}</h3>
              <div className="mt-5 space-y-4">
                <SummaryRow label={t.booking.summaryName} value={name || '—'} />
                <SummaryRow label={t.booking.summaryDoctor} value={selectedDoctor?.name || '—'} />
                <SummaryRow
                  label={t.booking.summaryDay}
                  value={day ? `${t.booking.days[day] || day} (${resolvedDate})` : '—'}
                />
                <SummaryRow label={t.booking.summaryTime} value={slot || '—'} />
              </div>
            </div>

            {!confirmed ? (
              <div className="mt-8">
                {bookingError && (
                  <div className="mb-3 flex items-center gap-2 rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">
                    <AlertCircle size={16} className="flex-shrink-0" />
                    {bookingError}
                  </div>
                )}
                <button
                  onClick={handleConfirm}
                  disabled={!canConfirm || submitting}
                  aria-busy={submitting}
                  className={`btn-primary w-full ${
                    !canConfirm ? '!cursor-not-allowed !bg-slate-300 !shadow-none hover:!translate-y-0' : ''
                  }`}
                >
                  <CalendarCheck size={19} />
                  {submitting ? t.booking.confirming : t.booking.confirm}
                </button>
              </div>
            ) : (
              <div className="mt-8 animate-fadeUp rounded-2xl bg-primary-50 p-5 text-center">
                <CheckCircle2 className="mx-auto text-primary-500" size={32} />
                <p className="mt-2 font-extrabold text-primary-700">{t.booking.successTitle}</p>
                <p className="mt-1 text-sm text-ink-soft">{t.booking.successDesc}</p>
                <button
                  onClick={resetForNewBooking}
                  className="mt-4 text-sm font-bold text-primary-600 underline underline-offset-4"
                >
                  {t.booking.bookAnother}
                </button>
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function SummaryRow({ label, value }) {
  return (
    <div className="flex items-center justify-between border-b border-dashed border-slate-200 pb-3">
      <span className="text-sm text-ink-soft">{label}</span>
      <span className="text-sm font-bold text-ink">{value}</span>
    </div>
  )
}
