import type { IconName } from "@/shared/ui/icons";

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

export type Hotel = {
  name: string;
  fullName: string;
  place: string;
  address: string;
  mapQuery: string;
  currency: string;
  contacts: { whatsapp: string; phoneDisplay: string; telegram: string; instagram: string };
  hero: { image: string; title: string[]; lead: string };
  facts: { value: string; label: string }[];
  story: { title: string; text: string; image: string };
  rooms: Room[];
  amenities: { icon: IconName; title: string; text: string }[];
  experiences: { icon: IconName; title: string; text: string; image: string }[];
  gallery: { src: string; alt: string }[];
  places: string[];
  routes: { from: string; how: string }[];
};
