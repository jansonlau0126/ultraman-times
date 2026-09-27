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
function goHome(){ endBattle(); Speech.stop(); setHomeMon(); setHomeHeroPose(); show('home'); }

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
const HOME_MONS=['dada','graim','pegunos','kanegon','gedrago','ohebinushi','therizirus','dugrid','rekiness','vugsect','trigaron','fire']; let homeMonIdx=0;
function setHomeMon(){ const t=HOME_MONS[homeMonIdx%HOME_MONS.length]; homeMonIdx++; $('#homeMon').innerHTML='<div class="mon-bob">'+monsterSVG(t,'hm'+homeMonIdx)+'</div><div class="hs-monname">'+MONS[t].name+'</div>'; }
function setHomeHeroPose(){ const h=$('#homeHero .hero'); if(!h) return; const pose=pick(['','pose-punch','pose-win','pose-disc','pose-beam','pose-kick']); h.setAttribute('class', pose?('hero '+pose):'hero'); }
function initHome(){
  $('#homeHero').innerHTML = '<div class="hero-bob">'+heroSVG('hh')+'</div><div class="hs-name">超人奧米加</div>';
  setHomeMon(); setHomeHeroPose();
  $('#homeHero').addEventListener('click', ()=>{ const h=$('#homeHero .hero'); if(!h) return; const pose=pick(['pose-punch','pose-win','pose-disc','pose-beam','pose-kick','pose-tuck']);
    h.setAttribute('class','hero '+pose); Sfx.whoosh(); setTimeout(()=>setHomeHeroPose(), 700); });
  $$('[data-go]').forEach(b=>b.addEventListener('click', ()=>{ Sfx.click(); const g=b.dataset.go;
    if(g==='learnPick'){ buildLearnTiles(); show('learnPick'); }
    else if(g==='setup-battle') openSetup('battle');
    else if(g==='setup-timed') openSetup('timed');
    else if(g==='progress'){ renderProgress(); show('progress'); } }));
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
  $('#lGo').addEventListener('click',()=>{ Sfx.click(); DATA.settings.tables=[L.t]; save(); startSession('battle',[L.t]); });
}

/* ---------- SETUP ---------- */
let setupMode='battle';
function openSetup(mode){ setupMode=mode;
  $('#setupTitle').textContent = mode==='timed' ? '60秒計時挑戰' : '打怪獸';
  $('#setupSub').textContent = mode==='timed' ? '60秒內答啱越多題越好！揀乘數表：' : '揀你想練習嘅乘數表（可以揀幾個）';
  $('#startBtn .lbl').textContent = mode==='timed' ? '開始60秒挑戰！' : '開始打怪獸！';
  $('#startBtn').className = 'btn'+(mode==='timed'?' orange':'');
  const el=$('#setupTiles'); el.innerHTML=[2,3,4,5,6,7,8,9,1,10].map(t=>tileHTML(t,'<span class="chk">'+icon('check')+'</span>')).join('');
  $$('.tile',el).forEach(b=>b.addEventListener('click',()=>{ Sfx.click(); b.classList.toggle('on'); syncSetup(); }));
  applySel(DATA.settings.tables||[2]); syncSeg(); syncSpeakSeg(); show('setup'); }
function selTables(){ return $$('#setupTiles .tile.on').map(b=>+b.dataset.t).sort((a,b)=>a-b); }
function applySel(arr){ $$('#setupTiles .tile').forEach(b=>b.classList.toggle('on', arr.indexOf(+b.dataset.t)>=0)); syncSetup(); }
function syncSetup(){ const t=selTables(); DATA.settings.tables=t; save(); $('#startBtn').disabled = t.length===0; $('#setupWarn').textContent = t.length? '' : '請揀最少一個乘數表呀！';
  if(setupMode==='timed'){ const best=DATA.best['t:'+t.join(',')]||0; $('#bestTxt').textContent = t.length ? ('呢個組合最佳紀錄：'+best+' 題'+(DATA.best.all?('　｜　總最佳：'+DATA.best.all+' 題'):'')) : ''; } else $('#bestTxt').textContent=''; }
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
const NORMALS = ['fire','ice','thunder','rock','poison','sea'];
const OMEGA_NORMALS = ['graim','dugrid','pegunos','therizirus','ohebinushi','gedrago','rekiness','trigaron'];
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
const K = () => B.mode==='timed' ? .65 : 1;
function heroSvgEl(){ return $('#heroBob .hero'); }
function monSvgEl(){ return $('#monBob .mon'); }
function mk(sel, root){ return (root||stageEl).querySelector(sel); }
function relPos(el){ const s=stageEl.getBoundingClientRect(), r=el.getBoundingClientRect(); return {x:r.left-s.left+r.width/2, y:r.top-s.top+r.height/2, w:r.width, h:r.height, l:r.left-s.left, t:r.top-s.top}; }
function heroPose(p){ const h=heroSvgEl(); if(!h) return; const keep=[]; h.classList.forEach(c=>{ if(c.indexOf('t-')===0||c==='aura'||c==='rainbow'||c==='no-slug'||c==='charging'||c.indexOf('combo-')===0) keep.push(c); }); h.setAttribute('class', ['hero'].concat(keep, p&&p!=='idle'?['pose-'+p]:[]).join(' ')); }
function syncChestLight(){
  const h=heroSvgEl(); if(!h) return;
  const wrongs=B.rwrong||0; let col='#38d6cf', blink=false, comboCls='';
  if(wrongs>=3){ col='#ef4444'; blink=true; }
  else if(wrongs===2){ col='#f97316'; }
  else if(wrongs===1){ col='#facc15'; }
  else if(B.combo>=8){ col='#ff7ad9'; blink=true; comboCls='combo-omega'; }
  else if(B.combo>=5){ col='#ffe14d'; blink=true; comboCls='combo-rainbow'; }
  else if(B.combo>=3){ col='#7ff0ff'; blink=true; comboCls='combo-super'; }
  else if(B.combo>=1){ col='#6d7cff'; }
  h.style.setProperty('--tc',col);
  h.classList.toggle('t-blink', blink);
  ['combo-super','combo-rainbow','combo-omega'].forEach(c=>h.classList.remove(c));
  if(comboCls) h.classList.add(comboCls);
}
function setChestTimer(wrongs){ B.rwrong=wrongs||0; syncChestLight(); }
async function chargePose(pose, ms){
  const h=heroSvgEl(); if(h) h.classList.add('charging');
  heroPose(pose); flash('#fff',.35); Sfx.charge();
  const hp=relPos(heroWrap); FX.spiral(hp.x,hp.y,{n:18,r:hp.h*.35,speed:-4,colors:['#fff','#bff3ff','#ffe066'],life:28,size:5,shape:'star'});
  await sleep((ms||280)*K());
  if(h) h.classList.remove('charging');
}
function layoutStage(){ if(!stageEl) return; const w=stageEl.clientWidth, h=stageEl.clientHeight; if(!w||!h) return;
  const hh = Math.min(h*.66, w*.38*1.5); heroWrap.style.height=hh+'px'; heroWrap.style.width=(hh/1.5)+'px';
  const boss = !!(MONS[B.type]&&MONS[B.type].boss); const mh = (B.type==='dada'||B.type==='ohebinushi') ? Math.min(h*.82, w*.5) : Math.min(h*(boss?.72:.6), w*(boss?.5:.44)); monWrap.style.height=mh+'px'; monWrap.style.width=mh+'px'; }

