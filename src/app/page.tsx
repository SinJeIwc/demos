import { redirect } from "next/navigation";

/**
 * Здесь будет главный лендинг araweare.
 * Пока его нет — отправляем на витрину демо.
 */
export default function Home() {
  redirect("/demos");
}
