# 📝 تطبيق الملاحظات - Notes App

تطبيق ملاحظات احترافي مبني بـ **Next.js 16** و **PostgreSQL** و **Drizzle ORM** مع دعم كامل للغة العربية (RTL).

## ✨ الميزات الرئيسية

- 📌 **نظام الأقسام والملفات**: تنظيم متقدم للملاحظات
- 🔍 **البحث الفوري**: البحث في جميع الملاحظات والملفات والأقسام
- 💾 **النسخ الاحتياطية**: تصدير واستيراد البيانات بسهولة
- 🔐 **الخزنة الآمنة**: إدارة كلمات المرور بأمان
- 🌐 **مدير المواقع**: حفظ واستكشاف المواقع المفضلة
- 🗑️ **سلة المحذوفات**: استعادة الملاحظات المحذوفة
- 🎨 **واجهة حديثة**: تصميم استجابي مع دعم العربية
- 📱 **PWA**: تطبيق ويب تقدمي قابل للتثبيت

## 🚀 البدء السريع

### المتطلبات
- Node.js 18+
- PostgreSQL (محلي أو Neon)
- npm أو yarn

### التثبيت والإعداد

1. **استنساخ المستودع**:
```bash
git clone https://github.com/a40591856/Card-website-.git
cd Card-website-
```

2. **تثبيت التبعيات**:
```bash
npm install
```

3. **إنشاء ملف `.env`**:
```bash
cp .env.example .env
```

4. **تعيين متغيرات البيئة**:
```env
# قاعدة البيانات المحلية
DATABASE_URL=postgresql://postgres:password@127.0.0.1:5432/notes_db

# أو استخدم Neon للإنتاج
# DATABASE_URL=postgresql://user:password@host.neon.tech/dbname?sslmode=require

NODE_ENV=development
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

5. **إنشاء جداول قاعدة البيانات**:
```bash
npx drizzle-kit push
```

6. **تشغيل خادم التطوير**:
```bash
npm run dev
```

افتح [http://localhost:3000](http://localhost:3000) في المتصفح.

## 📦 بناء الإنتاج

```bash
npm run build
npm run start
```

## 🌍 النشر على Netlify

### الخطوة 1: إعداد قاعدة البيانات
- سجل في [Neon.tech](https://neon.tech)
- أنشئ مشروع جديد
- انسخ `Connection String`

### الخطوة 2: رفع على GitHub
```bash
git add .
git commit -m "إعداد المشروع للنشر"
git push origin main
```

### الخطوة 3: ربط مع Netlify
1. زر [Netlify](https://netlify.com)
2. اضغط **Add new site** → **Import an existing project**
3. اختر مستودع GitHub
4. في الإعدادات:
   - Build command: `npm run build`
   - Publish directory: `.next`

### الخطوة 4: إضافة متغيرات البيئة
1. **Site settings** → **Environment variables**
2. أضف:
   - `DATABASE_URL` = رابط Neon
   - `NODE_ENV` = production

### الخطوة 5: إنشاء الجداول
```bash
DATABASE_URL="رابط_neon" npx drizzle-kit push
```

## 📁 هيكل المشروع

```
Card-website-/
├── src/
│   ├── app/
│   │   ├── api/              # API Routes (Next.js)
│   │   │   ├── data/         # تحميل جميع البيانات
│   │   │   ├── section/      # إدارة الأقسام
│   │   │   ├── file/         # إدارة الملفات
│   │   │   ├── note/         # إدارة الملاحظات
│   │   │   ├── search/       # البحث
│   │   │   ├── export/       # التصدير
│   │   │   ├── trash/        # السلة
│   │   │   ├── password/     # الخزنة
│   │   │   ├── site/         # مدير المواقع
│   │   │   ├── manifest/     # PWA Manifest
│   │   │   └── health/       # Health Check
│   │   ├── layout.tsx        # Root Layout
│   │   ├── page.tsx          # الصفحة الرئيسية
│   │   └── globals.css       # الأنماط العامة
│   ├── components/           # مكونات React
│   ├── db/
│   │   ├── schema.ts         # Drizzle Schema
│   │   └── index.ts          # Database Connection
│   └── lib/
│       ├── server.ts         # Server Utilities
│       └── seed.ts           # Database Seeding
├── tsconfig.json            # TypeScript Config
├── tailwind.config.ts       # Tailwind CSS Config
├── drizzle.config.ts        # Drizzle ORM Config
├── netlify.toml             # Netlify Config
└── package.json             # Dependencies
```

## 🔌 API Endpoints

### البيانات
- `GET /api/data` - تحميل جميع البيانات
- `GET /api/health` - فحص صحة الخادم

### الأقسام
- `POST /api/section` - إنشاء قسم
- `PATCH /api/section/[id]` - تعديل/حذف القسم

### الملفات
- `POST /api/file` - إنشاء ملف
- `PATCH /api/file/[id]` - تعديل/حذف الملف

### الملاحظات
- `POST /api/note` - إنشاء ملاحظة
- `PATCH /api/note/[id]` - تعديل/حذف الملاحظة

### البحث والتصدير
- `GET /api/search?q=term` - البحث
- `GET /api/export?kind=all` - تصدير البيانات
- `POST /api/trash` - تفريغ السلة

### الخزنة والمواقع
- `GET /api/password` - قائمة كلمات المرور
- `POST /api/password` - إضافة كلمة مرور
- `GET /api/site` - قائمة المواقع
- `POST /api/site` - إضافة موقع

## 🛠️ الأدوات المستخدمة

- **Next.js 16**: إطار العمل
- **React 19**: مكتبة الواجهات
- **PostgreSQL**: قاعدة البيانات
- **Drizzle ORM**: ORM نوع-آمن
- **Tailwind CSS**: تصميم الواجهات
- **TypeScript**: لغة البرمجة

## 📝 الترخيص

هذا المشروع مرخص تحت MIT License.

## 👤 المؤلف

[a40591856](https://github.com/a40591856)

## 🤝 المساهمة

المساهمات مرحب بها! يرجى فتح issue أو إرسال pull request.

## ❓ الدعم

إذا واجهت أي مشاكل:
1. تحقق من الرسائل الخطأ
2. تأكد من اتصال قاعدة البيانات
3. افتح issue على GitHub

---

**صُنع بـ ❤️ لتنظيم ملاحظاتك بسهولة**
