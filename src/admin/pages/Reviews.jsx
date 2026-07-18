import { useState } from 'react'
import { MessageSquareOff } from 'lucide-react'
import { useReviews } from '../hooks/useReviews'
import { useToast } from '../components/ui/ToastProvider'
import ReviewsTable from '../components/reviews/ReviewsTable'
import ReviewEditModal from '../components/reviews/ReviewEditModal'
import ConfirmDialog from '../components/ui/ConfirmDialog'
import EmptyState from '../components/ui/EmptyState'
import { TableSkeleton } from '../components/ui/Skeleton'

export default function Reviews() {
  const { reviews, loading, setStatus, removeReview, editReview } = useReviews()
  const { showToast } = useToast()
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [deleting, setDeleting] = useState(false)
  const [editTarget, setEditTarget] = useState(null)

  const handleApprove = async (review) => {
    try {
      await setStatus(review.id, 'approved')
      showToast('تمت الموافقة على التقييم')
    } catch {
      showToast('حدث خطأ أثناء الموافقة', 'error')
    }
  }

  const handleReject = async (review) => {
    try {
      await setStatus(review.id, 'pending')
      showToast('تم رفض التقييم', 'info')
    } catch {
      showToast('حدث خطأ أثناء الرفض', 'error')
    }
  }

  const handleEditSubmit = async (payload) => {
    if (!editTarget) return
    try {
      await editReview(editTarget.id, payload)
      showToast('تم تحديث التقييم بنجاح')
      setEditTarget(null)
    } catch {
      showToast('حدث خطأ أثناء التعديل', 'error')
    }
  }

  const confirmDelete = async () => {
    if (!deleteTarget) return
    setDeleting(true)
    try {
      await removeReview(deleteTarget.id)
      showToast('تم حذف التقييم')
      setDeleteTarget(null)
    } catch {
      showToast('تعذر حذف التقييم', 'error')
    } finally {
      setDeleting(false)
    }
  }

  return (
    <div className="space-y-5">
      <div className="admin-card">
        {loading ? (
          <TableSkeleton rows={5} cols={5} />
        ) : reviews.length === 0 ? (
          <EmptyState
            icon={MessageSquareOff}
            title="لا توجد تقييمات بعد"
            description="ستظهر هنا تقييمات المرضى بمجرد إرسالها."
          />
        ) : (
          <ReviewsTable
            reviews={reviews}
            onApprove={handleApprove}
            onReject={handleReject}
            onDelete={setDeleteTarget}
            onEdit={setEditTarget}
          />
        )}
      </div>

      <ReviewEditModal
        open={!!editTarget}
        onClose={() => setEditTarget(null)}
        onSubmit={handleEditSubmit}
        review={editTarget}
      />

      <ConfirmDialog
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={confirmDelete}
        loading={deleting}
        message={`هل أنت متأكد من حذف تقييم ${deleteTarget?.patientName || ''}؟`}
      />
    </div>
  )
}
