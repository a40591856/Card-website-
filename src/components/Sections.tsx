"use client";

import React, { useState } from "react";

interface Section {
  id: string;
  name: string;
  createdAt: string;
  deletedAt: string | null;
}

interface SectionsProps {
  sections: Section[];
  selectedSection: string | null;
  onSelectSection: (id: string | null) => void;
  onRefresh: () => void;
}

export function Sections({
  sections,
  selectedSection,
  onSelectSection,
  onRefresh,
}: SectionsProps) {
  const [newSectionName, setNewSectionName] = useState("");
  const [loading, setLoading] = useState(false);

  const activeSections = sections.filter((s) => !s.deletedAt);

  async function createSection() {
    if (!newSectionName.trim()) return;

    setLoading(true);
    try {
      const res = await fetch("/api/section", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newSectionName }),
      });

      if (res.ok) {
        setNewSectionName("");
        onRefresh();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-64 bg-white dark:bg-slate-800 rounded-lg shadow-md p-4 overflow-y-auto">
      <h2 className="text-lg font-bold mb-4 text-grass-700">📂 الأقسام</h2>

      <div className="mb-4 flex gap-2">
        <input
          type="text"
          value={newSectionName}
          onChange={(e) => setNewSectionName(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && createSection()}
          placeholder="قسم جديد..."
          className="flex-1 px-2 py-1 border border-grass-200 dark:border-slate-600 rounded text-sm bg-white dark:bg-slate-700 text-ink-900 dark:text-white"
        />
        <button
          onClick={createSection}
          disabled={loading || !newSectionName.trim()}
          className="px-3 py-1 bg-grass-600 text-white rounded text-sm hover:bg-grass-700 disabled:opacity-50"
        >
          ➕
        </button>
      </div>

      <div className="space-y-2">
        <button
          onClick={() => onSelectSection(null)}
          className={`w-full text-right px-3 py-2 rounded transition-colors ${
            selectedSection === null
              ? "bg-grass-200 dark:bg-grass-700 text-ink-900 dark:text-white"
              : "hover:bg-grass-100 dark:hover:bg-slate-700 text-ink-900 dark:text-white"
          }`}
        >
          🏠 الرئيسية
        </button>

        {activeSections.map((section) => (
          <button
            key={section.id}
            onClick={() => onSelectSection(section.id)}
            className={`w-full text-right px-3 py-2 rounded transition-colors truncate ${
              selectedSection === section.id
                ? "bg-grass-200 dark:bg-grass-700 text-ink-900 dark:text-white"
                : "hover:bg-grass-100 dark:hover:bg-slate-700 text-ink-900 dark:text-white"
            }`}
            title={section.name}
          >
            📁 {section.name}
          </button>
        ))}
      </div>
    </div>
  );
}
