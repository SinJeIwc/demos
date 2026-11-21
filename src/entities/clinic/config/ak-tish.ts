import { localize, tx, type Locale } from "@/shared/i18n";
import { unsplash } from "@/shared/lib/messengers";

/**
 * Контент стоматологии на двух языках. «Ак Тиш» — вымышленное название
 * (по-кыргызски «белый зуб»), врачи, цены и контакты — примеры для демо.
 */
const content = {
  name: tx("Ак Тиш", "Ak Tish"),
  fullName: tx("Стоматология «Ак Тиш»", "Ak Tish Dental"),
  address: tx("Бишкек, пр. Чуй, 100, 2 этаж", "100 Chuy Ave, 2nd floor, Bishkek"),
  mapQuery: "Chuy Avenue, Bishkek",
  hours: tx("Ежедневно 8:00–21:00", "Daily 8:00–21:00"),
  currency: tx("сом", "KGS"),
  contacts: { whatsapp: "996700000001", phoneDisplay: "+996 700 000 001", telegram: "aktish_demo", instagram: "aktish.demo" },
  cta: tx("Записаться", "Book a visit"),

  nav: {
    services: tx("Услуги и цены", "Services"),
    results: tx("Результаты", "Results"),
    doctors: tx("Врачи", "Doctors"),
    visit: tx("Как проходит визит", "Your visit"),
    contacts: tx("Контакты", "Contacts"),
  },

  hero: {
    title: tx("Лечим зубы спокойно и без очередей", "Calm dental care with no queues"),
    lead: tx(
      "Семейная стоматология в центре Бишкека. Говорим цену до начала лечения и записываем на удобное время за пару минут.",
      "A family dental clinic in central Bishkek. We quote the price before treatment and book you in a couple of minutes.",
    ),
    image: unsplash("photo-1629909613654-28e377c37b09"),
    imageAlt: tx("Кабинет стоматологии со светлым креслом", "Bright dental office with a chair"),
    secondary: tx("Посмотреть цены", "See prices"),
    facts: [
      { value: tx("8–21", "8–21"), label: tx("без выходных", "seven days a week") },
      { value: tx("0%", "0%"), label: tx("рассрочка на имплантацию", "instalments for implants") },
      { value: tx("15 мин", "15 min"), label: tx("ответ в WhatsApp", "reply on WhatsApp") },
    ],
    badge: tx("Цена известна до начала лечения", "You know the price before we start"),
  },

  services: {
    title: tx("Услуги и цены", "Services and prices"),
    lead: tx("Цены — от. Точную сумму врач назовёт после осмотра, ещё до лечения.", "Starting prices. The doctor confirms the exact cost after the check-up, before any treatment."),
    all: tx("Все", "All"),
    from: tx("от", "from"),
    book: tx("Записаться", "Book"),
    groups: [
      { id: "therapy", name: tx("Лечение", "Treatment") },
      { id: "hygiene", name: tx("Гигиена", "Hygiene") },
      { id: "implants", name: tx("Имплантация", "Implants") },
      { id: "ortho", name: tx("Ортодонтия", "Orthodontics") },
      { id: "kids", name: tx("Детям", "Kids") },
    ],
    items: [
      { id: "consult", group: "therapy", name: tx("Консультация и план лечения", "Consultation and treatment plan"), price: 500, duration: tx("30 мин", "30 min") },
      { id: "caries", group: "therapy", name: tx("Лечение кариеса", "Cavity treatment"), price: 4000, duration: tx("60 мин", "60 min") },
      { id: "canal", group: "therapy", name: tx("Лечение каналов", "Root canal treatment"), price: 9000, duration: tx("90 мин", "90 min") },
      { id: "cleaning", group: "hygiene", name: tx("Профессиональная чистка", "Professional cleaning"), price: 3500, duration: tx("60 мин", "60 min") },
      { id: "whitening", group: "hygiene", name: tx("Отбеливание", "Whitening"), price: 15000, duration: tx("90 мин", "90 min") },
      { id: "implant", group: "implants", name: tx("Имплант под ключ", "Implant, all-inclusive"), price: 45000, duration: tx("2–3 визита", "2–3 visits") },
      { id: "braces", group: "ortho", name: tx("Брекеты", "Braces"), price: 60000, duration: tx("от 12 мес", "from 12 months") },
      { id: "aligners", group: "ortho", name: tx("Элайнеры", "Clear aligners"), price: 120000, duration: tx("от 6 мес", "from 6 months") },
      { id: "kids-check", group: "kids", name: tx("Детский осмотр", "Kids’ check-up"), price: 800, duration: tx("30 мин", "30 min") },
    ],
  },

  results: {
    title: tx("Отбеливание за один визит", "Whitening in one visit"),
    text: tx(
      "Потяните ползунок, чтобы сравнить. Обычно эмаль светлеет на 6–8 тонов, эффект держится до двух лет при домашнем уходе.",
      "Drag the handle to compare. Enamel usually gets 6–8 shades lighter and lasts up to two years with home care.",
    ),
    before: tx("До", "Before"),
    after: tx("После", "After"),
    note: tx("Иллюстрация для демо-сайта", "Illustration for the demo website"),
    image: unsplash("photo-1677026010083-78ec7f1b84ed"),
    imageAlt: tx("Улыбка крупным планом", "Close-up of a smile"),
  },

  steps: {
    title: tx("Как проходит первый визит", "How your first visit goes"),
    items: [
      { title: tx("Заявка", "Request"), text: tx("Пишете в WhatsApp или через форму — подтверждаем время в течение 15 минут.", "Message us on WhatsApp or via the form — we confirm the time within 15 minutes.") },
      { title: tx("Осмотр и снимок", "Check-up and X-ray"), text: tx("Врач смотрит зубы, при необходимости делаем снимок прямо в клинике.", "The doctor examines your teeth and takes an X-ray on site if needed.") },
      { title: tx("План и цена", "Plan and price"), text: tx("Получаете план лечения с ценой каждого этапа. Решаете без спешки.", "You get a treatment plan with the price of every step and decide without pressure.") },
      { title: tx("Лечение", "Treatment"), text: tx("Лечим под анестезией, которую подбираем под вас. После — напоминаем о контроле.", "We treat under anaesthesia chosen for you, then remind you about the follow-up.") },
    ],
  },

  doctors: {
    title: tx("Врачи", "Doctors"),
    book: tx("Записаться к врачу", "Book with this doctor"),
    years: tx("лет практики", "years in practice"),
    items: [
      { id: "aibek", initials: "АТ", name: tx("Айбек Токтогулов", "Aibek Toktogulov"), role: tx("Терапевт, эндодонтист", "General dentist, endodontist"), years: 12 },
      { id: "aliya", initials: "АС", name: tx("Алия Садыкова", "Aliya Sadykova"), role: tx("Ортодонт", "Orthodontist"), years: 9 },
      { id: "timur", initials: "ТК", name: tx("Тимур Касымов", "Timur Kasymov"), role: tx("Хирург-имплантолог", "Implant surgeon"), years: 15 },
      { id: "meerim", initials: "МБ", name: tx("Мээрим Бекова", "Meerim Bekova"), role: tx("Детский стоматолог", "Paediatric dentist"), years: 7 },
    ],
  },

  appointment: {
    title: tx("Запись на приём", "Book an appointment"),
    lead: tx("Выберите услугу, врача и время — заявка придёт администратору в мессенджер.", "Choose a service, doctor and time — your request goes to the front desk in the messenger."),
    staffLabel: tx("Врач", "Doctor"),
  },

  location: {
    title: tx("Как нас найти", "How to find us"),
    transport: tx("Остановка «Филармония», 2 минуты пешком. Парковка во дворе.", "Philharmonic bus stop, 2 minutes on foot. Parking in the courtyard."),
    map: tx("Карта: стоматология «Ак Тиш»", "Map: Ak Tish Dental"),
  },

  footer: {
    disclaimer: tx("Демо-сайт. Название, врачи, цены и контакты вымышленные. Фото: Unsplash.", "Demo website. Name, doctors, prices and contacts are fictional. Photos: Unsplash."),
  },
  dock: { waMessage: tx("Здравствуйте! Хочу записаться на приём.", "Hello! I’d like to book an appointment.") },
};

export const getClinic = (locale: Locale) => localize(content, locale);
export type Clinic = ReturnType<typeof getClinic>;
