import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PUBLIC_DIR = path.join(__dirname, 'public');

const PORT = Number(process.env.PORT) || 3000;
const START_DATE = process.env.START_DATE || '2026-08-07';
const COUPLE_NAME = process.env.COUPLE_NAME || 'Мы';

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon'
};

function datePartsInAlmaty(now = new Date()) {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Almaty',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).formatToParts(now);

  const value = (type) => Number(parts.find((p) => p.type === type)?.value);
  return { year: value('year'), month: value('month'), day: value('day') };
}

function calculateDays(startDateString, now = new Date()) {
  const [year, month, day] = startDateString.split('-').map(Number);
  const startUtc = Date.UTC(year, month - 1, day);
  const today = datePartsInAlmaty(now);
  const todayUtc = Date.UTC(today.year, today.month - 1, today.day);
  return Math.max(0, Math.floor((todayUtc - startUtc) / 86400000) + 1);
}

function nextMilestone(days) {
  const milestones = [50, 100, 200, 365, 500, 730, 1000];
  return milestones.find((m) => m > days) || days + 365;
}

function sendJson(res, status, data) {
  const body = JSON.stringify(data);
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
    'X-Content-Type-Options': 'nosniff'
  });
  res.end(body);
}

function sendFile(res, filePath, status = 200) {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Our Flame could not load this page.');
      return;
    }

    const type = MIME[path.extname(filePath).toLowerCase()] || 'application/octet-stream';
    res.writeHead(status, {
      'Content-Type': type,
      'X-Content-Type-Options': 'nosniff',
      'Referrer-Policy': 'no-referrer'
    });
    res.end(data);
  });
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url || '/', `http://${req.headers.host || 'localhost'}`);
  const pathname = decodeURIComponent(url.pathname);

  if (req.method !== 'GET' && req.method !== 'HEAD') {
    sendJson(res, 405, { error: 'Method not allowed' });
    return;
  }

  if (pathname === '/health') {
    sendJson(res, 200, { ok: true, service: 'our-flame' });
    return;
  }

  if (pathname === '/api/streak') {
    const days = calculateDays(START_DATE);
    const next = nextMilestone(days);
    sendJson(res, 200, {
      title: 'Our Flame',
      couple: COUPLE_NAME,
      startDate: START_DATE,
      daysTogether: days,
      streak: days,
      nextMilestone: next,
      daysToMilestone: next - days,
      emoji: '❤️‍🔥',
      timezone: 'Asia/Almaty',
      updatedAt: new Date().toISOString()
    });
    return;
  }

  if (pathname === '/') {
    sendFile(res, path.join(PUBLIC_DIR, 'index.html'));
    return;
  }

  const normalized = path.normalize(pathname).replace(/^(\.\.(\/|\\|$))+/, '');
  const relative = normalized.replace(/^[/\\]+/, '');
  const assetPath = path.join(PUBLIC_DIR, relative);

  if (assetPath.startsWith(PUBLIC_DIR) && fs.existsSync(assetPath) && fs.statSync(assetPath).isFile()) {
    sendFile(res, assetPath);
    return;
  }

  // SPA fallback: unknown browser routes still open the site.
  sendFile(res, path.join(PUBLIC_DIR, 'index.html'), 200);
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Our Flame ❤️‍🔥 running on port ${PORT}`);
});
