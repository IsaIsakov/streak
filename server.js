import http from 'http';

const PORT = Number(process.env.PORT) || 3000;
const START_DATE = process.env.START_DATE || '2026-08-07';
const COUPLE_NAME = process.env.COUPLE_NAME || 'Мы';

function datePartsInAlmaty(now = new Date()) {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Almaty', year: 'numeric', month: '2-digit', day: '2-digit'
  }).formatToParts(now);
  const n = (t) => Number(parts.find((p) => p.type === t)?.value);
  return { year: n('year'), month: n('month'), day: n('day') };
}
function daysTogether(now = new Date()) {
  const [y,m,d] = START_DATE.split('-').map(Number);
  const start = Date.UTC(y,m-1,d);
  const t = datePartsInAlmaty(now);
  return Math.max(0, Math.floor((Date.UTC(t.year,t.month-1,t.day)-start)/86400000)+1);
}
function nextMilestone(days){
  return [50,100,200,365,500,730,1000].find(x=>x>days) || days+365;
}
function json(res,status,data){
  res.writeHead(status,{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store'});
  res.end(JSON.stringify(data));
}

const html = `<!doctype html>
<html lang="ru"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<meta name="theme-color" content="#12080c"><title>Our Flame ❤️‍🔥</title>
<style>
*{box-sizing:border-box}html,body{margin:0;min-height:100%;font-family:-apple-system,BlinkMacSystemFont,"SF Pro Display","Segoe UI",sans-serif;background:#10070b;color:#fff}body{min-height:100vh;overflow-x:hidden}
.bg{position:fixed;inset:0;background:radial-gradient(circle at 50% 20%,rgba(255,70,90,.23),transparent 34%),radial-gradient(circle at 20% 80%,rgba(255,128,74,.14),transparent 34%),linear-gradient(160deg,#1b0a10,#090608 65%);z-index:-2}.noise{position:fixed;inset:0;opacity:.22;z-index:-1;background-image:radial-gradient(rgba(255,255,255,.18) .6px,transparent .6px);background-size:8px 8px;mask-image:linear-gradient(to bottom,rgba(0,0,0,.6),transparent)}
.wrap{width:min(100%,430px);margin:auto;padding:calc(env(safe-area-inset-top) + 28px) 18px calc(env(safe-area-inset-bottom) + 30px)}.eyebrow{text-align:center;text-transform:uppercase;letter-spacing:.28em;font-size:11px;color:rgba(255,255,255,.52);font-weight:700}.title{text-align:center;margin:10px 0 4px;font-size:28px;letter-spacing:-.04em}.subtitle{text-align:center;color:rgba(255,255,255,.56);font-size:13px;margin:0 0 24px}
.hero{position:relative;border:1px solid rgba(255,255,255,.11);background:linear-gradient(155deg,rgba(255,255,255,.12),rgba(255,255,255,.035));backdrop-filter:blur(22px);-webkit-backdrop-filter:blur(22px);border-radius:34px;padding:30px 22px 22px;box-shadow:0 24px 70px rgba(0,0,0,.45),inset 0 1px rgba(255,255,255,.12);overflow:hidden}.hero:before{content:"";position:absolute;width:220px;height:220px;border-radius:50%;background:rgba(255,52,82,.13);filter:blur(30px);left:50%;top:50px;transform:translateX(-50%)}
.flame{position:relative;width:150px;height:150px;margin:0 auto 8px;display:grid;place-items:center;filter:drop-shadow(0 14px 30px rgba(255,53,76,.35));animation:float 3.2s ease-in-out infinite}.heart{position:relative;font-size:94px;line-height:1;animation:pulse 1.7s ease-in-out infinite;z-index:3}.glow{position:absolute;width:110px;height:110px;border-radius:50%;background:rgba(255,44,72,.38);filter:blur(30px);animation:glow 1.7s ease-in-out infinite}.spark{position:absolute;width:7px;height:7px;border-radius:50%;background:#ffd59a;box-shadow:0 0 14px #ff925f;animation:spark 2.4s infinite ease-out}.s1{left:24px;top:72px}.s2{right:25px;top:54px;animation-delay:.7s}.s3{right:48px;bottom:20px;animation-delay:1.3s}
@keyframes float{50%{transform:translateY(-7px)}}@keyframes pulse{50%{transform:scale(1.06)}}@keyframes glow{50%{transform:scale(1.15);opacity:.75}}@keyframes spark{0%{transform:translateY(18px) scale(.4);opacity:0}25%{opacity:1}100%{transform:translateY(-45px) scale(0);opacity:0}}
.count{text-align:center;position:relative}.num{font-size:72px;font-weight:800;letter-spacing:-.075em;line-height:.98}.label{font-size:15px;color:rgba(255,255,255,.62);margin-top:8px}.since{display:inline-flex;margin-top:15px;padding:8px 12px;border-radius:999px;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.08);font-size:12px;color:rgba(255,255,255,.75)}
.grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:13px}.card{border:1px solid rgba(255,255,255,.1);background:rgba(255,255,255,.065);border-radius:22px;padding:17px}.card small{display:block;color:rgba(255,255,255,.46);font-size:11px;text-transform:uppercase;letter-spacing:.12em;margin-bottom:7px}.card b{font-size:22px;letter-spacing:-.04em}.wide{margin-top:12px}.progress{height:7px;border-radius:20px;background:rgba(255,255,255,.08);overflow:hidden;margin-top:13px}.bar{height:100%;border-radius:20px;background:linear-gradient(90deg,#ff495e,#ff985d);width:0;transition:width 1s ease}.row{display:flex;justify-content:space-between;gap:12px;align-items:end}.muted{color:rgba(255,255,255,.48);font-size:12px}.widget-title{margin:27px 4px 11px;font-size:14px;color:rgba(255,255,255,.58)}.widget{position:relative;height:165px;border-radius:27px;padding:19px;background:radial-gradient(circle at 80% 20%,rgba(255,84,99,.28),transparent 38%),linear-gradient(140deg,#241016,#10080b);border:1px solid rgba(255,255,255,.11);overflow:hidden;box-shadow:0 18px 45px rgba(0,0,0,.28)}.widget:after{content:"❤️‍🔥";position:absolute;right:17px;top:17px;font-size:34px;filter:drop-shadow(0 8px 15px rgba(255,43,72,.3))}.w-label{font-size:10px;letter-spacing:.18em;font-weight:700;color:rgba(255,255,255,.56)}.w-num{font-size:53px;font-weight:800;line-height:1;margin-top:23px;letter-spacing:-.06em}.w-sub{font-size:12px;color:rgba(255,255,255,.58);margin-top:4px}.footer{text-align:center;font-size:11px;color:rgba(255,255,255,.32);margin-top:22px}
</style></head><body><div class="bg"></div><div class="noise"></div><main class="wrap"><div class="eyebrow">Our little forever</div><h1 class="title">Our Flame</h1><p class="subtitle">Один огонёк. Одна история. Каждый день — наш.</p><section class="hero"><div class="flame"><div class="glow"></div><div class="spark s1"></div><div class="spark s2"></div><div class="spark s3"></div><div class="heart">❤️‍🔥</div></div><div class="count"><div id="days" class="num">—</div><div class="label">дней вместе</div><div class="since">с 7 августа 2026</div></div><div class="grid"><div class="card"><small>Наш стрик</small><b><span id="streak">—</span> 🔥</b></div><div class="card"><small>Следующая дата</small><b><span id="next">—</span></b></div></div><div class="card wide"><div class="row"><div><small>До следующего рубежа</small><b><span id="left">—</span> дней</b></div><div class="muted"><span id="milestone">—</span> дней</div></div><div class="progress"><div id="bar" class="bar"></div></div></div></section><div class="widget-title">Предпросмотр нашего виджета</div><section class="widget"><div class="w-label">OUR FLAME</div><div id="wdays" class="w-num">—</div><div class="w-sub">days together · 07.08.2026</div></section><div class="footer">Made for us · ❤️‍🔥</div></main><script>
async function load(){try{const r=await fetch('/api/streak',{cache:'no-store'});const d=await r.json();days.textContent=d.daysTogether;streak.textContent=d.streak;milestone.textContent=d.nextMilestone;left.textContent=d.daysToMilestone;next.textContent=d.nextMilestone+' дней';wdays.textContent=d.daysTogether;const prev=[0,50,100,200,365,500,730,1000].filter(x=>x<d.nextMilestone).pop()||0;const p=Math.max(0,Math.min(100,(d.daysTogether-prev)/(d.nextMilestone-prev)*100));bar.style.width=p+'%'}catch(e){document.querySelector('.subtitle').textContent='Не удалось обновить счётчик'}}load();
</script></body></html>`;

const server = http.createServer((req,res)=>{
  const url = new URL(req.url || '/', `http://${req.headers.host || 'localhost'}`);
  if(url.pathname === '/health') return json(res,200,{ok:true,service:'our-flame',version:3});
  if(url.pathname === '/api/streak'){
    const days = daysTogether(); const next = nextMilestone(days);
    return json(res,200,{title:'Our Flame',couple:COUPLE_NAME,startDate:START_DATE,daysTogether:days,streak:days,nextMilestone:next,daysToMilestone:next-days,emoji:'❤️‍🔥',timezone:'Asia/Almaty',updatedAt:new Date().toISOString()});
  }
  if(url.pathname === '/' || url.pathname === '/index.html'){
    res.writeHead(200,{'Content-Type':'text/html; charset=utf-8','Cache-Control':'no-store'}); return res.end(html);
  }
  res.writeHead(404,{'Content-Type':'text/plain; charset=utf-8'}); res.end('Not found');
});
server.listen(PORT,'0.0.0.0',()=>console.log(`Our Flame v3 ❤️‍🔥 running on ${PORT}`));
