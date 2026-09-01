"use client";

import React, { useState } from "react";

interface File {
  id: string;
  sectionId: string | null;
  name: string;
  createdAt: string;
  deletedAt: string | null;
}

interface FilesProps {
  files: File[];
  selectedFile: string | null;
  sectionId: string | null;
  onSelectFile: (id: string | null) => void;
  onRefresh: () => void;
}

export function Files({
  files,
  selectedFile,
  sectionId,
  onSelectFile,
  onRefresh,
}: FilesProps) {
  const [newFileName, setNewFileName] = useState("");
  const [loading, setLoading] = useState(false);

  const sectionFiles = files.filter(
    (f) => !f.deletedAt && f.sectionId === sectionId
  );

  async function createFile() {
    if (!newFileName.trim()) return;

    setLoading(true);
    try {
      const res = await fetch("/api/file", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newFileName,
          sectionId: sectionId || null,
        }),
      });

      if (res.ok) {
        setNewFileName("");
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
      <h2 className="text-lg font-bold mb-4 text-grass-700">📄 الملفات</h2>

      <div className="mb-4 flex gap-2">
        <input
          type="text"
          value={newFileName}
          onChange={(e) => setNewFileName(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && createFile()}
          placeholder="ملف جديد..."
          className="flex-1 px-2 py-1 border border-grass-200 dark:border-slate-600 rounded text-sm bg-white dark:bg-slate-700 text-ink-900 dark:text-white"
        />
        <button
          onClick={createFile}
          disabled={loading || !newFileName.trim()}
          className="px-3 py-1 bg-grass-600 text-white rounded text-sm hover:bg-grass-700 disabled:opacity-50"
        >
          ➕
        </button>
      </div>

      <div className="space-y-2">
        {sectionFiles.length === 0 ? (
          <div className="text-center text-ink-400 text-sm py-4">
            لا توجد ملفات
          </div>
        ) : (
          sectionFiles.map((file) => (
            <button
              key={file.id}
              onClick={() => onSelectFile(file.id)}
              className={`w-full text-right px-3 py-2 rounded transition-colors truncate ${
                selectedFile === file.id
                  ? "bg-grass-200 dark:bg-grass-700 text-ink-900 dark:text-white"
                  : "hover:bg-grass-100 dark:hover:bg-slate-700 text-ink-900 dark:text-white"
              }`}
              title={file.name}
            >
              📝 {file.name}
            </button>
          ))
        )}
      </div>
    </div>
  );
}
