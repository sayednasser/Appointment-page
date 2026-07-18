// Seed data for the dynamic Services Management feature (Admin > Services).
// This replaces the previously static src/site/data/services.js list — same
// content, now with `order`, `status`, and an `image` so it can be managed
// from the admin dashboard while keeping the exact same landing-page design.
export const seedServices = [
  {
    id: 1,
    icon: 'Sparkles',
    name: 'تنظيف الأسنان',
    description: 'تنظيف عميق يزيل الجير والبقع ويمنحك ابتسامة نظيفة ومنعشة.',
    image:
      'https://images.pexels.com/photos/3845810/pexels-photo-3845810.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
    order: 1,
    status: 'active',
  },
  {
    id: 2,
    icon: 'Syringe',
    name: 'حشو الأسنان',
    description: 'حشوات تجميلية متينة بلون طبيعي مطابق لأسنانك الأصلية.',
    image:
      'https://images.pexels.com/photos/6528900/pexels-photo-6528900.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
    order: 2,
    status: 'active',
  },
  {
    id: 3,
    icon: 'Activity',
    name: 'علاج العصب',
    description: 'علاج دقيق وغير مؤلم لإنقاذ السن وتسكين الألم نهائياً.',
    image:
      'https://images.pexels.com/photos/3845625/pexels-photo-3845625.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
    order: 3,
    status: 'active',
  },
  {
    id: 4,
    icon: 'AlignCenter',
    name: 'تقويم الأسنان',
    description: 'تقويم معدني أو شفاف لتحسين اصطفاف الأسنان والابتسامة.',
    image:
      'https://images.pexels.com/photos/3845810/pexels-photo-3845810.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
    order: 4,
    status: 'active',
  },
  {
    id: 5,
    icon: 'Anchor',
    name: 'زراعة الأسنان',
    description: 'زراعة أسنان بأحدث التقنيات لثبات دائم ومظهر طبيعي.',
    image:
      'https://images.pexels.com/photos/6627369/pexels-photo-6627369.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
    order: 5,
    status: 'active',
  },
  {
    id: 6,
    icon: 'Sun',
    name: 'تبييض الأسنان',
    description: 'تبييض آمن وفعال يمنحك ابتسامة أكثر إشراقاً خلال جلسة واحدة.',
    image:
      'https://images.pexels.com/photos/6528902/pexels-photo-6528902.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
    order: 6,
    status: 'active',
  },
]
