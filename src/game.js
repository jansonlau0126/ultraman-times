/* ===== GAME LOGIC ===== */
const $ = (s, r) => (r||document).querySelector(s);
const $$ = (s, r) => Array.from((r||document).querySelectorAll(s));
const rand = (a,b)=> a + Math.random()*(b-a);
const randi = (a,b)=> Math.floor(rand(a,b+1));
const pick = arr => arr[Math.floor(Math.random()*arr.length)];
const shuffle = arr => { for(let i=arr.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); const t=arr[i]; arr[i]=arr[j]; arr[j]=t; } return arr; };
const sleep = ms => new Promise(r=>setTimeout(r, ms));
function play(el, kf, opts){ if(!el) return Promise.resolve(); try{ const a=el.animate(kf, opts); return a.finished.catch(()=>{}); }catch(e){ return Promise.resolve(); } }
function rm(el){ try{ if(el && el.remove) el.remove(); }catch(e){} }

/* ---------- storage ---------- */
const STORE_KEY = 'ultraTimesHK_v1';
function defaultData(){ return {facts:{}, badges:{}, best:{}, dex:{}, stats:{monsters:0,bosses:0,maxCombo:0,answered:0}, settings:{muted:false, choice:false, tables:[2,3,4,5], autoSpeak:true}}; }
function loadData(){
  const def = defaultData();
  try{ const raw = localStorage.getItem(STORE_KEY); if(raw){ const d = JSON.parse(raw);
    return {facts:d.facts||{}, badges:d.badges||{}, best:d.best||{}, dex:d.dex||{}, stats:Object.assign(def.stats, d.stats||{}), settings:Object.assign(def.settings, d.settings||{})}; } }catch(e){}
  return def;
}
let DATA = loadData();
function save(){ try{ localStorage.setItem(STORE_KEY, JSON.stringify(DATA)); }catch(e){} }

/* ---------- 九因歌 chant（跟傳統九因歌表） ---------- */
const DIG = '零一二三四五六七八九';
function cnNum(n){
  if(n<10) return DIG[n]; if(n===100) return '一百';
  if(n>100){ const h=Math.floor(n/100), rest=n%100; return DIG[h]+'百'+(rest?(rest<10?'零'+DIG[rest]:cnNum(rest)):''); }
  const t=Math.floor(n/10), u=n%10;
  /* 九因歌讀法：10–19 用「一十／一十二」，唔好讀「十二」 */
  if(t===1) return '一十'+(u?DIG[u]:'');
  return DIG[t]+'十'+(u?DIG[u]:'');
}
function chant(a,b){
  if(a>9||b>9) return cnNum(a)+'乘'+cnNum(b)+'等於'+cnNum(a*b);
  const p=a*b, left=DIG[a]+DIG[b];
  if(a===3 && b===3) return '三三歸九';
  if(p===10 && ((a===2&&b===5)||(a===5&&b===2))) return left+'得一十';
  if(p===20 && ((a===4&&b===5)||(a===5&&b===4))) return left+'中二十';
  if(p===30 && ((a===5&&b===6)||(a===6&&b===5))) return left+'中三十';
  if(p===40 && ((a===5&&b===8)||(a===8&&b===5))) return left+'中四十';
  if(p<10) return left+'如'+DIG[p];
  return left+cnNum(p);
}
window.__chant = chant;

/* ---------- sound (Web Audio, generated) ---------- */
const Sfx = {
  ctx:null, master:null, nb:null,
  init(){ try{
    if(!this.ctx){ const AC = window.AudioContext||window.webkitAudioContext; if(!AC) return;
      this.ctx = new AC(); this.master = this.ctx.createGain(); this.master.gain.value = .55; this.master.connect(this.ctx.destination);
      const len = this.ctx.sampleRate; this.nb = this.ctx.createBuffer(1, len, this.ctx.sampleRate); const d = this.nb.getChannelData(0); for(let i=0;i<len;i++) d[i]=Math.random()*2-1; }
    if(this.ctx.state==='suspended') this.ctx.resume();
  }catch(e){} },
  ok(){ return !!this.ctx && !DATA.settings.muted; },
  tone(f, dur, o){ if(!this.ok()) return; o=o||{}; try{ const c=this.ctx, t=c.currentTime+(o.at||0); const osc=c.createOscillator(), g=c.createGain();
    osc.type=o.type||'sine'; osc.frequency.setValueAtTime(f,t); if(o.to) osc.frequency.exponentialRampToValueAtTime(o.to, t+dur);
    g.gain.setValueAtTime(.0001,t); g.gain.exponentialRampToValueAtTime(o.vol||.2, t+(o.attack||.01)); g.gain.exponentialRampToValueAtTime(.0001, t+dur);
    osc.connect(g); g.connect(this.master); osc.start(t); osc.stop(t+dur+.05); }catch(e){} },
  noise(dur, o){ if(!this.ok()) return; o=o||{}; try{ const c=this.ctx, t=c.currentTime+(o.at||0); const s=c.createBufferSource(); s.buffer=this.nb; s.loop=true;
    const fl=c.createBiquadFilter(); fl.type=o.type||'lowpass'; fl.frequency.setValueAtTime(o.f||1000,t); fl.Q.value=o.q||1; if(o.to) fl.frequency.exponentialRampToValueAtTime(o.to,t+dur);
    const g=c.createGain(); g.gain.setValueAtTime(.0001,t); g.gain.exponentialRampToValueAtTime(o.vol||.3,t+.02); g.gain.exponentialRampToValueAtTime(.0001,t+dur);
    s.connect(fl); fl.connect(g); g.connect(this.master); s.start(t); s.stop(t+dur+.05); }catch(e){} },
  click(){ this.tone(880,.05,{type:'square',vol:.05}); },
  correct(){ [880,1108.7,1318.5,1760].forEach((f,i)=>this.tone(f,.22,{type:'triangle',vol:.2,at:i*.07})); },
  wrong(){ this.tone(330,.16,{type:'triangle',vol:.16}); this.tone(247,.3,{type:'triangle',vol:.16,at:.15}); },
  charge(){ this.tone(260,.4,{type:'sawtooth',vol:.05,to:1300}); this.tone(520,.4,{type:'sine',vol:.08,to:2000}); },
  beam(){ this.noise(.9,{vol:.22,type:'bandpass',f:500,to:3200,q:2}); this.tone(220,.9,{type:'sawtooth',vol:.06,to:700}); this.tone(990,.8,{type:'sine',vol:.08,to:1800}); },
  whoosh(){ this.noise(.35,{vol:.25,type:'bandpass',f:350,to:2600,q:1.4}); },
  disc(){ for(let i=0;i<6;i++) this.tone(700+i*80,.1,{type:'triangle',vol:.07,at:i*.06}); this.noise(.45,{vol:.1,type:'highpass',f:3000}); },
  hit(){ this.noise(.25,{vol:.4,type:'lowpass',f:2600,to:200}); this.tone(150,.25,{type:'sine',vol:.35,to:50}); },
  bigHit(){ this.hit(); this.noise(.55,{vol:.3,type:'lowpass',f:1200,to:80,at:.04}); },
  explode(){ this.noise(1.4,{vol:.55,type:'lowpass',f:3000,to:60}); this.tone(95,1.0,{type:'sine',vol:.45,to:30}); [0,.15,.3].forEach(a=>this.noise(.3,{vol:.2,type:'bandpass',f:1600,to:300,at:a+.1})); },
  bonk(){ this.tone(520,.16,{type:'sine',vol:.18,to:210}); this.noise(.12,{vol:.12,type:'lowpass',f:1500}); },
  growl(){ this.tone(120,.35,{type:'sawtooth',vol:.07,to:80}); },
  victory(){ const n=[523.25,659.25,783.99,1046.5,0,783.99,1046.5]; const d=[.14,.14,.14,.3,.07,.14,.6]; let t=0;
    n.forEach((f,i)=>{ if(f){ this.tone(f,d[i]+.05,{type:'square',vol:.07,at:t}); this.tone(f/2,d[i]+.05,{type:'triangle',vol:.12,at:t}); } t+=d[i]; }); },
  star(i){ this.tone(1046.5*Math.pow(1.26,i),.3,{type:'triangle',vol:.18}); this.tone(1568*Math.pow(1.26,i),.3,{type:'sine',vol:.08,at:.05}); },
  tick(){ this.tone(1300,.05,{type:'square',vol:.06}); },
  appear(){ this.tone(110,.6,{type:'sawtooth',vol:.1,to:70}); this.noise(.5,{vol:.18,type:'lowpass',f:500}); },
  whirl(){ for(let i=0;i<5;i++) this.noise(.18,{vol:.2,type:'bandpass',f:500+i*350,to:1800+i*400,q:2,at:i*.11}); this.tone(300,.6,{type:'triangle',vol:.06,to:1200}); },
  jump(){ this.tone(220,.3,{type:'sine',vol:.22,to:880}); },
  shing(){ this.noise(.18,{vol:.22,type:'highpass',f:4000}); this.tone(2400,.2,{type:'triangle',vol:.08,to:3600}); },
  rainbow(){ [523.25,587.33,659.25,698.46,783.99,880,987.77,1046.5,1174.66,1318.5].forEach((f,i)=>this.tone(f,.18,{type:'triangle',vol:.12,at:i*.06})); this.tone(200,1.2,{type:'sawtooth',vol:.04,to:900}); },
  coin(){ this.tone(1568,.08,{type:'square',vol:.05}); this.tone(2093,.22,{type:'triangle',vol:.1,at:.07}); },
  poof(){ this.tone(700,.2,{type:'sine',vol:.15,to:200}); this.noise(.15,{vol:.12,type:'bandpass',f:1500}); }
};

/* ---------- speech (Cantonese preferred) ---------- */
const Speech = {
  voice:null, supported: typeof window!=='undefined' && 'speechSynthesis' in window && typeof SpeechSynthesisUtterance!=='undefined',
  pick(){ if(!this.supported) return; try{ const vs = speechSynthesis.getVoices()||[]; const L = v => (v.lang||'').toLowerCase().replace('_','-');
    this.voice = vs.find(v=>L(v)==='zh-hk') || vs.find(v=>L(v).indexOf('yue')===0) || vs.find(v=>/cantonese|粵|廣東|hong kong/i.test(v.name)) || vs.find(v=>L(v)==='zh-tw') || vs.find(v=>L(v).indexOf('zh')===0) || null;
    updateVoiceNote(); }catch(e){} },
  init(){ if(!this.supported) return; this.pick(); try{ speechSynthesis.addEventListener('voiceschanged', ()=>this.pick()); }catch(e){ try{ speechSynthesis.onvoiceschanged=()=>this.pick(); }catch(_){} } },
  speak(text){ if(!this.supported) return; if(!this.voice) this.pick(); if(!this.voice) return;
    try{ speechSynthesis.cancel(); const u = new SpeechSynthesisUtterance(text); u.voice=this.voice; u.lang=this.voice.lang; u.rate=.85; u.pitch=1.1; speechSynthesis.speak(u); }catch(e){} },
  stop(){ if(this.supported) try{ speechSynthesis.cancel(); }catch(e){} }
};
function updateVoiceNote(){ const el=$('#voiceNote'); if(!el) return; const v=Speech.voice; const l=v?(v.lang||'').toLowerCase():'';
  el.textContent = !v ? '（呢部機冇中文語音，讀出功能用唔到）' : (l.indexOf('hk')>=0||l.indexOf('yue')>=0 ? '' : '（冇廣東話語音，會用其他中文語音讀）'); }

/* ---------- particles ---------- */
function drawStar(c,x,y,r,rot){ c.beginPath(); for(let i=0;i<10;i++){ const rr=i%2?r*.45:r; const a=rot+i*Math.PI/5-Math.PI/2; c.lineTo(x+Math.cos(a)*rr, y+Math.sin(a)*rr); } c.closePath(); c.fill(); }
const FX = { cv:null, cx:null, parts:[], raf:0, w:0, h:0, last:0,
  attach(cv){ this.cv=cv; this.cx=cv.getContext('2d'); this.resize(); },
  resize(){ if(!this.cv) return; const r=this.cv.getBoundingClientRect(); const dpr=Math.min(2, window.devicePixelRatio||1); this.w=r.width; this.h=r.height; this.cv.width=Math.max(1,Math.round(r.width*dpr)); this.cv.height=Math.max(1,Math.round(r.height*dpr)); this.cx.setTransform(dpr,0,0,dpr,0,0); },
  burst(x,y,o){ o=o||{}; const n=o.n||24; for(let i=0;i<n;i++){ const a = o.angle!=null ? o.angle+rand(-(o.spread||.5),(o.spread||.5)) : rand(0,Math.PI*2); const sp=rand(o.min||1.5, o.speed||7);
      const life=o.life||50; this.parts.push({x,y,vx:Math.cos(a)*sp,vy:Math.sin(a)*sp,life:0,max:randi(Math.round(life*.6),life),size:rand((o.size||6)*.5,o.size||6),color:pick(o.colors||['#fff','#9ff','#ffef6b']),shape:o.shape||'circle',g:(o.gravity!=null?o.gravity:.12),rot:rand(0,6),vr:rand(-.2,.2),drag:o.drag||.97}); }
    this.start(); },
  ring(x,y,color,max){ this.parts.push({ring:true,x,y,life:0,max:max||28,size:10,color}); this.start(); },
  start(){ if(!this.raf){ this.last=performance.now(); this.raf=requestAnimationFrame(t=>this.loop(t)); } },
  loop(now){ const c=this.cx; const k60=Math.min(3,(now-this.last)/16.67)||1; this.last=now; c.clearRect(0,0,this.w,this.h);
    this.parts=this.parts.filter(p=>p.life<p.max);
    for(const p of this.parts){ p.life+=k60; c.globalCompositeOperation = p.shape==='coin' ? 'source-over' : 'lighter'; const k=Math.max(0,1-p.life/p.max);
      if(p.ring){ c.globalAlpha=k; c.strokeStyle=p.color; c.lineWidth=7*k+1; c.beginPath(); c.arc(p.x,p.y,p.size+(1-k)*120,0,Math.PI*2); c.stroke(); continue; }
      p.vx*=Math.pow(p.drag,k60); p.vy=p.vy*Math.pow(p.drag,k60)+p.g*k60; p.x+=p.vx*k60; p.y+=p.vy*k60; p.rot+=p.vr*k60;
      c.globalAlpha=k; c.fillStyle=p.color;
      if(p.shape==='coin'){ c.globalAlpha=Math.min(1,k*3); drawCoin(c,p.x,p.y,p.size,p.life*.25+p.rot); } else if(p.shape==='star') drawStar(c,p.x,p.y,p.size*(.6+.4*k),p.rot); else { c.beginPath(); c.arc(p.x,p.y,Math.max(.5,p.size*(.4+.6*k)),0,Math.PI*2); c.fill(); } }
    c.globalAlpha=1; c.globalCompositeOperation='source-over';
    if(this.parts.length) this.raf=requestAnimationFrame(t=>this.loop(t)); else { this.raf=0; c.clearRect(0,0,this.w,this.h); } },
  spiral(x,y,o){ o=o||{}; const n=o.n||30; for(let i=0;i<n;i++){ const a=i/n*Math.PI*2, r=o.r||20, sp=o.speed||6; this.parts.push({x:x+Math.cos(a)*r,y:y+Math.sin(a)*r,vx:-Math.sin(a)*sp+Math.cos(a)*sp*.35,vy:Math.cos(a)*sp+Math.sin(a)*sp*.35,life:0,max:o.life||40,size:rand(3,o.size||7),color:pick(o.colors||['#fff','#9ff']),shape:o.shape||'circle',g:0,rot:0,vr:.1,drag:.96}); } this.start(); },
  clear(){ this.parts=[]; }
};
function drawCoin(c,x,y,r,ph){ const w=Math.max(.15,Math.abs(Math.cos(ph))); c.save(); c.translate(x,y); c.scale(w,1); c.beginPath(); c.arc(0,0,r,0,Math.PI*2); c.fillStyle='#ffd23f'; c.fill(); c.lineWidth=2; c.strokeStyle='#a87400'; c.stroke(); c.beginPath(); c.arc(0,0,r*.6,0,Math.PI*2); c.strokeStyle='#fff3a8'; c.lineWidth=1.5; c.stroke(); c.restore(); }

/* ---------- screens ---------- */
let current = 'home';
function show(id){
  $$('.screen').forEach(s=>s.classList.toggle('active', s.id===id));
  current = id; document.body.dataset.screen = id;
  if(id!=='learn'){ stopAuto(); $$('body > .movename').forEach(rm); }
  if(id==='battle') requestAnimationFrame(()=>{ layoutStage(); FX.resize(); });
  const sc=$('#'+id); if(sc) sc.scrollTop=0;
}
function goHome(){ endBattle(); Speech.stop(); hideSoon(); setHomeMon(); setHomeHeroPose(); show('home'); }

/* ---------- facts / spaced repetition ---------- */
function mastery(k){ const f=DATA.facts[k]; if(!f||(f.c+f.w)===0) return 0; return f.s>=3?2:1; }
function recordFact(k, ok){ const f = DATA.facts[k] || (DATA.facts[k]={c:0,w:0,s:0,p:0});
  if(ok){ f.c++; f.s++; f.p=Math.max(0,f.p-1); } else { f.w++; f.s=0; f.p=Math.min(6,f.p+2); }
  f.t=Date.now(); DATA.stats.answered++; save(); }
function pickFact(tables, recent){
  const items=[]; let total=0;
  tables.forEach(t=>{ for(let b=1;b<=9;b++){ const k=t+'x'+b; const f=DATA.facts[k]; let w = f ? 1+(f.p||0)*1.5 : 1.3;
    if(f && f.s>=3) w*=.5; if(b===1||t===1) w*=.55; if(recent.indexOf(k)>=0) w*=.02; items.push([t,b,w]); total+=w; } });
  let r=Math.random()*total; for(const it of items){ r-=it[2]; if(r<=0) return {a:it[0],b:it[1]}; }
  const it=items[items.length-1]; return {a:it[0],b:it[1]};
}
function makeChoices(a,b){ const ans=a*b; const set=[ans];
  const c=shuffle([a*(b+1),a*(b-1),(a+1)*b,(a-1)*b,ans+1,ans-1,ans+10,ans-10,ans+a,ans-a,ans+2]);
  for(const v of c){ if(set.length>=4) break; if(v>0 && set.indexOf(v)<0) set.push(v); }
  while(set.length<4){ const v=randi(1,90); if(set.indexOf(v)<0) set.push(v); }
  return shuffle(set); }

/* ---------- HOME ---------- */
const HOME_ART = {
  hero: 'assets/home/hero.png',
  dragon: 'assets/home/pet_dragon.png',
  turtle: 'assets/home/pet_turtle.png'
};
/* Idle and 星煌爆 use the standing file assets/battle/hero_h{1-5}.png.
   Action poses: hero_h{N}_pose_{punch|kick|beam|guard|win}.png.
   disc/whirl share punch. tuck (flip windup) stays on the standing art. */
