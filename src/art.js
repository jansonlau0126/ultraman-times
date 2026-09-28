/* ===== ART: icons, chibi hero, 18 kaiju, skyline, medals (final cast) ===== */
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

/* Fan-art chibi 超人奧米加 — 五段變身最終定稿 */
function heroSVG(p){
  const ol='#2a2a40', sv='#e8edf5', cy='#5ee7ff';
  const eye=(x)=>'<ellipse class="h-eyeglow" cx="'+x+'" cy="78" rx="18" ry="22" fill="'+cy+'" filter="url(#'+p+'gl)" opacity=".85"/><ellipse cx="'+x+'" cy="78" rx="14" ry="18" fill="'+cy+'" stroke="#0a3a52" stroke-width="2"/><ellipse cx="'+(x-4)+'" cy="74" rx="4" ry="5" fill="#fff" opacity=".7"/>';
  const gem=(x,y,s)=>'<ellipse cx="'+x+'" cy="'+y+'" rx="'+s+'" ry="'+(s*1.4)+'" fill="'+cy+'" stroke="#fff" stroke-width="1.2"/>';
  return '<svg class="hero henshin-1" viewBox="0 0 220 320" preserveAspectRatio="xMidYMax meet" aria-hidden="true" style="--tc:#5ee7ff">'+
    '<defs>'+
    '<linearGradient id="'+p+'sv" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset=".45" stop-color="#e2e8f0"/><stop offset="1" stop-color="#9aa8bc"/></linearGradient>'+
    '<linearGradient id="'+p+'rd" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ff6b6b"/><stop offset="1" stop-color="#c62828"/></linearGradient>'+
    '<linearGradient id="'+p+'bl" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5bbcff"/><stop offset="1" stop-color="#1565c0"/></linearGradient>'+
    '<linearGradient id="'+p+'gd" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffe566"/><stop offset="1" stop-color="#f0b429"/></linearGradient>'+
    '<filter id="'+p+'gl" x="-80%" y="-80%" width="260%" height="260%"><feGaussianBlur stdDeviation="3.2"/></filter>'+
    '</defs>'+
    '<ellipse class="h-aura" cx="110" cy="170" rx="100" ry="145" fill="#a8f0ff" filter="url(#'+p+'gl)" opacity=".5"/>'+
    '<g class="h-halo"><circle cx="110" cy="70" r="58" fill="none" stroke="#ffe566" stroke-width="10" opacity=".9" filter="url(#'+p+'gl)"/><circle cx="110" cy="70" r="48" fill="none" stroke="#fff" stroke-width="3" opacity=".7"/></g>'+
    '<g class="h-wings">'+
    '<path d="M70 130 C10 90 -20 120 8 170 C30 145 50 150 70 168 Z" fill="#7ff0ff" filter="url(#'+p+'gl)" opacity=".85"/>'+
    '<path d="M150 130 C210 90 240 120 212 170 C190 145 170 150 150 168 Z" fill="#7ff0ff" filter="url(#'+p+'gl)" opacity=".85"/>'+
    '<path d="M70 130 C30 105 10 130 28 162" stroke="#fff" stroke-width="2.5" fill="none"/><path d="M150 130 C190 105 210 130 192 162" stroke="#fff" stroke-width="2.5" fill="none"/>'+
    '</g>'+
    '<g class="h-gold-aura" fill="#ffe566" filter="url(#'+p+'gl)" opacity=".85">'+
    '<path d="M110 40 L118 8 L126 40"/><path d="M70 70 L48 40 L78 78"/><path d="M150 70 L172 40 L142 78"/>'+
    '<path d="M55 120 L22 110 L60 135"/><path d="M165 120 L198 110 L160 135"/>'+
    '<path d="M60 180 L28 190 L65 195"/><path d="M160 180 L192 190 L155 195"/>'+
    '</g>'+
    '<g class="h-cape-blue"><path d="M78 118 C40 150 30 220 55 270 C70 230 85 200 95 160 Z" fill="url(#'+p+'bl)" stroke="'+ol+'" stroke-width="2.2"/><path d="M142 118 C180 150 190 220 165 270 C150 230 135 200 125 160 Z" fill="url(#'+p+'bl)" stroke="'+ol+'" stroke-width="2.2"/></g>'+
    '<g class="h-cape-gold"><path d="M78 118 C40 150 30 220 55 270 C70 230 85 200 95 160 Z" fill="url(#'+p+'gd)" stroke="'+ol+'" stroke-width="2.2"/><path d="M142 118 C180 150 190 220 165 270 C150 230 135 200 125 160 Z" fill="url(#'+p+'gd)" stroke="'+ol+'" stroke-width="2.2"/></g>'+
    '<g class="h-cape-red"><path d="M78 118 C36 160 24 230 50 285 C68 240 86 205 96 165 Z" fill="url(#'+p+'rd)" stroke="'+ol+'" stroke-width="2.2" opacity=".95"/><path d="M142 118 C184 160 196 230 170 285 C152 240 134 205 124 165 Z" fill="url(#'+p+'rd)" stroke="'+ol+'" stroke-width="2.2" opacity=".95"/></g>'+
    '<ellipse cx="110" cy="302" rx="70" ry="8" fill="#000" opacity=".25"/>'+
    /* legs */
    '<g class="h-legL"><path d="M78 200 C70 240 62 270 58 295 L78 298 L90 230 Z" fill="url(#'+p+'sv)" stroke="'+ol+'" stroke-width="2.4"/><path class="h-mark-red" d="M70 230 L82 290" stroke="url(#'+p+'rd)" stroke-width="10" stroke-linecap="round"/><path class="h-mark-blue" d="M70 230 L82 290" stroke="url(#'+p+'bl)" stroke-width="10" stroke-linecap="round"/></g>'+
    '<g class="h-legR"><path d="M142 200 C150 240 158 270 162 295 L142 298 L130 230 Z" fill="url(#'+p+'sv)" stroke="'+ol+'" stroke-width="2.4"/><path class="h-mark-red" d="M150 230 L138 290" stroke="url(#'+p+'rd)" stroke-width="10" stroke-linecap="round"/><path class="h-mark-blue" d="M150 230 L138 290" stroke="url(#'+p+'bl)" stroke-width="10" stroke-linecap="round"/></g>'+
    '<g class="h-kick"><path d="M130 200 L190 170 L210 165" stroke="'+ol+'" stroke-width="22" fill="none" stroke-linecap="round"/><path d="M130 200 L190 170 L210 165" stroke="url(#'+p+'sv)" stroke-width="16" fill="none" stroke-linecap="round"/><path class="h-mark-red" d="M140 195 L200 168" stroke="url(#'+p+'rd)" stroke-width="8"/><path class="h-mark-blue" d="M140 195 L200 168" stroke="url(#'+p+'bl)" stroke-width="8"/><ellipse cx="214" cy="164" rx="16" ry="12" fill="url(#'+p+'sv)" stroke="'+ol+'" stroke-width="2.2"/></g>'+
    /* arms idle */
    '<g class="h-armL"><path d="M70 130 L48 170 L42 210" stroke="'+ol+'" stroke-width="20" fill="none" stroke-linecap="round"/><path d="M70 130 L48 170 L42 210" stroke="url(#'+p+'sv)" stroke-width="14" fill="none" stroke-linecap="round"/><path class="h-mark-red" d="M62 140 L46 200" stroke="url(#'+p+'rd)" stroke-width="7"/><path class="h-mark-blue" d="M62 140 L46 200" stroke="url(#'+p+'bl)" stroke-width="7"/><circle cx="42" cy="218" r="12" fill="url(#'+p+'sv)" stroke="'+ol+'" stroke-width="2.2"/></g>'+
    '<g class="h-armR"><path d="M150 130 L172 170 L178 210" stroke="'+ol+'" stroke-width="20" fill="none" stroke-linecap="round"/><path d="M150 130 L172 170 L178 210" stroke="url(#'+p+'sv)" stroke-width="14" fill="none" stroke-linecap="round"/><path class="h-mark-red" d="M158 140 L174 200" stroke="url(#'+p+'rd)" stroke-width="7"/><path class="h-mark-blue" d="M158 140 L174 200" stroke="url(#'+p+'bl)" stroke-width="7"/><circle cx="178" cy="218" r="12" fill="url(#'+p+'sv)" stroke="'+ol+'" stroke-width="2.2"/><circle class="mk-hand" cx="178" cy="218" r="1" fill="none"/></g>'+
    /* pose arms */
    '<g class="h-cross"><path d="M70 130 L100 150 L190 140" stroke="'+ol+'" stroke-width="20" fill="none" stroke-linecap="round"/><path d="M70 130 L100 150 L190 140" stroke="url(#'+p+'sv)" stroke-width="14" fill="none" stroke-linecap="round"/><path d="M150 130 L165 200 L165 70" stroke="'+ol+'" stroke-width="20" fill="none" stroke-linecap="round"/><path d="M150 130 L165 200 L165 70" stroke="url(#'+p+'sv)" stroke-width="14" fill="none" stroke-linecap="round"/><circle cx="198" cy="140" r="13" fill="'+cy+'" filter="url(#'+p+'gl)"/><circle cx="198" cy="140" r="6" fill="#fff"/><circle class="mk-hand" cx="198" cy="140" r="1" fill="none"/></g>'+
    '<g class="h-guard"><path d="M70 130 L40 165 L70 175" stroke="url(#'+p+'sv)" stroke-width="14" fill="none" stroke-linecap="round" stroke="'+ol+'"/><path d="M150 130 L185 150 L180 90" stroke="url(#'+p+'sv)" stroke-width="14" fill="none" stroke-linecap="round"/></g>'+
    /* torso */
    '<path d="M62 118 L158 118 Q156 165 148 200 L72 200 Q64 165 62 118 Z" fill="url(#'+p+'sv)" stroke="'+ol+'" stroke-width="2.6" stroke-linejoin="round"/>'+
    '<path class="h-mark-red" d="M78 125 L78 195 M142 125 L142 195 M90 125 L100 195 M130 125 L120 195" stroke="url(#'+p+'rd)" stroke-width="11" stroke-linecap="round" opacity=".95"/>'+
    '<path class="h-mark-blue" d="M78 125 L78 195 M142 125 L142 195 M90 125 L100 195 M130 125 L120 195" stroke="url(#'+p+'bl)" stroke-width="11" stroke-linecap="round" opacity=".95"/>'+
    '<path d="M86 118 L134 118 L136 136 L84 136 Z" fill="url(#'+p+'sv)" stroke="'+ol+'" stroke-width="2"/>'+
    '<path class="h-collar" d="M78 120 L110 148 L142 120 L130 118 L110 138 L90 118 Z" fill="url(#'+p+'gd)" stroke="'+ol+'" stroke-width="2" stroke-linejoin="round"/>'+
    '<circle cx="110" cy="162" r="16" fill="#cfd8e6" stroke="'+ol+'" stroke-width="2.2"/>'+
    '<circle class="h-tglow" cx="110" cy="162" r="13" filter="url(#'+p+'gl)" opacity=".95"/>'+
    '<circle class="h-timer" cx="110" cy="162" r="11.5" stroke="#1a2a4a" stroke-width="1.5"/>'+
    '<circle class="mk-chest" cx="110" cy="162" r="1" fill="none"/>'+
    /* head */
    '<g class="h-head">'+
    '<path d="M110 18 C138 18 152 42 152 72 C152 98 138 118 110 122 C82 118 68 98 68 72 C68 42 82 18 110 18 Z" fill="url(#'+p+'sv)" stroke="'+ol+'" stroke-width="2.8"/>'+
    '<g class="h-slug"><path d="M102 22 L110 -8 L118 22 Q114 40 110 52 Q106 40 102 22 Z" fill="url(#'+p+'sv)" stroke="'+ol+'" stroke-width="2.2"/><circle class="mk-slug" cx="110" cy="10" r="1" fill="none"/></g>'+
    gem(110,34,5)+gem(110,48,4)+gem(110,60,3.2)+
    eye(92)+eye(128)+
    '<path d="M96 98 L124 98 L122 108 L98 108 Z" fill="url(#'+p+'sv)" stroke="'+ol+'" stroke-width="1.6"/>'+
    '</g>'+
    '<circle class="mk-beam" cx="198" cy="140" r="1" fill="none"/>'+
    '</svg>';
}

