const OWNER = "creatbrook@gmail.com";
const LOGO_FALLBACK = "data:image/svg+xml;utf8," + encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><circle cx="100" cy="100" r="94" fill="#fff" stroke="#081236" stroke-width="8"/><polygon points="100,42 122,58 114,84 86,84 78,58" fill="#081236"/><polygon points="62,64 78,58 84,82 64,94 52,78" fill="#6D12D9"/><polygon points="138,64 122,58 116,82 136,94 148,78" fill="#6D12D9"/><path d="M52,88 Q75,112 100,115 Q128,112 148,88 Q135,126 100,136 Q65,126 52,88 Z" fill="#081236"/><text x="100" y="164" text-anchor="middle" font-family="Arial Black,sans-serif" font-weight="900" font-size="30" fill="#081236">PANA</text><text x="100" y="180" text-anchor="middle" font-family="Arial,sans-serif" font-weight="700" font-size="11" letter-spacing="4" fill="#081236">FOOTBALL</text></svg>`);
const BLANK_AVATAR = "data:image/svg+xml;utf8," + encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 220"><rect width="200" height="220" fill="#0f172a"/><circle cx="100" cy="78" r="36" fill="#334155"/><path d="M35 205 C35 152, 165 152, 165 205" fill="#334155"/><text x="100" y="196" text-anchor="middle" font-family="Arial,sans-serif" font-weight="bold" font-size="13" fill="#94a3b8">TAP TO ADD PHOTO</text></svg>`);

const IMG = {
  logo: "./PANA_FOOTBALL_Original_Logo.png",
  hero: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=80",
  p1: "https://images.unsplash.com/photo-1529900748604-07564a03e7a6?auto=format&fit=crop&w=800&q=80",
  p2: "https://images.unsplash.com/photo-1459865264687-595d652de67e?auto=format&fit=crop&w=800&q=80",
  p3: "https://images.unsplash.com/photo-1551958219-acbc608c6377?auto=format&fit=crop&w=800&q=80"
};

const logoTag = (cls) => `<img src="${IMG.logo}" onerror="this.onerror=null;this.src='${LOGO_FALLBACK}'" alt="PANA FOOTBALL" class="${cls} rounded-full bg-white object-contain shadow"/>`;

const DB0 = {
  alias: "PANASPORT", num: "+974 5512 8890",
  matches: [
    { id:"m1", day:"Thu, 19 Nov", time:"08:00 PM", title:"8V8 FLOODLIT CLASH", venue:"Al Sadd Sports Club, Doha", area:"Al Sadd", mapUrl:"https://maps.google.com/?q=Al+Sadd+Sports+Club+Doha", dur:"90 min", price:35, tot:16, tak:13, lvl:"Competitive", img:IMG.p1,
      pl:[{n:"Tariq M.",p:"MID",r:88,b:"Red",x:50,y:52},{n:"Hamad T.",p:"DEF",r:85,b:"Red",x:28,y:76},{n:"Khalid A.",p:"FWD",r:87,b:"Red",x:72,y:72},{n:"Yousef K.",p:"FWD",r:86,b:"White",x:50,y:26},{n:"Omar N.",p:"GK",r:89,b:"White",x:50,y:10}] },
    { id:"m2", day:"Fri, 20 Nov", time:"09:30 PM", title:"7V7 ASPIRE TURF NIGHT", venue:"Aspire Zone Pitch 4, Al Waab", area:"Al Waab", mapUrl:"https://maps.google.com/?q=Aspire+Zone+Doha", dur:"60 min", price:28, tot:14, tak:10, lvl:"Friendly", img:IMG.p2,
      pl:[{n:"Nasser A.",p:"FWD",r:87,b:"Red",x:45,y:58},{n:"Sami H.",p:"MID",r:84,b:"White",x:55,y:30}] },
    { id:"m3", day:"Sat, 21 Nov", time:"08:00 PM", title:"9V9 LUSAIL ARENA", venue:"Lusail Marina Fields, Doha", area:"Lusail", mapUrl:"https://maps.google.com/?q=Lusail+Marina+Doha", dur:"90 min", price:30, tot:18, tak:15, lvl:"High Tempo", img:IMG.p3,
      pl:[{n:"Rashid K.",p:"DEF",r:88,b:"Red",x:50,y:62}] }
  ],
  highlights: [
    { id:"h1", title:"Al Sadd Friday Final • 5-4 Thriller", dur:"01:42", views:"1.4K", img:IMG.p1, vidUrl:"", mvp:"Omar N. (Hat-trick)", trophy:"Champions Cup" },
    { id:"h2", title:"Lusail Night Top-Bins Compilation", dur:"02:15", views:"2.1K", img:IMG.p3, vidUrl:"", mvp:"Tariq Al-Mannai", trophy:"Golden Boot" },
    { id:"h3", title:"Aspire 7v7 Penalty Shootout", dur:"01:18", views:"980", img:IMG.p2, vidUrl:"", mvp:"Yousef K.", trophy:"MOTM Shield" }
  ],
  rank: [
    {n:"Omar N.",pts:142,g:14,cups:3,f:"🇶🇦"},
    {n:"Tariq Al-Mannai",pts:128,g:11,cups:2,f:"🇶🇦"},
    {n:"Yousef K.",pts:115,g:12,cups:1,f:"🇯🇴"}
  ],
  bks: [{id:"BK-9041",mid:"m1",mt:"8V8 FLOODLIT CLASH",pl:"Jassim Al-Kuwari",sz:1,qar:35,m:"Fawran",rcpt:"fawran_9041.jpg",rcptImg:IMG.p1,st:"Pending"}],
  users: {}
};

const FLAGS = {Qatar:"🇶🇦",Egypt:"🇪🇬",Jordan:"🇯🇴",Morocco:"🇲🇦",Ethiopia:"🇪🇹",India:"🇮🇳",Lebanon:"🇱🇧",Tunisia:"🇹🇳",Sudan:"🇸🇩",UK:"🇬🇧"};

function freshPlayer(idKey) {
  return { id:idKey, n:"", p:"MID", num:10, age:24, nat:"Qatar", fl:"🇶🇦", ovr:80, pac:80, sho:79, pas:81, dri:80, def:76, phy:78, av:BLANK_AVATAR, pl:0, w:0, g:0, ast:0, cups:0 };
}

