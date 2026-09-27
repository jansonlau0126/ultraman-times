/* ===== ART: icons, hero, monsters, skyline, medals (all original drawings) ===== */
const ICONS = {
  home:'<path d="M3 11l9-8 9 8"/><path d="M5 10v10h5v-6h4v6h5V10"/>',
  sound:'<path d="M4 9h4l5-4v14l-5-4H4z" fill="currentColor"/><path d="M16 8.5a5 5 0 010 7M18.6 5.8a9 9 0 010 12.4"/>',
  mute:'<path d="M4 9h4l5-4v14l-5-4H4z" fill="currentColor"/><path d="M16.5 9.5l5 5M21.5 9.5l-5 5"/>',
  speaker:'<path d="M4 9h4l5-4v14l-5-4H4z" fill="currentColor"/><path d="M16 8.5a5 5 0 010 7M18.6 5.8a9 9 0 010 12.4"/>',
  book:'<path d="M4 5.5A2.5 2.5 0 016.5 3H20v15H6.5A2.5 2.5 0 004 20.5z"/><path d="M4 20.5V5.5"/><path d="M8 7.5h8M8 11h6"/>',
  bolt:'<path d="M13 2L4 14h7l-1 8 9-12h-7z" fill="currentColor"/>',
  clock:'<circle cx="12" cy="13" r="8"/><path d="M12 9v4l3 2M9.5 2.5h5"/>',
  medal:'<circle cx="12" cy="15" r="6"/><path d="M8 3l4 6 4-6"/><path d="M12 12.3l.9 1.8 2 .3-1.4 1.4.3 2-1.8-.9-1.8.9.3-2-1.4-1.4 2-.3z" fill="currentColor" stroke-width="1"/>',
  back:'<path d="M15 5l-7 7 7 7"/>',
  next:'<path d="M9 5l7 7-7 7"/>',
  play:'<path d="M7 4l13 8-13 8z" fill="currentColor"/>',
  pause:'<path d="M7 4h3.5v16H7zM13.5 4H17v16h-3.5z" fill="currentColor"/>',
  del:'<path d="M9 5h11v14H9l-6-7z"/><path d="M12 9l5 6M17 9l-5 6"/>',
  check:'<path d="M5 12.5l4.5 4.5L19 7"/>',
  trash:'<path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13"/>'
};
function icon(name){ return '<svg class="ic" viewBox="0 0 24 24" aria-hidden="true">'+(ICONS[name]||'')+'</svg>'; }
function fillIcons(root){ (root||document).querySelectorAll('[data-icon]').forEach(el=>{ el.innerHTML = icon(el.dataset.icon); }); }

/* Fan-art hero: chibi SD 超人（銀紅配金線、黃眼、圓形計時器）. Drawn from scratch — not official art. p = unique id prefix */
function pent(cx,cy,r){ const pts=[]; for(let i=0;i<5;i++){ const a=(-90+i*72)*Math.PI/180; pts.push((cx+Math.cos(a)*r).toFixed(1)+','+(cy+Math.sin(a)*r).toFixed(1)); } return pts.join(' '); }
function heroSVG(p){
  const sv='url(#'+p+'sv)', rd='url(#'+p+'rd)', gd='url(#'+p+'gd)', ol='#2a2438', OL=ol, RC='#e53935';
  const arm=(side)=>{
    /* side L: shoulder 62,118 ; R: 138,118 — stubby chibi limbs */
    if(side==='L') return '<g class="h-armL">'+
      '<path d="M62 118 C48 132 42 150 44 168" stroke="'+ol+'" stroke-width="20" fill="none" stroke-linecap="round"/>'+
      '<path d="M62 118 C48 132 42 150 44 168" stroke="'+sv+'" stroke-width="14" fill="none" stroke-linecap="round"/>'+
      '<path d="M62 118 C52 130 48 142 46 152" stroke="'+RC+'" stroke-width="14" fill="none" stroke-linecap="round"/>'+
      '<circle cx="44" cy="172" r="11" fill="'+sv+'" stroke="'+ol+'" stroke-width="2.2"/>'+
      '<path d="M38 168 Q44 164 50 168" stroke="#fff" stroke-width="1.6" fill="none" opacity=".7"/>'+
      '</g>';
    return '<g class="h-armR">'+
      '<path d="M138 118 C152 132 158 150 156 168" stroke="'+ol+'" stroke-width="20" fill="none" stroke-linecap="round"/>'+
      '<path d="M138 118 C152 132 158 150 156 168" stroke="'+sv+'" stroke-width="14" fill="none" stroke-linecap="round"/>'+
      '<path d="M138 118 C148 130 152 142 154 152" stroke="'+RC+'" stroke-width="14" fill="none" stroke-linecap="round"/>'+
      '<circle cx="156" cy="172" r="11" fill="'+sv+'" stroke="'+ol+'" stroke-width="2.2"/>'+
      '<path d="M150 168 Q156 164 162 168" stroke="#fff" stroke-width="1.6" fill="none" opacity=".7"/>'+
      '<circle class="mk-hand" cx="156" cy="172" r="1" fill="none"/>'+
      '</g>';
  };
  const legL = '<g class="h-legL">'+
    '<path d="M82 178 C74 198 70 218 66 242" stroke="'+ol+'" stroke-width="22" fill="none" stroke-linecap="round"/>'+
    '<path d="M82 178 C74 198 70 218 66 242" stroke="'+sv+'" stroke-width="15" fill="none" stroke-linecap="round"/>'+
    '<path d="M82 178 C76 196 72 210 70 224" stroke="'+RC+'" stroke-width="15" fill="none" stroke-linecap="round"/>'+
    '<path d="M54 238 Q66 232 78 240 L76 252 Q64 258 52 250 Z" fill="'+rd+'" stroke="'+ol+'" stroke-width="2.2" stroke-linejoin="round"/>'+
    '<path d="M58 242 L74 246" stroke="#ff9a90" stroke-width="2" opacity=".7"/>'+
    '</g>';
  const legR = '<g class="h-legR">'+
    '<path d="M118 178 C126 198 130 218 134 242" stroke="'+ol+'" stroke-width="22" fill="none" stroke-linecap="round"/>'+
    '<path d="M118 178 C126 198 130 218 134 242" stroke="'+sv+'" stroke-width="15" fill="none" stroke-linecap="round"/>'+
    '<path d="M118 178 C124 196 128 210 130 224" stroke="'+RC+'" stroke-width="15" fill="none" stroke-linecap="round"/>'+
    '<path d="M146 238 Q134 232 122 240 L124 252 Q136 258 148 250 Z" fill="'+rd+'" stroke="'+ol+'" stroke-width="2.2" stroke-linejoin="round"/>'+
    '<path d="M126 246 L142 242" stroke="#ff9a90" stroke-width="2" opacity=".7"/>'+
    '</g>';
  const kick = '<g class="h-kick">'+
    '<path d="M118 178 C148 170 176 166 188 164" stroke="'+ol+'" stroke-width="22" fill="none" stroke-linecap="round"/>'+
    '<path d="M118 178 C148 170 176 166 188 164" stroke="'+sv+'" stroke-width="15" fill="none" stroke-linecap="round"/>'+
    '<path d="M118 178 C140 172 158 168 172 166" stroke="'+RC+'" stroke-width="15" fill="none" stroke-linecap="round"/>'+
    '<path d="M180 152 Q200 150 202 166 Q200 182 178 178 Z" fill="'+rd+'" stroke="'+ol+'" stroke-width="2.2"/>'+
    '<path d="M186 154 L186 176" stroke="#ff9a90" stroke-width="2"/>'+
    '</g>';
  /* compact chibi torso: silver mid, red sides, gold V + circular timer */
  const torso =
    '<path d="M68 112 Q100 104 132 112 L138 168 Q100 186 62 168 Z" fill="'+sv+'" stroke="'+ol+'" stroke-width="2.4" stroke-linejoin="round"/>'+
    '<path d="M68 112 L78 168 Q70 172 62 168 Z" fill="'+rd+'" stroke="'+ol+'" stroke-width="2" stroke-linejoin="round"/>'+
    '<path d="M132 112 L122 168 Q130 172 138 168 Z" fill="'+rd+'" stroke="'+ol+'" stroke-width="2" stroke-linejoin="round"/>'+
    /* gold chest V ornaments — thick plates like reference */
    '<path d="M72 116 L100 152 L128 116 L118 114 L100 138 L82 114 Z" fill="'+gd+'" stroke="'+ol+'" stroke-width="1.8" stroke-linejoin="round"/>'+
    '<path d="M78 118 L100 144 L122 118" fill="none" stroke="#fff3b0" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" opacity=".9"/>'+
    '<path d="M86 120 L100 140 L114 120" fill="none" stroke="#e53935" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>'+
    /* circular color timer */
    '<circle cx="100" cy="138" r="15" fill="#cfd8e6" stroke="'+ol+'" stroke-width="2.2"/>'+
    '<circle class="h-tglow" cx="100" cy="138" r="12.5" filter="url(#'+p+'gl)" opacity=".95"/>'+
    '<circle class="h-timer" cx="100" cy="138" r="11" stroke="#1e3a5f" stroke-width="1.5"/>'+
    '<circle cx="96" cy="134" r="3.5" fill="#fff" opacity=".6"/>'+
    '<g class="h-spiral"><path d="M100 138 m0 -2.2 a2.2 2.2 0 1 1 -2.2 2.2 a4.5 4.5 0 0 1 4.5 -4.5" stroke="#fff" stroke-width="1.3" fill="none" opacity=".85"/></g>'+
    '<circle class="mk-chest" cx="100" cy="138" r="1" fill="none"/>'+
    /* neck */
    '<path d="M88 98 L112 98 L114 114 L86 114 Z" fill="'+sv+'" stroke="'+ol+'" stroke-width="2"/>';
  /* idle: one fist up, one guard — chibi heroic */
  const guard = '<g class="h-guard">'+
    '<path d="M62 118 C40 128 36 148 58 158" stroke="'+ol+'" stroke-width="20" fill="none" stroke-linecap="round"/>'+
    '<path d="M62 118 C40 128 36 148 58 158" stroke="'+sv+'" stroke-width="14" fill="none" stroke-linecap="round"/>'+
    '<path d="M62 118 C46 126 42 140 50 150" stroke="'+RC+'" stroke-width="14" fill="none" stroke-linecap="round"/>'+
    '<circle cx="62" cy="160" r="11" fill="'+sv+'" stroke="'+ol+'" stroke-width="2.2"/>'+
    '<path d="M138 118 C160 100 168 78 158 68" stroke="'+ol+'" stroke-width="20" fill="none" stroke-linecap="round"/>'+
    '<path d="M138 118 C160 100 168 78 158 68" stroke="'+sv+'" stroke-width="14" fill="none" stroke-linecap="round"/>'+
    '<path d="M138 118 C154 104 160 88 158 78" stroke="'+RC+'" stroke-width="14" fill="none" stroke-linecap="round"/>'+
    '<circle cx="156" cy="64" r="11" fill="'+sv+'" stroke="'+ol+'" stroke-width="2.2"/>'+
    '</g>';
  /* Specium-style cross beam pose */
  const cross = '<g class="h-cross">'+
    '<path d="M62 118 C90 128 130 124 168 120" stroke="'+ol+'" stroke-width="20" fill="none" stroke-linecap="round"/>'+
    '<path d="M62 118 C90 128 130 124 168 120" stroke="'+sv+'" stroke-width="14" fill="none" stroke-linecap="round"/>'+
    '<path d="M138 118 C148 150 148 70 148 58" stroke="'+ol+'" stroke-width="20" fill="none" stroke-linecap="round"/>'+
    '<path d="M138 118 C148 150 148 70 148 58" stroke="'+sv+'" stroke-width="14" fill="none" stroke-linecap="round"/>'+
    '<circle cx="176" cy="120" r="11" fill="'+sv+'" stroke="'+ol+'" stroke-width="2.2"/>'+
    '<circle cx="148" cy="52" r="11" fill="'+sv+'" stroke="'+ol+'" stroke-width="2.2"/>'+
    '<circle cx="148" cy="120" r="12" fill="#bff3ff" filter="url(#'+p+'gl)"/><circle cx="148" cy="120" r="5" fill="#fff"/>'+
    '</g>';
  const slug = '<g class="h-slug">'+
    '<path d="M90 34 L100 -4 L110 34 Q106 48 100 58 Q94 48 90 34 Z" fill="'+sv+'" stroke="'+ol+'" stroke-width="2.4" stroke-linejoin="round"/>'+
    '<path d="M94 32 L100 4 L106 32" stroke="#fff" stroke-width="2.5" fill="none" opacity=".8"/>'+
    '<circle class="mk-slug" cx="100" cy="20" r="1" fill="none"/>'+
    '</g>';
  const head = '<g class="h-head">'+
    /* big silver dome head */
    '<ellipse cx="100" cy="68" rx="50" ry="46" fill="'+sv+'" stroke="'+ol+'" stroke-width="2.8"/>'+
    '<ellipse cx="100" cy="68" rx="42" ry="38" fill="none" stroke="#fff" stroke-width="2" opacity=".25"/>'+
    /* side panels */
    '<path d="M58 58 Q54 78 66 100 L74 90 Q64 74 64 58 Z" fill="#a8b6c8" stroke="'+ol+'" stroke-width="1.5" opacity=".85"/>'+
    '<path d="M142 58 Q146 78 134 100 L126 90 Q136 74 136 58 Z" fill="#a8b6c8" stroke="'+ol+'" stroke-width="1.5" opacity=".85"/>'+
    /* ear fins */
    '<rect x="44" y="52" width="14" height="22" rx="4" fill="'+sv+'" stroke="'+ol+'" stroke-width="2"/>'+
    '<rect x="142" y="52" width="14" height="22" rx="4" fill="'+sv+'" stroke="'+ol+'" stroke-width="2"/>'+
    slug+
    /* big yellow glowing eyes */
    '<ellipse class="h-eyeglow" cx="76" cy="72" rx="18" ry="13" fill="#ffe566" filter="url(#'+p+'gl)" opacity=".95"/>'+
    '<ellipse class="h-eyeglow" cx="124" cy="72" rx="18" ry="13" fill="#ffe566" filter="url(#'+p+'gl)" opacity=".95"/>'+
    '<ellipse cx="76" cy="72" rx="15.5" ry="11.5" fill="url(#'+p+'ey)" stroke="#8a5a00" stroke-width="1.6"/>'+
    '<ellipse cx="124" cy="72" rx="15.5" ry="11.5" fill="url(#'+p+'ey)" stroke="#8a5a00" stroke-width="1.6"/>'+
    '<ellipse cx="70" cy="67" rx="4.5" ry="3" fill="#fff" opacity=".9"/>'+
    '<ellipse cx="118" cy="67" rx="4.5" ry="3" fill="#fff" opacity=".9"/>'+
    /* tiny mouth */
    '<path d="M94 90 Q100 94 106 90" stroke="#5a4a3a" stroke-width="2.2" fill="none" stroke-linecap="round"/>'+
    /* cheek shine */
    '<path d="M60 48 Q78 38 92 44" stroke="#fff" stroke-width="3" fill="none" stroke-linecap="round" opacity=".55"/>'+
    '</g>';
  return '<svg class="hero" viewBox="0 0 200 300" preserveAspectRatio="xMidYMax meet" aria-hidden="true" style="--tc:#5ee7ff">'+
    '<defs>'+
    '<linearGradient id="'+p+'sv" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset=".4" stop-color="#e8eef6"/><stop offset="1" stop-color="#9aabbc"/></linearGradient>'+
    '<linearGradient id="'+p+'rd" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ff6b63"/><stop offset=".55" stop-color="#e53935"/><stop offset="1" stop-color="#b71c1c"/></linearGradient>'+
    '<linearGradient id="'+p+'gd" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffe566"/><stop offset=".5" stop-color="#f5c542"/><stop offset="1" stop-color="#e6a817"/></linearGradient>'+
    '<radialGradient id="'+p+'ey" cx=".35" cy=".35" r=".7"><stop offset="0" stop-color="#fffde7"/><stop offset=".45" stop-color="#ffeb3b"/><stop offset="1" stop-color="#f9a825"/></radialGradient>'+
    '<filter id="'+p+'gl" x="-80%" y="-80%" width="260%" height="260%"><feGaussianBlur stdDeviation="3.2"/></filter>'+
    '</defs>'+
    '<ellipse class="h-aura" cx="100" cy="150" rx="92" ry="130" fill="#a8f0ff" filter="url(#'+p+'gl)" opacity=".65"/>'+
    '<ellipse cx="100" cy="268" rx="58" ry="8" fill="#000" opacity=".25"/>'+
    legL + legR + kick + arm('L') + arm('R') + torso + head + guard + cross +
    '<circle class="mk-beam" cx="148" cy="120" r="1" fill="none"/>'+
    '</svg>';
}

