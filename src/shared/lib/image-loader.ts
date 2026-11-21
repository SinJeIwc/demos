type LoaderArgs = { src: string; width: number; quality?: number };

/**
 * Загрузчик для next/image. Для Unsplash просим картинку нужной ширины прямо у CDN,
 * локальные файлы из /public отдаём как есть.
 */
export default function imageLoader({ src, width, quality }: LoaderArgs) {
  if (src.startsWith("https://images.unsplash.com/")) {
    const url = new URL(src);
    url.searchParams.set("auto", "format");
    url.searchParams.set("fit", "crop");
    url.searchParams.set("w", String(width));
    url.searchParams.set("q", String(quality ?? 75));
    return url.toString();
  }
  return src;
}
