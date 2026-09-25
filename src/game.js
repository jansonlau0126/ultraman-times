/* ===== GAME LOGIC ===== */
const $ = (s, r) => (r||document).querySelector(s);
const $$ = (s, r) => Array.from((r||document).querySelectorAll(s));
const rand = (a,b)=> a + Math.random()*(b-a);
const randi = (a,b)=> Math.floor(rand(a,b+1));
const pick = arr => arr[Math.floor(Math.random()*arr.length)];
const shuffle = arr => { for(let i=arr.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); const t=arr[i]; arr[i]=arr[j]; arr[j]=t; } return arr; };
const sleep = ms => new Promise(r=>setTimeout(r, ms));
function play(el, kf, opts){ try{ const a=el.animate(kf, opts); return a.finished.catch(()=>{}); }catch(e){ return Promise.resolve(); } }

/* ---------- storage ---------- */
const STORE_KEY = 'ultraTimesHK_v1';
function defaultData(){ return {facts:{}, badges:{}, best:{}, stats:{monsters:0,bosses:0,maxCombo:0,answered:0}, settings:{muted:false, choice:false, tables:[2,3,4,5], autoSpeak:true}}; }
function loadData(){
  const def = defaultData();
  try{ const raw = localStorage.getItem(STORE_KEY); if(raw){ const d = JSON.parse(raw);
    return {facts:d.facts||{}, badges:d.badges||{}, best:d.best||{}, stats:Object.assign(def.stats, d.stats||{}), settings:Object.assign(def.settings, d.settings||{})}; } }catch(e){}
  return def;
}
let DATA = loadData();
function save(){ try{ localStorage.setItem(STORE_KEY, JSON.stringify(DATA)); }catch(e){} }

/* ---------- 九因歌 chant ---------- */
const DIG = '零一二三四五六七八九';
function cnNum(n){ if(n<10) return DIG[n]; if(n===100) return '一百'; const t=Math.floor(n/10), u=n%10; return (t===1?'':DIG[t])+'十'+(u?DIG[u]:''); }
function chant(a,b){
  if(a>9||b>9) return cnNum(a)+'乘'+cnNum(b)+'等於'+cnNum(a*b);
  const x=Math.min(a,b), y=Math.max(a,b), p=x*y;
  return DIG[x]+DIG[y]+(p<10?'得':'')+(p===10?'一十':cnNum(p));
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
  appear(){ this.tone(110,.6,{type:'sawtooth',vol:.1,to:70}); this.noise(.5,{vol:.18,type:'lowpass',f:500}); }
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
    c.globalCompositeOperation='lighter';
    for(const p of this.parts){ p.life+=k60; const k=Math.max(0,1-p.life/p.max);
      if(p.ring){ c.globalAlpha=k; c.strokeStyle=p.color; c.lineWidth=7*k+1; c.beginPath(); c.arc(p.x,p.y,p.size+(1-k)*120,0,Math.PI*2); c.stroke(); continue; }
      p.vx*=Math.pow(p.drag,k60); p.vy=p.vy*Math.pow(p.drag,k60)+p.g*k60; p.x+=p.vx*k60; p.y+=p.vy*k60; p.rot+=p.vr*k60;
      c.globalAlpha=k; c.fillStyle=p.color;
      if(p.shape==='star') drawStar(c,p.x,p.y,p.size*(.6+.4*k),p.rot); else { c.beginPath(); c.arc(p.x,p.y,Math.max(.5,p.size*(.4+.6*k)),0,Math.PI*2); c.fill(); } }
    c.globalAlpha=1; c.globalCompositeOperation='source-over';
    if(this.parts.length) this.raf=requestAnimationFrame(t=>this.loop(t)); else { this.raf=0; c.clearRect(0,0,this.w,this.h); } },
  clear(){ this.parts=[]; }
};

