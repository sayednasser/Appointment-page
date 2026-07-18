// Seed data for the new Offers Management feature (Admin > Offers).
// Shown on the landing page's "العروض الحالية" (Current Offers) section.
export const seedOffers = [
  {
    id: 1,
    title: 'عرض تبييض الأسنان',
    description: 'جلسة تبييض احترافية بأحدث تقنيات الليزر لابتسامة أكثر إشراقاً.',
    image:
      'https://images.pexels.com/photos/6528902/pexels-photo-6528902.jpeg?auto=compress&cs=tinysrgb&w=700&h=460&fit=crop',
    oldPrice: 1500,
    newPrice: 999,
    discountPercentage: 33,
    startDate: '2026-06-01',
    endDate: '2026-08-31',
    status: 'active',
  },
  {
    id: 2,
    title: 'باقة الفحص والتنظيف الشامل',
    description: 'فحص كامل + تنظيف بالموجات فوق الصوتية + استشارة مجانية مع الطبيب.',
    image:
      'https://images.pexels.com/photos/3845810/pexels-photo-3845810.jpeg?auto=compress&cs=tinysrgb&w=700&h=460&fit=crop',
    oldPrice: 800,
    newPrice: 500,
    discountPercentage: 37,
    startDate: '2026-07-01',
    endDate: '2026-09-30',
    status: 'active',
  },
]
