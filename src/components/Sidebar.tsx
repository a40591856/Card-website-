"use client";

import React, { useState } from "react";

interface SidebarProps {
  onRefresh: () => void;
}

export function Sidebar({ onRefresh }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);

  async function handleExport() {
    try {
      const res = await fetch("/api/export?kind=all");
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `notes-backup-${new Date().toISOString().split('T')[0]}.json`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Export failed:", err);
    }
  }

  return (
    <div className="w-16 bg-grass-700 dark:bg-slate-900 shadow-lg flex flex-col items-center py-4 gap-4">
      <div className="text-2xl">📝</div>

      <button
        onClick={onRefresh}
        className="p-3 hover:bg-grass-600 dark:hover:bg-slate-800 rounded-lg transition-colors text-white text-lg"
        title="تحديث"
      >
        🔄
      </button>

      <button
        onClick={handleExport}
        className="p-3 hover:bg-grass-600 dark:hover:bg-slate-800 rounded-lg transition-colors text-white text-lg"
        title="تصدير نسخة احتياطية"
      >
        💾
      </button>

      <button
        className="p-3 hover:bg-grass-600 dark:hover:bg-slate-800 rounded-lg transition-colors text-white text-lg"
        title="سلة المحذوفات"
      >
        🗑️
      </button>

      <button
        className="p-3 hover:bg-grass-600 dark:hover:bg-slate-800 rounded-lg transition-colors text-white text-lg"
        title="الخزنة الآمنة"
      >
        🔐
      </button>

      <button
        className="p-3 hover:bg-grass-600 dark:hover:bg-slate-800 rounded-lg transition-colors text-white text-lg mt-auto"
        title="الإعدادات"
      >
        ⚙️
      </button>
    </div>
  );
}
