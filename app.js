const OWNER = "creatbrook@gmail.com";
const LOGO_FALLBACK = "data:image/svg+xml;utf8," + encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><circle cx="100" cy="100" r="94" fill="#fff" stroke="#081236" stroke-width="8"/><polygon points="100,42 122,58 114,84 86,84 78,58" fill="#081236"/><polygon points="62,64 78,58 84,82 64,94 52,78" fill="#6D12D9"/><polygon points="138,64 122,58 116,82 136,94 148,78" fill="#6D12D9"/><path d="M52,88 Q75,112 100,115 Q128,112 148,88 Q135,126 100,136 Q65,126 52,88 Z" fill="#081236"/><text x="100" y="164" text-anchor="middle" font-family="Arial Black,sans-serif" font-weight="900" font-size="30" fill="#081236">PANA</text><text x="100" y="180" text-anchor="middle" font-family="Arial,sans-serif" font-weight="700" font-size="11" letter-spacing="4" fill="#081236">FOOTBALL</text></svg>`);

const IMG = {
  logo: "./PANA_FOOTBALL_Original_Logo.png",
  hero: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=80",
  p1: "https://images.unsplash.com/photo-1529900748604-07564a03e7a6?auto=format&fit=crop&w=800&q=80",
  p2: "https://images.unsplash.com/photo-1459865264687-595d652de67e?auto=format&fit=crop&w=800&q=80",
  p3: "https://images.unsplash.com/photo-1551958219-acbc608c6377?auto=format&fit=crop&w=800&q=80",
  av: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80"
};

const logoTag = (cls) => `<img src="${IMG.logo}" onerror="this.onerror=null;this.src='${LOGO_FALLBACK}'" alt="PANA FOOTBALL" class="${cls} rounded-full bg-white object-contain shadow"/>`;

const DB0 = {
  alias: "PANASPORT", num: "+974 5512 8890",
  matches: [
    { id:"m1", day:"Thu, 19 Nov", time:"08:00 PM", title:"8V8 FLOODLIT CLASH", venue:"Al Sadd Complex, Doha", area:"Al Sadd", dur:"90 min", price:35, tot:16, tak:13, lvl:"Competitive", img:IMG.p1,
      pl:[{n:"Tariq M.",p:"MID",r:88,b:"Red",x:50,y:52},{n:"Hamad T.",p:"DEF",r:85,b:"Red",x:28,y:76},{n:"Khalid A.",p:"FWD",r:87,b:"Red",x:72,y:72},{n:"Yousef K.",p:"FWD",r:86,b:"White",x:50,y:26},{n:"Omar N.",p:"GK",r:89,b:"White",x:50,y:10}] },
    { id:"m2", day:"Fri, 20 Nov", time:"09:30 PM", title:"7V7 ASPIRE TURF NIGHT", venue:"Aspire Zone Pitch 4, Al Waab", area:"Al Waab", dur:"60 min", price:28, tot:14, tak:10, lvl:"Friendly", img:IMG.p2,
      pl:[{n:"Nasser A.",p:"FWD",r:87,b:"Red",x:45,y:58},{n:"Sami H.",p:"MID",r:84,b:"White",x:55,y:30}] },
    { id:"m3", day:"Sat, 21 Nov", time:"08:00 PM", title:"9V9 LUSAIL ARENA", venue:"Lusail Marina Fields, Doha", area:"Lusail", dur:"90 min", price:30, tot:18, tak:15, lvl:"High Tempo", img:IMG.p3,
      pl:[{n:"Rashid K.",p:"DEF",r:88,b:"Red",x:50,y:62}] }
  ],
  highlights: [
    { id:"h1", title:"Al Sadd Friday Final • 5-4 Thriller", dur:"01:42", views:"1.4K", img:IMG.p1, mvp:"Omar N. (Hat-trick)", trophy:"Champions Cup" },
    { id:"h2", title:"Lusail Night Top-Bins Compilation", dur:"02:15", views:"2.1K", img:IMG.p3, mvp:"Tariq Al-Mannai", trophy:"Golden Boot" },
    { id:"h3", title:"Aspire 7v7 Penalty Shootout", dur:"01:18", views:"980", img:IMG.p2, mvp:"Yousef K.", trophy:"MOTM Shield" }
  ],
  rank: [
    {n:"Omar N.",pts:142,g:14,cups:3,f:"🇶🇦"},
    {n:"Tariq Al-Mannai",pts:128,g:11,cups:2,f:"🇶🇦"},
    {n:"Yousef K.",pts:115,g:12,cups:1,f:"🇯🇴"}
  ],
  bks: [{id:"BK-9041",mid:"m1",mt:"8V8 FLOODLIT CLASH",pl:"Jassim Al-Kuwari",sz:1,qar:35,m:"Fawran",st:"Pending"}]
};

let saved = null;
try { saved = JSON.parse(localStorage.getItem("ps_gm_v1")); } catch(e) {}

let S = {
  scr:"splash", md:"phone", inp:"", own:false, tab:"matches", area:"All", chk:false,
  genOtp:"", userOtp:"", dragIdx:null, activeVideo:null,
  detail:null, bk:null, sz:1, pay:"fawran", ok:false, fn:"", ed:false, nm:false, vot:null, duel:null, msg:null,
  u:{n:"Tariq Al-Mannai",ph:"+974 5589 4321",p:"MID",num:10,age:26,nat:"Qatar",fl:"🇶🇦",ovr:87,pac:86,sho:84,pas:89,dri:88,def:78,phy:82,bal:70,av:IMG.av,pl:14,w:9,g:11,ast:7,cups:2},
  db: saved || DB0
};

const sv = () => { try { localStorage.setItem("ps_gm_v1", JSON.stringify(S.db)); } catch(e) {} };
const say = t => { S.msg = t; render(); setTimeout(() => { S.msg = null; render(); }, 2800); };
const go = s => { S.scr = s; S.detail = null; window.scrollTo(0,0); render(); };

function doLogin() {
  const v = S.inp.trim();
  if (!v) return say(S.md === "phone" ? "Enter your Qatar mobile number" : "Enter your email address");
  if (S.md === "email" && !v.includes("@")) return say("Enter a valid email address");
  if (S.md === "phone") { S.u.ph = "+974 " + v; S.own = false; }
  else { S.own = v.toLowerCase() === OWNER; if (!S.own) S.u.n = v.split("@")[0].toUpperCase(); }
  S.genOtp = String(Math.floor(1000 + Math.random() * 9000));
  S.userOtp = "";
  go("otp");
  say(`📩 Verification Code sent: ${S.genOtp}`);
}

function doEnter() {
  if (S.userOtp.trim() !== S.genOtp) return say(`Invalid code! Enter ${S.genOtp}`);
  if (S.own) { go("owner"); say("Manager Verified!"); }
  else { go("app"); say("Welcome to PANA FOOTBALL!"); }
}

function openDetail(id) { S.detail = S.db.matches.find(x => x.id === id) || S.db.matches[0]; window.scrollTo(0,0); render(); }
function openBk(id) { S.bk = S.db.matches.find(x => x.id === id) || S.db.matches[0]; S.sz = 1; S.pay = "fawran"; S.ok = false; S.fn = ""; render(); }

function startDrag(idx, e) { e.preventDefault(); S.dragIdx = idx; }
function moveDrag(e) {
  if (S.dragIdx === null) return;
  const box = document.getElementById("pitchBox"); if (!box) return;
  const r = box.getBoundingClientRect();
  const pt = e.touches ? e.touches[0] : e;
  const x = Math.max(10, Math.min(90, Math.round(((pt.clientX - r.left) / r.width) * 100)));
  const y = Math.max(8, Math.min(92, Math.round(((pt.clientY - r.top) / r.height) * 100)));
  const p = S.db.matches[0].pl[S.dragIdx];
  p.x = x; p.y = y; p.b = y > 50 ? "Red" : "White";
  render();
}
function endDrag() { if (S.dragIdx !== null) { S.dragIdx = null; sv(); } }

function boostStat(type) {
  if (type === "g") { S.u.g++; S.u.sho = Math.min(99, S.u.sho + 1); }
  else { S.u.ast++; S.u.pas = Math.min(99, S.u.pas + 1); }
  S.u.ovr = Math.min(99, Math.round((S.u.pac + S.u.sho + S.u.pas + S.u.dri) / 4) + 1);
  say(`OVR boosted to ${S.u.ovr}! ⚡`);
}

function submitBk() {
  const m = S.bk; if (!m) return;
  if (S.pay === "fawran" && !S.ok) return say("Upload Fawran receipt first");
  const qar = (S.sz === 6 ? 5 : S.sz) * m.price;
  S.db.bks.unshift({ id:"BK-"+Math.floor(1000+Math.random()*9000), mid:m.id, mt:m.title, pl:S.u.n+(S.sz>1?` (+${S.sz-1})`:""), sz:S.sz, qar, m:S.pay==="fawran"?"Fawran":"Cash", st:S.pay==="fawran"?"Pending":"Confirmed" });
  m.tak = Math.min(m.tot, m.tak + S.sz);
  m.pl.push({ n:S.u.n.split(" ")[0], p:S.u.p, r:S.u.ovr, b:m.pl.length%2===0?"Red":"White", x:40+Math.random()*20, y:40+Math.random()*25 });
  sv(); S.bk = null; S.detail = null; say(S.pay === "fawran" ? "Receipt sent for approval!" : "Spot locked in!");
}

function actBk(id, yes) {
  const i = S.db.bks.findIndex(x => x.id === id); if (i < 0) return;
  const b = S.db.bks[i];
  if (yes) { b.st = "Approved"; say("Approved " + b.pl); }
  else { const m = S.db.matches.find(x => x.id === b.mid); if (m) m.tak = Math.max(0, m.tak - b.sz); S.db.bks.splice(i,1); say("Declined"); }
  sv();
}

function copyWa(id) {
  const m = S.db.matches.find(x => x.id === id) || S.db.matches[0];
  const r = m.pl.filter(p=>p.b==="Red").map((p,i)=>`${i+1}. ${p.n}`).join("\n") || "1. Open";
  const w = m.pl.filter(p=>p.b==="White").map((p,i)=>`${i+1}. ${p.n}`).join("\n") || "1. Open";
  if (navigator.clipboard) navigator.clipboard.writeText(`🏆 *PANA FOOTBALL QATAR*\n_By Golden Moments & Events_\n🏟️ *${m.title}*\n📍 ${m.venue} | 🕒 ${m.day} (${m.time})\n🎁 *6-for-5 Squad Deal + Winner Trophy!*\n\n🔴 *TEAM MAROON*\n${r}\n\n⚪ *TEAM WHITE*\n${w}\n\n📲 Claim last spots: https://yoyojaye.github.io/Panasport/`);
  say("WhatsApp Match Poster copied!");
}

