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
    { id:"m1", day:"Thu, 19 Nov", time:"08:00 PM", title:"8V8 FLOODLIT CLASH", venue:"Al Sadd Complex, Doha", area:"Al Sadd", dur:"90 min", price:35, tot:16, tak:13, lvl:"Competitive", rec:true, img:IMG.p1,
      pl:[{n:"Tariq M.",p:"MID",r:88,b:"Red",x:50,y:48},{n:"Hamad T.",p:"DEF",r:85,b:"Red",x:28,y:72},{n:"Khalid A.",p:"FWD",r:87,b:"Red",x:72,y:68},{n:"Yousef K.",p:"FWD",r:86,b:"White",x:50,y:24},{n:"Omar N.",p:"GK",r:89,b:"White",x:50,y:10}] },
    { id:"m2", day:"Fri, 20 Nov", time:"09:30 PM", title:"7V7 ASPIRE TURF NIGHT", venue:"Aspire Zone Pitch 4, Al Waab", area:"Al Waab", dur:"60 min", price:28, tot:14, tak:10, lvl:"Friendly", rec:true, img:IMG.p2,
      pl:[{n:"Nasser A.",p:"FWD",r:87,b:"Red",x:45,y:55},{n:"Sami H.",p:"MID",r:84,b:"White",x:55,y:30}] },
    { id:"m3", day:"Sat, 21 Nov", time:"08:00 PM", title:"9V9 LUSAIL ARENA", venue:"Lusail Marina Fields, Doha", area:"Lusail", dur:"90 min", price:30, tot:18, tak:15, lvl:"Competitive", rec:true, img:IMG.p3,
      pl:[{n:"Rashid K.",p:"DEF",r:88,b:"Red",x:50,y:60}] }
  ],
  rank: [{n:"Omar N.",pts:142,g:14,f:"🇶🇦"},{n:"Tariq Al-Mannai",pts:128,g:11,f:"🇶🇦"},{n:"Yousef K.",pts:115,g:12,f:"🇯🇴"}],
  bks: [{id:"BK-9041",mid:"m1",mt:"8V8 FLOODLIT CLASH",pl:"Jassim Al-Kuwari",sz:1,qar:35,m:"Fawran",st:"Pending"}]
};

let saved = null;
try { saved = JSON.parse(localStorage.getItem("ps_pro_v1")); } catch(e) {}

let S = {
  scr:"splash", md:"phone", inp:"", own:false, tab:"matches", filter:"All", viewAll:false,
  detail:null, bk:null, sz:1, pay:"fawran", ok:false, fn:"", ed:false, nm:false, accOpen:true, vot:null, msg:null,
  u:{n:"Tariq Al-Mannai",ph:"+974 5589 4321",p:"MID",age:26,nat:"Qatar",fl:"🇶🇦",ovr:87,bal:70,av:IMG.av,pl:14,w:9,l:5,g:11,gf:6,gc:5},
  db: saved || DB0
};

const sv = () => { try { localStorage.setItem("ps_pro_v1", JSON.stringify(S.db)); } catch(e) {} };
const say = t => { S.msg = t; render(); setTimeout(() => { S.msg = null; render(); }, 2400); };
const go = s => { S.scr = s; S.detail = null; S.viewAll = false; window.scrollTo(0,0); render(); };

function doLogin() {
  const v = S.inp.trim();
  if (!v) return say(S.md === "phone" ? "Enter phone number" : "Enter email");
  if (S.md === "phone") { S.u.ph = "+974 " + v; S.own = false; }
  else { S.own = v.toLowerCase() === OWNER; if (!S.own) S.u.n = v.split("@")[0].toUpperCase(); }
  go("otp");
}

function doEnter() {
  if (S.own) { go("owner"); say("Manager Verified!"); }
  else { go("app"); say("Welcome to PANA SPORT!"); }
}

function openDetail(id) {
  S.detail = S.db.matches.find(x => x.id === id) || S.db.matches[0];
  window.scrollTo(0,0); render();
}

function openBk(id) {
  S.bk = S.db.matches.find(x => x.id === id) || S.db.matches[0];
  S.sz = 1; S.pay = "fawran"; S.ok = false; S.fn = ""; render();
}

function submitBk() {
  const m = S.bk; if (!m) return;
  if (S.pay === "fawran" && !S.ok) return say("Upload Fawran receipt first");
  const qar = (S.sz === 6 ? 5 : S.sz) * m.price;
  S.db.bks.unshift({ id:"BK-"+Math.floor(1000+Math.random()*9000), mid:m.id, mt:m.title, pl:S.u.n+(S.sz>1?` (+${S.sz-1})`:""), sz:S.sz, qar, m:S.pay==="fawran"?"Fawran":"Cash", st:S.pay==="fawran"?"Pending":"Confirmed" });
  m.tak = Math.min(m.tot, m.tak + S.sz);
  m.pl.push({ n:S.u.n.split(" ")[0], p:S.u.p, r:S.u.ovr, b:m.pl.length%2===0?"Red":"White", x:40+Math.random()*20, y:40+Math.random()*25 });
  sv(); S.bk = null; S.detail = null; say(S.pay === "fawran" ? "Receipt sent to manager!" : "Spot reserved!");
}