/* ===== 18 怪獸最終定稿 ===== */
const MONS = {
  heidragon:{name:'滅世黑龍', nick:'黑炎龍息', kind:'黑炎龍', habitat:'熔岩裂谷', lore:'全身黑甲嘅滅世黑龍。黑炎龍息一噴，連乘數表都燒焦！', body:'#2a2a32', light:'#6a6a78', dark:'#101014', belly:'#c0c4ce', shot:'#ff6a00', elem:'fire'},
  lavaover:{name:'炎獄霸王', nick:'爆裂地獄擊', kind:'熔岩霸王', habitat:'地獄火口', lore:'滾熱岩漿組成嘅圓滾霸王。爆裂地獄擊會砸出火拳！', body:'#c4451a', light:'#ff8a3d', dark:'#4a1508', belly:'#2a1010', shot:'#ff6a00', elem:'fire'},
  holyturt:{name:'天輝聖龜', nick:'絕對零度光線', kind:'聖晶龜', habitat:'極地聖湖', lore:'背殼長滿藍水晶嘅聖龜。絕對零度光線會凍結錯答案！', body:'#3cb371', light:'#8ef0b0', dark:'#14532d', belly:'#e8fff0', shot:'#7ff0ff', elem:'ice'},
  sandwyrm:{name:'黃泉魔龍', nick:'萬毒蝕骨霧', kind:'黃砂魔龍', habitat:'黃泉沙漠', lore:'從黃沙爬出嘅魔龍。萬毒蝕骨霧會令你頭暈眼花！', body:'#c4a574', light:'#e8d4a8', dark:'#6b4e2e', belly:'#f5e6c8', shot:'#a3e635', elem:'poison'},
  thundwolf:{name:'雷神戰狼', nick:'天雷神滅抓', kind:'雷狼', habitat:'雷雲高原', lore:'毛茸茸嘅雷神戰狼。天雷神滅抓閃電一閃就到！', body:'#7ec8f5', light:'#e8f7ff', dark:'#1a4a7a', belly:'#ffffff', shot:'#fde047', elem:'thunder'},
  ninjacat:{name:'幻影鬼貓', nick:'永暗影遁', kind:'影忍貓', habitat:'暗影屋簷', lore:'忍者裝束嘅幻影鬼貓。永暗影遁會突然消失再偷襲！', body:'#2b2b32', light:'#6a6a78', dark:'#0a0a10', belly:'#ffd54f', shot:'#c4a0ff', elem:'shadow'},
  steeltiran:{name:'鋼鐵暴君', short:'鋼鐵暴君', nick:'無限絞肉風暴', kind:'鋼鐵暴君', habitat:'廢鐵要塞', lore:'全身鋸齒鋼鐵嘅暴君。無限絞肉風暴會捲走答錯嘅題！', body:'#6b7280', light:'#d1d5db', dark:'#1f2937', belly:'#9ca3af', shot:'#ef4444', elem:'rock', boss:true},
  icetiran:{name:'極冰暴君', nick:'絕對零度', kind:'極冰暴君', habitat:'永凍冰原', lore:'圓滾滾嘅極冰暴君。絕對零度一呼，成個畫面結冰！', body:'#93c5fd', light:'#e0f2fe', dark:'#1e3a8a', belly:'#ffffff', shot:'#bae6fd', elem:'ice'},
  phoenix:{name:'不死鳥', nick:'涅槃天火', kind:'不死鳥', habitat:'太陽火山', lore:'浴火重生嘅不死鳥。涅槃天火從天傾瀉而下！', body:'#f97316', light:'#fdba74', dark:'#7c2d12', belly:'#fde68a', shot:'#ff6a00', elem:'fire'},
  mtngod:{name:'山岳魔神', nick:'崩天裂地', kind:'山岳魔神', habitat:'崩裂群山', lore:'獨眼岩石魔神。崩天裂地一砸，路面都裂開！', body:'#78716c', light:'#d6d3d1', dark:'#292524', belly:'#ea580c', shot:'#a8a29e', elem:'rock'},
  manflower:{name:'食人魔花', nick:'絞殺劇毒藤', kind:'魔花', habitat:'毒藤雨林', lore:'巨口魔花伸出劇毒藤蔓。絞殺劇毒藤會纏住你嘅答案！', body:'#4ade80', light:'#bbf7d0', dark:'#14532d', belly:'#fef08a', shot:'#a3e635', elem:'poison'},
  illusdemon:{name:'虛幻魔', short:'虛幻魔', nick:'真限幻滅光', kind:'虛幻魔', habitat:'鏡像次元', lore:'金屬軀殼嘅虛幻魔。真限幻滅光會從四面八方射出！', body:'#64748b', light:'#cbd5e1', dark:'#0f172a', belly:'#38bdf8', shot:'#38bdf8', elem:'shadow', boss:true},
  seaking:{name:'深淵海王', nick:'滅世大海嘯', kind:'深淵海王', habitat:'深海裂谷', lore:'海中之王掀起滅世大海嘯，答錯就會被浪捲走！', body:'#2563eb', light:'#93c5fd', dark:'#1e3a8a', belly:'#dbeafe', shot:'#38bdf8', elem:'ice'},
  deathscorp:{name:'死神蠍', nick:'黃沙萬丈', kind:'黃沙蠍獸', habitat:'萬丈沙海', lore:'沙漠死神蠍一甩尾就揚起黃沙萬丈！', body:'#d6a85c', light:'#f5e0b0', dark:'#6b4e1e', belly:'#1f1a14', shot:'#fbbf24', elem:'rock'},
  nightmare:{name:'夢魔', nick:'永眠幻視', kind:'夢魔', habitat:'噩夢迷宮', lore:'小小夢魔張開催眠之眼。永眠幻視會令你答錯題！', body:'#4c1d95', light:'#c4b5fd', dark:'#1e0a3c', belly:'#2e1065', shot:'#c084fc', elem:'shadow'},
  galmoth:{name:'銀河飛蛾', nick:'星塵暴', kind:'銀河飛蛾', habitat:'星塵軌道', lore:'銀河飛蛾拍翼散出星塵暴，閃到你睇唔清題目！', body:'#9ca3af', light:'#f3f4f6', dark:'#374151', belly:'#fde68a', shot:'#ffe066', elem:'thunder'},
  flamecrab:{name:'爆炎蟹', nick:'地獄爆炎彈', kind:'爆炎蟹', habitat:'岩漿海岸', lore:'滾燙爆炎蟹會發射地獄爆炎彈——答啱先避得開！', body:'#dc2626', light:'#fca5a5', dark:'#7f1d1d', belly:'#fb923c', shot:'#ff6a00', elem:'fire'},
  starlord:{name:'星辰霸王', short:'星辰霸王', nick:'流星天墜', kind:'星辰霸王', habitat:'流星雨夜空', lore:'最終大頭目！化作流星天墜轟落地球——要連擊變身先擋得住！', body:'#3f3f46', light:'#a1a1aa', dark:'#18181b', belly:'#fb923c', shot:'#ff7ad9', elem:'shadow', boss:true, final:true}
};