/* ---------- screens ---------- */
let current = 'home';
function show(id){
  $$('.screen').forEach(s=>s.classList.toggle('active', s.id===id));
  current = id; document.body.dataset.screen = id;
  if(id!=='learn') stopAuto();
  if(id==='battle') requestAnimationFrame(()=>{ layoutStage(); FX.resize(); });
  const sc=$('#'+id); if(sc) sc.scrollTop=0;
}
function goHome(){ endBattle(); Speech.stop(); show('home'); }

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
function initHome(){
  $('#homeHero').innerHTML = '<div class="hero-bob">'+heroSVG('hh')+'</div>';
  $('#homeMon').innerHTML = '<div class="mon-bob">'+monsterSVG('fire','hm')+'</div>';
  $('#homeHero').addEventListener('click', ()=>{ const h=$('#homeHero .hero'); const pose=pick(['pose-punch','pose-win','pose-disc','pose-beam','pose-kick']);
    h.className.baseVal='hero '+pose; Sfx.whoosh(); setTimeout(()=>{ h.className.baseVal='hero'; }, 700); });
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
function learnNext(){ if(L.i<9){ L.i++; renderLearn(true); Sfx.click(); } else { stopAuto(); Sfx.victory();
  const c=$('.lcard').getBoundingClientRect(); const lay=document.createElement('div'); lay.className='movename'; lay.style.position='fixed'; lay.style.left=(c.left+c.width/2)+'px'; lay.style.top=(c.top+c.height*0.4)+'px'; lay.textContent='好叻呀！'; document.body.appendChild(lay);
  play(lay,[{transform:'translate(-50%,-50%) scale(.2)',opacity:0},{transform:'translate(-50%,-50%) scale(1.2)',opacity:1,offset:.3},{transform:'translate(-50%,-50%) scale(1)',opacity:1,offset:.8},{transform:'translate(-50%,-50%) scale(1.2)',opacity:0}],{duration:1500}).then(()=>lay.remove()); } }
function learnPrev(){ if(L.i>1){ L.i--; renderLearn(true); Sfx.click(); } }
function stopAuto(){ L.auto=false; clearInterval(L.timer); L.timer=null; const b=$('#lAuto'); if(b) b.innerHTML=icon('play')+'<span class="lbl">自動</span>'; }
function toggleAuto(){ if(L.auto){ stopAuto(); return; } L.auto=true; $('#lAuto').innerHTML=icon('pause')+'<span class="lbl">停</span>'; if(L.i>=9){ L.i=1; renderLearn(true); }
  L.timer=setInterval(()=>{ if(L.i>=9){ stopAuto(); return; } learnNext(); }, 3200); }
function initLearn(){
  $('#lBack').addEventListener('click',()=>{ Sfx.click(); buildLearnTiles(); show('learnPick'); });
  $('#lPrev').addEventListener('click',()=>{ stopAuto(); learnPrev(); });
  $('#lNext').addEventListener('click',()=>{ stopAuto(); learnNext(); });
  $('#lSpeak').addEventListener('click',()=>{ Speech.speak(chant(L.t,L.i)); play($('#lChant'),[{transform:'scale(1)'},{transform:'scale(1.15)'},{transform:'scale(1)'}],{duration:400}); });
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
  applySel(DATA.settings.tables||[2]); syncSeg(); show('setup'); }
function selTables(){ return $$('#setupTiles .tile.on').map(b=>+b.dataset.t).sort((a,b)=>a-b); }
function applySel(arr){ $$('#setupTiles .tile').forEach(b=>b.classList.toggle('on', arr.indexOf(+b.dataset.t)>=0)); syncSetup(); }
function syncSetup(){ const t=selTables(); DATA.settings.tables=t; save(); $('#startBtn').disabled = t.length===0; $('#setupWarn').textContent = t.length? '' : '請揀最少一個乘數表呀！';
  if(setupMode==='timed'){ const best=DATA.best['t:'+t.join(',')]||0; $('#bestTxt').textContent = t.length ? ('呢個組合最佳紀錄：'+best+' 題'+(DATA.best.all?('　｜　總最佳：'+DATA.best.all+' 題'):'')) : ''; } else $('#bestTxt').textContent=''; }
function syncSeg(){ $$('#modeSeg button').forEach(b=>b.classList.toggle('on', (+b.dataset.choice===1)===!!DATA.settings.choice)); }
function initSetup(){
  $('#selMix').addEventListener('click',()=>{ Sfx.click(); applySel([2,3,4,5,6,7,8,9]); });
  $('#selNone').addEventListener('click',()=>{ Sfx.click(); applySel([]); });
  $$('#modeSeg button').forEach(b=>b.addEventListener('click',()=>{ Sfx.click(); DATA.settings.choice = b.dataset.choice==='1'; save(); syncSeg(); }));
  $('#startBtn').addEventListener('click',()=>{ const t=selTables(); if(!t.length) return; Sfx.click(); startSession(setupMode, t); });
}

/* ---------- BATTLE ---------- */
const NORMALS = ['fire','ice','thunder','rock','poison','sea'];
const MOVES = { beam:'十字光線！', kick:'飛踢！', disc:'光輪斬！', punch:'光之拳！', super:'超級十字光線！', ultimate:'終極光之風暴！' };
const B = {token:0, busy:true, input:'', recent:[]};
let stageEl, heroWrap, monWrap, fxLayer, monCounter=0;
const K = () => B.mode==='timed' ? .65 : 1;
function heroSvgEl(){ return $('#heroBob .hero'); }
function monSvgEl(){ return $('#monBob .mon'); }
function mk(sel, root){ return (root||stageEl).querySelector(sel); }
function relPos(el){ const s=stageEl.getBoundingClientRect(), r=el.getBoundingClientRect(); return {x:r.left-s.left+r.width/2, y:r.top-s.top+r.height/2, w:r.width, h:r.height, l:r.left-s.left, t:r.top-s.top}; }
function heroPose(p){ const h=heroSvgEl(); if(!h) return; const keep=[]; h.classList.forEach(c=>{ if(c.indexOf('t-')===0||c==='aura') keep.push(c); }); h.setAttribute('class', ['hero'].concat(keep, p&&p!=='idle'?['pose-'+p]:[]).join(' ')); }
function setChestTimer(wrongs){ const h=heroSvgEl(); if(!h) return; const col = wrongs<=0?'#38bdf8': wrongs===1?'#facc15':'#ef4444'; h.style.setProperty('--tc',col); h.classList.toggle('t-blink', wrongs>=3); }
function layoutStage(){ if(!stageEl) return; const w=stageEl.clientWidth, h=stageEl.clientHeight; if(!w||!h) return;
  const hh = Math.min(h*.66, w*.38*1.5); heroWrap.style.height=hh+'px'; heroWrap.style.width=(hh/1.5)+'px';
  const boss = B.type==='boss'; const mh = Math.min(h*(boss?.7:.6), w*(boss?.5:.44)); monWrap.style.height=mh+'px'; monWrap.style.width=mh+'px'; }

function fxEl(cls, html){ const e=document.createElement('div'); e.className=cls; if(html) e.innerHTML=html; fxLayer.appendChild(e); return e; }
function shake(px){ const a=px||8; play(stageEl,[{transform:'translate(0,0)'},{transform:'translate('+(-a)+'px,'+(a*.5)+'px)'},{transform:'translate('+a+'px,'+(-a*.4)+'px)'},{transform:'translate('+(-a*.6)+'px,'+(-a*.3)+'px)'},{transform:'translate('+(a*.4)+'px,'+(a*.3)+'px)'},{transform:'translate(0,0)'}],{duration:420}); }
function flash(color, op){ const f=fxEl('flash'); if(color) f.style.background=color; play(f,[{opacity:op||.75},{opacity:0}],{duration:380}).then(()=>f.remove()); }
function showMoveName(text, cls, dur){ const e=fxEl('movename '+(cls||'')); e.textContent=text;
  return play(e,[{transform:'translate(-50%,-50%) scale(.2) rotate(-10deg)',opacity:0},{transform:'translate(-50%,-50%) scale(1.25) rotate(3deg)',opacity:1,offset:.2},{transform:'translate(-50%,-50%) scale(1) rotate(0)',opacity:1,offset:.32},{transform:'translate(-50%,-50%) scale(1)',opacity:1,offset:.85},{transform:'translate(-50%,-50%) scale(1.3)',opacity:0}],{duration:(dur||1400)*K(),easing:'ease-out'}).then(()=>e.remove()); }
function floatText(cls, text, x, y){ const e=fxEl(cls); e.textContent=text; e.style.left=x+'px'; e.style.top=y+'px';
  play(e,[{transform:'translate(-50%,0) scale(.5)',opacity:0},{transform:'translate(-50%,-30px) scale(1.2)',opacity:1,offset:.25},{transform:'translate(-50%,-70px) scale(1)',opacity:0}],{duration:1100}).then(()=>e.remove()); }
function impactStar(t, text){ const e=fxEl('impact','<svg viewBox="0 0 100 100"><polygon points="50,2 60,32 92,18 72,46 98,60 66,66 74,96 50,76 26,96 34,66 2,60 28,46 8,18 40,32" fill="#ffe14d" stroke="#ff3b3b" stroke-width="4" stroke-linejoin="round"/></svg><span>'+text+'</span>');
  e.style.left=t.x+'px'; e.style.top=t.y+'px'; play(e,[{transform:'scale(0) rotate(-20deg)',opacity:1},{transform:'scale(1.15) rotate(5deg)',opacity:1,offset:.3},{transform:'scale(1)',opacity:1,offset:.7},{transform:'scale(1.2)',opacity:0}],{duration:700}).then(()=>e.remove()); }
function makeBeam(o,t,thick,cls,dur){ const dx=t.x-o.x, dy=t.y-o.y, len=Math.hypot(dx,dy), ang=Math.atan2(dy,dx)*180/Math.PI; const e=fxEl('beam '+(cls||''));
  e.style.left=o.x+'px'; e.style.top=(o.y-thick/2)+'px'; e.style.width=len+'px'; e.style.height=thick+'px'; e.style.transformOrigin='0 50%';
  const R='rotate('+ang+'deg)';
  play(e,[{transform:R+' scaleX(0)',opacity:1},{transform:R+' scaleX(1)',opacity:1,offset:.22},{transform:R+' scaleX(1) scaleY(1.25)',opacity:1,offset:.5},{transform:R+' scaleX(1) scaleY(.9)',opacity:1,offset:.8},{transform:R+' scaleX(1) scaleY(0)',opacity:0}],{duration:dur*K(),easing:'ease-out'}).then(()=>e.remove()); return e; }
function speedLines(){ const h=stageEl.clientHeight, w=stageEl.clientWidth; for(let i=0;i<7;i++){ const e=fxEl('speedline'); e.style.top=rand(h*.2,h*.85)+'px'; e.style.left=rand(0,w*.3)+'px'; e.style.width=rand(60,160)+'px';
  play(e,[{transform:'translateX(0)',opacity:0},{opacity:.9,offset:.3},{transform:'translateX('+(w*.5)+'px)',opacity:0}],{duration:380,delay:i*30}).then(()=>e.remove()); } }
const RAINBOW=['#ff7ad9','#ffe066','#7ff0ff','#b58cff','#9dff6b','#fff'];

async function mvBeam(hit, sup){ heroPose('beam'); Sfx.charge(); await sleep(60);
  const o=relPos(mk('.mk-beam',heroWrap)), t=relPos(mk('.mk-core',monWrap));
  FX.burst(o.x,o.y,{n:16,speed:3,colors:sup?RAINBOW:['#fff','#bff'],gravity:0,life:26,size:5});
  await sleep(300*K()); Sfx.beam(); makeBeam(o,t,sup?34:18,sup?'super':'',sup?1400:950);
  if(sup) flash('#fff6c4',.45);
  await sleep(220*K()); hit(); shake(sup?14:8);
  const iv=setInterval(()=>FX.burst(t.x,t.y,{n:sup?14:8,speed:sup?9:6,colors:sup?RAINBOW:['#fff','#aef','#ffef6b'],life:32,size:sup?8:6,shape:sup?'star':'circle'}),70);
  await sleep((sup?850:520)*K()); clearInterval(iv); if(sup){ FX.ring(t.x,t.y,'#ffe066'); FX.ring(t.x,t.y,'#ff7ad9',36); }
  await sleep(260*K()); heroPose('idle'); }
async function mvKick(hit){ const h=relPos(heroWrap), m=relPos(monWrap); const dx=(m.l+m.w*.28)-(h.l+h.w*.95);
  heroPose('kick'); Sfx.whoosh(); speedLines();
  const a=play(heroWrap,[{transform:'translate(0,0) rotate(0)'},{transform:'translate('+(dx*.45)+'px,'+(-h.h*.42)+'px) rotate(-14deg)',offset:.35},{transform:'translate('+dx+'px,'+(-h.h*.1)+'px) rotate(-8deg)',offset:.55},{transform:'translate('+dx+'px,'+(-h.h*.1)+'px) rotate(-8deg)',offset:.66},{transform:'translate(0,0) rotate(0)'}],{duration:1150*K(),easing:'ease-in-out'});
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
  play(d,[{transform:'translate('+dx+'px,'+dy+'px) scale(1.25)',opacity:1},{transform:'translate('+dx+'px,'+dy+'px) scale(2.2)',opacity:0}],{duration:260,fill:'forwards'}).then(()=>d.remove());
  await sleep(350*K()); heroPose('idle'); }
async function mvPunch(hit){ const h=relPos(heroWrap), m=relPos(monWrap); const dx=(m.l+m.w*.22)-(h.l+h.w*.98);
  heroPose('punch'); Sfx.whoosh(); speedLines();
  const a=play(heroWrap,[{transform:'translateX(0)'},{transform:'translateX('+dx+'px)',offset:.32},{transform:'translateX('+dx+'px)',offset:.6},{transform:'translateX(0)'}],{duration:950*K(),easing:'ease-in-out'});
  await sleep(320*K()); const t=relPos(mk('.mk-core',monWrap)); hit(); Sfx.bigHit(); shake(12); impactStar(t,'轟！');
  FX.burst(t.x,t.y,{n:28,speed:9,colors:['#fff','#ffe14d','#ff5b5b'],size:8,shape:'star'});
  await a; heroPose('idle'); }
async function mvUltimate(hit){ const hs=heroSvgEl(); hs.classList.add('aura'); flash('#bff3ff',.5); Sfx.charge(); setTimeout(()=>Sfx.charge(),250);
  const rise=play(heroWrap,[{transform:'translateY(0)'},{transform:'translateY(-12%)'}],{duration:420*K(),fill:'forwards',easing:'ease-out'});
  const hp=relPos(heroWrap); for(let i=0;i<3;i++) setTimeout(()=>FX.burst(hp.x,hp.y,{n:18,speed:5,colors:RAINBOW,gravity:-.05,life:40,size:6,shape:'star'}), i*120);
  await rise; await sleep(120*K());
  heroPose('beam'); await sleep(50); const o=relPos(mk('.mk-beam',heroWrap)), t=relPos(mk('.mk-core',monWrap));
  Sfx.beam(); makeBeam(o,t,44,'super',1600);
  const w=stageEl.clientWidth; for(let i=0;i<3;i++){ const sz=Math.max(40,heroWrap.clientHeight*.26); const sx=rand(w*.2,w*.6), sy=-sz; const d=fxEl('disc','<b><i></i></b>'); d.style.cssText='left:'+(sx-sz/2)+'px;top:'+(sy-sz/2)+'px;width:'+sz+'px;height:'+sz+'px';
    play(d,[{transform:'translate(0,0)'},{transform:'translate('+(t.x-sx)+'px,'+(t.y-sy)+'px)'}],{duration:520*K(),delay:i*140,easing:'ease-in',fill:'forwards'}).then(()=>{ FX.ring(t.x,t.y,'#fff'); d.remove(); }); }
  await sleep(300*K()); hit(); shake(18); flash('#fff',.7); Sfx.bigHit();
  const iv=setInterval(()=>FX.burst(t.x+rand(-20,20),t.y+rand(-20,20),{n:16,speed:11,colors:RAINBOW,life:36,size:9,shape:'star'}),70);
  await sleep(1000*K()); clearInterval(iv); FX.ring(t.x,t.y,'#ffe066',40);
  await play(heroWrap,[{transform:'translateY(-12%)'},{transform:'translateY(0)'}],{duration:350*K(),easing:'ease-in'});
  heroWrap.getAnimations().forEach(a=>a.cancel()); hs.classList.remove('aura'); heroPose('idle'); }

async function performMove(kind, hit){
  const name=MOVES[kind]; showMoveName(name, (kind==='super'||kind==='ultimate')?'super':'', kind==='ultimate'?1900:1400);
  if(kind==='beam') return mvBeam(hit,false); if(kind==='super') return mvBeam(hit,true);
  if(kind==='kick') return mvKick(hit); if(kind==='disc') return mvDisc(hit); if(kind==='punch') return mvPunch(hit); return mvUltimate(hit); }
function chooseMove(first){ if(first && B.mode!=='timed'){ if(B.combo>=5) return 'ultimate'; if(B.combo>=3) return 'super'; }
  const opts=['beam','kick','disc','punch'].filter(m=>m!==B.lastMove); const mv=pick(opts); B.lastMove=mv; return mv; }

function damageMonster(dmg){ B.hp=Math.max(0,B.hp-dmg); $('#hpFill').style.width=(100*B.hp/B.maxHp)+'%';
  const ms=monSvgEl(); if(!ms) return; ms.classList.add('ouch'); setTimeout(()=>{ if(B.hp>0) ms.classList.remove('ouch'); }, 650);
  play(ms,[{transform:'translateX(0) rotate(0)',filter:'brightness(1)'},{transform:'translateX(8%) rotate(7deg)',filter:'brightness(2.6)'},{transform:'translateX(-3%) rotate(-2deg)',filter:'brightness(1)'},{transform:'translateX(4%) rotate(3deg)',filter:'brightness(2)'},{transform:'translateX(0) rotate(0)',filter:'brightness(1)'}],{duration:560});
  const t=relPos(monWrap); floatText('dmg','-'+dmg, t.x, t.t+t.h*.15); }
async function monsterAttack(){ const s=MONS[B.type]; Sfx.growl();
  const lunge=play(monWrap,[{transform:'translateX(0)'},{transform:'translateX(-12%) rotate(-6deg)',offset:.4},{transform:'translateX(0)'}],{duration:700*K()});
  await sleep(260*K()); const o=relPos(mk('.mk-mouth',monWrap)), t=relPos(mk('.mk-chest',heroWrap));
  const orb=fxEl('orb'); orb.style.background='radial-gradient(circle,#fff 0 22%,'+s.shot+' 45%,rgba(255,255,255,0) 72%)'; orb.style.left=o.x+'px'; orb.style.top=o.y+'px'; Sfx.whoosh();
  await play(orb,[{transform:'translate(0,0) scale(.5)'},{transform:'translate('+((t.x-o.x)/2)+'px,'+((t.y-o.y)/2-40)+'px) scale(1)'},{transform:'translate('+(t.x-o.x)+'px,'+(t.y-o.y)+'px) scale(1.3)'}],{duration:480*K(),easing:'ease-in',fill:'forwards'}); orb.remove();
  Sfx.bonk(); FX.burst(t.x,t.y,{n:16,colors:[s.shot,'#fff'],speed:5,size:6}); shake(6);
  play(heroSvgEl(),[{transform:'rotate(0)',filter:'brightness(1)'},{transform:'rotate(-9deg) translateX(-6px)',filter:'brightness(2)'},{transform:'rotate(-5deg)',filter:'brightness(1)'},{transform:'rotate(-7deg)',filter:'brightness(1.8)'},{transform:'rotate(0)',filter:'brightness(1)'}],{duration:620});
  const hp=relPos(heroWrap); floatText('ouchtxt', pick(['哎呀！','好痛呀！','唔緊要！']), hp.x, hp.t+hp.h*.05);
  await lunge; await sleep(250*K()); }
async function monsterExplode(){ const ms=monSvgEl(); ms.classList.add('ouch'); Sfx.noise(.8,{vol:.2,type:'lowpass',f:400});
  await play(ms,[{transform:'translate(0,0)',filter:'brightness(1)'},{transform:'translate(-4%,1%)',filter:'brightness(2.5)'},{transform:'translate(4%,-1%)',filter:'brightness(1)'},{transform:'translate(-4%,0)',filter:'brightness(2.5)'},{transform:'translate(4%,1%)',filter:'brightness(1)'},{transform:'translate(-3%,0)',filter:'brightness(3)'},{transform:'translate(0,0)',filter:'brightness(3)'}],{duration:800*K()});
  Sfx.explode(); flash('#fff',.85); shake(20); const t=relPos(mk('.mk-core',monWrap));
  FX.burst(t.x,t.y,{n:80,speed:14,shape:'star',colors:['#ffe066','#fff','#ff6bd6','#6bf0ff','#9dff6b'],size:13,life:75,gravity:.08});
  FX.ring(t.x,t.y,'#fff',32); FX.ring(t.x,t.y,'#ffe066',44);
  play(monWrap,[{transform:'scale(1) rotate(0)',opacity:1},{transform:'scale(1.45) rotate(18deg)',opacity:0}],{duration:520*K(),fill:'forwards'});
  showMoveName(B.mode==='timed'?'打低咗！':'打敗咗！','banner',1300);
  await sleep(1000*K()); }
async function monsterEnter(){ monWrap.getAnimations().forEach(a=>a.cancel()); Sfx.appear();
  const m=MONS[B.type]; showMoveName(m.boss?'大魔王出現！':(m.name+'出現！'),'banner',1500);
  await play(monWrap,[{transform:'translateX(130%)',opacity:0},{transform:'translateX(-6%)',opacity:1,offset:.7},{transform:'translateX(0)',opacity:1}],{duration:950*K(),easing:'ease-out'});
  shake(5); Sfx.hit(); }

function renderRoundHud(){
  if(B.mode==='timed'){ $('#roundLbl').innerHTML='<span class="timerbox" id="timerBox">'+Math.ceil(B.timeLeft)+'秒</span>'; $('#roundDots').innerHTML='<span>答啱：<b id="scoreLbl">'+B.score+'</b> 題</span>'; return; }
  const bossRound = B.type==='boss'; $('#roundLbl').textContent = bossRound ? '最終關：大魔王！' : '第 '+(B.round+1)+' 關';
  $('#roundDots').innerHTML = B.order.map((t,i)=>'<i class="'+(i<B.round?'done ':'')+(t==='boss'?'boss ':'')+(i===B.round?'cur':'')+'"></i>').join(''); }
function renderCombo(){ const c=$('#combo'); if(B.combo>=2){ c.textContent=B.combo+' 連擊！'; c.classList.add('show'); play(c,[{transform:'translateX(-50%) scale(1.6)'},{transform:'translateX(-50%) scale(1)'}],{duration:300,easing:'ease-out'}); } else c.classList.remove('show'); }

function startSession(mode, tables){
  endBattle(); B.token++;
  B.mode=mode; B.tables=tables.slice().sort((a,b)=>a-b); B.choice=!!DATA.settings.choice;
  B.combo=0; B.maxCombo=0; B.recent=[]; B.lastMove=null; B.busy=true; B.input='';
  $('#battle').classList.toggle('mode-choice', B.choice); hideResult(); FX.clear(); fxLayer.innerHTML='';
  if(!$('#heroBob .hero')) $('#heroBob').innerHTML=heroSVG('hb');
  heroWrap.getAnimations().forEach(a=>a.cancel());
  show('battle');
  if(mode==='timed'){ B.timeLeft=60; B.score=0; B.tq=0; B.monIdx=0; B.timedOrder=shuffle(NORMALS.slice()); B.order=[]; startRound(B.timedOrder[0]); startTimer(); }
  else { B.order=shuffle(NORMALS.slice()).slice(0,3).concat(['boss']); B.round=0; startRound(B.order[0]); }
}
async function startRound(type){
  const tk=B.token; B.type=type; const m=MONS[type];
  B.maxHp = B.mode==='timed' ? 40 : (m.boss?140:100); B.hp=B.maxHp;
  if(B.mode!=='timed'){ B.rq=0; B.rfirst=0; B.rwrong=0; B.rtables={}; B.rMaxCombo=0; B.combo=0; }
  else B.rwrong=0;
  monCounter++; $('#monBob').innerHTML = monsterSVG(type, 'mb'+monCounter);
  $('#monName').textContent = m.name+'・'+m.nick; $('#hpFill').style.width='100%';
  setChestTimer(0); heroPose('idle'); renderRoundHud(); renderCombo(); layoutStage();
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
  if(first && B.mode!=='timed'){ B.rq++; B.rtables[q.a]=1; }
  if(n===q.ans){
    Sfx.correct(); renderAns('good');
    if(first){ recordFact(q.key,true); B.combo++; if(B.mode!=='timed'){ B.rfirst++; B.rMaxCombo=Math.max(B.rMaxCombo,B.combo); } B.maxCombo=Math.max(B.maxCombo,B.combo); if(B.combo>DATA.stats.maxCombo){ DATA.stats.maxCombo=B.combo; save(); } }
    if(B.mode==='timed'){ B.score++; const s=$('#scoreLbl'); if(s) s.textContent=B.score; }
    setHint('good', pick(['答啱喇！','好叻呀！','勁呀！','冇錯！','正！']), q.a+' × '+q.b+' = '+q.ans+'　'+chant(q.a,q.b));
    if(B.choice && B.lastChoiceBtn) B.lastChoiceBtn.classList.add('right');
    renderCombo();
    let dmg = first ? (B.combo>=5?20:B.combo>=3?15:10) : 6; if(B.mode==='timed') dmg=10;
    const kind=chooseMove(first);
    await performMove(kind, ()=>damageMonster(dmg)); if(tk!==B.token) return;
    if(B.hp<=0){ await monsterExplode(); if(tk!==B.token) return;
      if(B.mode==='timed'){ B.monIdx++; startRound(B.timedOrder[B.monIdx%B.timedOrder.length]); return; }
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
  const acc = B.rq ? B.rfirst/B.rq : 1; const stars = acc>=.9?3:acc>=.7?2:1; const boss=B.type==='boss'; const m=MONS[B.type];
  DATA.stats.monsters++; if(boss) DATA.stats.bosses++;
  const asked=Object.keys(B.rtables).map(Number); asked.forEach(t=>{ DATA.badges[t]=Math.max(DATA.badges[t]||0, stars); }); save();
  heroPose('win'); Sfx.victory(); $('#combo').classList.remove('show'); confetti();
  const label = B.tables.length===1 ? B.tables[0] : '混'; const tierName=['','銅','銀','金'][stars];
  const msg = stars===3 ? '超勁！你係乘數表英雄！' : stars===2 ? '好叻呀！繼續加油！' : '做得好！多啲練習會更叻！';
  const next = B.round < B.order.length-1 ? B.order[B.round+1] : null;
  const html = '<h3>'+(boss?'打敗咗大魔王！':'打敗咗'+m.name+'！')+'</h3>'+
    '<div class="rstars">'+[0,1,2].map(i=>starSVG(i<stars)).join('')+'</div>'+
    '<div class="rmedal">'+medalSVG(label,stars)+'<div class="mt">'+(B.tables.length===1?label+' 乘數表':'混合乘數表')+'<br>'+tierName+'勳章！</div></div>'+
    '<div class="rstat">第一次就答啱：<b>'+B.rfirst+' / '+B.rq+'</b> 題</div>'+
    '<div class="rstat">最高連擊：<b>'+B.rMaxCombo+'</b></div>'+
    '<div class="rmsg">'+(boss?'你係真正嘅光之巨人！':msg)+'</div>'+
    '<div class="rbtns">'+(next?'<button class="btn" id="rNext">'+icon('bolt')+(next==='boss'?'最終關：挑戰大魔王！':'下一關')+'</button>':'<button class="btn" id="rAgain">'+icon('bolt')+'再玩一次</button>')+
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
function startTimer(){ stopTimer(); B.endAt=Date.now()+60000; B.paused=false; let lastSec=60;
  B.timer=setInterval(()=>{ if(B.paused) return; B.timeLeft=Math.max(0,(B.endAt-Date.now())/1000); const s=Math.ceil(B.timeLeft); const tb=$('#timerBox');
    if(tb){ tb.textContent=s+'秒'; tb.classList.toggle('low', s<=10); }
    if(s!==lastSec){ lastSec=s; if(s<=10 && s>0) Sfx.tick(); }
    if(B.timeLeft<=0) timedEnd(); }, 100); }
function stopTimer(){ clearInterval(B.timer); B.timer=null; }
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
function endBattle(){ B.token++; stopTimer(); B.busy=true; FX.clear(); if(fxLayer) fxLayer.innerHTML=''; }

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
  $('#stats').innerHTML = [['打敗怪獸',s.monsters],['打敗大魔王',s.bosses],['最高連擊',s.maxCombo],['60秒最佳',DATA.best.all||0],['識晒題數',mastered]].map(x=>'<div class="stat"><b>'+x[1]+'</b><span>'+x[0]+'</span></div>').join('');
  let g='<tr><th>×</th>'+[1,2,3,4,5,6,7,8,9].map(b=>'<th>'+b+'</th>').join('')+'</tr>';
  for(let a=1;a<=9;a++){ g+='<tr><th>'+a+'</th>'; for(let b=1;b<=9;b++){ const m=mastery(a+'x'+b); g+='<td class="m'+m+'" title="'+a+'×'+b+'">'+(a*b)+'</td>'; } g+='</tr>'; }
  $('#mgrid').innerHTML=g;
  const weak=facts.filter(k=>(DATA.facts[k].p||0)>0).sort((x,y)=>DATA.facts[y].p-DATA.facts[x].p).slice(0,10);
  $('#weak').innerHTML = weak.length ? weak.map(k=>{ const [a,b]=k.split('x').map(Number); return '<span>'+a+' × '+b+' = '+(a*b)+'</span>'; }).join('') : '<div style="opacity:.8">暫時冇！繼續保持 👍</div>'.replace(' 👍','');
  $('#badges').innerHTML = [1,2,3,4,5,6,7,8,9,10].map(t=>{ const tier=DATA.badges[t]||0; return '<div class="badge">'+medalSVG(t,tier)+'<div>'+(tier?['','銅','銀','金'][tier]+'勳章':'未有')+'</div></div>'; }).join('');
}

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
    if(current==='battle' && !$('#result').classList.contains('show')){ B.paused=true; const pAt=Date.now();
      confirmBox('要離開呢場戰鬥嗎？','離開','繼續打',v=>{ if(v) goHome(); else { if(B.endAt) B.endAt+=Date.now()-pAt; B.paused=false; } }); }
    else if(current==='learn'){ show('learnPick'); goHome(); }
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
if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', init); else init();
