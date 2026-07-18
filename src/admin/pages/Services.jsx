import { useState } from 'react'
import { Plus, Sparkles } from 'lucide-react'
import { useServices } from '../hooks/useServices'
import { useToast } from '../components/ui/ToastProvider'
import ServiceModal from '../components/services/ServiceModal'
import ServicesTable from '../components/services/ServicesTable'
import ConfirmDialog from '../components/ui/ConfirmDialog'
import EmptyState from '../components/ui/EmptyState'
import { TableSkeleton } from '../components/ui/Skeleton'

export default function Services() {
  const { services, loading, addService, editService, removeService, toggleVisibility, moveService } =
    useServices()
  const { showToast } = useToast()

  const [modalOpen, setModalOpen] = useState(false)
  const [activeService, setActiveService] = useState(null)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [deleting, setDeleting] = useState(false)

  const openAdd = () => {
    setActiveService(null)
    setModalOpen(true)
  }

  const openEdit = (service) => {
    setActiveService(service)
    setModalOpen(true)
  }

  const handleSubmit = async (payload) => {
    try {
      if (activeService) {
        await editService(activeService.id, payload)
        showToast('تم تحديث الخدمة بنجاح')
      } else {
        await addService(payload)
        showToast('تمت إضافة الخدمة بنجاح')
      }
    } catch {
      showToast('حدث خطأ، حاول مرة أخرى', 'error')
    }
  }

  const handleToggle = async (service) => {
    try {
      await toggleVisibility(service)
      showToast(service.status === 'active' ? 'تم إخفاء الخدمة' : 'تم إظهار الخدمة')
    } catch {
      showToast('تعذر تحديث حالة الخدمة', 'error')
    }
  }

  const confirmDelete = async () => {
    if (!deleteTarget) return
    setDeleting(true)
    try {
      await removeService(deleteTarget.id)
      showToast('تم حذف الخدمة')
      setDeleteTarget(null)
    } catch {
      showToast('تعذر حذف الخدمة', 'error')
    } finally {
      setDeleting(false)
    }
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-ink-soft">{services.length} خدمة</p>
        <button onClick={openAdd} className="admin-btn-primary">
          <Plus size={18} />
          إضافة خدمة جديدة
        </button>
      </div>

      <div className="admin-card">
        {loading ? (
          <TableSkeleton rows={5} cols={5} />
        ) : services.length === 0 ? (
          <EmptyState
            icon={Sparkles}
            title="لا توجد خدمات بعد"
            description="أضف أول خدمة لعرضها في قسم الخدمات بالصفحة الرئيسية."
            action={
              <button onClick={openAdd} className="admin-btn-primary">
                <Plus size={16} />
                إضافة خدمة جديدة
              </button>
            }
          />
        ) : (
          <ServicesTable
            services={services}
            onEdit={openEdit}
            onDelete={setDeleteTarget}
            onToggleVisibility={handleToggle}
            onMove={moveService}
          />
        )}
      </div>

      <ServiceModal open={modalOpen} onClose={() => setModalOpen(false)} onSubmit={handleSubmit} service={activeService} />

      <ConfirmDialog
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={confirmDelete}
        loading={deleting}
        message={`هل أنت متأكد من حذف خدمة "${deleteTarget?.name || ''}"؟`}
      />
    </div>
  )
}