const DEX_ORDER=['heidragon','lavaover','holyturt','sandwyrm','thundwolf','ninjacat','steeltiran','icetiran','phoenix','mtngod','manflower','illusdemon','seaking','deathscorp','nightmare','galmoth','flamecrab','starlord'];

function omEye(x,y,r,dk,iris){ return `<circle cx="${x}" cy="${y}" r="${r}" fill="#fff" stroke="${dk}" stroke-width="2.4"/><circle cx="${x-r*.2}" cy="${y+r*.08}" r="${r*.55}" fill="${iris}"/><circle cx="${x-r*.25}" cy="${y+r*.1}" r="${r*.28}" fill="#111"/><circle cx="${x-r*.45}" cy="${y-r*.2}" r="${r*.2}" fill="#fff"/>`; }
function omOuch(pts){ return '<g class="m-ouch" stroke="#1f2937" stroke-width="4" stroke-linecap="round" fill="none">'+pts.map((q,i)=>{ const [x,y,s]=q, d=i%2?-1:1; return `<path d="M${x-d*s} ${y-s*.7} L${x+d*s*.6} ${y} L${x-d*s} ${y+s*.7}"/>`; }).join('')+'</g>'; }
function omSvg(type,p,m,inner,defs){ return `<svg class="mon mon-${type}" viewBox="0 0 240 240" preserveAspectRatio="xMidYMax meet" aria-hidden="true"><defs><radialGradient id="${p}bd" cx=".38" cy=".3" r=".8"><stop offset="0" stop-color="${m.light}"/><stop offset=".55" stop-color="${m.body}"/><stop offset="1" stop-color="${m.dark}"/></radialGradient>${defs||''}</defs><ellipse cx="120" cy="228" rx="78" ry="8" fill="#000" opacity=".26"/>${inner}</svg>`; }
function chibiEyes(x1,x2,y,r,dk,iris){ return `<g class="m-eyes">${omEye(x1,y,r,dk,iris)}${omEye(x2,y,r*.95,dk,iris)}</g>${omOuch([[x1,y,r*.7],[x2,y,r*.65]])}`; }
function chibiBlush(x1,x2,y){ return `<ellipse cx="${x1}" cy="${y}" rx="8" ry="5" fill="#ff7a9a" opacity=".5"/><ellipse cx="${x2}" cy="${y}" rx="8" ry="5" fill="#ff7a9a" opacity=".5"/>`; }
function mkPts(){ return '<circle class="mk-core" cx="120" cy="140" r="1" fill="none"/><circle class="mk-mouth" cx="120" cy="155" r="1" fill="none"/>'; }

