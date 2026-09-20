# Our Flame ❤️‍🔥

Сайт + API для личного стрика пары.

## Railway

В корне проекта должны лежать:

- `package.json`
- `server.js`
- `railway.json`
- папка `public/`

Railway запускает `npm start`.

Переменные окружения необязательны:

- `START_DATE=2026-08-07`
- `COUPLE_NAME=Мы`

Проверка после деплоя:

- `/` — сайт
- `/health` — состояние сервера
- `/api/streak` — данные для виджета

Дата считается по часовому поясу `Asia/Almaty`.
