// Maps Arabic weekday names to JS Date.getDay() values (Sunday = 0).
const DAY_TO_INDEX = {
  الأحد: 0,
  الاحد: 0,
  Sunday: 0,

  الاثنين: 1,
  Monday: 1,

  الثلاثاء: 2,
  Tuesday: 2,

  الأربعاء: 3,
  الاربعاء: 3,
  Wednesday: 3,

  الخميس: 4,
  Thursday: 4,

  الجمعة: 5,
  Friday: 5,

  السبت: 6,
  Saturday: 6,
}

// Returns the ISO date (YYYY-MM-DD) of the next occurrence of the given
// Arabic weekday name, counting today if it matches.
export function getNextDateForDay(dayName) {
  const targetDow = DAY_TO_INDEX[dayName]

  if (targetDow === undefined) {
    console.log("Unknown day:", dayName)
    return null
  }

  const today = new Date()

  const diff = (targetDow - today.getDay() + 7) % 7

  const result = new Date(today)
  result.setDate(today.getDate() + diff)

  return result.toISOString().slice(0, 10)
}

function formatArabicTime(hour, minute) {
  const period = hour >= 12 ? 'م' : 'ص'
  const displayHour = hour % 12 === 0 ? 12 : hour % 12
  const paddedMinute = String(minute).padStart(2, '0')
  return `${String(displayHour).padStart(2, '0')}:${paddedMinute} ${period}`
}

// Generates appointment slot labels (e.g. "10:00 ص") between `from` and `to`
// ("HH:MM" 24h strings) spaced by `duration` minutes — driven directly by
// the working hours an admin sets for each doctor.
export function generateSlots(from, to, duration = 30) {
  if (!from || !to || !duration) return []
  const [fromH, fromM] = from.split(':').map(Number)
  const [toH, toM] = to.split(':').map(Number)

  const slots = []
  let cursor = fromH * 60 + fromM
  const end = toH * 60 + toM

  while (cursor + duration <= end) {
    const h = Math.floor(cursor / 60)
    const m = cursor % 60
    slots.push(formatArabicTime(h, m))
    cursor += duration
  }
  return slots
}