const MONS = {
  fire:{name:'火焰怪獸', nick:'炎炎', body:'#ff6b3d', light:'#ffb08a', dark:'#b93a0e', belly:'#ffe0b0', shot:'#ff9f1c'},
  ice:{name:'冰凍怪獸', nick:'雪雪', body:'#6cc9f7', light:'#c8efff', dark:'#1d6fa5', belly:'#eefaff', shot:'#bae6fd'},
  thunder:{name:'雷電怪獸', nick:'閃閃', body:'#f7c21b', light:'#ffe98a', dark:'#9a6206', belly:'#fff6cf', shot:'#fde047'},
  rock:{name:'岩石怪獸', nick:'石頭哥', body:'#a67c5b', light:'#d9b594', dark:'#5f3f28', belly:'#ecd6bb', shot:'#c8a27c'},
  poison:{name:'毒霧怪獸', nick:'紫紫', body:'#a35cf0', light:'#d2b0ff', dark:'#5b1d9a', belly:'#f0e3ff', shot:'#b6f25c'},
  sea:{name:'海浪怪獸', nick:'浪浪', body:'#27c4b0', light:'#98f0e2', dark:'#0d6b61', belly:'#d8fff7', shot:'#5ee8ff'},
  boss:{name:'魔王怪獸', short:'魔王', nick:'黑暗大魔王', body:'#5b2aa8', light:'#9f7ae0', dark:'#240b52', belly:'#c8b3f5', shot:'#ff4d6d', boss:true},
  kanegon:{name:'食錢怪', nick:'最鍾意食金幣', body:'#c9793a', light:'#f3b872', dark:'#6e3710', belly:'#e0a050', shot:'#ffd23f'},
  dada:{name:'三面怪人達達', nick:'最終大頭目', body:'#222', light:'#fff', dark:'#111', belly:'#fff', shot:'#ff6fb0', boss:true, final:true},
  /* v3: kaiju from 超人奧米加 (names: zh-Hant wiki / 萌娘百科 transliterations) */
  graim:{name:'格萊姆', nick:'熱線怪獸・鑽頭角', body:'#6b6f7a', light:'#b3b8c2', dark:'#2f3238', belly:'#f2c230', shot:'#ff8a1c', omega:true},
  dugrid:{name:'多格利德', nick:'水棲毒獸・大大口', body:'#5b4636', light:'#a0806a', dark:'#2a1d14', belly:'#e8b93a', frill:'#d8323a', shot:'#a3e635', omega:true},
  pegunos:{name:'佩古諾斯', nick:'無重力怪獸・識飛企鵝', body:'#1f3f86', light:'#5a84d8', dark:'#0e1f4a', belly:'#eef3fa', beak:'#ffcc33', shot:'#bfefff', omega:true},
  therizirus:{name:'特利吉拉斯', nick:'刃爪怪獸・會隱形', body:'#2b3039', light:'#6a7486', dark:'#12151b', belly:'#c8324d', shot:'#ff4d6d', omega:true},
  ohebinushi:{name:'大蛇主命', nick:'傳說蛇獸・超長身', body:'#4a5147', light:'#8e9a86', dark:'#1f241d', belly:'#efe4c4', accent:'#d84a3a', shot:'#ffd166', omega:true},
  gedrago:{name:'蓋多拉哥', nick:'猛突怪獸・粉紅毛毛', body:'#d8418f', light:'#f59ac6', dark:'#7d1b4f', belly:'#6b3a44', horn:'#a7adb7', shot:'#ff8fc8', omega:true},
  rekiness:{name:'雷基尼斯', nick:'流星怪獸・夥伴特訓', body:'#2f7fe0', light:'#9fd8ff', dark:'#123a7a', belly:'#bfe4ff', shot:'#b58cff', omega:true, friend:true},
  trigaron:{name:'特萊加隆', nick:'流星怪獸・夥伴特訓', body:'#2c3038', light:'#6a7280', dark:'#101216', belly:'#8a93a3', gold:'#ffc21a', shot:'#ffc21a', omega:true, friend:true},
  vugsect:{name:'瓦古塞克特', nick:'宇宙甲獸・中頭目', short:'瓦古塞克特', body:'#2c2342', light:'#7a68a8', dark:'#130d22', belly:'#4a3b6b', shot:'#ff3b6b', boss:true, omega:true}
};
const DEX_ORDER=['graim','dugrid','pegunos','therizirus','ohebinushi','gedrago','rekiness','trigaron','vugsect','kanegon','dada','boss','fire','ice','thunder','rock','poison','sea'];