const POSE_FILE = {
  idle:'base', omega:'base', tuck:'base',
  beam:'beam', super:'beam',
  punch:'punch', disc:'punch', whirl:'punch', rainbow:'punch',
  kick:'kick', flip:'kick',
  guard:'guard', win:'win'
};
function poseFile(p){ return POSE_FILE[p] || 'base'; }
function heroStageOf(h){
  let st=1; if(!h) return 1;
  for(let i=1;i<=5;i++) if(h.classList.contains('henshin-'+i)) st=i;
  return st;
}
function heroSrc(stage, pose){
  const st=Math.max(1, Math.min(5, stage|0||1));
  const file=poseFile(pose);
  if(file==='base') return 'assets/battle/hero_h'+st+'.png';
  return 'assets/battle/hero_h'+st+'_pose_'+file+'.png';
}
function preloadForm(stage){
  ['idle','punch','kick','beam','guard','win'].forEach(function(p){
    const im=new Image(); im.src=heroSrc(stage, p);
  });
}
const BATTLE_MON = {
  heidragon:'assets/battle/mon_heidragon.png', lavaover:'assets/battle/mon_lavaover.png',
  holyturt:'assets/battle/mon_holyturt.png', sandwyrm:'assets/battle/mon_sandwyrm.png',
  thundwolf:'assets/battle/mon_thundwolf.png', ninjacat:'assets/battle/mon_ninjacat.png',
  steeltiran:'assets/battle/mon_steeltiran.png', icetiran:'assets/battle/mon_icetiran.png',
  phoenix:'assets/battle/mon_phoenix.png', mtngod:'assets/battle/mon_mtngod.png',
  manflower:'assets/battle/mon_manflower.png', illusdemon:'assets/battle/mon_illusdemon.png',
  seaking:'assets/battle/mon_seaking.png', deathscorp:'assets/battle/mon_deathscorp.png',
  nightmare:'assets/battle/mon_nightmare.png', galmoth:'assets/battle/mon_galmoth.png',
  flamecrab:'assets/battle/mon_flamecrab.png', starlord:'assets/battle/mon_starlord.png'
};
function heroRasterHTML(stage){
  const st = Math.max(1, Math.min(5, stage|0 || 1));
  /* Anchors sit in the 220×320 box over a bottom-aligned square PNG (box is 2:3).
     mk-beam ≈ painted beam core on the beam pose; chest/hand/slug follow the same map. */
  return '<div class="hero henshin-'+st+' raster stand" style="--tc:#5ee7ff">'+
    '<div class="hero-art">'+
    '<img class="hero-raster" src="'+heroSrc(st,'idle')+'" alt="" draggable="false" onerror="window.__heroImgError&&window.__heroImgError(this)">'+
    '<svg class="hero-anchors" viewBox="0 0 220 320" aria-hidden="true">'+
    '<circle class="mk-chest" cx="114" cy="209" r="1"/><circle class="mk-hand" cx="169" cy="209" r="1"/>'+
    '<circle class="mk-beam" cx="182" cy="205" r="1"/><circle class="mk-slug" cx="106" cy="180" r="1"/>'+
    '</svg></div></div>';
}
function bindHeroImg(img){
  if(!img || img.dataset.bound) return;
  img.dataset.bound='1';
  img.addEventListener('error', function(){ fallbackHeroSVG(img); });
}
window.__heroImgError = function(img){ fallbackHeroSVG(img); };
function fallbackHeroSVG(img){
  const bob=$('#heroBob'); if(!bob || bob.dataset.svgFallback) return;
  bob.dataset.svgFallback='1';
  const host=img && img.closest ? img.closest('.hero') : heroSvgEl();
  const classes=['hero'];
  if(host) host.classList.forEach(function(c){ if(c!=='raster' && c!=='hero') classes.push(c); });
  bob.innerHTML=heroSVG('fb');
  const svg=bob.querySelector('.hero');
  if(svg) svg.setAttribute('class', classes.join(' '));
}
function ensureHero(){
  const bob=$('#heroBob'); if(!bob) return;
  if(!bob.querySelector('.hero-raster')){
    delete bob.dataset.svgFallback;
    bob.innerHTML=heroRasterHTML(1);
  }
  bindHeroImg(bob.querySelector('.hero-raster'));
}
function crossfadeHero(img, src){
  if(!img || img.getAttribute('src')===src) return;
  const art=img.parentElement;
  if(art && img.getAttribute('src')){
    const old=img.cloneNode(false);
    old.removeAttribute('onerror');
    old.classList.add('hero-fade');
    art.appendChild(old);
    requestAnimationFrame(function(){ old.classList.add('out'); });
    setTimeout(function(){ if(old.parentNode) old.parentNode.removeChild(old); }, 520);
  }
  img.setAttribute('src', src);
}
function monIdleSrc(type){ return 'assets/monsters/mon_'+type+'.png'; }
function monAttackSrc(type){ return 'assets/monsters/mon_'+type+'_attack.png'; }
function monRasterHTML(type){
  const src = monIdleSrc(type);
  const fb = BATTLE_MON[type] || '';
  if(!MONS[type] && !fb) return monsterSVG(type, 'fb');
  return '<div class="mon mon-raster mon-'+type+'">'+
    '<img class="mon-img" src="'+src+'" alt="" draggable="false" data-fb="'+fb+'">'+
    '<svg class="mon-anchors" viewBox="0 0 240 240" aria-hidden="true">'+
    '<circle class="mk-core" cx="120" cy="130" r="1"/><circle class="mk-mouth" cx="120" cy="150" r="1"/>'+
    '</svg></div>';
}
function bindMonImg(img){
  if(!img || img.dataset.bound) return;
  img.dataset.bound='1';
  img.addEventListener('load', function(){ if(img.closest && img.closest('#monWrap')) layoutStage(); });
  img.addEventListener('error', function(){
    const fb=img.dataset.fb;
    if(fb && img.getAttribute('src')!==fb){ img.setAttribute('src', fb); return; }
    const host=img.closest('.mon');
    if(host && !host.dataset.svg){ host.dataset.svg='1'; const type=(host.className.match(/mon-([a-z]+)/)||[])[1]; if(type && typeof monsterSVG==='function'){ const wrap=host.parentElement; if(wrap) wrap.innerHTML=monsterSVG(type,'fb'); } }
  });
}
/* Sprites are stored already facing the fight. Battle and the dex draw them
   as-is: no scaleX(-1) on monsters or heroes. */
/* Kept so the self-test still bounds the old per-monster attack enlarge.
   Display scale now comes from MON_CROP (painted pixels), not this table. */
const ATTACK_SCALE = {
  deathscorp:1.3, flamecrab:1.3, galmoth:1.3, heidragon:1.3, holyturt:1.3,
  icetiran:1.3, illusdemon:1.3, lavaover:1.19, manflower:1.3, mtngod:1.3,
  nightmare:1.3, ninjacat:1.3, phoenix:1.16, sandwyrm:1.3, seaking:1.3,
  starlord:1.23, steeltiran:1.3, thundwolf:1.21
};
const ELEM_KIND = {'火':'fire','冰':'ice','雷':'thunder','毒':'poison','岩':'rock','沙':'sand','鋼':'steel','水':'water','暗':'dark','光':'light','星':'star'};
const ELEM_PRESET = {
  heidragon:['火','black'], lavaover:['火','lava'], phoenix:['火','gold'], flamecrab:['火','ball'],
  holyturt:['冰','light'], icetiran:['冰','heavy'], thundwolf:['雷','zap'],
  deathscorp:['毒','bubble'], manflower:['毒','vine'], mtngod:['岩','grit'], sandwyrm:['沙','dust'],
  steeltiran:['鋼','spark'], seaking:['水','wave'], ninjacat:['暗','shadow'], nightmare:['暗','mist'],
  illusdemon:['光','flash'], galmoth:['星','dust'], starlord:['星','meteor']
};
function applyMonsterElement(id, word, shade){
  const m=MONS[id]; if(!m||!word) return;
  m.elemWord=word; m.shade=shade||m.shade||'base'; m.elem=ELEM_KIND[word]||'dark';
}
Object.keys(ELEM_PRESET).forEach(function(id){ applyMonsterElement(id, ELEM_PRESET[id][0], ELEM_PRESET[id][1]); });
/* Opaque crop of each monster file (alpha > 16), as fractions of that file.
   h/b/r = idle painted height, empty under the feet, empty to the right.
   ah/ab/ar = the same for the attack frame. a = idle width/height.
   fill = 1/h so the painted body matches the lineup, not the padded file box. */
const MON_CROP = {
  deathscorp:{h:0.994,b:0.003,r:0.003,ah:0.686,ab:0.158,ar:0.064,a:0.992},
  flamecrab:{h:0.994,b:0.003,r:0.003,ah:0.617,ab:0.192,ar:0.064,a:0.992},
  galmoth:{h:0.756,b:0.106,r:0.033,ah:0.544,ab:0.228,ar:0.064,a:1},
  heidragon:{h:0.994,b:0.003,r:0.003,ah:0.714,ab:0.156,ar:0.064,a:0.825},
  holyturt:{h:0.994,b:0.003,r:0.003,ah:0.456,ab:0.272,ar:0.064,a:1.108},
  icetiran:{h:0.994,b:0.003,r:0.003,ah:0.586,ab:0.208,ar:0.064,a:0.922},
  illusdemon:{h:0.853,b:0.103,r:0.308,ah:0.522,ab:0.239,ar:0.067,a:1},
  lavaover:{h:0.989,b:0.006,r:0.006,ah:0.828,ab:0.092,ar:0.158,a:0.986},
  manflower:{h:0.994,b:0.003,r:0.004,ah:0.700,ab:0.150,ar:0.064,a:0.781},
  mtngod:{h:0.994,b:0.003,r:0.003,ah:0.733,ab:0.133,ar:0.064,a:1.020},
  nightmare:{h:0.994,b:0.003,r:0.003,ah:0.675,ab:0.164,ar:0.064,a:0.956},
  ninjacat:{h:0.844,b:0.106,r:0.033,ah:0.550,ab:0.225,ar:0.064,a:1},
  phoenix:{h:0.994,b:0.003,r:0.003,ah:0.858,ab:0.078,ar:0.144,a:0.928},
  sandwyrm:{h:0.994,b:0.003,r:0.003,ah:0.536,ab:0.233,ar:0.064,a:0.939},
  seaking:{h:0.903,b:0.025,r:0.017,ah:0.503,ab:0.250,ar:0.064,a:1},
  starlord:{h:0.994,b:0.003,r:0.004,ah:0.811,ab:0.097,ar:0.100,a:0.719},
  steeltiran:{h:0.994,b:0.003,r:0.003,ah:0.689,ab:0.125,ar:0.075,a:0.900},
  thundwolf:{h:0.994,b:0.003,r:0.003,ah:0.775,ab:0.111,ar:0.089,a:1.059}
};
function monCropOf(type){ return MON_CROP[type]||{h:1,b:0,r:0,ah:1,ab:0,ar:0,a:1}; }
function monFrame(type, on){
  const c=monCropOf(type);
  const h=on?c.ah:c.h, bot=on?c.ab:c.b, right=on?c.ar:c.r;
  if(h>=0.98 && bot<=0.012 && right<=0.012) return {fill:1, foot:0, nudge:0};
  return {fill:+(1/h).toFixed(4), foot:+(bot*100).toFixed(2), nudge:+(right*100).toFixed(2)};
}
function applyMonFit(host, on){
  if(!host) return;
  const f=monFrame(B.type, !!on);
  host.style.setProperty('--fill', String(f.fill));
  if(f.foot) host.style.setProperty('--foot-n', String(f.foot));
  else host.style.removeProperty('--foot-n');
  if(f.nudge) host.style.setProperty('--nudge', String(f.nudge));
  else host.style.removeProperty('--nudge');
}
function setMonAttack(on){
  const img=$('#monBob .mon-img'); if(!img) return;
  bindMonImg(img);
  const host=img.closest('.mon');
  if(host){
    host.classList.remove('atk-flip', 'idle-flip');
    host.classList.toggle('atk-drop', !!on);
    applyMonFit(host, !!on);
  }
  const next = on ? monAttackSrc(B.type) : monIdleSrc(B.type);
  if(img.getAttribute('src')!==next) img.setAttribute('src', next);
}
function monAttackHTML(type){
  return '<div class="mon mon-raster dex-atk mon-'+type+'">'+
    '<img class="mon-img" src="'+monAttackSrc(type)+'" alt="" draggable="false" data-fb="'+monIdleSrc(type)+'">'+
    '</div>';
}
function dexPairHTML(type){
  const word=(MONS[type]&&MONS[type].elemWord)||'';
  return '<div class="dex-pair">'+
    '<figure class="dex-shot"><div class="dimg">'+monRasterHTML(type)+'</div></figure>'+
    '<figure class="dex-shot"><div class="dimg">'+monAttackHTML(type)+'</div></figure>'+
    '</div>'+(word?'<div class="dex-elem">屬性・'+word+'</div>':'');
}
function applyDexPack(pack){
  if(!pack || !pack.monsters) return;
  const order=[];
  pack.monsters.forEach(function(row){
    const id=row.asset, m=MONS[id]; if(!m) return;
    m.name=row.name; m.short=row.name; m.nick=row.move; m.kind=row.kind; m.habitat=row.place;
    m.lore=row.desc_mid; m.kid=row.desc_kid;
    m.spawn=row.spawn; m.power=row.power; m.rare=row.rare;
    if(row.elem) applyMonsterElement(id, row.elem, row.shade);
    order.push(id);
  });
  if(order.length) DEX_ORDER.splice(0, DEX_ORDER.length, ...order);
}
const HOME_PETS=[['dragon','homePetL'],['turtle','homePetR']];
function setHomeMon(){ /* pets are static raster art on home */ }
function setHomeHeroPose(){ /* home splash uses fixed painted art */ }
function initHome(){
  $('#homeHero').innerHTML = '<div class="hero-bob"><img class="home-hero-img" src="'+HOME_ART.hero+'" alt="" draggable="false"></div>';
  const spark=$('.home-sparkles'); if(spark) spark.innerHTML='<i></i><i></i><i></i><i></i><i></i>';
  HOME_PETS.forEach(([key,id])=>{
    const el=$('#'+id); if(!el) return;
    el.innerHTML='<div class="mon-bob"><img class="home-pet-img" src="'+HOME_ART[key]+'" alt="" draggable="false"></div>';
  });
  $('#homeHero').addEventListener('click', ()=>{
    const bob=$('#homeHero .hero-bob'); if(!bob) return;
    Sfx.whoosh();
    play(bob,[{transform:'translateY(0) scale(1)'},{transform:'translateY(-6%) scale(1.06)',offset:.4},{transform:'translateY(0) scale(1)'}],{duration:500,easing:'ease-out'});
  });
  const soonOk=$('#soonOk'); if(soonOk) soonOk.addEventListener('click', ()=>{ Sfx.click(); hideSoon(); });
  const soonCard=$('#soonCard'); if(soonCard) soonCard.addEventListener('click', e=>{ if(e.target===soonCard) hideSoon(); });
  $$('[data-go]').forEach(b=>b.addEventListener('click', ()=>{ Sfx.click(); const g=b.dataset.go;
    if(g==='soon'){ showSoon(b.dataset.soon||''); return; }
    if(g==='learnPick'){ buildLearnTiles(); show('learnPick'); }
    else if(g && g.indexOf('ops-')===0) startOps(g.slice(4));
    else if(g==='setup-battle') openSetup('battle');
    else if(g==='setup-survive' || g==='setup-timed') openSetup('survive');
    else if(g==='setup-combo') openSetup('combo');
    else if(g==='divide') show('divide');
    else if(g==='mixed') show('mixed');
    else if(g==='dex') openDexHome();
    else if(g==='progress') openRecords(); }));
}
function hideSoon(){ const c=$('#soonCard'); if(c) c.hidden=true; }
function showSoon(name){
  const c=$('#soonCard'); if(!c) return;
  const t=$('#soonText');
  if(t) t.textContent=(name?name+' ':'')+'就快可以玩！';
  c.hidden=false;
}
function openRecords(){
  renderProgress(); show('progress');
  const sc=$('#progress'); if(sc) sc.scrollTop=0;
}
function openDexHome(){
  renderProgress(); show('dexView');
  const sc=$('#dexView'); if(sc) sc.scrollTop=0;
}

const TILE_COLORS = {1:['#94a3b8','#475569'],2:['#ff6b6b','#c92a2a'],3:['#ffa94d','#d9480f'],4:['#ffd43b','#e67700'],5:['#69db7c','#2b8a3e'],6:['#38d9a9','#087f5b'],7:['#4dabf7','#1864ab'],8:['#9775fa','#5f3dc4'],9:['#f783ac','#c2255c'],10:['#94a3b8','#475569']};
function tileHTML(t, extra){ const c=TILE_COLORS[t]; const tier=DATA.badges[t]||0;
  return '<button class="tile'+((t===1||t===10)?' opt':'')+'" data-t="'+t+'" style="--t1:'+c[0]+';--t2:'+c[1]+'">'+(extra||'')+'<b>'+t+'</b><span>乘數表</span>'+(tier?'<span class="tmedal">'+medalSVG(t,tier)+'</span>':'')+((t===1||t===10)&&!extra?'<span class="optlbl">加餐</span>':'')+'</button>'; }

/* ---------- LEARN ---------- */
const L = {t:2, i:1, auto:false, timer:null, seen:{}};
function buildLearnTiles(){ const el=$('#learnTiles'); el.innerHTML=[2,3,4,5,6,7,8,9,1,10].map(t=>tileHTML(t)).join('');
  $$('.tile',el).forEach(b=>b.addEventListener('click',()=>{ Sfx.click(); openLearn(+b.dataset.t); })); }
function openLearn(t){ L.t=t; L.i=1; L.seen={}; stopAuto(); $('#lTitle').textContent=t;
  $('#lList').innerHTML = Array.from({length:9},(_,k)=>k+1).map(b=>'<button class="litem" data-b="'+b+'"><b>'+t+' × '+b+' = '+(t*b)+'</b><span>'+chant(t,b)+'</span></button>').join('');
  $$('.litem').forEach(el=>el.addEventListener('click',()=>{ stopAuto(); L.i=+el.dataset.b; renderLearn(true); }));
  $('#lProg').innerHTML = Array.from({length:9},()=>'<i></i>').join('');
  show('learn'); renderLearn(true); }
const ROWC = ['#ff6b6b','#ffa94d','#ffe14d','#69db7c','#4dd6ff','#748ffc','#c77dff','#ff7ad9','#7dffcf','#ffd1a6'];
function renderLearn(speak){
  const a=L.t, b=L.i, p=a*b; L.seen[b]=1;
  $('#lA').textContent=a; $('#lB').textContent=b; $('#lP').textContent=p; $('#lChant').textContent=chant(a,b);
  play($('#lEq'),[{transform:'scale(.7)',opacity:.3},{transform:'scale(1.08)',opacity:1,offset:.6},{transform:'scale(1)'}],{duration:380,easing:'ease-out'});
  play($('#lChant'),[{transform:'translateY(12px)',opacity:0},{transform:'none',opacity:1}],{duration:420,easing:'ease-out'});
  const box=$('#lDots'); const card=$('.lcard');
  const cw = Math.max(200, card.clientWidth - 40); const maxH = Math.max(120, window.innerHeight*(window.innerWidth>window.innerHeight?0.30:0.26));
  const ds = Math.max(9, Math.floor(Math.min(34, (cw-70)/(a*1.2+2.4), maxH/(b*1.25))));
  box.style.setProperty('--ds', ds+'px');
  let html=''; for(let r=1;r<=b;r++){ html+='<div class="drow'+(r===b?' new':'')+'" style="--c:'+ROWC[(r-1)%ROWC.length]+'">'; for(let k=0;k<a;k++) html+='<span class="dstar"></span>'; html+='<span class="dsum">'+(a*r)+'</span></div>'; }
  box.innerHTML=html;
  $('#lCap').textContent = '每行 '+a+' 粒星，有 '+b+' 行，一共 '+p+' 粒！';
  $$('#lProg i').forEach((el,k)=>el.classList.toggle('on', k<b));
  $$('.litem').forEach(el=>{ const bb=+el.dataset.b; el.classList.toggle('on', bb===b); el.classList.toggle('seen', !!L.seen[bb]); });
  $('#lPrev').disabled = b===1;
  $('#lNext').innerHTML = b===9 ? '完成！'+icon('check') : '下一個'+icon('next');
  if(speak && !DATA.settings.muted) Speech.speak(chant(a,b));
}
function markTableLearned(t){
  for(let b=1;b<=9;b++){ const k=t+'x'+b; const f=DATA.facts[k]||(DATA.facts[k]={c:0,w:0,s:0,p:0});
    if((f.c||0)+(f.w||0)===0){ f.c=1; f.s=Math.max(f.s||0,1); f.t=Date.now(); }
    else if((f.s||0)<1){ f.s=1; f.t=Date.now(); } }
  DATA.badges[t]=Math.max(DATA.badges[t]||0, 1); save();
}
function learnNext(){ if(L.i<9){ L.i++; renderLearn(true); Sfx.click(); } else { stopAuto(); markTableLearned(L.t); Sfx.victory();
  const card=$('.lcard'); if(!card) return; const c=card.getBoundingClientRect(); const lay=document.createElement('div'); lay.className='movename'; lay.style.position='fixed'; lay.style.left=(c.left+c.width/2)+'px'; lay.style.top=(c.top+c.height*0.4)+'px'; lay.textContent='好叻呀！'; document.body.appendChild(lay);
  play(lay,[{transform:'translate(-50%,-50%) scale(.2)',opacity:0},{transform:'translate(-50%,-50%) scale(1.2)',opacity:1,offset:.3},{transform:'translate(-50%,-50%) scale(1)',opacity:1,offset:.8},{transform:'translate(-50%,-50%) scale(1.2)',opacity:0}],{duration:1500}).then(()=>rm(lay)); } }
