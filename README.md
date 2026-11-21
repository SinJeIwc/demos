# demos

Демо-сайты для бизнеса на одном домене. Каждый бизнес живёт в своём роуте:
`/hotel` — отель на Иссык-Куле. Следующие на очереди: `/clinic`, `/restaurant`, `/beauty`.

## Запуск

```bash
npm install
npm run dev
```

Откройте http://localhost:3000 (список демо) и http://localhost:3000/hotel.

## Стек

- **Next.js 15** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS v4**: токены цветов и шрифтов в `src/app/_styles/globals.css`
- **Motion**: анимации, скролл-эффекты, drag
- **Lenis**: плавный скролл
- **React Three Fiber + three.js**: 3D-тундук на странице отеля
- **react-day-picker + date-fns**: календарь брони
- **sonner**: уведомления
- **react-icons**: только логотипы мессенджеров; остальные иконки свои (`src/shared/ui/icons`)
- Шрифты: Unbounded и Onest через `next/font`, с кириллицей

## Языки

Русский и английский: `/ru/...` и `/en/...`. Адреса без языка (`/`, `/hotel`) middleware
перенаправляет на язык из переключателя (cookie) или браузера, по умолчанию — русский.

- Тексты интерфейса — `src/shared/i18n/dictionaries/ru.ts` и `en.ts`. Русский словарь — эталон,
  TypeScript не даст забыть ключ в английском.
- Контент бизнеса (номера, цены, описания) — в его entity, например `src/entities/hotel/config/tengiz.ts`,
  сразу на двух языках.
- Все страницы на обоих языках собираются статически при сборке.

## Архитектура (Feature-Sliced Design)

```
src/
  app/                    — роутинг Next.js (тонкий слой) + _providers, _styles
    [locale]/             — главная, /hotel, 404; layout задаёт язык страницы
    icon.svg, sitemap.ts, robots.ts, manifest.ts
  middleware.ts           — выбор языка
  views/                  — страницы целиком (слой pages в FSD)
    home/, hotel/
  widgets/                — крупные секции страниц
    site-header, demo-showcase, hotel-hero, hotel-rooms, hotel-booking, ...
  features/               — действия пользователя
    hotel-booking/        — форма брони и отправка заявки в мессенджер
    locale-switcher/      — переключение RU/EN
  entities/               — бизнес-сущности и их контент
    hotel/                — данные отеля, типы, знак-тундук
    demo/                 — реестр демо для главной
  shared/                 — переиспользуемое без бизнес-логики
    ui/ (icons, brand), lib/, i18n/, config/
```

Правила: слой импортирует только слои ниже себя (`views → widgets → features → entities → shared`),
а другие слайсы — только через их `index.ts`.

**Сайт под реального клиента:** поменять `src/entities/hotel/config/tengiz.ts`
(название, контакты, номера, цены, фото на двух языках). Разметку трогать не нужно.

**Новый бизнес:** `entities/<бизнес>` → `widgets/<бизнес>-*` → `views/<бизнес>` →
роут `src/app/[locale]/<slug>/page.tsx` → запись в `src/entities/demo/model/registry.ts`.

## Как работает бронь

Гость выбирает даты, номер и количество гостей. Сайт считает ночи и предварительную сумму
и собирает текст заявки:
- **WhatsApp** — открывается чат с уже заполненным сообщением;
- **Telegram** — текст копируется в буфер, открывается чат отеля.

Сервер и база не нужны: заявка сразу приходит администратору в мессенджер.

## Деплой

Проще всего на Vercel: залить репозиторий на GitHub → vercel.com → New Project → импорт `demos`.
Каждый push в `main` автоматически деплоится. Свой домен подключается в настройках проекта.

## Фото

Все фото с Unsplash (бесплатная лицензия), грузятся через `src/lib/image-loader.ts`
сразу нужного размера. Для реального клиента замените ссылки в `src/entities/hotel/config/tengiz.ts` на его фото
(можно положить в `public/` и указать путь `/photo.jpg`).