function monsterSVG(type, p){
  if(type==='kanegon') return kanegonSVG(p);
  if(type==='dada') return dadaSVG(p);
  if(type==='graim') return graimSVG(p); if(type==='dugrid') return dugridSVG(p); if(type==='pegunos') return pegunosSVG(p);
  if(type==='therizirus') return therizirusSVG(p); if(type==='ohebinushi') return ohebinushiSVG(p); if(type==='gedrago') return gedragoSVG(p);
  if(type==='rekiness') return rekinessSVG(p); if(type==='trigaron') return trigaronSVG(p); if(type==='vugsect') return vugsectSVG(p);
  const m = MONS[type]; const dk=m.dark;
  let back='', front='', body2='';
  if(type==='fire'){
    back = '<g class="m-flame"><path d="M92 82 C78 56 96 40 100 16 C108 38 118 30 116 10 C134 30 142 48 134 62 C144 58 150 50 150 38 C164 60 158 82 146 90 Z" fill="#ffb703" stroke="#e85d04" stroke-width="3"/><path d="M106 82 C100 64 110 56 112 42 C118 56 126 52 126 40 C138 58 134 76 128 84 Z" fill="#fff3b0"/></g>';
    front = '<g class="m-flame"><path d="M220 130 C210 112 224 100 228 84 C236 102 246 110 238 130Z" fill="#ffb703" stroke="#e85d04" stroke-width="2.5"/></g>';
  } else if(type==='ice'){
    back = '<g fill="#e8faff" stroke="'+dk+'" stroke-width="3" stroke-linejoin="round"><path d="M112 74 L122 18 L136 72Z"/><path d="M90 84 L86 48 L106 76Z"/><path d="M148 78 L162 44 L162 86Z"/><path d="M184 98 L220 86 L196 120Z"/><path d="M198 132 L232 124 L206 152Z"/></g>';
    body2 = '<g stroke="#8fd8ff" stroke-width="3" stroke-linecap="round"><path d="M118 146 L118 178M104 154 L132 170M104 170 L132 154"/></g>';
  } else if(type==='thunder'){
    back = '<g fill="#fff06a" stroke="'+dk+'" stroke-width="3" stroke-linejoin="round"><path d="M96 82 L76 50 L91 52 L78 16 L110 58 L95 56 L108 80Z"/><path d="M150 78 L168 46 L153 50 L172 14 L140 56 L155 54 L140 78Z"/></g>';
    body2 = '<g stroke="'+dk+'" stroke-width="7" stroke-linecap="round" fill="none" opacity=".45"><path d="M170 84 Q184 96 188 114"/><path d="M188 132 Q198 144 200 160"/><path d="M70 120 Q62 132 62 148"/></g>';
  } else if(type==='rock'){
    back = '<g fill="#8d929c" stroke="#484d56" stroke-width="3" stroke-linejoin="round"><path d="M98 74 L106 42 L128 36 L138 68Z"/><path d="M150 82 L170 58 L190 72 L180 98Z"/><path d="M186 114 L214 104 L218 130 L196 140Z"/></g>';
    body2 = '<g fill="'+dk+'" opacity=".3"><circle cx="175" cy="120" r="7"/><circle cx="186" cy="170" r="5"/><circle cx="70" cy="170" r="6"/><circle cx="160" cy="88" r="4"/></g>';
  } else if(type==='poison'){
    back = '<g stroke="'+dk+'" stroke-width="5" stroke-linecap="round" fill="none"><path d="M108 72 Q98 46 86 30"/><path d="M140 70 Q152 44 168 30"/></g><circle cx="86" cy="28" r="11" fill="#b6f25c" stroke="#4d7c0f" stroke-width="3"/><circle cx="168" cy="28" r="11" fill="#b6f25c" stroke="#4d7c0f" stroke-width="3"/>';
    body2 = '<g fill="#e3c8ff" opacity=".75"><circle cx="172" cy="112" r="9"/><circle cx="188" cy="150" r="6"/><circle cx="160" cy="84" r="5"/><circle cx="70" cy="176" r="6"/></g>';
    front = '<g class="m-float" fill="#b6f25c" opacity=".75"><circle cx="30" cy="80" r="7"/><circle cx="18" cy="104" r="4"/><circle cx="40" cy="60" r="3"/></g>';
  } else if(type==='sea'){
    back = '<path d="M104 74 Q118 14 170 28 Q148 44 154 80Z" fill="#12a594" stroke="'+dk+'" stroke-width="3"/><path d="M188 100 Q224 88 228 116 Q208 114 198 130Z" fill="#12a594" stroke="'+dk+'" stroke-width="3"/>';
    body2 = '<g stroke="'+dk+'" stroke-width="3" fill="none" stroke-linecap="round" opacity=".6"><path d="M176 118 q6 6 0 12"/><path d="M184 116 q6 6 0 12"/></g>';
    front = '<g class="m-float"><path d="M34 70 Q40 58 46 70 A7 7 0 1 1 34 70Z" fill="#9ff3ff" stroke="#0d6b61" stroke-width="2"/></g>';
  } else if(type==='boss'){
    back = '<g fill="#2a0f5c" stroke="#150533" stroke-width="3" stroke-linejoin="round"><path d="M74 122 C34 84 14 94 4 62 C20 72 30 68 38 54 C44 74 56 72 64 62 C68 86 78 98 88 106Z"/><path d="M178 116 C206 72 228 80 238 48 C224 62 214 58 206 44 C200 64 190 64 182 54 C182 80 176 94 166 104Z"/></g>'+
      '<g fill="#f5f0e6" stroke="#44403c" stroke-width="3"><path d="M90 84 C68 72 66 46 78 32 C82 54 96 64 106 72Z"/><path d="M152 78 C172 62 172 40 160 26 C158 48 146 58 138 68Z"/></g>'+
      '<path d="M100 78 L102 46 L114 62 L124 36 L134 62 L146 46 L148 76Z" fill="#fbbf24" stroke="#b45309" stroke-width="3" stroke-linejoin="round"/><circle cx="124" cy="60" r="5" fill="#ef4444"/><circle cx="108" cy="66" r="3" fill="#38bdf8"/><circle cx="140" cy="66" r="3" fill="#38bdf8"/>';
    body2 = '<path d="M84 150 L118 196 L152 150" stroke="#fbbf24" stroke-width="4" fill="none" opacity=".7"/>';
  }
  const pupil = m.boss ? '#e11d48' : '#1f2937';
  return '<svg class="mon mon-'+type+'" viewBox="0 0 240 240" preserveAspectRatio="xMidYMax meet" aria-hidden="true">'+
    '<defs><radialGradient id="'+p+'bd" cx=".38" cy=".3" r=".8"><stop offset="0" stop-color="'+m.light+'"/><stop offset=".55" stop-color="'+m.body+'"/><stop offset="1" stop-color="'+dk+'"/></radialGradient></defs>'+
    '<ellipse cx="125" cy="228" rx="84" ry="9" fill="#000" opacity=".28"/>'+
    back+
    '<path d="M184 186 Q236 182 228 128 Q224 116 214 126 Q218 164 180 164 Z" fill="url(#'+p+'bd)" stroke="'+dk+'" stroke-width="3"/>'+
    '<ellipse cx="90" cy="213" rx="27" ry="15" fill="'+dk+'"/><ellipse cx="162" cy="213" rx="27" ry="15" fill="'+dk+'"/>'+
    '<g fill="#fff"><circle cx="70" cy="220" r="4"/><circle cx="80" cy="224" r="4"/><circle cx="142" cy="221" r="4"/><circle cx="152" cy="225" r="4"/></g>'+
    '<path d="M58 206 C36 150 54 70 122 64 C192 58 214 140 197 206 Q127 224 58 206Z" fill="url(#'+p+'bd)" stroke="'+dk+'" stroke-width="3"/>'+
    '<ellipse cx="118" cy="162" rx="48" ry="42" fill="'+m.belly+'"/>'+
    '<g stroke="'+dk+'" stroke-width="2.5" fill="none" opacity=".25"><path d="M84 150 Q118 158 152 150"/><path d="M80 170 Q118 178 156 170"/><path d="M86 190 Q118 197 150 190"/></g>'+
    body2+
    '<ellipse cx="60" cy="150" rx="12" ry="21" transform="rotate(35 60 150)" fill="url(#'+p+'bd)" stroke="'+dk+'" stroke-width="3"/>'+
    '<g fill="#fff"><circle cx="46" cy="136" r="3.5"/><circle cx="52" cy="131" r="3.5"/></g>'+
    '<ellipse cx="194" cy="152" rx="11" ry="19" transform="rotate(-22 194 152)" fill="url(#'+p+'bd)" stroke="'+dk+'" stroke-width="3"/>'+
    '<g class="m-eyes"><circle cx="98" cy="112" r="19" fill="#fff" stroke="'+dk+'" stroke-width="2.5"/><circle cx="145" cy="110" r="17" fill="#fff" stroke="'+dk+'" stroke-width="2.5"/>'+
    '<circle cx="91" cy="115" r="9" fill="'+pupil+'"/><circle cx="138" cy="113" r="8" fill="'+pupil+'"/><circle cx="88" cy="111" r="3.2" fill="#fff"/><circle cx="135" cy="109" r="3" fill="#fff"/></g>'+
    '<g class="m-ouch" stroke="#1f2937" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" fill="none"><path d="M86 102 L108 113 L86 124"/><path d="M158 100 L135 111 L158 122"/></g>'+
    '<path d="M76 88 L112 97" stroke="'+dk+'" stroke-width="'+(m.boss?8:6)+'" stroke-linecap="round"/><path d="M130 96 L164 86" stroke="'+dk+'" stroke-width="'+(m.boss?8:6)+'" stroke-linecap="round"/>'+
    '<ellipse cx="76" cy="136" rx="9" ry="5" fill="#ff7a9a" opacity=".55"/><ellipse cx="166" cy="132" rx="9" ry="5" fill="#ff7a9a" opacity=".55"/>'+
    '<path d="M96 138 Q119 164 144 136 Q119 147 96 138 Z" fill="#7f1d1d" stroke="'+dk+'" stroke-width="3" stroke-linejoin="round"/>'+
    '<path d="M104 141 L108 151 L113 143Z" fill="#fff"/><path d="M127 142 L131 151 L135 140Z" fill="#fff"/>'+
    front+
    '<circle class="mk-core" cx="120" cy="140" r="1" fill="none"/><circle class="mk-mouth" cx="100" cy="144" r="1" fill="none"/>'+
    '</svg>';
}


/* Fan-art 食錢怪 (coin-purse head with zipper-lip mouth on top, eyes on stalks, chest coin counter) */
function kanegonSVG(p){
  const m=MONS.kanegon, dk=m.dark, bd='url(#'+p+'bd)', pu='url(#'+p+'pu)';
  let teeth=''; for(let x=62;x<=176;x+=7){ const y=66+Math.pow((x-120)/58,2)*-3; teeth+='<rect x="'+x+'" y="'+(y-3).toFixed(1)+'" width="4" height="6" rx="1" fill="#e9eef5" stroke="#8a93a3" stroke-width=".8"/>'; }
  let freck=''; [[96,100],[104,106],[112,99],[122,105],[130,99],[138,105],[146,100],[118,112],[88,106],[152,108]].forEach(q=>{ freck+='<circle cx="'+q[0]+'" cy="'+q[1]+'" r="2.1" fill="#3b1a06"/>'; });
  let thorns=''; [[48,86,-1],[46,102,-1],[192,86,1],[194,102,1]].forEach(t=>{ const x=t[0],y=t[1],d=t[2]; thorns+='<path d="M'+x+' '+(y-6)+' L'+(x+d*14)+' '+(y-2)+' L'+x+' '+(y+5)+'Z" fill="'+m.light+'" stroke="'+dk+'" stroke-width="2" stroke-linejoin="round"/>'; });
  [[78,74],[100,70],[140,70],[162,74]].forEach(t=>{ thorns+='<path d="M'+(t[0]-5)+' '+(t[1]+6)+' L'+t[0]+' '+(t[1]-6)+' L'+(t[0]+5)+' '+(t[1]+6)+'Z" fill="'+m.light+'" stroke="'+dk+'" stroke-width="1.8" stroke-linejoin="round" opacity=".95"/>'; });
  const coin=(x,y,r)=>'<g><ellipse cx="'+x+'" cy="'+y+'" rx="'+r+'" ry="'+r+'" fill="#ffd23f" stroke="#a87400" stroke-width="2"/><ellipse cx="'+x+'" cy="'+y+'" rx="'+(r*.6)+'" ry="'+(r*.6)+'" fill="none" stroke="#fff3a8" stroke-width="1.5"/><text x="'+x+'" y="'+(y+r*.38)+'" text-anchor="middle" font-size="'+(r*1.1)+'" font-weight="900" fill="#a87400">$</text></g>';
  return '<svg class="mon mon-kanegon" viewBox="0 0 240 240" preserveAspectRatio="xMidYMax meet" aria-hidden="true">'+
    '<defs><radialGradient id="'+p+'bd" cx=".38" cy=".3" r=".8"><stop offset="0" stop-color="'+m.light+'"/><stop offset=".55" stop-color="'+m.body+'"/><stop offset="1" stop-color="'+dk+'"/></radialGradient>'+
    '<radialGradient id="'+p+'pu" cx=".4" cy=".25" r=".85"><stop offset="0" stop-color="#ffd08a"/><stop offset=".5" stop-color="#d98f3f"/><stop offset="1" stop-color="#7a3f12"/></radialGradient></defs>'+
    '<ellipse cx="122" cy="229" rx="78" ry="9" fill="#000" opacity=".28"/>'+
    '<path d="M168 196 Q214 200 230 164 L221 167 L224 154 L213 160 L214 147 L203 157 Q198 180 166 180Z" fill="'+bd+'" stroke="'+dk+'" stroke-width="3" stroke-linejoin="round"/>'+
    '<rect x="86" y="190" width="24" height="26" rx="8" fill="'+bd+'" stroke="'+dk+'" stroke-width="3"/><rect x="130" y="190" width="24" height="26" rx="8" fill="'+bd+'" stroke="'+dk+'" stroke-width="3"/>'+
    '<ellipse cx="96" cy="219" rx="20" ry="9" fill="'+dk+'"/><ellipse cx="144" cy="219" rx="20" ry="9" fill="'+dk+'"/>'+
    '<g fill="#ffd23f" stroke="#a87400" stroke-width="1.5"><circle cx="88" cy="213" r="5"/><circle cx="100" cy="213" r="5"/><circle cx="140" cy="213" r="5"/><circle cx="152" cy="213" r="5"/></g>'+
    '<path d="M80 118 Q66 168 84 204 Q120 214 156 204 Q174 168 160 118 Z" fill="'+bd+'" stroke="'+dk+'" stroke-width="3"/>'+
    '<g stroke="'+dk+'" stroke-width="2.5" fill="none" opacity=".35"><path d="M82 150 Q120 160 158 150"/><path d="M80 172 Q120 182 160 172"/><path d="M84 192 Q120 200 156 192"/></g>'+
    '<g class="k-reg"><rect x="126" y="140" width="34" height="21" rx="3" fill="#1d1d1d" stroke="#c0c6d0" stroke-width="2"/><text class="k-count" x="143" y="155.5" text-anchor="middle" font-size="12" font-family="monospace" font-weight="900" fill="#7dff7d">088</text><circle cx="133" cy="166" r="2.5" fill="#ff5b5b"/><circle cx="141" cy="166" r="2.5" fill="#ffd23f"/><circle cx="149" cy="166" r="2.5" fill="#5bff8a"/></g>'+
    '<ellipse cx="72" cy="140" rx="11" ry="20" transform="rotate(38 72 140)" fill="'+bd+'" stroke="'+dk+'" stroke-width="3"/><g fill="'+m.light+'" stroke="'+dk+'" stroke-width="1.5"><circle cx="58" cy="126" r="4"/><circle cx="64" cy="121" r="4"/></g>'+
    '<ellipse cx="170" cy="150" rx="10" ry="19" transform="rotate(-18 170 150)" fill="'+bd+'" stroke="'+dk+'" stroke-width="3"/>'+
    thorns+
    '<path d="M46 112 Q38 72 62 62 L178 62 Q202 72 194 112 Q120 140 46 112 Z" fill="'+pu+'" stroke="'+dk+'" stroke-width="3"/>'+
    freck+
    '<ellipse cx="80" cy="116" rx="9" ry="5" fill="#ff7a9a" opacity=".5"/><ellipse cx="160" cy="116" rx="9" ry="5" fill="#ff7a9a" opacity=".5"/>'+
    '<path d="M84 62 Q70 44 60 32" stroke="'+dk+'" stroke-width="12" stroke-linecap="round" fill="none"/><path d="M84 62 Q70 44 60 32" stroke="'+m.light+'" stroke-width="7" stroke-linecap="round" fill="none"/>'+
    '<path d="M156 62 Q170 44 180 32" stroke="'+dk+'" stroke-width="12" stroke-linecap="round" fill="none"/><path d="M156 62 Q170 44 180 32" stroke="'+m.light+'" stroke-width="7" stroke-linecap="round" fill="none"/>'+
    '<g class="m-eyes"><circle cx="58" cy="26" r="15" fill="#fff" stroke="'+dk+'" stroke-width="2.5"/><circle cx="182" cy="26" r="15" fill="#fff" stroke="'+dk+'" stroke-width="2.5"/>'+
    '<circle cx="55" cy="31" r="6.5" fill="#1f2937"/><circle cx="179" cy="31" r="6.5" fill="#1f2937"/><circle cx="53" cy="29" r="2.2" fill="#fff"/><circle cx="177" cy="29" r="2.2" fill="#fff"/>'+
    '<path d="M42 24 Q56 8 74 20 L73 24 Q58 18 42 28Z" fill="'+m.light+'" stroke="'+dk+'" stroke-width="2"/><path d="M198 24 Q184 8 166 20 L167 24 Q182 18 198 28Z" fill="'+m.light+'" stroke="'+dk+'" stroke-width="2"/></g>'+
    '<g class="m-ouch" stroke="#1f2937" stroke-width="4.5" stroke-linecap="round" fill="none"><path d="M48 18 L68 34M68 18 L48 34"/><path d="M172 18 L192 34M192 18 L172 34"/></g>'+
    '<g class="k-closed"><path d="M54 67 Q120 92 186 67 Q120 78 54 67Z" fill="#f2b56a" stroke="'+dk+'" stroke-width="2.5"/><path d="M54 67 Q120 46 186 67 Q120 60 54 67Z" fill="#f7c98a" stroke="'+dk+'" stroke-width="2.5"/>'+teeth+'</g>'+
    '<g class="k-open"><path d="M52 64 Q120 30 188 64 Q120 104 52 64Z" fill="#3b0d0d" stroke="'+dk+'" stroke-width="3"/><ellipse cx="120" cy="76" rx="32" ry="10" fill="#ff6f8e"/>'+
    '<path d="M52 64 Q120 30 188 64 Q120 44 52 64Z" fill="#f7c98a" stroke="'+dk+'" stroke-width="2.5"/><path d="M52 64 Q120 104 188 64 Q120 90 52 64Z" fill="#f2b56a" stroke="'+dk+'" stroke-width="2.5"/></g>'+
    '<path d="M116 52 L114 44 M124 52 L126 44" stroke="#a87400" stroke-width="3"/><circle cx="113" cy="40" r="6" fill="#ffd23f" stroke="#a87400" stroke-width="2"/><circle cx="127" cy="40" r="6" fill="#ffd23f" stroke="#a87400" stroke-width="2"/>'+
    '<g class="m-float">'+coin(24,64,9)+'</g>'+
    '<circle class="mk-core" cx="120" cy="140" r="1" fill="none"/><circle class="mk-mouth" cx="120" cy="64" r="1" fill="none"/>'+
    '</svg>';
}