function addMatch(e) {
  e.preventDefault(); const f = e.target;
  S.db.matches.unshift({ id:"m"+Date.now(), day:f.d.value||"Sun, 22 Nov", time:f.tm.value||"09:00 PM", title:f.t.value.toUpperCase()||"8V8 NIGHT CLASH", venue:f.v.value||"Al Sadd Complex", area:"Al Sadd", dur:"90 min", price:+f.p.value||35, tot:+f.tot.value||16, tak:1, lvl:"Competitive", img:IMG.p1, pl:[{n:"Captain",p:"MID",r:87,b:"Red",x:50,y:60}] });
  sv(); S.nm = false; say("New match live!");
}

function saveEd(e) {
  e.preventDefault(); const f = e.target;
  S.u.n = f.fn.value || S.u.n; S.u.p = f.pos.value; S.u.num = +f.num.value || 10; S.u.nat = f.nat.value;
  S.u.fl = {Qatar:"🇶🇦",Egypt:"🇪🇬",Jordan:"🇯🇴",Morocco:"🇲🇦",Ethiopia:"🇪🇹",India:"🇮🇳"}[S.u.nat] || "🇶🇦";
  S.ed = false; say("Pro Card updated!");
}
function render() {
  let h = "";
  if (S.scr === "splash") {
    h = `<div class="relative min-h-screen flex flex-col justify-between bg-slate-950 text-white"><img src="${IMG.hero}" class="absolute inset-0 w-full h-full object-cover opacity-85"/><div class="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-transparent"></div>
      <div class="relative z-10 px-6 pt-12 flex justify-between items-center"><span class="inline-flex items-center gap-2.5 bg-slate-950/85 border border-white/20 text-white pl-1.5 pr-3.5 py-1.5 rounded-full text-xs font-extrabold shadow">${logoTag("w-8 h-8 p-0.5")}PANA FOOTBALL</span><span class="px-3 py-1 rounded-full bg-amber-400 text-slate-950 text-[11px] font-extrabold">🏆 WINNER TROPHIES</span></div>
      <div class="relative z-10 px-6 pb-8">
        <span class="inline-block bg-emerald-400 text-slate-950 text-[11px] font-extrabold px-3 py-1 rounded-md mb-3">🇶🇦 DOHA NIGHT LEAGUE</span>
        <h1 class="text-3xl font-extrabold leading-tight uppercase mb-3">SHOW UP, BALL OUT,<br/>AND LIFT THE<br/>MATCHDAY TROPHY</h1>
        <p class="text-sm text-slate-200 mb-6">1v1 rival challenges, winner trophies, HD match highlights & Pro FIFA cards.</p>
        <button onclick="go('auth')" class="w-full py-4 rounded-2xl bg-[#8A1538] text-white font-extrabold text-base shadow-xl">Enter Stadium</button>
        <p class="text-center text-[11px] font-bold tracking-wider uppercase text-amber-300/90 mt-4">By Golden Moments & Events</p>
      </div></div>`;
  } else if (S.scr === "auth") {
    const ph = S.md === "phone";
    h = `<div class="min-h-screen ucl-bg px-6 pt-12 pb-8 text-white flex flex-col justify-between"><div>
      <button onclick="go('splash')" class="w-10 h-10 rounded-full bg-slate-950/70 border border-white/20 font-bold">←</button>
      <div class="text-center my-7">${logoTag("w-20 h-20 p-1 mx-auto mb-3 border-2 border-amber-400")}<h1 class="text-2xl font-extrabold uppercase">PANA FOOTBALL</h1><p class="text-[11px] font-bold text-amber-300 tracking-wider uppercase mt-0.5">Golden Moments & Events</p></div>
      <div class="flex justify-center gap-8 border-b border-white/15 mb-6"><button onclick="S.md='phone';S.inp='';render()" class="pb-3 text-xs font-extrabold ${ph?'text-emerald-400 border-b-2 border-emerald-400':'text-slate-300'}">PHONE NUMBER</button><button onclick="S.md='email';S.inp='';render()" class="pb-3 text-xs font-extrabold ${!ph?'text-emerald-400 border-b-2 border-emerald-400':'text-slate-300'}">EMAIL</button></div>
      ${ph?`<div class="flex gap-2"><div class="h-14 px-4 rounded-2xl bg-slate-950/75 border border-white/20 flex items-center gap-2 font-extrabold text-sm">🇶🇦 +974</div><input type="tel" value="${S.inp}" oninput="S.inp=this.value" placeholder="Enter mobile number" class="w-full h-14 px-4 rounded-2xl bg-slate-950/75 border border-white/20 text-sm font-bold text-white placeholder-slate-400"/></div>`:`<input type="email" value="${S.inp}" oninput="S.inp=this.value" placeholder="Enter your email address" class="w-full h-14 px-4 rounded-2xl bg-slate-950/75 border border-white/20 text-sm font-bold text-white placeholder-slate-400"/>`}
      <button onclick="doLogin()" class="w-full mt-6 py-4 rounded-2xl bg-[#8A1538] text-white font-extrabold shadow-lg">Send Verification Code</button>
    </div><p class="text-center text-[10px] font-bold uppercase tracking-widest text-white/60">A Golden Moments & Events Experience</p></div>`;
  } else if (S.scr === "otp") {
    h = `<div class="min-h-screen ucl-bg px-6 pt-12 pb-8 text-center text-white"><button onclick="go('auth')" class="w-10 h-10 rounded-full bg-slate-950/70 border border-white/20 font-bold float-left">←</button>${logoTag("w-16 h-16 p-1 mx-auto mt-10 mb-3 border-2 border-emerald-400")}<h1 class="text-2xl font-extrabold uppercase mb-2">ENTER 4-DIGIT CODE</h1><p class="text-xs text-sky-200 mb-2">Sent to <b>${S.md==='phone'?S.u.ph:S.inp}</b></p>
      <div class="inline-block px-3.5 py-1 rounded-full bg-emerald-400 text-slate-950 text-xs font-extrabold mb-5 shadow">Your Verification Code: ${S.genOtp}</div>
      <input type="tel" maxlength="4" value="${S.userOtp}" oninput="S.userOtp=this.value" placeholder="••••" class="block w-48 mx-auto h-16 rounded-2xl bg-slate-950/80 border-2 border-emerald-400 text-center text-3xl tracking-[0.4em] font-extrabold text-white mb-5"/>
      <button onclick="doEnter()" class="w-full py-4 rounded-2xl bg-emerald-400 text-slate-950 font-extrabold shadow-lg">Verify & Kick Off</button>
      <button onclick="S.genOtp=String(Math.floor(1000+Math.random()*9000));say('New code: '+S.genOtp)" class="mt-4 text-xs font-bold text-sky-300">Resend New Code</button></div>`;
  } else if (S.scr === "owner") {
    const rev = S.db.bks.reduce((s,b)=>s+b.qar,0);
    h = `<div class="min-h-screen ucl-bg text-white px-5 pt-10 pb-12"><div class="flex justify-between items-center mb-5"><div class="flex items-center gap-2.5">${logoTag("w-10 h-10 p-0.5")}<div><span class="text-[10px] font-extrabold text-amber-300">GOLDEN MOMENTS & EVENTS</span><h1 class="text-lg font-extrabold leading-tight">PANA FOOTBALL ADMIN</h1></div></div><div class="flex gap-2"><button onclick="go('app')" class="px-3 py-2 rounded-xl bg-slate-950/75 border border-white/15 text-xs font-bold">Player View</button><button onclick="S.own=false;go('splash')" class="px-3 py-2 rounded-xl bg-rose-500/30 text-rose-200 text-xs font-bold">Logout</button></div></div>
      <div class="grid grid-cols-2 gap-3 mb-4"><div class="bg-slate-950/75 backdrop-blur-md border border-white/15 p-4 rounded-2xl"><p class="text-xs text-slate-300">Revenue</p><p class="text-2xl font-extrabold text-emerald-400">${rev} QR</p></div><div class="bg-slate-950/75 backdrop-blur-md border border-white/15 p-4 rounded-2xl"><p class="text-xs text-slate-300">Bookings</p><p class="text-2xl font-extrabold text-amber-400">${S.db.bks.length}</p></div></div>
      <button onclick="S.nm=true;render()" class="w-full py-3.5 rounded-2xl bg-emerald-400 text-slate-950 font-extrabold text-sm mb-5 shadow-lg">+ Publish New Match</button>
      <div class="space-y-3 mb-5">${S.db.bks.map(b=>`<div class="bg-slate-950/75 backdrop-blur-md p-4 rounded-2xl border border-white/15"><div class="flex justify-between font-extrabold text-sm"><span>${b.pl}</span><span class="text-emerald-400">${b.qar} QR</span></div><p class="text-xs text-slate-300">${b.mt} • ${b.m}</p><div class="flex justify-between items-center mt-3 pt-2 border-t border-white/10"><span class="text-xs font-bold ${b.st==='Pending'?'text-amber-400':'text-emerald-400'}">● ${b.st}</span>${b.st==='Pending'?`<div class="flex gap-2"><button onclick="actBk('${b.id}',0)" class="px-3 py-1 rounded bg-rose-500/25 text-rose-200 text-xs font-bold">Decline</button><button onclick="actBk('${b.id}',1)" class="px-3 py-1 rounded bg-emerald-400 text-slate-950 text-xs font-bold">✓ Approve</button></div>`:''}</div></div>`).join("")}</div>
      <button onclick="copyWa('m1')" class="w-full py-3.5 rounded-2xl bg-[#8A1538] font-extrabold text-sm shadow-lg">📲 Copy WhatsApp Match Poster</button></div>`;
    if (S.nm) h += `<div class="fixed inset-0 z-50 bg-black/80 flex items-end"><form onsubmit="addMatch(event)" class="w-full max-w-[430px] mx-auto bg-slate-900 text-white rounded-t-3xl p-5 space-y-3 border-t border-white/15"><div class="flex justify-between font-bold"><h3>New Match</h3><button type="button" onclick="S.nm=false;render()">✕</button></div><input name="t" placeholder="Title (8V8 AL SADD)" class="w-full p-3 rounded-xl bg-white/10 text-sm font-bold"/><div class="grid grid-cols-2 gap-2"><input name="d" placeholder="Sun, 22 Nov" class="p-3 rounded-xl bg-white/10 text-sm font-bold"/><input name="tm" placeholder="09:00 PM" class="p-3 rounded-xl bg-white/10 text-sm font-bold"/></div><input name="v" placeholder="Venue" class="w-full p-3 rounded-xl bg-white/10 text-sm font-bold"/><div class="grid grid-cols-2 gap-2"><input name="p" type="number" value="35" class="p-3 rounded-xl bg-white/10 text-sm font-bold"/><input name="tot" type="number" value="16" class="p-3 rounded-xl bg-white/10 text-sm font-bold"/></div><button type="submit" class="w-full py-3.5 rounded-2xl bg-emerald-400 text-slate-950 font-extrabold">Publish</button></form></div>`;
  } else if (S.detail) {
    const m = S.detail;
    h = `<div class="min-h-screen ucl-bg pb-28 text-white">
      <div class="relative h-52"><img src="${m.img}" class="w-full h-full object-cover"/><button onclick="S.detail=null;render()" class="absolute top-10 left-5 w-10 h-10 rounded-full bg-slate-950/80 text-white border border-white/20 shadow font-bold">←</button><button onclick="copyWa('${m.id}')" class="absolute top-10 right-5 px-3.5 py-2 rounded-full bg-emerald-400 text-slate-950 shadow text-xs font-extrabold">📲 Share</button></div>
      <div class="px-5 pt-4">
        <div class="flex justify-between items-start"><div><span class="px-2.5 py-0.5 rounded-full bg-[#8A1538] text-white text-[10px] font-extrabold">${m.lvl}</span><h1 class="text-xl font-extrabold mt-1.5">${m.title}</h1><p class="text-xs font-bold text-emerald-300">${m.day} • ${m.time} | 📍 ${m.venue}</p></div><div class="bg-slate-950/75 backdrop-blur-md px-3 py-2 rounded-2xl border border-white/15 text-center"><p class="text-base font-extrabold text-emerald-400">${m.price} QR</p><p class="text-[10px] text-slate-300">${m.dur}</p></div></div>
        <div class="mt-4 bg-slate-950/75 backdrop-blur-md rounded-2xl p-4 border border-white/15 shadow-lg space-y-2 text-xs text-slate-200">
          <div class="flex items-center justify-between"><h3 class="font-extrabold uppercase text-amber-300">🏆 MATCHDAY TROPHY & RULES</h3><span class="text-[10px] text-white/60 font-bold">Golden Moments</span></div>
          <p>🏆 Winning squad lifts the PANA Football Cup & earns +15 Rank PTS.</p>
          <p>🎥 Full HD match highlights & MOTM photos uploaded after final whistle.</p>
          <p>🎁 Bring 6 squadmates & pay for only 5 spots!</p>
        </div>
      </div>
      <div class="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-slate-950/90 backdrop-blur-md border-t border-white/15 px-5 py-3.5 flex items-center gap-3">
        <div class="px-4 py-2 rounded-2xl bg-white/10 text-center"><p class="text-sm font-extrabold">${m.tak}/${m.tot}</p><p class="text-[10px] text-slate-300">Spots</p></div>
        <button onclick="openBk('${m.id}')" class="flex-1 py-3.5 rounded-2xl bg-[#8A1538] text-white font-extrabold text-sm shadow-lg">Lock Spot - ${m.price} QR</button>
      </div></div>`;
  } else {
    const u = S.u;
    if (S.tab === "matches") {
      const list = S.area === "All" ? S.db.matches : S.db.matches.filter(m => m.area === S.area);
      h = `<div class="px-5 pt-8 pb-28 text-white">
        <!-- Official Brand Header -->
        <div class="flex justify-between items-center mb-3 bg-slate-950/65 backdrop-blur-md border border-white/15 px-3.5 py-2.5 rounded-2xl">
          <div class="flex items-center gap-2.5">${logoTag("w-10 h-10 p-0.5")}<div class="leading-tight"><h2 class="text-sm font-extrabold tracking-wide">PANA FOOTBALL</h2><p class="text-[10px] font-bold text-amber-300">By Golden Moments & Events</p></div></div>
          <div class="flex items-center gap-1.5">${S.own?`<button onclick="go('owner')" class="px-2.5 py-1.5 rounded-xl bg-[#8A1538] text-white text-[11px] font-extrabold">Admin</button>`:''}<button onclick="S.tab='card';render()" class="flex items-center gap-1.5 bg-white/10 pl-1 pr-2.5 py-1 rounded-full"><img src="${u.av}" class="w-6 h-6 rounded-full object-cover"/><span class="text-[11px] font-extrabold text-emerald-300">#${u.num}</span></button></div>
        </div>
        <!-- Promo Banner -->
        <div onclick="openDetail('m1')" class="rounded-3xl bg-gradient-to-r from-[#8A1538]/95 via-[#6D102C]/90 to-slate-950/90 backdrop-blur-md p-4 text-white shadow-xl border border-white/15 mb-4 cursor-pointer">
          <div class="flex justify-between items-center"><span class="px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950 text-[10px] font-extrabold">🏆 WINNER TROPHY NIGHT</span><button onclick="event.stopPropagation();S.chk=!S.chk;say(S.chk?'Checked in for Tonight! ⚽':'Check-in paused')" class="px-2.5 py-1 rounded-full text-[10px] font-extrabold ${S.chk?'bg-emerald-400 text-slate-950':'bg-white/15 text-white'}">${S.chk?'✓ On Way':'📍 Check-In'}</button></div>
          <h3 class="text-lg font-extrabold uppercase mt-2">BRING 6, PAY FOR 5</h3>
          <p class="text-xs text-white/85 mt-0.5">Swipe sideways below to pick your Doha pitch →</p>
        </div>
        <div class="flex gap-2 overflow-x-auto no-sb mb-3">${["All","Al Sadd","Al Waab","Lusail"].map(a=>`<button onclick="S.area='${a}';render()" class="px-4 py-1.5 rounded-2xl text-xs font-extrabold whitespace-nowrap backdrop-blur-md ${S.area===a?'bg-emerald-400 text-slate-950 shadow':'bg-slate-950/70 text-white border border-white/20'}">${a}</button>`).join("")}</div>
        <!-- Sideways Horizontal Swipeable Match Cards -->
        <div class="flex gap-3.5 overflow-x-auto no-sb pb-3 mb-4">${list.map(m=>`<div onclick="openDetail('${m.id}')" class="w-[275px] shrink-0 rounded-3xl bg-slate-950/75 backdrop-blur-md border border-white/15 shadow-xl overflow-hidden cursor-pointer">
          <div class="relative h-36"><img src="${m.img}" class="w-full h-full object-cover"/><span class="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-[#8A1538] text-white text-[11px] font-extrabold">👥 ${m.tak}/${m.tot}</span><span class="absolute bottom-2.5 left-3 px-2.5 py-0.5 rounded-full bg-black/75 text-emerald-300 text-[10px] font-bold">🎥 HD Highlights</span></div>
          <div class="p-3.5 flex justify-between items-center gap-2"><div class="min-w-0"><span class="text-[10px] font-extrabold text-emerald-300 bg-emerald-500/20 px-2 py-0.5 rounded-full">${m.lvl}</span><h4 class="font-extrabold text-sm mt-1 truncate">${m.title}</h4><p class="text-[11px] text-slate-300">🕒 ${m.day} • ${m.time}</p><p class="text-[11px] text-slate-300 truncate">📍 ${m.venue}</p></div><div class="bg-white/10 px-3 py-2 rounded-2xl text-center shrink-0"><p class="text-sm font-extrabold text-emerald-400">${m.price} QR</p><p class="text-[10px] font-bold text-slate-300">${m.dur}</p></div></div>
        </div>`).join("")}</div>
        <!-- Trophies & Previous Match Highlight Videos -->
        <div class="flex justify-between items-center mb-2"><h3 class="text-sm font-extrabold uppercase drop-shadow">🎬 PREVIOUS MATCH HIGHLIGHTS</h3><button onclick="S.tab='media';render()" class="text-xs font-extrabold text-emerald-300">All Trophies →</button></div>
        <div class="flex gap-3 overflow-x-auto no-sb mb-4">${S.db.highlights.map(v=>`<div onclick="S.activeVideo=v;render()" class="w-44 shrink-0 rounded-2xl bg-slate-950/75 backdrop-blur-md border border-white/15 overflow-hidden shadow-lg cursor-pointer">
          <div class="relative h-24"><img src="${v.img}" class="w-full h-full object-cover brightness-90"/><span class="absolute inset-0 flex items-center justify-center"><b class="w-8 h-8 rounded-full bg-white text-[#8A1538] flex items-center justify-center text-xs shadow">▶</b></span><span class="absolute bottom-1.5 right-1.5 px-1.5 py-0.5 rounded bg-black/80 text-white text-[9px] font-bold">${v.dur}</span></div>
          <div class="p-2.5"><p class="text-xs font-extrabold line-clamp-1">${v.title}</p><p class="text-[10px] text-amber-300 font-bold mt-0.5">🏆 ${v.trophy}</p></div>
        </div>`).join("")}</div>
        <p class="text-center text-[10px] font-bold tracking-widest uppercase text-white/60">PANA FOOTBALL • Under Golden Moments & Events</p>
      </div>`;
    } else if (S.tab === "tactics") {
      const m = S.db.matches[0];
      h = `<div class="px-5 pt-9 pb-28 text-white"><div class="flex justify-between items-center mb-3"><div><h2 class="text-base font-extrabold drop-shadow">DRAG & DROP LINEUP</h2><p class="text-xs text-sky-200">Drag players anywhere on pitch (Top=White, Bottom=Maroon)</p></div>${logoTag("w-9 h-9 p-0.5")}</div>
        <div id="pitchBox" onmousemove="moveDrag(event)" onmouseup="endDrag()" ontouchmove="moveDrag(event)" ontouchend="endDrag()" class="relative w-full h-[350px] rounded-3xl pitch border-4 border-white/80 shadow-2xl overflow-hidden mb-4 touch-none">
          <div class="absolute inset-x-0 top-1/2 h-0.5 bg-white/50"></div>
          <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full border-2 border-white/50"></div>
          ${m.pl.map((p,i)=>`<div onmousedown="startDrag(${i},event)" ontouchstart="startDrag(${i},event)" style="left:${p.x}%;top:${p.y}%" class="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center cursor-grab active:cursor-grabbing select-none"><div class="w-10 h-10 rounded-full ${p.b==='Red'?'bg-[#8A1538] text-white border-2 border-white':'bg-white text-slate-900 border-2 border-slate-900'} flex items-center justify-center text-[10px] font-extrabold shadow-lg">${p.p}</div><span class="mt-1 px-1.5 rounded bg-black/80 text-white text-[9px] font-bold">${p.n}</span></div>`).join("")}
        </div>
        <button onclick="copyWa('${m.id}')" class="w-full py-3.5 rounded-2xl bg-[#8A1538] text-white font-extrabold text-sm shadow-lg">📲 Share Lineup Poster to WhatsApp</button></div>`;
    } else if (S.tab === "media") {
      h = `<div class="px-5 pt-9 pb-28 text-white">
        <div class="flex justify-between items-center mb-3"><div><h2 class="text-lg font-extrabold uppercase drop-shadow">🏆 TROPHIES & HIGHLIGHTS</h2><p class="text-xs text-amber-300 font-bold">Golden Moments & Events Archive</p></div>${logoTag("w-10 h-10 p-0.5")}</div>
        <div class="grid grid-cols-3 gap-2 mb-5 text-center">
          <div class="bg-slate-950/75 backdrop-blur-md p-3 rounded-2xl border border-white/15 shadow"><p class="text-2xl">🏆</p><p class="text-xs font-extrabold mt-1">Doha Cup</p><p class="text-[10px] text-emerald-400 font-bold">2x Winner</p></div>
          <div class="bg-slate-950/75 backdrop-blur-md p-3 rounded-2xl border border-white/15 shadow"><p class="text-2xl">🥇</p><p class="text-xs font-extrabold mt-1">Golden Boot</p><p class="text-[10px] text-amber-300 font-bold">11 Goals</p></div>
          <div class="bg-slate-950/75 backdrop-blur-md p-3 rounded-2xl border border-white/15 shadow"><p class="text-2xl">🎖️</p><p class="text-xs font-extrabold mt-1">MOTM Shield</p><p class="text-[10px] text-rose-300 font-bold">3 Awards</p></div>
        </div>
        <div class="space-y-3">${S.db.highlights.map(v=>`<div onclick="S.activeVideo=v;render()" class="rounded-3xl bg-slate-950/75 backdrop-blur-md border border-white/15 overflow-hidden shadow-lg cursor-pointer flex items-center gap-3 p-2.5">
          <div class="relative w-28 h-20 rounded-2xl overflow-hidden shrink-0"><img src="${v.img}" class="w-full h-full object-cover"/><span class="absolute inset-0 flex items-center justify-center bg-black/25"><b class="w-8 h-8 rounded-full bg-white text-[#8A1538] flex items-center justify-center text-xs">▶</b></span></div>
          <div><span class="text-[10px] font-extrabold text-amber-300">🏆 ${v.trophy}</span><h4 class="text-xs font-extrabold mt-0.5">${v.title}</h4><p class="text-[11px] text-slate-300 mt-1">MVP: ${v.mvp} • ${v.views} views</p></div>
        </div>`).join("")}</div>
      </div>`;
    } else if (S.tab === "rank") {
      h = `<div class="px-5 pt-9 pb-28 text-white"><div class="flex justify-between items-center mb-3"><div><h2 class="text-base font-extrabold drop-shadow">DOHA KING OF THE PITCH</h2><p class="text-xs text-sky-200">Challenge a rival for a pre-match 1v1 duel</p></div>${logoTag("w-9 h-9 p-0.5")}</div>
        <div class="space-y-2.5 mb-5">${S.db.rank.map((l,i)=>`<div class="flex justify-between items-center p-3.5 rounded-2xl bg-slate-950/75 backdrop-blur-md border border-white/15 shadow"><div class="flex items-center gap-3"><span class="w-7 h-7 rounded-full ${i===0?'bg-amber-400 text-slate-950':'bg-white/15 text-white'} flex items-center justify-center text-xs font-extrabold">#${i+1}</span><div><p class="text-sm font-extrabold">${l.f} ${l.n}</p><p class="text-[11px] text-slate-300">${l.g} Goals • 🏆 ${l.cups} Cups</p></div></div><button onclick="S.duel='${l.n}';say('⚔️ Challenged ${l.n} to a 1v1 Duel!')" class="px-3 py-1.5 rounded-xl text-xs font-extrabold ${S.duel===l.n?'bg-emerald-400 text-slate-950':'bg-[#8A1538] text-white'}">${S.duel===l.n?'✓ Challenged':'⚔️ 1v1 Duel'}</button></div>`).join("")}</div>
        <div class="p-4 rounded-2xl bg-slate-950/75 backdrop-blur-md border border-white/15 shadow"><p class="text-xs font-extrabold text-emerald-300 mb-2">🏆 VOTE TONIGHT'S MAN OF THE MATCH</p><div class="grid grid-cols-2 gap-2">${["Tariq M.","Yousef K.","Omar N.","Hamad T."].map(n=>`<button onclick="S.vot='${n}';say('Voted ${n} for MOTM!')" class="py-2.5 rounded-xl text-xs font-extrabold border ${S.vot===n?'bg-emerald-400 text-slate-950 border-emerald-400':'bg-white/10 border-white/15 text-white'}">${n}</button>`).join("")}</div></div></div>`;
    } else {
      h = `<div class="px-5 pt-9 pb-28 text-white">
        <div class="flex justify-between items-center mb-4"><h2 class="text-lg font-extrabold drop-shadow">ULTIMATE PLAYER CARD</h2><button onclick="S.ed=true;render()" class="text-xs font-extrabold text-emerald-300">Edit Card</button></div>
        <div class="w-[290px] mx-auto fut-shield bg-gradient-to-b from-amber-300 via-amber-500 to-amber-700 p-1 shadow-2xl mb-5">
          <div class="fut-shield bg-gradient-to-br from-[#8A1538] via-[#4C0A1E] to-slate-950 text-white px-5 pt-6 pb-9">
            <div class="flex items-center justify-between">
              <div class="text-center leading-none">
                <p class="text-4xl font-extrabold text-amber-300">${u.ovr}</p>
                <p class="text-xs font-extrabold tracking-widest mt-1">${u.p}</p>
                <p class="text-lg mt-1">${u.fl}</p>
                ${logoTag("w-8 h-8 p-0.5 mx-auto mt-1.5 border border-amber-300")}
              </div>
              <label class="relative cursor-pointer">
                <img src="${u.av}" class="w-28 h-32 rounded-2xl object-cover border-2 border-amber-300/80 shadow-lg"/>
                <span class="absolute bottom-1 right-1 bg-black/80 text-[10px] px-1.5 rounded">📷</span>
                <input type="file" accept="image/*" onchange="const r=new FileReader();r.onload=e=>{S.u.av=e.target.result;render();say('Photo updated!')};r.readAsDataURL(this.files[0])" class="hidden"/>
              </label>
            </div>
            <div class="text-center mt-3 pb-2 border-b border-amber-300/30">
              <h3 class="text-lg font-extrabold uppercase tracking-wider text-amber-200">${u.n}</h3>
              <p class="text-[10px] font-bold text-white/75">JERSEY #${u.num} • 🏆 ${u.cups} TROPHIES</p>
            </div>
            <div class="grid grid-cols-2 gap-x-6 gap-y-1 mt-3 px-3 text-xs font-extrabold">
              <div class="flex justify-between"><span>${u.pac}</span><span class="text-amber-300/80">PAC</span></div>
              <div class="flex justify-between"><span>${u.dri}</span><span class="text-amber-300/80">DRI</span></div>
              <div class="flex justify-between"><span>${u.sho}</span><span class="text-amber-300/80">SHO</span></div>
              <div class="flex justify-between"><span>${u.def}</span><span class="text-amber-300/80">DEF</span></div>
              <div class="flex justify-between"><span>${u.pas}</span><span class="text-amber-300/80">PAS</span></div>
              <div class="flex justify-between"><span>${u.phy}</span><span class="text-amber-300/80">PHY</span></div>
            </div>
          </div>
        </div>
        <div class="grid grid-cols-2 gap-2.5 mb-4">
          <button onclick="boostStat('g')" class="bg-slate-950/75 backdrop-blur-md p-3.5 rounded-2xl border border-white/15 shadow text-left"><p class="text-xl font-extrabold text-emerald-400">⚽ ${u.g}</p><p class="text-[11px] font-bold text-slate-300">Goals (+ Boost OVR)</p></button>
          <button onclick="boostStat('a')" class="bg-slate-950/75 backdrop-blur-md p-3.5 rounded-2xl border border-white/15 shadow text-left"><p class="text-xl font-extrabold text-amber-300">🎯 ${u.ast}</p><p class="text-[11px] font-bold text-slate-300">Assists (+ Boost OVR)</p></button>
        </div>
        <button onclick="S.own=false;go('splash')" class="w-full py-3.5 rounded-2xl bg-slate-950/80 border border-white/15 text-rose-300 font-extrabold text-xs">Sign Out</button>
      </div>`;
    }

    h += `<div class="fixed bottom-3 left-1/2 -translate-x-1/2 w-[95%] max-w-[410px] bg-slate-950/90 backdrop-blur-md border border-white/20 rounded-3xl px-1.5 py-2 flex items-center justify-between z-40 shadow-2xl">
      <button onclick="S.tab='matches';render()" class="flex-1 flex flex-col items-center text-[10px] font-extrabold ${S.tab==='matches'?'text-emerald-400':'text-slate-400'}"><span class="text-base">🏟️</span>Matches</button>
      <button onclick="S.tab='tactics';render()" class="flex-1 flex flex-col items-center text-[10px] font-extrabold ${S.tab==='tactics'?'text-emerald-400':'text-slate-400'}"><span class="text-base">📋</span>Pitch</button>
      <button onclick="openBk('m1')" class="-mt-6 px-3.5 py-2.5 rounded-2xl bg-[#8A1538] text-white font-extrabold text-[10px] shadow-lg border-2 border-slate-900">⚽ BOOK</button>
      <button onclick="S.tab='media';render()" class="flex-1 flex flex-col items-center text-[10px] font-extrabold ${S.tab==='media'?'text-emerald-400':'text-slate-400'}"><span class="text-base">🏆</span>Media</button>
      <button onclick="S.tab='rank';render()" class="flex-1 flex flex-col items-center text-[10px] font-extrabold ${S.tab==='rank'?'text-emerald-400':'text-slate-400'}"><span class="text-base">⚔️</span>Rivals</button>
      <button onclick="S.tab='card';render()" class="flex-1 flex flex-col items-center text-[10px] font-extrabold ${S.tab==='card'?'text-emerald-400':'text-slate-400'}"><span class="text-base">🪪</span>Card</button></div>`;
  }

  if (S.activeVideo) {
    const v = S.activeVideo;
    h += `<div class="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-5"><div class="w-full max-w-[390px] bg-slate-900 text-white rounded-3xl overflow-hidden border border-white/20">
      <div class="relative h-52"><img src="${v.img}" class="w-full h-full object-cover brightness-75"/><div class="absolute inset-0 flex flex-col items-center justify-center"><span class="px-3 py-1 rounded-full bg-[#8A1538] text-xs font-extrabold mb-2">▶ PLAYING HD REEL (${v.dur})</span><p class="text-xs text-slate-200">MVP: ${v.mvp}</p></div><button onclick="S.activeVideo=null;render()" class="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/70 font-bold">✕</button></div>
      <div class="p-4 flex justify-between items-center"><div><h4 class="font-extrabold text-sm">${v.title}</h4><p class="text-xs text-amber-400 mt-0.5">🏆 ${v.trophy}</p></div><button onclick="S.activeVideo=null;render()" class="px-4 py-2 rounded-xl bg-white/15 text-xs font-bold">Close</button></div>
    </div></div>`;
  }

  if (S.bk) {
    const m = S.bk, tot = (S.sz === 6 ? 5 : S.sz) * m.price;
    h += `<div class="fixed inset-0 z-50 bg-black/75 flex items-end"><div class="w-full max-w-[430px] mx-auto bg-slate-900 text-white border-t border-white/15 rounded-t-3xl p-5 space-y-4">
      <div class="flex justify-between items-center border-b border-white/10 pb-3"><div class="flex items-center gap-2.5">${logoTag("w-9 h-9 p-0.5")}<div><p class="text-[10px] text-emerald-400 font-extrabold">${m.day} • ${m.time}</p><h3 class="font-extrabold">${m.title}</h3></div></div><button onclick="S.bk=null;render()" class="w-8 h-8 rounded-full bg-white/10 font-bold">✕</button></div>
      <div><div class="flex justify-between text-xs mb-2"><span class="font-bold">Players</span><span class="bg-emerald-400 text-slate-950 font-extrabold px-2.5 py-0.5 rounded-full">6 = Pay for 5!</span></div><div class="grid grid-cols-6 gap-2">${[1,2,3,4,5,6].map(n=>`<button onclick="S.sz=${n};render()" class="py-2 rounded-xl font-extrabold text-sm ${S.sz===n?'bg-[#8A1538] text-white':'bg-white/10'}">${n}</button>`).join("")}</div></div>
      <div class="grid grid-cols-2 gap-2"><button onclick="S.pay='fawran';render()" class="p-3 rounded-xl border text-left text-xs font-extrabold ${S.pay==='fawran'?'border-emerald-400 bg-emerald-400/15':'border-white/15'}">⚡ Fawran Transfer</button><button onclick="S.pay='cash';render()" class="p-3 rounded-xl border text-left text-xs font-extrabold ${S.pay==='cash'?'border-emerald-400 bg-emerald-400/15':'border-white/15'}">💵 Cash at Pitch</button></div>
      ${S.pay==="fawran"?`<div class="p-3.5 rounded-xl bg-black/50 border border-white/10 text-xs space-y-2"><div class="flex justify-between"><span class="text-slate-300">Fawran Alias</span><b class="text-emerald-400">${S.db.alias} (${S.db.num})</b></div><label class="block py-2.5 rounded-lg border border-dashed border-white/30 text-center font-bold cursor-pointer">${S.ok?'✅ '+S.fn:'📸 Upload Fawran Receipt'}<input type="file" accept="image/*" onchange="if(this.files[0]){S.ok=true;S.fn=this.files[0].name;render()}" class="hidden"/></label></div>`:''}
      <div class="flex justify-between items-center pt-2"><div><p class="text-[11px] text-slate-400">Total Due</p><p class="text-xl font-extrabold text-emerald-400">${tot} QR</p></div><button onclick="submitBk()" class="px-6 py-3.5 rounded-2xl bg-[#8A1538] text-white font-extrabold text-sm shadow">Confirm Spot</button></div></div></div>`;
  }

  if (S.ed) h += `<div class="fixed inset-0 z-50 bg-black/75 flex items-end"><form onsubmit="saveEd(event)" class="w-full max-w-[430px] mx-auto bg-slate-900 text-white border-t border-white/15 rounded-t-3xl p-5 space-y-3"><div class="flex justify-between font-bold"><h3>Edit Pro Card</h3><button type="button" onclick="S.ed=false;render()">✕</button></div><input name="fn" value="${u.n}" class="w-full p-3 rounded-xl bg-white/10 text-sm font-bold"/><div class="grid grid-cols-2 gap-2"><select name="pos" class="p-3 rounded-xl bg-slate-800 text-sm font-bold">${["GK","DEF","MID","FWD","JOKER"].map(p=>`<option ${u.p===p?'selected':''}>${p}</option>`).join("")}</select><input name="num" type="number" value="${u.num}" placeholder="Jersey #" class="p-3 rounded-xl bg-white/10 text-sm font-bold"/></div><select name="nat" class="w-full p-3 rounded-xl bg-slate-800 text-sm font-bold">${["Qatar","Egypt","Jordan","Morocco","Ethiopia","India"].map(c=>`<option ${u.nat===c?'selected':''}>${c}</option>`).join("")}</select><button type="submit" class="w-full py-3.5 rounded-2xl bg-emerald-400 text-slate-950 font-extrabold">Save Card</button></form></div>`;

  document.getElementById("app").innerHTML = h + (S.msg ? `<div class="fixed top-5 left-1/2 -translate-x-1/2 z-50 bg-emerald-400 text-slate-950 text-xs font-extrabold px-4 py-2.5 rounded-xl shadow-xl">${S.msg}</div>` : "");
}

render();