function normKey(md, raw) {
  const clean = raw.trim();
  if (md === "phone") return "+974" + clean.replace(/\D/g, "");
  return clean.toLowerCase();
}

let saved = null;
try { saved = JSON.parse(localStorage.getItem("ps_gm_v4")); } catch(e) {}

let S = {
  scr:"splash", intent:"login", md:"phone", inp:"", loginKey:"", displayKey:"", own:false, tab:"matches", area:"All", chk:false,
  genOtp:"", userOtp:"", dragIdx:null, activeVideo:null, viewRcpt:null,
  detail:null, bk:null, sz:1, pay:"fawran", ok:false, fn:"", rcptData:"", ed:false, nm:false, nv:false, vot:null, duel:null, msg:null,
  u: freshPlayer("guest"),
  db: saved ? { ...DB0, ...saved, users: saved.users || {} } : DB0
};

const sv = () => { try { localStorage.setItem("ps_gm_v4", JSON.stringify(S.db)); } catch(e) {} };
const say = t => { S.msg = t; render(); setTimeout(() => { S.msg = null; render(); }, 2800); };
const go = (s, intent) => { if (intent) S.intent = intent; S.scr = s; S.detail = null; window.scrollTo(0,0); render(); };

function doLogin() {
  const v = S.inp.trim();
  if (!v) return say(S.md === "phone" ? "Enter your Qatar mobile number" : "Enter your email address");
  if (S.md === "email" && !v.includes("@")) return say("Enter a valid email address");
  if (S.md === "phone" && v.replace(/\D/g, "").length < 6) return say("Enter a valid mobile number");
  S.loginKey = normKey(S.md, v);
  S.displayKey = S.md === "phone" ? ("+974 " + v.replace(/\s+/g, "")) : v.toLowerCase();
  S.own = (S.md === "email" && S.loginKey === OWNER);
  S.genOtp = String(Math.floor(1000 + Math.random() * 9000));
  S.userOtp = "";
  go("otp");
  say(`📩 Verification Code sent: ${S.genOtp}`);
}

function doEnter() {
  if (S.userOtp.trim() !== S.genOtp) return say(`Invalid code! Enter ${S.genOtp}`);
  if (S.own) {
    S.u = { ...freshPlayer(OWNER), n:"PANA MANAGER", p:"MGR", num:1, ovr:99, av:IMG.logo };
    go("owner");
    say("Manager Verified!");
    return;
  }
  const existing = S.db.users[S.loginKey];
  if (existing && existing.n) {
    S.u = { ...freshPlayer(S.loginKey), ...existing };
    go("app");
    say(S.intent === "signup"
      ? `Account already exists — welcome back, ${S.u.n.split(" ")[0]}!`
      : `Welcome back, ${S.u.n.split(" ")[0]}!`);
  } else {
    S.u = freshPlayer(S.loginKey);
    go("setup");
    say(S.intent === "login"
      ? "New number/email detected — create your Player Card!"
      : "Build your Pro Player Card to finish Sign Up!");
  }
}

function onSetupPhoto(el) {
  const file = el.files && el.files[0]; if (!file) return;
  const r = new FileReader();
  r.onload = e => {
    const img = new Image();
    img.onload = () => {
      const c = document.createElement("canvas");
      c.width = 320; c.height = 360;
      const ctx = c.getContext("2d");
      const scale = Math.max(320 / img.width, 360 / img.height);
      const w = img.width * scale, h = img.height * scale;
      ctx.drawImage(img, (320 - w) / 2, (360 - h) / 2, w, h);
      S.u.av = c.toDataURL("image/jpeg", 0.78);
      if (S.loginKey && !S.own && S.db.users[S.loginKey]) {
        S.db.users[S.loginKey] = S.u;
        sv();
      }
      render();
      say("Player photo saved! 📸");
    };
    img.src = e.target.result;
  };
  r.readAsDataURL(file);
}

function finishSetup(e) {
  e.preventDefault(); const f = e.target;
  const name = f.fn.value.trim();
  if (!name) return say("Please enter your full player name");
  S.u.n = name;
  S.u.p = f.pos.value;
  S.u.num = Math.max(1, Math.min(99, +f.num.value || 10));
  S.u.age = Math.max(14, Math.min(60, +f.age.value || 24));
  S.u.nat = f.nat.value;
  S.u.fl = FLAGS[S.u.nat] || "🇶🇦";
  S.db.users[S.loginKey] = { ...S.u };
  sv();
  go("app");
  say(`Profile saved! Welcome, ${name.split(" ")[0]} ⚽`);
}

function openDetail(id) { S.detail = S.db.matches.find(x => x.id === id) || S.db.matches[0]; window.scrollTo(0,0); render(); }
function openBk(id) { S.bk = S.db.matches.find(x => x.id === id) || S.db.matches[0]; S.sz = 1; S.pay = "fawran"; S.ok = false; S.fn = ""; S.rcptData = ""; render(); }

function onRcptFile(el) {
  const file = el.files && el.files[0]; if (!file) return;
  S.ok = true; S.fn = file.name;
  const r = new FileReader();
  r.onload = e => { S.rcptData = e.target.result; render(); };
  r.readAsDataURL(file);
}

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
  if (S.loginKey && !S.own) S.db.users[S.loginKey] = { ...S.u };
  sv();
  say(`OVR boosted to ${S.u.ovr}! ⚡`);
}

function submitBk() {
  const m = S.bk; if (!m) return;
  if (S.pay === "fawran" && !S.ok) return say("Upload Fawran receipt first");
  const qar = (S.sz === 6 ? 5 : S.sz) * m.price;
  S.db.bks.unshift({ id:"BK-"+Math.floor(1000+Math.random()*9000), mid:m.id, mt:m.title, pl:S.u.n+(S.sz>1?` (+${S.sz-1})`:""), sz:S.sz, qar, m:S.pay==="fawran"?"Fawran":"Cash", rcpt:S.fn||"Cash", rcptImg:S.rcptData||IMG.p1, st:S.pay==="fawran"?"Pending":"Confirmed" });
  m.tak = Math.min(m.tot, m.tak + S.sz);
  m.pl.push({ n:S.u.n.split(" ")[0], p:S.u.p, r:S.u.ovr, b:m.pl.length%2===0?"Red":"White", x:40+Math.random()*20, y:40+Math.random()*25 });
  sv(); S.bk = null; S.detail = null; say(S.pay === "fawran" ? "Request & receipt sent to Manager!" : "Spot locked in!");
}