function actBk(id, yes) {
  const i = S.db.bks.findIndex(x => x.id === id); if (i < 0) return;
  const b = S.db.bks[i];
  if (yes) { b.st = "Approved"; say("Approved " + b.pl); }
  else { const m = S.db.matches.find(x => x.id === b.mid); if (m) m.tak = Math.max(0, m.tak - b.sz); S.db.bks.splice(i,1); say("Declined"); }
  sv();
}

function balBibs(id) {
  const m = S.db.matches.find(x => x.id === id); if (!m) return;
  m.pl.sort((a,b) => b.r - a.r).forEach((p,i) => { p.b = (i%4===0||i%4===3)?"Red":"White"; p.y = p.b==="Red"?60+(i*6)%22:16+(i*6)%22; });
  sv(); say("Teams balanced!");
}

function copyWa(id) {
  const m = S.db.matches.find(x => x.id === id) || S.db.matches[0];
  const r = m.pl.filter(p=>p.b==="Red").map((p,i)=>`${i+1}. ${p.n}`).join("\n") || "1. Open";
  const w = m.pl.filter(p=>p.b==="White").map((p,i)=>`${i+1}. ${p.n}`).join("\n") || "1. Open";
  if (navigator.clipboard) navigator.clipboard.writeText(`⚽ *PANA SPORT DOHA*\n🏟️ ${m.title} (${m.day} ${m.time})\n🔴 MAROON:\n${r}\n⚪ WHITE:\n${w}\n📲 https://yoyojaye.github.io/Panasport/`);
  say("WhatsApp lineup copied!");
}

function addMatch(e) {
  e.preventDefault(); const f = e.target;
  S.db.matches.unshift({ id:"m"+Date.now(), day:f.d.value||"Sun, 22 Nov", time:f.tm.value||"09:00 PM", title:f.t.value.toUpperCase()||"8V8 NIGHT CLASH", venue:f.v.value||"Al Sadd Complex", area:"Al Sadd", dur:"90 min", price:+f.p.value||35, tot:+f.tot.value||16, tak:1, lvl:"Competitive", rec:true, img:IMG.p1, pl:[{n:"Captain",p:"MID",r:87,b:"Red",x:50,y:50}] });
  sv(); S.nm = false; say("New match live!");
}

function saveEd(e) {
  e.preventDefault(); const f = e.target;
  S.u.n = f.fn.value || S.u.n; S.u.p = f.pos.value; S.u.age = +f.age.value || 25; S.u.nat = f.nat.value;
  S.u.fl = {Qatar:"🇶🇦",Egypt:"🇪🇬",Jordan:"🇯🇴",Morocco:"🇲🇦",Ethiopia:"🇪🇹",India:"🇮🇳"}[S.u.nat] || "🇶🇦";
  S.ed = false; say("Profile saved!");
}

function matchCard(m, wide) {
  return `<div onclick="openDetail('${m.id}')" class="${wide?'w-full':'w-[275px] shrink-0'} rounded-3xl bg-[#141B2D] border border-white/10 overflow-hidden cursor-pointer">
    <div class="relative h-36"><img src="${m.img}" class="w-full h-full object-cover"/>
      <span class="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-[#8A1538] text-[11px] font-extrabold">👥 ${m.tak}/${m.tot}</span>
      ${m.rec?`<span class="absolute bottom-2.5 left-3 px-2.5 py-0.5 rounded-full bg-black/75 text-[10px] font-bold">🔴 Recorded</span>`:''}
    </div>
    <div class="p-3.5">
      <div class="flex gap-1.5 mb-2"><span class="px-2 py-0.5 rounded-full bg-[#8A1538] text-[9px] font-extrabold">By PANA SPORT</span><span class="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[9px] font-extrabold">${m.lvl}</span></div>
      <div class="flex justify-between items-center gap-2">
        <div class="min-w-0"><h4 class="font-extrabold text-sm truncate">${m.title}</h4><p class="text-[11px] text-slate-400 mt-0.5">🕒 ${m.day} | ${m.time}</p><p class="text-[11px] text-slate-400 truncate">📍 ${m.venue}</p></div>
        <div class="bg-white/5 px-3 py-2 rounded-2xl text-center shrink-0"><p class="text-sm font-extrabold text-emerald-400">${m.price} QR</p><p class="text-[10px] text-slate-400">${m.dur}</p></div>
      </div>
    </div>
  </div>`;
}

