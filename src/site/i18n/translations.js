// All public website translations — Arabic (ar) and English (en)
// Only static/hardcoded UI strings live here.
// Dynamic content fetched from the database (service names, doctor bios, etc.)
// is NOT translated here — it is stored in the DB by the admin.

const translations = {
  ar: {
    // ── Navbar ──────────────────────────────────────────────────────────────
    nav: {
      home: 'الرئيسية',
      services: 'الخدمات',
      offers: 'العروض',
      gallery: 'قبل وبعد',
      doctors: 'الأطباء',
      booking: 'الحجز',
      contact: 'تواصل معنا',
      callNow: 'اتصل الآن',
      whatsapp: 'واتساب',
      whatsappContact: 'تواصل واتساب',
      menu: 'القائمة',
      close: 'إغلاق',
      openMenu: 'فتح القائمة',
      switchLang: 'English',
      switchLangLabel: 'اللغة',
    },

    // ── Hero ─────────────────────────────────────────────────────────────────
    hero: {
      badge: 'عيادة معتمدة لطب وتجميل الأسنان',
      defaultTitle: 'ابتسامة أجمل تبدأ من هنا',
      defaultDesc:
        'فريق طبي متخصص وأحدث تقنيات طب الأسنان في مكان واحد، لنمنحك ثقة الابتسامة التي تستحقها برعاية واهتمام في كل زيارة.',
      bookNow: 'احجز موعدك الآن',
      whatsapp: 'تواصل واتساب',
      patients: 'مريض راضٍ',
      rating: 'تقييم العملاء',
    },

    // ── Stats ────────────────────────────────────────────────────────────────
    stats: [
      { value: '+5000', label: 'مريض' },
      { value: '+10', label: 'سنوات خبرة' },
      { value: '4.9', label: 'تقييم العملاء' },
    ],

    // ── Services ─────────────────────────────────────────────────────────────
    services: {
      eyebrow: 'خدماتنا',
      heading: 'رعاية متكاملة لكل احتياجات أسنانك',
      desc: 'نقدم مجموعة شاملة من خدمات طب الأسنان بأحدث الأجهزة وأيدي أطباء متخصصين لضمان أفضل النتائج.',
      empty: 'لا توجد خدمات معروضة حالياً.',
    },

    // ── Offers ───────────────────────────────────────────────────────────────
    offers: {
      eyebrow: 'عروض حصرية',
      heading: 'العروض الحالية',
      desc: 'استفد من عروضنا المحدودة على أهم خدمات طب وتجميل الأسنان.',
      discount: 'خصم',
      currency: 'ج.م',
      bookNow: 'احجز الآن',
      emptyTitle: 'لا توجد عروض متاحة في الوقت الحالي.',
      emptyDesc: 'تابعنا باستمرار لمعرفة أحدث العروض والخصومات على خدماتنا.',
    },

    // ── Gallery ──────────────────────────────────────────────────────────────
    gallery: {
      eyebrow: 'نتائج حقيقية',
      heading: 'قبل وبعد.. شاهد الفرق بنفسك',
      desc: 'اسحب المؤشر لمشاهدة التحول الكامل في حالات حقيقية تمت معالجتها في عيادتنا.',
      empty: 'لا توجد حالات معروضة حالياً.',
    },

    // ── Doctors ──────────────────────────────────────────────────────────────
    doctors: {
      eyebrow: 'طبيب العيادة',
      heading: 'تعرف على طبيبك',
      desc: 'خبرة متخصصة ورعاية متقدمة لضمان أفضل النتائج العلاجية والتجميلية.',
      empty: 'لا يوجد طبيب متاح حالياً.',
      yearsExp: '+ سنوات خبرة',
      viewSlots: 'احجز موعدك الآن',
    },

    // ── Booking ──────────────────────────────────────────────────────────────
    booking: {
      eyebrow: 'احجز موعدك',
      heading: 'احجز موعدك في دقيقة واحدة',
      desc: 'اختر الطبيب، اليوم المناسب، والموعد الذي يناسبك، وسيتم تأكيد حجزك فوراً.',
      patientName: 'اسم المريض',
      namePlaceholder: 'اكتب اسمك الكامل',
      phone: 'رقم الهاتف',
      selectDoctor: 'اختر الطبيب',
      loadingDoctors: 'جارٍ تحميل الأطباء..',
      selectDoctorDefault: '-- اختر الطبيب --',
      selectService: 'اختر الخدمة',
      loadingServices: 'جارٍ تحميل الخدمات...',
      selectServiceDefault: '-- اختر الخدمة --',
      availableDays: 'الأيام المتاحة',
      noDays: 'لا توجد أيام عمل محددة لهذا الطبيب حالياً.',
      availableSlots: 'المواعيد المتاحة',
      noSlots: 'لا توجد مواعيد متاحة في هذا اليوم.',
      summary: 'ملخص الحجز',
      summaryName: 'اسم المريض',
      summaryDoctor: 'الطبيب',
      summaryDay: 'اليوم',
      summaryTime: 'الموعد',
      confirm: 'تأكيد الحجز',
      confirming: 'جارٍ التأكيد...',
      successTitle: 'تم الحجز بنجاح',
      successDesc: 'سيتواصل معك فريقنا قريباً لتأكيد التفاصيل.',
      errorGeneric: 'حدث خطأ، حاول مرة أخرى',
      bookAnother: 'حجز موعد آخر',
      days: {
        Sunday: 'الأحد',
        Monday: 'الاثنين',
        Tuesday: 'الثلاثاء',
        Wednesday: 'الأربعاء',
        Thursday: 'الخميس',
        Friday: 'الجمعة',
        Saturday: 'السبت',
        الأحد: 'الأحد',
        الاثنين: 'الاثنين',
        الثلاثاء: 'الثلاثاء',
        الأربعاء: 'الأربعاء',
        الخميس: 'الخميس',
        الجمعة: 'الجمعة',
        السبت: 'السبت',
      },
    },

    // ── Testimonials ─────────────────────────────────────────────────────────
    testimonials: {
      eyebrow: 'آراء عملائنا',
      heading: 'ثقة مرضانا هي أساس عملنا',
      addReview: 'أضف تقييمك',
      empty: 'لا توجد تقييمات معتمدة بعد.',
    },

    // ── Contact ──────────────────────────────────────────────────────────────
    contact: {
      eyebrow: 'تواصل معنا',
      heading: 'نحن هنا لمساعدتك في أي وقت',
      callUs: 'اتصل بنا',
      whatsapp: 'واتساب',
      address: 'العنوان',
      hours: 'مواعيد العمل',
      hoursValue: 'يومياً من 10 صباحاً حتى 9 مساءً',
      callNow: 'اتصل الآن',
      whatsappBtn: 'واتساب',
      openMaps: 'فتح في خرائط جوجل',
      defaultAddress: 'شارع التحرير، المعادي، القاهرة',
      locationTitle: 'عنوان العيادة',
      locationDesc: 'قم بزيارتنا في عيادتنا، ويسعدنا استقبالك في الموعد الذي يناسبك.',
      viewOnMap: 'عرض الموقع على الخريطة',
    },

    // ── Footer ───────────────────────────────────────────────────────────────
    footer: {
      defaultName: 'دنتافلو لطب الأسنان',
      tagline: 'عيادتك المتكاملة لطب وتجميل الأسنان، نمنحك ابتسامة تدوم مع رعاية صحية موثوقة.',
      quickLinks: 'روابط سريعة',
      follow: 'تابعنا',
      rights: 'جميع الحقوق محفوظة.',
    },

    // ── Add Review Modal ──────────────────────────────────────────────────────
    addReview: {
      title: 'أضف تقييمك',
      nameLabel: 'اسمك',
      namePlaceholder: 'اكتب اسمك',
      nameError: 'الاسم مطلوب',
      ratingLabel: 'تقييمك',
      commentLabel: 'تعليقك',
      commentPlaceholder: 'شاركنا تجربتك معنا...',
      commentError: 'التعليق مطلوب',
      imageLabel: 'صورة (اختياري)',
      cancel: 'إلغاء',
      submit: 'إرسال التقييم',
      submitting: 'جارٍ الإرسال...',
      successTitle: 'شكراً لك على تقييمك!',
      successDesc: 'تم إرسال تقييمك بنجاح وسيتم مراجعته قبل النشر',
      errorGeneric: 'حدث خطأ، حاول مرة أخرى',
      ok: 'حسناً',
    },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // ENGLISH
  // ═══════════════════════════════════════════════════════════════════════════
  en: {
    nav: {
      home: 'Home',
      services: 'Services',
      offers: 'Offers',
      gallery: 'Before & After',
      doctors: 'Doctors',
      booking: 'Book Now',
      contact: 'Contact',
      callNow: 'Call Now',
      whatsapp: 'WhatsApp',
      whatsappContact: 'WhatsApp Us',
      menu: 'Menu',
      close: 'Close',
      openMenu: 'Open menu',
      switchLang: 'العربية',
      switchLangLabel: 'Language',
    },

    hero: {
      badge: 'Certified Dental & Cosmetic Clinic',
      defaultTitle: 'A More Beautiful Smile Starts Here',
      defaultDesc:
        'A specialized medical team and the latest dental technology — all in one place — giving you the confident smile you deserve with care and attention at every visit.',
      bookNow: 'Book Your Appointment',
      whatsapp: 'WhatsApp Us',
      patients: 'Happy Patients',
      rating: 'Customer Rating',
    },

    stats: [
      { value: '+5000', label: 'Patients' },
      { value: '+10', label: 'Years of Experience' },
      { value: '4.9', label: 'Customer Rating' },
    ],

    services: {
      eyebrow: 'Our Services',
      heading: 'Comprehensive Care for All Your Dental Needs',
      desc: 'We offer a full range of dental services using the latest equipment and specialist doctors to ensure the best results.',
      empty: 'No services available at the moment.',
    },

    offers: {
      eyebrow: 'Exclusive Offers',
      heading: 'Current Offers',
      desc: 'Take advantage of our limited-time offers on key dental and cosmetic treatments.',
      discount: 'Off',
      currency: 'EGP',
      bookNow: 'Book Now',
      emptyTitle: 'No offers available right now.',
      emptyDesc: 'Stay tuned — we regularly update our offers and discounts.',
    },

    gallery: {
      eyebrow: 'Real Results',
      heading: 'Before & After — See the Difference',
      desc: 'Drag the slider to view the full transformation of real cases treated at our clinic.',
      empty: 'No cases to display at the moment.',
    },

    doctors: {
      eyebrow: 'Clinic Doctor',
      heading: 'Meet Your Doctor',
      desc: 'Specialized expertise and advanced dental care to ensure the best treatment and cosmetic results.',
      empty: 'Doctor information is currently unavailable.',
      yearsExp: '+ Years Experience',
      viewSlots: 'Schedule Your Visit',
    },
    booking: {
      eyebrow: 'Book an Appointment',
      heading: 'Book Your Appointment in One Minute',
      desc: 'Choose your doctor, preferred day, and time — and your booking will be confirmed instantly.',
      patientName: 'Patient Name',
      namePlaceholder: 'Enter your full name',
      phone: 'Phone Number',
      selectDoctor: 'Select Doctor',
      loadingDoctors: 'Loading doctors...',
      selectDoctorDefault: '-- Select a Doctor --',
      selectService: 'Select Service',
      loadingServices: 'Loading services...',
      selectServiceDefault: '-- Select a Service --',
      availableDays: 'Available Days',
      noDays: 'No working days configured for this doctor yet.',
      availableSlots: 'Available Slots',
      noSlots: 'No slots available on this day.',
      summary: 'Booking Summary',
      summaryName: 'Patient Name',
      summaryDoctor: 'Doctor',
      summaryDay: 'Day',
      summaryTime: 'Time',
      confirm: 'Confirm Booking',
      confirming: 'Confirming...',
      successTitle: 'Appointment booked successfully',
      successDesc: 'Our team will contact you shortly to confirm the details.',
      errorGeneric: 'Something went wrong. Please try again.',
      bookAnother: 'Book Another Appointment',
      days: {
        Sunday: 'Sunday',
        Monday: 'Monday',
        Tuesday: 'Tuesday',
        Wednesday: 'Wednesday',
        Thursday: 'Thursday',
        Friday: 'Friday',
        Saturday: 'Saturday',
        الأحد: 'Sunday',
        الاثنين: 'Monday',
        الثلاثاء: 'Tuesday',
        الأربعاء: 'Wednesday',
        الخميس: 'Thursday',
        الجمعة: 'Friday',
        السبت: 'Saturday',
      },
    },

    testimonials: {
      eyebrow: 'Patient Reviews',
      heading: 'Our Patients\' Trust is the Foundation of Our Work',
      addReview: 'Add Your Review',
      empty: 'No approved reviews yet.',
    },

    contact: {
      eyebrow: 'Contact Us',
      heading: 'We\'re Here to Help You Anytime',
      callUs: 'Call Us',
      whatsapp: 'WhatsApp',
      address: 'Address',
      hours: 'Working Hours',
      hoursValue: 'Daily from 10 AM to 9 PM',
      callNow: 'Call Now',
      whatsappBtn: 'WhatsApp',
      openMaps: 'Open in Google Maps',
      defaultAddress: 'El Tahrir St., El Maadi, Cairo',
      locationTitle: 'Clinic Location',
      locationDesc: 'Visit us at our clinic — we look forward to welcoming you at a time that suits you.',
      viewOnMap: 'View on Google Maps',
    },

    footer: {
      defaultName: 'DentaFlow Dental Clinic',
      tagline: 'Your complete dental & cosmetic clinic — giving you a lasting smile with trusted care.',
      quickLinks: 'Quick Links',
      follow: 'Follow Us',
      rights: 'All rights reserved.',
    },

    addReview: {
      title: 'Add Your Review',
      nameLabel: 'Your Name',
      namePlaceholder: 'Enter your name',
      nameError: 'Name is required',
      ratingLabel: 'Your Rating',
      commentLabel: 'Your Comment',
      commentPlaceholder: 'Share your experience with us...',
      commentError: 'Comment is required',
      imageLabel: 'Photo (optional)',
      cancel: 'Cancel',
      submit: 'Submit Review',
      submitting: 'Submitting...',
      successTitle: 'Thank you for your review!',
      successDesc: 'Your review has been submitted successfully and will be reviewed before publishing',
      errorGeneric: 'Something went wrong. Please try again.',
      ok: 'OK',
    },
  },
}

export default translations
