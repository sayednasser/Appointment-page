import { AlertTriangle } from 'lucide-react'
import Modal from './Modal'

export default function ConfirmDialog({
  open,
  onClose,
  onConfirm,
  title = 'تأكيد الحذف',
  message = 'هل أنت متأكد من هذا الإجراء؟ لا يمكن التراجع عنه.',
  confirmLabel = 'حذف',
  loading = false,
}) {
  return (
    <Modal open={open} onClose={onClose} title={title} size="sm">
      <div className="flex flex-col items-center gap-4 py-2 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-red-500">
          <AlertTriangle size={26} />
        </span>
        <p className="text-sm leading-relaxed text-ink-soft">{message}</p>
        <div className="mt-2 flex w-full gap-3">
          <button onClick={onClose} className="admin-btn-outline flex-1">
            إلغاء
          </button>
          <button onClick={onConfirm} disabled={loading} className="admin-btn-danger flex-1 !bg-red-500 !text-white hover:!bg-red-600">
            {loading ? 'جارٍ الحذف...' : confirmLabel}
          </button>
        </div>
      </div>
    </Modal>
  )
}