function render() {
  let h = "";
  if (S.scr === "splash") {
    h = `<div class="relative min-h-screen flex flex-col justify-between bg-black"><img src="${IMG.hero}" class="absolute inset-0 w-full h-full object-cover opacity-80"/><div class="absolute inset-0 bg-gradient-to-t from-[#0B101D] via-black/50 to-black/20"></div>
      <div class="relative z-10 px-6 pt-12"><span class="inline-flex items-center gap-2 bg-black/60 border border-white/15 px-3.5 py-2 rounded-full text-xs font-extrabold"><b class="w-6 h-6 rounded-full bg-[#8A1538] flex items-center justify-center">PS</b>PANA SPORT</span></div>
      <div class="relative z-10 px-6 pb-10"><span class="inline-block bg-[#8A1538] text-[11px] font-extrabold px-3 py-1 rounded mb-3">🇶🇦 DOHA NIGHT FOOTBALL</span><h1 class="text-3xl font-extrabold leading-tight uppercase mb-3">SHOW UP, PLAY,<br/>AND LET US HANDLE<br/>THE DETAILS</h1><p class="text-sm text-slate-300 mb-6">Floodlit Doha pickup games, Fawran verification & balanced squads.</p><button onclick="go('auth')" class="w-full py-4 rounded-2xl bg-[#8A1538] font-extrabold text-base shadow-xl">Continue</button></div></div>`;
  } else if (S.scr === "auth") {
    const ph = S.md === "phone";
    h = `<div class="min-h-screen px-6 pt-12 pb-8"><button onclick="go('splash')" class="w-10 h-10 rounded-full bg-white/10 font-bold">←</button><div class="text-center my-8"><div class="w-12 h-12 rounded-2xl bg-[#8A1538] font-extrabold flex items-center justify-center mx-auto mb-3">PS</div><h1 class="text-2xl font-extrabold uppercase">LET'S GET STARTED!</h1></div>
      <div class="flex justify-center gap-8 border-b border-white/10 mb-6"><button onclick="S.md='phone';S.inp='';render()" class="pb-3 text-xs font-extrabold ${ph?'text-emerald-400 border-b-2 border-emerald-400':'text-slate-400'}">PHONE NUMBER</button><button onclick="S.md='email';S.inp='';render()" class="pb-3 text-xs font-extrabold ${!ph?'text-emerald-400 border-b-2 border-emerald-400':'text-slate-400'}">EMAIL</button></div>
      ${ph?`<div class="flex gap-2"><div class="h-14 px-4 rounded-2xl bg-white/10 flex items-center gap-2 font-extrabold text-sm">🇶🇦 +974</div><input type="tel" value="${S.inp}" oninput="S.inp=this.value" placeholder="Phone number" class="w-full h-14 px-4 rounded-2xl bg-white/10 text-sm font-bold text-white"/></div>`:`<input type="email" value="${S.inp}" oninput="S.inp=this.value" placeholder="Email address" class="w-full h-14 px-4 rounded-2xl bg-white/10 text-sm font-bold text-white"/>`}
      <button onclick="doLogin()" class="w-full mt-6 py-4 rounded-2xl bg-[#8A1538] font-extrabold">Continue</button></div>`;
  } else if (S.scr === "otp") {
    h = `<div class="min-h-screen px-6 pt-12 pb-8 text-center"><button onclick="go('auth')" class="w-10 h-10 rounded-full bg-white/10 font-bold float-left">←</button><h1 class="text-2xl font-extrabold uppercase mt-16 mb-2">VERIFY CODE</h1><p class="text-xs text-slate-400 mb-6">Sent to ${S.md==='phone'?S.u.ph:S.inp}</p>
      <div class="grid grid-cols-4 gap-3 max-w-[260px] mx-auto mb-6">${["7","4","9","2"].map(d=>`<input value="${d}" class="h-14 rounded-2xl bg-white/10 border border-emerald-400/50 text-center text-xl font-extrabold"/>`).join("")}</div>
      <button onclick="doEnter()" class="w-full py-4 rounded-2xl bg-emerald-400 text-slate-950 font-extrabold">Enter Pitch</button></div>`;
  } else if (S.scr === "owner") {
    const rev = S.db.bks.reduce((s,b)=>s+b.qar,0);
    h = `<div class="min-h-screen px-5 pt-10 pb-12"><div class="flex justify-between items-center mb-5"><div><span class="text-[10px] font-extrabold text-emerald-400">MANAGER ADMIN</span><h1 class="text-xl font-extrabold">PANA SPORT</h1></div><div class="flex gap-2"><button onclick="go('app')" class="px-3 py-2 rounded-xl bg-white/10 text-xs font-bold">Player View</button><button onclick="S.own=false;go('splash')" class="px-3 py-2 rounded-xl bg-rose-500/20 text-rose-300 text-xs font-bold">Logout</button></div></div>
      <div class="grid grid-cols-2 gap-3 mb-4"><div class="bg-white/5 p-4 rounded-2xl"><p class="text-xs text-slate-400">Revenue</p><p class="text-2xl font-extrabold text-emerald-400">${rev} QR</p></div><div class="bg-white/5 p-4 rounded-2xl"><p class="text-xs text-slate-400">Bookings</p><p class="text-2xl font-extrabold text-amber-400">${S.db.bks.length}</p></div></div>
      <button onclick="S.nm=true;render()" class="w-full py-3.5 rounded-2xl bg-emerald-400 text-slate-950 font-extrabold text-sm mb-5">+ Create New Match</button>
      <div class="space-y-3 mb-5">${S.db.bks.map(b=>`<div class="bg-white/5 p-4 rounded-2xl border border-white/10"><div class="flex justify-between font-extrabold text-sm"><span>${b.pl}</span><span class="text-emerald-400">${b.qar} QR</span></div><p class="text-xs text-slate-400">${b.mt} • ${b.m}</p><div class="flex justify-between items-center mt-3 pt-2 border-t border-white/10"><span class="text-xs font-bold ${b.st==='Pending'?'text-amber-400':'text-emerald-400'}">● ${b.st}</span>${b.st==='Pending'?`<div class="flex gap-2"><button onclick="actBk('${b.id}',0)" class="px-3 py-1 rounded bg-rose-500/20 text-rose-300 text-xs font-bold">Decline</button><button onclick="actBk('${b.id}',1)" class="px-3 py-1 rounded bg-emerald-400 text-slate-950 text-xs font-bold">✓ Approve</button></div>`:''}</div></div>`).join("")}</div>
      <button onclick="copyWa('m1')" class="w-full py-3.5 rounded-2xl bg-[#8A1538] font-extrabold text-sm">📲 Copy Lineup for WhatsApp</button></div>`;
    if (S.nm) h += `<div class="fixed inset-0 z-50 bg-black/80 flex items-end"><form onsubmit="addMatch(event)" class="w-full max-w-[430px] mx-auto bg-slate-900 rounded-t-3xl p-5 space-y-3"><div class="flex justify-between font-bold"><h3>New Match</h3><button type="button" onclick="S.nm=false;render()">✕</button></div><input name="t" placeholder="Title (8V8 AL SADD)" class="w-full p-3 rounded-xl bg-white/10 text-sm font-bold"/><div class="grid grid-cols-2 gap-2"><input name="d" placeholder="Sun, 22 Nov" class="p-3 rounded-xl bg-white/10 text-sm font-bold"/><input name="tm" placeholder="09:00 PM" class="p-3 rounded-xl bg-white/10 text-sm font-bold"/></div><input name="v" placeholder="Venue" class="w-full p-3 rounded-xl bg-white/10 text-sm font-bold"/><div class="grid grid-cols-2 gap-2"><input name="p" type="number" value="35" class="p-3 rounded-xl bg-white/10 text-sm font-bold"/><input name="tot" type="number" value="16" class="p-3 rounded-xl bg-white/10 text-sm font-bold"/></div><button type="submit" class="w-full py-3.5 rounded-2xl bg-emerald-400 text-slate-950 font-extrabold">Publish</button></form></div>`;
  } else if (S.detail) {
    const m = S.detail;
    h = `<div class="min-h-screen pb-28">
      <div class="relative h-56"><img src="${m.img}" class="w-full h-full object-cover"/><button onclick="S.detail=null;render()" class="absolute top-10 left-5 w-10 h-10 rounded-full bg-black/60 font-bold">←</button><button onclick="copyWa('${m.id}')" class="absolute top-10 right-5 px-3 py-2 rounded-full bg-black/60 text-xs font-bold">📲 Share</button></div>
      <div class="px-5 pt-5">
        <h1 class="text-2xl font-extrabold">${m.title}</h1>
        <p class="text-sm font-bold text-[#E11D48] mt-1">${m.day} - ${m.time}</p>
        <p class="text-xs text-slate-400 mt-1">📍 ${m.venue}</p>
        <div class="grid grid-cols-3 gap-2.5 my-5 bg-white/5 p-3.5 rounded-2xl border border-white/10 text-center">
          <div><p class="text-[11px] text-slate-400">Pitch</p><p class="text-sm font-extrabold mt-0.5">Pro Turf</p></div>
          <div><p class="text-[11px] text-slate-400">Duration</p><p class="text-sm font-extrabold mt-0.5">${m.dur}</p></div>
          <div><p class="text-[11px] text-slate-400">Price</p><p class="text-sm font-extrabold text-emerald-400 mt-0.5">${m.price} QR</p></div>
        </div>
        <h3 class="text-sm font-extrabold mb-2">Match Rules & Info</h3>
        <ul class="space-y-2 text-xs text-slate-300">
          <li>⚽ Open to all Doha pickup players & squads.</li>
          <li>👕 Maroon & White bibs provided at the pitch.</li>
          <li>🕒 Arrive 15 minutes before kickoff for warm-up.</li>
          <li>🎁 Bring 6 friends & pay for only 5 spots!</li>
        </ul>
      </div>
      <div class="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-[#141B2D] border-t border-white/10 px-5 py-3.5 flex items-center gap-3">
        <div class="px-4 py-2 rounded-2xl bg-white/5 border border-white/10 text-center"><p class="text-sm font-extrabold">${m.tak}/${m.tot}</p><p class="text-[10px] text-slate-400">Spots</p></div>
        <button onclick="openBk('${m.id}')" class="flex-1 py-3.5 rounded-2xl bg-[#8A1538] font-extrabold text-sm shadow-lg">Join - ${m.price} QR</button>
      </div></div>`;
  } else {
    const u = S.u;
    if (S.viewAll) {
      const list = S.filter === "All" ? S.db.matches : S.db.matches.filter(m => m.area === S.filter || m.lvl === S.filter);
      h = `<div class="px-5 pt-10 pb-28">
        <div class="flex items-center gap-3 mb-4"><button onclick="S.viewAll=false;render()" class="w-9 h-9 rounded-full bg-white/10 font-bold">←</button><h2 class="text-lg font-extrabold uppercase">ALL DOHA GAMES</h2></div>
        <div class="flex gap-2 overflow-x-auto no-sb mb-4">${["All","Al Sadd","Al Waab","Lusail","Competitive","Friendly"].map(f=>`<button onclick="S.filter='${f}';render()" class="px-3.5 py-1.5 rounded-full text-xs font-extrabold whitespace-nowrap ${S.filter===f?'bg-[#8A1538] text-white':'bg-white/10 text-slate-300'}">${f}</button>`).join("")}</div>
        <div class="space-y-4">${list.map(m => matchCard(m, true)).join("")}</div>
      </div>`;
    } else if (S.tab === "matches") {
      h = `<div class="px-5 pt-9 pb-28">
        <div class="flex justify-between items-center mb-5">
          <div class="flex items-center gap-3" onclick="S.tab='card';render()"><img src="${u.av}" class="w-11 h-11 rounded-full object-cover border-2 border-[#8A1538]"/><div><p class="text-[10px] text-slate-400 font-bold">HELLO,</p><h2 class="text-base font-extrabold uppercase">${u.n.split(" ")[0]}</h2></div></div>
          <div class="flex gap-2">${S.own?`<button onclick="go('owner')" class="px-3 py-1.5 rounded-full bg-[#8A1538] text-xs font-extrabold">Admin</button>`:''}<button onclick="say('All Doha matches live!')" class="w-9 h-9 rounded-full bg-white/10 text-xs">🔔</button></div>
        </div>
        <div class="flex justify-between items-center mb-5">
          <div><p class="text-[11px] text-emerald-400 font-bold">PANA Wallet</p><p class="text-2xl font-extrabold">${u.bal.toFixed(2)} QR</p></div>
          <button onclick="S.u.bal+=35;say('+35 QR Fawran Credit Added!')" class="px-4 py-2 rounded-full bg-white/10 border border-white/10 text-xs font-extrabold">+ Top Up</button>
        </div>
        <div onclick="openDetail('m1')" class="relative rounded-3xl overflow-hidden h-40 mb-6 cursor-pointer bg-gradient-to-r from-[#8A1538] to-slate-900 border border-white/10">
          <img src="${IMG.hero}" class="absolute inset-0 w-full h-full object-cover opacity-45"/>
          <div class="relative z-10 p-5 h-full flex flex-col justify-between">
            <div><span class="px-2.5 py-0.5 rounded-full bg-emerald-400 text-slate-950 text-[10px] font-extrabold">WINNER STAYS ON • 6 FOR 5</span><h3 class="text-xl font-extrabold uppercase mt-2 leading-tight">BRING 6 PLAYERS,<br/>PAY FOR ONLY 5</h3></div>
            <span class="w-fit px-3.5 py-1.5 rounded-full bg-amber-400 text-slate-950 text-xs font-extrabold">Join Now →</span>
          </div>
        </div>
        <div class="grid grid-cols-4 gap-2 mb-6 text-center">
          <button onclick="S.viewAll=true;render()" class="flex flex-col items-center gap-1.5"><div class="w-13 h-13 p-3.5 rounded-2xl bg-white/5 border border-white/10 text-lg">🏟️</div><span class="text-[11px] font-bold text-slate-300">Pitches</span></button>
          <button onclick="S.tab='rank';render()" class="flex flex-col items-center gap-1.5"><div class="w-13 h-13 p-3.5 rounded-2xl bg-white/5 border border-white/10 text-lg">👑</div><span class="text-[11px] font-bold text-slate-300">GOTW</span></button>
          <button onclick="S.tab='tactics';render()" class="flex flex-col items-center gap-1.5"><div class="w-13 h-13 p-3.5 rounded-2xl bg-white/5 border border-white/10 text-lg">📋</div><span class="text-[11px] font-bold text-slate-300">Lineup</span></button>
                    <button onclick="openDetail('m1')" class="flex flex-col items-center gap-1.5"><div class="w-13 h-13 p-3.5 rounded-2xl bg-white/5 border border-white/10 text-lg">⚽</div><span class="text-[11px] font-bold text-slate-300">Find Match</span></button>
        </div>
        <div class="flex justify-between items-center mb-3">
          <h3 class="text-sm font-extrabold uppercase leading-tight">FRIENDLY AND<br/>COMPETITIVE GAMES</h3>
          <button onclick="S.viewAll=true;render()" class="px-3 py-1.5 rounded-full bg-white/10 text-xs font-bold">View All</button>
        </div>
        <div class="flex gap-3.5 overflow-x-auto no-sb pb-2">${S.db.matches.map(m => matchCard(m, false)).join("")}</div>
      </div>`;
    } else if (S.tab === "tactics") {
      const m = S.db.matches[0];
      h = `<div class="px-5 pt-9 pb-28"><div class="flex justify-between items-center mb-3"><div><h2 class="text-base font-extrabold">TACTICAL PITCH</h2><p class="text-xs text-slate-400">${m.title}</p></div><button onclick="balBibs('${m.id}')" class="px-3 py-1.5 rounded-xl bg-emerald-400 text-slate-950 text-xs font-extrabold">⚡ Balance</button></div>
        <div class="relative w-full h-[330px] rounded-3xl pitch border-2 border-white/25 overflow-hidden mb-4"><div class="absolute inset-x-0 top-1/2 h-0.5 bg-white/30"></div><div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full border-2 border-white/30"></div>
          ${m.pl.map(p=>`<div style="left:${p.x}%;top:${p.y}%" class="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"><div class="w-8 h-8 rounded-full ${p.b==='Red'?'bg-[#8A1538] border-2 border-white':'bg-white text-slate-900 border-2 border-slate-900'} flex items-center justify-center text-[10px] font-extrabold">${p.p}</div><span class="mt-1 px-1.5 rounded bg-black/75 text-[9px] font-bold">${p.n}</span></div>`).join("")}</div>
        <button onclick="copyWa('${m.id}')" class="w-full py-3.5 rounded-2xl bg-[#8A1538] font-extrabold text-sm">📲 Copy Lineup for WhatsApp</button></div>`;
    } else if (S.tab === "rank") {
      h = `<div class="px-5 pt-9 pb-28"><h2 class="text-base font-extrabold mb-3">DOHA LEADERBOARD</h2><div class="space-y-2.5 mb-5">${S.db.rank.map((l,i)=>`<div class="flex justify-between items-center p-3.5 rounded-2xl bg-white/5 border border-white/10"><div class="flex items-center gap-3"><span class="w-7 h-7 rounded-full ${i===0?'bg-amber-400 text-slate-950':'bg-white/10'} flex items-center justify-center text-xs font-extrabold">#${i+1}</span><div><p class="text-sm font-extrabold">${l.f} ${l.n}</p><p class="text-[11px] text-slate-400">${l.g} Goals</p></div></div><span class="text-sm font-extrabold text-emerald-400">${l.pts} PTS</span></div>`).join("")}</div>
        <div class="p-4 rounded-2xl bg-white/5 border border-white/10"><p class="text-xs font-extrabold text-emerald-400 mb-2">🏆 VOTE TONIGHT'S MOTM</p><div class="grid grid-cols-2 gap-2">${["Tariq M.","Yousef K.","Omar N.","Hamad T."].map(n=>`<button onclick="S.vot='${n}';say('Voted ${n}!')" class="py-2 rounded-xl text-xs font-extrabold border ${S.vot===n?'bg-emerald-400 text-slate-950 border-emerald-400':'border-white/15'}">${n}</button>`).join("")}</div></div></div>`;
    } else {
      h = `<div class="px-5 pt-9 pb-28">
        <div class="flex justify-between items-center mb-4"><h2 class="text-lg font-extrabold">MY STATS</h2><button onclick="S.ed=true;render()" class="text-xs font-extrabold text-emerald-400">Edit Profile</button></div>
        <div class="rounded-3xl bg-white/5 border border-white/10 p-4 mb-4 flex items-center gap-4">
          <label class="relative cursor-pointer shrink-0"><img src="${u.av}" class="w-20 h-24 rounded-2xl object-cover border border-white/20"/><span class="absolute bottom-1 right-1 bg-black/80 text-[10px] px-1.5 rounded">📷</span><input type="file" accept="image/*" onchange="const r=new FileReader();r.onload=e=>{S.u.av=e.target.result;render();say('Photo updated!')};r.readAsDataURL(this.files[0])" class="hidden"/></label>
          <div><h3 class="font-extrabold text-base uppercase">${u.n}</h3><p class="text-xs text-emerald-400 font-bold">● ${u.ovr} OVR • ${u.p}</p><p class="text-xs text-slate-400 mt-0.5">${u.fl} ${u.nat}, Age ${u.age}</p><span class="inline-block mt-2 px-2.5 py-1 rounded-lg bg-white/10 text-xs font-extrabold">💳 ${u.bal.toFixed(2)} QR</span></div>
        </div>
        <div class="grid grid-cols-2 gap-2.5 mb-4">
          <div class="bg-white/5 p-3.5 rounded-2xl border border-white/10"><p class="text-xl font-extrabold">🏟️ ${u.pl}</p><p class="text-[11px] text-slate-400">Matches Played</p></div>
          <div class="bg-white/5 p-3.5 rounded-2xl border border-white/10"><p class="text-xl font-extrabold text-emerald-400">🏅 ${u.w}</p><p class="text-[11px] text-slate-400">Matches Won</p></div>
          <div class="bg-white/5 p-3.5 rounded-2xl border border-white/10"><p class="text-xl font-extrabold text-rose-400">📉 ${u.l}</p><p class="text-[11px] text-slate-400">Matches Lost</p></div>
          <div class="bg-white/5 p-3.5 rounded-2xl border border-white/10"><p class="text-xl font-extrabold text-amber-400">🏆 3</p><p class="text-[11px] text-slate-400">MOTM Awards</p></div>
        </div>
        <div class="rounded-3xl bg-gradient-to-r from-[#8A1538] to-[#520C21] p-4 mb-4">
          <div class="flex justify-between items-center mb-3"><p class="text-2xl font-extrabold">⚽ ${u.g} Total Goals</p><span class="text-[10px] font-bold bg-white/15 px-2.5 py-1 rounded-full">2026 Season</span></div>
          <div class="grid grid-cols-3 gap-2 pt-3 border-t border-white/15 text-center text-xs"><div><b>${u.gf}</b><p class="text-[10px] text-white/75">Friendlies</p></div><div><b>${u.gc}</b><p class="text-[10px] text-white/75">Competitive</p></div><div><b>0</b><p class="text-[10px] text-white/75">Tournaments</p></div></div>
        </div>
        <button onclick="S.own=false;go('splash')" class="w-full py-3.5 rounded-2xl bg-white/10 text-rose-300 font-extrabold text-xs">Sign Out</button>
      </div>`;
    }

    h += `<div class="fixed bottom-3 left-1/2 -translate-x-1/2 w-[94%] max-w-[405px] bg-[#161F33] border border-white/15 rounded-3xl px-2 py-2 flex items-center justify-between z-40 shadow-2xl">
      <button onclick="S.viewAll=false;S.tab='matches';render()" class="flex-1 flex flex-col items-center text-[10px] font-extrabold ${S.tab==='matches'?'text-emerald-400':'text-slate-400'}"><span class="text-base">🏟️</span>Matches</button>
      <button onclick="S.viewAll=false;S.tab='tactics';render()" class="flex-1 flex flex-col items-center text-[10px] font-extrabold ${S.tab==='tactics'?'text-emerald-400':'text-slate-400'}"><span class="text-base">📋</span>Tactics</button>
      <button onclick="openBk('m1')" class="-mt-6 px-4 py-2.5 rounded-2xl bg-[#8A1538] font-extrabold text-[10px] shadow-lg border-2 border-[#0B101D]">⚽ BOOK</button>
      <button onclick="S.viewAll=false;S.tab='rank';render()" class="flex-1 flex flex-col items-center text-[10px] font-extrabold ${S.tab==='rank'?'text-emerald-400':'text-slate-400'}"><span class="text-base">🏆</span>Rank</button>
      <button onclick="S.viewAll=false;S.tab='card';render()" class="flex-1 flex flex-col items-center text-[10px] font-extrabold ${S.tab==='card'?'text-emerald-400':'text-slate-400'}"><span class="text-base">📊</span>My Stats</button></div>`;
  }

  if (S.bk) {
    const m = S.bk, tot = (S.sz === 6 ? 5 : S.sz) * m.price;
    h += `<div class="fixed inset-0 z-50 bg-black/80 flex items-end"><div class="w-full max-w-[430px] mx-auto bg-[#151D30] rounded-t-3xl p-5 space-y-4">
      <div class="flex justify-between items-center border-b border-white/10 pb-3"><div><p class="text-[10px] text-emerald-400 font-bold">${m.day} • ${m.time}</p><h3 class="font-extrabold">${m.title}</h3></div><button onclick="S.bk=null;render()" class="w-8 h-8 rounded-full bg-white/10">✕</button></div>
      <div><div class="flex justify-between text-xs mb-2"><span class="font-bold">Players</span><span class="bg-emerald-400 text-slate-950 font-extrabold px-2 py-0.5 rounded-full">6 = Pay for 5!</span></div><div class="grid grid-cols-6 gap-2">${[1,2,3,4,5,6].map(n=>`<button onclick="S.sz=${n};render()" class="py-2 rounded-xl font-extrabold text-sm ${S.sz===n?'bg-[#8A1538]':'bg-white/10'}">${n}</button>`).join("")}</div></div>
      <div class="grid grid-cols-2 gap-2"><button onclick="S.pay='fawran';render()" class="p-3 rounded-xl border text-left text-xs font-extrabold ${S.pay==='fawran'?'border-emerald-400 bg-emerald-400/10':'border-white/10'}">⚡ Fawran Transfer</button><button onclick="S.pay='cash';render()" class="p-3 rounded-xl border text-left text-xs font-extrabold ${S.pay==='cash'?'border-emerald-400 bg-emerald-400/10':'border-white/10'}">💵 Cash at Pitch</button></div>
      ${S.pay==="fawran"?`<div class="p-3.5 rounded-xl bg-black/40 text-xs space-y-2"><div class="flex justify-between"><span class="text-slate-400">Fawran Alias</span><b class="text-emerald-400">${S.db.alias} (${S.db.num})</b></div><label class="block py-2.5 rounded-lg border border-dashed border-white/30 text-center font-bold cursor-pointer">${S.ok?'✅ '+S.fn:'📸 Upload Fawran Receipt'}<input type="file" accept="image/*" onchange="if(this.files[0]){S.ok=true;S.fn=this.files[0].name;render()}" class="hidden"/></label></div>`:''}
      <div class="flex justify-between items-center pt-2"><div><p class="text-[11px] text-slate-400">Total Due</p><p class="text-xl font-extrabold text-emerald-400">${tot} QR</p></div><button onclick="submitBk()" class="px-6 py-3.5 rounded-2xl bg-[#8A1538] font-extrabold text-sm">Confirm Spot</button></div></div></div>`;
  }

  if (S.ed) h += `<div class="fixed inset-0 z-50 bg-black/80 flex items-end"><form onsubmit="saveEd(event)" class="w-full max-w-[430px] mx-auto bg-slate-900 rounded-t-3xl p-5 space-y-3"><div class="flex justify-between font-bold"><h3>Edit Profile</h3><button type="button" onclick="S.ed=false;render()">✕</button></div><input name="fn" value="${S.u.n}" class="w-full p-3 rounded-xl bg-white/10 text-sm font-bold"/><div class="grid grid-cols-2 gap-2"><select name="pos" class="p-3 rounded-xl bg-slate-800 text-sm font-bold">${["GK","DEF","MID","FWD","JOKER"].map(p=>`<option ${S.u.p===p?'selected':''}>${p}</option>`).join("")}</select><input name="age" type="number" value="${S.u.age}" class="p-3 rounded-xl bg-white/10 text-sm font-bold"/></div><select name="nat" class="w-full p-3 rounded-xl bg-slate-800 text-sm font-bold">${["Qatar","Egypt","Jordan","Morocco","Ethiopia","India"].map(c=>`<option ${S.u.nat===c?'selected':''}>${c}</option>`).join("")}</select><button type="submit" class="w-full py-3.5 rounded-2xl bg-emerald-400 text-slate-950 font-extrabold">Save Changes</button></form></div>`;

  document.getElementById("app").innerHTML = h + (S.msg ? `<div class="fixed top-5 left-1/2 -translate-x-1/2 z-50 bg-emerald-400 text-slate-950 text-xs font-extrabold px-4 py-2.5 rounded-xl shadow-xl">${S.msg}</div>` : "");
}

render();
