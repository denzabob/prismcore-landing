# Призма — Лендинг MVP

Одностраничный лендинг для сметного приложения «Призма» с формой заявки на тестовый период.

## Техстек

- **Next.js 15** + TypeScript + App Router
- **Tailwind CSS v4** + shadcn/ui
- **Prisma** + SQLite
- **zod** — валидация форм (клиент + сервер)
- **next-themes** — поддержка тёмной темы
- **lucide-react** — иконки

## Быстрый старт

```bash
# 1. Установить зависимости
npm install

# 2. Скопировать и настроить .env
cp .env.example .env
# Отредактируйте ADMIN_TOKEN в .env

# 3. Применить миграции (создаст SQLite БД)
npx prisma migrate dev

# 4. Запустить dev-сервер
npm run dev
```

Приложение будет доступно по адресу [http://localhost:3000](http://localhost:3000).

## Структура

```
src/
├── app/
│   ├── page.tsx              # Главная (лендинг)
│   ├── layout.tsx            # Root layout + SEO мета
│   ├── globals.css           # Tailwind + shadcn variables
│   ├── admin/page.tsx        # Админка (просмотр лидов)
│   └── api/
│       ├── lead/route.ts     # POST /api/lead — приём заявок
│       └── admin/
│           ├── leads/route.ts  # GET/PATCH — список лидов
│           └── export/route.ts # GET — экспорт CSV
├── components/
│   ├── ui/                   # shadcn/ui компоненты
│   ├── header.tsx            # Навигация + тема
│   ├── hero.tsx              # Hero-секция
│   ├── audience.tsx          # Кому подходит
│   ├── features.tsx          # Что внутри
│   ├── how-it-works.tsx      # Как это работает
│   ├── trust.tsx             # Доверие
│   ├── lead-form.tsx         # Форма заявки
│   └── footer.tsx            # Подвал
├── lib/
│   ├── prisma.ts             # Singleton Prisma Client
│   ├── validators.ts         # Zod-схемы
│   ├── rate-limit.ts         # In-memory rate limiter
│   └── utils.ts              # cn() утилита
prisma/
├── schema.prisma             # Модель Lead
└── migrations/               # Миграция SQLite
```

## Переменные окружения

| Переменная     | Описание                           | По умолчанию         |
|---------------|------------------------------------|--------------------|
| `DATABASE_URL` | Путь к SQLite файлу                | `file:./dev.db`     |
| `ADMIN_TOKEN`  | Токен доступа к /admin              | `prisma-admin-2026` |
| `SITE_URL`     | URL сайта (для OG-тегов, опционально) | `http://localhost:3000` |

## API Endpoints

### `POST /api/lead`
Приём заявок с лендинга.

**Body (JSON):**
```json
{
  "name": "Иван Иванов",
  "activity": "Эксперт",
  "email": "ivan@example.com",
  "phone": "+7 999 123-45-67",
  "comment": "Хочу автоматизировать сметы",
  "consent": true
}
```

**Защита:** honeypot-поле `website`, rate-limit 5 запросов/час на IP.

### `GET /api/admin/leads?token=ADMIN_TOKEN`
Список лидов с пагинацией и поиском.

**Параметры:** `token`, `search`, `page`

### `PATCH /api/admin/leads?token=ADMIN_TOKEN`
Обновление статуса лида.

**Body:** `{ "id": 1, "status": "contacted" }`

### `GET /api/admin/export?token=ADMIN_TOKEN`
Скачать все лиды в CSV.

## Админка

Открыть: [http://localhost:3000/admin](http://localhost:3000/admin)

Способы авторизации:
1. Ввести токен в форме на странице /admin
2. Перейти по URL: `/admin?token=YOUR_TOKEN`

Возможности:
- Просмотр заявок с сортировкой по дате
- Поиск по имени, email, телефону
- Отметка «Связались» (new → contacted)
- Экспорт CSV

## Где менять тексты

Все тексты находятся непосредственно в компонентах:
- Hero: `src/components/hero.tsx`
- Аудитория: `src/components/audience.tsx`
- Возможности: `src/components/features.tsx`
- Шаги: `src/components/how-it-works.tsx`
- Доверие: `src/components/trust.tsx`
- Футер: `src/components/footer.tsx`

## Лицензия

Проприетарный проект. Все права защищены.