function fxEl(cls, html){ const e=document.createElement('div'); e.className=cls; if(html) e.innerHTML=html; fxLayer.appendChild(e); return e; }
function shake(px){ const a=px||8; play(stageEl,[{transform:'translate(0,0)'},{transform:'translate('+(-a)+'px,'+(a*.5)+'px)'},{transform:'translate('+a+'px,'+(-a*.4)+'px)'},{transform:'translate('+(-a*.6)+'px,'+(-a*.3)+'px)'},{transform:'translate('+(a*.4)+'px,'+(a*.3)+'px)'},{transform:'translate(0,0)'}],{duration:420}); }
function flash(color, op){ const f=fxEl('flash'); if(color) f.style.background=color; play(f,[{opacity:op||.75},{opacity:0}],{duration:380}).then(()=>rm(f)); }
function showMoveName(text, cls, dur){ const e=fxEl('movename '+(cls||'')); e.textContent=text;
  return play(e,[{transform:'translate(-50%,-50%) scale(.2) rotate(-10deg)',opacity:0},{transform:'translate(-50%,-50%) scale(1.25) rotate(3deg)',opacity:1,offset:.2},{transform:'translate(-50%,-50%) scale(1) rotate(0)',opacity:1,offset:.32},{transform:'translate(-50%,-50%) scale(1)',opacity:1,offset:.85},{transform:'translate(-50%,-50%) scale(1.3)',opacity:0}],{duration:(dur||1400)*K(),easing:'ease-out'}).then(()=>rm(e)); }
function floatText(cls, text, x, y){ const e=fxEl(cls); e.textContent=text; e.style.left=x+'px'; e.style.top=y+'px';
  play(e,[{transform:'translate(-50%,0) scale(.5)',opacity:0},{transform:'translate(-50%,-30px) scale(1.2)',opacity:1,offset:.25},{transform:'translate(-50%,-70px) scale(1)',opacity:0}],{duration:1100}).then(()=>rm(e)); }
function impactStar(t, text){ const e=fxEl('impact','<svg viewBox="0 0 100 100"><polygon points="50,2 60,32 92,18 72,46 98,60 66,66 74,96 50,76 26,96 34,66 2,60 28,46 8,18 40,32" fill="#ffe14d" stroke="#ff3b3b" stroke-width="4" stroke-linejoin="round"/></svg><span>'+text+'</span>');
  e.style.left=t.x+'px'; e.style.top=t.y+'px'; play(e,[{transform:'scale(0) rotate(-20deg)',opacity:1},{transform:'scale(1.15) rotate(5deg)',opacity:1,offset:.3},{transform:'scale(1)',opacity:1,offset:.7},{transform:'scale(1.2)',opacity:0}],{duration:700}).then(()=>rm(e)); }
function makeBeam(o,t,thick,cls,dur){ const dx=t.x-o.x, dy=t.y-o.y, len=Math.hypot(dx,dy), ang=Math.atan2(dy,dx)*180/Math.PI; const e=fxEl('beam '+(cls||''));
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
  const spin=play(heroWrap,[{transform:'translateX(0) scaleX(1)'},{transform:'translateX('+(dx*.2)+'px) scaleX(-1)'},{transform:'translateX('+(dx*.45)+'px) scaleX(1)'},{transform:'translateX('+(dx*.7)+'px) scaleX(-1)'},{transform:'translateX('+dx+'px) scaleX(1)'}],{duration:D,fill:'forwards',easing:'ease-in'});
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
  heroPose('win'); const chest=relPos(mk('.mk-chest',heroWrap));
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
  const yell=MOVE_YELL[kind]||'！';
  const wrapped=()=>{ hit(); try{ const t=relPos(mk('.mk-core',monWrap)); if(t) floatText('yell', yell, t.x+rand(-12,12), t.t+t.h*.08); }catch(e){} };
  if(kind==='omega') await chargePose('beam', 380);
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
  if(first && B.mode!=='timed'){ if(B.combo>=8) return 'omega'; if(B.combo>=5) return 'rainbow'; if(B.combo>=3) return 'super'; }
  const pool = B.mode==='timed' ? TIMED_MOVES : NORMAL_MOVES;
  if(!B.deck || !B.deck.length){ const d=shuffle(pool.slice()); if(d[0]===B.lastMove) d.push(d.shift()); B.deck=d; }
  const mv=B.deck.shift(); B.lastMove=mv; return mv; }