function learnPrev(){ if(L.i>1){ L.i--; renderLearn(true); Sfx.click(); } }
function stopAuto(){ L.auto=false; clearInterval(L.timer); L.timer=null; const b=$('#lAuto'); if(b) b.innerHTML=icon('play')+'<span class="lbl">自動</span>'; }
function toggleAuto(){ if(L.auto){ stopAuto(); return; } L.auto=true; $('#lAuto').innerHTML=icon('pause')+'<span class="lbl">停</span>'; if(L.i>=9){ L.i=1; renderLearn(true); }
  L.timer=setInterval(()=>learnNext(), 3200); }
function initLearn(){
  $('#lBack').addEventListener('click',()=>{ Sfx.click(); buildLearnTiles(); show('learnPick'); });
  $('#lPrev').addEventListener('click',()=>{ stopAuto(); learnPrev(); });
  $('#lNext').addEventListener('click',()=>{ stopAuto(); learnNext(); });
  $('#lSpeak').addEventListener('click',()=>{ if(DATA.settings.muted){ play($('#btnMute'),[{transform:'scale(1)'},{transform:'scale(1.2)'},{transform:'scale(1)'}],{duration:280}); return; } Speech.speak(chant(L.t,L.i)); play($('#lChant'),[{transform:'scale(1)'},{transform:'scale(1.15)'},{transform:'scale(1)'}],{duration:400}); });
  $('#lAuto').addEventListener('click',()=>{ Sfx.click(); toggleAuto(); });
  $('#lGo').addEventListener('click',()=>{ Sfx.click(); DATA.settings.tables=[L.t]; save(); startOps('mul', {tables:[L.t]}); });
}

/* ---------- SETUP ---------- */
let setupMode='battle';
function openSetup(mode){ setupMode=mode;
  const clock = mode==='survive' || mode==='combo' || mode==='timed';
  if(mode==='timed') setupMode='survive';
  const titles = {battle:'打怪獸', survive:'限時生存', combo:'連擊挑戰'};
  const subs = {
    battle:'揀你想練習嘅乘數表（可以揀幾個）',
    survive:'60 秒。答錯扣 5 秒，打低一隻怪獸加 8 秒。',
    combo:'90 秒。連對 6 題就變奧米加翼光，斷咗會跌返形態。'
  };
  const rules = {
    battle:'',
    survive:'稱號跟你衝到嘅形態，例如銀光戰士。',
    combo:'衝到連擊 6 就有稱號「翼光奧米加」，同圖鑑印章。'
  };
  $('#setupTitle').textContent = titles[setupMode]||'打怪獸';
  $('#setupSub').textContent = subs[setupMode]||subs.battle;
  const rulesEl=$('#setupRules'); if(rulesEl) rulesEl.textContent=rules[setupMode]||'';
  $('#startBtn .lbl').textContent = setupMode==='survive' ? '開始 60 秒！' : setupMode==='combo' ? '開始 90 秒！' : '開始打怪獸！';
  $('#startBtn').className = 'btn'+(clock?' orange':'');
  const modeRow=$('#modeRow'); if(modeRow) modeRow.hidden = clock;
  const el=$('#setupTiles'); el.innerHTML=[2,3,4,5,6,7,8,9,1,10].map(t=>tileHTML(t,'<span class="chk">'+icon('check')+'</span>')).join('');
  $$('.tile',el).forEach(b=>b.addEventListener('click',()=>{ Sfx.click(); b.classList.toggle('on'); syncSetup(); }));
  applySel(DATA.settings.tables||[2]); syncSeg(); syncSpeakSeg(); show('setup'); }
function selTables(){ return $$('#setupTiles .tile.on').map(b=>+b.dataset.t).sort((a,b)=>a-b); }
function applySel(arr){ $$('#setupTiles .tile').forEach(b=>b.classList.toggle('on', arr.indexOf(+b.dataset.t)>=0)); syncSetup(); }
function syncSetup(){ const t=selTables(); DATA.settings.tables=t; save(); $('#startBtn').disabled = t.length===0; $('#setupWarn').textContent = t.length? '' : '請揀最少一個乘數表呀！';
  if(setupMode==='survive'||setupMode==='combo'){
    const key=(setupMode==='combo'?'cb:':'sv:')+t.join(',');
    const best=DATA.best[key]||0;
    const word=setupMode==='combo'?'最高連擊':'答啱題數';
    $('#bestTxt').textContent = t.length ? ('呢個組合最佳'+word+'：'+best+(DATA.best[setupMode==='combo'?'comboAll':'surviveAll']?('　｜　總最佳：'+DATA.best[setupMode==='combo'?'comboAll':'surviveAll']):'')) : '';
  } else $('#bestTxt').textContent=''; }
function syncSeg(){ $$('#modeSeg button').forEach(b=>{ const on=(+b.dataset.choice===1)===!!DATA.settings.choice; b.classList.toggle('on', on); b.setAttribute('aria-pressed', on?'true':'false'); }); }
function syncSpeakSeg(){ $$('#speakSeg button').forEach(b=>{ const on=(b.dataset.speak==='1')===!!DATA.settings.autoSpeak; b.classList.toggle('on', on); b.setAttribute('aria-pressed', on?'true':'false'); }); }
function initSetup(){
  $('#selMix').addEventListener('click',()=>{ Sfx.click(); applySel([2,3,4,5,6,7,8,9]); });
  $('#selNone').addEventListener('click',()=>{ Sfx.click(); applySel([]); });
  $$('#modeSeg button').forEach(b=>b.addEventListener('click',()=>{ Sfx.click(); DATA.settings.choice = b.dataset.choice==='1'; save(); syncSeg(); }));
  $$('#speakSeg button').forEach(b=>b.addEventListener('click',()=>{ Sfx.click(); DATA.settings.autoSpeak = b.dataset.speak==='1'; save(); syncSpeakSeg(); }));
  $('#startBtn').addEventListener('click',()=>{ const t=selTables(); if(!t.length) return; Sfx.click(); startSession(setupMode, t); });
}

/* ---------- BATTLE ---------- */
const NORMALS = ['lavaover','holyturt','sandwyrm','thundwolf','ninjacat','icetiran','phoenix','mtngod','manflower','seaking','deathscorp','nightmare','galmoth','flamecrab'];
const MID_BOSSES = ['steeltiran','illusdemon','heidragon'];
const OMEGA_NORMALS = NORMALS.slice();
function pickFresh(list, avoid){ const c=list.filter(t=>(avoid||[]).indexOf(t)<0); const fresh=c.filter(t=>!(DATA.dex&&DATA.dex[t])); return pick(fresh.length?fresh:c); }
function dexAdd(t){ if(!DATA.dex) DATA.dex={}; const first=!DATA.dex[t]; DATA.dex[t]=(DATA.dex[t]||0)+1; save(); return first; }
const MOVES = {
  beam:'十字死光！', kick:'光速飛踢！', disc:'光輪斬！', punch:'爆裂光拳！', whirl:'螺旋旋風拳！',
  flip:'彗星迴旋踢！', super:'超級十字死光！', rainbow:'彩虹旋風斬！', omega:'奧米加星煌爆！'
};
const MOVE_YELL = { beam:'閃！', kick:'踢！', disc:'斬！', punch:'轟！', whirl:'破！', flip:'彗！', super:'滅！', rainbow:'彩！', omega:'煌！' };
const NORMAL_MOVES = ['beam','kick','disc','punch','whirl','flip'];
const TIMED_MOVES = ['beam','kick','disc','punch'];
const B = {token:0, busy:true, input:'', recent:[]};
let stageEl, heroWrap, monWrap, fxLayer, monCounter=0;
const K = () => B._cine ? 2.1 : (isClockMode() ? .65 : 1);
function isClockMode(){ return B.mode==='survive' || B.mode==='combo' || B.mode==='timed'; }
const FORM_TITLE = {1:'銀光戰士', 2:'紅銀戰士', 3:'流星戰士', 4:'金焰戰士', 5:'翼光戰士'};
const CLEAR_BONUS = 8;
const WRONG_PENALTY = 5;
const HEN_LABEL = ['','銀光形態','紅銀覺醒','藍披流星','金焰超能','奧米加翼光'];
function heroSvgEl(){ return $('#heroBob .hero'); }
function monSvgEl(){ return $('#monBob .mon'); }
function mk(sel, root){ return (root||stageEl).querySelector(sel); }
function relPos(el){ const s=stageEl.getBoundingClientRect(), r=el.getBoundingClientRect(); return {x:r.left-s.left+r.width/2, y:r.top-s.top+r.height/2, w:r.width, h:r.height, l:r.left-s.left, t:r.top-s.top}; }
function heroPose(p){
  const h=heroSvgEl(); if(!h) return;
  const keep=[]; h.classList.forEach(c=>{ if(c==='raster'||c.indexOf('t-')===0||c==='aura'||c==='rainbow'||c==='no-slug'||c==='charging'||c.indexOf('combo-')===0||c.indexOf('henshin-')===0) keep.push(c); });
  const file=poseFile(p||'idle');
  const base=file==='base';
  h.setAttribute('class', ['hero'].concat(keep, p&&p!=='idle'?['pose-'+p]:[], base?['stand']:['pose-fit']).join(' '));
  applyPoseFit(h, file);
  /* Beam pose and the omega move cross the monster. Keep the hero behind it, full opacity. */
  if(heroWrap){
    heroWrap.classList.remove('soft-beam');
    heroWrap.classList.toggle('under-mon', p==='beam' || p==='omega');
  }
  const bob=$('#heroBob');
  if(bob && bob.dataset.svgFallback) return;
  const img=h.querySelector('.hero-raster'); if(!img) return;
  const src=heroSrc(heroStageOf(h), (!p||p==='idle')?'idle':p);
  if(img.getAttribute('src')!==src) img.setAttribute('src', src);
}
/* Streak → form. 0 h1, 1–2 h2, 3–4 h3, 5 h4, ≥6 h5. */
function henshinStage(){ const c=B.combo||0; if(c>=6) return 5; if(c>=5) return 4; if(c>=3) return 3; if(c>=1) return 2; return 1; }
function syncHenshin(){
  const h=heroSvgEl(); if(!h) return;
  const st=henshinStage(), prev=B._hen||1;
  for(let i=1;i<=5;i++) h.classList.toggle('henshin-'+i, i===st);
  const bob=$('#heroBob');
  const img=h.querySelector('.hero-raster');
  if(img && !(bob&&bob.dataset.svgFallback)){
    const next=heroSrc(st,'idle');
    if(st>prev) crossfadeHero(img, next);
    else if(img.getAttribute('src')!==next) img.setAttribute('src', next);
  }
  if(isClockMode()) B.maxHen=Math.max(B.maxHen||1, st);
  const nameEl=$('#formName');
  if(nameEl){
    nameEl.textContent=HEN_LABEL[st]||HEN_LABEL[1];
    nameEl.hidden=false;
    if(st>prev){ nameEl.classList.remove('flash'); void nameEl.offsetWidth; nameEl.classList.add('flash'); }
  }
  if(st>prev){
    B._henLabel=HEN_LABEL[st];
    h.classList.add('henshin-up');
    preloadForm(Math.min(5, st+1));
    try{ const hp=relPos(mk('.mk-chest',heroWrap));
      FX.burst(hp.x,hp.y,{n:22,speed:7,shape:'star',colors:['#fff','#bff3ff','#ffe066','#ff7ad9'],size:8,life:50,gravity:.05}); }catch(e){}
  }
  if(st!==prev) layoutStage();
  B._hen=st;
}
async function playHenshinFanfare(){
  const label=B._henLabel; if(!label) return;
  B._henLabel=null;
  flash('#fff',.55); Sfx.charge();
  const h=heroSvgEl();
  await showMoveName(label+'！','henshin', 720);
  if(h) h.classList.remove('henshin-up');
}
function elemOf(type){
  const m=MONS[type]||{};
  return {kind:m.elem||'dark', word:m.elemWord||'暗', shade:m.shade||'base'};
}
function isHardFight(){
  if(isClockMode() || !B.type || !MONS[B.type]) return false;
  /* Kept for the old boss gate. Element hits no longer use it. */
  return !!(MONS[B.type].boss) || (B.round|0)>=3 || (B.combo||0)>=7;
}
function clearElementHit(){
  const card=$('#qCard'), choices=$('#choices'), pop=$('#elemPop');
  if(card) card.className='qcard';
  if(choices){ choices.className='choices'; $$('.choice', choices).forEach(function(b){ b.classList.remove('eh-wrong','eh-ok','shade-ball','shade-meteor'); }); }
  if(pop){ pop.className='elem-pop'; pop.textContent=''; pop.setAttribute('aria-hidden','true'); }
  $$('#panel .ebit').forEach(rm);
}
function clearDisrupt(){ clearElementHit(); const el=$('#disrupt'); if(el){ el.className='disrupt'; el.setAttribute('aria-hidden','true'); } }
function applyDisrupt(){ /* Persistent whole-panel scramble is gone. Wrong answers hit the card only. */ }
function paintElemBits(host, kind){
  if(!host) return;
  const n = (kind==='fire'||kind==='star'||kind==='ice'||kind==='sand') ? 12 : 8;
  for(let i=0;i<n;i++){
    const s=document.createElement('i');
    s.className='ebit ebit-'+kind;
    s.style.left=(6+Math.random()*88)+'%';
    s.style.top=(8+Math.random()*78)+'%';
    s.style.animationDelay=(Math.random()*0.28)+'s';
    host.appendChild(s);
  }
}
function playElementHit(wrongBtn){
  clearElementHit();
  const info=elemOf(B.type);
  const card=$('#qCard'); if(!card) return;
  card.classList.add('eh','eh-'+info.kind,'shade-'+info.shade);
  paintElemBits(card, info.kind);
  const choices=$('#choices');
  if(choices && $$('.choice', choices).length){
    choices.classList.add('eh','eh-'+info.kind,'eh-'+info.shade,'shade-'+info.shade);
    $$('.choice', choices).forEach(function(b){
      const correct=B.q && String(b.dataset.v)===String(B.q.ans);
      if(correct) b.classList.add('eh-ok');
      else paintElemBits(b, info.kind);
    });
    if(wrongBtn) wrongBtn.classList.add('eh-wrong','shade-'+info.shade);
  }
  const pop=$('#elemPop');
  if(pop){
    pop.textContent=info.word+'！';
    pop.className='elem-pop show pop-'+info.kind;
    pop.setAttribute('aria-hidden','false');
  }
  if(info.kind==='fire' || info.kind==='star') Sfx.hit();
  else if(info.kind==='thunder') Sfx.shing();
  else if(info.kind==='ice') Sfx.whoosh();
  else Sfx.bonk();
  clearTimeout(B._elemT);
  B._elemT=setTimeout(clearElementHit, 1050);
}
function clearCinema(){
  const cine=$('#cinema'), battle=$('#battle');
  if(cine){ cine.classList.remove('on'); cine.innerHTML=''; cine.setAttribute('aria-hidden','true'); }
  if(battle) battle.classList.remove('battle-cine');
  B._cine=false;
}
function syncChestLight(){
  const h=heroSvgEl();
  const wrongs=B.rwrong||0; let col='#38d6cf', blink=false, comboCls='';
  if(wrongs>=3){ col='#ef4444'; blink=true; }
  else if(wrongs===2){ col='#f97316'; }
  else if(wrongs===1){ col='#facc15'; }
  else if(B.combo>=6){ col='#ff7ad9'; blink=true; comboCls='combo-omega'; }
  else if(B.combo>=5){ col='#ffe14d'; blink=true; comboCls='combo-rainbow'; }
  else if(B.combo>=3){ col='#7ff0ff'; blink=true; comboCls='combo-super'; }
  else if(B.combo>=1){ col='#6d7cff'; }
  if(h){
    h.style.setProperty('--tc',col);
    h.classList.toggle('t-blink', blink);
    ['combo-super','combo-rainbow','combo-omega'].forEach(c=>h.classList.remove(c));
    if(comboCls) h.classList.add(comboCls);
  }
  const lamp=$('#chestLamp');
  if(lamp){ lamp.style.setProperty('--tc', col); lamp.classList.toggle('blink', blink); }
}
function setChestTimer(wrongs){ B.rwrong=wrongs||0; syncChestLight(); }
async function chargePose(pose, ms){
  const h=heroSvgEl(); if(h) h.classList.add('charging');
  heroPose(pose); flash('#fff',.35); Sfx.charge();
  const hp=relPos(heroWrap); FX.spiral(hp.x,hp.y,{n:18,r:hp.h*.35,speed:-4,colors:['#fff','#bff3ff','#ffe066'],life:28,size:5,shape:'star'});
  await sleep((ms||280)*K());
  if(h) h.classList.remove('charging');
}
/* Standing body, as a fraction of the square pose canvas.
   Idle art is a tight portrait, so the pose box is taller than the body on screen. */
const HERO_STAND = {1:0.50,2:0.56,3:0.54,4:0.55,5:0.56};
const HERO_ASPECT = {1:319/520,2:422/520,3:423/520,4:410/520,5:417/520};
/* Opaque crop of each 520 pose square: h painted height, b empty under the feet, l empty to the left. */
const POSE_CROP = {
  1:{punch:{h:0.583,b:0.210,l:0.108},kick:{h:0.548,b:0.240,l:0.104},beam:{h:0.671,b:0.165,l:0.081},guard:{h:0.565,b:0.219,l:0.188},win:{h:0.835,b:0.092,l:0.233}},
  2:{punch:{h:0.577,b:0.213,l:0.169},kick:{h:0.554,b:0.227,l:0.096},beam:{h:0.563,b:0.221,l:0.154},guard:{h:0.563,b:0.217,l:0.177},win:{h:0.838,b:0.087,l:0.158}},
  3:{punch:{h:0.563,b:0.221,l:0.133},kick:{h:0.552,b:0.229,l:0.088},beam:{h:0.817,b:0.092,l:0.081},guard:{h:0.810,b:0.102,l:0.081},win:{h:0.860,b:0.077,l:0.144}},
  4:{punch:{h:0.571,b:0.215,l:0.146},kick:{h:0.750,b:0.152,l:0.067},beam:{h:0.831,b:0.098,l:0.083},guard:{h:0.565,b:0.221,l:0.115},win:{h:0.819,b:0.090,l:0.192}},
  5:{punch:{h:0.565,b:0.221,l:0.156},kick:{h:0.554,b:0.225,l:0.137},beam:{h:0.669,b:0.167,l:0.113},guard:{h:0.765,b:0.115,l:0.092},win:{h:0.860,b:0.071,l:0.094}}
};
function applyPoseFit(h, file){
  if(!h || file==='base'){
    if(h){ h.style.removeProperty('--pose-s'); h.style.removeProperty('--pose-x'); h.style.removeProperty('--pose-y'); }
    return;
  }
  const st=heroStageOf(h);
  const crop=POSE_CROP[st]&&POSE_CROP[st][file];
  const frac=HERO_STAND[st]||0.54;
  if(!crop || !crop.h) return;
  /* Painted height = pose box × scale × hfrac = standing body. Cap at 1 so a
     future tight crop cannot grow past the pose box and look oversized. */
  const s=Math.min(1, frac/crop.h);
  h.style.setProperty('--pose-s', s.toFixed(4));
  h.style.setProperty('--pose-x', (-crop.l*s*100).toFixed(2));
  h.style.setProperty('--pose-y', (crop.b*s*100).toFixed(2));
}
function layoutStage(){ if(!stageEl||!heroWrap||!monWrap) return; const w=stageEl.clientWidth, h=stageEl.clientHeight; if(!w||!h) return;
  /* Idle hero and the painted monster share one height. Attack frames use
     their own crop, but the lineup stays on the idle crop so a punch does
     not resize the hero. */
  const st=henshinStage();
  const frac=HERO_STAND[st]||0.54;
  const heroAspect=HERO_ASPECT[st]||0.75;
  const battle=document.getElementById('battle');
  const pop=parseFloat((battle&&getComputedStyle(battle).getPropertyValue('--pop'))||'')||1.05;
  const crop=monCropOf(B.type);
  const idleFill=monFrame(B.type, false).fill;
  const idleAspect=crop.a||1;
  const img=document.querySelector('#monBob .mon-img');
  let drawAspect=idleAspect;
  if(img&&img.naturalWidth>0&&img.naturalHeight>0) drawAspect=img.naturalWidth/img.naturalHeight;
  let lineup=Math.max(72, h*0.40);
  const maxCanvas=h*0.70;
  if(lineup*idleFill>maxCanvas) lineup=maxCanvas/idleFill;
  let heroBox=lineup/frac;
  const maxBoxH=h*0.72;
  if(heroBox>maxBoxH){ heroBox=maxBoxH; lineup=heroBox*frac; }
  const maxBoxW=Math.max(88, w-4);
  if(heroBox>maxBoxW){ heroBox=maxBoxW; lineup=heroBox*frac; }
  const room=Math.max(80, w-8);
  const need=lineup*heroAspect+lineup*idleAspect*idleFill;
  if(need>room){ lineup*=room/need; heroBox=lineup/frac; }
  const monBox=lineup/Math.max(pop,0.01);
  heroWrap.style.height=Math.round(heroBox)+'px';
  heroWrap.style.width=Math.round(heroBox)+'px';
  monWrap.style.height=Math.round(monBox)+'px';
  monWrap.style.width=Math.round(monBox*drawAspect)+'px';
  const host=document.querySelector('#monBob .mon');
  if(host&&!host.classList.contains('atk-drop')) applyMonFit(host, false);
}