function monsterSVG(type, p){
  const fn = {
    heidragon:heidragonSVG, lavaover:lavaoverSVG, holyturt:holyturtSVG, sandwyrm:sandwyrmSVG,
    thundwolf:thundwolfSVG, ninjacat:ninjacatSVG, steeltiran:steeltiranSVG, icetiran:icetiranSVG,
    phoenix:phoenixSVG, mtngod:mtngodSVG, manflower:manflowerSVG, illusdemon:illusdemonSVG,
    seaking:seakingSVG, deathscorp:deathscorpSVG, nightmare:nightmareSVG, galmoth:galmothSVG,
    flamecrab:flamecrabSVG, starlord:starlordSVG
  }[type];
  return (fn||heidragonSVG)(p);
}

function heidragonSVG(p){ const m=MONS.heidragon, dk=m.dark, bd=`url(#${p}bd)`;
  return omSvg('heidragon',p,m,`
  <path d="M168 90 Q210 60 220 100 Q200 110 175 105 Z" fill="${bd}" stroke="${dk}" stroke-width="3"/>
  <path d="M70 200 C50 140 70 80 120 70 C175 60 200 120 190 200 Q120 220 70 200Z" fill="${bd}" stroke="${dk}" stroke-width="3"/>
  <ellipse cx="120" cy="165" rx="40" ry="34" fill="${m.belly}"/>
  <path d="M95 55 L110 20 L125 55 L140 25 L150 60" fill="#ff6a00" stroke="${dk}" stroke-width="2"/>
  ${chibiEyes(100,138,100,13,dk,'#ff6a00')}${chibiBlush(88,152,118)}
  <path d="M105 130 Q120 145 138 128" stroke="${dk}" stroke-width="3" fill="none"/>
  <g class="m-flame"><path d="M200 110 C190 80 210 70 215 50 C225 75 235 95 220 120Z" fill="#ff8a3d"/></g>
  ${mkPts()}`); }

