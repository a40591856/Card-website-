"use client";

import React, { useEffect, useState } from "react";
import { Sections } from "./Sections";
import { Files } from "./Files";
import { Notes } from "./Notes";
import { Sidebar } from "./Sidebar";

interface Section {
  id: string;
  name: string;
  createdAt: string;
  deletedAt: string | null;
}

interface File {
  id: string;
  sectionId: string | null;
  name: string;
  createdAt: string;
  deletedAt: string | null;
}

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

export default function NotesApp() {
  const [sections, setSections] = useState<Section[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      const res = await fetch("/api/data");
      const data = await res.json();
      setSections(data.sections || []);
      setFiles(data.files || []);
      setNotes(data.notes || []);
    } catch (err) {
      setError("فشل تحميل البيانات");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-4xl mb-4">📝</div>
          <div>جاري التحميل...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-grass-50 dark:bg-slate-900 overflow-hidden">
      <Sidebar onRefresh={loadData} />
      <div className="flex-1 flex gap-4 p-4 overflow-hidden">
        <Sections
          sections={sections}
          selectedSection={selectedSection}
          onSelectSection={setSelectedSection}
          onRefresh={loadData}
        />
        <Files
          files={files}
          selectedFile={selectedFile}
          sectionId={selectedSection}
          onSelectFile={setSelectedFile}
          onRefresh={loadData}
        />
        <Notes
          notes={notes}
          fileId={selectedFile}
          onRefresh={loadData}
        />
      </div>
    </div>
  );
}
