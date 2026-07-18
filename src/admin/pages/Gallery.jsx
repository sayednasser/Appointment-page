import { useState } from 'react'
import { Plus, Images } from 'lucide-react'
import { useGallery } from '../hooks/useGallery'
import { useToast } from '../components/ui/ToastProvider'
import GalleryCard from '../components/gallery/GalleryCard'
import GalleryModal from '../components/gallery/GalleryModal'
import ConfirmDialog from '../components/ui/ConfirmDialog'
import EmptyState from '../components/ui/EmptyState'
import { CardSkeleton } from '../components/ui/Skeleton'

export default function Gallery() {
  const { cases, loading, addCase, editCase, removeCase } = useGallery()
  const { showToast } = useToast()

  const [modalOpen, setModalOpen] = useState(false)
  const [activeCase, setActiveCase] = useState(null)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [deleting, setDeleting] = useState(false)

  const openAdd = () => {
    setActiveCase(null)
    setModalOpen(true)
  }

  const openEdit = (item) => {
    setActiveCase(item)
    setModalOpen(true)
  }

  const handleSubmit = async (payload) => {
    try {
      if (activeCase) {
        await editCase(activeCase.id, payload)
        showToast('تم تحديث الحالة بنجاح')
      } else {
        await addCase(payload)
        showToast('تمت إضافة الحالة بنجاح')
      }
    } catch {
      showToast('حدث خطأ، حاول مرة أخرى', 'error')
    }
  }

  const confirmDelete = async () => {
    if (!deleteTarget) return
    setDeleting(true)
    try {
      await removeCase(deleteTarget.id)
      showToast('تم حذف الحالة')
      setDeleteTarget(null)
    } catch {
      showToast('تعذر حذف الحالة', 'error')
    } finally {
      setDeleting(false)
    }
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-ink-soft">{cases.length} حالة معروضة</p>
        <button onClick={openAdd} className="admin-btn-primary">
          <Plus size={18} />
          إضافة حالة جديدة
        </button>
      </div>

      {loading ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      ) : cases.length === 0 ? (
        <div className="admin-card">
          <EmptyState
            icon={Images}
            title="لا توجد حالات بعد"
            description="أضف أول حالة قبل/بعد لعرضها في الصفحة الرئيسية."
            action={
              <button onClick={openAdd} className="admin-btn-primary">
                <Plus size={16} />
                إضافة حالة جديدة
              </button>
            }
          />
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {cases.map((item) => (
            <GalleryCard key={item.id} item={item} onEdit={openEdit} onDelete={setDeleteTarget} />
          ))}
        </div>
      )}

      <GalleryModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
        item={activeCase}
      />

      <ConfirmDialog
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={confirmDelete}
        loading={deleting}
        message={`هل أنت متأكد من حذف حالة "${deleteTarget?.title || ''}"؟`}
      />
    </div>
  )
}
