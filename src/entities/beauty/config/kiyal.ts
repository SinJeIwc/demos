import { localize, tx, type Locale } from "@/shared/i18n";
import { unsplash } from "@/shared/lib/messengers";

/**
 * Контент салона красоты на двух языках. «Кыял» — вымышленное название
 * (по-кыргызски «мечта»), мастера, цены и контакты — примеры для демо.
 */
const content = {
  name: tx("Кыял", "Kiyal"),
  fullName: tx("Студия красоты «Кыял»", "Kiyal Beauty Studio"),
  address: tx("Бишкек, ул. Киевская, 77", "77 Kievskaya St, Bishkek"),
  mapQuery: "Kievskaya Street, Bishkek",
  hours: tx("Ежедневно 9:00–21:00", "Daily 9:00–21:00"),
  currency: tx("сом", "KGS"),
  contacts: { whatsapp: "996700000003", phoneDisplay: "+996 700 000 003", telegram: "kiyal_demo", instagram: "kiyal.demo" },
  cta: tx("Записаться", "Book now"),

  nav: {
    services: tx("Услуги", "Services"),
    masters: tx("Мастера", "Stylists"),
    works: tx("Работы", "Our work"),
    contacts: tx("Контакты", "Contacts"),
  },

  hero: {
    title: tx("Время, которое вы проводите для себя", "Time you spend on yourself"),
    lead: tx(
      "Волосы, ногти, брови и уход за кожей в одной студии. Записывайтесь онлайн к любимому мастеру — без звонков.",
      "Hair, nails, brows and skin care in one studio. Book your favourite stylist online — no calls needed.",
    ),
    images: [
      { src: unsplash("photo-1580618672591-eb180b1a973f"), alt: tx("Мастер делает укладку", "Stylist blow-drying hair") },
      { src: unsplash("photo-1632345031435-8727f6897d53"), alt: tx("Маникюр", "Manicure") },
      { src: unsplash("photo-1589710751893-f9a6770ad71b"), alt: tx("Наращивание ресниц", "Eyelash extensions") },
    ],
    note: tx("Первый визит — консультация мастера бесплатно", "Your first visit includes a free consultation"),
  },

  services: {
    title: tx("Услуги и цены", "Services and prices"),
    from: tx("от", "from"),
    book: tx("Записаться", "Book"),
    categories: [
      {
        id: "hair",
        name: tx("Волосы", "Hair"),
        items: [
          { id: "cut", name: tx("Женская стрижка", "Women’s haircut"), duration: tx("60 мин", "60 min"), price: 1500 },
          { id: "color", name: tx("Окрашивание", "Colouring"), duration: tx("от 2 ч", "from 2 h"), price: 4500 },
          { id: "styling", name: tx("Укладка", "Styling"), duration: tx("45 мин", "45 min"), price: 1200 },
        ],
      },
      {
        id: "nails",
        name: tx("Ногти", "Nails"),
        items: [
          { id: "manicure", name: tx("Маникюр с покрытием", "Gel manicure"), duration: tx("90 мин", "90 min"), price: 1200 },
          { id: "pedicure", name: tx("Педикюр", "Pedicure"), duration: tx("90 мин", "90 min"), price: 1800 },
        ],
      },
      {
        id: "brows",
        name: tx("Брови и ресницы", "Brows and lashes"),
        items: [
          { id: "brows", name: tx("Архитектура бровей", "Brow shaping"), duration: tx("45 мин", "45 min"), price: 900 },
          { id: "lashes", name: tx("Ламинирование ресниц", "Lash lift"), duration: tx("60 мин", "60 min"), price: 1500 },
        ],
      },
      {
        id: "face",
        name: tx("Лицо и макияж", "Face and make-up"),
        items: [
          { id: "facial", name: tx("Уход за лицом", "Facial"), duration: tx("75 мин", "75 min"), price: 2500 },
          { id: "makeup", name: tx("Вечерний макияж", "Evening make-up"), duration: tx("60 мин", "60 min"), price: 2500 },
        ],
      },
    ],
  },

  masters: {
    title: tx("Мастера", "Stylists"),
    book: tx("Записаться к мастеру", "Book with this stylist"),
    items: [
      { id: "aizhan", name: tx("Айжан", "Aizhan"), role: tx("Стилист по волосам", "Hair stylist"), image: unsplash("photo-1634449571010-02389ed0f9b0") },
      { id: "begimai", name: tx("Бегимай", "Begimai"), role: tx("Мастер ногтевого сервиса", "Nail artist"), image: unsplash("photo-1632345031435-8727f6897d53") },
      { id: "nurgul", name: tx("Нургуль", "Nurgul"), role: tx("Бровист, лэшмейкер", "Brow and lash artist"), image: unsplash("photo-1589710751893-f9a6770ad71b") },
      { id: "elina", name: tx("Элина", "Elina"), role: tx("Косметолог, визажист", "Skin care and make-up artist"), image: unsplash("photo-1761718210089-ba3bb5ccb54f") },
    ],
  },

  works: {
    title: tx("Работы и атмосфера", "Our work and space"),
    images: [
      { src: unsplash("photo-1781450090585-1a511b7066d9"), alt: tx("Зал студии с креслами и зеркалами", "Studio hall with chairs and mirrors") },
      { src: unsplash("photo-1616394584738-fc6e612e71b9"), alt: tx("Уходовая маска", "Skin care mask") },
      { src: unsplash("photo-1596462502278-27bfdc403348"), alt: tx("Кисти для макияжа", "Make-up brushes") },
      { src: unsplash("photo-1570172619644-dfd03ed5d881"), alt: tx("Процедура для лица", "Facial treatment") },
      { src: unsplash("photo-1633681926022-84c23e8cb2d6"), alt: tx("Круглые зеркала", "Round mirrors") },
      { src: unsplash("photo-1761839256791-6a93f89fb8b0"), alt: tx("Мастер готовит клиентку к стрижке", "Stylist preparing a client") },
    ],
  },

  booking: {
    title: tx("Онлайн-запись", "Book online"),
    lead: tx("Выберите услугу, мастера и время — подтвердим в мессенджере.", "Choose a service, stylist and time — we’ll confirm in the messenger."),
    staffLabel: tx("Мастер", "Stylist"),
  },

  location: {
    title: tx("Студия в центре", "In the city centre"),
    map: tx("Карта: студия «Кыял»", "Map: Kiyal Studio"),
  },
  footer: {
    disclaimer: tx("Демо-сайт. Название, мастера, цены и контакты вымышленные. Фото: Unsplash.", "Demo website. Name, stylists, prices and contacts are fictional. Photos: Unsplash."),
  },
  dock: { waMessage: tx("Здравствуйте! Хочу записаться.", "Hello! I’d like to book.") },
};

export const getBeauty = (locale: Locale) => localize(content, locale);
export type Beauty = ReturnType<typeof getBeauty>;
