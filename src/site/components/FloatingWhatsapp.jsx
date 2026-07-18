import { MessageCircle } from 'lucide-react'
import { motion } from 'framer-motion'
import { useClinicSettings } from '../hooks/useClinicSettings'

export default function FloatingWhatsapp() {
  const settings = useClinicSettings()

  // تنظيف الرقم وتحويله لصيغة واتساب الصحيحة
  const rawPhone = settings?.whatsapp?.replace(/\D/g, '') || ''

  const whatsappDigits =
    rawPhone.startsWith('20')
      ? rawPhone
      : rawPhone.startsWith('0')
        ? `20${rawPhone.slice(1)}`
        : rawPhone

  return (
    <motion.a
      href={`https://wa.me/${whatsappDigits}`}
      target="_blank"
      rel="noreferrer"
      aria-label="تواصل عبر واتساب"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{
        delay: 1,
        type: 'spring',
        stiffness: 200,
        damping: 15,
      }}
      whileHover={{ scale: 1.08 }}
      className="fixed bottom-6 left-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-floaty"
    >
      <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-40" />
      <MessageCircle size={26} className="relative" />
    </motion.a>
  )
}