function lavaoverSVG(p){ const m=MONS.lavaover, dk=m.dark, bd=`url(#${p}bd)`;
  return omSvg('lavaover',p,m,`
  <ellipse cx="120" cy="145" rx="78" ry="70" fill="${bd}" stroke="${dk}" stroke-width="3"/>
  <path d="M70 120 Q90 90 110 115 Q130 85 155 120 Q175 95 185 130" stroke="#2a1010" stroke-width="8" fill="none"/>
  <ellipse cx="120" cy="160" rx="48" ry="36" fill="#1a0808"/>
  <path d="M85 155 Q120 195 160 150" fill="#ff6a00" stroke="${dk}" stroke-width="2"/>
  ${chibiEyes(95,145,125,14,dk,'#ffe066')}
  <g class="m-flame"><circle cx="70" cy="90" r="14" fill="#ff8a3d"/><circle cx="170" cy="85" r="12" fill="#ffb703"/><circle cx="120" cy="70" r="16" fill="#ff6a00"/></g>
  ${mkPts()}`); }

function holyturtSVG(p){ const m=MONS.holyturt, dk=m.dark, bd=`url(#${p}bd)`;
  return omSvg('holyturt',p,m,`
  <ellipse cx="120" cy="170" rx="70" ry="48" fill="${bd}" stroke="${dk}" stroke-width="3"/>
  <ellipse cx="120" cy="165" rx="52" ry="36" fill="#2d6a4f"/>
  <g fill="#7ff0ff" stroke="#fff" stroke-width="1.5">
    <path d="M100 120 L108 90 L116 120Z"/><path d="M118 115 L126 80 L134 115Z"/><path d="M136 122 L144 95 L152 122Z"/>
    <path d="M90 145 L96 125 L104 145Z"/><path d="M150 145 L158 128 L166 145Z"/>
  </g>
  <ellipse cx="120" cy="195" rx="36" ry="22" fill="${m.belly}" stroke="${dk}" stroke-width="2"/>
  <circle cx="78" cy="185" r="14" fill="${bd}" stroke="${dk}" stroke-width="2"/><circle cx="162" cy="185" r="14" fill="${bd}" stroke="${dk}" stroke-width="2"/>
  <ellipse cx="120" cy="118" rx="32" ry="28" fill="${bd}" stroke="${dk}" stroke-width="3"/>
  ${chibiEyes(108,132,112,10,dk,'#38bdf8')}${chibiBlush(98,142,124)}
  <path d="M112 128 Q120 136 130 128" stroke="${dk}" stroke-width="2.5" fill="none"/>
  ${mkPts()}`); }

