const OWNER = "creatbrook@gmail.com";
const IMG = {
  hero: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=80",
  p1: "https://images.unsplash.com/photo-1529900748604-07564a03e7a6?auto=format&fit=crop&w=800&q=80",
  p2: "https://images.unsplash.com/photo-1459865264687-595d652de67e?auto=format&fit=crop&w=800&q=80",
  p3: "https://images.unsplash.com/photo-1551958219-acbc608c6377?auto=format&fit=crop&w=800&q=80",
  av: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80"
};

const DB0 = {
  alias: "PANASPORT", num: "+974 5512 8890",
  matches: [
    { id:"m1", day:"Thu, 19 Nov", time:"08:00 PM", title:"8V8 FLOODLIT CLASH", venue:"Al Sadd Complex, Doha", area:"Al Sadd", dur:"90 min", price:35, tot:16, tak:13, lvl:"Competitive", img:IMG.p1,
      pl:[{n:"Tariq M.",p:"MID",r:88,b:"Red",x:50,y:48},{n:"Hamad T.",p:"DEF",r:85,b:"Red",x:28,y:72},{n:"Khalid A.",p:"FWD",r:87,b:"Red",x:72,y:68},{n:"Yousef K.",p:"FWD",r:86,b:"White",x:50,y:24},{n:"Omar N.",p:"GK",r:89,b:"White",x:50,y:10}] },
    { id:"m2", day:"Fri, 20 Nov", time:"09:30 PM", title:"7V7 ASPIRE TURF NIGHT", venue:"Aspire Zone Pitch 4, Al Waab", area:"Al Waab", dur:"60 min", price:28, tot:14, tak:10, lvl:"Friendly", img:IMG.p2,
      pl:[{n:"Nasser A.",p:"FWD",r:87,b:"Red",x:45,y:55},{n:"Sami H.",p:"MID",r:84,b:"White",x:55,y:30}] },
    { id:"m3", day:"Sat, 21 Nov", time:"08:00 PM", title:"9V9 LUSAIL ARENA", venue:"Lusail Marina Fields, Doha", area:"Lusail", dur:"90 min", price:30, tot:18, tak:15, lvl:"High Tempo", img:IMG.p3,
      pl:[{n:"Rashid K.",p:"DEF",r:88,b:"Red",x:50,y:60}] }
  ],
  chat: [
    { who:"Omar N. (GK)", txt:"Gloves are packed. Nobody scoring past White team tonight 🧤🔥", ago:"4m" },
    { who:"Khalid A.", txt:"6-for-5 squad deal locked in! Bringing 5 boys from Al Sadd.", ago:"11m" }
  ],
  rank: [
    {n:"Omar N.",pts:142,g:14,str:5,f:"🇶🇦"},
    {n:"Tariq Al-Mannai",pts:128,g:11,str:4,f:"🇶🇦"},
    {n:"Yousef K.",pts:115,g:12,str:3,f:"🇯🇴"}
  ],
  bks: [{id:"BK-9041",mid:"m1",mt:"8V8 FLOODLIT CLASH",pl:"Jassim Al-Kuwari",sz:1,qar:35,m:"Fawran",st:"Pending"}]
};

let saved = null;
try { saved = JSON.parse(localStorage.getItem("ps_viral_v1")); } catch(e) {}

let S = {
  scr:"splash", md:"phone", inp:"", own:false, tab:"matches", area:"All", chk:false, chatInp:"",
  detail:null, bk:null, sz:1, pay:"fawran", ok:false, fn:"", ed:false, nm:false, vot:null, duel:null, msg:null,
  u:{n:"Tariq Al-Mannai",ph:"+974 5589 4321",p:"MID",num:10,age:26,nat:"Qatar",fl:"🇶🇦",ovr:87,pac:86,sho:84,pas:89,dri:88,bal:70,av:IMG.av,pl:14,w:9,l:5,g:11,ast:7,str:4},
  db: saved || DB0
};

const sv = () => { try { localStorage.setItem("ps_viral_v1", JSON.stringify(S.db)); } catch(e) {} };
const say = t => { S.msg = t; render(); setTimeout(() => { S.msg = null; render(); }, 2500); };
const go = s => { S.scr = s; S.detail = null; window.scrollTo(0,0); render(); };

