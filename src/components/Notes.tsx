"use client";

import React, { useState } from "react";

interface Note {
  id: string;
  fileId: string | null;
  title: string;
  content: string;
  type: string;
  tag: string;
  pinned: boolean;
  archived: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

interface NotesProps {
  notes: Note[];
  fileId: string | null;
  onRefresh: () => void;
}

export function Notes({ notes, fileId, onRefresh }: NotesProps) {
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [loading, setLoading] = useState(false);

  const fileNotes = notes.filter((n) => !n.deletedAt && n.fileId === fileId);

  async function createNote() {
    if (!newTitle.trim() && !newContent.trim()) return;

    setLoading(true);
    try {
      const res = await fetch("/api/note", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: newTitle,
          content: newContent,
          fileId: fileId || null,
          type: "note",
        }),
      });

      if (res.ok) {
        setNewTitle("");
        setNewContent("");
        onRefresh();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  if (!fileId && notes.length === 0) {
    return (
      <div className="flex-1 bg-white dark:bg-slate-800 rounded-lg shadow-md p-8 overflow-y-auto flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">📝</div>
          <h2 className="text-2xl font-bold mb-2 text-ink-900 dark:text-white">
            مرحباً بك في تطبيق الملاحظات
          </h2>
          <p className="text-ink-600 dark:text-ink-400">
            اختر ملف لعرض أو إضافة ملاحظات
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 overflow-y-auto flex flex-col">
      <h2 className="text-2xl font-bold mb-6 text-grass-700">📋 الملاحظات</h2>

      {fileId && (
        <div className="mb-6 p-4 bg-grass-50 dark:bg-slate-700 rounded-lg border border-grass-200 dark:border-slate-600">
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="عنوان الملاحظة..."
            className="w-full mb-2 px-3 py-2 border border-grass-300 dark:border-slate-600 rounded bg-white dark:bg-slate-800 text-ink-900 dark:text-white"
          />
          <textarea
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
            placeholder="اكتب محتوى الملاحظة..."
            rows={4}
            className="w-full mb-3 px-3 py-2 border border-grass-300 dark:border-slate-600 rounded bg-white dark:bg-slate-800 text-ink-900 dark:text-white resize-none"
          />
          <button
            onClick={createNote}
            disabled={loading || (!newTitle.trim() && !newContent.trim())}
            className="w-full px-4 py-2 bg-grass-600 text-white rounded hover:bg-grass-700 disabled:opacity-50 font-medium"
          >
            ➕ إضافة ملاحظة
          </button>
        </div>
      )}

      <div className="space-y-3">
        {fileNotes.length === 0 ? (
          <div className="text-center text-ink-400 py-8">
            لا توجد ملاحظات في هذا الملف
          </div>
        ) : (
          fileNotes.map((note) => (
            <div
              key={note.id}
              className="p-4 bg-grass-50 dark:bg-slate-700 border border-grass-200 dark:border-slate-600 rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-2">
                <div className="flex-1">
                  <h3 className="font-semibold text-ink-900 dark:text-white">
                    {note.title || "بدون عنوان"}
                  </h3>
                  <p className="text-ink-600 dark:text-ink-400 text-sm mt-1 line-clamp-3">
                    {note.content}
                  </p>
                  <div className="text-xs text-ink-400 dark:text-ink-500 mt-2">
                    {new Date(note.updatedAt).toLocaleString("ar-SA")}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