function actBk(id, yes) {
  const i = S.db.bks.findIndex(x => x.id === id); if (i < 0) return;
  const b = S.db.bks[i];
  if (yes) { b.st = "Approved"; say("Approved " + b.pl); }
  else { const m = S.db.matches.find(x => x.id === b.mid); if (m) m.tak = Math.max(0, m.tak - b.sz); S.db.bks.splice(i,1); say("Declined request"); }
  sv();
}

function delMatch(id) {
  S.db.matches = S.db.matches.filter(m => m.id !== id);
  sv(); say("Match removed");
}

function copyWa(id) {
  const m = S.db.matches.find(x => x.id === id) || S.db.matches[0];
  const r = m.pl.filter(p=>p.b==="Red").map((p,i)=>`${i+1}. ${p.n}`).join("\n") || "1. Open";
  const w = m.pl.filter(p=>p.b==="White").map((p,i)=>`${i+1}. ${p.n}`).join("\n") || "1. Open";
  const pin = m.mapUrl || `https://maps.google.com/?q=${encodeURIComponent(m.venue)}`;
  if (navigator.clipboard) navigator.clipboard.writeText(`🏆 *PANA FOOTBALL QATAR*\n_By Golden Moments & Events_\n🏟️ *${m.title}*\n📍 ${m.venue}\n🗺️ Google Map: ${pin}\n🕒 ${m.day} (${m.time})\n🎁 *6-for-5 Squad Deal + Winner Trophy!*\n\n🔴 *TEAM MAROON*\n${r}\n\n⚪ *TEAM WHITE*\n${w}\n\n📲 Join Match: https://yoyojaye.github.io/Panasport/`);
  say("WhatsApp Poster + Google Map copied!");
}

function addMatch(e) {
  e.preventDefault(); const f = e.target;
  const venue = f.v.value.trim() || "Aspire Zone, Doha";
  const rawMap = f.map.value.trim();
  const mapUrl = rawMap || `https://maps.google.com/?q=${encodeURIComponent(venue)}`;
  const area = /aspire|waab/i.test(venue) ? "Al Waab" : /lusail/i.test(venue) ? "Lusail" : "Al Sadd";
  S.db.matches.unshift({ id:"m"+Date.now(), day:f.d.value||"Sunday", time:f.tm.value||"09:00 PM", title:f.t.value.toUpperCase()||"6V6 NIGHT CLASH", venue, area, mapUrl, dur:"90 min", price:+f.p.value||35, tot:+f.tot.value||12, tak:1, lvl:"Competitive", img:IMG.p1, pl:[{n:"Captain",p:"MID",r:87,b:"Red",x:50,y:60}] });
  sv(); S.nm = false; say("Match + Google Map published!");
}

function addVideo(e) {
  e.preventDefault(); const f = e.target;
  const title = f.vt.value.trim() || "Doha Night Match Highlights";
  const mvp = f.mvp.value.trim() || "Player of the Match";
  const trophy = f.tr.value.trim() || "Champions Cup";
  const vidUrl = f.vurl.value.trim();
  S.db.highlights.unshift({ id:"h"+Date.now(), title, dur:f.vdur.value||"01:45", views:"New", img:IMG.p1, vidUrl, mvp, trophy });
  sv(); S.nv = false; say("Highlight video added to player feed! 🎬");
}