function doLogin() {
  const v = S.inp.trim();
  if (!v) return say(S.md === "phone" ? "Enter phone number" : "Enter email");
  if (S.md === "phone") { S.u.ph = "+974 " + v; S.own = false; }
  else { S.own = v.toLowerCase() === OWNER; if (!S.own) S.u.n = v.split("@")[0].toUpperCase(); }
  go("otp");
}

function doEnter() {
  if (S.own) { go("owner"); say("Manager Verified!"); }
  else { go("app"); say("Welcome to PANA SPORT Doha!"); }
}

function openDetail(id) { S.detail = S.db.matches.find(x => x.id === id) || S.db.matches[0]; window.scrollTo(0,0); render(); }
function openBk(id) { S.bk = S.db.matches.find(x => x.id === id) || S.db.matches[0]; S.sz = 1; S.pay = "fawran"; S.ok = false; S.fn = ""; render(); }

function postHype() {
  const t = S.chatInp.trim(); if (!t) return;
  S.db.chat.unshift({ who: `${S.u.n.split(" ")[0]} (#${S.u.num})`, txt: t, ago: "Now" });
  S.chatInp = ""; sv(); say("Posted to Locker Room! 🔥");
}

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

function swapBib(mid, idx) {
  const m = S.db.matches.find(x => x.id === mid); if (!m) return;
  const p = m.pl[idx]; p.b = p.b === "Red" ? "White" : "Red";
  p.y = p.b === "Red" ? 65 : 25; sv(); say(`Moved ${p.n} to ${p.b}`);
}

function copyWa(id) {
  const m = S.db.matches.find(x => x.id === id) || S.db.matches[0];
  const r = m.pl.filter(p=>p.b==="Red").map((p,i)=>`${i+1}. ${p.n}`).join("\n") || "1. Open";
  const w = m.pl.filter(p=>p.b==="White").map((p,i)=>`${i+1}. ${p.n}`).join("\n") || "1. Open";
  if (navigator.clipboard) navigator.clipboard.writeText(`🔥 *PANA SPORT QATAR — MATCHDAY*\n🏟️ *${m.title}*\n📍 ${m.venue} | 🕒 ${m.day} (${m.time})\n🎁 *6-for-5 Squad Deal Active!*\n\n🔴 *TEAM MAROON*\n${r}\n\n⚪ *TEAM WHITE*\n${w}\n\n📲 Claim last spots: https://yoyojaye.github.io/Panasport/`);
  say("Viral WhatsApp Match Poster copied!");
}