function fxEl(cls, html){ const e=document.createElement('div'); e.className=cls; if(html) e.innerHTML=html; fxLayer.appendChild(e); return e; }
function shake(px){ const a=px||8; play(stageEl,[{transform:'translate(0,0)'},{transform:'translate('+(-a)+'px,'+(a*.5)+'px)'},{transform:'translate('+a+'px,'+(-a*.4)+'px)'},{transform:'translate('+(-a*.6)+'px,'+(-a*.3)+'px)'},{transform:'translate('+(a*.4)+'px,'+(a*.3)+'px)'},{transform:'translate(0,0)'}],{duration:420}); }
function flash(color, op){ const f=fxEl('flash'); if(color) f.style.background=color; play(f,[{opacity:op||.75},{opacity:0}],{duration:380}).then(()=>rm(f)); }
function showMoveName(text, cls, dur){ const e=fxEl('movename '+(cls||'')); e.textContent=text;
  return play(e,[{transform:'translate(-50%,-50%) scale(.2) rotate(-10deg)',opacity:0},{transform:'translate(-50%,-50%) scale(1.25) rotate(3deg)',opacity:1,offset:.2},{transform:'translate(-50%,-50%) scale(1) rotate(0)',opacity:1,offset:.32},{transform:'translate(-50%,-50%) scale(1)',opacity:1,offset:.85},{transform:'translate(-50%,-50%) scale(1.3)',opacity:0}],{duration:(dur||1400)*K(),easing:'ease-out'}).then(()=>rm(e)); }
function floatText(cls, text, x, y){ const e=fxEl(cls); e.textContent=text; e.style.left=x+'px'; e.style.top=y+'px';
  play(e,[{transform:'translate(-50%,0) scale(.5)',opacity:0},{transform:'translate(-50%,-30px) scale(1.2)',opacity:1,offset:.25},{transform:'translate(-50%,-70px) scale(1)',opacity:0}],{duration:1100}).then(()=>rm(e)); }
function impactStar(t, text){ const e=fxEl('impact','<svg viewBox="0 0 100 100"><polygon points="50,2 60,32 92,18 72,46 98,60 66,66 74,96 50,76 26,96 34,66 2,60 28,46 8,18 40,32" fill="#ffe14d" stroke="#ff3b3b" stroke-width="4" stroke-linejoin="round"/></svg><span>'+text+'</span>');
  e.style.left=t.x+'px'; e.style.top=t.y+'px'; play(e,[{transform:'scale(0) rotate(-20deg)',opacity:1},{transform:'scale(1.15) rotate(5deg)',opacity:1,offset:.3},{transform:'scale(1)',opacity:1,offset:.7},{transform:'scale(1.2)',opacity:0}],{duration:700}).then(()=>rm(e)); }
function makeBeam(o,t,thick,cls,dur){ const dx=t.x-o.x, dy=t.y-o.y, len=Math.hypot(dx,dy), ang=Math.atan2(dy,dx)*180/Math.PI; const e=document.createElement('div'); e.className='beam '+(cls||''); (stageEl||fxLayer).appendChild(e);
  e.style.left=o.x+'px'; e.style.top=(o.y-thick/2)+'px'; e.style.width=len+'px'; e.style.height=thick+'px'; e.style.transformOrigin='0 50%';
  const R='rotate('+ang+'deg)';
  play(e,[{transform:R+' scaleX(0)',opacity:1},{transform:R+' scaleX(1)',opacity:1,offset:.22},{transform:R+' scaleX(1) scaleY(1.25)',opacity:1,offset:.5},{transform:R+' scaleX(1) scaleY(.9)',opacity:1,offset:.8},{transform:R+' scaleX(1) scaleY(0)',opacity:0}],{duration:dur*K(),easing:'ease-out'}).then(()=>rm(e)); return e; }
function speedLines(){ const h=stageEl.clientHeight, w=stageEl.clientWidth; for(let i=0;i<7;i++){ const e=fxEl('speedline'); e.style.top=rand(h*.2,h*.85)+'px'; e.style.left=rand(0,w*.3)+'px'; e.style.width=rand(60,160)+'px';
  play(e,[{transform:'translateX(0)',opacity:0},{opacity:.9,offset:.3},{transform:'translateX('+(w*.5)+'px)',opacity:0}],{duration:380,delay:i*30}).then(()=>rm(e)); } }
const RAINBOW=['#ff7ad9','#ffe066','#7ff0ff','#b58cff','#9dff6b','#fff'];

async function mvBeam(hit, sup){ heroPose('beam'); Sfx.charge(); await sleep(60);
  const o=relPos(mk('.mk-beam',heroWrap)), t=relPos(mk('.mk-core',monWrap));
  FX.burst(o.x,o.y,{n:16,speed:3,colors:sup?RAINBOW:['#fff','#bff'],gravity:0,life:26,size:5});
  await sleep(300*K()); Sfx.beam(); makeBeam(o,t,sup?40:26,sup?'super':'',sup?1400:1000);
  if(sup) flash('#fff6c4',.45);
  await sleep(220*K()); hit(); shake(sup?14:8);
  const iv=setInterval(()=>FX.burst(t.x,t.y,{n:sup?14:8,speed:sup?9:6,colors:sup?RAINBOW:['#fff','#aef','#ffef6b'],life:32,size:sup?8:6,shape:sup?'star':'circle'}),70);
  await sleep((sup?850:520)*K()); clearInterval(iv); if(sup){ FX.ring(t.x,t.y,'#ffe066'); FX.ring(t.x,t.y,'#ff7ad9',36); }
  await sleep(260*K()); heroPose('idle'); }
async function mvKick(hit){ const h=relPos(heroWrap), m=relPos(monWrap); const dx=(m.l+m.w*.28)-(h.l+h.w*.95);
  heroPose('kick'); Sfx.whoosh(); speedLines(); const rise=Math.max(h.h*.12, Math.min(h.h*.42, h.t+h.h*.06));
  const a=play(heroWrap,[{transform:'translate(0,0) rotate(0)'},{transform:'translate('+(dx*.45)+'px,'+(-rise)+'px) rotate(-14deg)',offset:.35},{transform:'translate('+dx+'px,'+(-h.h*.1)+'px) rotate(-8deg)',offset:.55},{transform:'translate('+dx+'px,'+(-h.h*.1)+'px) rotate(-8deg)',offset:.66},{transform:'translate(0,0) rotate(0)'}],{duration:1150*K(),easing:'ease-in-out'});
  await sleep(630*K()); const t=relPos(mk('.mk-core',monWrap)); hit(); Sfx.bigHit(); shake(12); impactStar(t,'砰！');
  FX.burst(t.x,t.y,{n:30,speed:9,colors:['#fff','#ffd84d','#ff8a3d'],shape:'star',size:9});
  await a; heroPose('idle'); }
async function mvDisc(hit){ heroPose('disc'); Sfx.charge(); await sleep(190);
  const hand=relPos(mk('.mk-hand',heroWrap)); const t=relPos(mk('.mk-core',monWrap)); const size=Math.max(46, heroWrap.clientHeight*.36);
  const sx=hand.x, sy=hand.y-size*.25; const d=fxEl('disc','<b><i></i></b>'); d.style.cssText='left:'+(sx-size/2)+'px;top:'+(sy-size/2)+'px;width:'+size+'px;height:'+size+'px';
  await play(d,[{transform:'scale(0)'},{transform:'scale(1)'}],{duration:300*K(),fill:'forwards',easing:'ease-out'});
  Sfx.disc(); heroPose('punch'); const dx=t.x-sx, dy=t.y-sy;
  await play(d,[{transform:'translate(0,0) scale(1)'},{transform:'translate('+(dx*.5)+'px,'+(dy*.5-60)+'px) scale(1.1)'},{transform:'translate('+dx+'px,'+dy+'px) scale(1.25)'}],{duration:460*K(),fill:'forwards',easing:'ease-in'});
  hit(); Sfx.hit(); shake(9); FX.ring(t.x,t.y,'#bff3ff'); FX.burst(t.x,t.y,{n:26,speed:8,colors:['#fff','#7fe3ff','#c4f1ff'],size:7});
  play(d,[{transform:'translate('+dx+'px,'+dy+'px) scale(1.25)',opacity:1},{transform:'translate('+dx+'px,'+dy+'px) scale(2.2)',opacity:0}],{duration:260,fill:'forwards'}).then(()=>rm(d));
  await sleep(350*K()); heroPose('idle'); }
async function mvPunch(hit){ const h=relPos(heroWrap), m=relPos(monWrap); const dx=(m.l+m.w*.22)-(h.l+h.w*.98);
  heroPose('punch'); Sfx.whoosh(); speedLines();
  const a=play(heroWrap,[{transform:'translateX(0)'},{transform:'translateX('+dx+'px)',offset:.32},{transform:'translateX('+dx+'px)',offset:.6},{transform:'translateX(0)'}],{duration:950*K(),easing:'ease-in-out'});
  await sleep(320*K()); const t=relPos(mk('.mk-core',monWrap)); hit(); Sfx.bigHit(); shake(12); impactStar(t,'轟！');
  FX.burst(t.x,t.y,{n:28,speed:9,colors:['#fff','#ffe14d','#ff5b5b'],size:8,shape:'star'});
  await a; heroPose('idle'); }
function swirlSVG(){ return '<svg viewBox="0 0 100 100"><g fill="none" stroke-linecap="round"><path d="M50 50 m-8 0 a8 8 0 1 1 16 0 a16 16 0 1 1 -32 0 a26 26 0 1 1 52 0 a38 38 0 1 1 -76 0" stroke="#bff6ff" stroke-width="5" opacity=".9"/><path d="M50 50 m0 -12 a12 12 0 1 1 -12 12 a22 22 0 1 1 22 22 a34 34 0 1 1 -34 -34" stroke="#ffffff" stroke-width="3" opacity=".8"/><path d="M50 50 m14 0 a14 14 0 1 1 -14 -14 a28 28 0 1 1 28 28" stroke="#7fe3ff" stroke-width="4" opacity=".7"/></g></svg>'; }
async function mvWhirl(hit){ const h=relPos(heroWrap), m=relPos(monWrap); const dx=(m.l+m.w*.2)-(h.l+h.w*.95);
  heroPose('punch'); Sfx.whirl();
  const sz=h.h*1.0; const sw=fxEl('swirl',swirlSVG()); sw.style.cssText='left:'+(h.x-sz/2)+'px;top:'+(h.y-sz/2)+'px;width:'+sz+'px;height:'+sz+'px';
  const D=750*K();
  play(sw,[{transform:'translateX(0) scale(.3)',opacity:0},{transform:'translateX('+(dx*.3)+'px) scale(1)',opacity:1,offset:.25},{transform:'translateX('+dx+'px) scale(1.1)',opacity:1}],{duration:D,fill:'forwards',easing:'ease-in'});
  const spin=play(heroWrap,[{transform:'translateX(0)'},{transform:'translateX('+(dx*.2)+'px)'},{transform:'translateX('+(dx*.45)+'px)'},{transform:'translateX('+(dx*.7)+'px)'},{transform:'translateX('+dx+'px)'}],{duration:D,fill:'forwards',easing:'ease-in'});
  const iv=setInterval(()=>{ const q=relPos(heroWrap); FX.burst(q.x,q.y,{n:4,speed:4,colors:['#bff6ff','#fff'],gravity:0,life:20,size:4}); },60);
  await spin; clearInterval(iv); const t=relPos(mk('.mk-core',monWrap));
  hit(); Sfx.bigHit(); shake(13); impactStar(t,'呼呼！'); FX.spiral(t.x,t.y,{n:36,r:24,speed:7,colors:['#bff6ff','#fff','#7fe3ff'],size:7,life:45});
  play(sw,[{transform:'translateX('+dx+'px) scale(1.1)',opacity:1},{transform:'translateX('+dx+'px) scale(2)',opacity:0}],{duration:350,fill:'forwards'}).then(()=>rm(sw));
  setTimeout(()=>Sfx.hit(),120); setTimeout(()=>Sfx.hit(),240);
  await sleep(300*K());
  await play(heroWrap,[{transform:'translateX('+dx+'px)'},{transform:'translateX(0)'}],{duration:380*K(),easing:'ease-out'});
  heroWrap.getAnimations().forEach(a=>a.cancel()); heroPose('idle'); }
async function mvFlip(hit){ const h=relPos(heroWrap), m=relPos(monWrap); const dx=(m.l+m.w*.3)-(h.l+h.w*.9), H=h.h;
  heroPose('tuck'); Sfx.jump(); const D=1500*K();
  const a=play(heroWrap,[{transform:'translate(0,0) rotate(0deg)',offset:0},{transform:'translate(0px,'+(H*.06)+'px) rotate(0deg)',offset:.08},
    {transform:'translate('+(dx*.3)+'px,'+(-H*.42)+'px) rotate(190deg)',offset:.35},{transform:'translate('+(dx*.65)+'px,'+(-H*.32)+'px) rotate(360deg)',offset:.52},
    {transform:'translate('+dx+'px,'+(-H*.05)+'px) rotate(368deg)',offset:.64},{transform:'translate('+dx+'px,'+(-H*.05)+'px) rotate(368deg)',offset:.72},
    {transform:'translate(0,0) rotate(360deg)',offset:1}],{duration:D,easing:'ease-in-out'});
  const iv=setInterval(()=>{ const q=relPos(heroWrap); FX.burst(q.x,q.y,{n:3,speed:2,colors:['#ffe066','#fff','#ff7ad9'],gravity:0,life:30,size:7,shape:'star'}); },45);
  setTimeout(()=>Sfx.whoosh(),D*.2); setTimeout(()=>{ heroPose('kick'); },D*.5);
  await sleep(D*.64); clearInterval(iv); const t=relPos(mk('.mk-core',monWrap));
  hit(); Sfx.bigHit(); shake(15); impactStar(t,'砰！'); FX.burst(t.x,t.y,{n:34,speed:10,colors:['#fff','#ffd84d','#ff8a3d','#ff7ad9'],shape:'star',size:10});
  await a; heroWrap.getAnimations().forEach(x=>x.cancel()); heroPose('idle'); }
async function mvRainbow(hit){ const hs=heroSvgEl(); hs.classList.add('aura','rainbow'); Sfx.rainbow(); flash('#fff',.5);
  const bg=document.createElement('div'); bg.className='rainbowbg'; stageEl.insertBefore(bg, monWrap); play(bg,[{opacity:0},{opacity:1}],{duration:400,fill:'forwards'});
  const rise=play(heroWrap,[{transform:'translateY(0)'},{transform:'translateY(-14%)'}],{duration:500*K(),fill:'forwards',easing:'ease-out'});
  const hp=relPos(heroWrap); FX.spiral(hp.x,hp.y,{n:40,r:hp.h*.5,speed:-5,colors:RAINBOW,life:35,size:7,shape:'star'});
  await rise; heroPose('disc'); await sleep(200);
  const sp=relPos(mk('.mk-slug',heroWrap)); hs.classList.add('no-slug');
  const t=relPos(mk('.mk-core',monWrap)); const size=Math.max(60, heroWrap.clientHeight*.5);
  const bl=fxEl('rblade','<b><i></i></b>'); bl.style.cssText='left:'+(sp.x-size/2)+'px;top:'+(sp.y-size/2)+'px;width:'+size+'px;height:'+size+'px';
  await play(bl,[{transform:'scale(0)'},{transform:'scale(1.2)'},{transform:'scale(1)'}],{duration:350*K(),fill:'forwards'});
  heroPose('punch'); Sfx.disc();
  const R=Math.min(monWrap.clientWidth*.55, 140), kf=[{transform:'translate(0,0) scale(1)'}]; const N=16;
  for(let k=1;k<=N;k++){ const an=Math.PI+k/N*Math.PI*4; const rr=R*(1-k/(N*2.2)); kf.push({transform:'translate('+(t.x+Math.cos(an)*rr-sp.x)+'px,'+(t.y+Math.sin(an)*rr*.55-sp.y)+'px) scale(1.1)'}); }
  kf.push({transform:'translate('+(t.x-sp.x)+'px,'+(t.y-sp.y)+'px) scale(1.6)'});
  const D=1700*K(); const fl=play(bl,kf,{duration:D,fill:'forwards',easing:'ease-in-out'});
  const trail=setInterval(()=>{ const q=relPos(bl); FX.burst(q.x,q.y,{n:5,speed:2.5,colors:RAINBOW,gravity:0,life:34,size:7,shape:'star'}); },35);
  const angs=[-32,38,-78,8,58];
  angs.forEach((ag,i)=>setTimeout(()=>{ const len=Math.max(monWrap.clientWidth*1.3,160); const s=fxEl('slash'); s.style.left=(t.x-len/2)+'px'; s.style.top=(t.y-6)+'px'; s.style.width=len+'px';
    play(s,[{transform:'rotate('+ag+'deg) scaleX(0)',opacity:1},{transform:'rotate('+ag+'deg) scaleX(1.1)',opacity:1,offset:.35},{transform:'rotate('+ag+'deg) scaleX(1) scaleY(.2)',opacity:0}],{duration:420}).then(()=>rm(s));
    Sfx.shing(); shake(7); FX.burst(t.x,t.y,{n:14,speed:9,colors:RAINBOW,size:7,shape:'star'}); if(i===0) hit(); else { const ms=monSvgEl(); if(ms) play(ms,[{filter:'brightness(2.5)'},{filter:'brightness(1)'}],{duration:180}); } }, D*(.25+i*.14)));
  await fl; clearInterval(trail);
  Sfx.bigHit(); Sfx.explode(); flash('#fff',.85); shake(22);
  ['#ff4d4d','#ffb84d','#fff34d','#4dff88','#4dd2ff','#9d6bff'].forEach((c,i)=>setTimeout(()=>FX.ring(t.x,t.y,c,30+i*4),i*60));
  FX.burst(t.x,t.y,{n:90,speed:14,colors:RAINBOW,size:12,life:70,shape:'star',gravity:.06});
  await play(bl,[{transform:'translate('+(t.x-sp.x)+'px,'+(t.y-sp.y)+'px) scale(1.6)'},{transform:'translate(0,0) scale(.8)'}],{duration:450*K(),fill:'forwards',easing:'ease-in-out'});
  bl.remove(); hs.classList.remove('no-slug'); Sfx.coin();
  play(bg,[{opacity:1},{opacity:0}],{duration:400}).then(()=>rm(bg));
  await play(heroWrap,[{transform:'translateY(-14%)'},{transform:'translateY(0)'}],{duration:350*K(),easing:'ease-in'});
  heroWrap.getAnimations().forEach(a=>a.cancel()); hs.classList.remove('aura','rainbow'); heroPose('idle'); }

async function mvOmega(hit){
  const hs=heroSvgEl(); hs.classList.add('aura','combo-omega'); Sfx.rainbow();
  heroPose('omega'); const chest=relPos(mk('.mk-chest',heroWrap));
  FX.spiral(chest.x,chest.y,{n:50,r:30,speed:-8,colors:RAINBOW,life:50,size:9,shape:'star'});
  await sleep(280*K());
  const t=relPos(mk('.mk-core',monWrap));
  for(let i=0;i<5;i++){
    makeBeam({x:chest.x,y:chest.y},{x:t.x+rand(-20,20),y:t.y+rand(-24,24)}, 18+i*4, i%2?'super':'', 700);
    Sfx.beam(); shake(8+i); FX.burst(t.x,t.y,{n:16,speed:10,colors:RAINBOW,size:8,shape:'star'});
    if(i===2) hit();
    await sleep(120*K());
  }
  Sfx.explode(); flash('#ffe14d',.9); shake(24);
  FX.ring(t.x,t.y,'#fff',40); FX.ring(t.x,t.y,'#ff7ad9',52);
  FX.burst(t.x,t.y,{n:100,speed:16,colors:RAINBOW,size:14,life:80,shape:'star',gravity:.05});
  impactStar(t,'煌！！');
  await sleep(500*K());
  hs.classList.remove('aura','combo-omega'); heroPose('idle');
}