/* Fan-art 三面怪人達達 (black/white geometric stripes; three swappable faces A/B/C) */
function dadaSVG(p){
  const st='url(#'+p+'st)', vs='url(#'+p+'vs)', ck='url(#'+p+'ck)', K='#111';
  const mask='<path d="M120 26 C140 26 146 50 145 66 C144 88 134 102 120 102 C106 102 96 88 95 66 C94 50 100 26 120 26Z" stroke="'+K+'" stroke-width="3"';
  const faceA='<g class="d-face d-fa">'+mask+' fill="#ffe3ec"/>'+
    '<ellipse cx="110" cy="58" rx="8" ry="11" fill="#ff4f9a" stroke="'+K+'" stroke-width="2"/><ellipse cx="130" cy="58" rx="8" ry="11" fill="#ff4f9a" stroke="'+K+'" stroke-width="2"/>'+
    '<circle cx="109" cy="61" r="4" fill="'+K+'"/><circle cx="129" cy="61" r="4" fill="'+K+'"/><circle cx="107.5" cy="58" r="1.8" fill="#fff"/><circle cx="127.5" cy="58" r="1.8" fill="#fff"/>'+
    '<ellipse cx="120" cy="86" rx="11" ry="8" fill="#7a1030" stroke="'+K+'" stroke-width="2"/><ellipse cx="120" cy="90" rx="6" ry="3" fill="#ff8fb0"/>'+
    '<ellipse cx="103" cy="75" rx="5" ry="3" fill="#ff8fb0" opacity=".7"/><ellipse cx="137" cy="75" rx="5" ry="3" fill="#ff8fb0" opacity=".7"/></g>';
  const faceB='<g class="d-face d-fb">'+mask+' fill="#e3f0ff"/>'+
    '<path d="M98 64 L110 72 L99 84Z" fill="'+K+'"/><path d="M142 64 L130 72 L141 84Z" fill="'+K+'"/>'+
    '<ellipse cx="111" cy="57" rx="7" ry="9" fill="#2f7bff" stroke="'+K+'" stroke-width="2"/><ellipse cx="129" cy="57" rx="7" ry="9" fill="#2f7bff" stroke="'+K+'" stroke-width="2"/>'+
    '<circle cx="110" cy="59" r="3.5" fill="'+K+'"/><circle cx="128" cy="59" r="3.5" fill="'+K+'"/><circle cx="109" cy="56" r="1.6" fill="#fff"/><circle cx="127" cy="56" r="1.6" fill="#fff"/>'+
    '<path d="M113 86 Q120 92 127 86" stroke="'+K+'" stroke-width="3" fill="none" stroke-linecap="round"/></g>';
  const faceC='<g class="d-face d-fc">'+mask+' fill="#fff4bf"/>'+
    '<path d="M104 48 Q111 44 116 48M124 48 Q129 44 136 48" stroke="'+K+'" stroke-width="2.5" fill="none" stroke-linecap="round"/>'+
    '<ellipse cx="111" cy="58" rx="4.5" ry="5.5" fill="#f5b800" stroke="'+K+'" stroke-width="2"/><ellipse cx="129" cy="58" rx="4.5" ry="5.5" fill="#f5b800" stroke="'+K+'" stroke-width="2"/>'+
    '<circle cx="111" cy="59" r="2" fill="'+K+'"/><circle cx="129" cy="59" r="2" fill="'+K+'"/>'+
    '<ellipse cx="120" cy="87" rx="5.5" ry="3.5" fill="#e2556e" stroke="'+K+'" stroke-width="1.5"/>'+
    '<ellipse cx="104" cy="74" rx="5" ry="3" fill="#ffb14d" opacity=".6"/><ellipse cx="136" cy="74" rx="5" ry="3" fill="#ffb14d" opacity=".6"/></g>';
  return '<svg class="mon mon-dada face-a" viewBox="0 0 240 240" preserveAspectRatio="xMidYMax meet" aria-hidden="true">'+
    '<defs><pattern id="'+p+'st" width="12" height="12" patternUnits="userSpaceOnUse" patternTransform="rotate(35)"><rect width="12" height="12" fill="#fff"/><rect width="6" height="12" fill="'+K+'"/></pattern>'+
    '<pattern id="'+p+'vs" width="10" height="10" patternUnits="userSpaceOnUse"><rect width="10" height="10" fill="#fff"/><rect width="5" height="10" fill="'+K+'"/></pattern>'+
    '<pattern id="'+p+'ck" width="14" height="14" patternUnits="userSpaceOnUse"><rect width="14" height="14" fill="#fff"/><rect width="7" height="7" fill="'+K+'"/><rect x="7" y="7" width="7" height="7" fill="'+K+'"/></pattern></defs>'+
    '<ellipse cx="120" cy="230" rx="62" ry="8" fill="#000" opacity=".28"/>'+
    '<rect x="98" y="176" width="19" height="48" rx="6" fill="'+vs+'" stroke="'+K+'" stroke-width="3"/><rect x="123" y="176" width="19" height="48" rx="6" fill="'+vs+'" stroke="'+K+'" stroke-width="3"/>'+
    '<ellipse cx="106" cy="226" rx="15" ry="7" fill="'+K+'"/><ellipse cx="134" cy="226" rx="15" ry="7" fill="'+K+'"/>'+
    '<path d="M92 108 L60 128 L66 140 L98 124Z" fill="'+st+'" stroke="'+K+'" stroke-width="3" stroke-linejoin="round"/><circle cx="56" cy="130" r="10" fill="#fff" stroke="'+K+'" stroke-width="3"/><path d="M50 124 L44 118M52 136 L45 140" stroke="'+K+'" stroke-width="3" stroke-linecap="round"/>'+
    '<path d="M148 108 L176 150 L166 156 L142 122Z" fill="'+st+'" stroke="'+K+'" stroke-width="3" stroke-linejoin="round"/><circle cx="174" cy="158" r="10" fill="#fff" stroke="'+K+'" stroke-width="3"/>'+
    '<path d="M88 102 Q120 94 152 102 Q158 144 146 182 L94 182 Q82 144 88 102Z" fill="'+st+'" stroke="'+K+'" stroke-width="4"/>'+
    '<path d="M120 116 L140 138 L120 160 L100 138Z" fill="'+ck+'" stroke="'+K+'" stroke-width="3"/>'+
    '<path d="M90 112 Q104 126 100 150M150 112 Q136 126 140 150" stroke="'+K+'" stroke-width="5" fill="none" stroke-linecap="round"/>'+
    '<rect x="92" y="166" width="56" height="10" fill="#fff" stroke="'+K+'" stroke-width="3"/><g fill="'+K+'"><rect x="98" y="168" width="6" height="6"/><rect x="110" y="168" width="6" height="6"/><rect x="122" y="168" width="6" height="6"/><rect x="134" y="168" width="6" height="6"/></g>'+
    '<rect x="111" y="94" width="18" height="12" fill="'+vs+'" stroke="'+K+'" stroke-width="2.5"/>'+
    '<g class="d-head"><ellipse cx="120" cy="60" rx="34" ry="46" fill="'+vs+'" stroke="'+K+'" stroke-width="4"/>'+
    '<path d="M92 34 L100 16 L108 30Z M112 22 L120 6 L128 22Z M132 30 L140 16 L148 34Z" fill="'+K+'"/>'+
    faceA+faceB+faceC+'</g>'+
    '<circle class="mk-core" cx="120" cy="136" r="1" fill="none"/><circle class="mk-mouth" cx="54" cy="130" r="1" fill="none"/>'+
    '</svg>';
}