function sandwyrmSVG(p){ const m=MONS.sandwyrm, dk=m.dark, bd=`url(#${p}bd)`;
  return omSvg('sandwyrm',p,m,`
  <path d="M40 200 C60 160 90 180 110 150 C130 120 150 140 170 120 C190 100 210 130 200 180 C190 210 60 220 40 200Z" fill="${bd}" stroke="${dk}" stroke-width="3"/>
  <ellipse cx="175" cy="110" rx="36" ry="32" fill="${bd}" stroke="${dk}" stroke-width="3"/>
  ${chibiEyes(162,188,105,11,dk,'#a3e635')}
  <path d="M165 122 Q175 132 188 120" stroke="${dk}" stroke-width="2.5" fill="none"/>
  <g fill="${m.dark}" opacity=".35"><ellipse cx="80" cy="190" rx="20" ry="8"/><ellipse cx="120" cy="200" rx="28" ry="10"/><ellipse cx="160" cy="185" rx="22" ry="9"/></g>
  <circle class="mk-core" cx="175" cy="120" r="1" fill="none"/><circle class="mk-mouth" cx="175" cy="128" r="1" fill="none"/>`); }

function thundwolfSVG(p){ const m=MONS.thundwolf, dk=m.dark, bd=`url(#${p}bd)`;
  return omSvg('thundwolf',p,m,`
  <ellipse cx="120" cy="165" rx="58" ry="48" fill="${bd}" stroke="${dk}" stroke-width="3"/>
  <ellipse cx="120" cy="175" rx="36" ry="30" fill="${m.belly}"/>
  <path d="M175 150 Q220 140 210 190 Q190 175 170 170Z" fill="${bd}" stroke="${dk}" stroke-width="2.5"/>
  <ellipse cx="120" cy="100" rx="40" ry="36" fill="${bd}" stroke="${dk}" stroke-width="3"/>
  <path d="M88 80 L78 45 L102 72Z M152 80 L162 45 L138 72Z" fill="${bd}" stroke="${dk}" stroke-width="2.5"/>
  ${chibiEyes(105,135,98,12,dk,'#3b82f6')}${chibiBlush(92,148,112)}
  <path d="M110 115 Q120 125 132 115" stroke="${dk}" stroke-width="2.5" fill="none"/>
  <g stroke="#fde047" stroke-width="3" fill="none"><path d="M60 100 L50 80 M55 110 L40 105"/><path d="M180 95 L195 75 M185 110 L200 100"/></g>
  ${mkPts()}`); }

function ninjacatSVG(p){ const m=MONS.ninjacat, dk=m.dark, bd=`url(#${p}bd)`;
  return omSvg('ninjacat',p,m,`
  <ellipse cx="120" cy="170" rx="48" ry="42" fill="${bd}" stroke="${dk}" stroke-width="3"/>
  <path d="M95 130 L120 90 L145 130Z" fill="#111" stroke="${dk}" stroke-width="2"/>
  <ellipse cx="120" cy="125" rx="34" ry="30" fill="${bd}" stroke="${dk}" stroke-width="3"/>
  <path d="M92 105 L82 70 L108 100Z M148 105 L158 70 L132 100Z" fill="${bd}" stroke="${dk}" stroke-width="2"/>
  <path d="M88 120 H152" stroke="#222" stroke-width="10"/>
  ${chibiEyes(105,135,122,11,dk,'#fde047')}
  <ellipse cx="120" cy="140" rx="8" ry="5" fill="#ffb4b4"/>
  <path d="M110 145 Q120 152 132 145" stroke="${dk}" stroke-width="2" fill="none"/>
  <path d="M160 160 Q200 150 190 200" fill="none" stroke="${bd}" stroke-width="10" stroke-linecap="round"/>
  ${mkPts()}`); }

function steeltiranSVG(p){ const m=MONS.steeltiran, dk=m.dark, bd=`url(#${p}bd)`;
  return omSvg('steeltiran',p,m,`
  <path d="M55 200 L70 100 L120 70 L170 100 L185 200 Z" fill="${bd}" stroke="${dk}" stroke-width="3"/>
  <circle cx="55" cy="150" r="22" fill="#4b5563" stroke="${dk}" stroke-width="3"/><circle cx="185" cy="150" r="22" fill="#4b5563" stroke="${dk}" stroke-width="3"/>
  <g stroke="#9ca3af" stroke-width="3"><path d="M40 140 L70 160 M40 160 L70 140"/><path d="M170 140 L200 160 M170 160 L200 140"/></g>
  ${chibiEyes(100,140,115,14,dk,'#ef4444')}
  <rect x="100" y="145" width="40" height="18" rx="4" fill="#111" stroke="${dk}" stroke-width="2"/>
  <path d="M110 70 L120 40 L130 70" fill="#ef4444" stroke="${dk}" stroke-width="2"/>
  ${mkPts()}`); }

function icetiranSVG(p){ const m=MONS.icetiran, dk=m.dark, bd=`url(#${p}bd)`;
  return omSvg('icetiran',p,m,`
  <ellipse cx="120" cy="150" rx="72" ry="62" fill="${bd}" stroke="${dk}" stroke-width="3"/>
  <ellipse cx="120" cy="165" rx="44" ry="36" fill="${m.belly}"/>
  <path d="M90 90 L100 55 L115 88 M125 85 L140 50 L150 90" fill="#e0f2fe" stroke="${dk}" stroke-width="2"/>
  ${chibiEyes(100,140,130,13,dk,'#38bdf8')}${chibiBlush(88,152,148)}
  <path d="M105 155 Q120 170 138 152" stroke="${dk}" stroke-width="3" fill="none"/>
  <g fill="#fff" opacity=".7"><ellipse cx="70" cy="100" rx="16" ry="10"/><ellipse cx="175" cy="110" rx="14" ry="9"/><ellipse cx="150" cy="70" rx="12" ry="8"/></g>
  ${mkPts()}`); }