async function performMove(kind, hit){
  await playHenshinFanfare();
  const yell=MOVE_YELL[kind]||'！';
  const wrapped=()=>{ hit(); try{ const t=relPos(mk('.mk-core',monWrap)); if(t) floatText('yell', yell, t.x+rand(-12,12), t.t+t.h*.08); }catch(e){} };
  if(kind==='omega') await chargePose('omega', 380);
  else if(kind==='rainbow') await chargePose('disc', 300);
  else if(kind==='super') await chargePose('beam', 260);
  else if(kind==='flip') await chargePose('tuck', 200);
  else if(kind==='whirl') await chargePose('punch', 160);
  else if(kind==='beam') await chargePose('beam', 140);
  const name=MOVES[kind]; const dur=kind==='omega'?2600:kind==='rainbow'?2400:kind==='flip'?1700:1400;
  showMoveName(name, (kind==='super'||kind==='rainbow'||kind==='omega')?'super':'', dur);
  if(kind==='beam') return mvBeam(wrapped,false); if(kind==='super') return mvBeam(wrapped,true);
  if(kind==='kick') return mvKick(wrapped); if(kind==='disc') return mvDisc(wrapped); if(kind==='punch') return mvPunch(wrapped);
  if(kind==='whirl') return mvWhirl(wrapped); if(kind==='flip') return mvFlip(wrapped);
  if(kind==='omega') return mvOmega(wrapped); return mvRainbow(wrapped);
}
function chooseMove(first){
  if(B.forceMove){ const f=B.forceMove; B.forceMove=null; return f; }
  if(first && !isClockMode()){ if(B.combo>=6) return 'omega'; if(B.combo>=5) return 'rainbow'; if(B.combo>=3) return 'super'; }
  const pool = isClockMode() ? TIMED_MOVES : NORMAL_MOVES;
  if(!B.deck || !B.deck.length){ const d=shuffle(pool.slice()); if(d[0]===B.lastMove) d.push(d.shift()); B.deck=d; }
  const mv=B.deck.shift(); B.lastMove=mv; return mv; }

function damageMonster(dmg){ B.hp=Math.max(0,B.hp-dmg); $('#hpFill').style.width=(100*B.hp/B.maxHp)+'%';
  const ms=monSvgEl(); if(!ms) return; ms.classList.add('ouch'); setTimeout(()=>{ if(B.hp>0) ms.classList.remove('ouch'); }, 650);
  play(ms,[{transform:'translateX(0) rotate(0)',filter:'brightness(1)'},{transform:'translateX(8%) rotate(7deg)',filter:'brightness(2.6)'},{transform:'translateX(-3%) rotate(-2deg)',filter:'brightness(1)'},{transform:'translateX(4%) rotate(3deg)',filter:'brightness(2)'},{transform:'translateX(0) rotate(0)',filter:'brightness(1)'}],{duration:560});
  const t=relPos(monWrap); floatText('dmg','-'+dmg, t.x, t.t+t.h*.15); }
async function monsterAttack(){
  const s=MONS[B.type]; if(!s) return;
  Sfx.growl(); heroPose('guard'); setMonAttack(true); playElementHit(B.lastChoiceBtn);
  showMoveName((s.nick||s.name)+'！','banner',1200);
  const L=play(monWrap,[{transform:'translateX(0)'},{transform:'translateX(-10%) rotate(-4deg)',offset:.42},{transform:'translateX(0)'}],{duration:780*K()});
  await sleep(240*K());
  const chest=mk('.mk-chest', heroWrap);
  Sfx.bonk();
  if(chest){
    const t=relPos(chest);
    FX.burst(t.x,t.y,{n:16,colors:[s.shot,'#fff'],speed:6,size:7});
    const hs=heroSvgEl(); if(hs) play(hs,[{transform:'rotate(0)',filter:'brightness(1)'},{transform:'rotate(-8deg) translateX(-6px)',filter:'brightness(2)'},{transform:'rotate(0)',filter:'brightness(1)'}],{duration:520});
  }
  if(heroWrap){ const hp=relPos(heroWrap); floatText('ouchtxt', pick(['哎呀！','好痛呀！','唔緊要！']), hp.x, hp.t+hp.h*.05); }
  await L; await sleep(180*K());
  setMonAttack(false); heroPose('idle');
}

async function friendRest(){ const ms=monSvgEl(); ms.classList.remove('ouch'); const t=relPos(mk('.mk-core',monWrap)); Sfx.appear();
  FX.burst(t.x,t.y,{n:60,speed:9,shape:'star',colors:['#bff3ff','#fff','#ffe066','#9ad8ff'],size:11,life:80,gravity:.05}); FX.ring(t.x,t.y,'#bff3ff',36);
  showMoveName('特訓完成！','banner',1400);
  await play(monWrap,[{transform:'scale(1) translateY(0)',opacity:1,filter:'brightness(1)'},{transform:'scale(1.08) translateY(-4%)',opacity:1,filter:'brightness(1.8)',offset:.35},{transform:'scale(.18) translateY(60%)',opacity:0,filter:'brightness(3)'}],{duration:1100*K(),easing:'ease-in',fill:'forwards'});
  Sfx.star(2); await sleep(500*K()); }
async function cinematicFinalFinish(){
  const cine=$('#cinema'), battle=$('#battle'), ms=monSvgEl();
  B._cine=true;
  cine.innerHTML='<div class="cine-dim"></div><div class="cine-letter top"></div><div class="cine-letter bot"></div><div class="cine-cap">最終決戰・流星天墜粉碎！</div>';
  cine.classList.add('on'); cine.setAttribute('aria-hidden','false');
  if(battle) battle.classList.add('battle-cine');
  Sfx.charge(); flash('#fff',.55);
  await sleep(420);
  Sfx.noise(.9,{vol:.25,type:'lowpass',f:350});
  await play(ms,[{transform:'translate(0,0) scale(1)',filter:'brightness(1)'},{transform:'translate(-3%,1%) scale(1.02)',filter:'brightness(2.2)'},{transform:'translate(3%,-1%) scale(1)',filter:'brightness(1.2)'},{transform:'translate(-2%,0) scale(1.04)',filter:'brightness(2.8)'},{transform:'translate(0,0) scale(1.06)',filter:'brightness(3.2)'}],{duration:1700});
  Sfx.explode(); flash('#fff',.95); shake(28);
  const t=relPos(mk('.mk-core',monWrap));
  FX.burst(t.x,t.y,{n:110,speed:16,shape:'star',colors:['#ffe066','#fff','#ff6bd6','#6bf0ff','#fb923c'],size:15,life:95,gravity:.06});
  FX.ring(t.x,t.y,'#fff',40); FX.ring(t.x,t.y,'#ff7ad9',56); FX.ring(t.x,t.y,'#fb923c',72);
  play(monWrap,[{transform:'scale(1) rotate(0)',opacity:1},{transform:'scale(1.7) rotate(24deg)',opacity:0}],{duration:980,fill:'forwards'});
  showMoveName('奧米加・星煌終焉！','banner',2200);
  await sleep(2000);
  clearCinema();
}
async function monsterExplode(){
  if(MONS[B.type].friend){ await friendRest(); return; }
  if(B.type==='starlord' && (B.combo||0)>=6 && !isClockMode()){ await cinematicFinalFinish(); return; }
  const ms=monSvgEl(); ms.classList.add('ouch'); Sfx.noise(.8,{vol:.2,type:'lowpass',f:400});
  await play(ms,[{transform:'translate(0,0)',filter:'brightness(1)'},{transform:'translate(-4%,1%)',filter:'brightness(2.5)'},{transform:'translate(4%,-1%)',filter:'brightness(1)'},{transform:'translate(-4%,0)',filter:'brightness(2.5)'},{transform:'translate(4%,1%)',filter:'brightness(1)'},{transform:'translate(-3%,0)',filter:'brightness(3)'},{transform:'translate(0,0)',filter:'brightness(3)'}],{duration:800*K()});
  Sfx.explode(); flash('#fff',.85); shake(20); const t=relPos(mk('.mk-core',monWrap));
  FX.burst(t.x,t.y,{n:80,speed:14,shape:'star',colors:['#ffe066','#fff','#ff6bd6','#6bf0ff','#9dff6b'],size:13,life:75,gravity:.08});
  FX.ring(t.x,t.y,'#fff',32); FX.ring(t.x,t.y,'#ffe066',44);
  play(monWrap,[{transform:'scale(1) rotate(0)',opacity:1},{transform:'scale(1.45) rotate(18deg)',opacity:0}],{duration:520*K(),fill:'forwards'});
  showMoveName(isClockMode()?'打低咗！':'打敗咗！','banner',1300);
  await sleep(1000*K());
}

async function monsterEnter(){ monWrap.getAnimations().forEach(a=>a.cancel()); Sfx.appear();
  const m=MONS[B.type];
  const boss=!!(B.bossRun || m.boss);
  const label=(m.final && boss)?'最終大頭目・'+m.name+'出現！':boss?'頭目・'+(m.short||m.name)+'出現！':(m.name+'出現！');
  showMoveName(label,'banner',1500);
  await play(monWrap,[{transform:'translateX(130%)',opacity:0},{transform:'translateX(-6%)',opacity:1,offset:.7},{transform:'translateX(0)',opacity:1}],{duration:950*K(),easing:'ease-out'});
  shake(5); Sfx.hit(); }

function renderRoundHud(){
  if(isOpsMode()){
    const title=OPS_NAME[B.mode]||'打怪獸';
    const boss=!!(B.bossRun || (MONS[B.type]&&MONS[B.type].boss));
    $('#roundLbl').innerHTML='<div class="heroname">'+title+'</div>'+(boss?'頭目戰':'一場打完');
    $('#roundDots').innerHTML='<span>答啱 <b id="scoreLbl">'+(B.solved||0)+'</b> / '+(B.goal||15)+'</span>';
    return;
  }
  if(isClockMode()){
    const label=B.mode==='combo'?'連擊挑戰':'限時生存';
    const sec=Math.max(0, Math.ceil(B.timeLeft||0));
    $('#roundLbl').innerHTML='<div class="heroname">'+label+'</div><span class="timerbox" id="timerBox"><b id="timerNum">'+sec+'</b>秒</span>';
    $('#roundDots').innerHTML = B.mode==='combo'
      ? '<span>連擊 <b id="scoreLbl">'+(B.combo||0)+'</b> / 6</span>'
      : '<span>答啱：<b id="scoreLbl">'+(B.score||0)+'</b> 題</span>';
    return;
  }
  if(B.mode==='divide'){
    const star='★'.repeat(B.star||1);
    $('#roundLbl').innerHTML = '<div class="heroname">除法戰鬥 '+star+'</div>'+(MONS[B.type].final ? '最終關：'+MONS[B.type].name+'！' : '第 '+(B.round+1)+' 關');
    $('#roundDots').innerHTML = B.order.map((t,i)=>'<i class="'+(i<B.round?'done ':'')+(MONS[t].final?'dada ':'')+(i===B.round?'cur':'')+'"></i>').join('');
    return;
  }
  $('#roundLbl').innerHTML = '<div class="heroname">超人奧米加</div>'+(MONS[B.type].final ? '最終關：'+MONS[B.type].name+'！' : MONS[B.type].boss ? '第 '+(B.round+1)+' 關：'+(MONS[B.type].short||'頭目')+'！' : '第 '+(B.round+1)+' 關');
  $('#roundDots').innerHTML = B.order.map((t,i)=>'<i class="'+(i<B.round?'done ':'')+(MONS[t].boss&&!MONS[t].final?'boss ':'')+(MONS[t].final?'dada ':'')+(i===B.round?'cur':'')+'"></i>').join(''); }
function renderCombo(){ const c=$('#combo'); syncChestLight(); syncHenshin();
  if(B.mode==='combo'){ const scoreEl=$('#scoreLbl'); if(scoreEl) scoreEl.textContent=B.combo||0; }
  if(B.combo>=2){ c.textContent=B.combo+' 連擊'; c.classList.toggle('omega', B.combo>=6); c.classList.add('show'); play(c,[{transform:'scale(1.35)'},{transform:'scale(1)'}],{duration:300,easing:'ease-out'}); }
  else { c.classList.remove('show','omega'); } }

