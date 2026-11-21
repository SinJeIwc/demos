/** Ссылки на мессенджеры. Номер — только цифры с кодом страны, без «+». */
export function whatsappLink(phone: string, text?: string) {
  const digits = phone.replace(/\D/g, "");
  return `https://wa.me/${digits}${text ? `?text=${encodeURIComponent(text)}` : ""}`;
}

export function telegramLink(username: string) {
  return `https://t.me/${username.replace(/^@/, "")}`;
}

export function instagramLink(username: string) {
  return `https://instagram.com/${username.replace(/^@/, "")}`;
}

export const unsplash = (id: string) => `https://images.unsplash.com/${id}`;
