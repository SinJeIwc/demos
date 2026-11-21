import Link from "next/link";
import { AraweareMark } from "@/components/brand/logo";

export default function NotFound() {
  return (
    <main className="grain grid min-h-dvh place-items-center bg-ink px-5 text-snow">
      <div className="max-w-md text-center">
        <AraweareMark className="mx-auto size-16" />
        <h1 className="display-tight mt-8 text-5xl font-light">Такой страницы нет</h1>
        <p className="mt-4 text-mist/75">Возможно, ссылка устарела. Все наши примеры собраны на витрине.</p>
        <Link
          href="/demos"
          className="mt-8 inline-flex rounded-full bg-dusk px-6 py-3 font-medium text-ink transition-transform hover:scale-[1.03]"
        >
          Открыть витрину демо
        </Link>
      </div>
    </main>
  );
}