function damageMonster(dmg){ B.hp=Math.max(0,B.hp-dmg); $('#hpFill').style.width=(100*B.hp/B.maxHp)+'%';
  const ms=monSvgEl(); if(!ms) return; if(B.type!=='dada'){ ms.classList.add('ouch'); setTimeout(()=>{ if(B.hp>0) ms.classList.remove('ouch'); }, 650); }
  play(ms,[{transform:'translateX(0) rotate(0)',filter:'brightness(1)'},{transform:'translateX(8%) rotate(7deg)',filter:'brightness(2.6)'},{transform:'translateX(-3%) rotate(-2deg)',filter:'brightness(1)'},{transform:'translateX(4%) rotate(3deg)',filter:'brightness(2)'},{transform:'translateX(0) rotate(0)',filter:'brightness(1)'}],{duration:560});
  const t=relPos(monWrap); floatText('dmg','-'+dmg, t.x, t.t+t.h*.15);
  if(B.type==='dada'){ ms.classList.remove('ouch'); dadaSwitch(true); }
  if(B.type==='kanegon'){ kanegonCount(); const mo=relPos(mk('.mk-mouth',monWrap)); FX.burst(mo.x,mo.y,{n:3,angle:-Math.PI/2,spread:.8,speed:7,min:4,colors:['#ffd23f'],shape:'coin',size:9,life:60,gravity:.3,drag:.99}); Sfx.coin(); } }
function kanegonCount(){ const c=$('#monBob .k-count'); if(c) c.textContent=String(Math.max(0,Math.round(B.hp))).padStart(3,'0'); }
function dadaSwitch(announce){ const ms=monSvgEl(); if(!ms||B.type!=='dada') return; const faces=['face-a','face-b','face-c']; const cur=faces.findIndex(f=>ms.classList.contains(f)); const nx=faces[(cur+1)%3];
  const hd=ms.querySelector('.d-head'); if(hd){ hd.classList.remove('flip'); void hd.getBoundingClientRect(); hd.classList.add('flip'); }
  setTimeout(()=>{ faces.forEach(f=>ms.classList.remove(f)); ms.classList.add(nx); }, 170); Sfx.poof();
  if(announce){ const p=relPos(mk('.d-head',monWrap)); setTimeout(()=>floatText('ouchtxt','變面！',p.x+p.w*.6,p.t-10),120); } }
