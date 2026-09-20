const quotePool = [
  'Каждый день — ещё одна страница нашей истории.',
  'Наш маленький огонёк становится сильнее каждый день.',
  'Не стрик ради цифры. Цифра ради памяти.',
  'Ещё один день вместе. Ещё один повод улыбнуться.',
  'Пока горит это сердце — продолжается наша история.'
];

async function loadStreak() {
  try {
    const response = await fetch('/api/streak', { cache: 'no-store' });
    const data = await response.json();

    document.querySelector('#daysCounter').textContent = data.daysTogether;
    document.querySelector('#streakValue').textContent = `${data.streak} дней`;
    document.querySelector('#milestoneValue').textContent = `${data.daysToMilestone} дней`;
    document.querySelector('#widgetDays').textContent = data.daysTogether;

    const quote = quotePool[data.daysTogether % quotePool.length];
    document.querySelector('#dailyQuote').textContent = quote;
  } catch (error) {
    document.querySelector('#dailyQuote').textContent = 'Наш огонёк временно не может обновиться ❤️‍🔥';
  }
}

const shareButton = document.querySelector('#shareButton');
shareButton.addEventListener('click', async () => {
  const shareData = {
    title: 'Our Flame ❤️‍🔥',
    text: 'Наш личный огонёк ❤️‍🔥',
    url: window.location.href
  };

  if (navigator.share) {
    await navigator.share(shareData).catch(() => {});
  } else {
    await navigator.clipboard.writeText(window.location.href);
    shareButton.textContent = '✓';
    setTimeout(() => (shareButton.textContent = '↗'), 1200);
  }
});

loadStreak();