function medalSVG(label, tier){
  const C = {0:['#4b5578','#2c3350','#7d87a8','#9aa3c0'],1:['#e39a5c','#7c3f12','#f8cda6','#7c3f12'],2:['#e8edf5','#56627c','#ffffff','#3d475e'],3:['#ffd84d','#a8640a','#fff6c4','#8a4b00']}[tier||0];
  const fs = String(label).length>1 ? 20 : 26;
  return '<svg viewBox="0 0 64 80" aria-hidden="true"><path d="M16 0 H30 L37 32 H23Z" fill="'+(tier?'#ef4444':'#5b6480')+'"/><path d="M34 0 H48 L41 32 H27Z" fill="'+(tier?'#3b82f6':'#465070')+'"/>'+
    '<circle cx="32" cy="50" r="26" fill="'+C[0]+'" stroke="'+C[1]+'" stroke-width="4"/><circle cx="32" cy="50" r="19.5" fill="none" stroke="'+C[2]+'" stroke-width="2" stroke-dasharray="3 3"/>'+
    '<text x="32" y="'+(50+fs*0.36)+'" text-anchor="middle" font-size="'+fs+'" font-weight="900" fill="'+C[3]+'">'+label+'</text></svg>';
}
function starSVG(on){ return '<svg viewBox="0 0 24 24" class="'+(on?'on':'')+'"><path d="M12 2l3 6.6 7.2.8-5.4 4.9 1.6 7.1L12 17.8 5.6 21.4l1.6-7.1L1.8 9.4 9 8.6z"/></svg>'; }

function buildSky(svg){
  const W=1600, H=900; const R=(a,b)=>a+Math.random()*(b-a); const I=(a,b)=>Math.floor(R(a,b+1));
  let s = '<defs><linearGradient id="skyg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#060a2a"/><stop offset=".5" stop-color="#1a1460"/><stop offset=".85" stop-color="#4a2380"/><stop offset="1" stop-color="#7a3a8c"/></linearGradient>'+
    '<radialGradient id="moong"><stop offset="0" stop-color="#fffbe6" stop-opacity=".9"/><stop offset=".5" stop-color="#fff3b0" stop-opacity=".25"/><stop offset="1" stop-color="#fff3b0" stop-opacity="0"/></radialGradient>'+
    '<linearGradient id="lightg" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#cfefff" stop-opacity=".28"/><stop offset="1" stop-color="#cfefff" stop-opacity="0"/></linearGradient></defs>';
  s += '<rect width="'+W+'" height="'+H+'" fill="url(#skyg)"/>';
  for(let i=0;i<130;i++){ s += '<circle class="tw" cx="'+R(0,W).toFixed(0)+'" cy="'+R(0,H*0.62).toFixed(0)+'" r="'+R(.8,2.4).toFixed(1)+'" fill="#fff" style="animation-delay:-'+R(0,4).toFixed(1)+'s;animation-duration:'+R(1.6,4).toFixed(1)+'s"/>'; }
  s += '<circle cx="980" cy="150" r="130" fill="url(#moong)"/><circle cx="980" cy="150" r="52" fill="#fff6d5"/><circle cx="962" cy="138" r="9" fill="#efe0ae"/><circle cx="996" cy="170" r="12" fill="#efe0ae"/><circle cx="1000" cy="130" r="5" fill="#efe0ae"/>';
  s += '<g class="sl" style="transform-origin:560px 900px"><polygon points="548,900 572,900 680,0 440,0" fill="url(#lightg)"/></g>';
  s += '<g class="sl sl2" style="transform-origin:1100px 900px"><polygon points="1088,900 1112,900 1220,0 980,0" fill="url(#lightg)"/></g>';
  let x=-10; while(x<W){ const w=I(50,120), h=I(200,430); s+='<rect x="'+x+'" y="'+(H-h)+'" width="'+w+'" height="'+h+'" fill="#261c63"/>'; if(Math.random()<.25) s+='<rect x="'+(x+w/2-2)+'" y="'+(H-h-30)+'" width="4" height="30" fill="#261c63"/>'; x+=w+I(-8,6); }
  x=-20; while(x<W){ const w=I(70,150), h=I(120,330); const y=H-h; s+='<rect x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'" fill="#0e1336"/>';
    const cols=Math.floor((w-14)/18), rows=Math.floor((h-24)/26);
    for(let r=0;r<rows;r++) for(let c=0;c<cols;c++){ if(Math.random()<.33) s+='<rect x="'+(x+10+c*18)+'" y="'+(y+14+r*26)+'" width="9" height="13" fill="'+(Math.random()<.8?'#ffe28a':'#9be7ff')+'" opacity="'+R(.5,1).toFixed(2)+'"/>'; }
    if(Math.random()<.3){ s+='<rect x="'+(x+w/2-2)+'" y="'+(y-26)+'" width="4" height="26" fill="#0e1336"/><circle class="blinkred" cx="'+(x+w/2)+'" cy="'+(y-28)+'" r="4" fill="#ff4d4d"/>'; }
    x+=w+I(2,14); }
  s += '<rect y="'+(H-16)+'" width="'+W+'" height="16" fill="#070a1f"/>';
  svg.innerHTML = s;
}

/* ===== v3: 超人奧米加 series kaiju — original cute fan-art SVGs (240x240, facing left toward the hero) ===== */
function omEye(x,y,r,dk,iris){ return `<circle cx="${x}" cy="${y}" r="${r}" fill="#fff" stroke="${dk}" stroke-width="2.5"/><circle cx="${x-r*.25}" cy="${y+r*.1}" r="${r*.6}" fill="${iris}"/><circle cx="${x-r*.3}" cy="${y+r*.12}" r="${r*.32}" fill="#111"/><circle cx="${x-r*.48}" cy="${y-r*.15}" r="${r*.22}" fill="#fff"/>`; }
function omOuch(pts){ return '<g class="m-ouch" stroke="#1f2937" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round" fill="none">'+pts.map((q,i)=>{ const [x,y,s]=q, d=i%2?-1:1; return `<path d="M${x-d*s} ${y-s*.7} L${x+d*s*.6} ${y} L${x-d*s} ${y+s*.7}"/>`; }).join('')+'</g>'; }
function omSpike(x,y,ang,len,w,fill,dk){ const a=ang*Math.PI/180, tx=x+Math.sin(a)*len, ty=y-Math.cos(a)*len, bx=Math.cos(a)*w, by=Math.sin(a)*w; return `<path d="M${(x-bx).toFixed(1)} ${(y-by).toFixed(1)} L${tx.toFixed(1)} ${ty.toFixed(1)} L${(x+bx).toFixed(1)} ${(y+by).toFixed(1)} Z" fill="${fill}" stroke="${dk}" stroke-width="2.2" stroke-linejoin="round"/>`; }
function omSvg(type,p,m,inner,defs){ return `<svg class="mon mon-${type}" viewBox="0 0 240 240" preserveAspectRatio="xMidYMax meet" aria-hidden="true"><defs><radialGradient id="${p}bd" cx=".38" cy=".3" r=".8"><stop offset="0" stop-color="${m.light}"/><stop offset=".55" stop-color="${m.body}"/><stop offset="1" stop-color="${m.dark}"/></radialGradient>${defs||''}</defs><ellipse cx="124" cy="229" rx="82" ry="9" fill="#000" opacity=".28"/>${inner}</svg>`; }
function omFeet(dk,claw,xs){ return xs.map(x=>`<ellipse cx="${x}" cy="214" rx="25" ry="12" fill="${dk}"/><g fill="${claw}" stroke="${dk}" stroke-width="1.5"><path d="M${x-22} 214 l-7 6 l10 0z"/><path d="M${x-12} 219 l-5 7 l10 -2z"/></g>`).join(''); }

/* 熱線怪獸 格萊姆: grey spiky mole, yellow belly, spinning drill-horn snout */
function graimSVG(p){ const m=MONS.graim, dk=m.dark, bd=`url(#${p}bd)`;
  let spikes=''; [[118,76,-12],[142,80,8],[164,94,28],[180,114,46],[191,138,62],[196,164,76]].forEach(s=>{ spikes+=omSpike(s[0],s[1],s[2],24,9,'#4a4e57',dk); });
  let stripes=''; for(let x=-20;x<=80;x+=10) stripes+=`<path d="M${x} 70 L${x+10} 112" stroke="#6b707b" stroke-width="4"/>`;
  const inner=`${spikes}
  <path d="M168 196 Q222 198 232 152 L222 158 L224 142 L212 152 L208 138 L200 154 Q194 176 164 178 Z" fill="${bd}" stroke="${dk}" stroke-width="3" stroke-linejoin="round"/>
  ${omFeet(dk,'#e8e2d0',[92,160])}
  <path d="M66 212 C48 160 60 104 104 90 C150 78 198 124 192 212 Q128 226 66 212 Z" fill="${bd}" stroke="${dk}" stroke-width="3"/>
  <path d="M84 206 C74 170 84 132 116 126 C150 122 166 160 160 206 Q122 216 84 206Z" fill="#f2c230" stroke="#b98a0e" stroke-width="2"/>
  <g stroke="#c99a12" stroke-width="2.5" fill="none"><path d="M88 150 Q120 158 156 148"/><path d="M84 168 Q120 176 160 166"/><path d="M84 186 Q120 194 160 184"/></g>
  <ellipse cx="180" cy="152" rx="11" ry="20" transform="rotate(-20 180 152)" fill="${bd}" stroke="${dk}" stroke-width="3"/>
  <path d="M84 136 Q56 138 42 158 L52 168 Q66 156 90 156 Z" fill="${bd}" stroke="${dk}" stroke-width="3" stroke-linejoin="round"/>
  <g fill="#ece6d4" stroke="${dk}" stroke-width="2" stroke-linejoin="round"><path d="M46 154 L20 146 L42 164Z"/><path d="M44 162 L16 166 L46 170Z"/><path d="M48 168 L26 182 L52 172Z"/></g>
  ${omSpike(98,56,-20,20,8,'#e9a13b',dk)}${omSpike(118,56,6,22,8,'#e9a13b',dk)}${omSpike(134,68,34,18,7,'#e9a13b',dk)}
  <path d="M60 98 C56 64 84 48 108 52 C132 56 144 78 138 100 C130 120 96 126 76 118 Z" fill="${bd}" stroke="${dk}" stroke-width="3"/>
  <g class="gr-drill"><path d="M66 78 L66 110 L4 92 Z" fill="#c3c8d2" stroke="${dk}" stroke-width="2.5" stroke-linejoin="round"/>
  <g clip-path="url(#${p}dc)"><g>${stripes}<animateTransform attributeName="transform" type="translate" from="0 0" to="10 0" dur=".25s" repeatCount="indefinite"/></g></g>
  <path d="M18 88 L18 96 L4 92 Z" fill="#e53935" stroke="${dk}" stroke-width="1.5"/>
  <ellipse cx="67" cy="94" rx="6" ry="17" fill="#8b9099" stroke="${dk}" stroke-width="2.5"/></g>
  <g class="m-eyes">${omEye(90,76,11,dk,'#f5b700')}${omEye(114,72,10,dk,'#f5b700')}</g>
  ${omOuch([[90,76,9],[114,72,8]])}
  <path d="M78 62 L100 68" stroke="${dk}" stroke-width="5" stroke-linecap="round"/><path d="M106 64 L126 58" stroke="${dk}" stroke-width="5" stroke-linecap="round"/>
  <ellipse cx="80" cy="100" rx="7" ry="4" fill="#ff7a9a" opacity=".55"/><ellipse cx="128" cy="92" rx="7" ry="4" fill="#ff7a9a" opacity=".55"/>
  <path d="M84 108 Q102 118 122 104" stroke="${dk}" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M90 111 L93 118 L96 112Z" fill="#fff"/><path d="M111 110 L113 117 L116 109Z" fill="#fff"/>
  <circle class="mk-core" cx="120" cy="150" r="1" fill="none"/><circle class="mk-mouth" cx="8" cy="92" r="1" fill="none"/>`;
  return omSvg('graim',p,m,inner,`<clipPath id="${p}dc"><path d="M66 78 L66 110 L4 92 Z"/></clipPath>`); }

