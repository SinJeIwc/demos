import type { IconName } from "@/components/icons/draw-icon";
import { unsplash } from "@/lib/messengers";

/**
 * Весь контент отеля в одном месте. Чтобы сделать сайт под реального клиента,
 * достаточно поменять этот файл: название, контакты, номера, цены и фото.
 * Название «Теңиз» вымышленное (по-кыргызски «море»), контакты — заглушки.
 */

export type Room = {
  id: string;
  name: string;
  summary: string;
  pricePerNight: number;
  area: number;
  maxGuests: number;
  bed: string;
  image: string;
  features: string[];
};

export const hotel = {
  name: "Теңиз",
  fullName: "Теңиз Lake House",
  place: "Чолпон-Ата, северный берег Иссык-Куля",
  address: "Кыргызстан, Иссык-Кульская обл., г. Чолпон-Ата, ул. Береговая, 1",
  mapQuery: "Cholpon-Ata, Issyk-Kul",
  currency: "сом",

  contacts: {
    whatsapp: "996700000000",
    phoneDisplay: "+996 700 000 000",
    telegram: "tengiz_demo",
    instagram: "tengiz.demo",
  },

  hero: {
    image: unsplash("photo-1559310589-2673bfe16970"),
    title: ["Озеро,", "которое", "не замерзает"],
    lead: "Дом на первой линии Иссык-Куля: снежные пики напротив окон, тёплая вода с июня по сентябрь и тишина зимой.",
  },

  facts: [
    { value: "1 607 м", label: "над уровнем моря — воздух, ради которого сюда едут" },
    { value: "40 м", label: "от террасы до воды, свой пляж с лежаками" },
    { value: "12", label: "номеров и коттеджей, никогда не бывает людно" },
  ],

  story: {
    title: "Небо через тундук",
    text: "Тундук — деревянный круг в куполе юрты, через который видно небо. Мы построили дом вокруг этой идеи: в каждом номере окно, где вместо стены — озеро и хребет Кюнгёй Ала-Тоо.",
    image: unsplash("photo-1603979649806-5299879db16b"),
  },

  rooms: [
    {
      id: "lake-suite",
      name: "Сьют с видом на озеро",
      summary: "Панорамное окно во всю стену, ванна у окна и терраса над пляжем.",
      pricePerNight: 14500,
      area: 48,
      maxGuests: 3,
      bed: "Кровать king-size",
      image: unsplash("photo-1611892440504-42a792e24d32"),
      features: ["Терраса", "Ванна у окна", "Завтрак в номер"],
    },
    {
      id: "mountain-double",
      name: "Номер «Ала-Тоо»",
      summary: "Тихая сторона с видом на горы, утреннее солнце и рабочий стол у окна.",
      pricePerNight: 9800,
      area: 30,
      maxGuests: 2,
      bed: "Двуспальная кровать",
      image: unsplash("photo-1618773928121-c32242e63f39"),
      features: ["Вид на горы", "Рабочее место", "Душ с тропическим лейком"],
    },
    {
      id: "family-cottage",
      name: "Семейный коттедж",
      summary: "Две спальни, гостиная с камином и свой дворик с мангалом.",
      pricePerNight: 22000,
      area: 76,
      maxGuests: 5,
      bed: "2 спальни",
      image: unsplash("photo-1583847268964-b28dc8f51f92"),
      features: ["Камин", "Дворик с мангалом", "Детская кроватка"],
    },
  ] satisfies Room[],

  amenities: [
    { icon: "lake", title: "Свой пляж", text: "Лежаки, полотенца и спасатель в сезон" },
    { icon: "pool", title: "Тёплый бассейн", text: "Открыт с мая по октябрь, вода +28°" },
    { icon: "sauna", title: "Баня на дровах", text: "С выходом к озеру и травяным чаем" },
    { icon: "kitchen", title: "Завтраки", text: "Боорсоки, каймак и местный мёд" },
    { icon: "transfer", title: "Трансфер", text: "Из аэропорта Манас или Тамчы" },
    { icon: "wifi", title: "Быстрый Wi-Fi", text: "По всей территории и на пляже" },
    { icon: "family", title: "Детям", text: "Площадка, бассейн-лягушатник, няня" },
    { icon: "parking", title: "Парковка", text: "Охраняемая, бесплатно для гостей" },
  ] satisfies { icon: IconName; title: string; text: string }[],

  experiences: [
    {
      icon: "horse",
      title: "Конная прогулка",
      text: "Два часа по предгорьям с проводником, подходит новичкам.",
      image: unsplash("photo-1600298882525-1ac025c98b68"),
    },
    {
      icon: "trek",
      title: "Ущелье Григорьевка",
      text: "Однодневная поездка к горным озёрам и ельникам.",
      image: unsplash("photo-1596003903067-bf5762ad5c19"),
    },
    {
      icon: "yurt",
      title: "Ночь в юрте",
      text: "Юрта на берегу, ужин из казана и звёзды без засветки.",
      image: unsplash("photo-1473448912268-2022ce9509d8"),
    },
    {
      icon: "fire",
      title: "Ужин на закате",
      text: "Стол на пирсе, рыба из озера и закат над хребтом.",
      image: unsplash("photo-1778694276945-a3ee92331709"),
    },
  ] satisfies { icon: IconName; title: string; text: string; image: string }[],

  gallery: [
    { src: unsplash("photo-1445019980597-93fa8acb246c"), alt: "Лежаки у бассейна с видом на горы" },
    { src: unsplash("photo-1518860308377-800f02d5498a"), alt: "Ванна с видом на воду" },
    { src: unsplash("photo-1621293954908-907159247fc8"), alt: "Лобби с деревянными стенами" },
    { src: unsplash("photo-1414235077428-338989a2e8c0"), alt: "Блюдо от шефа" },
    { src: unsplash("photo-1593067222087-55aa1fc931e3"), alt: "Деревянный пирс над водой" },
    { src: unsplash("photo-1571502297375-0fe3ea2d1d48"), alt: "Горное озеро под голубым небом" },
  ],
};

export type Hotel = typeof hotel;
