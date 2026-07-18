import { useState } from 'react'
import { Plus, Tag } from 'lucide-react'
import { useOffers } from '../hooks/useOffers'
import { useToast } from '../components/ui/ToastProvider'
import OfferModal from '../components/offers/OfferModal'
import OffersTable from '../components/offers/OffersTable'
import ConfirmDialog from '../components/ui/ConfirmDialog'
import EmptyState from '../components/ui/EmptyState'
import { TableSkeleton } from '../components/ui/Skeleton'

export default function Offers() {
  const { offers, loading, addOffer, editOffer, removeOffer, toggleVisibility } = useOffers()
  const { showToast } = useToast()

  const [modalOpen, setModalOpen] = useState(false)
  const [activeOffer, setActiveOffer] = useState(null)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [deleting, setDeleting] = useState(false)

  const openAdd = () => {
    setActiveOffer(null)
    setModalOpen(true)
  }

  const openEdit = (offer) => {
    setActiveOffer(offer)
    setModalOpen(true)
  }

  const handleSubmit = async (payload) => {
    try {
      if (activeOffer) {
        await editOffer(activeOffer.id, payload)
        showToast('تم تحديث العرض بنجاح')
      } else {
        await addOffer(payload)
        showToast('تمت إضافة العرض بنجاح')
      }
    } catch {
      showToast('حدث خطأ، حاول مرة أخرى', 'error')
    }
  }

  const handleToggle = async (offer) => {
    try {
      await toggleVisibility(offer)
      showToast(offer.status === 'active' ? 'تم إخفاء العرض' : 'تم إظهار العرض')
    } catch {
      showToast('تعذر تحديث حالة العرض', 'error')
    }
  }

  const confirmDelete = async () => {
    if (!deleteTarget) return
    setDeleting(true)
    try {
      await removeOffer(deleteTarget.id)
      showToast('تم حذف العرض')
      setDeleteTarget(null)
    } catch {
      showToast('تعذر حذف العرض', 'error')
    } finally {
      setDeleting(false)
    }
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-ink-soft">{offers.length} عرض</p>
        <button onClick={openAdd} className="admin-btn-primary">
          <Plus size={18} />
          إضافة عرض جديد
        </button>
      </div>

      <div className="admin-card">
        {loading ? (
          <TableSkeleton rows={5} cols={6} />
        ) : offers.length === 0 ? (
          <EmptyState
            icon={Tag}
            title="لا توجد عروض بعد"
            description="أضف أول عرض ترويجي لعرضه في قسم العروض الحالية بالصفحة الرئيسية."
            action={
              <button onClick={openAdd} className="admin-btn-primary">
                <Plus size={16} />
                إضافة عرض جديد
              </button>
            }
          />
        ) : (
          <OffersTable offers={offers} onEdit={openEdit} onDelete={setDeleteTarget} onToggleVisibility={handleToggle} />
        )}
      </div>

      <OfferModal open={modalOpen} onClose={() => setModalOpen(false)} onSubmit={handleSubmit} offer={activeOffer} />

      <ConfirmDialog
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={confirmDelete}
        loading={deleting}
        message={`هل أنت متأكد من حذف عرض "${deleteTarget?.title || ''}"؟`}
      />
    </div>
  )
}