async function monsterAttack(){
  const s=MONS[B.type], type=B.type, msv=monSvgEl(); Sfx.growl();
  const o=()=>relPos(mk('.mk-mouth',monWrap)||mk('.mk-core',monWrap));
  const tHero=()=>relPos(mk('.mk-chest',heroWrap));
  const lunge=()=>play(monWrap,[{transform:'translateX(0)'},{transform:'translateX(-14%) rotate(-7deg)',offset:.4},{transform:'translateX(0)'}],{duration:720*K()});
  const hitHero=(label, colors)=>{
    const t=tHero(); Sfx.bonk(); FX.burst(t.x,t.y,{n:18,colors:colors||[s.shot,'#fff'],speed:6,size:7}); shake(7);
    play(heroSvgEl(),[{transform:'rotate(0)',filter:'brightness(1)'},{transform:'rotate(-10deg) translateX(-8px)',filter:'brightness(2.2)'},{transform:'rotate(0)',filter:'brightness(1)'}],{duration:620});
    const hp=relPos(heroWrap); floatText('ouchtxt', label||pick(['哎呀！','好痛呀！','唔緊要！']), hp.x, hp.t+hp.h*.05);
  };
  const shootOrb=(style, label)=>{
    return (async()=>{
      const L=lunge(); await sleep(240*K());
      const oo=o(), th=tHero(); const orb=fxEl('orb'); orb.style.background=style; orb.style.left=oo.x+'px'; orb.style.top=oo.y+'px'; Sfx.whoosh();
      await play(orb,[{transform:'translate(0,0) scale(.5)'},{transform:'translate('+((th.x-oo.x)/2)+'px,'+((th.y-oo.y)/2-40)+'px) scale(1)'},{transform:'translate('+(th.x-oo.x)+'px,'+(th.y-oo.y)+'px) scale(1.35)'}],{duration:480*K(),easing:'ease-in',fill:'forwards'}); rm(orb);
      hitHero(label); await L; await sleep(200*K());
    })();
  };

  if(type==='dada'){
    dadaSwitch(false); showMoveName('三面混亂光！','banner',1100);
    const L=lunge(); await sleep(200*K());
    for(let i=0;i<3;i++){ dadaSwitch(false); const oo=o(), th=tHero();
      const orb=fxEl('orb'); orb.style.background='repeating-radial-gradient(circle,#fff 0 4px,'+s.shot+' 4px 8px)'; orb.style.left=oo.x+'px'; orb.style.top=oo.y+'px';
      play(orb,[{transform:'translate(0,0) scale(.4)'},{transform:'translate('+(th.x-oo.x)+'px,'+(th.y-oo.y)+'px) scale(1.2)'}],{duration:320*K(),easing:'ease-in',fill:'forwards'}).then(()=>rm(orb));
      await sleep(140*K()); }
    hitHero('變面攻擊！',['#fff',s.shot,'#ff6fb0']); await L; await sleep(200*K()); return;
  }
  if(type==='kanegon'){
    if(msv){ msv.classList.add('open'); setTimeout(()=>msv.classList.remove('open'),900); }
    showMoveName('偽幣彈幕！','banner',1000);
    const L=lunge(); await sleep(220*K()); const oo=o(), th=tHero();
    for(let i=0;i<6;i++){ FX.burst(oo.x,oo.y,{n:2,angle:Math.atan2(th.y-oo.y,th.x-oo.x),spread:.35,speed:9,min:5,colors:['#ffd23f'],shape:'coin',size:10,life:50,gravity:.2,drag:.99}); if(i%2===0) Sfx.coin(); await sleep(60*K()); }
    hitHero('金幣砸中！',['#ffd23f','#fff']); await L; await sleep(200*K()); return;
  }
  if(type==='graim'){
    showMoveName('鑽頭突刺！','banner',1000); Sfx.whoosh();
    const L=play(monWrap,[{transform:'translateX(0) rotate(0)'},{transform:'translateX(-22%) rotate(-12deg)',offset:.45},{transform:'translateX(0) rotate(0)'}],{duration:780*K()});
    await sleep(320*K()); hitHero('鑽中喇！',['#ff8a1c','#fff','#ffd84d']);
    const th=tHero(); FX.burst(th.x,th.y,{n:22,speed:8,colors:['#ff8a1c','#ffe066'],shape:'star',size:8}); await L; await sleep(180*K()); return;
  }
  if(type==='dugrid'){
    showMoveName('毒液大口！','banner',1000);
    if(msv){ msv.classList.add('ouch'); setTimeout(()=>msv.classList.remove('ouch'),500); }
    return shootOrb('radial-gradient(circle,#d9f99d 0 20%,#a3e635 35% 55%,#3f6212 60%,rgba(0,0,0,0) 70%)','毒液！');
  }
  if(type==='pegunos'){
    showMoveName('無重力拍擊！','banner',1000);
    const L=play(monWrap,[{transform:'translate(0,0)'},{transform:'translate(-8%,-28%)',offset:.35},{transform:'translate(-16%,-10%)',offset:.55},{transform:'translate(0,0)'}],{duration:900*K()});
    await sleep(400*K()); hitHero('浮起咗！',['#bfefff','#fff']);
    await play(heroWrap,[{transform:'translateY(0)'},{transform:'translateY(-18%)',offset:.4},{transform:'translateY(0)'}],{duration:700*K()});
    await L; await sleep(150*K()); return;
  }
  if(type==='therizirus'){
    showMoveName('隱形突襲！','banner',1000);
    await play(monWrap,[{opacity:1},{opacity:.15}],{duration:280*K(),fill:'forwards'});
    await sleep(200*K());
    await play(monWrap,[{transform:'translateX(0)',opacity:.15},{transform:'translateX(-28%)',opacity:.9,offset:.5},{transform:'translateX(0)',opacity:1}],{duration:700*K()});
    hitHero('爪擊！',['#ff4d6d','#fff']); await sleep(200*K()); return;
  }
  if(type==='ohebinushi'){
    showMoveName('蛇尾橫掃！','banner',1000);
    const L=play(monWrap,[{transform:'rotate(0)'},{transform:'rotate(-18deg) translateX(-10%)',offset:.4},{transform:'rotate(8deg) translateX(-4%)',offset:.7},{transform:'rotate(0)'}],{duration:850*K()});
    await sleep(350*K()); hitHero('掃中！',['#ffd166','#fff']); shake(10); await L; await sleep(150*K()); return;
  }
  if(type==='gedrago'){
    showMoveName('粉紅衝撞！','banner',1000);
    const L=play(monWrap,[{transform:'scale(1) translateX(0)'},{transform:'scale(1.15) translateX(-20%)',offset:.5},{transform:'scale(1) translateX(0)'}],{duration:780*K()});
    await sleep(300*K()); hitHero('毛毛衝！',['#ff8fc8','#fff','#ffd1e8']); FX.burst(tHero().x,tHero().y,{n:24,speed:7,colors:['#ff8fc8','#fff'],size:7}); await L; await sleep(150*K()); return;
  }
  if(type==='vugsect'||type==='boss'){
    showMoveName(type==='vugsect'?'甲殼破壞光！':'黑暗魔彈！','banner',1100);
    return shootOrb(type==='vugsect'
      ? 'radial-gradient(circle,#fff 0 18%,#ff3b6b 40%,#2c2342 58%,rgba(0,0,0,0) 70%)'
      : 'radial-gradient(circle,#fff 0 18%,#ff4d6d 40%,#5b2aa8 58%,rgba(0,0,0,0) 70%)', type==='vugsect'?'甲光！':'魔彈！');
  }
  if(type==='rekiness'||type==='trigaron'){
    showMoveName('流星特訓彈！','banner',1000);
    return shootOrb('radial-gradient(circle,#fff 0 20%,'+s.shot+' 40%,rgba(255,255,255,0) 70%)','特訓！');
  }
  // cute elementals
  const labels={fire:['火焰彈！','燒到！'],ice:['冰錐！','凍親！'],thunder:['雷擊！','觸電！'],rock:['落石！','砸中！'],poison:['毒霧！','咳咳！'],sea:['水彈！','濕晒！']};
  const lab=labels[type]||['攻擊！','哎呀！'];
  showMoveName(lab[0],'banner',900);
  const styles={
    fire:'radial-gradient(circle,#fff7ed 0 15%,#ff9f1c 35%,#ea580c 55%,rgba(0,0,0,0) 70%)',
    ice:'radial-gradient(circle,#fff 0 20%,#bae6fd 40%,#38bdf8 60%,rgba(0,0,0,0) 72%)',
    thunder:'radial-gradient(circle,#fff 0 18%,#fde047 40%,#eab308 58%,rgba(0,0,0,0) 70%)',
    rock:'radial-gradient(circle,#e7e5e4 0 25%,#a8a29e 50%,#57534e 65%,rgba(0,0,0,0) 75%)',
    poison:'radial-gradient(circle,#f7fee7 0 18%,#b6f25c 40%,#65a30d 58%,rgba(0,0,0,0) 70%)',
    sea:'radial-gradient(circle,#ecfeff 0 18%,#5ee8ff 40%,#06b6d4 58%,rgba(0,0,0,0) 70%)'
  };
  return shootOrb(styles[type]||('radial-gradient(circle,#fff 0 22%,'+s.shot+' 45%,rgba(255,255,255,0) 72%)'), lab[1]);
}
async function friendRest(){ const ms=monSvgEl(); ms.classList.remove('ouch'); const t=relPos(mk('.mk-core',monWrap)); Sfx.appear();
  FX.burst(t.x,t.y,{n:60,speed:9,shape:'star',colors:['#bff3ff','#fff','#ffe066','#9ad8ff'],size:11,life:80,gravity:.05}); FX.ring(t.x,t.y,'#bff3ff',36);
  showMoveName('特訓完成！','banner',1400);
  await play(monWrap,[{transform:'scale(1) translateY(0)',opacity:1,filter:'brightness(1)'},{transform:'scale(1.08) translateY(-4%)',opacity:1,filter:'brightness(1.8)',offset:.35},{transform:'scale(.18) translateY(60%)',opacity:0,filter:'brightness(3)'}],{duration:1100*K(),easing:'ease-in',fill:'forwards'});
  Sfx.star(2); await sleep(500*K()); }
