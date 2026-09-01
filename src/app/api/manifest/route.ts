export const dynamic = "force-dynamic";

const DISGUISES: Record<string, { name: string; theme: string; icon: string; bg: string }> = {
  notes: { name: "الملاحظات", theme: "#43a047", icon: "📝", bg: "#43a047" },
  calculator: { name: "الآلة الحاسبة", theme: "#1f2937", icon: "🧮", bg: "#1f2937" },
  weather: { name: "الطقس", theme: "#0ea5e9", icon: "⛅", bg: "#0ea5e9" },
  clock: { name: "الساعة", theme: "#111827", icon: "⏰", bg: "#111827" },
  files: { name: "الملفات", theme: "#f59e0b", icon: "📁", bg: "#f59e0b" },
};

function iconSvg(emoji: string, bg: string) {
  return (
    "data:image/svg+xml," +
    encodeURIComponent(
      `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'><rect width='512' height='512' rx='96' fill='${bg}'/><text x='50%' y='50%' font-size='300' text-anchor='middle' dominant-baseline='central'>${emoji}</text></svg>`
    )
  );
}

export async function GET(req: Request) {
  const key = new URL(req.url).searchParams.get("d") || "notes";
  const d = DISGUISES[key] ?? DISGUISES.notes;
  const icon = iconSvg(d.icon, d.bg);

  const manifest = {
    name: d.name,
    short_name: d.name,
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: d.theme,
    icons: [
      { src: icon, sizes: "512x512", type: "image/svg+xml", purpose: "any maskable" },
    ],
  };

  return Response.json(manifest, {
    headers: {
      "Content-Type": "application/manifest+json",
      "Cache-Control": "no-store",
    },
  });
}