const DIV_WEAK=['holyturt','ninjacat','galmoth','nightmare','sandwyrm','manflower'];
const DIV_MID=['flamecrab','thundwolf','icetiran','lavaover','phoenix','illusdemon','manflower'];
const DIV_STRONG=['deathscorp','seaking','steeltiran','mtngod','phoenix','lavaover'];
function divisionDivisors(star){ if(star>=3) return [6,7,8,9]; if(star===2) return [2,3,4,5,10]; return [2,5,10]; }
function divisionOrder(star){
  if(star>=3) return shuffle(DIV_STRONG.slice()).slice(0,3).concat(['heidragon','starlord']);
  if(star===2) return shuffle(DIV_MID.slice()).slice(0,5);
  return shuffle(DIV_WEAK.slice()).slice(0,5);
}
function pickDivision(divisors, qMax, recent){
  const items=[]; let total=0;
  divisors.forEach(function(d){ for(let q=1;q<=qMax;q++){ const k='div:'+d+'x'+q; const f=DATA.facts[k];
    let w=f?1+(f.p||0)*1.5:1.2; if(f&&f.s>=3) w*=.5; if(recent.indexOf(k)>=0) w*=.02;
    items.push([d,q,w,k]); total+=w; } });
  let r=Math.random()*total;
  for(const it of items){ r-=it[2]; if(r<=0) return {d:it[0],q:it[1],dividend:it[0]*it[1],key:it[3]}; }
  const it=items[items.length-1]; return {d:it[0],q:it[1],dividend:it[0]*it[1],key:it[3]};
}
function makeDivChoices(quot){
  const set=[quot];
  const cands=shuffle([quot+1,quot-1,quot+2,quot-2,quot+3,quot-3,quot+4,quot-4]);
  for(const v of cands){ if(set.length>=4) break; if(v>=1 && set.indexOf(v)<0) set.push(v); }
  let guard=0;
  while(set.length<4 && guard++<40){ const v=randi(1, Math.max(12, quot+3)); if(v>=1 && set.indexOf(v)<0) set.push(v); }
  return shuffle(set);
}
function qOpText(){ return (B.mode==='divide' || B.mode==='div') ? '÷' : '×'; }
const OP_WORD={'+':'加','−':'減','-':'減','×':'乘','÷':'除以'};
/* 加法減法用日常讀法（十四），九因歌先用「一十四」。 */
function cnSpeak(n){
  n=n|0; if(n<0) n=0;
  if(n<10) return DIG[n]; if(n===100) return '一百';
  if(n>100) return cnNum(n);
  const ten=Math.floor(n/10), u=n%10;
  if(ten===1) return '十'+(u?DIG[u]:'');
  return DIG[ten]+'十'+(u?DIG[u]:'');
}
function factLine(q){
  if(q.op2!=null && q.c!=null) return q.a+' '+(q.op||'×')+' '+q.b+' '+q.op2+' '+q.c+' = '+q.ans;
  const op=q.op || qOpText();
  if(op==='×') return q.a+' × '+q.b+' = '+q.ans+(q.a<=10 && q.b<=9 ? '　'+chant(q.a, q.b) : '');
  if(op==='÷') return q.a+' ÷ '+q.b+' = '+q.ans+(q.b<=10 && q.ans<=9 ? '　'+chant(q.b, q.ans) : '');
  return q.a+' '+op+' '+q.b+' = '+q.ans;
}
function factSpeak(q){
  if(q.op2!=null && q.c!=null){
    return cnSpeak(q.a)+(OP_WORD[q.op]||'乘')+cnSpeak(q.b)+(OP_WORD[q.op2]||'')+cnSpeak(q.c)+'等於'+cnSpeak(q.ans);
  }
  const op=q.op || qOpText();
  if(op==='×' && q.a<=9 && q.b<=9) return chant(q.a, q.b);
  if(op==='×') return cnSpeak(q.a)+'乘'+cnSpeak(q.b)+'等於'+cnSpeak(q.ans);
  if(op==='÷') return cnSpeak(q.a)+'除以'+cnSpeak(q.b)+'等於'+cnSpeak(q.ans);
  return cnSpeak(q.a)+(OP_WORD[op]||'')+cnSpeak(q.b)+'等於'+cnSpeak(q.ans);
}
function factorPair(prod){
  const pairs=[];
  for(let a=2;a<=10;a++){
    if(prod%a===0){ const b=prod/a; if(b>=1 && b<=10 && b=== (b|0)) pairs.push([a,b]); }
  }
  return pairs.length ? pick(pairs) : null;
}
function pickMixed(star){
  for(let guard=0; guard<80; guard++){
    if(star<=1){
      const a=randi(2,5), b=randi(2,5), c=randi(1,6);
      const ans=a*b+c;
      if(ans>=1 && ans<=20) return {a:a,b:b,c:c,op2:'+',ans:ans};
    } else if(star===2){
      const a=randi(2,6), b=randi(2,6), prod=a*b, minus=Math.random()<0.5;
      if(minus){
        if(prod<2) continue;
        const c=randi(1, Math.min(9, prod-1));
        const ans=prod-c;
        if(ans>=1 && ans<=30) return {a:a,b:b,c:c,op2:'−',ans:ans};
      } else {
        const c=randi(1,9), ans=prod+c;
        if(ans>=1 && ans<=30) return {a:a,b:b,c:c,op2:'+',ans:ans};
      }
    } else {
      const kind=pick(['+','−','×','÷','+','÷']);
      if(kind==='÷'){
        const c=pick([2,3,4,5,6,8,9,10]);
        const quot=randi(1,12);
        const prod=quot*c;
        if(prod>50) continue;
        const pair=factorPair(prod);
        if(!pair) continue;
        return {a:pair[0],b:pair[1],c:c,op2:'÷',ans:quot};
      }
      if(kind==='×'){
        const a=randi(2,5), b=randi(2,5), c=randi(2,4);
        const ans=a*b*c;
        if(ans>=1 && ans<=50) return {a:a,b:b,c:c,op2:'×',ans:ans};
      } else if(kind==='−'){
        const a=randi(2,9), b=randi(2,6), prod=a*b;
        if(prod<2 || prod>50) continue;
        const c=randi(1, Math.min(9, prod-1));
        return {a:a,b:b,c:c,op2:'−',ans:prod-c};
      } else {
        const a=randi(2,8), b=randi(2,6), c=randi(1,9);
        const ans=a*b+c;
        if(ans>=1 && ans<=50) return {a:a,b:b,c:c,op2:'+',ans:ans};
      }
    }
  }
  return {a:2,b:3,c:4,op2:'+',ans:10};
}
function makeMixedChoices(q){
  const ans=q.ans, prod=q.a*q.b;
  const set=[ans];
  const cands=[ans+1,ans-1,ans+2,ans-2,prod,ans+3,ans-3,q.a+q.b+q.c];
  if(q.op2==='+') cands.push(prod-q.c, q.a*q.b*q.c);
  if(q.op2==='−') cands.push(prod+q.c);
  if(q.op2==='×') cands.push(prod+q.c, prod*q.c+1);
  if(q.op2==='÷') cands.push(prod, ans+q.c, q.a+q.b);
  shuffle(cands).forEach(function(v){
    if(set.length>=4) return;
    if(v>=0 && v===(v|0) && set.indexOf(v)<0) set.push(v);
  });
  let guard=0;
  while(set.length<4 && guard++<40){
    const v=Math.max(0, ans+randi(-6,6));
    if(set.indexOf(v)<0) set.push(v);
  }
  return shuffle(set);
}
function showExpr(q){
  const op2=$('#qOp2'), c=$('#qC');
  $('#qA').textContent=q.a;
  const op=$('#qOp'); if(op) op.textContent=q.op||qOpText();
  $('#qB').textContent=q.b;
  if(q.op2!=null && q.c!=null){
    if(op2){ op2.hidden=false; op2.textContent=q.op2; }
    if(c){ c.hidden=false; c.textContent=q.c; }
  } else {
    if(op2) op2.hidden=true;
    if(c) c.hidden=true;
  }
}
const OPS_NAME={add:'加法大進擊',sub:'減法暗影戰',mixas:'加減雙刃斬',mul:'乘法火焰爆',div:'除法冰封關',mixmd:'乘除雷電擊',all:'四則終極戰'};
const OPS_MODES=['add','sub','mixas','mul','div','mixmd','all'];
/* Existing rarer monsters only. No new art. */
const BOSS_CAST=['steeltiran','illusdemon','heidragon','starlord'];
function isOpsMode(mode){ return OPS_MODES.indexOf(mode||B.mode)>=0; }
function opsGoal(isBoss, extra){ return isBoss ? 15+(extra==null?randi(5,8):extra) : 15; }
function rollOpsEncounter(){
  const boss=Math.random()<0.10;
  if(!boss) return {type:pickFresh(NORMALS), boss:false};
  return {type:pick(BOSS_CAST), boss:true};
}
function pickAdd(recent){
  recent=recent||[];
  for(let i=0;i<50;i++){
    let a,b;
    if(Math.random()<0.22){
      a=randi(8,30); b=randi(4,24);
      if(a+b>50) b=50-a;
      if(a+b<21 && a<28) b=Math.min(24, b+6);
    } else {
      a=randi(1,12);
      b=randi(1, Math.max(1, Math.min(12, 18-a)));
    }
    if(a<0||b<0) continue;
    const ans=a+b;
    if(ans<1||ans>50) continue;
    const key='add:'+a+'+'+b;
    if(recent.indexOf(key)>=0) continue;
    return {a:a,b:b,ans:ans,op:'+',key:key};
  }
  return {a:3,b:4,ans:7,op:'+',key:'add:3+4'};
}
function pickSub(recent){
  recent=recent||[];
  for(let i=0;i<50;i++){
    let a,b;
    if(Math.random()<0.22){ a=randi(16,50); b=randi(1, a-1); }
    else { a=randi(3,20); b=randi(1, a-1); }
    const ans=a-b;
    if(ans<0) continue;
    const key='sub:'+a+'-'+b;
    if(recent.indexOf(key)>=0) continue;
    return {a:a,b:b,ans:ans,op:'−',key:key};
  }
  return {a:8,b:3,ans:5,op:'−',key:'sub:8-3'};
}
function pickMulQ(recent){
  const tables=(B.tables&&B.tables.length)?B.tables:[2,3,4,5];
  const keys=(recent||[]).filter(function(k){ return /^\d+x\d+$/.test(k); });
  const p=pickFact(tables, keys);
  return {a:p.a,b:p.b,ans:p.a*p.b,op:'×',key:p.a+'x'+p.b};
}
function pickDivQ(recent){
  const divs=(B.divisors&&B.divisors.length)?B.divisors:[2,3,4,5,10];
  const keys=(recent||[]).filter(function(k){ return k.indexOf('div:')===0; });
  const d=pickDivision(divs, B.qMax||9, keys);
  return {a:d.dividend,b:d.d,ans:d.q,op:'÷',key:d.key,divisor:d.d};
}
function pickTwoStep(){
  const m=pickMixed(Math.random()<0.7?1:2);
  return {a:m.a,b:m.b,c:m.c,op:'×',op2:m.op2,ans:m.ans,key:'mix:'+m.a+'x'+m.b+m.op2+m.c};
}
function pickOpsQuestion(mode, recent){
  if(mode==='add') return pickAdd(recent);
  if(mode==='sub') return pickSub(recent);
  if(mode==='mixas') return Math.random()<0.5 ? pickAdd(recent) : pickSub(recent);
  if(mode==='mul') return pickMulQ(recent);
  if(mode==='div') return pickDivQ(recent);
  if(mode==='mixmd') return Math.random()<0.5 ? pickMulQ(recent) : pickDivQ(recent);
  const r=Math.random();
  if(r<0.28) return pickAdd(recent);
  if(r<0.50) return pickSub(recent);
  if(r<0.70) return pickMulQ(recent);
  if(r<0.86) return pickDivQ(recent);
  return pickTwoStep();
}
function makeSumChoices(ans){
  const set=[ans];
  shuffle([ans+1,ans-1,ans+2,ans-2,ans+3,ans-3,ans+10,ans-10,ans+5,ans-5]).forEach(function(v){
    if(set.length>=4) return;
    if(v>=0 && v===(v|0) && set.indexOf(v)<0) set.push(v);
  });
  let guard=0;
  while(set.length<4 && guard++<40){
    const v=Math.max(0, ans+randi(-8,8));
    if(set.indexOf(v)<0) set.push(v);
  }
  return shuffle(set);
}
function choicesFor(q){
  if(q.op2!=null && q.c!=null) return makeMixedChoices(q);
  if(q.op==='÷') return makeDivChoices(q.ans);
  if(q.op==='×') return makeChoices(q.a, q.b);
  return makeSumChoices(q.ans);
}
function startOps(kind, opt){
  if(OPS_MODES.indexOf(kind)<0) return;
  opt=opt||{};
  endBattle(); B.token++;
  const enc=rollOpsEncounter();
  B.mode=kind; B.star=0; B.qMax=9;
  B.tables = opt.tables ? opt.tables.slice() : (kind==='mul' ? [2,3,4,5,6,7,8,9] : (kind==='mixmd'||kind==='all' ? [2,3,4,5] : []));
  B.divisors = kind==='div' ? [2,3,4,5,10] : (kind==='mixmd' ? [2,3,4,5,10] : (kind==='all' ? [2,3,4,5] : []));
  if(kind==='div'||kind==='mixmd'||kind==='all') B.qMax=9;
  B.choice=true;
  B.bossRun=enc.boss;
  B.goal=opsGoal(enc.boss);
  B.solved=0;
  B.combo=0; B.maxCombo=0; B.maxHen=1; B.recent=[]; B.lastMove=null; B.busy=true; B.input=''; B._timeUp=false; B._ended=false; B._hen=1; B._henLabel=null;
  const battle=$('#battle');
  if(battle){
    battle.classList.toggle('mode-choice', true);
    battle.classList.toggle('mode-divide', kind==='div'||kind==='mixmd');
    battle.classList.toggle('mode-mixed', kind==='all');
  }
  hideResult(); FX.clear(); if(fxLayer) fxLayer.innerHTML='';
  ensureHero(); preloadForm(1); preloadForm(2);
  if(heroWrap) heroWrap.getAnimations().forEach(a=>a.cancel());
  show('battle');
  B.order=[enc.type]; B.round=0;
  startRound(enc.type);
}
function startSession(mode, tables, opt){
  endBattle(); B.token++;
  opt=opt||{};
  if(mode==='timed') mode='survive';
  B.mode=mode; B.star=opt.star||0; B.qMax = B.star>=3 ? 12 : 9;
  B.bossRun=false; B.goal=0; B.solved=0;
  B.tables=(tables||[]).slice().sort((a,b)=>a-b);
  B.choice = (mode==='divide' || mode==='mixed' || isClockMode()) ? true : !!DATA.settings.choice;
  B.combo=0; B.maxCombo=0; B.maxHen=1; B.recent=[]; B.lastMove=null; B.busy=true; B.input=''; B._timeUp=false; B._ended=false;
  $('#battle').classList.toggle('mode-choice', B.choice);
  $('#battle').classList.toggle('mode-divide', mode==='divide');
  $('#battle').classList.toggle('mode-mixed', mode==='mixed');
  hideResult(); FX.clear(); fxLayer.innerHTML='';
  ensureHero(); preloadForm(1); preloadForm(2);
  heroWrap.getAnimations().forEach(a=>a.cancel());
  show('battle');
  if(isClockMode()){
    const secs=mode==='combo'?90:60;
    B.timeLeft=secs; B.score=0; B.tq=0; B.monIdx=0;
    B.timedOrder=shuffle(NORMALS.concat(MID_BOSSES)); B.order=[];
    startRound(B.timedOrder[0]); startTimer(secs);
  }
  else if(mode==='divide'){ B.order=divisionOrder(B.star||1); B.round=0; if(!B.tables.length) B.tables=divisionDivisors(B.star||1); startRound(B.order[0]); }
  else if(mode==='mixed'){ B.order=divisionOrder(B.star||1); B.round=0; startRound(B.order[0]); }
  else { const x=pickFresh(NORMALS); const y=pickFresh(NORMALS,[x]); const z=pickFresh(NORMALS,[x,y]); B.order=shuffle([x,y,z]).concat([pickFresh(MID_BOSSES),'starlord']); B.round=0; startRound(B.order[0]); }
}
async function startRound(type){
  const tk=B.token; B.type=type; const m=MONS[type];
  B.maxHp = isOpsMode() ? (B.goal||15) : (isClockMode() ? 40 : (m.final?150:m.boss?120:100)); B.hp=B.maxHp; B.gotCoins=0;
  if(!isClockMode()){ B.rq=0; B.rfirst=0; B.rwrong=0; B.rtables={}; B.rMaxCombo=0; B.combo=0; B._hen=1; B._henLabel=null; }
  else B.rwrong=0;
  monCounter++; $('#monBob').innerHTML = monRasterHTML(type); bindMonImg($('#monBob .mon-img')); setMonAttack(false);
  $('#monName').textContent = m.name+'・'+m.nick; $('#hpFill').style.width='100%';
  setChestTimer(0); syncHenshin(); heroPose('idle'); applyDisrupt(); renderRoundHud(); renderCombo(); layoutStage();
  B.busy=true; B.q=null; renderQuestionBlank();
  await monsterEnter(); if(tk!==B.token) return;
  B.busy=false; nextQuestion(); }
function renderQuestionBlank(){
  showExpr({a:'?',b:'?'});
  const a=$('#qAns'); a.textContent='?'; a.className='ansbox empty';
  const idle = isClockMode()?'準備…':isOpsMode()?(OPS_NAME[B.mode]+'！'):B.mode==='divide'?'除得盡先出招！':B.mode==='mixed'?'由左到右計！':'怪獸嚟緊！準備出招！';
  setHint('idle', idle); $('#choices').innerHTML='';
}
function nextQuestion(){
  let f;
  if(isOpsMode()){
    f=pickOpsQuestion(B.mode, B.recent);
  } else if(B.mode==='divide'){
    const divs=B.tables.length?B.tables:divisionDivisors(B.star||1);
    const d=pickDivision(divs, B.qMax||9, B.recent);
    f={a:d.dividend,b:d.d,ans:d.q,op:'÷',key:d.key,divisor:d.d};
  } else if(B.mode==='mixed'){
    const m=pickMixed(B.star||1);
    f={a:m.a,b:m.b,c:m.c,op:'×',op2:m.op2,ans:m.ans,key:'mix:'+m.a+'x'+m.b+m.op2+m.c,divisor:m.a};
  } else {
    const p=pickFact(B.tables, B.recent);
    f={a:p.a,b:p.b,ans:p.a*p.b,op:'×',key:p.a+'x'+p.b,divisor:p.a};
  }
  B.q={a:f.a,b:f.b,c:f.c,op:f.op,op2:f.op2,ans:f.ans,key:f.key,tries:0,divisor:f.divisor};
  B.recent.push(B.q.key); if(B.recent.length>6) B.recent.shift();
  B.input=''; showExpr(B.q); renderAns();
  if(B.choice){
    const opts=(B.mode==='divide')?makeDivChoices(f.ans):(B.mode==='mixed')?makeMixedChoices(B.q):choicesFor(B.q);
    $('#choices').innerHTML = opts.map(v=>'<button class="choice" data-v="'+v+'"><span class="chnum">'+v+'</span></button>').join('');
    $$('#choices .choice').forEach(b=>b.addEventListener('click',()=>{ if(B.busy||b.classList.contains('x')) return; B.input=b.dataset.v; B.lastChoiceBtn=b; renderAns(); submit(); })); }
  const hint = (B.q&&B.q.op2!=null) ? '由左邊計到右邊！' : (B.mode==='divide'||B.mode==='div') ? '揀啱個商就出招！' : B.mode==='mixed' ? '由左邊計到右邊！' : B.choice ? '揀啱個答案就出招！' : '打答案，再撳「出招」！';
  setHint('idle', hint);
  play($('.qrow'),[{transform:'scale(.6)',opacity:0},{transform:'scale(1.08)',opacity:1,offset:.7},{transform:'scale(1)'}],{duration:320,easing:'ease-out'}); }
function renderAns(state){ const a=$('#qAns'); a.textContent = B.input || '?'; a.className='ansbox'+(B.input?'':' empty')+(state?' '+state:''); }
function setHint(kind, l1, l2){ const h=$('#hint'); h.className='hint '+kind; h.innerHTML='<div>'+l1+'</div>'+(l2?'<div class="c">'+l2+'</div>':''); }
function keyIn(k){ if(current!=='battle'||B.busy||!B.q||$('#result').classList.contains('show')) return;
  if(k==='del'){ B.input=B.input.slice(0,-1); Sfx.click(); renderAns(); return; }
  if(k==='ok'){ if(!B.input){ play($('#qAns'),[{transform:'scale(1)'},{transform:'scale(1.15)'},{transform:'scale(1)'}],{duration:250}); return; } submit(); return; }
  if(B.input.length>=3) return; if(B.input==='0') B.input=''; B.input+=k; Sfx.click(); renderAns(); }
async function submit(){
  if(B.busy||!B.q||B.input==='') return; const q=B.q, n=parseInt(B.input,10), tk=B.token; const first=q.tries===0;
  B.busy=true;
  if(first && !isClockMode()){
    B.rq++;
    if(B.mode==='battle'||B.mode==='mul'){ B.rtables[q.a]=(B.rtables[q.a]||0)+1; }
    else if(B.mode==='divide'||B.mode==='div'){ const tableKey=(q.divisor||q.b); B.rtables[tableKey]=(B.rtables[tableKey]||0)+1; }
  }
  if(n===q.ans){
    Sfx.correct(); renderAns('good');
    if(first){
      if(B.mode!=='mixed') recordFact(q.key,true);
      B.combo++;
      if(!isClockMode()){ B.rfirst++; B.rMaxCombo=Math.max(B.rMaxCombo,B.combo); }
      B.maxCombo=Math.max(B.maxCombo,B.combo);
      if(B.combo>DATA.stats.maxCombo){ DATA.stats.maxCombo=B.combo; save(); }
    }
    if(isOpsMode()){ B.solved=(B.solved||0)+1; renderRoundHud(); }
    if(isClockMode() && B.mode!=='combo') B.score++;
    const scoreEl=$('#scoreLbl');
    if(scoreEl) scoreEl.textContent = B.mode==='combo' ? B.combo : (B.score||0);
    setHint('good', pick(['答啱喇！','好叻呀！','勁呀！','冇錯！','正！']), factLine(q));
    if(B.choice && B.lastChoiceBtn) B.lastChoiceBtn.classList.add('right');
    renderCombo();
    let dmg = first ? (B.combo>=6?28:B.combo>=5?20:B.combo>=3?15:10) : 6; if(isClockMode()) dmg=10; if(isOpsMode()) dmg=1;
    const kind=chooseMove(first);
    await performMove(kind, ()=>damageMonster(dmg)); if(tk!==B.token) return;
    if(B.hp<=0){
      if(B.mode==='survive'){ addTime(CLEAR_BONUS); flashTimer('+'+CLEAR_BONUS+'秒','up'); }
      await monsterExplode(); if(tk!==B.token) return;
      if(isClockMode()){
        if(B._timeUp || B.timeLeft<=0){ timedEnd(); return; }
        dexAdd(B.type); B.monIdx++; startRound(B.timedOrder[B.monIdx%B.timedOrder.length]); return;
      }
      roundWon(); return;
    }
    B.busy=false; nextQuestion();
  } else {
    Sfx.wrong(); renderAns('bad'); if(first && B.mode!=='mixed') recordFact(q.key,false); q.tries++; B.rwrong=(B.rwrong||0)+1;
    const brokeCombo=B.combo>0; B.combo=0; renderCombo();
    if(B.mode==='combo'){ const scoreEl=$('#scoreLbl'); if(scoreEl) scoreEl.textContent='0'; }
    if(B.mode==='survive'){ addTime(-WRONG_PENALTY); flashTimer('−'+WRONG_PENALTY+'秒','down'); }
    if(B.choice && B.lastChoiceBtn) B.lastChoiceBtn.classList.add('x');
    setHint('bad','唔啱呀…怪獸反擊！');
    if(brokeCombo){ await showMoveName('連擊斷咗！','break', 680); if(tk!==B.token) return; }
    await monsterAttack(); if(tk!==B.token) return;
    setChestTimer(B.rwrong);
    const spoken=factSpeak(q);
    setHint('bad', isClockMode() ? '唔緊要！記住：' : '唔緊要！記住，再試下！', factLine(q));
    if(DATA.settings.autoSpeak && !DATA.settings.muted) Speech.speak(spoken);
    if(isClockMode()){
      await sleep(900); if(tk!==B.token) return;
      if(B._timeUp || B.timeLeft<=0){ timedEnd(); return; }
      B.busy=false; nextQuestion(); return;
    }
    if(isOpsMode()){
      /* Wrong answer does not end the stage. Counter-attack already played. */
      await sleep(900); if(tk!==B.token) return;
      B.busy=false; nextQuestion(); return;
    }
    B.input=''; renderAns(); B.busy=false;
  }
}
function roundWon(){
  const acc = B.rq ? B.rfirst/B.rq : 1; const stars = acc>=.9?3:acc>=.7?2:1; const m=MONS[B.type];
  const boss=!!(m.final && (B.bossRun || !isOpsMode()));
  DATA.stats.monsters++; const newDex=dexAdd(B.type); if(m.boss || B.bossRun) DATA.stats.bosses++; if(boss) DATA.stats.dada=(DATA.stats.dada||0)+1;
  const asked=Object.keys(B.rtables).map(Number); const upgraded=[];
  asked.forEach(t=>{ const n=B.rtables[t]||0; if(n<3) return; let tier=stars; if(n<5) tier=Math.min(tier,1); else if(n<8) tier=Math.min(tier,2);
    const prev=DATA.badges[t]||0; if(tier>prev){ DATA.badges[t]=tier; upgraded.push(t); } });
  save();
  heroPose('win'); Sfx.victory(); $('#combo').classList.remove('show'); confetti();
  const msg = stars===3 ? (isOpsMode()?'超勁！'+OPS_NAME[B.mode]+'打贏咗！':'超勁！你係乘數表英雄！') : stars===2 ? '好叻呀！繼續加油！' : '做得好！多啲練習會更叻！';
  const next = B.round < B.order.length-1 ? B.order[B.round+1] : null;
  let medalBlock='';
  const practiceWord = (B.mode==='divide'||B.mode==='div') ? '除法' : '乘數表';
  if(B.mode==='add'||B.mode==='sub'||B.mode==='mixas'||B.mode==='mixmd'||B.mode==='all'){
    medalBlock='<div class="rstat">'+(B.bossRun?'頭目加長戰，':'')+'答啱 <b>'+(B.goal||B.rfirst)+'</b> 題就打低咗！</div>';
  } else if(B.mode==='mixed'){
    medalBlock='<div class="rstat">兩步算式，由左到右計，暫時冇括號。</div>';
  } else if(B.tables.length===1){
    const t=B.tables[0], n=B.rtables[t]||0, tier=DATA.badges[t]||0;
    if(n>=3 && tier){ const tn=['','銅','銀','金'][tier]; medalBlock='<div class="rmedal">'+medalSVG(t,tier)+'<div class="mt">'+t+' '+practiceWord+'<br>'+tn+'勳章！</div></div>'; }
    else medalBlock='<div class="rstat">再答多幾題 '+t+' '+practiceWord+'，就可以攞勳章啦！</div>';
  } else if(upgraded.length){
    medalBlock='<div class="rstat">勳章升級：'+upgraded.map(t=>t+' '+practiceWord+['','銅','銀','金'][DATA.badges[t]]).join('、')+'</div>';
  } else {
    medalBlock='<div class="rstat">'+(B.mode==='divide'?'每個除數答夠幾題先攞勳章！':'混合練習要每個乘數表答夠幾題先攞勳章！')+'</div>';
  }
  const winSt=henshinStage();
  const html = '<img class="rhero" src="'+heroSrc(winSt,'win')+'" alt="">'+
    '<h3>'+(boss?'打敗咗'+m.name+'！':'打敗咗'+m.name+'！')+'</h3>'+(newDex?'<div class="rdex">怪獸圖鑑新收錄：'+m.name+'！</div>':'')+
    '<div class="rstars">'+[0,1,2].map(i=>starSVG(i<stars)).join('')+'</div>'+
    medalBlock+
    '<div class="rstat">第一次就答啱：<b>'+B.rfirst+' / '+B.rq+'</b> 題</div>'+
    '<div class="rstat">最高連擊：<b>'+B.rMaxCombo+'</b></div>'+(B.gotCoins?'<div class="rstat">食錢怪吐出：<b style="color:#ffe14d">'+B.gotCoins+' 個金幣！</b></div>':'')+
    '<div class="rmsg">'+(boss?'超人奧米加大勝利！你係乘數表英雄！':msg)+'</div>'+
    '<div class="rbtns">'+(next?'<button class="btn" id="rNext">'+icon('bolt')+(MONS[next].final?'最終關：挑戰'+MONS[next].name+'！':MONS[next].boss?'下一關：'+(MONS[next].short||MONS[next].name)+'出現！':'下一關')+'</button>':'<button class="btn" id="rAgain">'+icon('bolt')+'再玩一次</button>')+
    (isOpsMode()?'':'<button class="btn blue small" id="rPick">'+(B.mode==='divide'||B.mode==='mixed'?'揀過星級':'揀過乘數表')+'</button>')+'<button class="btn gray small" id="rHome">返主頁</button></div>';
  showResult(html, stars);
  const rn=$('#rNext'); if(rn) rn.addEventListener('click',()=>{ Sfx.click(); hideResult(); B.round++; startRound(B.order[B.round]); });
  const ra=$('#rAgain'); if(ra) ra.addEventListener('click',()=>{ Sfx.click(); if(isOpsMode()) startOps(B.mode, B.mode==='mul'?{tables:B.tables}:undefined); else if(B.mode==='divide') startSession('divide', B.tables, {star:B.star}); else if(B.mode==='mixed') startSession('mixed', [], {star:B.star}); else startSession('battle', B.tables); });
  const rp=$('#rPick'); if(rp) rp.addEventListener('click',()=>{ Sfx.click(); endBattle(); if(B.mode==='divide') show('divide'); else if(B.mode==='mixed') show('mixed'); else openSetup('battle'); });
  $('#rHome').addEventListener('click',()=>{ Sfx.click(); goHome(); });
}
function showResult(html, stars){ const o=$('#result'); $('#resultCard').innerHTML=html; o.classList.toggle('has-hero', !!$('#resultCard .rhero')); o.classList.add('show');
  $$('#resultCard .rstars svg.on').forEach((s,i)=>{ s.style.animationDelay=(0.35+i*0.35)+'s'; setTimeout(()=>Sfx.star(i), 350+i*350); });
}
function confetti(){ const w=stageEl.clientWidth, h=stageEl.clientHeight; for(let i=0;i<5;i++) setTimeout(()=>FX.burst(rand(w*.15,w*.85), rand(h*.1,h*.5), {n:26,speed:8,shape:'star',colors:['#ffe066','#ff7ad9','#7ff0ff','#9dff6b','#fff'],size:10,life:80,gravity:.1}), i*220); }
function hideResult(){ $('#result').classList.remove('show','has-hero'); }