function phoenixSVG(p){ const m=MONS.phoenix, dk=m.dark, bd=`url(#${p}bd)`;
  return omSvg('phoenix',p,m,`
  <g class="m-flame" fill="#fdba74"><path d="M50 140 C20 100 40 60 80 90 C70 120 60 140 50 140Z"/><path d="M190 140 C220 100 200 60 160 90 C170 120 180 140 190 140Z"/></g>
  <ellipse cx="120" cy="150" rx="42" ry="48" fill="${bd}" stroke="${dk}" stroke-width="3"/>
  <ellipse cx="120" cy="100" rx="30" ry="28" fill="${bd}" stroke="${dk}" stroke-width="3"/>
  <path d="M120 55 C100 30 130 20 120 5 C140 25 145 45 135 60Z" fill="#fde68a" stroke="${dk}" stroke-width="2"/>
  ${chibiEyes(108,132,98,10,dk,'#fff')}${chibiBlush(98,142,112)}
  <path d="M112 112 Q120 120 130 112" stroke="${dk}" stroke-width="2" fill="none"/>
  <path d="M120 190 Q100 230 120 225 Q140 230 120 190" fill="#fb923c" stroke="${dk}" stroke-width="2"/>
  ${mkPts()}`); }

function mtngodSVG(p){ const m=MONS.mtngod, dk=m.dark, bd=`url(#${p}bd)`;
  return omSvg('mtngod',p,m,`
  <path d="M50 200 L70 120 L100 90 L140 85 L180 120 L195 200 Z" fill="${bd}" stroke="${dk}" stroke-width="3"/>
  <circle cx="120" cy="140" r="36" fill="#1c1917" stroke="${dk}" stroke-width="3"/>
  <circle cx="120" cy="140" r="26" fill="#ea580c"/><circle cx="120" cy="140" r="14" fill="#fde68a"/>
  <circle cx="112" cy="132" r="5" fill="#fff" opacity=".6"/>
  <g class="m-eyes"><circle cx="120" cy="140" r="1" fill="none"/></g>
  <g class="m-ouch" stroke="#1f2937" stroke-width="4" fill="none"><path d="M100 125 L140 155 M100 155 L140 125"/></g>
  ${mkPts()}`); }

function manflowerSVG(p){ const m=MONS.manflower, dk=m.dark, bd=`url(#${p}bd)`;
  return omSvg('manflower',p,m,`
  <g fill="#22c55e" stroke="${dk}" stroke-width="2.5">
    <path d="M120 150 C60 120 40 180 80 200"/><path d="M120 150 C180 120 200 180 160 200"/>
    <path d="M120 150 C80 90 30 100 50 140"/><path d="M120 150 C160 90 210 100 190 140"/>
  </g>
  <ellipse cx="120" cy="150" rx="48" ry="44" fill="${bd}" stroke="${dk}" stroke-width="3"/>
  <ellipse cx="120" cy="155" rx="30" ry="22" fill="#14532d"/>
  <g fill="#fff"><path d="M100 150 L108 170 L116 150Z"/><path d="M124 150 L132 170 L140 150Z"/></g>
  ${chibiEyes(100,140,130,12,dk,'#a3e635')}
  ${mkPts()}`); }

function illusdemonSVG(p){ const m=MONS.illusdemon, dk=m.dark, bd=`url(#${p}bd)`;
  return omSvg('illusdemon',p,m,`
  <path d="M80 200 L90 90 L120 60 L150 90 L160 200 Z" fill="${bd}" stroke="${dk}" stroke-width="3"/>
  <rect x="95" y="100" width="50" height="60" rx="8" fill="#0f172a" stroke="#38bdf8" stroke-width="2"/>
  ${chibiEyes(105,135,115,11,dk,'#38bdf8')}
  <circle cx="70" cy="140" r="12" fill="#38bdf8" opacity=".8"/><circle cx="170" cy="140" r="12" fill="#38bdf8" opacity=".8"/>
  <path d="M110 175 H130" stroke="#38bdf8" stroke-width="4"/>
  ${mkPts()}`); }

function seakingSVG(p){ const m=MONS.seaking, dk=m.dark, bd=`url(#${p}bd)`;
  return omSvg('seaking',p,m,`
  <path d="M30 200 C50 160 90 170 120 130 C150 90 190 100 210 140 C200 200 60 220 30 200Z" fill="#60a5fa" opacity=".45"/>
  <path d="M70 200 C85 140 110 100 150 90 C190 80 210 130 195 180 C170 210 90 215 70 200Z" fill="${bd}" stroke="${dk}" stroke-width="3"/>
  <ellipse cx="165" cy="110" rx="34" ry="30" fill="${bd}" stroke="${dk}" stroke-width="3"/>
  <path d="M155 85 L160 55 L175 82" fill="${m.light}" stroke="${dk}" stroke-width="2"/>
  ${chibiEyes(152,178,108,11,dk,'#1d4ed8')}
  <path d="M155 125 Q165 135 178 122" stroke="${dk}" stroke-width="2.5" fill="none"/>
  <circle class="mk-core" cx="165" cy="120" r="1" fill="none"/><circle class="mk-mouth" cx="165" cy="130" r="1" fill="none"/>`); }

