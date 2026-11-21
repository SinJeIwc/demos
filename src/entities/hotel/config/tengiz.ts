import type { Locale } from "@/shared/i18n";
import { unsplash } from "@/shared/lib/messengers";
import type { Hotel } from "../model/types";

/**
 * Весь контент отеля на двух языках. Чтобы сделать сайт под реального клиента,
 * достаточно поменять этот файл: название, контакты, номера, цены и фото.
 * «Теңиз» — вымышленное название (по-кыргызски «море»), контакты — заглушки.
 */

type T = Record<Locale, string>;
const tx = (ru: string, en: string): T => ({ ru, en });

const data = {
  name: tx("Теңиз", "Tengiz"),
  fullName: tx("Теңиз Lake House", "Tengiz Lake House"),
  place: tx("Чолпон-Ата, северный берег Иссык-Куля", "Cholpon-Ata, north shore of Issyk-Kul"),
  address: tx(
    "Кыргызстан, Иссык-Кульская обл., г. Чолпон-Ата, ул. Береговая, 1",
    "1 Beregovaya St, Cholpon-Ata, Issyk-Kul Region, Kyrgyzstan",
  ),
  mapQuery: "Cholpon-Ata, Issyk-Kul",
  currency: tx("сом", "KGS"),

  contacts: {
    whatsapp: "996700000000",
    phoneDisplay: "+996 700 000 000",
    telegram: "tengiz_demo",
    instagram: "tengiz.demo",
  },

  hero: {
    image: unsplash("photo-1559310589-2673bfe16970"),
    title: { ru: ["Озеро,", "которое", "не замерзает"], en: ["The lake", "that never", "freezes"] },
    lead: tx(
      "Дом на первой линии Иссык-Куля: снежные пики напротив окон, тёплая вода с июня по сентябрь и тишина зимой.",
      "A house right on the Issyk-Kul shore: snowy peaks outside the windows, warm water from June to September and quiet winters.",
    ),
  },

  facts: [
    { value: tx("1 607 м", "1,607 m"), label: tx("над уровнем моря — воздух, ради которого сюда едут", "above sea level — the air people come here for") },
    { value: tx("40 м", "40 m"), label: tx("от террасы до воды, свой пляж с лежаками", "from the terrace to the water, private beach with loungers") },
    { value: tx("12", "12"), label: tx("номеров и коттеджей, никогда не бывает людно", "rooms and cottages, never crowded") },
  ],

  story: {
    title: tx("Небо через тундук", "The sky through a tunduk"),
    text: tx(
      "Тундук — деревянный круг в куполе юрты, через который видно небо. Мы построили дом вокруг этой идеи: в каждом номере окно, где вместо стены — озеро и хребет Кюнгёй Ала-Тоо.",
      "A tunduk is the wooden ring at the top of a yurt that frames the sky. We built the house around that idea: every room has a window where the wall gives way to the lake and the Kungey Ala-Too range.",
    ),
    image: unsplash("photo-1603979649806-5299879db16b"),
  },

  rooms: [
    {
      id: "lake-suite",
      name: tx("Сьют с видом на озеро", "Lake view suite"),
      summary: tx("Панорамное окно во всю стену, ванна у окна и терраса над пляжем.", "A floor-to-ceiling window, a bathtub by the glass and a terrace above the beach."),
      pricePerNight: 14500,
      area: 48,
      maxGuests: 3,
      bed: tx("Кровать king-size", "King-size bed"),
      image: unsplash("photo-1611892440504-42a792e24d32"),
      features: [tx("Терраса", "Terrace"), tx("Ванна у окна", "Bathtub by the window"), tx("Завтрак в номер", "Breakfast in the room")],
    },
    {
      id: "mountain-double",
      name: tx("Номер «Ала-Тоо»", "Ala-Too room"),
      summary: tx("Тихая сторона с видом на горы, утреннее солнце и рабочий стол у окна.", "The quiet side with mountain views, morning sun and a desk by the window."),
      pricePerNight: 9800,
      area: 30,
      maxGuests: 2,
      bed: tx("Двуспальная кровать", "Double bed"),
      image: unsplash("photo-1618773928121-c32242e63f39"),
      features: [tx("Вид на горы", "Mountain view"), tx("Рабочее место", "Workspace"), tx("Душ с тропическим лейком", "Rain shower")],
    },
    {
      id: "family-cottage",
      name: tx("Семейный коттедж", "Family cottage"),
      summary: tx("Две спальни, гостиная с камином и свой дворик с мангалом.", "Two bedrooms, a living room with a fireplace and a private yard with a grill."),
      pricePerNight: 22000,
      area: 76,
      maxGuests: 5,
      bed: tx("2 спальни", "2 bedrooms"),
      image: unsplash("photo-1583847268964-b28dc8f51f92"),
      features: [tx("Камин", "Fireplace"), tx("Дворик с мангалом", "Yard with a grill"), tx("Детская кроватка", "Baby cot")],
    },
  ],

  amenities: [
    { icon: "lake", title: tx("Свой пляж", "Private beach"), text: tx("Лежаки, полотенца и спасатель в сезон", "Loungers, towels and a lifeguard in season") },
    { icon: "pool", title: tx("Тёплый бассейн", "Heated pool"), text: tx("Открыт с мая по октябрь, вода +28°", "Open May to October, water at 28 °C") },
    { icon: "sauna", title: tx("Баня на дровах", "Wood-fired banya"), text: tx("С выходом к озеру и травяным чаем", "Steps from the lake, with herbal tea") },
    { icon: "kitchen", title: tx("Завтраки", "Breakfast"), text: tx("Боорсоки, каймак и местный мёд", "Boorsok, kaymak and local honey") },
    { icon: "transfer", title: tx("Трансфер", "Transfer"), text: tx("Из аэропорта Манас или Тамчы", "From Manas or Tamchy airport") },
    { icon: "wifi", title: tx("Быстрый Wi-Fi", "Fast Wi-Fi"), text: tx("По всей территории и на пляже", "Everywhere, including the beach") },
    { icon: "family", title: tx("Детям", "For kids"), text: tx("Площадка, бассейн-лягушатник, няня", "Playground, kids’ pool, babysitter") },
    { icon: "parking", title: tx("Парковка", "Parking"), text: tx("Охраняемая, бесплатно для гостей", "Guarded and free for guests") },
  ],

  experiences: [
    { icon: "horse", title: tx("Конная прогулка", "Horse riding"), text: tx("Два часа по предгорьям с проводником, подходит новичкам.", "Two hours in the foothills with a guide, beginner friendly."), image: unsplash("photo-1600298882525-1ac025c98b68") },
    { icon: "trek", title: tx("Ущелье Григорьевка", "Grigorievka gorge"), text: tx("Однодневная поездка к горным озёрам и ельникам.", "A day trip to mountain lakes and spruce forests."), image: unsplash("photo-1596003903067-bf5762ad5c19") },
    { icon: "yurt", title: tx("Ночь в юрте", "A night in a yurt"), text: tx("Юрта на берегу, ужин из казана и звёзды без засветки.", "A yurt on the shore, dinner from the kazan and stars with no light pollution."), image: unsplash("photo-1473448912268-2022ce9509d8") },
    { icon: "fire", title: tx("Ужин на закате", "Sunset dinner"), text: tx("Стол на пирсе, рыба из озера и закат над хребтом.", "A table on the pier, fish from the lake and the sun setting over the ridge."), image: unsplash("photo-1778694276945-a3ee92331709") },
  ],

  gallery: [
    { src: unsplash("photo-1445019980597-93fa8acb246c"), alt: tx("Лежаки у бассейна с видом на горы", "Pool loungers with a mountain view") },
    { src: unsplash("photo-1518860308377-800f02d5498a"), alt: tx("Ванна с видом на воду", "Bathtub overlooking the water") },
    { src: unsplash("photo-1621293954908-907159247fc8"), alt: tx("Лобби с деревянными стенами", "Lobby with wooden walls") },
    { src: unsplash("photo-1414235077428-338989a2e8c0"), alt: tx("Блюдо от шефа", "A dish from the chef") },
    { src: unsplash("photo-1593067222087-55aa1fc931e3"), alt: tx("Деревянный пирс над водой", "Wooden pier over the water") },
    { src: unsplash("photo-1571502297375-0fe3ea2d1d48"), alt: tx("Горное озеро под голубым небом", "Mountain lake under a blue sky") },
  ],

  places: {
    ru: ["Чолпон-Ата", "Григорьевка", "Семёновка", "Кюнгёй Ала-Тоо", "Бостери", "Тамчы", "Каракол"],
    en: ["Cholpon-Ata", "Grigorievka", "Semenovka", "Kungey Ala-Too", "Bosteri", "Tamchy", "Karakol"],
  },

  routes: [
    { from: tx("Бишкек", "Bishkek"), how: tx("4 часа на машине по трассе через Боом", "4 hours by car through the Boom gorge") },
    { from: tx("Аэропорт Манас", "Manas Airport"), how: tx("4,5 часа, трансфер от отеля", "4.5 hours, hotel transfer available") },
    { from: tx("Аэропорт Тамчы", "Tamchy Airport"), how: tx("35 минут, летние рейсы", "35 minutes, summer flights") },
  ],
} as const;

