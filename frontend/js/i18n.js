// Internationalization for Nutrition Platform
const i18n = {
  currentLanguage: 'en',
  
  translations: {
    en: {
      // Navigation
      'app.title': 'Nutrition Platform',
      'nav.home': 'Home',
      'nav.about': 'About',
      'nav.contact': 'Contact',
      'nav.language': 'العربية',
      
      // Home Page
      'home.hero.title': 'Your Complete Health & Nutrition Platform',
      'home.hero.subtitle': 'Personalized diet plans, workout routines, and health guidance for the Arabian Gulf region',
      'home.features.title': 'Our Services',
      
      // Feature Cards
      'feature.diet.title': 'Health & Diet',
      'feature.diet.desc': 'Personalized nutrition plans and healthy meal recommendations',
      'feature.workout.title': 'Workout & Injuries',
      'feature.workout.desc': 'Custom fitness plans and injury prevention guidance',
      'feature.sports.title': 'Sports & Games',
      'feature.sports.desc': 'Sports nutrition and performance optimization',
      'feature.reviews.title': 'Food & Cosmetics Reviews',
      'feature.reviews.desc': 'Product reviews and recommendations',
      'feature.drugs.title': 'Drug Doses',
      'feature.drugs.desc': 'Medication guidance and dosage information',
      
      // Forms
      'form.name': 'Full Name',
      'form.age': 'Age',
      'form.height': 'Height (cm)',
      'form.weight': 'Weight (kg)',
      'form.gender': 'Gender',
      'form.gender.male': 'Male',
      'form.gender.female': 'Female',
      'form.activity': 'Activity Level',
      'form.activity.sedentary': 'Sedentary (little/no exercise)',
      'form.activity.light': 'Lightly Active (light exercise 1-3 days/week)',
      'form.activity.moderate': 'Moderately Active (moderate exercise 3-5 days/week)',
      'form.activity.very': 'Very Active (hard exercise 6-7 days/week)',
      'form.activity.extreme': 'Extremely Active (very hard exercise/2x per day)',
      'form.goal': 'Goal',
      'form.goal.lose': 'Lose Weight',
      'form.goal.maintain': 'Maintain Weight',
      'form.goal.gain': 'Gain Weight',
      'form.country': 'Country',
      'form.ifschedule': 'Intermittent Fasting Schedule',
      'form.ifschedule.16_8': '16:8 (16 hours fast, 8 hours eating)',
      'form.ifschedule.18_6': '18:6 (18 hours fast, 6 hours eating)',
      'form.ifschedule.20_4': '20:4 (20 hours fast, 4 hours eating)',
      'form.ifschedule.omad': 'OMAD (One Meal A Day)',
      'form.drugs': 'Current Medications',
      'form.diseases': 'Health Conditions',
      'form.injuries': 'Current Injuries',
      'form.submit': 'Calculate Plan',
      'form.translate': 'Translate to Arabic',
      'form.required': 'This field is required',
      
      // Results
      'results.calories': 'Daily Calories',
      'results.protein': 'Protein (g)',
      'results.carbs': 'Carbs (g)',
      'results.fat': 'Fat (g)',
      'results.bmr': 'BMR',
      'results.tdee': 'TDEE',
      'results.diet.title': 'Your Personalized Diet Plan',
      'results.meal.plan': '7-Day Meal Plan',
      'results.download.pdf': 'Download PDF',
      
      // Meal Plan
      'meal.day': 'Day',
      'meal.breakfast': 'Breakfast',
      'meal.lunch': 'Lunch',
      'meal.dinner': 'Dinner',
      'meal.snack': 'Snack',
      'meal.ingredients': 'Ingredients',
      'meal.preparation': 'Preparation',
      'meal.alternatives': 'Alternatives',
      
      // Workout
      'workout.title': 'Your Workout Plan',
      'workout.goal': 'Fitness Goal',
      'workout.goal.weight_loss': 'Weight Loss',
      'workout.goal.muscle_gain': 'Muscle Gain',
      'workout.goal.endurance': 'Endurance',
      'workout.goal.strength': 'Strength',
      'workout.goal.general': 'General Fitness',
      'workout.tips.title': 'Workout Tips',
      'workout.tips.pre': 'Pre-Workout',
      'workout.tips.post': 'Post-Workout',
      'workout.tips.hydration': 'Hydration',
      'workout.supplements.title': 'Recommended Supplements',
      'workout.supplements.locked': 'Subscribe to view more supplements',
      
      // Subscription
      'subscription.title': 'Unlock Premium Features',
      'subscription.desc': 'Get personalized meal plans, supplement recommendations, and priority support',
      'subscription.cta': 'Subscribe Now',
      'subscription.phone': 'Phone Number',
      'subscription.upload': 'Upload Company Products',
      
      // Footer
      'footer.about': 'About Us',
      'footer.services': 'Services',
      'footer.contact': 'Contact',
      'footer.phone': 'Phone',
      'footer.email': 'Email',
      'footer.address': 'Address',
      'footer.rights': 'All rights reserved',
      
      // Countries
      'country.saudi_arabia': 'Saudi Arabia',
      'country.uae': 'United Arab Emirates',
      'country.kuwait': 'Kuwait',
      'country.qatar': 'Qatar',
      'country.bahrain': 'Bahrain',
      'country.oman': 'Oman',
      
      // Diseases
      'disease.diabetes': 'Diabetes',
      'disease.hypertension': 'Hypertension',
      'disease.heart_disease': 'Heart Disease',
      'disease.thyroid': 'Thyroid Disorders',
      'disease.kidney': 'Kidney Disease',
      'disease.liver': 'Liver Disease',
      
      // Messages
      'message.loading': 'Loading...',
      'message.error': 'An error occurred. Please try again.',
      'message.offline': 'You are offline. Some features may not be available.',
      'message.success': 'Operation completed successfully!',
      
      // Offline
      'offline.title': 'Limited Mode',
      'offline.message': 'You are currently offline. Some features are not available.',
      'offline.retry': 'Retry Connection'
    },
    
    ar: {
      // Navigation
      'app.title': 'منصة التغذية',
      'nav.home': 'الرئيسية',
      'nav.about': 'حولنا',
      'nav.contact': 'اتصل بنا',
      'nav.language': 'English',
      
      // Home Page
      'home.hero.title': 'منصتك الشاملة للصحة والتغذية',
      'home.hero.subtitle': 'خطط غذائية مخصصة وبرامج تمارين وإرشادات صحية لمنطقة الخليج العربي',
      'home.features.title': 'خدماتنا',
      
      // Feature Cards
      'feature.diet.title': 'صحتك ووجباتك',
      'feature.diet.desc': 'خطط تغذية مخصصة وتوصيات وجبات صحية',
      'feature.workout.title': 'الجيم والإصابات',
      'feature.workout.desc': 'خطط لياقة مخصصة وإرشادات منع الإصابات',
      'feature.sports.title': 'الرياضات والألعاب',
      'feature.sports.desc': 'تغذية رياضية وتحسين الأداء',
      'feature.reviews.title': 'تقييمات الأكل ومنتجات التجميل',
      'feature.reviews.desc': 'مراجعات المنتجات والتوصيات',
      'feature.drugs.title': 'جرعات الدواء',
      'feature.drugs.desc': 'إرشادات الأدوية ومعلومات الجرعات',
      
      // Forms
      'form.name': 'الاسم الكامل',
      'form.age': 'العمر',
      'form.height': 'الطول (سم)',
      'form.weight': 'الوزن (كغ)',
      'form.gender': 'الجنس',
      'form.gender.male': 'ذكر',
      'form.gender.female': 'أنثى',
      'form.activity': 'مستوى النشاط',
      'form.activity.sedentary': 'مستقر (قليل/بدون تمارين)',
      'form.activity.light': 'نشط خفيف (تمارين خفيفة 1-3 أيام/أسبوع)',
      'form.activity.moderate': 'نشط متوسط (تمارين متوسطة 3-5 أيام/أسبوع)',
      'form.activity.very': 'نشط جداً (تمارين شاقة 6-7 أيام/أسبوع)',
      'form.activity.extreme': 'نشط للغاية (تمارين شاقة جداً/مرتين يومياً)',
      'form.goal': 'الهدف',
      'form.goal.lose': 'فقدان الوزن',
      'form.goal.maintain': 'الحفاظ على الوزن',
      'form.goal.gain': 'زيادة الوزن',
      'form.country': 'البلد',
      'form.ifschedule': 'جدول الصيام المتقطع',
      'form.ifschedule.16_8': '16:8 (16 ساعة صيام، 8 ساعات أكل)',
      'form.ifschedule.18_6': '18:6 (18 ساعة صيام، 6 ساعات أكل)',
      'form.ifschedule.20_4': '20:4 (20 ساعة صيام، 4 ساعات أكل)',
      'form.ifschedule.omad': 'وجبة واحدة في اليوم',
      'form.drugs': 'الأدوية الحالية',
      'form.diseases': 'الحالات الصحية',
      'form.injuries': 'الإصابات الحالية',
      'form.submit': 'احسب الخطة',
      'form.translate': 'ترجم إلى الإنجليزية',
      'form.required': 'هذا الحقل مطلوب',
      
      // Results
      'results.calories': 'السعرات اليومية',
      'results.protein': 'البروتين (غ)',
      'results.carbs': 'الكربوهيدرات (غ)',
      'results.fat': 'الدهون (غ)',
      'results.bmr': 'معدل الأيض الأساسي',
      'results.tdee': 'إجمالي إنفاق الطاقة',
      'results.diet.title': 'خطة النظام الغذائي المخصصة لك',
      'results.meal.plan': 'خطة الوجبات لـ 7 أيام',
      'results.download.pdf': 'تحميل PDF',
      
      // Meal Plan
      'meal.day': 'اليوم',
      'meal.breakfast': 'الإفطار',
      'meal.lunch': 'الغداء',
      'meal.dinner': 'العشاء',
      'meal.snack': 'وجبة خفيفة',
      'meal.ingredients': 'المكونات',
      'meal.preparation': 'التحضير',
      'meal.alternatives': 'البدائل',
      
      // Workout
      'workout.title': 'خطة التمارين الخاصة بك',
      'workout.goal': 'هدف اللياقة',
      'workout.goal.weight_loss': 'فقدان الوزن',
      'workout.goal.muscle_gain': 'بناء العضلات',
      'workout.goal.endurance': 'التحمل',
      'workout.goal.strength': 'القوة',
      'workout.goal.general': 'لياقة عامة',
      'workout.tips.title': 'نصائح التمرين',
      'workout.tips.pre': 'ما قبل التمرين',
      'workout.tips.post': 'ما بعد التمرين',
      'workout.tips.hydration': 'الترطيب',
      'workout.supplements.title': 'المكملات الموصى بها',
      'workout.supplements.locked': 'اشترك لعرض المزيد من المكملات',
      
      // Subscription
      'subscription.title': 'افتح الميزات المميزة',
      'subscription.desc': 'احصل على خطط وجبات مخصصة وتوصيات مكملات ودعم أولوية',
      'subscription.cta': 'اشترك الآن',
      'subscription.phone': 'رقم الهاتف',
      'subscription.upload': 'رفع منتجات الشركة',
      
      // Footer
      'footer.about': 'من نحن',
      'footer.services': 'الخدمات',
      'footer.contact': 'اتصل بنا',
      'footer.phone': 'الهاتف',
      'footer.email': 'البريد الإلكتروني',
      'footer.address': 'العنوان',
      'footer.rights': 'جميع الحقوق محفوظة',
      
      // Countries
      'country.saudi_arabia': 'المملكة العربية السعودية',
      'country.uae': 'الإمارات العربية المتحدة',
      'country.kuwait': 'الكويت',
      'country.qatar': 'قطر',
      'country.bahrain': 'البحرين',
      'country.oman': 'عمان',
      
      // Diseases
      'disease.diabetes': 'السكري',
      'disease.hypertension': 'ارتفاع ضغط الدم',
      'disease.heart_disease': 'أمراض القلب',
      'disease.thyroid': 'اضطرابات الغدة الدرقية',
      'disease.kidney': 'أمراض الكلى',
      'disease.liver': 'أمراض الكبد',
      
      // Messages
      'message.loading': 'جاري التحميل...',
      'message.error': 'حدث خطأ. يرجى المحاولة مرة أخرى.',
      'message.offline': 'أنت غير متصل. قد لا تكون بعض الميزات متاحة.',
      'message.success': 'تمت العملية بنجاح!',
      
      // Offline
      'offline.title': 'الوضع المحدود',
      'offline.message': 'أنت حالياً غير متصل. بعض الميزات غير متاحة.',
      'offline.retry': 'إعادة المحاولة'
    }
  },
  
  // Initialize i18n
  init() {
    this.currentLanguage = localStorage.getItem('language') || 'en';
    this.updatePageLanguage();
  },
  
  // Get translation for a key
  t(key) {
    return this.translations[this.currentLanguage][key] || key;
  },
  
  // Change language
  changeLanguage(lang) {
    this.currentLanguage = lang;
    localStorage.setItem('language', lang);
    this.updatePageLanguage();
    this.updateContent();
  },
  
  // Update page language attributes
  updatePageLanguage() {
    document.documentElement.lang = this.currentLanguage;
    document.body.dir = this.currentLanguage === 'ar' ? 'rtl' : 'ltr';
    
    // Update Bootstrap RTL
    const bootstrapLink = document.getElementById('bootstrap-css');
    if (this.currentLanguage === 'ar') {
      if (!bootstrapLink.href.includes('rtl')) {
        bootstrapLink.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.rtl.min.css';
      }
    } else {
      if (bootstrapLink.href.includes('rtl')) {
        bootstrapLink.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css';
      }
    }
  },
  
  // Update all content with translations
  updateContent() {
    document.querySelectorAll('[data-i18n]').forEach(element => {
      const key = element.getAttribute('data-i18n');
      element.textContent = this.t(key);
    });
    
    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
      const key = element.getAttribute('data-i18n-placeholder');
      element.placeholder = this.t(key);
    });
    
    document.querySelectorAll('[data-i18n-title]').forEach(element => {
      const key = element.getAttribute('data-i18n-title');
      element.title = this.t(key);
    });
    
    // Update language switcher
    const langButton = document.getElementById('language-switcher');
    if (langButton) {
      langButton.textContent = this.t('nav.language');
    }
  }
};

// Initialize when DOM is loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => i18n.init());
} else {
  i18n.init();
}
