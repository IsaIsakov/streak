import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3000;
const START_DATE = process.env.START_DATE || '2026-08-07';
const COUPLE_NAME = process.env.COUPLE_NAME || 'Мы';

function calculateDays(startDateString, now = new Date()) {
  const [year, month, day] = startDateString.split('-').map(Number);
  const start = new Date(Date.UTC(year, month - 1, day));
  const today = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
  const diff = Math.floor((today - start) / 86400000);
  return Math.max(0, diff + 1);
}

function nextMilestone(days) {
  const milestones = [50, 100, 200, 365, 500, 730, 1000];
  return milestones.find((m) => m > days) || days + 365;
}

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/streak', (req, res) => {
  const days = calculateDays(START_DATE);
  const next = nextMilestone(days);
  res.json({
    title: 'Our Flame',
    couple: COUPLE_NAME,
    startDate: START_DATE,
    daysTogether: days,
    streak: days,
    nextMilestone: next,
    daysToMilestone: next - days,
    emoji: '❤️‍🔥',
    updatedAt: new Date().toISOString()
  });
});

app.get('/health', (req, res) => res.json({ ok: true }));

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Our Flame is running on port ${PORT}`);
});