/* 水棲毒獸 多格利德: brown lizard with a huge chomping mouth and a red frill collar */
function dugridSVG(p){ const m=MONS.dugrid, dk=m.dark, bd=`url(#${p}bd)`;
  let ut='', lt=''; for(let i=0;i<7;i++){ const x=44+i*11, y=79+i*1.9; ut+=`<path d="M${x} ${y} l4 8 l4 -7z" fill="#fff"/>`; lt+=`<path d="M${x+4} ${y+22-i*1.2} l4 -8 l4 7z" fill="#fff"/>`; }
  const inner=`
  <path d="M168 200 Q222 206 232 168 Q220 176 214 162 Q206 184 164 182Z" fill="${bd}" stroke="${dk}" stroke-width="3" stroke-linejoin="round"/>
  ${omFeet(dk,'#e8dcc0',[92,160])}
  <path d="M62 212 C46 170 58 128 92 116 C140 100 196 136 192 212 Q126 226 62 212Z" fill="${bd}" stroke="${dk}" stroke-width="3"/>
  <ellipse cx="116" cy="180" rx="38" ry="30" fill="#b99474"/>
  <g stroke="${dk}" stroke-width="2.5" fill="none" opacity=".3"><path d="M84 168 Q116 176 150 166"/><path d="M82 188 Q116 196 152 186"/></g>
  <g fill="${m.belly}" stroke="#8a6410" stroke-width="1.5"><ellipse cx="164" cy="156" rx="13" ry="9" transform="rotate(-30 164 156)"/><ellipse cx="176" cy="186" rx="10" ry="7"/><ellipse cx="150" cy="200" rx="8" ry="5"/><ellipse cx="72" cy="186" rx="7" ry="10"/></g>
  <ellipse cx="72" cy="150" rx="11" ry="20" transform="rotate(38 72 150)" fill="${bd}" stroke="${dk}" stroke-width="3"/><g fill="#e8dcc0" stroke="${dk}" stroke-width="1.5"><circle cx="58" cy="136" r="4"/><circle cx="64" cy="131" r="4"/></g>
  <path d="M46 156 Q34 132 52 114 Q60 94 84 98 Q102 80 124 92 Q148 86 154 108 Q174 118 166 142 Q156 156 136 150 Q114 162 92 152 Q68 166 46 156Z" fill="${m.frill}" stroke="#7a1016" stroke-width="3" stroke-linejoin="round"/>
  <g stroke="#9c1a22" stroke-width="2" fill="none"><path d="M58 146 Q62 128 76 118"/><path d="M92 144 Q94 124 104 108"/><path d="M130 142 Q132 124 128 104"/><path d="M152 132 Q150 120 142 110"/></g>
  <path d="M148 92 C152 56 126 32 96 34 C62 36 38 56 32 78 Q64 82 126 96 Z" fill="${bd}" stroke="${dk}" stroke-width="3"/>
  <path d="M34 80 Q80 86 128 96 Q92 128 42 106 Z" fill="#a8223a" stroke="${dk}" stroke-width="2.5"/>
  <ellipse cx="74" cy="102" rx="16" ry="6" fill="#ff7a9a"/>
  ${ut}
  <g class="dg-jaw"><path d="M38 100 Q84 120 130 96 Q126 126 90 132 Q54 132 38 100Z" fill="${bd}" stroke="${dk}" stroke-width="3"/>${lt}</g>
  <circle cx="44" cy="66" r="2.5" fill="${dk}"/><circle cx="52" cy="62" r="2.5" fill="${dk}"/>
  <g class="m-eyes">${omEye(94,52,11,dk,'#ffd23f')}${omEye(118,50,9,dk,'#ffd23f')}</g>
  ${omOuch([[94,52,9],[118,50,7]])}
  <path d="M82 38 L104 44" stroke="${dk}" stroke-width="5" stroke-linecap="round"/><path d="M110 40 L128 38" stroke="${dk}" stroke-width="4" stroke-linecap="round"/>
  <g class="m-float" opacity=".85"><circle cx="18" cy="100" r="6" fill="#a3e635" stroke="#4d7c0f" stroke-width="1.5"/><circle cx="12" cy="122" r="4" fill="#c084fc" stroke="#6b21a8" stroke-width="1.5"/><circle cx="26" cy="84" r="3.5" fill="#a3e635" stroke="#4d7c0f" stroke-width="1.2"/></g>
  <circle class="mk-core" cx="118" cy="160" r="1" fill="none"/><circle class="mk-mouth" cx="56" cy="98" r="1" fill="none"/>`;
  return omSvg('dugrid',p,m,inner); }

/* 無重力怪獸 佩古諾斯: floating navy penguin with a hooked yellow beak and big wing-arms */
function pegunosSVG(p){ const m=MONS.pegunos, dk=m.dark, bd=`url(#${p}bd)`;
  let crest=''; [[112,46,-10],[124,48,14],[134,54,36],[142,64,58],[146,76,78]].forEach(s=>{ crest+=omSpike(s[0],s[1],s[2],22,6,bd,dk); });
  let fth=''; for(let y=132;y<=196;y+=16) for(let x=96;x<=144;x+=16) fth+=`<path d="M${x+((y/16)%2?8:0)} ${y} q5 6 10 0" stroke="#c3cee0" stroke-width="2" fill="none"/>`;
  const inner=`<g class="pg-float">
  <g class="pg-wingR"><path d="M160 116 Q212 122 238 150 Q204 154 168 152 Z" fill="#e8edf5" stroke="${dk}" stroke-width="3" stroke-linejoin="round"/><path d="M160 116 Q212 122 238 150 Q206 134 164 132Z" fill="${bd}" stroke="${dk}" stroke-width="2.5" stroke-linejoin="round"/></g>
  <g class="m-float" fill="#eaf8ff" opacity=".9"><circle cx="84" cy="228" r="7"/><circle cx="96" cy="232" r="5"/><circle cx="152" cy="228" r="7"/><circle cx="164" cy="232" r="5"/></g>
  <g fill="#8aa0c8" stroke="${dk}" stroke-width="2.5"><ellipse cx="92" cy="212" rx="20" ry="9"/><ellipse cx="156" cy="212" rx="20" ry="9"/></g>
  <path d="M68 210 C52 160 64 98 118 94 C172 92 186 160 172 210 Q120 222 68 210Z" fill="${bd}" stroke="${dk}" stroke-width="3"/>
  <path d="M84 206 C72 166 84 118 118 114 C152 112 162 166 156 206 Q120 216 84 206Z" fill="#eef3fa" stroke="#b9c6dc" stroke-width="2"/>
  ${fth}
  <g class="pg-wingL"><path d="M82 120 Q40 136 6 170 Q46 164 84 150Z" fill="#e8edf5" stroke="${dk}" stroke-width="3" stroke-linejoin="round"/><path d="M82 120 Q40 136 6 170 Q42 146 84 136Z" fill="${bd}" stroke="${dk}" stroke-width="2.5" stroke-linejoin="round"/></g>
  ${crest}
  <path d="M70 94 C62 58 86 40 112 42 C140 44 152 66 146 92 Q110 110 70 94Z" fill="${bd}" stroke="${dk}" stroke-width="3"/>
  <path d="M80 96 Q110 110 140 94 Q128 118 108 120 Q90 118 80 96Z" fill="#eef3fa"/>
  <path d="M80 70 C58 62 34 70 24 86 C22 96 30 102 36 96 C40 88 52 84 78 88 Z" fill="${m.beak}" stroke="#a36a00" stroke-width="2.5" stroke-linejoin="round"/>
  <path d="M78 88 Q56 88 42 96 Q58 102 80 96Z" fill="#f0b020" stroke="#a36a00" stroke-width="2"/>
  <path d="M40 78 Q54 74 70 76" stroke="#fff3b0" stroke-width="2.5" fill="none" stroke-linecap="round"/>
  <g class="m-eyes"><circle cx="96" cy="66" r="14" fill="#ffd23f" opacity=".9"/>${omEye(96,66,11,dk,'#3b82f6')}${omEye(122,62,9,dk,'#3b82f6')}</g>
  ${omOuch([[96,66,9],[122,62,7]])}
  <path d="M84 50 L106 54" stroke="${dk}" stroke-width="4" stroke-linecap="round"/>
  <ellipse cx="112" cy="84" rx="7" ry="4" fill="#ff7a9a" opacity=".5"/>
  <circle class="mk-core" cx="118" cy="150" r="1" fill="none"/><circle class="mk-mouth" cx="28" cy="90" r="1" fill="none"/></g>`;
  return omSvg('pegunos',p,m,inner); }

/* 流星怪獸 雷基尼斯: friendly blue dinosaur partner — crystal horn, red/white shoulder spikes, pentagon chest, floating rocks */
function rekinessSVG(p){ const m=MONS.rekiness, dk=m.dark, bd=`url(#${p}bd)`;
  let ws=''; [[62,194,-70],[64,180,-60],[66,166,-50],[178,194,70],[180,178,60],[184,164,50]].forEach(s=>{ ws+=omSpike(s[0],s[1],s[2],14,5,'#fff',dk); });
  let sh=''; [[58,118,-60],[64,106,-30],[76,100,0],[166,110,20],[178,108,50],[186,118,80]].forEach(s=>{ sh+=omSpike(s[0],s[1],s[2],16,5.5,'#fff',dk); });
  let tsp=''; [[196,176,20],[210,166,40],[222,152,60]].forEach(s=>{ tsp+=omSpike(s[0],s[1],s[2],14,5,'#fff',dk); });
  const rock=(x,y,s)=>`<path d="M${x-s} ${y} L${x-s*.5} ${y-s*.8} L${x+s*.6} ${y-s*.7} L${x+s} ${y+s*.1} L${x+s*.3} ${y+s*.8} L${x-s*.7} ${y+s*.6}Z" fill="#9a7b5c" stroke="#c9a6ff" stroke-width="3" stroke-linejoin="round"/>`;
  const inner=`
  <g class="m-float">${rock(24,60,11)}${rock(212,36,9)}${rock(224,110,7)}</g>
  ${tsp}<path d="M170 198 Q222 200 234 150 Q222 160 216 150 Q208 180 168 180Z" fill="${bd}" stroke="${dk}" stroke-width="3" stroke-linejoin="round"/>
  ${omFeet(dk,'#fff',[92,160])}
  ${ws}
  <path d="M68 212 C52 164 62 108 106 96 C152 86 192 132 188 212 Q128 226 68 212Z" fill="${bd}" stroke="${dk}" stroke-width="3"/>
  <path d="M88 206 C78 172 86 136 118 130 C150 128 160 170 154 206 Q120 214 88 206Z" fill="${m.belly}" stroke="#5a9ad8" stroke-width="2"/>
  <g stroke="${dk}" stroke-width="2.5" fill="none" opacity=".45"><path d="M160 150 q10 8 4 18 q-6 8 4 16"/><path d="M76 160 q-8 8 -2 18"/><path d="M96 180 Q120 188 146 180"/><path d="M98 196 Q120 202 144 196"/></g>
  ${sh}
  <ellipse cx="70" cy="122" rx="16" ry="13" fill="#e8413a" stroke="${dk}" stroke-width="2.5"/><ellipse cx="176" cy="118" rx="15" ry="12" fill="#e8413a" stroke="${dk}" stroke-width="2.5"/>
  <ellipse cx="66" cy="150" rx="10" ry="18" transform="rotate(34 66 150)" fill="${bd}" stroke="${dk}" stroke-width="3"/><g fill="#fff" stroke="${dk}" stroke-width="1.5"><circle cx="54" cy="137" r="3.5"/><circle cx="60" cy="132" r="3.5"/></g>
  <polygon points="${pent(120,146,13)}" fill="#dfe8f2" stroke="${dk}" stroke-width="2" stroke-linejoin="round"/>
  <polygon points="${pent(120,146,13)}" fill="#6ff6ff" filter="url(#${p}gl)" opacity=".9"/><polygon points="${pent(120,146,9)}" fill="#7af" stroke="#fff" stroke-width="1.2"/>
  <path d="M100 52 L112 4 L126 52 Z" fill="#c8f3ff" stroke="#3a8fd0" stroke-width="2.5" stroke-linejoin="round"/><path d="M112 10 L114 50" stroke="#fff" stroke-width="2"/>
  <path d="M90 56 L92 32 L102 54Z" fill="#c8f3ff" stroke="#3a8fd0" stroke-width="2"/><path d="M124 54 L136 36 L134 60Z" fill="#c8f3ff" stroke="#3a8fd0" stroke-width="2"/>
  <path d="M60 92 C56 60 84 42 110 46 C138 50 150 74 144 96 Q104 114 60 92Z" fill="${bd}" stroke="${dk}" stroke-width="3"/>
  <g class="m-eyes">${omEye(88,74,12,dk,'#1e6fd9')}${omEye(116,72,11,dk,'#1e6fd9')}</g>
  ${omOuch([[88,74,9],[116,72,8]])}
  <path d="M78 58 Q88 54 98 58" stroke="${dk}" stroke-width="3.5" fill="none" stroke-linecap="round"/><path d="M106 56 Q116 52 126 56" stroke="${dk}" stroke-width="3.5" fill="none" stroke-linecap="round"/>
  <ellipse cx="76" cy="92" rx="7" ry="4" fill="#ff7a9a" opacity=".6"/><ellipse cx="130" cy="90" rx="7" ry="4" fill="#ff7a9a" opacity=".6"/>
  <path d="M86 96 Q102 106 118 96" stroke="${dk}" stroke-width="3" fill="none" stroke-linecap="round"/>
  <circle class="mk-core" cx="120" cy="150" r="1" fill="none"/><circle class="mk-mouth" cx="70" cy="96" r="1" fill="none"/>`;
  return omSvg('rekiness',p,m,inner,`<filter id="${p}gl" x="-80%" y="-80%" width="260%" height="260%"><feGaussianBlur stdDeviation="3"/></filter>`); }