async function monsterExplode(){ if(MONS[B.type].friend){ await friendRest(); return; } const ms=monSvgEl(); if(B.type!=='dada') ms.classList.add('ouch'); Sfx.noise(.8,{vol:.2,type:'lowpass',f:400});
  let fiv=null; if(B.type==='dada'){ const fs=['face-a','face-b','face-c']; let k=0; fiv=setInterval(()=>{ fs.forEach(f=>ms.classList.remove(f)); ms.classList.add(fs[k++%3]); },90); }
  if(B.type==='kanegon'){ await kanegonCoinSpit(); }
  await play(ms,[{transform:'translate(0,0)',filter:'brightness(1)'},{transform:'translate(-4%,1%)',filter:'brightness(2.5)'},{transform:'translate(4%,-1%)',filter:'brightness(1)'},{transform:'translate(-4%,0)',filter:'brightness(2.5)'},{transform:'translate(4%,1%)',filter:'brightness(1)'},{transform:'translate(-3%,0)',filter:'brightness(3)'},{transform:'translate(0,0)',filter:'brightness(3)'}],{duration:800*K()});
  if(fiv) clearInterval(fiv);
  Sfx.explode(); flash('#fff',.85); shake(20); const t=relPos(mk('.mk-core',monWrap));
  if(B.type==='kanegon') FX.burst(t.x,t.y,{n:30,speed:12,colors:['#ffd23f'],shape:'coin',size:11,life:80,gravity:.25,drag:.99});
  FX.burst(t.x,t.y,{n:80,speed:14,shape:'star',colors:['#ffe066','#fff','#ff6bd6','#6bf0ff','#9dff6b'],size:13,life:75,gravity:.08});
  FX.ring(t.x,t.y,'#fff',32); FX.ring(t.x,t.y,'#ffe066',44);
  play(monWrap,[{transform:'scale(1) rotate(0)',opacity:1},{transform:'scale(1.45) rotate(18deg)',opacity:0}],{duration:520*K(),fill:'forwards'});
  showMoveName(B.mode==='timed'?'打低咗！':(B.type==='kanegon'?'金幣雨！':'打敗咗！'),'banner',1300);
  await sleep(1000*K()); }
async function kanegonCoinSpit(){ const ms=monSvgEl(); ms.classList.remove('ouch'); ms.classList.add('open'); const mo=relPos(mk('.mk-mouth',monWrap));
  const tk=B.token; let n=0; const iv=setInterval(()=>{ FX.burst(mo.x,mo.y,{n:4,angle:-Math.PI/2,spread:.9,speed:11,min:6,colors:['#ffd23f'],shape:'coin',size:rand(8,12),life:85,gravity:.32,drag:.99}); if(n++%2===0) Sfx.coin(); },70);
  floatText('coinfly', B.mode==='timed'?'金幣！':'+30 金幣！', mo.x, mo.y-30);
  await sleep(1300*K()); clearInterval(iv); if(tk!==B.token) return; if(B.mode!=='timed'){ DATA.stats.coins=(DATA.stats.coins||0)+30; B.gotCoins=30; save(); } }
async function monsterEnter(){ monWrap.getAnimations().forEach(a=>a.cancel()); Sfx.appear();
  const m=MONS[B.type]; showMoveName(B.type==='dada'?'三面怪人達達出現！':B.type==='boss'?'大魔王出現！':m.friend?(m.name+'嚟特訓！'):(m.name+'出現！'),'banner',1500);
  await play(monWrap,[{transform:'translateX(130%)',opacity:0},{transform:'translateX(-6%)',opacity:1,offset:.7},{transform:'translateX(0)',opacity:1}],{duration:950*K(),easing:'ease-out'});
  shake(5); Sfx.hit(); }

function renderRoundHud(){
  if(B.mode==='timed'){ $('#roundLbl').innerHTML='<div class="heroname">超人奧米加</div><span class="timerbox" id="timerBox">'+Math.ceil(B.timeLeft)+'秒</span>'; $('#roundDots').innerHTML='<span>答啱：<b id="scoreLbl">'+B.score+'</b> 題</span>'; return; }
  $('#roundLbl').innerHTML = '<div class="heroname">超人奧米加</div>'+(B.type==='dada' ? '最終關：達達！' : MONS[B.type].boss ? '第 '+(B.round+1)+' 關：'+(MONS[B.type].short||'頭目')+'！' : '第 '+(B.round+1)+' 關');
  $('#roundDots').innerHTML = B.order.map((t,i)=>'<i class="'+(i<B.round?'done ':'')+(MONS[t].boss&&t!=='dada'?'boss ':'')+(t==='dada'?'dada ':'')+(i===B.round?'cur':'')+'"></i>').join(''); }
function renderCombo(){ const c=$('#combo'); syncChestLight();
  if(B.combo>=2){ c.textContent=(B.combo>=8?'超必殺 ':'')+B.combo+' 連擊！'; c.classList.toggle('omega', B.combo>=8); c.classList.add('show'); play(c,[{transform:'translateX(-50%) scale(1.6)'},{transform:'translateX(-50%) scale(1)'}],{duration:300,easing:'ease-out'}); }
  else { c.classList.remove('show','omega'); } }