/** Контент отеля на нужном языке */
export function getHotel(l: Locale): Hotel {
  return {
    name: data.name[l],
    fullName: data.fullName[l],
    place: data.place[l],
    address: data.address[l],
    mapQuery: data.mapQuery,
    currency: data.currency[l],
    contacts: { ...data.contacts },
    hero: { image: data.hero.image, title: [...data.hero.title[l]], lead: data.hero.lead[l] },
    facts: data.facts.map((f) => ({ value: f.value[l], label: f.label[l] })),
    story: { title: data.story.title[l], text: data.story.text[l], image: data.story.image },
    rooms: data.rooms.map((r) => ({
      id: r.id,
      name: r.name[l],
      summary: r.summary[l],
      pricePerNight: r.pricePerNight,
      area: r.area,
      maxGuests: r.maxGuests,
      bed: r.bed[l],
      image: r.image,
      features: r.features.map((f) => f[l]),
    })),
    amenities: data.amenities.map((a) => ({ icon: a.icon, title: a.title[l], text: a.text[l] })),
    experiences: data.experiences.map((e) => ({ icon: e.icon, title: e.title[l], text: e.text[l], image: e.image })),
    gallery: data.gallery.map((g) => ({ src: g.src, alt: g.alt[l] })),
    places: [...data.places[l]],
    routes: data.routes.map((r) => ({ from: r.from[l], how: r.how[l] })),
  };
}