/* 刃爪怪獸 特利吉拉斯: black feathered dino-bird, red belly & face, pink crest, long red claws (turns see-through sometimes) */
function therizirusSVG(p){ const m=MONS.therizirus, dk=m.dark, bd=`url(#${p}bd)`;
  let fth=''; for(let y=126;y<=196;y+=14) for(let x=134;x<=178;x+=14){ const xx=x+((y/14)%2?7:0); if((xx-156)*(xx-156)/900+(y-164)*(y-164)/1600<1) fth+=`<path d="M${xx-6} ${y} L${xx} ${y+7} L${xx+6} ${y}" stroke="${m.light}" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`; }
  let mane=''; [[122,64,40],[132,78,60],[140,94,80],[144,110,96]].forEach(s=>{ mane+=omSpike(s[0],s[1],s[2],20,7,bd,dk); });
  const inner=`<g class="th-cloak">
  <g fill="${bd}" stroke="${dk}" stroke-width="2.5" stroke-linejoin="round"><path d="M176 190 Q218 186 234 160 Q214 168 206 160 Q214 176 180 176Z"/><path d="M178 176 Q214 164 226 138 Q208 148 200 142 Q204 160 176 164Z"/></g>
  ${omFeet(dk,'#e0354f',[94,160])}
  ${mane}
  <path d="M60 212 C44 168 56 118 100 102 C150 86 200 130 194 212 Q126 226 60 212Z" fill="${bd}" stroke="${dk}" stroke-width="3"/>
  ${fth}
  <path d="M78 206 C68 176 76 140 104 128 C126 132 132 176 126 208 Q100 212 78 206Z" fill="${m.belly}" stroke="#7d1426" stroke-width="2"/>
  <g stroke="#8f1b30" stroke-width="2" fill="none"><path d="M82 160 Q102 166 124 158"/><path d="M80 178 Q102 184 126 176"/><path d="M82 194 Q102 200 126 192"/></g>
  <path d="M104 134 Q72 136 58 154 L68 164 Q80 152 106 152Z" fill="${bd}" stroke="${dk}" stroke-width="3" stroke-linejoin="round"/>
  <g fill="#e0354f" stroke="#7d1426" stroke-width="2" stroke-linejoin="round"><path d="M62 150 Q30 136 10 150 Q34 146 60 160Z"/><path d="M60 158 Q28 158 12 176 Q36 166 60 166Z"/><path d="M64 164 Q40 176 32 196 Q48 180 68 170Z"/></g>
  <path d="M100 54 L94 22 L108 46 L114 16 L120 48 L132 28 L126 58Z" fill="#ff7ac8" stroke="#b0307a" stroke-width="2" stroke-linejoin="round"/>
  <path d="M62 90 C60 62 84 48 106 52 C128 56 136 78 128 96 Q98 110 62 90Z" fill="${bd}" stroke="${dk}" stroke-width="3"/>
  <path d="M62 90 Q90 106 126 98 Q114 114 88 112 Q70 106 62 90Z" fill="${m.belly}" stroke="#7d1426" stroke-width="2"/>
  <path d="M68 74 C50 68 32 74 24 88 C38 86 52 88 66 94Z" fill="#3a3f48" stroke="${dk}" stroke-width="2.5" stroke-linejoin="round"/><path d="M36 80 Q48 76 62 78" stroke="#7b8494" stroke-width="2" fill="none"/>
  <g class="m-eyes">${omEye(88,72,11,dk,'#22d3ee')}${omEye(110,70,9,dk,'#22d3ee')}</g>
  ${omOuch([[88,72,9],[110,70,7]])}
  <path d="M76 58 L98 64" stroke="${dk}" stroke-width="4.5" stroke-linecap="round"/><path d="M104 60 L120 56" stroke="${dk}" stroke-width="4" stroke-linecap="round"/>
  <circle class="mk-core" cx="120" cy="160" r="1" fill="none"/><circle class="mk-mouth" cx="28" cy="86" r="1" fill="none"/></g>`;
  return omSvg('therizirus',p,m,inner); }

/* 傳說蛇獸 大蛇主命: very long serpent — coiled body, segmented neck, cream dragon head with swept-back mane (sways) */
function ohebinushiSVG(p){ const m=MONS.ohebinushi, dk=m.dark, bd=`url(#${p}bd)`, cr=m.belly;
  const neck='M150 190 C176 146 164 112 124 100 C90 90 84 66 98 44';
  const inner=`
  <path d="M84 214 Q52 218 38 204 Q32 196 40 192" stroke="${dk}" stroke-width="16" fill="none" stroke-linecap="round"/><path d="M84 214 Q52 218 38 204 Q32 196 40 192" stroke="${m.body}" stroke-width="11" fill="none" stroke-linecap="round"/>
  <ellipse cx="148" cy="206" rx="72" ry="19" fill="${bd}" stroke="${dk}" stroke-width="3"/>
  <path d="M82 212 Q148 234 214 210" stroke="${cr}" stroke-width="8" fill="none" stroke-dasharray="10 4"/>
  <ellipse cx="148" cy="188" rx="54" ry="15" fill="${bd}" stroke="${dk}" stroke-width="3"/>
  <path d="M98 192 Q148 210 198 190" stroke="${cr}" stroke-width="7" fill="none" stroke-dasharray="9 4"/>
  <g class="ob-neck">
  <path d="${neck}" stroke="${dk}" stroke-width="34" fill="none" stroke-linecap="round"/><path d="${neck}" stroke="${m.body}" stroke-width="29" fill="none" stroke-linecap="round"/>
  <path d="${neck}" stroke="${cr}" stroke-width="14" fill="none" stroke-dasharray="9 4" transform="translate(-7 2)"/>
  <path d="${neck}" stroke="${m.light}" stroke-width="4" fill="none" transform="translate(8 -2)" opacity=".6"/>
  <path d="M104 26 L142 10 L120 32 L150 30 L118 44 L142 56 L112 50Z" fill="#fff6dc" stroke="${dk}" stroke-width="2" stroke-linejoin="round"/>
  <path d="M118 42 C114 22 94 14 76 20 C58 26 42 34 30 44 C28 52 34 60 44 60 L72 62 C94 64 116 60 118 42Z" fill="${cr}" stroke="${dk}" stroke-width="3"/>
  <path d="M40 60 Q62 76 94 66 Q70 64 44 56Z" fill="#d9ccaa" stroke="${dk}" stroke-width="2"/><path d="M52 60 l3 6 l3 -5z M66 62 l3 6 l3 -6z" fill="#fff"/>
  <path d="M60 30 Q84 22 108 30" stroke="${m.accent}" stroke-width="4" fill="none" stroke-linecap="round"/><path d="M34 44 Q46 40 58 44" stroke="#b9ab86" stroke-width="2" fill="none"/>
  <circle cx="36" cy="46" r="2.5" fill="${dk}"/>
  <g class="m-eyes">${omEye(80,40,10,dk,'#f59e0b')}${omEye(100,38,8,dk,'#f59e0b')}</g>
  ${omOuch([[80,40,8],[100,38,6]])}
  <path d="M70 28 L90 32" stroke="${dk}" stroke-width="4" stroke-linecap="round"/>
  <ellipse cx="66" cy="54" rx="6" ry="3.5" fill="#ff7a9a" opacity=".55"/>
  <circle class="mk-mouth" cx="38" cy="56" r="1" fill="none"/><circle class="mk-core" cx="140" cy="128" r="1" fill="none"/></g>`;
  return omSvg('ohebinushi',p,m,inner); }

/* 猛突怪獸 蓋多拉哥: pink furry mole with a long snout and grey horn-helmet over its light-shy eyes */
function gedragoSVG(p){ const m=MONS.gedrago, dk=m.dark, bd=`url(#${p}bd)`;
  const fur=(cx,cy,rx,ry,n,a0,a1,bottom)=>{ let d=''; for(let i=0;i<=n;i++){ const a=(a0+(a1-a0)*i/n)*Math.PI/180, k=i%2?1.08:1; let x=cx+Math.cos(a)*rx*k, y=cy+Math.sin(a)*ry*k; if(bottom&&y>bottom) y=bottom; d+=(i?' L':'M')+x.toFixed(1)+' '+y.toFixed(1); } return d+' Z'; };
  const inner=`
  <path d="${fur(196,176,26,16,14,-60,150)}" fill="${bd}" stroke="${dk}" stroke-width="2.5" stroke-linejoin="round"/>
  ${omFeet('#6d7480','#d6dae0',[92,160])}
  <g class="gd-fur"><path d="${fur(126,150,70,72,52,0,360,214)}" fill="${bd}" stroke="${dk}" stroke-width="3" stroke-linejoin="round"/>
  <path d="M106 118 Q126 112 146 118 L142 208 Q124 213 110 208Z" fill="${m.belly}" stroke="#3b1e24" stroke-width="2"/>
  <g stroke="#3b1e24" stroke-width="2" fill="none"><path d="M108 138 Q126 142 144 138"/><path d="M109 158 Q126 162 143 158"/><path d="M109 178 Q126 182 143 178"/><path d="M110 196 Q126 200 142 196"/></g>
  <g stroke="${m.light}" stroke-width="2" fill="none" opacity=".8"><path d="M160 120 l6 8 l4 -9"/><path d="M170 160 l6 8 l4 -9"/><path d="M76 176 l6 8 l4 -9"/><path d="M150 196 l6 8 l4 -9"/></g></g>
  <path d="M76 140 Q52 142 42 160 L54 168 Q64 156 84 156 Z" fill="${bd}" stroke="${dk}" stroke-width="3" stroke-linejoin="round"/>
  <g fill="#d6dae0" stroke="#4b5059" stroke-width="2" stroke-linejoin="round"><path d="M46 156 L24 152 L42 166Z"/><path d="M44 164 L22 170 L46 172Z"/><path d="M50 170 L34 184 L54 174Z"/></g>
  <path d="${fur(92,86,38,34,30,0,360)}" fill="${bd}" stroke="${dk}" stroke-width="3" stroke-linejoin="round"/>
  <path d="M64 94 C44 96 28 106 22 118 C30 124 46 120 68 110Z" fill="${m.light}" stroke="${dk}" stroke-width="2.5" stroke-linejoin="round"/>
  <ellipse cx="23" cy="117" rx="6" ry="5" fill="#ff4f97" stroke="${dk}" stroke-width="2"/>
  <path d="M112 62 C128 44 146 42 158 50 C146 52 136 58 126 70Z" fill="${m.horn}" stroke="#4b5059" stroke-width="2.5" stroke-linejoin="round"/>
  <path d="M58 72 C72 50 112 48 126 66 L118 76 C104 64 80 64 66 80Z" fill="${m.horn}" stroke="#4b5059" stroke-width="2.5" stroke-linejoin="round"/>
  <path d="M68 66 Q92 54 116 62" stroke="#e4e7ec" stroke-width="2.5" fill="none" stroke-linecap="round"/>
  <g class="m-eyes">${omEye(80,84,9,dk,'#5b1234')}${omEye(102,82,8,dk,'#5b1234')}<path d="M71 83 A9 9 0 0 1 89 83 Z" fill="${m.light}" stroke="${dk}" stroke-width="2"/><path d="M94 81 A8 8 0 0 1 110 81 Z" fill="${m.light}" stroke="${dk}" stroke-width="2"/></g>
  ${omOuch([[80,84,8],[102,82,7]])}
  <path d="M46 116 Q58 122 70 114" stroke="${dk}" stroke-width="2.5" fill="none" stroke-linecap="round"/><path d="M52 118 l2 5 l3 -4z M62 118 l2 5 l3 -5z" fill="#fff"/>
  <ellipse cx="94" cy="104" rx="7" ry="4" fill="#ff4f97" opacity=".6"/>
  <circle class="mk-core" cx="124" cy="150" r="1" fill="none"/><circle class="mk-mouth" cx="26" cy="116" r="1" fill="none"/>`;
  return omSvg('gedrago',p,m,inner); }

