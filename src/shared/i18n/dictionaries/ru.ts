/**
 * Тексты интерфейса на русском. Это эталон: английский словарь обязан
 * иметь те же ключи (проверяет TypeScript через тип Dictionary).
 * Контент конкретных бизнесов (номера, цены, описания) живёт в entities.
 */
const nightsRu = (n: number) => {
  const m10 = n % 10;
  const m100 = n % 100;
  if (m10 === 1 && m100 !== 11) return `${n} ночь`;
  if (m10 >= 2 && m10 <= 4 && (m100 < 12 || m100 > 14)) return `${n} ночи`;
  return `${n} ночей`;
};

export const ru = {
  common: {
    book: "Забронировать",
    toHome: "На главную",
    toTop: "Наверх",
    openMenu: "Открыть меню",
    closeMenu: "Закрыть меню",
    close: "Закрыть",
    writeUs: "Написать нам",
    hideMessengers: "Скрыть мессенджеры",
    madeBy: "Сделано в",
    language: "Язык",
  },

  home: {
    metaTitle: "araweare — сайты для бизнеса",
    metaDescription:
      "Сайты для отелей, клиник, ресторанов и салонов с заявками в WhatsApp и Telegram. Посмотрите демо.",
    label: "Демо-сайты",
    title: "Посмотрите, как может выглядеть сайт вашего бизнеса",
    lead: "Каждый пример — готовый сайт с заявками в WhatsApp и Telegram. Выберите свою сферу и откройте демо.",
    soon: "Скоро",
    openDemo: "Открыть демо",
  },

  notFound: {
    title: "Такой страницы нет",
    text: "Возможно, ссылка устарела. Все наши примеры собраны на главной.",
    cta: "Открыть главную",
  },

  hotel: {
    nav: {
      rooms: "Номера",
      amenities: "Удобства",
      experiences: "Впечатления",
      gallery: "Галерея",
      location: "Как добраться",
    },
    hero: {
      photoAlt: "Бирюзовое озеро и снежные горы",
      datesLabel: "Даты поездки",
      datesValue: "Выберите заезд и выезд",
      roomsLabel: "Номера",
      fromPerNight: (price: string, currency: string) => `от ${price} ${currency} за ночь`,
      cta: "Проверить даты",
    },
    story: {
      photoAlt: "Озеро среди зелёных гор",
      scrollHint: "Листайте — посмотрим на озеро через тундук",
    },
    rooms: {
      title: "Три способа проснуться у воды",
      lead: "Цены за ночь с завтраком. Летом лучше бронировать за месяц — номеров всего двенадцать.",
      fromPrice: (price: string, currency: string) => `от ${price} ${currency} / ночь`,
      area: (m: number) => `${m} м²`,
      upToGuests: (n: number) => `до ${n} гостей`,
      bookThis: "Забронировать этот номер",
      ask: "Спросить",
      askMessage: (room: string) => `Здравствуйте! Подскажите, свободен ли «${room}» на мои даты?`,
    },
    amenities: { title: "Всё, чтобы не выходить за ворота" },
    experiences: { title: "Чем заняться на Иссык-Куле", hint: "Потяните карточки в сторону" },
    gallery: { title: "Как здесь выглядит день", open: (alt: string) => `Открыть фото: ${alt}` },
    location: { title: "Как добраться", map: (name: string) => `Карта: ${name}` },
    footer: {
      lead: "Лето на Иссык-Куле короткое. Выберите даты сейчас — подтвердим бронь в течение 15 минут.",
      disclaimer: "Демо-сайт. Название, цены и контакты вымышленные. Фото: Unsplash.",
    },
    dock: { waMessage: "Здравствуйте! Хочу узнать про свободные номера." },
  },

  booking: {
    title: "Бронирование",
    lead: "Выберите даты и номер — заявка уйдёт администратору в WhatsApp или Telegram. Отвечаем в течение 15 минут с 8:00 до 23:00.",
    dates: "Даты",
    room: "Номер",
    guests: "Гости",
    adults: "Взрослые",
    adultsHint: "от 14 лет",
    kids: "Дети",
    kidsHint: "до 14 лет",
    decrease: (label: string) => `Уменьшить: ${label}`,
    increase: (label: string) => `Увеличить: ${label}`,
    tooMany: (n: number) =>
      `В этом номере до ${n} гостей. Выберите семейный коттедж или напишите нам — подберём вариант.`,
    contacts: "Контакты",
    name: "Имя",
    phone: "Телефон",
    phonePlaceholder: "Телефон, например +996 555 123 456",
    note: "Пожелания",
    notePlaceholder: "Пожелания: трансфер, детская кроватка, поздний заезд",
    noDates: "даты не выбраны",
    nights: nightsRu,
    totalNote: "Итог подтвердит администратор, оплата при заезде",
    sendWhatsApp: "Отправить в WhatsApp",
    sendTelegram: "Отправить в Telegram",
    errors: {
      dates: "Выберите дату заезда и выезда в календаре",
      name: "Укажите имя",
      phone: "Укажите телефон, чтобы мы перезвонили",
    },
    toast: {
      whatsapp: "Заявка открыта в WhatsApp — осталось нажать «Отправить»",
      telegramCopied: "Текст заявки скопирован — вставьте его в чат Telegram",
      telegramFallback: "Откроем Telegram — напишите нам даты и количество гостей",
    },
    message: {
      hello: (hotel: string) => `Здравствуйте! Хочу забронировать в «${hotel}».`,
      room: "Номер",
      dates: "Даты",
      guests: (adults: number, kids: number) => `${adults} взр.${kids ? `, ${kids} дет.` : ""}`,
      guestsLabel: "Гости",
      name: "Имя",
      phone: "Телефон",
      note: "Пожелания",
      total: "Предварительно",
    },
  },
  appointment: {
    service: "Услуга",
    staff: "Специалист",
    anyStaff: "Любой свободный",
    date: "Дата",
    time: "Время",
    pickDateFirst: "Сначала выберите дату",
    noSlots: "На этот день свободного времени нет — выберите другой",
    guests: "Гостей",
    contacts: "Контакты",
    name: "Имя",
    phone: "Телефон",
    phonePlaceholder: "Телефон, например +996 555 123 456",
    note: "Комментарий",
    summary: "Ваша запись",
    notSelected: "не выбрано",
    confirmNote: "Администратор подтвердит запись в мессенджере",
    sendWhatsApp: "Отправить в WhatsApp",
    sendTelegram: "Отправить в Telegram",
    errors: {
      service: "Выберите услугу",
      date: "Выберите дату",
      time: "Выберите время",
      name: "Укажите имя",
      phone: "Укажите телефон, чтобы мы перезвонили",
    },
    toast: {
      whatsapp: "Заявка открыта в WhatsApp — осталось нажать «Отправить»",
      telegramCopied: "Текст заявки скопирован — вставьте его в чат Telegram",
      telegramFallback: "Откроем Telegram — напишите нам дату и время",
    },
    message: {
      hello: (business: string) => `Здравствуйте! Хочу записаться в «${business}».`,
      service: "Услуга",
      staff: "Специалист",
      when: "Когда",
      guests: "Гостей",
      name: "Имя",
      phone: "Телефон",
      note: "Комментарий",
    },
  },
};

export type Dictionary = typeof ru;