function startSession(mode, tables){
  endBattle(); B.token++;
  B.mode=mode; B.tables=tables.slice().sort((a,b)=>a-b); B.choice=!!DATA.settings.choice;
  B.combo=0; B.maxCombo=0; B.recent=[]; B.lastMove=null; B.busy=true; B.input='';
  $('#battle').classList.toggle('mode-choice', B.choice); hideResult(); FX.clear(); fxLayer.innerHTML='';
  if(!$('#heroBob .hero')) $('#heroBob').innerHTML=heroSVG('hb');
  heroWrap.getAnimations().forEach(a=>a.cancel());
  show('battle');
  if(mode==='timed'){ B.timeLeft=60; B.score=0; B.tq=0; B.monIdx=0; B.timedOrder=shuffle(OMEGA_NORMALS.concat(NORMALS,['kanegon'])); B.order=[]; startRound(B.timedOrder[0]); startTimer(); }
  else { const x=pickFresh(OMEGA_NORMALS); const y=Math.random()<.7?pickFresh(OMEGA_NORMALS,[x]):pick(NORMALS); B.order=shuffle(['kanegon',x,y]).concat([pickFresh(['vugsect','boss']),'dada']); B.round=0; startRound(B.order[0]); }
}
async function startRound(type){
  const tk=B.token; B.type=type; const m=MONS[type];
  B.maxHp = B.mode==='timed' ? 40 : (type==='dada'?150:m.boss?120:100); B.hp=B.maxHp; B.gotCoins=0;
  if(B.mode!=='timed'){ B.rq=0; B.rfirst=0; B.rwrong=0; B.rtables={}; B.rMaxCombo=0; B.combo=0; }
  else B.rwrong=0;
  monCounter++; $('#monBob').innerHTML = monsterSVG(type, 'mb'+monCounter);
  $('#monName').textContent = m.name+'・'+m.nick; $('#hpFill').style.width='100%';
  setChestTimer(0); heroPose('idle'); renderRoundHud(); renderCombo(); layoutStage(); if(type==='kanegon') kanegonCount();
  B.busy=true; B.q=null; renderQuestionBlank();
  await monsterEnter(); if(tk!==B.token) return;
  B.busy=false; nextQuestion(); }
function renderQuestionBlank(){ $('#qA').textContent='?'; $('#qB').textContent='?'; const a=$('#qAns'); a.textContent='?'; a.className='ansbox empty'; setHint('idle', B.mode==='timed'?'準備…':'怪獸嚟緊！準備出招！'); $('#choices').innerHTML=''; }
function nextQuestion(){ const f=pickFact(B.tables, B.recent); B.q={a:f.a,b:f.b,ans:f.a*f.b,key:f.a+'x'+f.b,tries:0};
  B.recent.push(B.q.key); if(B.recent.length>Math.min(4, B.tables.length*9-2)) B.recent.shift();
  B.input=''; $('#qA').textContent=f.a; $('#qB').textContent=f.b; renderAns();
  if(B.choice){ $('#choices').innerHTML = makeChoices(f.a,f.b).map(v=>'<button class="choice" data-v="'+v+'">'+v+'</button>').join('');
    $$('#choices .choice').forEach(b=>b.addEventListener('click',()=>{ if(B.busy||b.classList.contains('x')) return; B.input=b.dataset.v; B.lastChoiceBtn=b; renderAns(); submit(); })); }
  setHint('idle', B.choice ? '揀啱個答案就出招！' : '打答案，再撳「出招」！');
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
  if(first && B.mode!=='timed'){ B.rq++; B.rtables[q.a]=(B.rtables[q.a]||0)+1; }
  if(n===q.ans){
    Sfx.correct(); renderAns('good');
    if(first){ recordFact(q.key,true); B.combo++; if(B.mode!=='timed'){ B.rfirst++; B.rMaxCombo=Math.max(B.rMaxCombo,B.combo); } B.maxCombo=Math.max(B.maxCombo,B.combo); if(B.combo>DATA.stats.maxCombo){ DATA.stats.maxCombo=B.combo; save(); } }
    if(B.mode==='timed'){ B.score++; const s=$('#scoreLbl'); if(s) s.textContent=B.score; }
    setHint('good', pick(['答啱喇！','好叻呀！','勁呀！','冇錯！','正！']), q.a+' × '+q.b+' = '+q.ans+'　'+chant(q.a,q.b));
    if(B.choice && B.lastChoiceBtn) B.lastChoiceBtn.classList.add('right');
    renderCombo();
    let dmg = first ? (B.combo>=8?28:B.combo>=5?20:B.combo>=3?15:10) : 6; if(B.mode==='timed') dmg=10;
    const kind=chooseMove(first);
    await performMove(kind, ()=>damageMonster(dmg)); if(tk!==B.token) return;
    if(B.hp<=0){ await monsterExplode(); if(tk!==B.token) return;
      if(B.mode==='timed'){ dexAdd(B.type); B.monIdx++; startRound(B.timedOrder[B.monIdx%B.timedOrder.length]); return; }
      roundWon(); return; }
    B.busy=false; nextQuestion();
  } else {
    Sfx.wrong(); renderAns('bad'); if(first) recordFact(q.key,false); q.tries++; B.rwrong=(B.rwrong||0)+1; B.combo=0; renderCombo();
    if(B.choice && B.lastChoiceBtn) B.lastChoiceBtn.classList.add('x');
    setHint('bad','唔啱呀…怪獸反擊！');
    await monsterAttack(); if(tk!==B.token) return;
    setChestTimer(B.rwrong);
    const c=chant(q.a,q.b);
    setHint('bad', B.mode==='timed' ? '唔緊要！記住：' : '唔緊要！記住，再試下！', q.a+' × '+q.b+' = '+q.ans+'　'+c);
    if(DATA.settings.autoSpeak && !DATA.settings.muted) Speech.speak(c);
    if(B.mode==='timed'){ await sleep(1500); if(tk!==B.token) return; B.busy=false; nextQuestion(); return; }
    B.input=''; renderAns(); B.busy=false;
  }
}
function roundWon(){
  const acc = B.rq ? B.rfirst/B.rq : 1; const stars = acc>=.9?3:acc>=.7?2:1; const boss=B.type==='dada'; const m=MONS[B.type];
  DATA.stats.monsters++; const newDex=dexAdd(B.type); if(m.boss) DATA.stats.bosses++; if(boss) DATA.stats.dada=(DATA.stats.dada||0)+1;
  const asked=Object.keys(B.rtables).map(Number); const upgraded=[];
  asked.forEach(t=>{ const n=B.rtables[t]||0; if(n<3) return; let tier=stars; if(n<5) tier=Math.min(tier,1); else if(n<8) tier=Math.min(tier,2);
    const prev=DATA.badges[t]||0; if(tier>prev){ DATA.badges[t]=tier; upgraded.push(t); } });
  save();
  heroPose('win'); Sfx.victory(); $('#combo').classList.remove('show'); confetti();
  const msg = stars===3 ? '超勁！你係乘數表英雄！' : stars===2 ? '好叻呀！繼續加油！' : '做得好！多啲練習會更叻！';
  const next = B.round < B.order.length-1 ? B.order[B.round+1] : null;
  let medalBlock='';
  if(B.tables.length===1){
    const t=B.tables[0], n=B.rtables[t]||0, tier=DATA.badges[t]||0;
    if(n>=3 && tier){ const tn=['','銅','銀','金'][tier]; medalBlock='<div class="rmedal">'+medalSVG(t,tier)+'<div class="mt">'+t+' 乘數表<br>'+tn+'勳章！</div></div>'; }
    else medalBlock='<div class="rstat">再答多幾題 '+t+' 乘數表，就可以攞勳章啦！</div>';
  } else if(upgraded.length){
    medalBlock='<div class="rstat">勳章升級：'+upgraded.map(t=>t+' 乘數表'+['','銅','銀','金'][DATA.badges[t]]).join('、')+'</div>';
  } else {
    medalBlock='<div class="rstat">混合練習要每個乘數表答夠幾題先攞勳章！</div>';
  }
  const html = '<h3>'+(boss?'打敗咗三面怪人達達！':m.friend?'同'+m.name+'特訓完成！':'打敗咗'+m.name+'！')+'</h3>'+(newDex?'<div class="rdex">怪獸圖鑑新收錄：'+m.name+'！</div>':'')+(m.friend?'<div class="rstat">'+m.name+'係超人奧米加嘅好夥伴！</div>':'')+
    '<div class="rstars">'+[0,1,2].map(i=>starSVG(i<stars)).join('')+'</div>'+
    medalBlock+
    '<div class="rstat">第一次就答啱：<b>'+B.rfirst+' / '+B.rq+'</b> 題</div>'+
    '<div class="rstat">最高連擊：<b>'+B.rMaxCombo+'</b></div>'+(B.gotCoins?'<div class="rstat">食錢怪吐出：<b style="color:#ffe14d">'+B.gotCoins+' 個金幣！</b></div>':'')+
    '<div class="rmsg">'+(boss?'超人奧米加大勝利！你係乘數表英雄！':msg)+'</div>'+
    '<div class="rbtns">'+(next?'<button class="btn" id="rNext">'+icon('bolt')+(next==='dada'?'最終關：挑戰三面怪人達達！':MONS[next].boss?'下一關：'+MONS[next].short+'出現！':'下一關')+'</button>':'<button class="btn" id="rAgain">'+icon('bolt')+'再玩一次</button>')+
    '<button class="btn blue small" id="rPick">揀過乘數表</button><button class="btn gray small" id="rHome">返主頁</button></div>';
  showResult(html, stars);
  const rn=$('#rNext'); if(rn) rn.addEventListener('click',()=>{ Sfx.click(); hideResult(); B.round++; startRound(B.order[B.round]); });
  const ra=$('#rAgain'); if(ra) ra.addEventListener('click',()=>{ Sfx.click(); startSession('battle', B.tables); });
  $('#rPick').addEventListener('click',()=>{ Sfx.click(); endBattle(); openSetup('battle'); });
  $('#rHome').addEventListener('click',()=>{ Sfx.click(); goHome(); });
}
function showResult(html, stars){ const o=$('#result'); $('#resultCard').innerHTML=html; o.classList.add('show');
  $$('#resultCard .rstars svg.on').forEach((s,i)=>{ s.style.animationDelay=(0.35+i*0.35)+'s'; setTimeout(()=>Sfx.star(i), 350+i*350); });
}
function confetti(){ const w=stageEl.clientWidth, h=stageEl.clientHeight; for(let i=0;i<5;i++) setTimeout(()=>FX.burst(rand(w*.15,w*.85), rand(h*.1,h*.5), {n:26,speed:8,shape:'star',colors:['#ffe066','#ff7ad9','#7ff0ff','#9dff6b','#fff'],size:10,life:80,gravity:.1}), i*220); }
function hideResult(){ $('#result').classList.remove('show'); }