/* timed survival (60s) and combo challenge (90s) */
function paintTimer(){
  const num=$('#timerNum'), box=$('#timerBox');
  const s=Math.max(0, Math.ceil(B.timeLeft||0));
  if(num) num.textContent=s;
  else if(box) box.textContent=s+'秒';
  if(box) box.classList.toggle('low', s<=10);
}
function addTime(sec){
  B.endAt=(B.endAt||Date.now())+sec*1000;
  const frozen=B._freezeAt?(Date.now()-B._freezeAt):0;
  B.timeLeft=Math.max(0,(B.endAt+frozen-Date.now())/1000);
  B._timeUp=B.timeLeft<=0;
  paintTimer();
}
function flashTimer(text, cls){
  const box=$('#timerBox'); if(!box) return;
  const n=document.createElement('i');
  n.className='tnote '+(cls||'');
  n.textContent=text;
  box.appendChild(n);
  setTimeout(function(){ if(n.parentNode) n.parentNode.removeChild(n); }, 900);
}
function startTimer(seconds){
  stopTimer();
  const secs=seconds||60;
  B.endAt=Date.now()+secs*1000; B.paused=false; B._freezeAt=0; B._timeUp=false; B.timeLeft=secs;
  let lastSec=secs;
  B.timer=setInterval(()=>{
    if(B.paused || B.busy){ if(!B._freezeAt) B._freezeAt=Date.now(); return; }
    if(B._freezeAt){ B.endAt+=Date.now()-B._freezeAt; B._freezeAt=0; }
    B.timeLeft=Math.max(0,(B.endAt-Date.now())/1000);
    const s=Math.ceil(B.timeLeft);
    paintTimer();
    if(s!==lastSec){ lastSec=s; if(s<=10 && s>0) Sfx.tick(); }
    if(B.timeLeft<=0){ B._timeUp=true; timedEnd(); }
  }, 100);
}
function stopTimer(){ clearInterval(B.timer); B.timer=null; B._freezeAt=0; }
function awardWingStamp(){
  if(!DATA.stamps) DATA.stamps={};
  DATA.stamps.wing=(DATA.stamps.wing||0)+1;
  if(!DATA.titles) DATA.titles={};
  DATA.titles.combo='翼光奧米加';
}
function timedEnd(){
  if(B._ended) return;
  B._ended=true;
  stopTimer(); B.token++; B.busy=true;
  const comboMode=B.mode==='combo';
  const metric=comboMode?(B.maxCombo||0):(B.score||0);
  const key=(comboMode?'cb:':'sv:')+B.tables.join(',');
  const prev=DATA.best[key]||0;
  const isNew=metric>prev;
  if(isNew) DATA.best[key]=metric;
  if(comboMode) DATA.best.comboAll=Math.max(DATA.best.comboAll||0, metric);
  else DATA.best.surviveAll=Math.max(DATA.best.surviveAll||0, metric);
  const hen=B.maxHen||henshinStage()||1;
  const title=FORM_TITLE[hen]||FORM_TITLE[1];
  if(!DATA.titles) DATA.titles={};
  const rank={'銀光戰士':1,'紅銀戰士':2,'流星戰士':3,'金焰戰士':4,'翼光戰士':5};
  if(!comboMode && (rank[title]||0)>=(rank[DATA.titles.survive]||0)) DATA.titles.survive=title;
  const winged=comboMode && (B.maxCombo||0)>=6;
  if(winged) awardWingStamp();
  save();
  heroPose('win'); Sfx.victory();
  const stars=comboMode ? ((B.maxCombo||0)>=6?3:(B.maxCombo||0)>=3?2:1) : (metric>=16?3:metric>=8?2:1);
  const headline=comboMode
    ? '<h3>時間到！</h3><div class="rstat">90 秒最高連擊</div><div class="bigscore">'+(B.maxCombo||0)+'</div>'
    : '<h3>時間到！</h3><div class="rstat">60 秒答啱咗</div><div class="bigscore">'+(B.score||0)+'</div><div class="rstat">題</div>';
  const titleBlock=comboMode
    ? (winged?'<div class="rseal">翼光<br>奧米加</div><div class="rmsg">稱號：翼光奧米加</div><div class="rstat">圖鑑蓋咗翼光印章！</div>':'<div class="rstat">連對 6 題就有稱號「翼光奧米加」。</div><div class="rstat">今次衝到 <b>'+(HEN_LABEL[hen]||'')+'</b></div>')
    : '<div class="rmsg">稱號：'+title+'</div><div class="rstat">最高形態：<b>'+(HEN_LABEL[hen]||'')+'</b></div>';
  const html=headline+
    (isNew&&metric>0?'<div><span class="newrec">新紀錄！</span></div>':'')+
    '<div class="rstars">'+[0,1,2].map(i=>starSVG(i<stars)).join('')+'</div>'+
    titleBlock+
    '<div class="rbtns"><button class="btn orange" id="rAgain">'+icon('clock')+'再挑戰</button><button class="btn blue small" id="rPick">揀過乘數表</button><button class="btn gray small" id="rHome">返主頁</button></div>';
  showResult(html, stars);
  const againMode=comboMode?'combo':'survive';
  $('#rAgain').addEventListener('click',()=>{ Sfx.click(); B._ended=false; startSession(againMode, B.tables); });
  $('#rPick').addEventListener('click',()=>{ Sfx.click(); endBattle(); openSetup(againMode); });
  $('#rHome').addEventListener('click',()=>{ Sfx.click(); goHome(); });
}
function endBattle(){ B.token++; stopTimer(); B.busy=true; FX.clear(); if(fxLayer) fxLayer.innerHTML=''; $$('#stage .rainbowbg, #stage > .beam').forEach(e=>e.remove()); if(heroWrap){ heroWrap.classList.remove('under-mon'); heroWrap.classList.remove('soft-beam'); } clearDisrupt(); clearCinema(); B._hen=1; B._henLabel=null; const hs=heroSvgEl(); if(hs){ hs.classList.remove('aura','rainbow','no-slug','henshin-up'); for(let i=1;i<=5;i++) hs.classList.remove('henshin-'+i); hs.classList.add('henshin-1'); const img=hs.querySelector('.hero-raster'); if(img) img.setAttribute('src', heroSrc(1,'idle')); } }

function initBattle(){
  stageEl=$('#stage'); heroWrap=$('#heroWrap'); monWrap=$('#monWrap'); fxLayer=$('#fxLayer'); FX.attach($('#fxCanvas'));
  const keys=['7','8','9','4','5','6','1','2','3','del','0','ok'];
  $('#keypad').innerHTML = keys.map(k=> k==='del' ? '<button class="key del" data-k="del" aria-label="刪除">'+icon('del')+'</button>' : k==='ok' ? '<button class="key ok" data-k="ok">出招！</button>' : '<button class="key" data-k="'+k+'">'+k+'</button>').join('');
  $$('#keypad .key').forEach(b=>b.addEventListener('click',()=>keyIn(b.dataset.k)));
  window.addEventListener('resize',()=>{ layoutStage(); FX.resize(); if(current==='learn') renderLearn(false); });
}

/* ---------- PROGRESS ---------- */
function renderProgress(){
  const s=DATA.stats; const facts=Object.keys(DATA.facts); const mastered=facts.filter(k=>mastery(k)===2).length;
  const titleBits=[];
  if(DATA.titles&&DATA.titles.survive) titleBits.push(DATA.titles.survive);
  if(DATA.titles&&DATA.titles.combo) titleBits.push(DATA.titles.combo);
  $('#stats').innerHTML = [['打敗怪獸',s.monsters],['打敗星辰霸主',s.dada||0],['最高連擊',s.maxCombo],['限時最佳',DATA.best.surviveAll||0],['連擊最佳',DATA.best.comboAll||0],['識晒題數',mastered]].map(x=>'<div class="stat"><b>'+x[1]+'</b><span>'+x[0]+'</span></div>').join('')+(titleBits.length?'<div class="stat"><b>'+titleBits[0]+'</b><span>'+(titleBits[1]||'稱號')+'</span></div>':'');
  let g='<tr><th>×</th>'+[1,2,3,4,5,6,7,8,9].map(b=>'<th>'+b+'</th>').join('')+'</tr>';
  [1,2,3,4,5,6,7,8,9,10].forEach(a=>{ g+='<tr><th>'+a+'</th>'; for(let b=1;b<=9;b++){ const m=mastery(a+'x'+b); g+='<td class="m'+m+'" title="'+a+'×'+b+'">'+(a*b)+'</td>'; } g+='</tr>'; });
  $('#mgrid').innerHTML=g;
  const weak=facts.filter(k=>/^\d+x\d+$/.test(k)&&(DATA.facts[k].p||0)>0).sort((x,y)=>DATA.facts[y].p-DATA.facts[x].p).slice(0,10);
  $('#weak').innerHTML = weak.length ? weak.map(k=>{ const [a,b]=k.split('x').map(Number); return '<span>'+a+' × '+b+' = '+(a*b)+'</span>'; }).join('') : '<div style="opacity:.8">暫時冇！繼續保持 👍</div>'.replace(' 👍','');
  renderDex();
  $('#badges').innerHTML = [1,2,3,4,5,6,7,8,9,10].map(t=>{ const tier=DATA.badges[t]||0; return '<div class="badge">'+medalSVG(t,tier)+'<div>'+(tier?['','銅','銀','金'][tier]+'勳章':'未有')+'</div></div>'; }).join('');
}

function renderDex(){
  const dex=DATA.dex||{}; const got=DEX_ORDER.filter(t=>dex[t]).length;
  $('#dexCount').textContent=got+' / '+DEX_ORDER.length;
  const stamp=$('#dexStamp');
  if(stamp){
    const on=!!(DATA.stamps&&DATA.stamps.wing);
    stamp.hidden=!on;
    stamp.textContent=on?'翼光奧米加':'';
  }
  const elemBorder={fire:'#ff7a3d',ice:'#7dd3fc',thunder:'#fde047',rock:'#a8a29e',poison:'#c084fc',sand:'#eab308',steel:'#e5e7eb',water:'#38bdf8',dark:'#6b21a8',light:'#fff',star:'#fde68a'};
  const sel=window.__dexSel;
  $('#dex').innerHTML=DEX_ORDER.map((t)=>{
    const m=MONS[t], n=dex[t]||0;
    const tag=m.friend?'<i class="dtag f">夥伴</i>':m.final?'<i class="dtag b">大頭目</i>':m.boss?'<i class="dtag b">頭目</i>':'';
    const border=elemBorder[m.elem]||'#7c8cff';
    return '<button type="button" class="dcard'+(n?'':' locked')+(sel===t?' on':'')+'" data-dex="'+t+'" style="--db:'+border+'" '+(n?'':'disabled aria-disabled="true"')+' aria-label="'+(n?m.name:'未遇到嘅怪獸')+'"><div class="dimg">'+monRasterHTML(t)+'</div><div class="dname">'+(n?m.name:'？？？')+'</div>'+(n?'<div class="dn">'+(m.friend?'特訓':'打敗')+' ×'+n+'</div>':'<div class="dn">未遇到</div>')+tag+'</button>';
  }).join('');
  $$('#dex .mon-img').forEach(bindMonImg);
  $$('#dex .dcard:not(.locked)').forEach(c=>c.addEventListener('click',()=>{ Sfx.click(); selectDex(c.dataset.dex); }));
  if(sel && dex[sel]) fillDexPanel(sel);
  else if(got){ const first=DEX_ORDER.find(t=>dex[t]); if(first) selectDex(first, true); else clearDexPanel(); }
  else clearDexPanel();
}
function clearDexPanel(){
  window.__dexSel=null;
  const empty=$('#dexPanelEmpty'), body=$('#dexPanelBody');
  if(empty) empty.hidden=false; if(body) body.hidden=true;
}
function selectDex(type, quiet){
  const m=MONS[type], n=(DATA.dex&&DATA.dex[type])||0; if(!m||!n) return;
  window.__dexSel=type;
  $$('#dex .dcard').forEach(c=>c.classList.toggle('on', c.dataset.dex===type));
  fillDexPanel(type);
  if(!quiet){ /* keep panel in view on mobile */ const p=$('#dexPanel'); if(p && window.matchMedia('(max-width:859px)').matches) p.scrollIntoView({behavior:'smooth',block:'nearest'}); }
}
function fillDexPanel(type){
  const m=MONS[type], n=(DATA.dex&&DATA.dex[type])||0;
  $('#dexPanelEmpty').hidden=true; $('#dexPanelBody').hidden=false;
  $('#dexPanelArt').innerHTML=dexPairHTML(type); $$('#dexPanelArt .mon-img').forEach(bindMonImg);
  const tags=[]; if(m.friend) tags.push('<i class="f">夥伴</i>'); if(m.final) tags.push('<i class="b">大頭目</i>'); else if(m.boss) tags.push('<i class="b">頭目</i>');
  tags.push('<i>'+(m.kind||'怪獸')+'</i>'); if(m.elemWord) tags.push('<i>'+m.elemWord+'</i>');
  $('#dexPanelTags').innerHTML=tags.join('');
  $('#dexPanelName').textContent=m.name;
  $('#dexPanelNick').textContent=m.nick;
  const bar=(label, cls, val)=>{ const v=val|0; const p=Math.max(8, Math.min(100, Math.round(v/50*100))); return '<div class="dex-bar"><span>'+label+'</span><i class="'+cls+'"><b style="--p:'+p+'%"></b></i><span>'+v+'</span></div>'; };
  const p1=m.spawn!=null?m.spawn:Math.min(50,12+n*4), p2=m.power!=null?m.power:Math.min(50,10+n*3), p3=m.rare!=null?m.rare:Math.min(50,8+n*3);
  $('#dexBars').innerHTML=bar('出沒','g',p1)+bar('威力','r',p2)+bar('稀有','o',p3);
  $('#dexPanelLore').textContent=m.kid||m.lore||'暫時未有資料。';
  const more=$('#dexPanelMore');
  more.onclick=()=>{ Sfx.click(); openDexDetail(type); };
}
const DEX_BG = {
  heidragon:['#101014','#2a0a00'], lavaover:['#4a1508','#1a0600'], holyturt:['#14532d','#062418'],
  sandwyrm:['#6b4e2e','#2a1a08'], thundwolf:['#1a4a7a','#061828'], ninjacat:['#0a0a10','#1a0828'],
  steeltiran:['#1f2937','#0a0c10'], icetiran:['#1e3a8a','#061028'], phoenix:['#7c2d12','#2a0a00'],
  mtngod:['#292524','#120e0c'], manflower:['#14532d','#0a1a08'], illusdemon:['#0f172a','#061018'],
  seaking:['#1e3a8a','#061028'], deathscorp:['#6b4e1e','#2a1808'], nightmare:['#1e0a3c','#0a0418'],
  galmoth:['#374151','#12141a'], flamecrab:['#7f1d1d','#2a0808'], starlord:['#18181b','#050508']
};
function openDexDetail(type){
  const m=MONS[type], n=(DATA.dex&&DATA.dex[type])||0; if(!m||!n) return;
  selectDex(type, true);
  const bg=DEX_BG[type]||[m.dark, '#060918'];
  const sheet=$('#dexSheet'); sheet.style.setProperty('--ds1', bg[0]); sheet.style.setProperty('--ds2', bg[1]);
  $('#dsArt').innerHTML = dexPairHTML(type);
  $$('#dsArt .mon-img').forEach(bindMonImg);
  const tags=[]; if(m.omega) tags.push('<i class="o">奧米加</i>'); if(m.friend) tags.push('<i class="f">夥伴</i>');
  if(m.final) tags.push('<i class="b">大頭目</i>'); else if(m.boss) tags.push('<i class="b">頭目</i>');
  if(!tags.length) tags.push('<i>圖鑑怪獸</i>');
  $('#dsTags').innerHTML=tags.join('');
  $('#dsName').textContent=m.name; $('#dsNick').textContent=m.nick;
  $('#dsKind').textContent=m.kind||'未知怪獸'; $('#dsHabitat').textContent=m.habitat||'？？？';
  $('#dsMove').textContent=m.nick; $('#dsRecord').textContent=(m.friend?'特訓':'打敗')+' ×'+n;
  const dsElem=$('#dsElem'); if(dsElem) dsElem.textContent=m.elemWord||'？';
  const kid=$('#dsKid'); if(kid) kid.textContent=m.kid||'';
  $('#dsLore').textContent=m.lore||'暫時未有資料。';
  sheet.hidden=false; sheet.classList.add('show');
}
function closeDexDetail(){ const sheet=$('#dexSheet'); sheet.classList.remove('show'); sheet.hidden=true; $('#dsArt').innerHTML=''; }

/* ---------- modal ---------- */
let modalCb=null;
function confirmBox(text, yes, no, cb){ $('#mText').textContent=text; $('#mYes').textContent=yes; $('#mNo').textContent=no; modalCb=cb; $('#modal').classList.add('show'); }
function closeModal(v){ $('#modal').classList.remove('show'); const cb=modalCb; modalCb=null; if(cb) cb(v); }

/* ---------- mute ---------- */
function syncMute(){ const b=$('#btnMute'); b.innerHTML=icon(DATA.settings.muted?'mute':'sound'); b.setAttribute('aria-label', DATA.settings.muted?'開聲':'靜音'); }