function saveEd(e) {
  e.preventDefault(); const f = e.target;
  S.u.n = f.fn.value.trim() || S.u.n; S.u.p = f.pos.value; S.u.num = +f.num.value || 10; S.u.nat = f.nat.value;
  S.u.fl = FLAGS[S.u.nat] || "🇶🇦";
  if (S.loginKey && !S.own) S.db.users[S.loginKey] = { ...S.u };
  sv(); S.ed = false; say("Pro Card updated!");
}
function render() {
  let h = "";
  if (S.scr === "splash") {
    h = `<div class="relative min-h-screen flex flex-col justify-between bg-slate-950 text-white"><img src="${IMG.hero}" class="absolute inset-0 w-full h-full object-cover opacity-85"/><div class="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-transparent"></div>
      <div class="relative z-10 px-6 pt-12 flex justify-between items-center"><span class="inline-flex items-center gap-2.5 bg-slate-950/85 border border-white/20 text-white pl-1.5 pr-3.5 py-1.5 rounded-full text-xs font-extrabold shadow">${logoTag("w-8 h-8 p-0.5")}PANA FOOTBALL</span><span class="px-3 py-1 rounded-full bg-amber-400 text-slate-950 text-[11px] font-extrabold">🏆 WINNER TROPHIES</span></div>
      <div class="relative z-10 px-6 pb-8">
        <span class="inline-block bg-emerald-400 text-slate-950 text-[11px] font-extrabold px-3 py-1 rounded-md mb-3">🇶🇦 DOHA NIGHT LEAGUE</span>
        <h1 class="text-3xl font-extrabold leading-tight uppercase mb-3">SHOW UP, BALL OUT,<br/>AND LIFT THE<br/>MATCHDAY TROPHY</h1>
        <p class="text-sm text-slate-200 mb-6">Create your Pro FIFA card, join pinned Doha pitches, win trophies & watch HD highlights.</p>
        <div class="grid grid-cols-2 gap-3">
          <button onclick="go('auth','signup')" class="py-4 rounded-2xl bg-emerald-400 text-slate-950 font-extrabold text-sm shadow-xl">Sign Up</button>
          <button onclick="go('auth','login')" class="py-4 rounded-2xl bg-[#8A1538] text-white font-extrabold text-sm shadow-xl border border-white/15">Log In</button>
        </div>
        <p class="text-center text-[11px] font-bold tracking-wider uppercase text-amber-300/90 mt-4">By Golden Moments & Events</p>
      </div></div>`;
  } else if (S.scr === "auth") {
    const ph = S.md === "phone", isUp = S.intent === "signup";
    h = `<div class="min-h-screen ucl-bg px-6 pt-12 pb-8 text-white flex flex-col justify-between"><div>
      <button onclick="go('splash')" class="w-10 h-10 rounded-full bg-slate-950/70 border border-white/20 font-bold">←</button>
      <div class="text-center my-6">${logoTag("w-20 h-20 p-1 mx-auto mb-3 border-2 border-amber-400")}<h1 class="text-2xl font-extrabold uppercase">${isUp ? "CREATE PLAYER ACCOUNT" : "WELCOME BACK"}</h1><p class="text-[11px] font-bold text-amber-300 tracking-wider uppercase mt-0.5">Golden Moments & Events</p></div>
      <div class="grid grid-cols-2 gap-2 p-1 rounded-2xl bg-slate-950/75 border border-white/15 mb-5">
        <button onclick="S.intent='signup';render()" class="py-2.5 rounded-xl text-xs font-extrabold ${isUp?'bg-emerald-400 text-slate-950 shadow':'text-slate-300'}">SIGN UP (NEW)</button>
        <button onclick="S.intent='login';render()" class="py-2.5 rounded-xl text-xs font-extrabold ${!isUp?'bg-[#8A1538] text-white shadow':'text-slate-300'}">LOG IN (SAVED)</button>
      </div>
      <div class="flex justify-center gap-8 border-b border-white/15 mb-5"><button onclick="S.md='phone';S.inp='';render()" class="pb-2.5 text-xs font-extrabold ${ph?'text-emerald-400 border-b-2 border-emerald-400':'text-slate-300'}">PHONE NUMBER</button><button onclick="S.md='email';S.inp='';render()" class="pb-2.5 text-xs font-extrabold ${!ph?'text-emerald-400 border-b-2 border-emerald-400':'text-slate-300'}">EMAIL</button></div>
      ${ph?`<div class="flex gap-2"><div class="h-14 px-4 rounded-2xl bg-slate-950/75 border border-white/20 flex items-center gap-2 font-extrabold text-sm">🇶🇦 +974</div><input type="tel" value="${S.inp}" oninput="S.inp=this.value" placeholder="Enter mobile number" class="w-full h-14 px-4 rounded-2xl bg-slate-950/75 border border-white/20 text-sm font-bold text-white placeholder-slate-400"/></div>`:`<input type="email" value="${S.inp}" oninput="S.inp=this.value" placeholder="Enter your email address" class="w-full h-14 px-4 rounded-2xl bg-slate-950/75 border border-white/20 text-sm font-bold text-white placeholder-slate-400"/>`}
      <button onclick="doLogin()" class="w-full mt-6 py-4 rounded-2xl ${isUp?'bg-emerald-400 text-slate-950':'bg-[#8A1538] text-white'} font-extrabold shadow-lg">${isUp ? "Continue to Sign Up" : "Log In with Code"}</button>
    </div><p class="text-center text-[10px] font-bold uppercase tracking-widest text-white/60">${isUp ? "New players build their FIFA Card next" : "Loads your saved photo, position & stats"}</p></div>`;
  } else if (S.scr === "otp") {
    h = `<div class="min-h-screen ucl-bg px-6 pt-12 pb-8 text-center text-white"><button onclick="go('auth')" class="w-10 h-10 rounded-full bg-slate-950/70 border border-white/20 font-bold float-left">←</button>${logoTag("w-16 h-16 p-1 mx-auto mt-10 mb-3 border-2 border-emerald-400")}<h1 class="text-2xl font-extrabold uppercase mb-2">ENTER 4-DIGIT CODE</h1><p class="text-xs text-sky-200 mb-2">Sent to <b>${S.displayKey}</b></p>
      <div class="inline-block px-3.5 py-1 rounded-full bg-emerald-400 text-slate-950 text-xs font-extrabold mb-5 shadow">Your Verification Code: ${S.genOtp}</div>
      <input type="tel" maxlength="4" value="${S.userOtp}" oninput="S.userOtp=this.value" placeholder="••••" class="block w-48 mx-auto h-16 rounded-2xl bg-slate-950/80 border-2 border-emerald-400 text-center text-3xl tracking-[0.4em] font-extrabold text-white mb-5"/>
      <button onclick="doEnter()" class="w-full py-4 rounded-2xl bg-emerald-400 text-slate-950 font-extrabold shadow-lg">Verify & Continue</button>
      <button onclick="S.genOtp=String(Math.floor(1000+Math.random()*9000));say('New code: '+S.genOtp)" class="mt-4 text-xs font-bold text-sky-300">Resend New Code</button></div>`;
  } else if (S.scr === "setup") {
    h = `<div class="min-h-screen ucl-bg px-6 pt-10 pb-10 text-white">
      <div class="flex items-center justify-between mb-4"><div><span class="text-[10px] font-extrabold text-emerald-400">SIGN UP • ${S.displayKey}</span><h1 class="text-xl font-extrabold uppercase">BUILD YOUR PRO CARD</h1></div>${logoTag("w-10 h-10 p-0.5")}</div>
      <form onsubmit="finishSetup(event)" class="bg-slate-950/80 backdrop-blur-md border border-white/15 rounded-3xl p-5 space-y-4 shadow-2xl">
        <div class="flex flex-col items-center">
          <label class="relative cursor-pointer group">
            <img src="${S.u.av}" class="w-28 h-32 rounded-2xl object-cover border-2 border-amber-400 shadow-lg"/>
            <span class="absolute bottom-2 right-2 bg-emerald-400 text-slate-950 text-[10px] font-extrabold px-2 py-0.5 rounded-lg shadow">📷 Upload</span>
            <input type="file" accept="image/*" onchange="onSetupPhoto(this)" class="hidden"/>
          </label>
          <p class="text-[11px] text-slate-300 mt-2">Tap above to upload your player photo</p>
        </div>
        <div>
          <label class="block text-[11px] font-extrabold text-amber-300 uppercase mb-1">Full Player Name *</label>
          <input name="fn" required placeholder="Enter your name (e.g. Ahmed Hassan)" class="w-full p-3.5 rounded-xl bg-white/10 border border-white/15 text-sm font-bold text-white placeholder-slate-400"/>
        </div>
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="block text-[11px] font-extrabold text-amber-300 uppercase mb-1">Position</label>
            <select name="pos" class="w-full p-3.5 rounded-xl bg-slate-900 border border-white/15 text-sm font-bold text-white">
              <option value="FWD">FWD (Striker)</option>
              <option value="MID" selected>MID (Midfielder)</option>
              <option value="DEF">DEF (Defender)</option>
              <option value="GK">GK (Goalkeeper)</option>
              <option value="JOKER">JOKER (All-Round)</option>
            </select>
          </div>
          <div>
            <label class="block text-[11px] font-extrabold text-amber-300 uppercase mb-1">Jersey #</label>
            <input name="num" type="number" min="1" max="99" value="10" class="w-full p-3.5 rounded-xl bg-white/10 border border-white/15 text-sm font-bold text-white"/>
          </div>
        </div>
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="block text-[11px] font-extrabold text-amber-300 uppercase mb-1">Nationality</label>
            <select name="nat" class="w-full p-3.5 rounded-xl bg-slate-900 border border-white/15 text-sm font-bold text-white">${Object.keys(FLAGS).map(c=>`<option value="${c}">${FLAGS[c]} ${c}</option>`).join("")}</select>
          </div>
          <div>
            <label class="block text-[11px] font-extrabold text-amber-300 uppercase mb-1">Age</label>
            <input name="age" type="number" min="14" max="60" value="24" class="w-full p-3.5 rounded-xl bg-white/10 border border-white/15 text-sm font-bold text-white"/>
          </div>
        </div>
        <button type="submit" class="w-full py-4 rounded-2xl bg-emerald-400 text-slate-950 font-extrabold text-sm shadow-xl">Save Card & Enter Stadium ⚽</button>
      </form>
    </div>`;
  } else if (S.scr === "owner") {
    const rev = S.db.bks.reduce((s,b)=>s+b.qar,0);
    const pend = S.db.bks.filter(b=>b.st==="Pending").length;
    h = `<div class="min-h-screen ucl-bg text-white px-5 pt-10 pb-14">
      <div class="flex justify-between items-center mb-5"><div class="flex items-center gap-2.5">${logoTag("w-10 h-10 p-0.5")}<div><span class="text-[10px] font-extrabold text-amber-300">GOLDEN MOMENTS & EVENTS</span><h1 class="text-lg font-extrabold leading-tight">MANAGER PORTAL</h1></div></div><div class="flex gap-2"><button onclick="go('app')" class="px-3 py-2 rounded-xl bg-slate-950/75 border border-white/15 text-xs font-bold">Player View</button><button onclick="S.own=false;go('splash')" class="px-3 py-2 rounded-xl bg-rose-500/30 text-rose-200 text-xs font-bold">Logout</button></div></div>
      <div class="grid grid-cols-3 gap-2 mb-4 text-center">
        <div class="bg-slate-950/75 backdrop-blur-md border border-white/15 p-3 rounded-2xl"><p class="text-[10px] text-slate-300">Revenue</p><p class="text-lg font-extrabold text-emerald-400">${rev} QR</p></div>
        <div class="bg-slate-950/75 backdrop-blur-md border border-white/15 p-3 rounded-2xl"><p class="text-[10px] text-slate-300">Pending</p><p class="text-lg font-extrabold text-amber-400">${pend}</p></div>
        <div class="bg-slate-950/75 backdrop-blur-md border border-white/15 p-3 rounded-2xl"><p class="text-[10px] text-slate-300">Videos</p><p class="text-lg font-extrabold text-sky-300">${S.db.highlights.length}</p></div>
      </div>
      <div class="grid grid-cols-2 gap-2.5 mb-5">
        <button onclick="S.nm=true;render()" class="py-3.5 px-3 rounded-2xl bg-emerald-400 text-slate-950 font-extrabold text-xs shadow-lg">+ Publish Match & Map</button>
        <button onclick="S.nv=true;render()" class="py-3.5 px-3 rounded-2xl bg-amber-400 text-slate-950 font-extrabold text-xs shadow-lg">🎬 + Add Highlight Video</button>
      </div>
      <h3 class="text-xs font-extrabold uppercase tracking-wider text-amber-300 mb-2">📩 PLAYER JOIN & PAYMENT REQUESTS (${S.db.bks.length})</h3>
      <div class="space-y-3 mb-5">${S.db.bks.map(b=>`<div class="bg-slate-950/80 backdrop-blur-md p-4 rounded-2xl border border-white/15">
        <div class="flex justify-between font-extrabold text-sm"><span>${b.pl}</span><span class="text-emerald-400">${b.qar} QR</span></div>
        <p class="text-xs text-slate-300 mt-0.5">${b.mt} • ${b.m}</p>
        ${b.m==='Fawran'?`<button onclick="S.viewRcpt=b;render()" class="mt-2 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/10 text-[11px] font-bold text-sky-300">🧾 Inspect Fawran Receipt (${b.rcpt||'receipt.jpg'})</button>`:''}
        <div class="flex justify-between items-center mt-3 pt-2.5 border-t border-white/10"><span class="text-xs font-bold ${b.st==='Pending'?'text-amber-400':'text-emerald-400'}">● ${b.st}</span>${b.st==='Pending'?`<div class="flex gap-2"><button onclick="actBk('${b.id}',0)" class="px-3 py-1.5 rounded-lg bg-rose-500/25 text-rose-200 text-xs font-bold">Decline</button><button onclick="actBk('${b.id}',1)" class="px-3.5 py-1.5 rounded-lg bg-emerald-400 text-slate-950 text-xs font-extrabold">✓ Approve Spot</button></div>`:''}</div>
      </div>`).join("")}</div>
      <h3 class="text-xs font-extrabold uppercase tracking-wider text-emerald-300 mb-2">🏟️ ACTIVE MATCHES & GOOGLE MAP PINS (${S.db.matches.length})</h3>
      <div class="space-y-2.5 mb-5">${S.db.matches.map(m=>`<div class="bg-slate-950/80 backdrop-blur-md p-3.5 rounded-2xl border border-white/15 flex justify-between items-center gap-2">
        <div class="min-w-0"><p class="text-xs font-extrabold truncate">${m.title} (${m.tak}/${m.tot})</p><p class="text-[11px] text-slate-300 truncate">📍 ${m.venue} • ${m.day} ${m.time}</p><a href="${m.mapUrl}" target="_blank" class="text-[10px] font-bold text-sky-300 underline">🗺️ Open Pinned Google Map</a></div>
        <div class="flex gap-1.5 shrink-0"><button onclick="copyWa('${m.id}')" class="px-2.5 py-1.5 rounded-lg bg-[#8A1538] text-[10px] font-extrabold">📲 Share</button><button onclick="delMatch('${m.id}')" class="px-2.5 py-1.5 rounded-lg bg-white/10 text-rose-300 text-[10px] font-bold">🗑️</button></div>
      </div>`).join("")}</div>
    </div>`;
    if (S.nm) h += `<div class="fixed inset-0 z-50 bg-black/80 flex items-end"><form onsubmit="addMatch(event)" class="w-full max-w-[430px] mx-auto bg-slate-900 text-white rounded-t-3xl p-5 space-y-3 border-t border-white/15"><div class="flex justify-between font-bold"><h3>Publish Match & Google Map Pin</h3><button type="button" onclick="S.nm=false;render()">✕</button></div><input name="t" placeholder="Format & Title (e.g. 6V6 ASPIRE CLASH)" class="w-full p-3 rounded-xl bg-white/10 text-sm font-bold"/><div class="grid grid-cols-2 gap-2"><input name="d" placeholder="Day (e.g. Sunday)" class="p-3 rounded-xl bg-white/10 text-sm font-bold"/><input name="tm" placeholder="Time (e.g. 09:00 PM)" class="p-3 rounded-xl bg-white/10 text-sm font-bold"/></div><input name="v" placeholder="Venue Name (e.g. Aspire Zone Pitch 4)" class="w-full p-3 rounded-xl bg-white/10 text-sm font-bold"/><input name="map" type="url" placeholder="📍 Paste Google Maps Pin Link (maps.google.com/...)" class="w-full p-3 rounded-xl bg-sky-950/60 border border-sky-400/40 text-xs font-bold text-sky-200 placeholder-sky-300/60"/><div class="grid grid-cols-2 gap-2"><input name="p" type="number" value="35" placeholder="Price QR" class="p-3 rounded-xl bg-white/10 text-sm font-bold"/><input name="tot" type="number" value="12" placeholder="Total Players" class="p-3 rounded-xl bg-white/10 text-sm font-bold"/></div><button type="submit" class="w-full py-3.5 rounded-2xl bg-emerald-400 text-slate-950 font-extrabold">Publish Match & Map</button></form></div>`;
    if (S.nv) h += `<div class="fixed inset-0 z-50 bg-black/80 flex items-end"><form onsubmit="addVideo(event)" class="w-full max-w-[430px] mx-auto bg-slate-900 text-white rounded-t-3xl p-5 space-y-3 border-t border-white/15"><div class="flex justify-between font-bold"><h3>🎬 Add Match Highlight Video</h3><button type="button" onclick="S.nv=false;render()">✕</button></div><input name="vt" placeholder="Highlight Title (e.g. Sunday 6v6 Final Goals)" class="w-full p-3 rounded-xl bg-white/10 text-sm font-bold"/><div class="grid grid-cols-2 gap-2"><input name="mvp" placeholder="MVP Name" class="p-3 rounded-xl bg-white/10 text-sm font-bold"/><input name="tr" placeholder="Trophy (Champions Cup)" class="p-3 rounded-xl bg-white/10 text-sm font-bold"/></div><div class="grid grid-cols-3 gap-2"><input name="vdur" value="01:45" placeholder="Duration" class="p-3 rounded-xl bg-white/10 text-sm font-bold"/><input name="vurl" type="url" placeholder="Video Link (YouTube/MP4)" class="col-span-2 p-3 rounded-xl bg-white/10 text-xs font-bold"/></div><button type="submit" class="w-full py-3.5 rounded-2xl bg-amber-400 text-slate-950 font-extrabold">Publish to Player Highlights</button></form></div>`;
    if (S.viewRcpt) h += `<div class="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-5"><div class="w-full max-w-[380px] bg-slate-900 text-white rounded-3xl p-4 border border-white/20 space-y-3"><div class="flex justify-between items-center"><h4 class="font-extrabold text-sm">🧾 Fawran Receipt — ${S.viewRcpt.pl}</h4><button onclick="S.viewRcpt=null;render()" class="w-8 h-8 rounded-full bg-white/10">✕</button></div><img src="${S.viewRcpt.rcptImg}" class="w-full h-56 object-cover rounded-2xl border border-white/15"/><div class="flex justify-between text-xs"><span class="text-slate-300">Amount: <b class="text-emerald-400">${S.viewRcpt.qar} QR</b></span><span class="text-slate-300">File: ${S.viewRcpt.rcpt}</span></div><div class="flex gap-2"><button onclick="actBk('${S.viewRcpt.id}',0);S.viewRcpt=null;render()" class="flex-1 py-2.5 rounded-xl bg-rose-500/25 text-rose-200 font-bold text-xs">Decline</button><button onclick="actBk('${S.viewRcpt.id}',1);S.viewRcpt=null;render()" class="flex-1 py-2.5 rounded-xl bg-emerald-400 text-slate-950 font-extrabold text-xs">✓ Approve Payment</button></div></div></div>`;
  } else if (S.detail) {
    const m = S.detail;
    const mapHref = m.mapUrl || `https://maps.google.com/?q=${encodeURIComponent(m.venue)}`;
    const embedSrc = `https://maps.google.com/maps?q=${encodeURIComponent(m.venue)}&t=&z=14&ie=UTF8&iwloc=&output=embed`;
    h = `<div class="min-h-screen ucl-bg pb-28 text-white">
      <div class="relative h-48"><img src="${m.img}" class="w-full h-full object-cover"/><button onclick="S.detail=null;render()" class="absolute top-10 left-5 w-10 h-10 rounded-full bg-slate-950/80 text-white border border-white/20 shadow font-bold">←</button><button onclick="copyWa('${m.id}')" class="absolute top-10 right-5 px-3.5 py-2 rounded-full bg-emerald-400 text-slate-950 shadow text-xs font-extrabold">📲 Share</button></div>
      <div class="px-5 pt-4 space-y-3.5">
        <div class="flex justify-between items-start"><div><span class="px-2.5 py-0.5 rounded-full bg-[#8A1538] text-white text-[10px] font-extrabold">${m.lvl}</span><h1 class="text-xl font-extrabold mt-1.5">${m.title}</h1><p class="text-xs font-bold text-emerald-300">${m.day} • ${m.time}</p></div><div class="bg-slate-950/75 backdrop-blur-md px-3 py-2 rounded-2xl border border-white/15 text-center"><p class="text-base font-extrabold text-emerald-400">${m.price} QR</p><p class="text-[10px] text-slate-300">${m.dur}</p></div></div>
        <div class="bg-slate-950/80 backdrop-blur-md rounded-2xl p-3 border border-white/15 shadow-lg">
          <div class="flex justify-between items-center mb-2"><span class="text-xs font-extrabold text-sky-300">📍 ${m.venue}</span><a href="${mapHref}" target="_blank" class="px-2.5 py-1 rounded-lg bg-emerald-400 text-slate-950 text-[10px] font-extrabold">Open Google Maps ↗</a></div>
          <div class="w-full h-36 rounded-xl overflow-hidden border border-white/15 bg-slate-900"><iframe src="${embedSrc}" class="w-full h-full border-0" loading="lazy"></iframe></div>
        </div>
        <div class="bg-slate-950/75 backdrop-blur-md rounded-2xl p-3.5 border border-white/15 shadow-lg space-y-1.5 text-xs text-slate-200">
          <div class="flex items-center justify-between"><h3 class="font-extrabold uppercase text-amber-300">🏆 MATCHDAY TROPHY & RULES</h3><span class="text-[10px] text-white/60 font-bold">Golden Moments</span></div>
          <p>🏆 Winning squad lifts the PANA Football Cup & earns +15 Rank PTS.</p>
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
      const feat = list[0] || S.db.matches[0];
      const featMap = feat ? (feat.mapUrl || `https://maps.google.com/?q=${encodeURIComponent(feat.venue)}`) : "https://maps.google.com/?q=Doha";
      h = `<div class="px-5 pt-8 pb-28 text-white">
        <div class="flex justify-between items-center mb-3 bg-slate-950/65 backdrop-blur-md border border-white/15 px-3.5 py-2.5 rounded-2xl">
          <div class="flex items-center gap-2.5">${logoTag("w-10 h-10 p-0.5")}<div class="leading-tight"><h2 class="text-sm font-extrabold tracking-wide">PANA FOOTBALL</h2><p class="text-[10px] font-bold text-amber-300">By Golden Moments & Events</p></div></div>
          <div class="flex items-center gap-1.5">${S.own?`<button onclick="go('owner')" class="px-2.5 py-1.5 rounded-xl bg-[#8A1538] text-white text-[11px] font-extrabold">Admin</button>`:''}<button onclick="S.tab='card';render()" class="flex items-center gap-1.5 bg-white/10 pl-1 pr-2.5 py-1 rounded-full"><img src="${u.av}" class="w-6 h-6 rounded-full object-cover"/><span class="text-[11px] font-extrabold text-emerald-300">${(u.n||'PLAYER').split(' ')[0]} #${u.num}</span></button></div>
        </div>
        <div onclick="openDetail('${feat.id}')" class="rounded-3xl bg-gradient-to-r from-[#8A1538]/95 via-[#6D102C]/90 to-slate-950/90 backdrop-blur-md p-4 text-white shadow-xl border border-white/15 mb-3.5 cursor-pointer">
          <div class="flex justify-between items-center"><span class="px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950 text-[10px] font-extrabold">🏆 WINNER TROPHY NIGHT</span><a href="${featMap}" target="_blank" onclick="event.stopPropagation()" class="px-2.5 py-1 rounded-full bg-emerald-400 text-slate-950 text-[10px] font-extrabold">🗺️ Google Map Pin ↗</a></div>
          <h3 class="text-lg font-extrabold uppercase mt-2">BRING 6, PAY FOR 5</h3>
          <p class="text-xs text-white/85 mt-0.5">Next Pitch: ${feat.venue} • Tap to view map & join →</p>
        </div>
        <div class="flex gap-2 overflow-x-auto no-sb mb-3">${["All","Al Sadd","Al Waab","Lusail"].map(a=>`<button onclick="S.area='${a}';render()" class="px-4 py-1.5 rounded-2xl text-xs font-extrabold whitespace-nowrap backdrop-blur-md ${S.area===a?'bg-emerald-400 text-slate-950 shadow':'bg-slate-950/70 text-white border border-white/20'}">${a}</button>`).join("")}</div>
        <div class="flex gap-3.5 overflow-x-auto no-sb pb-3 mb-4">${list.map(m=>{
          const mHref = m.mapUrl || `https://maps.google.com/?q=${encodeURIComponent(m.venue)}`;
          return `<div onclick="openDetail('${m.id}')" class="w-[275px] shrink-0 rounded-3xl bg-slate-950/75 backdrop-blur-md border border-white/15 shadow-xl overflow-hidden cursor-pointer">
            <div class="relative h-36"><img src="${m.img}" class="w-full h-full object-cover"/><span class="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-[#8A1538] text-white text-[11px] font-extrabold">👥 ${m.tak}/${m.tot}</span><a href="${mHref}" target="_blank" onclick="event.stopPropagation()" class="absolute bottom-2.5 left-3 px-2.5 py-1 rounded-full bg-black/80 text-sky-300 border border-sky-400/40 text-[10px] font-extrabold">🗺️ Google Map ↗</a></div>
            <div class="p-3.5 flex justify-between items-center gap-2"><div class="min-w-0"><span class="text-[10px] font-extrabold text-emerald-300 bg-emerald-500/20 px-2 py-0.5 rounded-full">${m.lvl}</span><h4 class="font-extrabold text-sm mt-1 truncate">${m.title}</h4><p class="text-[11px] text-slate-300">🕒 ${m.day} • ${m.time}</p><p class="text-[11px] text-slate-300 truncate">📍 ${m.venue}</p></div><div class="bg-white/10 px-3 py-2 rounded-2xl text-center shrink-0"><p class="text-sm font-extrabold text-emerald-400">${m.price} QR</p><p class="text-[10px] font-bold text-slate-300">${m.dur}</p></div></div>
          </div>`;
        }).join("")}</div>
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
          <div class="bg-slate-950/75 backdrop-blur-md p-3 rounded-2xl border border-white/15 shadow"><p class="text-2xl">🥇</p><p class="text-xs font-extrabold mt-1">Golden Boot</p><p class="text-[10px] text-amber-300 font-bold">${u.g} Goals</p></div>
          <div class="bg-slate-950/75 backdrop-blur-md p-3 rounded-2xl border border-white/15 shadow"><p class="text-2xl">🎖️</p><p class="text-xs font-extrabold mt-1">MOTM Shield</p><p class="text-[10px] text-rose-300 font-bold">${u.cups} Awards</p></div>
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
                <input type="file" accept="image/*" onchange="onSetupPhoto(this)" class="hidden"/>
              </label>
            </div>
            <div class="text-center mt-3 pb-2 border-b border-amber-300/30">
              <h3 class="text-lg font-extrabold uppercase tracking-wider text-amber-200">${u.n || "PLAYER"}</h3>
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
        <button onclick="S.own=false;S.inp='';go('splash')" class="w-full py-3.5 rounded-2xl bg-slate-950/80 border border-white/15 text-rose-300 font-extrabold text-xs">Sign Out</button>
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
      <div class="relative h-52"><img src="${v.img}" class="w-full h-full object-cover brightness-75"/><div class="absolute inset-0 flex flex-col items-center justify-center"><span class="px-3 py-1 rounded-full bg-[#8A1538] text-xs font-extrabold mb-2">▶ PLAYING HD REEL (${v.dur})</span><p class="text-xs text-slate-200">MVP: ${v.mvp}</p>${v.vidUrl?`<a href="${v.vidUrl}" target="_blank" class="mt-2 px-3 py-1 rounded-lg bg-emerald-400 text-slate-950 text-xs font-extrabold">Watch Full Video ↗</a>`:''}</div><button onclick="S.activeVideo=null;render()" class="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/70 font-bold">✕</button></div>
      <div class="p-4 flex justify-between items-center"><div><h4 class="font-extrabold text-sm">${v.title}</h4><p class="text-xs text-amber-400 mt-0.5">🏆 ${v.trophy}</p></div><button onclick="S.activeVideo=null;render()" class="px-4 py-2 rounded-xl bg-white/15 text-xs font-bold">Close</button></div>
    </div></div>`;
  }

  if (S.bk) {
    const m = S.bk, tot = (S.sz === 6 ? 5 : S.sz) * m.price;
    h += `<div class="fixed inset-0 z-50 bg-black/75 flex items-end"><div class="w-full max-w-[430px] mx-auto bg-slate-900 text-white border-t border-white/15 rounded-t-3xl p-5 space-y-4">
      <div class="flex justify-between items-center border-b border-white/10 pb-3"><div class="flex items-center gap-2.5">${logoTag("w-9 h-9 p-0.5")}<div><p class="text-[10px] text-emerald-400 font-extrabold">${m.day} • ${m.time}</p><h3 class="font-extrabold">${m.title}</h3></div></div><button onclick="S.bk=null;render()" class="w-8 h-8 rounded-full bg-white/10 font-bold">✕</button></div>
      <div><div class="flex justify-between text-xs mb-2"><span class="font-bold">Players</span><span class="bg-emerald-400 text-slate-950 font-extrabold px-2.5 py-0.5 rounded-full">6 = Pay for 5!</span></div><div class="grid grid-cols-6 gap-2">${[1,2,3,4,5,6].map(n=>`<button onclick="S.sz=${n};render()" class="py-2 rounded-xl font-extrabold text-sm ${S.sz===n?'bg-[#8A1538] text-white':'bg-white/10'}">${n}</button>`).join("")}</div></div>
      <div class="grid grid-cols-2 gap-2"><button onclick="S.pay='fawran';render()" class="p-3 rounded-xl border text-left text-xs font-extrabold ${S.pay==='fawran'?'border-emerald-400 bg-emerald-400/15':'border-white/15'}">⚡ Fawran Transfer</button><button onclick="S.pay='cash';render()" class="p-3 rounded-xl border text-left text-xs font-extrabold ${S.pay==='cash'?'border-emerald-400 bg-emerald-400/15':'border-white/15'}">💵 Cash at Pitch</button></div>
      ${S.pay==="fawran"?`<div class="p-3.5 rounded-xl bg-black/50 border border-white/10 text-xs space-y-2"><div class="flex justify-between"><span class="text-slate-300">Fawran Alias</span><b class="text-emerald-400">${S.db.alias} (${S.db.num})</b></div><label class="block py-2.5 rounded-lg border border-dashed border-white/30 text-center font-bold cursor-pointer">${S.ok?'✅ '+S.fn:'📸 Upload Fawran Receipt'}<input type="file" accept="image/*" onchange="onRcptFile(this)" class="hidden"/></label></div>`:''}
      <div class="flex justify-between items-center pt-2"><div><p class="text-[11px] text-slate-400">Total Due</p><p class="text-xl font-extrabold text-emerald-400">${tot} QR</p></div><button onclick="submitBk()" class="px-6 py-3.5 rounded-2xl bg-[#8A1538] text-white font-extrabold text-sm shadow">Confirm Spot</button></div></div></div>`;
  }

  if (S.ed) h += `<div class="fixed inset-0 z-50 bg-black/75 flex items-end"><form onsubmit="saveEd(event)" class="w-full max-w-[430px] mx-auto bg-slate-900 text-white border-t border-white/15 rounded-t-3xl p-5 space-y-3"><div class="flex justify-between font-bold"><h3>Edit Pro Card</h3><button type="button" onclick="S.ed=false;render()">✕</button></div><input name="fn" value="${u.n}" class="w-full p-3 rounded-xl bg-white/10 text-sm font-bold"/><div class="grid grid-cols-2 gap-2"><select name="pos" class="p-3 rounded-xl bg-slate-800 text-sm font-bold">${["GK","DEF","MID","FWD","JOKER"].map(p=>`<option ${u.p===p?'selected':''}>${p}</option>`).join("")}</select><input name="num" type="number" value="${u.num}" placeholder="Jersey #" class="p-3 rounded-xl bg-white/10 text-sm font-bold"/></div><select name="nat" class="w-full p-3 rounded-xl bg-slate-800 text-sm font-bold">${Object.keys(FLAGS).map(c=>`<option ${u.nat===c?'selected':''}>${c}</option>`).join("")}</select><button type="submit" class="w-full py-3.5 rounded-2xl bg-emerald-400 text-slate-950 font-extrabold">Save Card</button></form></div>`;

  document.getElementById("app").innerHTML = h + (S.msg ? `<div class="fixed top-5 left-1/2 -translate-x-1/2 z-50 bg-emerald-400 text-slate-950 text-xs font-extrabold px-4 py-2.5 rounded-xl shadow-xl">${S.msg}</div>` : "");
}

render();
