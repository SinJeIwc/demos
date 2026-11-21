import { localize, tx, type Locale } from "@/shared/i18n";
import { unsplash } from "@/shared/lib/messengers";

/**
 * Контент ресторана на двух языках. «Тамыр» — вымышленное название
 * (по-кыргызски «корень»), меню, цены и контакты — примеры для демо.
 */
const photo = {
  hero: unsplash("photo-1774989423979-6a7bf5add3f0"),
  chef: unsplash("photo-1663530761401-15eefb544889"),
  hall: unsplash("photo-1766832255363-c9f060ade8b0"),
  plate: unsplash("photo-1414235077428-338989a2e8c0"),
  fish: unsplash("photo-1676471926534-d5c9771909fa"),
  close: unsplash("photo-1560053608-13721e0d69e8"),
  wine: unsplash("photo-1574966739987-65e38db0f7ce"),
  tables: unsplash("photo-1773100627019-20a9d4e4c4f7"),
  formal: unsplash("photo-1770319675767-9e97855ef639"),
  people: unsplash("photo-1590846406792-0adc7f938f1d"),
  night: unsplash("photo-1579027989536-b7b1f875659b"),
};

const content = {
  name: tx("Тамыр", "Tamyr"),
  fullName: tx("Ресторан «Тамыр»", "Tamyr Restaurant"),
  tagline: tx("Кухня Центральной Азии без лишнего", "Central Asian cooking, nothing extra"),
  address: tx("Бишкек, ул. Токтогула, 125", "125 Toktogul St, Bishkek"),
  mapQuery: "Toktogul Street, Bishkek",
  hours: tx("Ежедневно 12:00–00:00, кухня до 23:00", "Daily 12:00–00:00, kitchen until 23:00"),
  currency: tx("сом", "KGS"),
  contacts: { whatsapp: "996700000002", phoneDisplay: "+996 700 000 002", telegram: "tamyr_demo", instagram: "tamyr.demo" },
  cta: tx("Забронировать стол", "Book a table"),

  nav: {
    story: tx("О нас", "About"),
    menu: tx("Меню", "Menu"),
    gallery: tx("Атмосфера", "Atmosphere"),
    reservation: tx("Бронь", "Reservation"),
    contacts: tx("Контакты", "Contacts"),
  },

  hero: {
    image: photo.hero,
    imageAlt: tx("Зал ресторана с тёплым светом", "Restaurant hall in warm light"),
    lead: tx(
      "Бешбармак, лагман и форель из Иссык-Куля — по семейным рецептам, на хороших продуктах и с открытой кухней.",
      "Beshbarmak, hand-pulled lagman and Issyk-Kul trout — family recipes, good produce and an open kitchen.",
    ),
    menuLink: tx("Смотреть меню", "See the menu"),
  },

  story: {
    title: tx("Готовим так, как готовили дома", "We cook the way it was done at home"),
    text: tx(
      "Тесто для лагмана тянем вручную каждое утро, мясо берём у фермеров из Нарына, лепёшки печём в тандыре прямо в зале. Никаких полуфабрикатов — поэтому меню короткое.",
      "We pull lagman dough by hand every morning, source meat from farmers in Naryn and bake flatbread in a tandoor right in the hall. No ready-made shortcuts — which is why the menu is short.",
    ),
    images: [
      { src: photo.chef, alt: tx("Шеф поливает блюдо соусом", "Chef pouring sauce over a dish") },
      { src: photo.hall, alt: tx("Столы в уютном зале", "Tables in a cosy hall") },
    ],
    facts: [
      { value: tx("80", "80"), label: tx("мест в зале и на террасе", "seats inside and on the terrace") },
      { value: tx("1", "1"), label: tx("тандыр прямо в зале", "tandoor right in the hall") },
    ],
  },

  menu: {
    title: tx("Меню", "Menu"),
    note: tx("Наведите на блюдо, чтобы увидеть фото", "Hover over a dish to see a photo"),
    categories: [
      {
        id: "starters",
        name: tx("Закуски", "Starters"),
        items: [
          { name: tx("Чучук с хрустящим хлебом", "Chuchuk with crispy bread"), desc: tx("Домашняя конская колбаса, маринованный лук", "House-made horse sausage, pickled onion"), price: 650, image: photo.close },
          { name: tx("Печёный перец с айраном", "Roasted peppers with ayran"), desc: tx("Перец на углях, зелень, кислое молоко", "Charred peppers, herbs, sour milk"), price: 520, image: photo.plate },
          { name: tx("Самса с тыквой", "Pumpkin samsa"), desc: tx("Слоёное тесто из тандыра, сладкий лук", "Tandoor puff pastry, sweet onion"), price: 290, image: photo.close },
        ],
      },
      {
        id: "mains",
        name: tx("Горячее", "Mains"),
        items: [
          { name: tx("Бешбармак из баранины", "Lamb beshbarmak"), desc: tx("Тонкое тесто, бульон, лук — подаём на большом блюде", "Thin noodles, broth, onion — served on a shared platter"), price: 980, image: photo.plate },
          { name: tx("Лагман ручной тяги", "Hand-pulled lagman"), desc: tx("Говядина, овощи вок, острое масло по желанию", "Beef, wok vegetables, chilli oil on request"), price: 620, image: photo.chef },
          { name: tx("Иссык-кульская форель на углях", "Issyk-Kul trout on coals"), desc: tx("Целиком, с лимоном и печёным картофелем", "Whole fish, lemon and baked potatoes"), price: 1450, image: photo.fish },
        ],
      },
      {
        id: "tandoor",
        name: tx("Из тандыра", "From the tandoor"),
        items: [
          { name: tx("Тандыр-нан с травами", "Herb tandoor naan"), desc: tx("Горячая лепёшка, сливочное масло", "Hot flatbread, butter"), price: 180, image: photo.close },
          { name: tx("Баранья нога на двоих", "Lamb leg for two"), desc: tx("Томится 6 часов, подаём с соусами", "Slow-cooked for 6 hours, served with sauces"), price: 2400, image: photo.chef },
        ],
      },
      {
        id: "desserts",
        name: tx("Десерты", "Desserts"),
        items: [
          { name: tx("Чак-чак с горным мёдом", "Chak-chak with mountain honey"), desc: tx("Хрустящее тесто, мёд из Таласа", "Crisp dough, honey from Talas"), price: 380, image: photo.plate },
          { name: tx("Мороженое из каймака", "Kaymak ice cream"), desc: tx("С облепихой и грецким орехом", "With sea buckthorn and walnut"), price: 420, image: photo.close },
        ],
      },
    ],
  },

  gallery: {
    title: tx("Атмосфера", "Atmosphere"),
    images: [
      { src: photo.tables, alt: tx("Сервированные столы", "Set tables") },
      { src: photo.wine, alt: tx("Бокалы на столе", "Glasses on the table") },
      { src: photo.people, alt: tx("Гости в зале", "Guests in the hall") },
      { src: photo.formal, alt: tx("Банкетный зал", "Banquet hall") },
      { src: photo.night, alt: tx("Терраса вечером", "Terrace in the evening") },
      { src: photo.fish, alt: tx("Рыба с овощами", "Fish with vegetables") },
    ],
  },

  reservation: {
    title: tx("Бронь стола", "Book a table"),
    lead: tx("Выберите дату, время и количество гостей — подтвердим бронь в мессенджере.", "Choose a date, time and party size — we’ll confirm in the messenger."),
    banquet: tx("Банкет или большая компания? Напишите в WhatsApp — соберём меню.", "Banquet or a big group? Message us on WhatsApp and we’ll put a menu together."),
  },

  location: {
    title: tx("Ждём в гости", "Come visit"),
    map: tx("Карта: ресторан «Тамыр»", "Map: Tamyr Restaurant"),
  },
  footer: {
    disclaimer: tx("Демо-сайт. Название, меню, цены и контакты вымышленные. Фото: Unsplash.", "Demo website. Name, menu, prices and contacts are fictional. Photos: Unsplash."),
  },
  dock: { waMessage: tx("Здравствуйте! Хочу забронировать стол.", "Hello! I’d like to book a table.") },
};

export const getRestaurant = (locale: Locale) => localize(content, locale);
export type Restaurant = ReturnType<typeof getRestaurant>;