/* ---------- init ---------- */
function init(){
  buildSky($('#bg')); fillIcons(); syncMute();
  initHome(); initLearn(); initSetup(); initBattle();
  Speech.init();
  document.addEventListener('pointerdown', ()=>Sfx.init(), {passive:true});
  document.addEventListener('keydown', ()=>Sfx.init());
  $('#btnMute').addEventListener('click',()=>{ DATA.settings.muted=!DATA.settings.muted; save(); syncMute(); if(DATA.settings.muted) Speech.stop(); else Sfx.click(); });
  $('#btnHome').addEventListener('click',()=>{ Sfx.click();
    if(current==='battle' && !$('#result').classList.contains('show')){ B.paused=true;
      confirmBox('要離開呢場戰鬥嗎？','離開','繼續打',v=>{ if(v) goHome(); else B.paused=false; }); }
    else if(current==='learn'){ stopAuto(); Speech.stop(); buildLearnTiles(); show('learnPick'); }
    else goHome(); });
  $('#mYes').addEventListener('click',()=>closeModal(true)); $('#mNo').addEventListener('click',()=>closeModal(false));
  $('#dsClose').addEventListener('click',()=>{ Sfx.click(); closeDexDetail(); });
  $('#dexSheet').addEventListener('click',e=>{ if(e.target===e.currentTarget){ Sfx.click(); closeDexDetail(); } });
  $('#resetBtn').addEventListener('click',()=>confirmBox('真係要清除晒所有進度同勳章？','清除','唔好',v=>{ if(v){ const st=DATA.settings; DATA=defaultData(); DATA.settings=st; save(); renderProgress(); } }));
  $$('#starPicks .star-pick').forEach(b=>b.addEventListener('click', ()=>{
    Sfx.click();
    const star=+b.dataset.star;
    startSession('divide', divisionDivisors(star), {star:star});
  }));
  $$('#mixPicks .star-pick').forEach(b=>b.addEventListener('click', ()=>{
    Sfx.click();
    startSession('mixed', [], {star:+b.dataset.star});
  }));
  document.addEventListener('keydown', e=>{
    if($('#dexSheet').classList.contains('show')){ if(e.key==='Escape'){ closeDexDetail(); e.preventDefault(); } return; }
    if($('#modal').classList.contains('show')){ if(e.key==='Escape') closeModal(false); if(e.key==='Enter'){ e.preventDefault(); closeModal(true);} return; }
    if(current==='battle'){
      if($('#result').classList.contains('show')){ if(e.key==='Enter'){ e.preventDefault(); const b=$('#resultCard .rbtns .btn'); if(b) b.click(); } return; }
      if(B.choice){ if(/^[1-4]$/.test(e.key)){ const b=$$('#choices .choice')[+e.key-1]; if(b) b.click(); } return; }
      if(/^[0-9]$/.test(e.key)){ keyIn(e.key); pressKey(e.key); e.preventDefault(); }
      else if(e.key==='Backspace'){ keyIn('del'); pressKey('del'); e.preventDefault(); }
      else if(e.key==='Enter'){ keyIn('ok'); pressKey('ok'); e.preventDefault(); }
    }     else if(current==='learn'){
      if(e.key==='ArrowRight'){ stopAuto(); learnNext(); } else if(e.key==='ArrowLeft'){ stopAuto(); learnPrev(); } else if(e.key===' '){ e.preventDefault(); Speech.speak(chant(L.t,L.i)); } }
  });
  if(/[?&]selftest=1/.test(location.search)) runSelfTest();
}
function pressKey(k){ const b=$('#keypad .key[data-k="'+k+'"]'); if(!b) return; b.classList.add('press'); setTimeout(()=>b.classList.remove('press'),110); }
function runSelfTest(){
  const fails=[];
  const saved=B.combo;
  [[0,1],[1,2],[2,2],[3,3],[4,3],[5,4],[6,5],[9,5]].forEach(function(pair){
    B.combo=pair[0]; if(henshinStage()!==pair[1]) fails.push('hen '+pair[0]+'→'+henshinStage());
  });
  B.combo=saved;
  const words={heidragon:'火',lavaover:'火',phoenix:'火',flamecrab:'火',holyturt:'冰',icetiran:'冰',thundwolf:'雷',deathscorp:'毒',manflower:'毒',mtngod:'岩',sandwyrm:'沙',steeltiran:'鋼',seaking:'水',ninjacat:'暗',nightmare:'暗',illusdemon:'光',galmoth:'星',starlord:'星'};
  Object.keys(words).forEach(function(id){
    const m=MONS[id];
    if(!m) fails.push('missing '+id);
    else if(m.elemWord!==words[id]) fails.push(id+' elem '+(m.elemWord||''));
    if(m && m.name!==({'deathscorp':'死神蠍','sandwyrm':'黃泉魔龍'}[id]||m.name)) fails.push(id+' name');
  });
  if(MONS.deathscorp.name!=='死神蠍') fails.push('deathscorp name');
  if(MONS.sandwyrm.name!=='黃泉魔龍') fails.push('sandwyrm name');
  const bob=$('#monBob');
  Object.keys(words).forEach(function(id){
    bob.innerHTML=monRasterHTML(id);
    B.type=id;
    setMonAttack(false);
    let host=$('#monBob .mon');
    if(!host || host.classList.contains('idle-flip') || host.classList.contains('atk-flip')) fails.push('idle flip '+id);
    setMonAttack(true);
    host=$('#monBob .mon');
    const img=$('#monBob .mon-img');
    if(!host || host.classList.contains('atk-flip') || host.classList.contains('idle-flip')) fails.push('atk flip '+id);
    if(!img || img.getAttribute('src')!==monAttackSrc(id)) fails.push('atk src '+id);
    const tr=getComputedStyle(img).transform||'';
    if(/matrix\(\s*-/.test(tr)) fails.push('atk mirror '+id);
  });
  bob.innerHTML='';
  if(/scaleX\(\s*-1/.test(setMonAttack.toString()+mvWhirl.toString())) fails.push('runtime scaleX(-1)');
  Array.from(document.styleSheets).forEach(function(sheet){
    let rules; try{ rules=sheet.cssRules; }catch(e){ return; }
    Array.from(rules).forEach(function(rule){
      const t=rule.cssText||'';
      if(/scaleX\(\s*-1/.test(t) && /\.(mon|hero)/.test(t)) fails.push('css flip');
    });
  });
  [1,2,3].forEach(function(star){
    const divs=divisionDivisors(star);
    if(star===1 && divs.join(',')!=='2,5,10') fails.push('star1');
    if(star===2 && divs.join(',')!=='2,3,4,5,10') fails.push('star2');
    if(star===3 && divs.join(',')!=='6,7,8,9') fails.push('star3');
    const qMax=star>=3?12:9;
    for(let n=0;n<12;n++){
      const order=divisionOrder(star);
      if(order.length!==5) fails.push('order '+star);
      if(star>=3 && (order.indexOf('heidragon')<0 || order.indexOf('starlord')<0)) fails.push('bosses');
      const picked=pickDivision(divs, qMax, []);
      if(!picked || picked.dividend!==picked.d*picked.q || picked.q<1 || picked.q>qMax || divs.indexOf(picked.d)<0) fails.push('fact '+star);
      const ch=makeDivChoices(picked.q);
      if(ch.length!==4 || ch.indexOf(picked.q)<0 || ch.some(function(v){ return v<1 || v!==(v|0); })) fails.push('choices '+star);
    }
  });
  [1,2,3].forEach(function(star){
    let sawDiv=false, sawMul=false, sawMinus=false;
    for(let n=0;n<40;n++){
      const q=pickMixed(star);
      const prod=q.a*q.b;
      let ans=prod;
      if(q.op2==='+') ans=prod+q.c;
      else if(q.op2==='−') ans=prod-q.c;
      else if(q.op2==='×') ans=prod*q.c;
      else if(q.op2==='÷') ans=prod/q.c;
      if(ans!==q.ans || q.ans!==(q.ans|0) || q.ans<0) fails.push('mix eval '+star+' '+q.a+q.op2+q.c);
      const cap=star<=1?20:star===2?30:50;
      if(q.ans>cap) fails.push('mix cap '+star+' '+q.ans);
      if(star<=1 && q.op2!=='+') fails.push('star1 op');
      if(star===2 && q.op2!=='+' && q.op2!=='−') fails.push('star2 op');
      if(q.op2==='÷'){ sawDiv=true; if(prod%q.c!==0) fails.push('mix div'); }
      if(q.op2==='×') sawMul=true;
      if(q.op2==='−') sawMinus=true;
      const ch=makeMixedChoices(q);
      if(ch.length!==4 || ch.indexOf(q.ans)<0) fails.push('mix choices');
      const order=divisionOrder(star);
      if(order.length!==5) fails.push('mix order');
      if(star>=3 && (order.indexOf('heidragon')<0||order.indexOf('starlord')<0)) fails.push('mix bosses');
      if(star<3 && (order.indexOf('starlord')>=0)) fails.push('mix early boss');
    }
    if(star>=3 && (!sawDiv || !sawMul)) fails.push('star3 kinds');
    if(star===2 && !sawMinus) fails.push('star2 minus');
  });
  Object.keys(ATTACK_SCALE).forEach(function(id){
    const sc=ATTACK_SCALE[id];
    if(!(sc>=1 && sc<=1.65)) fails.push('scale '+id);
  });
  const pair=dexPairHTML('heidragon');
  if(/立繪|出招|<figcaption/.test(pair)) fails.push('dex caption');
  ensureHero();
  for(let st=1;st<=5;st++){
    if(heroSrc(st,'idle')!=='assets/battle/hero_h'+st+'.png') fails.push('idle src '+st);
    if(heroSrc(st,'omega')!=='assets/battle/hero_h'+st+'.png') fails.push('omega src '+st);
    if(heroSrc(st,'win')!=='assets/battle/hero_h'+st+'_pose_win.png') fails.push('win src '+st);
    if(heroSrc(st,'punch')!=='assets/battle/hero_h'+st+'_pose_punch.png') fails.push('punch src '+st);
    if(heroSrc(st,'kick')!=='assets/battle/hero_h'+st+'_pose_kick.png') fails.push('kick src '+st);
    if(heroSrc(st,'beam')!=='assets/battle/hero_h'+st+'_pose_beam.png') fails.push('beam src '+st);
    if(heroSrc(st,'guard')!=='assets/battle/hero_h'+st+'_pose_guard.png') fails.push('guard src '+st);
  }
  ['beam','omega'].forEach(function(p){
    heroPose(p);
    const hs=heroSvgEl();
    if(!hs || !hs.classList.contains('pose-'+p)) fails.push('pose '+p);
    if(!heroWrap || !heroWrap.classList.contains('under-mon')) fails.push('under '+p);
    if(heroWrap && heroWrap.classList.contains('soft-beam')) fails.push('fade '+p);
    const op=parseFloat(getComputedStyle(heroWrap).opacity);
    if(!(op>=0.99)) fails.push('op '+p+' '+op);
    const hz=parseInt(getComputedStyle(heroWrap).zIndex,10), mz=parseInt(getComputedStyle(monWrap).zIndex,10);
    if(!(hz<mz)) fails.push('z '+p+' '+hz+'/'+mz);
    const img=hs && hs.querySelector('.hero-raster');
    if(!img || img.getAttribute('src')!==heroSrc(1,p)) fails.push('live '+p);
  });
  heroPose('omega');
  if(!heroSvgEl() || !heroSvgEl().classList.contains('stand')) fails.push('omega stand');
  heroPose('kick');
  if(!heroWrap || heroWrap.classList.contains('under-mon') || heroWrap.classList.contains('soft-beam')) fails.push('kick under');
  if(heroSvgEl() && heroSvgEl().classList.contains('stand')) fails.push('kick stand');
  if(heroWrap && parseFloat(getComputedStyle(heroWrap).opacity)<0.99) fails.push('kick op');
  if(heroWrap && monWrap){
    const hz=parseInt(getComputedStyle(heroWrap).zIndex,10), mz=parseInt(getComputedStyle(monWrap).zIndex,10);
    if(!(hz>mz)) fails.push('kick z '+hz+'/'+mz);
  }
  heroPose('idle');
  if(heroWrap && (heroWrap.classList.contains('under-mon') || heroWrap.classList.contains('soft-beam'))) fails.push('idle under');
  if(!heroSvgEl() || !heroSvgEl().classList.contains('stand')) fails.push('idle stand');
  if(heroSvgEl() && heroSvgEl().classList.contains('pose-fit')) fails.push('idle fit');
  if(heroWrap && parseFloat(getComputedStyle(heroWrap).opacity)<0.99) fails.push('idle op');
  heroPose('punch');
  if(!heroSvgEl() || !heroSvgEl().classList.contains('pose-fit')) fails.push('punch fit');
  const poseS=parseFloat(heroSvgEl()&&heroSvgEl().style.getPropertyValue('--pose-s'));
  if(!(poseS>0.4 && poseS<=1)) fails.push('punch scale '+poseS);
  heroPose('idle');
  const battleEl=$('#battle');
  if(battleEl && (battleEl.classList.contains('stage-a')||battleEl.classList.contains('stage-b')||battleEl.classList.contains('stage-c'))) fails.push('stage class');
  if(document.querySelector('[data-stage-size]')) fails.push('stage chip');
  const monHud=$('.monhud'), right=$('.hud-right');
  if(!monHud || !right || !right.contains(monHud) || !right.contains($('#combo'))) fails.push('hud right');
  const home=$('#home');
  ['【學習】','乘數表','九因歌','【打怪】','加法大進擊','減法暗影戰','加減雙刃斬','乘法火焰爆','除法冰封關','乘除雷電擊','四則終極戰','圖鑑收藏','戰績','運算超人'].forEach(function(w){
    if(!home || home.textContent.indexOf(w)<0) fails.push('home missing '+w);
  });
  if(home && home.textContent.indexOf('變身進度')>=0) fails.push('form entry');
  if(document.title.indexOf('運算超人')<0) fails.push('title');
  const prog=$('#progress');
  if(!prog || prog.textContent.indexOf('戰績')<0) fails.push('records title');
  if(prog && (prog.querySelector('.dex-stage,#dex') || prog.textContent.indexOf('怪獸圖鑑')>=0 || prog.textContent.indexOf('變身進度')>=0)) fails.push('records dex');
  if(!$('#dexView') || !$('#dexView #dex')) fails.push('dex view');
  if(home && home.querySelector('[data-go="setup-survive"],[data-go="setup-combo"],[data-go="setup-timed"],[data-go="mixed"],[data-stage-size]')) fails.push('home old entry');
  const soonN=home?home.querySelectorAll('[data-go="soon"]').length:0;
  if(soonN!==0) fails.push('soon '+soonN);
  if(home && home.textContent.indexOf('就快')>=0) fails.push('soon text');
  ['ops-add','ops-sub','ops-mixas','ops-mul','ops-div','ops-mixmd','ops-all'].forEach(function(g){
    if(!home || !home.querySelector('[data-go="'+g+'"]')) fails.push('home '+g);
  });
  if(!home || !home.querySelector('[data-go="learnPick"]')) fails.push('home live');
  if(opsGoal(false)!==15) fails.push('goal normal');
  if(opsGoal(true,5)!==20 || opsGoal(true,8)!==23) fails.push('goal boss');
  if(BOSS_CAST.length!==4 || BOSS_CAST.some(function(id){ return !MONS[id]; })) fails.push('boss cast');
  B.tables=[2,3,4,5,6,7,8,9]; B.divisors=[2,3,4,5,10]; B.qMax=9; B.recent=[];
  let addUnder=0;
  for(let n=0;n<80;n++){
    const q=pickAdd([]);
    if(q.ans!==q.a+q.b || q.ans<1 || q.ans>50 || q.op!=='+') fails.push('add '+q.a+'+'+q.b);
    if(q.ans<=20) addUnder++;
    const ch=makeSumChoices(q.ans);
    if(ch.length!==4 || ch.indexOf(q.ans)<0 || ch.some(function(v){ return v<0; })) fails.push('add ch');
    const s=pickSub([]);
    if(s.ans!==s.a-s.b || s.ans<0 || s.b>s.a || s.op!=='−') fails.push('sub');
    const m=pickMulQ([]);
    if(m.ans!==m.a*m.b || m.op!=='×' || B.tables.indexOf(m.a)<0) fails.push('mul');
    const d=pickDivQ([]);
    if(d.a!==d.b*d.ans || d.op!=='÷' || B.divisors.indexOf(d.b)<0) fails.push('divq');
  }
  if(addUnder<48) fails.push('add mostly '+addUnder);
  let sawAdd=false,sawSub=false,sawMul=false,sawDiv=false,sawTwo=false;
  B.tables=[2,3,4,5]; B.divisors=[2,3,4,5];
  for(let n=0;n<80;n++){
    const q=pickOpsQuestion('all', []);
    let ans;
    if(q.op2){
      const prod=q.a*q.b;
      ans=q.op2==='+'?prod+q.c:q.op2==='−'?prod-q.c:q.op2==='×'?prod*q.c:prod/q.c;
      sawTwo=true;
      if(q.ans>30) fails.push('two cap');
    } else if(q.op==='+'){ ans=q.a+q.b; sawAdd=true; }
    else if(q.op==='−'){ ans=q.a-q.b; sawSub=true; if(ans<0) fails.push('neg'); }
    else if(q.op==='×'){ ans=q.a*q.b; sawMul=true; }
    else if(q.op==='÷'){ ans=q.a/q.b; sawDiv=true; if(q.a!==q.b*q.ans) fails.push('exact'); }
    if(ans!==q.ans) fails.push('all eval');
  }
  if(!sawAdd||!sawSub||!sawMul||!sawDiv||!sawTwo) fails.push('all kinds');
  let sawMixM=false,sawMixD=false;
  for(let n=0;n<40;n++){
    const q=pickOpsQuestion('mixmd', []);
    if(q.op==='×'){ sawMixM=true; if(q.ans!==q.a*q.b) fails.push('md mul'); }
    if(q.op==='÷'){ sawMixD=true; if(q.a!==q.b*q.ans) fails.push('md div'); }
  }
  if(!sawMixM||!sawMixD) fails.push('mixmd');
  const cast={};
  for(let n=0;n<24;n++){
    startOps(['add','sub','mixas','mul','div','mixmd','all'][n%7]);
    if(!isOpsMode() || !B.order || B.order.length!==1) fails.push('stage '+n);
    if(DEX_ORDER.indexOf(B.type)<0) fails.push('new mon '+B.type);
    if(B.bossRun){ if(B.goal<20 || B.goal>23) fails.push('boss goal '+B.goal); if(BOSS_CAST.indexOf(B.type)<0) fails.push('boss type'); }
    else if(B.goal!==15) fails.push('norm goal');
    if(B.maxHp!==B.goal) fails.push('hp '+B.maxHp+'/'+B.goal);
    cast[B.mode]=1;
  }
  if(Object.keys(cast).length!==7) fails.push('modes '+Object.keys(cast).join(','));
  endBattle(); show('home');
  const pre=document.createElement('pre');
  pre.id='selftest';
  pre.textContent=fails.length?fails.join('\n'):'OK';
  document.body.appendChild(pre);
}
if(/[?&]test=1/.test(location.search)) window.__ut = { B:B, force:k=>{ B.forceMove=k; }, gotoRound:i=>{ B.token++; B.round=i; hideResult(); startRound(B.order[i]); }, startRound:t=>{ B.token++; hideResult(); startRound(t); }, show:id=>show(id), dex:list=>{ DATA.dex={}; list.forEach(t=>DATA.dex[t]=1+(t.length%3)); save(); renderProgress(); }, order:o=>{ B.order=o; }, henshinStage, syncHenshin, syncChestLight, chooseMove, applyDisrupt, playElementHit, clearElementHit, isHardFight, setMonAttack, ATTACK_SCALE, divisionDivisors, divisionOrder, pickDivision, makeDivChoices, pickMixed, makeMixedChoices, startSession, startOps, pickOpsQuestion, opsGoal, rollOpsEncounter, renderCombo, layoutStage, monRasterHTML, bindMonImg, openDexDetail, renderProgress, cinematicFinalFinish, heroSrc, poseFile, heroPose, ensureHero, DEX_ORDER, MONS, addTime, FORM_TITLE, isClockMode, isOpsMode, data:()=>DATA };
function startApp(){
  const run=()=>{ if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', init); else init(); };
  fetch('data/dex_18.json').then(function(r){ if(!r.ok) throw new Error('dex'); return r.json(); }).then(function(pack){ applyDexPack(pack); run(); }).catch(run);
}
startApp();