function addMatch(e) {
  e.preventDefault(); const f = e.target;
  S.db.matches.unshift({ id:"m"+Date.now(), day:f.d.value||"Sun, 22 Nov", time:f.tm.value||"09:00 PM", title:f.t.value.toUpperCase()||"8V8 NIGHT CLASH", venue:f.v.value||"Al Sadd Complex", area:"Al Sadd", dur:"90 min", price:+f.p.value||35, tot:+f.tot.value||16, tak:1, lvl:"Competitive", img:IMG.p1, pl:[{n:"Captain",p:"MID",r:87,b:"Red",x:50,y:50}] });
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
    h = `<div class="relative min-h-screen flex flex-col justify-between bg-slate-900 text-white"><img src="${IMG.hero}" class="absolute inset-0 w-full h-full object-cover opacity-85"/><div class="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-transparent"></div>
      <div class="relative z-10 px-6 pt-12 flex justify-between items-center"><span class="inline-flex items-center gap-2 bg-white text-slate-900 px-3.5 py-2 rounded-full text-xs font-extrabold shadow"><b class="w-6 h-6 rounded-full bg-[#8A1538] text-white flex items-center justify-center">PS</b>PANA SPORT</span><span class="px-3 py-1 rounded-full bg-black/60 border border-white/20 text-[11px] font-bold">🇶🇦 DOHA LIVE</span></div>
      <div class="relative z-10 px-6 pb-10"><span class="inline-block bg-emerald-400 text-slate-950 text-[11px] font-extrabold px-3 py-1 rounded-md mb-3">⚽ QATAR'S #1 PICKUP COMMUNITY</span><h1 class="text-3xl font-extrabold leading-tight uppercase mb-3">SHOW UP, BALL OUT,<br/>AND OWN THE<br/>DOHA PITCH</h1><p class="text-sm text-slate-200 mb-6">Live locker rooms, 1v1 rival challenges, Fawran instant spots & Pro FIFA cards.</p><button onclick="go('auth')" class="w-full py-4 rounded-2xl bg-[#8A1538] text-white font-extrabold text-base shadow-xl">Enter Stadium</button></div></div>`;
  } else if (S.scr === "auth") {
    const ph = S.md === "phone";
    h = `<div class="min-h-screen bg-[#F8FAFC] px-6 pt-12 pb-8"><button onclick="go('splash')" class="w-10 h-10 rounded-full bg-white shadow-sm border border-slate-200 font-bold">←</button><div class="text-center my-8"><div class="w-12 h-12 rounded-2xl bg-[#8A1538] text-white font-extrabold flex items-center justify-center mx-auto mb-3 shadow">PS</div><h1 class="text-2xl font-extrabold uppercase text-slate-900">JOIN THE SQUAD</h1></div>
      <div class="flex justify-center gap-8 border-b border-slate-200 mb-6"><button onclick="S.md='phone';S.inp='';render()" class="pb-3 text-xs font-extrabold ${ph?'text-[#8A1538] border-b-2 border-[#8A1538]':'text-slate-400'}">PHONE NUMBER</button><button onclick="S.md='email';S.inp='';render()" class="pb-3 text-xs font-extrabold ${!ph?'text-[#8A1538] border-b-2 border-[#8A1538]':'text-slate-400'}">EMAIL</button></div>
      ${ph?`<div class="flex gap-2"><div class="h-14 px-4 rounded-2xl bg-white border border-slate-200 flex items-center gap-2 font-extrabold text-sm">🇶🇦 +974</div><input type="tel" value="${S.inp}" oninput="S.inp=this.value" placeholder="Phone number" class="w-full h-14 px-4 rounded-2xl bg-white border border-slate-200 text-sm font-bold"/></div>`:`<input type="email" value="${S.inp}" oninput="S.inp=this.value" placeholder="Email address" class="w-full h-14 px-4 rounded-2xl bg-white border border-slate-200 text-sm font-bold"/>`}
      <button onclick="doLogin()" class="w-full mt-6 py-4 rounded-2xl bg-[#8A1538] text-white font-extrabold shadow-lg">Continue</button></div>`;
  } else if (S.scr === "otp") {
    h = `<div class="min-h-screen bg-[#F8FAFC] px-6 pt-12 pb-8 text-center"><button onclick="go('auth')" class="w-10 h-10 rounded-full bg-white border border-slate-200 font-bold float-left">←</button><h1 class="text-2xl font-extrabold uppercase mt-16 mb-2">VERIFY CODE</h1><p class="text-xs text-slate-500 mb-6">Sent to ${S.md==='phone'?S.u.ph:S.inp}</p>
      <div class="grid grid-cols-4 gap-3 max-w-[260px] mx-auto mb-6">${["7","4","9","2"].map(d=>`<input value="${d}" class="h-14 rounded-2xl bg-white border-2 border-[#8A1538]/30 text-center text-xl font-extrabold"/>`).join("")}</div>
      <button onclick="doEnter()" class="w-full py-4 rounded-2xl bg-[#8A1538] text-white font-extrabold shadow-lg">Kick Off</button></div>`;
  } else if (S.scr === "owner") {
    const rev = S.db.bks.reduce((s,b)=>s+b.qar,0);
    h = `<div class="min-h-screen bg-slate-900 text-white px-5 pt-10 pb-12"><div class="flex justify-between items-center mb-5"><div><span class="text-[10px] font-extrabold text-emerald-400">MANAGER COMMAND</span><h1 class="text-xl font-extrabold">PANA SPORT ADMIN</h1></div><div class="flex gap-2"><button onclick="go('app')" class="px-3 py-2 rounded-xl bg-white/10 text-xs font-bold">Player View</button><button onclick="S.own=false;go('splash')" class="px-3 py-2 rounded-xl bg-rose-500/20 text-rose-300 text-xs font-bold">Logout</button></div></div>
      <div class="grid grid-cols-2 gap-3 mb-4"><div class="bg-white/5 p-4 rounded-2xl"><p class="text-xs text-slate-400">Revenue</p><p class="text-2xl font-extrabold text-emerald-400">${rev} QR</p></div><div class="bg-white/5 p-4 rounded-2xl"><p class="text-xs text-slate-400">Bookings</p><p class="text-2xl font-extrabold text-amber-400">${S.db.bks.length}</p></div></div>
      <button onclick="S.nm=true;render()" class="w-full py-3.5 rounded-2xl bg-emerald-400 text-slate-950 font-extrabold text-sm mb-5">+ Publish New Match</button>
      <div class="space-y-3 mb-5">${S.db.bks.map(b=>`<div class="bg-white/5 p-4 rounded-2xl border border-white/10"><div class="flex justify-between font-extrabold text-sm"><span>${b.pl}</span><span class="text-emerald-400">${b.qar} QR</span></div><p class="text-xs text-slate-400">${b.mt} • ${b.m}</p><div class="flex justify-between items-center mt-3 pt-2 border-t border-white/10"><span class="text-xs font-bold ${b.st==='Pending'?'text-amber-400':'text-emerald-400'}">● ${b.st}</span>${b.st==='Pending'?`<div class="flex gap-2"><button onclick="actBk('${b.id}',0)" class="px-3 py-1 rounded bg-rose-500/20 text-rose-300 text-xs font-bold">Decline</button><button onclick="actBk('${b.id}',1)" class="px-3 py-1 rounded bg-emerald-400 text-slate-950 text-xs font-bold">✓ Approve</button></div>`:''}</div></div>`).join("")}</div>
      <button onclick="copyWa('m1')" class="w-full py-3.5 rounded-2xl bg-[#8A1538] font-extrabold text-sm">📲 Copy Viral WhatsApp Poster</button></div>`;
    if (S.nm) h += `<div class="fixed inset-0 z-50 bg-black/80 flex items-end"><form onsubmit="addMatch(event)" class="w-full max-w-[430px] mx-auto bg-slate-800 text-white rounded-t-3xl p-5 space-y-3"><div class="flex justify-between font-bold"><h3>New Match</h3><button type="button" onclick="S.nm=false;render()">✕</button></div><input name="t" placeholder="Title (8V8 AL SADD)" class="w-full p-3 rounded-xl bg-white/10 text-sm font-bold"/><div class="grid grid-cols-2 gap-2"><input name="d" placeholder="Sun, 22 Nov" class="p-3 rounded-xl bg-white/10 text-sm font-bold"/><input name="tm" placeholder="09:00 PM" class="p-3 rounded-xl bg-white/10 text-sm font-bold"/></div><input name="v" placeholder="Venue" class="w-full p-3 rounded-xl bg-white/10 text-sm font-bold"/><div class="grid grid-cols-2 gap-2"><input name="p" type="number" value="35" class="p-3 rounded-xl bg-white/10 text-sm font-bold"/><input name="tot" type="number" value="16" class="p-3 rounded-xl bg-white/10 text-sm font-bold"/></div><button type="submit" class="w-full py-3.5 rounded-2xl bg-emerald-400 text-slate-950 font-extrabold">Publish</button></form></div>`;
  } else if (S.detail) {
    const m = S.detail;
    h = `<div class="min-h-screen bg-[#F8FAFC] pb-28">
      <div class="relative h-52"><img src="${m.img}" class="w-full h-full object-cover"/><button onclick="S.detail=null;render()" class="absolute top-10 left-5 w-10 h-10 rounded-full bg-white/95 text-slate-900 shadow font-bold">←</button><button onclick="copyWa('${m.id}')" class="absolute top-10 right-5 px-3.5 py-2 rounded-full bg-emerald-500 text-white shadow text-xs font-extrabold">📲 Share Poster</button></div>
      <div class="px-5 pt-4">
        <div class="flex justify-between items-start"><div><span class="px-2.5 py-0.5 rounded-full bg-[#8A1538] text-white text-[10px] font-extrabold">${m.lvl}</span><h1 class="text-xl font-extrabold text-slate-900 mt-1.5">${m.title}</h1><p class="text-xs font-bold text-[#8A1538]">${m.day} • ${m.time} | 📍 ${m.venue}</p></div><div class="bg-white px-3 py-2 rounded-2xl border border-slate-200 text-center"><p class="text-base font-extrabold text-emerald-600">${m.price} QR</p><p class="text-[10px] text-slate-400">${m.dur}</p></div></div>
        <div class="mt-4 bg-white rounded-2xl p-4 border border-slate-200/80 shadow-sm">
          <h3 class="text-xs font-extrabold uppercase text-[#8A1538] mb-2.5">💬 LIVE LOCKER ROOM HYPE (${S.db.chat.length})</h3>
          <div class="space-y-2 mb-3 max-h-32 overflow-y-auto">${S.db.chat.map(c=>`<div class="bg-slate-50 p-2.5 rounded-xl text-xs"><div class="flex justify-between font-extrabold text-slate-800"><span>${c.who}</span><span class="text-[10px] text-slate-400">${c.ago}</span></div><p class="text-slate-600 mt-0.5">${c.txt}</p></div>`).join("")}</div>
          <div class="flex gap-2"><input value="${S.chatInp}" oninput="S.chatInp=this.value" placeholder="Drop pre-match hype..." class="flex-1 px-3 py-2 rounded-xl bg-slate-100 text-xs font-semibold"/><button onclick="postHype()" class="px-3.5 py-2 rounded-xl bg-[#8A1538] text-white text-xs font-extrabold">Send</button></div>
        </div>
      </div>
      <div class="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-white border-t border-slate-200 px-5 py-3.5 flex items-center gap-3">
        <div class="px-4 py-2 rounded-2xl bg-slate-100 text-center"><p class="text-sm font-extrabold">${m.tak}/${m.tot}</p><p class="text-[10px] text-slate-500">Spots</p></div>
        <button onclick="openBk('${m.id}')" class="flex-1 py-3.5 rounded-2xl bg-[#8A1538] text-white font-extrabold text-sm shadow-lg">Lock Spot - ${m.price} QR</button>
      </div></div>`;
  } else {
    const u = S.u;
    if (S.tab === "matches") {
      const list = S.area === "All" ? S.db.matches : S.db.matches.filter(m => m.area === S.area);
      h = `<div class="px-5 pt-9 pb-28">
        <div class="flex justify-between items-center mb-4">
          <div class="flex items-center gap-3" onclick="S.tab='card';render()"><img src="${u.av}" class="w-11 h-11 rounded-full object-cover border-2 border-[#8A1538]"/><div class="leading-tight"><p class="text-[10px] text-emerald-600 font-extrabold">🔥 ${u.str}-GAME STREAK • 24°C</p><h2 class="text-base font-extrabold uppercase">HI, ${u.n.split(" ")[0]} #${u.num}</h2></div></div>
          <div class="flex gap-2">${S.own?`<button onclick="go('owner')" class="px-3 py-1.5 rounded-full bg-[#8A1538] text-white text-xs font-extrabold">Admin</button>`:''}<button onclick="S.chk=!S.chk;say(S.chk?'Checked in for Tonight! ⚽':'Check-in paused')" class="px-3 py-1.5 rounded-full text-xs font-extrabold border ${S.chk?'bg-emerald-600 text-white border-emerald-600':'bg-white border-slate-200 text-slate-700'}">${S.chk?'✓ On Way':'📍 Check-In'}</button></div>
        </div>
        <div onclick="openDetail('m1')" class="rounded-3xl bg-gradient-to-r from-[#8A1538] via-[#6D102C] to-slate-900 p-5 text-white shadow-lg mb-5 cursor-pointer">
          <div class="flex justify-between items-start"><span class="px-2.5 py-0.5 rounded-full bg-emerald-400 text-slate-950 text-[10px] font-extrabold">SQUAD DEAL • 6 FOR 5</span><span class="text-xs font-extrabold text-amber-300">💬 ${S.db.chat.length} Locker Room Msgs</span></div>
          <h3 class="text-xl font-extrabold uppercase mt-2">BRING 6, PAY FOR 5</h3>
          <p class="text-xs text-white/80 mt-0.5">Tap to enter Locker Room & claim tonight's 3 remaining spots →</p>
        </div>
        <div class="flex gap-2 overflow-x-auto no-sb mb-4">${["All","Al Sadd","Al Waab","Lusail"].map(a=>`<button onclick="S.area='${a}';render()" class="px-4 py-2 rounded-2xl text-xs font-extrabold whitespace-nowrap ${S.area===a?'bg-[#8A1538] text-white shadow-sm':'bg-white text-slate-600 border border-slate-200'}">${a}</button>`).join("")}</div>
        <div class="space-y-4">${list.map(m=>`<div onclick="openDetail('${m.id}')" class="rounded-3xl bg-white border border-slate-200/80 shadow-sm overflow-hidden cursor-pointer">
          <div class="relative h-40"><img src="${m.img}" class="w-full h-full object-cover"/><span class="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#8A1538] text-white text-xs font-extrabold">👥 ${m.tak}/${m.tot}</span><span class="absolute bottom-3 left-3 px-2.5 py-1 rounded-full bg-black/75 text-white text-[10px] font-bold">💬 Locker Room Open</span></div>
          <div class="p-4 flex justify-between items-center gap-2"><div><span class="text-[10px] font-extrabold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">${m.lvl}</span><h4 class="font-extrabold text-base mt-1">${m.title}</h4><p class="text-xs text-slate-500">🕒 ${m.day} • ${m.time}</p><p class="text-xs text-slate-500">📍 ${m.venue}</p></div><div class="bg-slate-100 px-3.5 py-2.5 rounded-2xl text-center shrink-0"><p class="text-base font-extrabold text-[#8A1538]">${m.price} QR</p><p class="text-[10px] font-bold text-slate-500">${m.dur}</p></div></div>
        </div>`).join("")}</div>
      </div>`;
    } else if (S.tab === "tactics") {
      const m = S.db.matches[0];
      h = `<div class="px-5 pt-9 pb-28"><div class="flex justify-between items-center mb-3"><div><h2 class="text-base font-extrabold">INTERACTIVE PITCH</h2><p class="text-xs text-slate-500">Tap any player to swap Maroon/White bib</p></div><span class="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-extrabold">96% Balanced</span></div>
        <div class="relative w-full h-[330px] rounded-3xl pitch border-4 border-white shadow-xl overflow-hidden mb-4"><div class="absolute inset-x-0 top-1/2 h-0.5 bg-white/50"></div><div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full border-2 border-white/50"></div>
          ${m.pl.map((p,i)=>`<button onclick="swapBib('${m.id}',${i})" style="left:${p.x}%;top:${p.y}%" class="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"><div class="w-9 h-9 rounded-full ${p.b==='Red'?'bg-[#8A1538] text-white border-2 border-white':'bg-white text-slate-900 border-2 border-slate-900'} flex items-center justify-center text-[10px] font-extrabold shadow">${p.p}</div><span class="mt-1 px-1.5 rounded bg-black/75 text-white text-[9px] font-bold">${p.n}</span></button>`).join("")}</div>
        <button onclick="copyWa('${m.id}')" class="w-full py-3.5 rounded-2xl bg-[#8A1538] text-white font-extrabold text-sm shadow">📲 Share Lineup Poster to WhatsApp</button></div>`;
    } else if (S.tab === "rank") {
      h = `<div class="px-5 pt-9 pb-28"><h2 class="text-base font-extrabold mb-1">DOHA KING OF THE PITCH</h2><p class="text-xs text-slate-500 mb-3">Challenge a rival for a pre-match 1v1 duel</p><div class="space-y-2.5 mb-5">${S.db.rank.map((l,i)=>`<div class="flex justify-between items-center p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-sm"><div class="flex items-center gap-3"><span class="w-7 h-7 rounded-full ${i===0?'bg-amber-400 text-slate-950':'bg-slate-100 text-slate-700'} flex items-center justify-center text-xs font-extrabold">#${i+1}</span><div><p class="text-sm font-extrabold">${l.f} ${l.n}</p><p class="text-[11px] text-slate-500">${l.g} Goals • 🔥 ${l.str} Streak</p></div></div><button onclick="S.duel='${l.n}';say('⚔️ Challenged ${l.n} to a 1v1 Duel!')" class="px-3 py-1.5 rounded-xl text-xs font-extrabold ${S.duel===l.n?'bg-emerald-600 text-white':'bg-[#8A1538]/10 text-[#8A1538]'}">${S.duel===l.n?'✓ Challenged':'⚔️ 1v1 Duel'}</button></div>`).join("")}</div>
        <div class="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm"><p class="text-xs font-extrabold text-[#8A1538] mb-2">🏆 VOTE TONIGHT'S MAN OF THE MATCH</p><div class="grid grid-cols-2 gap-2">${["Tariq M.","Yousef K.","Omar N.","Hamad T."].map(n=>`<button onclick="S.vot='${n}';say('Voted ${n} for MOTM!')" class="py-2.5 rounded-xl text-xs font-extrabold border ${S.vot===n?'bg-[#8A1538] text-white border-[#8A1538]':'bg-slate-50 border-slate-200'}">${n}</button>`).join("")}</div></div></div>`;
    } else {
      h = `<div class="px-5 pt-9 pb-28">
        <div class="flex justify-between items-center mb-4"><h2 class="text-lg font-extrabold">PRO PLAYER CARD</h2><button onclick="S.ed=true;render()" class="text-xs font-extrabold text-[#8A1538]">Edit Card</button></div>
        <div class="rounded-3xl bg-gradient-to-br from-[#8A1538] via-[#660F29] to-slate-900 text-white p-5 border-2 border-amber-400 shadow-xl mb-4">
          <div class="flex items-center gap-4"><div class="text-center"><p class="text-4xl font-extrabold text-amber-300">${u.ovr}</p><p class="text-xs font-extrabold">${u.p}</p><p class="text-lg">${u.fl}</p></div>
          <label class="relative cursor-pointer shrink-0"><img src="${u.av}" class="w-20 h-24 rounded-2xl object-cover border-2 border-amber-300"/><span class="absolute bottom-1 right-1 bg-black/80 text-[10px] px-1.5 rounded">📷</span><input type="file" accept="image/*" onchange="const r=new FileReader();r.onload=e=>{S.u.av=e.target.result;render();say('Photo updated!')};r.readAsDataURL(this.files[0])" class="hidden"/></label>
          <div><span class="px-2 py-0.5 rounded bg-amber-400 text-slate-950 text-[10px] font-extrabold">JERSEY #${u.num}</span><h3 class="font-extrabold text-base uppercase mt-1">${u.n}</h3><p class="text-xs text-amber-200">${u.nat} • 🔥 ${u.str} Win Streak</p></div></div>
          <div class="grid grid-cols-4 gap-2 mt-4 pt-3 border-t border-white/15 text-center text-xs"><div><b>${u.pac}</b><p class="text-[9px] text-white/70">PAC</p></div><div><b>${u.sho}</b><p class="text-[9px] text-white/70">SHO</p></div><div><b>${u.pas}</b><p class="text-[9px] text-white/70">PAS</p></div><div><b>${u.dri}</b><p class="text-[9px] text-white/70">DRI</p></div></div>
        </div>
        <div class="grid grid-cols-2 gap-2.5 mb-4">
          <button onclick="boostStat('g')" class="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm text-left"><p class="text-2xl font-extrabold text-[#8A1538]">⚽ ${u.g}</p><p class="text-xs font-bold text-slate-500">Goals (+ Boost OVR)</p></button>
          <button onclick="boostStat('a')" class="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm text-left"><p class="text-2xl font-extrabold text-emerald-600">🎯 ${u.ast}</p><p class="text-xs font-bold text-slate-500">Assists (+ Boost OVR)</p></button>
        </div>
        <button onclick="S.own=false;go('splash')" class="w-full py-3.5 rounded-2xl bg-white border border-slate-200 text-rose-600 font-extrabold text-xs">Sign Out</button>
      </div>`;
    }

    h += `<div class="fixed bottom-3 left-1/2 -translate-x-1/2 w-[94%] max-w-[405px] bg-white/95 backdrop-blur-md border border-slate-200 rounded-3xl px-2 py-2 flex items-center justify-between z-40 shadow-xl">
      <button onclick="S.tab='matches';render()" class="flex-1 flex flex-col items-center text-[10px] font-extrabold ${S.tab==='matches'?'text-[#8A1538]':'text-slate-400'}"><span class="text-base">🏟️</span>Matches</button>
      <button onclick="S.tab='tactics';render()" class="flex-1 flex flex-col items-center text-[10px] font-extrabold ${S.tab==='tactics'?'text-[#8A1538]':'text-slate-400'}"><span class="text-base">📋</span>Pitch</button>
      <button onclick="openBk('m1')" class="-mt-6 px-4 py-2.5 rounded-2xl bg-[#8A1538] text-white font-extrabold text-[10px] shadow-lg border-2 border-[#F8FAFC]">⚽ BOOK</button>
      <button onclick="S.tab='rank';render()" class="flex-1 flex flex-col items-center text-[10px] font-extrabold ${S.tab==='rank'?'text-[#8A1538]':'text-slate-400'}"><span class="text-base">⚔️</span>Rivals</button>
      <button onclick="S.tab='card';render()" class="flex-1 flex flex-col items-center text-[10px] font-extrabold ${S.tab==='card'?'text-[#8A1538]':'text-slate-400'}"><span class="text-base">🪪</span>Card</button></div>`;
  }

  if (S.bk) {
    const m = S.bk, tot = (S.sz === 6 ? 5 : S.sz) * m.price;
    h += `<div class="fixed inset-0 z-50 bg-black/60 flex items-end"><div class="w-full max-w-[430px] mx-auto bg-white rounded-t-3xl p-5 space-y-4">
      <div class="flex justify-between items-center border-b border-slate-100 pb-3"><div><p class="text-[10px] text-[#8A1538] font-extrabold">${m.day} • ${m.time}</p><h3 class="font-extrabold">${m.title}</h3></div><button onclick="S.bk=null;render()" class="w-8 h-8 rounded-full bg-slate-100 font-bold">✕</button></div>
      <div><div class="flex justify-between text-xs mb-2"><span class="font-bold">Players</span><span class="bg-emerald-100 text-emerald-800 font-extrabold px-2.5 py-0.5 rounded-full">6 = Pay for 5!</span></div><div class="grid grid-cols-6 gap-2">${[1,2,3,4,5,6].map(n=>`<button onclick="S.sz=${n};render()" class="py-2 rounded-xl font-extrabold text-sm ${S.sz===n?'bg-[#8A1538] text-white':'bg-slate-100'}">${n}</button>`).join("")}</div></div>
      <div class="grid grid-cols-2 gap-2"><button onclick="S.pay='fawran';render()" class="p-3 rounded-xl border text-left text-xs font-extrabold ${S.pay==='fawran'?'border-[#8A1538] bg-[#8A1538]/5':'border-slate-200'}">⚡ Fawran Transfer</button><button onclick="S.pay='cash';render()" class="p-3 rounded-xl border text-left text-xs font-extrabold ${S.pay==='cash'?'border-[#8A1538] bg-[#8A1538]/5':'border-slate-200'}">💵 Cash at Pitch</button></div>
      ${S.pay==="fawran"?`<div class="p-3.5 rounded-xl bg-slate-900 text-white text-xs space-y-2"><div class="flex justify-between"><span class="text-slate-400">Fawran Alias</span><b class="text-emerald-400">${S.db.alias} (${S.db.num})</b></div><label class="block py-2.5 rounded-lg border border-dashed border-white/30 text-center font-bold cursor-pointer">${S.ok?'✅ '+S.fn:'📸 Upload Fawran Receipt'}<input type="file" accept="image/*" onchange="if(this.files[0]){S.ok=true;S.fn=this.files[0].name;render()}" class="hidden"/></label></div>`:''}
      <div class="flex justify-between items-center pt-2"><div><p class="text-[11px] text-slate-400">Total Due</p><p class="text-xl font-extrabold text-[#8A1538]">${tot} QR</p></div><button onclick="submitBk()" class="px-6 py-3.5 rounded-2xl bg-[#8A1538] text-white font-extrabold text-sm shadow">Confirm Spot</button></div></div></div>`;
  }

  if (S.ed) h += `<div class="fixed inset-0 z-50 bg-black/60 flex items-end"><form onsubmit="saveEd(event)" class="w-full max-w-[430px] mx-auto bg-white rounded-t-3xl p-5 space-y-3"><div class="flex justify-between font-bold"><h3>Edit Pro Card</h3><button type="button" onclick="S.ed=false;render()">✕</button></div><input name="fn" value="${S.u.n}" class="w-full p-3 rounded-xl border border-slate-200 text-sm font-bold"/><div class="grid grid-cols-2 gap-2"><select name="pos" class="p-3 rounded-xl border border-slate-200 text-sm font-bold">${["GK","DEF","MID","FWD","JOKER"].map(p=>`<option ${S.u.p===p?'selected':''}>${p}</option>`).join("")}</select><input name="num" type="number" value="${S.u.num}" placeholder="Jersey #" class="p-3 rounded-xl border border-slate-200 text-sm font-bold"/></div><select name="nat" class="w-full p-3 rounded-xl border border-slate-200 text-sm font-bold">${["Qatar","Egypt","Jordan","Morocco","Ethiopia","India"].map(c=>`<option ${S.u.nat===c?'selected':''}>${c}</option>`).join("")}</select><button type="submit" class="w-full py-3.5 rounded-2xl bg-[#8A1538] text-white font-extrabold">Save Card</button></form></div>`;

  document.getElementById("app").innerHTML = h + (S.msg ? `<div class="fixed top-5 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white text-xs font-extrabold px-4 py-2.5 rounded-xl shadow-xl">${S.msg}</div>` : "");
}

render();
