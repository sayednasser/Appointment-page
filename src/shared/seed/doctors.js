export const seedDoctors = [
  {
    id: 1,
    name: 'د. أحمد محمد',
    specialty: 'استشاري تقويم الأسنان',
    experience: 12,
    bio: 'خبرة واسعة في حالات التقويم المعقدة وابتسامة هوليوود بأحدث الأنظمة الرقمية.',
    image: 'https://images.pexels.com/photos/7578806/pexels-photo-7578806.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
    status: 'active',
    schedule: [
      { day: 'السبت', from: '10:00', to: '18:00', slotDuration: 30 },
      { day: 'الاثنين', from: '10:00', to: '18:00', slotDuration: 30 },
      { day: 'الأربعاء', from: '10:00', to: '18:00', slotDuration: 30 },
    ],
  },
  {
    id: 2,
    name: 'د. محمد علي',
    specialty: 'أخصائي زراعة الأسنان',
    experience: 9,
    bio: 'متخصص في زراعة الأسنان الفورية والتركيبات الثابتة بأحدث التقنيات العالمية.',
    image: 'https://images.pexels.com/photos/6129500/pexels-photo-6129500.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
    status: 'active',
    schedule: [
      { day: 'الأحد', from: '11:00', to: '19:00', slotDuration: 30 },
      { day: 'الثلاثاء', from: '11:00', to: '19:00', slotDuration: 30 },
      { day: 'الخميس', from: '11:00', to: '19:00', slotDuration: 30 },
    ],
  },
  {
    id: 3,
    name: 'د. محمود خالد',
    specialty: 'أخصائي علاج العصب والتجميل',
    experience: 14,
    bio: 'خبير في علاج العصب بدون ألم وحلول التجميل الفموي المتقدمة.',
    image: 'https://images.pexels.com/photos/7108250/pexels-photo-7108250.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
    status: 'inactive',
    schedule: [
      { day: 'السبت', from: '09:00', to: '15:00', slotDuration: 45 },
      { day: 'الاثنين', from: '09:00', to: '15:00', slotDuration: 45 },
    ],
  },
]