/* timed */
function startTimer(){ stopTimer(); B.endAt=Date.now()+60000; B.paused=false; B._freezeAt=0; let lastSec=60;
  B.timer=setInterval(()=>{
    if(B.paused || B.busy){ if(!B._freezeAt) B._freezeAt=Date.now(); return; }
    if(B._freezeAt){ B.endAt+=Date.now()-B._freezeAt; B._freezeAt=0; }
    B.timeLeft=Math.max(0,(B.endAt-Date.now())/1000); const s=Math.ceil(B.timeLeft); const tb=$('#timerBox');
    if(tb){ tb.textContent=s+'秒'; tb.classList.toggle('low', s<=10); }
    if(s!==lastSec){ lastSec=s; if(s<=10 && s>0) Sfx.tick(); }
    if(B.timeLeft<=0) timedEnd(); }, 100); }
function stopTimer(){ clearInterval(B.timer); B.timer=null; B._freezeAt=0; }
function timedEnd(){ stopTimer(); B.token++; B.busy=true; const key='t:'+B.tables.join(','); const prev=DATA.best[key]||0; const isNew=B.score>prev;
  if(isNew) DATA.best[key]=B.score; DATA.best.all=Math.max(DATA.best.all||0,B.score); save();
  heroPose('win'); Sfx.victory(); const stars = B.score>=20?3:B.score>=10?2:1;
  const html='<h3>時間到！</h3><div class="rstat">60秒內答啱咗</div><div class="bigscore">'+B.score+'</div><div class="rstat">題</div>'+
    (isNew&&B.score>0?'<div><span class="newrec">新紀錄！</span></div>':'')+
    '<div class="rstars">'+[0,1,2].map(i=>starSVG(i<stars)).join('')+'</div>'+
    '<div class="rstat">呢個組合最佳紀錄：<b>'+Math.max(prev,B.score)+'</b> 題</div>'+
    '<div class="rmsg">'+(stars===3?'快過光速！':stars===2?'好快手呀！':'再挑戰一次，一定更快！')+'</div>'+
    '<div class="rbtns"><button class="btn orange" id="rAgain">'+icon('clock')+'再挑戰</button><button class="btn blue small" id="rPick">揀過乘數表</button><button class="btn gray small" id="rHome">返主頁</button></div>';
  showResult(html, stars);
  $('#rAgain').addEventListener('click',()=>{ Sfx.click(); startSession('timed', B.tables); });
  $('#rPick').addEventListener('click',()=>{ Sfx.click(); endBattle(); openSetup('timed'); });
  $('#rHome').addEventListener('click',()=>{ Sfx.click(); goHome(); }); }