function deathscorpSVG(p){ const m=MONS.deathscorp, dk=m.dark, bd=`url(#${p}bd)`;
  return omSvg('deathscorp',p,m,`
  <ellipse cx="120" cy="170" rx="60" ry="40" fill="${bd}" stroke="${dk}" stroke-width="3"/>
  <ellipse cx="120" cy="175" rx="36" ry="24" fill="${m.belly}"/>
  <ellipse cx="120" cy="115" rx="38" ry="34" fill="${bd}" stroke="${dk}" stroke-width="3"/>
  <path d="M95 95 L88 60 L110 90 M145 95 L152 60 L130 90" fill="${dk}"/>
  <path d="M170 160 Q210 120 200 80 Q180 100 175 140Z" fill="${bd}" stroke="${dk}" stroke-width="3"/>
  <path d="M198 78 L210 50 L190 70" fill="#1f1a14" stroke="${dk}" stroke-width="2"/>
  ${chibiEyes(105,135,110,12,dk,'#fbbf24')}${chibiBlush(92,148,128)}
  <path d="M110 130 Q120 140 132 128" stroke="${dk}" stroke-width="2.5" fill="none"/>
  ${mkPts()}`); }

function nightmareSVG(p){ const m=MONS.nightmare, dk=m.dark, bd=`url(#${p}bd)`;
  return omSvg('nightmare',p,m,`
  <circle cx="120" cy="160" r="50" fill="#7c3aed" opacity=".35" filter="url(#${p}ngl)"/>
  <ellipse cx="120" cy="130" rx="40" ry="28" fill="${bd}" stroke="${dk}" stroke-width="3"/>
  <path d="M80 130 Q50 100 70 80 Q90 110 95 125Z M160 130 Q190 100 170 80 Q150 110 145 125Z" fill="${bd}" stroke="${dk}" stroke-width="2.5"/>
  ${chibiEyes(105,135,125,12,dk,'#f0abfc')}
  <circle cx="120" cy="175" r="22" fill="#2e1065" stroke="#c084fc" stroke-width="3"/>
  <circle cx="120" cy="175" r="10" fill="#f0abfc"/>
  ${mkPts()}`,`<filter id="${p}ngl"><feGaussianBlur stdDeviation="4"/></filter>`); }

function galmothSVG(p){ const m=MONS.galmoth, dk=m.dark, bd=`url(#${p}bd)`;
  return omSvg('galmoth',p,m,`
  <path d="M120 140 C40 80 20 160 90 170Z" fill="#e5e7eb" stroke="${dk}" stroke-width="2.5" opacity=".9"/>
  <path d="M120 140 C200 80 220 160 150 170Z" fill="#e5e7eb" stroke="${dk}" stroke-width="2.5" opacity=".9"/>
  <ellipse cx="120" cy="150" rx="28" ry="36" fill="${bd}" stroke="${dk}" stroke-width="3"/>
  <ellipse cx="120" cy="115" rx="24" ry="22" fill="${bd}" stroke="${dk}" stroke-width="3"/>
  <path d="M100 100 Q90 70 105 95 M140 100 Q150 70 135 95" stroke="${dk}" stroke-width="3" fill="none"/>
  ${chibiEyes(110,130,112,9,dk,'#fde047')}
  <g fill="#ffe066"><circle cx="60" cy="100" r="3"/><circle cx="180" cy="110" r="4"/><circle cx="90" cy="70" r="2.5"/><circle cx="160" cy="75" r="3"/></g>
  ${mkPts()}`); }

function flamecrabSVG(p){ const m=MONS.flamecrab, dk=m.dark, bd=`url(#${p}bd)`;
  return omSvg('flamecrab',p,m,`
  <ellipse cx="120" cy="155" rx="70" ry="48" fill="${bd}" stroke="${dk}" stroke-width="3"/>
  <g fill="#7f1d1d"><ellipse cx="55" cy="175" rx="10" ry="18"/><ellipse cx="85" cy="190" rx="10" ry="16"/><ellipse cx="155" cy="190" rx="10" ry="16"/><ellipse cx="185" cy="175" rx="10" ry="18"/></g>
  <path d="M50 140 Q20 110 45 100 Q60 120 55 140Z M190 140 Q220 110 195 100 Q180 120 185 140Z" fill="${bd}" stroke="${dk}" stroke-width="2.5"/>
  ${chibiEyes(100,140,145,13,dk,'#fdba74')}
  <g class="m-flame" fill="#fb923c"><circle cx="90" cy="120" r="8"/><circle cx="150" cy="118" r="9"/><circle cx="120" cy="110" r="10"/></g>
  ${mkPts()}`); }

function starlordSVG(p){ const m=MONS.starlord, dk=m.dark, bd=`url(#${p}bd)`;
  return omSvg('starlord',p,m,`
  <g fill="#ffe066" opacity=".8"><circle cx="60" cy="60" r="3"/><circle cx="180" cy="50" r="4"/><circle cx="200" cy="100" r="2.5"/><circle cx="40" cy="120" r="3"/></g>
  <path d="M70 70 L170 50 L200 160 L90 200 Z" fill="${bd}" stroke="${dk}" stroke-width="3"/>
  <path d="M90 90 L160 75 L175 145 L105 165 Z" fill="#27272a"/>
  <g fill="#fb923c"><path d="M100 110 L130 100 L140 140 L110 150Z"/><path d="M120 130 L155 120 L160 155 L130 160Z"/></g>
  ${chibiEyes(115,145,115,12,dk,'#fb923c')}
  <path d="M80 180 Q120 230 170 170" stroke="#fb923c" stroke-width="8" fill="none" opacity=".7"/>
  ${mkPts()}`); }

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
