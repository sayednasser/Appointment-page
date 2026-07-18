// Telegram-ready notification architecture.
//
// IMPORTANT: this file intentionally contains NO backend/bot logic. There is
// no Telegram Bot API call, no token, and no server here. Its only job is to
// give the rest of the frontend a single, stable interface to "notify
// Telegram" through, so that once the real backend (which will own the
// Telegram bot, chat IDs, and message templates) is connected, only the
// internals of `sendTelegramNotification` need to change — every call site
// in the app (booking form, review form, etc.) stays exactly the same.
//
// How this will work once the backend is live:
//   1. `sendTelegramNotification` will POST the event to a backend endpoint
//      (e.g. `${VITE_API_BASE_URL}/notifications/telegram`).
//   2. The backend will format the message and call the real Telegram Bot
//      API with its bot token and the clinic's chat/channel id.
//   3. Nothing in useCreateAppointment / useSubmitReview / admin services
//      needs to change — they already call the methods below.

/**
 * @typedef {'appointment_created'|'review_submitted'|'offer_published'} TelegramEventType
 */

/**
 * Sends a notification event through the Telegram-ready pipeline.
 * Currently a safe no-op (frontend-only placeholder): it never throws and
 * never blocks the caller, it just logs so the integration point is easy to
 * find. Swap the body for a real `apiClient.post(...)` call when the backend
 * Telegram endpoint exists — no other file will need to change.
 *
 * @param {TelegramEventType} type
 * @param {Record<string, unknown>} payload
 */
async function sendTelegramNotification(type, payload) {
  try {
    // Future implementation:
    // await apiClient.post('/notifications/telegram', { type, payload })
    if (import.meta.env?.DEV) {
      // eslint-disable-next-line no-console
      console.info(`[telegram-ready] ${type}`, payload)
    }
    return { queued: true, type }
  } catch {
    // Never let a notification failure break the user-facing flow.
    return { queued: false, type }
  }
}

export const telegramService = {
  /** Call after a new appointment is created on the public booking form. */
  notifyNewAppointment: (appointment) =>
    sendTelegramNotification('appointment_created', appointment),

  /** Call after a patient submits a new review from the public site. */
  notifyNewReview: (review) => sendTelegramNotification('review_submitted', review),

  /** Call after an admin publishes/activates a new offer. */
  notifyOfferPublished: (offer) => sendTelegramNotification('offer_published', offer),
}