function endBattle(){ B.token++; stopTimer(); B.busy=true; FX.clear(); if(fxLayer) fxLayer.innerHTML=''; $$('#stage .rainbowbg').forEach(e=>e.remove()); const hs=heroSvgEl(); if(hs){ hs.classList.remove('aura','rainbow','no-slug'); } }

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
  $('#stats').innerHTML = [['打敗怪獸',s.monsters],['打敗達達',s.dada||0],['最高連擊',s.maxCombo],['60秒最佳',DATA.best.all||0],['識晒題數',mastered],['金幣',s.coins||0]].map(x=>'<div class="stat"><b>'+x[1]+'</b><span>'+x[0]+'</span></div>').join('');
  let g='<tr><th>×</th>'+[1,2,3,4,5,6,7,8,9].map(b=>'<th>'+b+'</th>').join('')+'</tr>';
  [1,2,3,4,5,6,7,8,9,10].forEach(a=>{ g+='<tr><th>'+a+'</th>'; for(let b=1;b<=9;b++){ const m=mastery(a+'x'+b); g+='<td class="m'+m+'" title="'+a+'×'+b+'">'+(a*b)+'</td>'; } g+='</tr>'; });
  $('#mgrid').innerHTML=g;
  const weak=facts.filter(k=>(DATA.facts[k].p||0)>0).sort((x,y)=>DATA.facts[y].p-DATA.facts[x].p).slice(0,10);
  $('#weak').innerHTML = weak.length ? weak.map(k=>{ const [a,b]=k.split('x').map(Number); return '<span>'+a+' × '+b+' = '+(a*b)+'</span>'; }).join('') : '<div style="opacity:.8">暫時冇！繼續保持 👍</div>'.replace(' 👍','');
  renderDex();
  $('#badges').innerHTML = [1,2,3,4,5,6,7,8,9,10].map(t=>{ const tier=DATA.badges[t]||0; return '<div class="badge">'+medalSVG(t,tier)+'<div>'+(tier?['','銅','銀','金'][tier]+'勳章':'未有')+'</div></div>'; }).join('');
}

function renderDex(){ const dex=DATA.dex||{}; const got=DEX_ORDER.filter(t=>dex[t]).length;
  $('#dexCount').textContent=got+' / '+DEX_ORDER.length;
  $('#dex').innerHTML=DEX_ORDER.map((t,i)=>{ const m=MONS[t], n=dex[t]||0; const tag=m.friend?'<i class="dtag f">夥伴</i>':m.final?'<i class="dtag b">大頭目</i>':m.boss?'<i class="dtag b">頭目</i>':m.omega?'<i class="dtag o">奧米加</i>':'';
    return '<div class="dcard'+(n?'':' locked')+'"><div class="dimg">'+monsterSVG(t,'dx'+i)+'</div><div class="dname">'+(n?m.name:'？？？')+'</div>'+(n?'<div class="dn">'+(m.friend?'特訓':'打敗')+' ×'+n+'</div>':'<div class="dn">未遇到</div>')+tag+'</div>'; }).join(''); }

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
  $('#resetBtn').addEventListener('click',()=>confirmBox('真係要清除晒所有進度同勳章？','清除','唔好',v=>{ if(v){ const st=DATA.settings; DATA=defaultData(); DATA.settings=st; save(); renderProgress(); } }));
  document.addEventListener('keydown', e=>{
    if($('#modal').classList.contains('show')){ if(e.key==='Escape') closeModal(false); if(e.key==='Enter'){ e.preventDefault(); closeModal(true);} return; }
    if(current==='battle'){
      if($('#result').classList.contains('show')){ if(e.key==='Enter'){ e.preventDefault(); const b=$('#resultCard .rbtns .btn'); if(b) b.click(); } return; }
      if(B.choice){ if(/^[1-4]$/.test(e.key)){ const b=$$('#choices .choice')[+e.key-1]; if(b) b.click(); } return; }
      if(/^[0-9]$/.test(e.key)){ keyIn(e.key); pressKey(e.key); e.preventDefault(); }
      else if(e.key==='Backspace'){ keyIn('del'); pressKey('del'); e.preventDefault(); }
      else if(e.key==='Enter'){ keyIn('ok'); pressKey('ok'); e.preventDefault(); }
    } else if(current==='learn'){
      if(e.key==='ArrowRight'){ stopAuto(); learnNext(); } else if(e.key==='ArrowLeft'){ stopAuto(); learnPrev(); } else if(e.key===' '){ e.preventDefault(); Speech.speak(chant(L.t,L.i)); } }
  });
}
function pressKey(k){ const b=$('#keypad .key[data-k="'+k+'"]'); if(!b) return; b.classList.add('press'); setTimeout(()=>b.classList.remove('press'),110); }
if(/[?&]test=1/.test(location.search)) window.__ut = { B:B, force:k=>{ B.forceMove=k; }, gotoRound:i=>{ B.token++; B.round=i; hideResult(); startRound(B.order[i]); }, startRound:t=>{ B.token++; hideResult(); startRound(t); }, dadaSwitch:()=>dadaSwitch(true), dex:list=>{ DATA.dex={}; list.forEach(t=>DATA.dex[t]=1+(t.length%3)); save(); renderProgress(); }, order:o=>{ B.order=o; } };
if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', init); else init();
