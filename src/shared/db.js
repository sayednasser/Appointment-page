// This is the single source of truth shared between the public landing page
// and the admin panel. There is no backend yet, so it persists everything in
// the browser's localStorage — meaning changes made in /admin (doctors,
// gallery cases, reviews, settings, appointments) are immediately reflected
// on the public site, and bookings made on the public site immediately show
// up in /admin/appointments. Everything here is written so that swapping it
// for real HTTP calls later (see src/admin/services/*.js) requires no changes
// anywhere else in the app.

import { seedDoctors } from './seed/doctors'
import { seedAppointments } from './seed/appointments'
import { seedGallery } from './seed/gallery'
import { seedReviews } from './seed/reviews'
import { seedSettings } from './seed/settings'
import { seedServices } from './seed/services'
import { seedOffers } from './seed/offers'

const KEYS = {
  doctors: 'dentaflow.doctors',
  appointments: 'dentaflow.appointments',
  gallery: 'dentaflow.gallery',
  reviews: 'dentaflow.reviews',
  settings: 'dentaflow.settings',
  services: 'dentaflow.services',
  offers: 'dentaflow.offers',
}

function readCollection(key, seed) {
  try {
    const raw = localStorage.getItem(key)
    if (raw) return JSON.parse(raw)
  } catch {
    // ignore corrupt data and fall back to seed
  }
  writeCollection(key, seed)
  return seed
}

function writeCollection(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // localStorage unavailable (e.g. private mode) — data just won't persist
  }
}

function nextId(list) {
  return list.length ? Math.max(...list.map((item) => item.id)) + 1 : 1
}

export const db = {
  // Doctors
  getDoctors: () => readCollection(KEYS.doctors, seedDoctors),
  addDoctor: (payload) => {
    const list = readCollection(KEYS.doctors, seedDoctors)
    const doctor = { id: nextId(list), status: 'active', schedule: [], ...payload }
    const next = [...list, doctor]
    writeCollection(KEYS.doctors, next)
    return doctor
  },
  updateDoctor: (id, payload) => {
    const list = readCollection(KEYS.doctors, seedDoctors)
    const next = list.map((d) => (d.id === id ? { ...d, ...payload } : d))
    writeCollection(KEYS.doctors, next)
    return next.find((d) => d.id === id)
  },
  deleteDoctor: (id) => {
    const list = readCollection(KEYS.doctors, seedDoctors)
    writeCollection(KEYS.doctors, list.filter((d) => d.id !== id))
  },

  // Appointments
  getAppointments: () => readCollection(KEYS.appointments, seedAppointments),
  addAppointment: (payload) => {
    const list = readCollection(KEYS.appointments, seedAppointments)
    const appointment = { id: nextId(list), status: 'pending', ...payload }
    writeCollection(KEYS.appointments, [appointment, ...list])
    return appointment
  },
  updateAppointmentStatus: (id, status) => {
    const list = readCollection(KEYS.appointments, seedAppointments)
    const next = list.map((a) => (a.id === id ? { ...a, status } : a))
    writeCollection(KEYS.appointments, next)
    return next.find((a) => a.id === id)
  },

  // Gallery (before/after cases)
  getGallery: () => readCollection(KEYS.gallery, seedGallery),
  addGalleryCase: (payload) => {
    const list = readCollection(KEYS.gallery, seedGallery)
    const item = { id: nextId(list), ...payload }
    writeCollection(KEYS.gallery, [...list, item])
    return item
  },
  updateGalleryCase: (id, payload) => {
    const list = readCollection(KEYS.gallery, seedGallery)
    const next = list.map((g) => (g.id === id ? { ...g, ...payload } : g))
    writeCollection(KEYS.gallery, next)
    return next.find((g) => g.id === id)
  },
  deleteGalleryCase: (id) => {
    const list = readCollection(KEYS.gallery, seedGallery)
    writeCollection(KEYS.gallery, list.filter((g) => g.id !== id))
  },

  // Reviews
  getReviews: () => readCollection(KEYS.reviews, seedReviews),
  addReview: (payload) => {
    const list = readCollection(KEYS.reviews, seedReviews)
    const review = { id: nextId(list), status: 'pending', ...payload }
    writeCollection(KEYS.reviews, [review, ...list])
    return review
  },
  updateReviewStatus: (id, status) => {
    const list = readCollection(KEYS.reviews, seedReviews)
    const next = list.map((r) => (r.id === id ? { ...r, status } : r))
    writeCollection(KEYS.reviews, next)
    return next.find((r) => r.id === id)
  },
  updateReview: (id, payload) => {
    const list = readCollection(KEYS.reviews, seedReviews)
    const next = list.map((r) => (r.id === id ? { ...r, ...payload } : r))
    writeCollection(KEYS.reviews, next)
    return next.find((r) => r.id === id)
  },
  deleteReview: (id) => {
    const list = readCollection(KEYS.reviews, seedReviews)
    writeCollection(KEYS.reviews, list.filter((r) => r.id !== id))
  },

  // Services (landing page "خدماتنا" section, managed from admin)
  getServices: () => readCollection(KEYS.services, seedServices),
  addService: (payload) => {
    const list = readCollection(KEYS.services, seedServices)
    const service = {
      id: nextId(list),
      status: 'active',
      order: list.length ? Math.max(...list.map((s) => s.order ?? 0)) + 1 : 1,
      ...payload,
    }
    writeCollection(KEYS.services, [...list, service])
    return service
  },
  updateService: (id, payload) => {
    const list = readCollection(KEYS.services, seedServices)
    const next = list.map((s) => (s.id === id ? { ...s, ...payload } : s))
    writeCollection(KEYS.services, next)
    return next.find((s) => s.id === id)
  },
  deleteService: (id) => {
    const list = readCollection(KEYS.services, seedServices)
    writeCollection(KEYS.services, list.filter((s) => s.id !== id))
  },
  reorderServices: (orderedIds) => {
    const list = readCollection(KEYS.services, seedServices)
    const next = list.map((s) => {
      const order = orderedIds.indexOf(s.id)
      return order === -1 ? s : { ...s, order: order + 1 }
    })
    writeCollection(KEYS.services, next)
    return next
  },

  // Offers (limited-time promotions shown on the landing page)
  getOffers: () => readCollection(KEYS.offers, seedOffers),
  addOffer: (payload) => {
    const list = readCollection(KEYS.offers, seedOffers)
    const offer = { id: nextId(list), status: 'active', ...payload }
    writeCollection(KEYS.offers, [...list, offer])
    return offer
  },
  updateOffer: (id, payload) => {
    const list = readCollection(KEYS.offers, seedOffers)
    const next = list.map((o) => (o.id === id ? { ...o, ...payload } : o))
    writeCollection(KEYS.offers, next)
    return next.find((o) => o.id === id)
  },
  deleteOffer: (id) => {
    const list = readCollection(KEYS.offers, seedOffers)
    writeCollection(KEYS.offers, list.filter((o) => o.id !== id))
  },

  // Settings (single object, not a list)
  getSettings: () => readCollection(KEYS.settings, seedSettings),
  updateSettings: (payload) => {
    const current = readCollection(KEYS.settings, seedSettings)
    const next = { ...current, ...payload }
    writeCollection(KEYS.settings, next)
    return next
  },
}
