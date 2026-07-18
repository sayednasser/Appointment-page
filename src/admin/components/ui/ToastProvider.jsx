import { createContext, useCallback, useContext, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle2, XCircle, Info, X } from 'lucide-react'

const ToastContext = createContext(null)

const ICONS = {
  success: CheckCircle2,
  error: XCircle,
  info: Info,
}

const STYLES = {
  success: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  error: 'bg-red-50 text-red-700 border-red-200',
  info: 'bg-primary-50 text-primary-700 border-primary-200',
}

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const showToast = useCallback(
    (message, type = 'success') => {
      const id = Date.now() + Math.random()
      setToasts((prev) => [...prev, { id, message, type }])
      setTimeout(() => removeToast(id), 3500)
    },
    [removeToast]
  )

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed bottom-5 left-5 z-[100] flex flex-col gap-2.5">
        <AnimatePresence>
          {toasts.map((toast) => {
            const Icon = ICONS[toast.type] || Info
            return (
              <motion.div
                key={toast.id}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, x: -40 }}
                className={`flex items-center gap-3 rounded-xl border px-4 py-3 shadow-floaty backdrop-blur ${STYLES[toast.type]}`}
              >
                <Icon size={18} />
                <p className="text-sm font-bold">{toast.message}</p>
                <button
                  onClick={() => removeToast(toast.id)}
                  className="mr-1 text-current/60 hover:text-current"
                  aria-label="إغلاق"
                >
                  <X size={14} />
                </button>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within ToastProvider')
  return ctx
}
