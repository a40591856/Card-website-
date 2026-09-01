"use client";

import { useEffect, useState } from "react";
import NotesApp from "@/components/NotesApp";

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-grass-50">
        <div className="text-center">
          <div className="text-4xl mb-4">📝</div>
          <div className="text-ink-600">جاري التحميل...</div>
        </div>
      </div>
    );
  }

  return <NotesApp />;
}
