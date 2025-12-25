# VibeJS - منصة تعلم JavaScript التفاعلية

![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)

## 📖 نظرة عامة / Overview

**VibeJS** هي منصة تعليمية تفاعلية مصممة خصيصاً لطلاب المدارس والمتسابقين لتعلم لغة البرمجة JavaScript بطريقة ممتعة وتفاعلية.

**VibeJS** is an interactive educational platform designed specifically for school students and competitors to learn JavaScript programming in a fun and interactive way.

## ✨ المميزات / Features

- 🚫 **لا تسجيل مطلوب** / No registration required
- 🌍 **ثنائي اللغة** / Bilingual (Arabic/English)
- 🌓 **وضع داكن/فاتح** / Dark/Light mode
- 🧪 **مختبر تفاعلي آمن** / Safe interactive playground
- 📚 **محتوى تعليمي شامل** / Comprehensive educational content
- 🎯 **تحديات وأسئلة تقييمية** / Challenges and quizzes
- 📱 **تصميم متجاوب** / Responsive design
- ♿ **دعم الوصولية** / Accessibility support

## 🏗️ البنية التقنية / Tech Stack

- **Backend**: Node.js + Express.js
- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Storage**: localStorage (no database required)
- **Internationalization**: JSON-based i18n

## 📁 هيكل المشروع / Project Structure

```
vibejs-platform/
├── server.js                 # Express server
├── package.json             # Dependencies
├── public/
│   ├── css/
│   │   ├── styles.css       # Main styles
│   │   └── animate.css      # Animations
│   ├── js/
│   │   ├── core.js          # Core functionality
│   │   ├── experiments.js   # Playground logic
│   │   └── challenges.js    # Quiz logic
│   ├── components/
│   │   ├── navbar.html      # Navigation bar
│   │   ├── footer.html      # Footer
│   │   └── modal.html       # Modal template
│   ├── i18n/
│   │   ├── ar.json          # Arabic translations
│   │   └── en.json          # English translations
│   ├── img/
│   │   └── js-logo.svg      # JavaScript logo
│   └── pages/
│       ├── index.html       # Home page
│       ├── intro.html       # Introduction
│       ├── about.html       # About us
│       ├── lessons.html     # Lessons
│       ├── experiments.html # Playground
│       ├── challenges.html  # Challenges
│       ├── examples.html    # Examples
│       ├── resources.html   # Resources
│       ├── blog.html        # Blog
│       ├── contact.html     # Contact
│       └── credits.html     # Credits
```

## 🚀 التثبيت والتشغيل / Installation & Running

### المتطلبات / Prerequisites

- Node.js (v14 أو أحدث / v14 or higher)
- npm أو yarn

### خطوات التثبيت / Installation Steps

1. **استنساخ المشروع / Clone the project**
```bash
git clone <repository-url>
cd vibejs-platform
```

2. **تثبيت الاعتماديات / Install dependencies**
```bash
npm install
```

3. **تشغيل الخادم / Start the server**
```bash
npm start
```

أو للتطوير مع إعادة التشغيل التلقائي:
Or for development with auto-restart:
```bash
npm run dev
```

4. **فتح المتصفح / Open browser**
```
http://localhost:3000
```

## 📄 الصفحات المتاحة / Available Pages

1. **الرئيسية** / Home (`/pages/index.html`)
2. **المقدمة** / Introduction (`/pages/intro.html`)
3. **من نحن** / About (`/pages/about.html`)
4. **الدروس** / Lessons (`/pages/lessons.html`)
5. **المختبر** / Playground (`/pages/experiments.html`)
6. **التحديات** / Challenges (`/pages/challenges.html`)
7. **الأمثلة** / Examples (`/pages/examples.html`)
8. **الموارد** / Resources (`/pages/resources.html`)
9. **المدونة** / Blog (`/pages/blog.html`)
10. **تواصل معنا** / Contact (`/pages/contact.html`)
11. **الحقوق** / Credits (`/pages/credits.html`)

## 🎨 الميزات التقنية / Technical Features

### دعم اللغات / Language Support
- تبديل تلقائي بين العربية والإنجليزية
- دعم RTL/LTR
- حفظ تفضيلات اللغة في localStorage

### المختبر التفاعلي / Interactive Playground
- تنفيذ آمن للكود باستخدام iframe + srcdoc
- عرض النتائج في الوقت الفعلي
- معالجة الأخطاء بشكل واضح
- أمثلة جاهزة للاستخدام

### نظام التحديات / Challenge System
- أسئلة متعددة الخيارات
- نظام نقاط
- شرح للإجابات
- تتبع التقدم

### التصميم / Design
- CSS Variables للثيمات
- Animations سلسة
- Responsive design
- Dark/Light mode
- Accessibility features

## 🔒 الأمان / Security

- لا يتم تخزين أي بيانات مستخدمين
- تنفيذ الكود في بيئة معزولة (iframe sandbox)
- عدم استخدام eval() أو Function()
- Security headers في Express

## 🌐 API Endpoints

### POST `/api/contact`
إرسال رسالة تواصل / Send contact message

**Request Body:**
```json
{
  "name": "string",
  "email": "string",
  "message": "string"
}
```

**Response:**
```json
{
  "status": "success",
  "message": "تم استلام رسالتك بنجاح"
}
```

## 🎓 الاستخدام التعليمي / Educational Use

هذا المشروع مصمم للاستخدام في:
This project is designed for use in:

- المدارس الثانوية / High schools
- المسابقات البرمجية / Programming competitions
- التعلم الذاتي / Self-learning
- ورش العمل / Workshops

## 🏫 المدرسة / School

**بنايوس الثانوية المشتركة**
Banayos Joint Secondary School

محافظة الشرقية - إدارة غرب الزقازيق التعليمية
Sharkia Governorate - West Zagazig Educational Administration

## 📝 الترخيص / License

MIT License - مجاني للاستخدام التعليمي والشخصي
MIT License - Free for educational and personal use

## 🤝 المساهمة / Contributing

نرحب بالمساهمات! يرجى:
Contributions are welcome! Please:

1. Fork المشروع / Fork the project
2. إنشاء branch للميزة / Create feature branch
3. Commit التغييرات / Commit changes
4. Push للـ branch / Push to branch
5. فتح Pull Request / Open Pull Request

## 📞 التواصل / Contact

للأسئلة والاقتراحات، يرجى استخدام صفحة التواصل في المنصة.
For questions and suggestions, please use the contact page on the platform.

## 🙏 شكر وتقدير / Acknowledgments

- JavaScript Community
- MDN Web Docs
- Node.js & Express.js teams
- Open Source Community

---

**صُنع بـ ❤️ في بنايوس الثانوية المشتركة**
**Made with ❤️ at Banayos Joint Secondary School**