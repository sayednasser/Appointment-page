import { useState } from 'react'
import { Plus, Stethoscope } from 'lucide-react'
import { useDoctors } from '../hooks/useDoctors'
import { useToast } from '../components/ui/ToastProvider'
import DoctorsTable from '../components/doctors/DoctorsTable'
import DoctorModal from '../components/doctors/DoctorModal'
import ConfirmDialog from '../components/ui/ConfirmDialog'
import EmptyState from '../components/ui/EmptyState'
import { TableSkeleton } from '../components/ui/Skeleton'

export default function Doctors() {
  const { doctors, loading, addDoctor, editDoctor, removeDoctor } = useDoctors()
  const { showToast } = useToast()

  const [modalOpen, setModalOpen] = useState(false)
  const [activeDoctor, setActiveDoctor] = useState(null)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [deleting, setDeleting] = useState(false)

  const openAdd = () => {
    setActiveDoctor(null)
    setModalOpen(true)
  }

  const openEdit = (doctor) => {
    setActiveDoctor(doctor)
    setModalOpen(true)
  }

  const handleSubmit = async (payload) => {
    try {
      if (activeDoctor) {
        await editDoctor(activeDoctor.id, payload)
        showToast('تم تحديث بيانات الدكتور بنجاح')
      } else {
        await addDoctor(payload)
        showToast('تمت إضافة الدكتور بنجاح')
      }
    } catch {
      showToast('حدث خطأ، حاول مرة أخرى', 'error')
    }
  }

  const confirmDelete = async () => {
    if (!deleteTarget) return
    setDeleting(true)
    try {
      await removeDoctor(deleteTarget.id)
      showToast('تم حذف الدكتور')
      setDeleteTarget(null)
    } catch {
      showToast('تعذر حذف الدكتور', 'error')
    } finally {
      setDeleting(false)
    }
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-ink-soft">{doctors.length} دكتور مسجّل</p>
        <button onClick={openAdd} className="admin-btn-primary">
          <Plus size={18} />
          إضافة دكتور
        </button>
      </div>

      <div className="admin-card">
        {loading ? (
          <TableSkeleton rows={4} cols={6} />
        ) : doctors.length === 0 ? (
          <EmptyState
            icon={Stethoscope}
            title="لا يوجد أطباء بعد"
            description="ابدأ بإضافة أول دكتور في عيادتك."
            action={
              <button onClick={openAdd} className="admin-btn-primary">
                <Plus size={16} />
                إضافة دكتور
              </button>
            }
          />
        ) : (
          <DoctorsTable doctors={doctors} onEdit={openEdit} onDelete={setDeleteTarget} />
        )}
      </div>

      <DoctorModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
        doctor={activeDoctor}
      />

      <ConfirmDialog
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={confirmDelete}
        loading={deleting}
        message={`هل أنت متأكد من حذف ${deleteTarget?.name || 'هذا الدكتور'}؟`}
      />
    </div>
  )
}
