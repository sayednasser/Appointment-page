# دنتافلو — المشروع الموحّد (Landing Page + Admin Panel)

هذا مشروع React واحد يجمع بين صفحة الهبوط العامة للعيادة ولوحة تحكم الأدمن، **مترابطين ببعض عبر طبقة بيانات مشتركة** — أي تعديل تعمله في لوحة التحكم (دكاترة، حالات قبل/بعد، تقييمات، إعدادات) يظهر فوراً في صفحة الهبوط العامة، وأي حجز يعمله زائر في الموقع يظهر فوراً في `/admin/appointments`.

## التشغيل

```bash
npm install
npm run dev
```

- الموقع العام: `http://localhost:5173/`
- لوحة التحكم: `http://localhost:5173/admin` (بدون تسجيل دخول — دخول مباشر)

## البناء للإنتاج

```bash
npm run build
npm run preview
```

**ملاحظة مهمة عند رفع المشروع على استضافة حقيقية:** بما أن المشروع SPA بمسارين (`/` و `/admin/*`) على نفس التطبيق، يجب إعداد الاستضافة لإعادة توجيه كل المسارات إلى `index.html` (SPA fallback / rewrite rule) حتى يعمل تحديث الصفحة على `/admin/doctors` مثلاً بدون خطأ 404. هذا إعداد قياسي وموجود جاهز في Vercel/Netlify (فقط فعّل "Single Page App" أو أضف ملف `_redirects`/`vercel.json` عند الحاجة).

## كيف يتم الربط بين الصفحتين؟

### 1. طبقة بيانات مشتركة (`src/shared/db.js`)

بما أنه لا يوجد باكند حقيقي بعد، تم إنشاء "قاعدة بيانات" خفيفة في المتصفح باستخدام `localStorage`، وهي **المصدر الوحيد للحقيقة** لكل من الموقع ولوحة التحكم:

```
src/shared/
  db.js              # القراءة/الكتابة لكل الموارد (دكاترة، حجوزات، حالات، تقييمات، إعدادات)
  seed/              # البيانات الابتدائية (أول مرة يفتح فيها المستخدم الموقع)
  scheduleUtils.js   # توليد مواعيد الحجز الفعلية من جدول عمل الدكتور
  delay.js
```

- لوحة التحكم (`src/admin/services/*.js`) تحاول أولاً الاتصال بباكند حقيقي عبر Axios، وإذا فشل (لأنه غير موجود بعد) تستخدم `db.js` تلقائياً.
- صفحة الهبوط (`src/site/hooks/*.js`) تقرأ من نفس `db.js` مباشرة.

**نتيجة عملية:** لما تضيف دكتور جديد من `/admin/doctors`، هيظهر فوراً في قسم "الأطباء" و"الحجز" بصفحة الهبوط. ولما تعتمد تقييم من `/admin/reviews`، هيظهر في قسم "آراء العملاء". ولما تغيّر بيانات العيادة من `/admin/settings` (اسم العيادة، رقم الهاتف/الواتساب، العنوان، نص الصفحة الرئيسية)، هتتغير في كل مكان بالموقع (الهيدر، الفوتر، قسم التواصل، زر الواتساب العائم).

### 2. حجز المواعيد مرتبط فعلياً بجدول عمل الدكتور

قسم "احجز موعدك" في الموقع العام لم يعد يستخدم بيانات وهمية منفصلة؛ هو يقرأ **جدول العمل الحقيقي** الذي حدده الأدمن لكل دكتور (الأيام، من-إلى، مدة الكشف) من `/admin/doctors`، ويستخدمه لتوليد المواعيد المتاحة تلقائياً. أي حجز يتم تأكيده من الزائر يُضاف كسجل حقيقي في `/admin/appointments` بنفس اللحظة.

> ملاحظة تبسيطية: نظام الأيام هنا مبني على "اسم اليوم" (مثل السبت) وليس تقويم كامل بمواعيد مختلفة كل أسبوع، فهو يحسب أقرب تاريخ فعلي مطابق لهذا اليوم تلقائياً. عند ربط باكند حقيقي، يفضّل تطوير هذا إلى نظام تقويم كامل.

### 3. ربط الملاحة (Navigation)

في أعلى لوحة التحكم يوجد زر **"عرض الموقع"** يفتح صفحة الهبوط العامة في تبويب جديد — ربط مباشر بين الواجهتين.

## هيكل المشروع

```
src/
  main.jsx                # BrowserRouter + ToastProvider
  App.jsx                 # كل الـ Routes: "/" وصفحات "/admin/*"

  site/                   # صفحة الهبوط العامة
    HomePage.jsx
    components/           # Navbar, Hero, Services, Gallery, Doctors, Booking, Testimonials, Contact, Footer...
    hooks/                 # useActiveDoctors, useGalleryCases, useApprovedReviews, useClinicSettings, useCreateAppointment
    data/services.js       # بيانات ثابتة (الخدمات ليست مُدارة من الأدمن)

  admin/                  # لوحة التحكم (بدون أي Authentication)
    api/axiosClient.js
    services/              # doctorsService, appointmentsService, gallery/reviews/settingsService (Axios + fallback لـ shared/db)
    hooks/                 # useDoctors, useAppointments, useGallery, useReviews, useSettings
    components/            # layout (Sidebar, Topbar, AdminLayout) + ui + doctors/appointments/gallery/reviews/settings
    pages/                  # Dashboard, Doctors, Appointments, Gallery, Reviews, Settings

  shared/                 # الطبقة المشتركة بين الاثنين
    db.js
    seed/
    scheduleUtils.js
    delay.js
```

## طبقة الربط بالـ API الحقيقي (لاحقاً)

كل دوال `src/admin/services/*.js` مبنية على الشكل التالي:

```js
export async function getDoctors() {
  try {
    const { data } = await apiClient.get('/doctors')
    return data
  } catch {
    return db.getDoctors() // fallback محلي
  }
}
```

لما يبقى عندك باكند حقيقي:
1. انسخ `.env.example` إلى `.env` وحط فيه `VITE_API_BASE_URL` الحقيقي.
2. مفيش أي تعديل تاني مطلوب — بمجرد ما الباكند يرد بنجاح، هيتم استخدام بياناته تلقائياً بدل `localStorage`.

نقاط الـ API الجاهزة:

```
GET/POST    /doctors        PATCH/DELETE /doctors/:id
GET         /appointments   PATCH        /appointments/:id
GET/POST    /gallery        PATCH/DELETE /gallery/:id
GET         /reviews        PATCH/DELETE /reviews/:id
GET/PATCH   /settings
```

## بدون تسجيل دخول

كما هو مطلوب: `/admin` وكل الصفحات تحته **بدون Login/Register**، دخول مباشر. عند إضافة صلاحيات حقيقية لاحقاً، ابدأ من `apiClient.interceptors.request` في `src/admin/api/axiosClient.js`.

## التقنيات المستخدمة

React 18 + Vite 5 + React Router 6 + Tailwind CSS 3 + Axios + Framer Motion + Lucide React، بدعم كامل RTL وخط Cairo، ومتجاوب بالكامل على كل الشاشات.
