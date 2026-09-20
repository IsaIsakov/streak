# Our Flame ❤️‍🔥

Приватный сайт-счётчик отношений + API для будущего iPhone-виджета через Widgy/Scriptable.

## Railway

1. Создай новый Empty Project / GitHub deployment.
2. Загрузи файлы проекта.
3. Railway сам выполнит `npm install` и `npm start`.
4. При необходимости добавь переменные:
   - `START_DATE=2026-08-07`
   - `COUPLE_NAME=Мы`

## API

`GET /api/streak`

Возвращает:
- `startDate`
- `daysTogether`
- `streak`
- `nextMilestone`
- `daysToMilestone`
- `emoji`

Этот endpoint позже подключаем к Widgy.

## Фото

Сейчас используется `public/couple-placeholder.svg`.
Для вашей фотографии достаточно заменить фон в `.photo-layer` и `.widget-photo` на файл, например `/photo.jpg`.
