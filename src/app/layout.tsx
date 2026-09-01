import type { Metadata } from "next";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "تطبيق الملاحظات - دفتر عملك الخاص",
  description: "تطبيق ملاحظات احترافي عربي مع الأمان والنسخ الاحتياطي والخزنة",
  viewport: "width=device-width, initial-scale=1",
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='75' font-size='75'>📝</text></svg>",
  },
  manifest: "/api/manifest?d=notes",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <body className="bg-grass-50 text-ink-900 dark:bg-slate-900 dark:text-white">
        {children}
      </body>
    </html>
  );
}