/* 宇宙甲獸 瓦古塞克特: dark space-insect mid-boss — glowing red eyes, scythe arms, mandibles */
function vugsectSVG(p){ const m=MONS.vugsect, dk=m.dark, bd=`url(#${p}bd)`;
  let sp=''; [[120,98,-10],[146,94,6],[172,100,24],[196,114,44],[210,136,64]].forEach(s=>{ sp+=omSpike(s[0],s[1],s[2],20,7,'#4b3d6e',dk); });
  const leg=d=>`<path d="${d}" stroke="${dk}" stroke-width="11" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="${d}" stroke="#4b3d6e" stroke-width="6" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;
  const inner=`
  <g class="m-float" fill="#ff4fd8"><circle cx="20" cy="30" r="2.5"/><circle cx="220" cy="60" r="3"/><circle cx="200" cy="20" r="2"/><circle cx="30" cy="190" r="2.5"/><circle cx="230" cy="200" r="2"/></g>
  ${leg('M160 180 L196 196 L208 224')}${leg('M186 168 L222 182 L232 214')}
  <path d="M110 118 L128 66" stroke="${dk}" stroke-width="12" stroke-linecap="round"/><path d="M110 118 L128 66" stroke="#4b3d6e" stroke-width="7" stroke-linecap="round"/>
  <path d="M128 66 C112 40 80 34 58 44 C80 46 104 54 122 78Z" fill="#8f7fc0" stroke="${dk}" stroke-width="2.5" stroke-linejoin="round"/>
  ${sp}
  <path d="M70 190 C56 140 88 96 140 96 C196 96 224 140 214 180 C206 206 150 214 110 208 C90 206 76 200 70 190Z" fill="${bd}" stroke="${dk}" stroke-width="3"/>
  <g stroke="${m.light}" stroke-width="2.5" fill="none" opacity=".7"><path d="M112 110 Q124 150 116 204"/><path d="M150 102 Q164 150 156 206"/><path d="M186 112 Q200 150 192 196"/></g>
  <path d="M110 112 Q140 104 170 110" stroke="#fff" stroke-width="4" fill="none" stroke-linecap="round" opacity=".35"/>
  ${leg('M96 190 L90 212 L76 226')}${leg('M124 200 L130 214 L122 228')}
  <path d="M40 124 C38 94 62 76 90 80 C116 84 124 108 118 130 C110 150 80 156 60 148 C48 142 42 134 40 124Z" fill="${bd}" stroke="${dk}" stroke-width="3"/>
  <path d="M60 84 Q50 58 36 50" stroke="${dk}" stroke-width="4" fill="none" stroke-linecap="round"/><path d="M80 80 Q82 54 96 42" stroke="${dk}" stroke-width="4" fill="none" stroke-linecap="round"/><circle cx="36" cy="50" r="5" fill="#ff4fd8" stroke="${dk}" stroke-width="2"/><circle cx="96" cy="42" r="5" fill="#ff4fd8" stroke="${dk}" stroke-width="2"/>
  <g fill="#a99ad8" stroke="${dk}" stroke-width="2.5" stroke-linejoin="round"><path d="M52 138 Q26 140 20 158 Q34 150 56 148Z"/><path d="M66 146 Q50 166 60 178 Q62 162 74 152Z"/></g>
  <path d="M98 120 L84 72" stroke="${dk}" stroke-width="12" stroke-linecap="round"/><path d="M98 120 L84 72" stroke="#5b4d80" stroke-width="7" stroke-linecap="round"/>
  <path d="M84 72 C66 48 34 44 12 58 C36 56 60 62 80 86Z" fill="#b7a8e8" stroke="${dk}" stroke-width="2.5" stroke-linejoin="round"/>
  <g fill="#fff" opacity=".8"><path d="M22 58 l4 5 l3 -6z"/><path d="M36 54 l4 6 l3 -6z"/><path d="M50 54 l4 6 l3 -6z"/></g>
  <g class="m-eyes"><g class="vg-glow" filter="url(#${p}gl)"><ellipse cx="64" cy="108" rx="14" ry="11" fill="#ff2d55"/><ellipse cx="94" cy="104" rx="15" ry="12" fill="#ff2d55"/></g>
  <ellipse cx="64" cy="108" rx="11" ry="9" fill="#ff3b5c" stroke="#5a0016" stroke-width="2"/><ellipse cx="94" cy="104" rx="12" ry="10" fill="#ff3b5c" stroke="#5a0016" stroke-width="2"/>
  <ellipse cx="60" cy="105" rx="4" ry="3" fill="#fff"/><ellipse cx="90" cy="100" rx="4.5" ry="3.2" fill="#fff"/><circle cx="68" cy="112" r="1.8" fill="#ffd1dc"/><circle cx="99" cy="108" r="2" fill="#ffd1dc"/>
  <circle cx="72" cy="90" r="4" fill="#ff3b5c" stroke="#5a0016" stroke-width="1.5"/><circle cx="92" cy="88" r="4" fill="#ff3b5c" stroke="#5a0016" stroke-width="1.5"/></g>
  ${omOuch([[64,108,9],[94,104,9]])}
  <circle class="mk-core" cx="130" cy="150" r="1" fill="none"/><circle class="mk-mouth" cx="40" cy="148" r="1" fill="none"/>`;
  return omSvg('vugsect',p,m,inner,`<filter id="${p}gl" x="-80%" y="-80%" width="260%" height="260%"><feGaussianBlur stdDeviation="4"/></filter>`); }

/* 流星怪獸 特萊加隆: friendly black-and-gold mecha tiger partner with blade fins and a pentagon chest light */
function trigaronSVG(p){ const m=MONS.trigaron, dk=m.dark, bd=`url(#${p}bd)`, G=m.gold, GD='#a87400';
  const legP=(x)=>`<path d="M${x-12} 150 L${x-14} 204 L${x+10} 204 L${x+12} 150Z" fill="${bd}" stroke="${dk}" stroke-width="2.5" stroke-linejoin="round"/><path d="M${x-10} 170 L${x+10} 170" stroke="${m.light}" stroke-width="2"/><path d="M${x-13} 162 L${x+13} 160 L${x+8} 176 L${x-9} 176Z" fill="${G}" stroke="${GD}" stroke-width="1.8" stroke-linejoin="round"/><path d="M${x-20} 204 L${x+14} 204 L${x+16} 218 L${x-24} 218Z" fill="#3a3f48" stroke="${dk}" stroke-width="2.5" stroke-linejoin="round"/><g fill="${G}" stroke="${GD}" stroke-width="1.5" stroke-linejoin="round"><path d="M${x-24} 218 l-6 4 l10 0z"/><path d="M${x-12} 218 l-5 5 l9 0z"/></g>`;
  const inner=`
  <g class="m-spark" stroke="#ffe14d" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M150 36 l6 8 l-5 3 l7 9"/><path d="M214 72 l-7 6 l5 4 l-8 6"/><path d="M104 40 l5 7 l-4 3 l6 8"/></g>
  <path d="M204 132 Q226 124 230 100" stroke="${dk}" stroke-width="14" fill="none" stroke-linecap="round"/><path d="M204 132 Q226 124 230 100" stroke="#4a505c" stroke-width="9" fill="none" stroke-linecap="round" stroke-dasharray="8 3"/>
  <path d="M222 104 L238 70 L234 108Z" fill="${G}" stroke="${GD}" stroke-width="2" stroke-linejoin="round"/>
  ${legP(186)}${legP(158)}
  <path d="M110 94 L136 46 L142 96Z" fill="${G}" stroke="${GD}" stroke-width="2.5" stroke-linejoin="round"/><path d="M142 96 L176 54 L172 102Z" fill="${G}" stroke="${GD}" stroke-width="2.5" stroke-linejoin="round"/><path d="M172 104 L212 76 L198 118Z" fill="${G}" stroke="${GD}" stroke-width="2.5" stroke-linejoin="round"/>
  <path d="M52 122 C60 98 100 90 140 94 C176 96 204 106 210 128 C212 152 196 166 170 168 L84 168 C62 164 48 146 52 122Z" fill="${bd}" stroke="${dk}" stroke-width="3"/>
  <g stroke="${m.light}" stroke-width="2" fill="none"><path d="M96 104 L100 164"/><path d="M136 100 L138 166"/><path d="M172 104 L170 164"/><path d="M104 132 L166 132"/></g>
  <path d="M100 100 Q140 94 184 104" stroke="#9aa2b0" stroke-width="3" fill="none" stroke-linecap="round" opacity=".7"/>
  ${legP(106)}${legP(74)}
  <path d="M86 112 L126 78 L118 124Z" fill="${G}" stroke="${GD}" stroke-width="2.5" stroke-linejoin="round"/>
  <polygon points="${pent(80,142,11)}" fill="#3a3f48" stroke="${dk}" stroke-width="2"/><polygon points="${pent(80,142,10)}" fill="#ffb000" filter="url(#${p}gl)"/><polygon points="${pent(80,142,7)}" fill="#ffd66b" stroke="#fff" stroke-width="1"/>
  <path d="M52 76 L90 40 L76 80Z" fill="${G}" stroke="${GD}" stroke-width="2.5" stroke-linejoin="round"/><path d="M68 74 L108 52 L88 84Z" fill="${G}" stroke="${GD}" stroke-width="2.5" stroke-linejoin="round"/>
  <path d="M20 110 C18 86 38 70 62 72 C86 74 96 92 92 112 C88 130 62 138 42 134 C28 130 20 122 20 110Z" fill="${bd}" stroke="${dk}" stroke-width="3"/>
  <path d="M20 112 C26 104 46 104 60 110 C58 124 44 132 30 128 C22 124 20 118 20 112Z" fill="#dfe3ea" stroke="${dk}" stroke-width="2.5"/>
  <path d="M24 122 L56 120" stroke="${dk}" stroke-width="2"/><path d="M28 120 l3 -5 l3 5z M38 120 l3 -5 l3 5z M48 119 l3 -5 l3 5z" fill="#fff"/>
  <path d="M40 76 L60 78" stroke="${G}" stroke-width="3" stroke-linecap="round"/>
  <g class="m-eyes">${omEye(46,94,10,dk,'#ff9d00')}${omEye(70,92,9,dk,'#ff9d00')}</g>
  ${omOuch([[46,94,8],[70,92,7]])}
  <path d="M34 80 L56 86" stroke="${dk}" stroke-width="4.5" stroke-linecap="round"/><path d="M62 82 L80 78" stroke="${dk}" stroke-width="4" stroke-linecap="round"/>
  <circle class="mk-core" cx="130" cy="132" r="1" fill="none"/><circle class="mk-mouth" cx="24" cy="116" r="1" fill="none"/>`;
  return omSvg('trigaron',p,m,inner,`<filter id="${p}gl" x="-80%" y="-80%" width="260%" height="260%"><feGaussianBlur stdDeviation="3"/></filter>`); }
