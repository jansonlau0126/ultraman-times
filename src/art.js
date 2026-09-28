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

/* Fan-art hero: 有型超人奧米加（高挑戰鬥姿、銀紅甲、金 V、圓形計時器）. Drawn from scratch — not official art. */
function pent(cx,cy,r){ const pts=[]; for(let i=0;i<5;i++){ const a=(-90+i*72)*Math.PI/180; pts.push((cx+Math.cos(a)*r).toFixed(1)+','+(cy+Math.sin(a)*r).toFixed(1)); } return pts.join(' '); }
function heroSVG(p){
  const sv='url(#'+p+'sv)', rd='url(#'+p+'rd)', gd='url(#'+p+'gd)', ol='#2a1018', RC='#e53935', sl='#eef2f7';
  const limb=(d,w)=>'<path d="'+d+'" stroke="'+ol+'" stroke-width="'+(w+5)+'" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="'+d+'" stroke="'+RC+'" stroke-width="'+w+'" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="'+d+'" stroke="'+sl+'" stroke-width="'+(w*.28)+'" fill="none" stroke-linecap="round" opacity=".75" transform="translate(-'+(w*.18)+',-'+(w*.1)+')"/>';
  const glove=(x,y,r)=>'<circle cx="'+x+'" cy="'+y+'" r="'+r+'" fill="'+sv+'" stroke="'+ol+'" stroke-width="2.4"/><path d="M'+(x-r*.5)+' '+(y-r*.25)+' q'+(r*.45)+' -'+(r*.35)+' '+(r*.95)+' -'+(r*.15)+'" stroke="#fff" stroke-width="1.8" fill="none" opacity=".7"/>';
  const cuff=(x1,y1,x2,y2)=>'<path d="M'+x1+' '+y1+' L'+x2+' '+y2+'" stroke="'+ol+'" stroke-width="13" stroke-linecap="butt"/><path d="M'+x1+' '+y1+' L'+x2+' '+y2+'" stroke="'+sl+'" stroke-width="9" stroke-linecap="butt"/>';
  const slug = '<g class="h-slug"><path d="M93 22 L100 -14 L107 22 Q104 36 100 48 Q96 36 93 22 Z" fill="'+sv+'" stroke="'+ol+'" stroke-width="2.4" stroke-linejoin="round"/>'+
    '<path d="M95 20 L100 -4 L105 20" stroke="#fff" stroke-width="2.2" fill="none" opacity=".85"/><path d="M100 0 L100 42" stroke="#ff9d8f" stroke-width="1.5" opacity=".65"/>'+
    '<circle class="mk-slug" cx="100" cy="12" r="1" fill="none"/></g>';
  const head = '<g class="h-head" transform="translate(100 72) scale(.86) translate(-100 -72)">'+
    '<path d="M100 14 C117 14 128 30 128 48 C128 64 119 78 110 84 L90 84 C81 78 72 64 72 48 C72 30 83 14 100 14 Z" fill="'+rd+'" stroke="'+ol+'" stroke-width="2.6"/>'+
    '<path d="M74 36 C72 54 78 70 90 82 L94 74 C86 66 82 54 84 40 Z" fill="'+sv+'" stroke="'+ol+'" stroke-width="1.8"/><path d="M126 36 C128 54 122 70 110 82 L106 74 C114 66 118 54 116 40 Z" fill="'+sv+'" stroke="'+ol+'" stroke-width="1.8"/>'+
    slug+
    '<path d="M68 44 L54 38 L56 58 L70 62 Z" fill="'+sv+'" stroke="'+ol+'" stroke-width="2"/><path d="M132 44 L146 38 L144 58 L130 62 Z" fill="'+sv+'" stroke="'+ol+'" stroke-width="2"/>'+
    '<path class="h-eyeglow" d="M96 54 L93 42 Q84 36 74 38 L70 44 Q78 58 96 54 Z" fill="#7ff4ff" filter="url(#'+p+'gl)"/><path class="h-eyeglow" d="M104 54 L107 42 Q116 36 126 38 L130 44 Q122 58 104 54 Z" fill="#7ff4ff" filter="url(#'+p+'gl)"/>'+
    '<path d="M96 54 L93 42 Q84 36 74 38 L70 44 Q78 58 96 54 Z" fill="url(#'+p+'ey)" stroke="#0a3a52" stroke-width="1.5"/><path d="M104 54 L107 42 Q116 36 126 38 L130 44 Q122 58 104 54 Z" fill="url(#'+p+'ey)" stroke="#0a3a52" stroke-width="1.5"/>'+
    '<g stroke="#fff" stroke-width=".75" opacity=".55" fill="none"><path d="M76 44 L94 50 M84 40 L82 52"/><path d="M124 44 L106 50 M116 40 L118 52"/></g>'+
    '<path d="M90 66 L110 66 L108 76 L92 76 Z" fill="'+sv+'" stroke="'+ol+'" stroke-width="1.8"/><path d="M94 71 L106 71" stroke="#4a5263" stroke-width="1.5" stroke-linecap="round"/>'+
    '</g>';
  const torso = '<path d="M46 92 L154 92 Q152 124 140 148 Q128 172 124 186 L130 202 Q108 214 100 218 Q92 214 70 202 L76 186 Q72 172 60 148 Q48 124 46 92 Z" fill="'+rd+'" stroke="'+ol+'" stroke-width="2.6" stroke-linejoin="round"/>'+
    '<path d="M60 108 Q74 154 88 182 Q96 202 99 214" stroke="'+sl+'" stroke-width="6.5" fill="none" stroke-linecap="round"/><path d="M140 108 Q126 154 112 182 Q104 202 101 214" stroke="'+sl+'" stroke-width="6.5" fill="none" stroke-linecap="round"/>'+
    '<path d="M90 74 L110 74 L112 94 L88 94 Z" fill="'+sv+'" stroke="'+ol+'" stroke-width="2"/>'+
    '<path d="M56 98 L100 146 L144 98 L130 96 L100 130 L70 96 Z" fill="'+gd+'" stroke="'+ol+'" stroke-width="2" stroke-linejoin="round"/>'+
    '<path d="M66 102 L100 138 L134 102" fill="none" stroke="#fff3b0" stroke-width="2.4" stroke-linecap="round" opacity=".95"/>'+
    '<path d="M76 106 L100 134 L124 106" fill="none" stroke="#c62828" stroke-width="3.2" stroke-linecap="round"/>'+
    '<circle cx="100" cy="158" r="16" fill="#cfd8e6" stroke="'+ol+'" stroke-width="2.4"/>'+
    '<circle class="h-tglow" cx="100" cy="158" r="13.5" filter="url(#'+p+'gl)" opacity=".95"/>'+
    '<circle class="h-timer" cx="100" cy="158" r="12" stroke="#1a2a4a" stroke-width="1.6"/>'+
    '<circle cx="95" cy="153" r="3.2" fill="#fff" opacity=".65"/>'+
    '<g class="h-spiral"><path d="M100 158 m0 -2 a2 2 0 1 1 -2 2 a4.2 4.2 0 0 1 4.2 -4.2" stroke="#fff" stroke-width="1.3" fill="none" opacity=".9"/></g>'+
    '<circle class="mk-chest" cx="100" cy="158" r="1" fill="none"/>';
  const legL = '<g class="h-legL"><path d="M78 168 C64 208 54 244 48 284 L36 310 L66 314 L78 276 C88 244 98 212 106 188 Z" fill="'+rd+'" stroke="'+ol+'" stroke-width="2.6" stroke-linejoin="round"/>'+
    '<path d="M82 176 C70 220 60 256 50 306" stroke="'+sl+'" stroke-width="5" fill="none" stroke-linecap="round"/>'+
    '<path d="M34 306 L68 312 Q70 322 68 330 L24 330 Q22 320 30 316 Z" fill="'+rd+'" stroke="'+ol+'" stroke-width="2.4"/><path d="M36 312 L66 316" stroke="'+sl+'" stroke-width="3"/></g>';
  const legR = '<g class="h-legR"><path d="M122 168 C136 208 146 244 152 284 L164 310 L134 314 L122 276 C112 244 102 212 94 188 Z" fill="'+rd+'" stroke="'+ol+'" stroke-width="2.6" stroke-linejoin="round"/>'+
    '<path d="M118 176 C130 220 140 256 150 306" stroke="'+sl+'" stroke-width="5" fill="none" stroke-linecap="round"/>'+
    '<path d="M166 306 L132 312 Q130 322 132 330 L176 330 Q178 320 170 316 Z" fill="'+rd+'" stroke="'+ol+'" stroke-width="2.4"/><path d="M164 312 L134 316" stroke="'+sl+'" stroke-width="3"/></g>';
  const kick = '<g class="h-kick">'+limb('M112 190 L160 178 L196 168',24)+'<path d="M118 186 L190 166" stroke="'+sl+'" stroke-width="4" stroke-linecap="round"/>'+
    '<path d="M190 154 Q214 152 216 170 Q214 190 188 184 Z" fill="'+rd+'" stroke="'+ol+'" stroke-width="2.4"/><path d="M198 156 L198 182" stroke="'+sl+'" stroke-width="3"/></g>';
  const armL = '<g class="h-armL">'+limb('M52 100 L38 148 L36 190',20)+'<path d="M46 106 L34 148 L32 182" stroke="'+sl+'" stroke-width="3.2" fill="none" stroke-linecap="round"/>'+cuff(36,182,36,192)+glove(36,202,11)+'</g>';
  const armR = '<g class="h-armR">'+limb('M148 100 L162 148 L164 190',20)+'<path d="M154 106 L166 148 L168 182" stroke="'+sl+'" stroke-width="3.2" fill="none" stroke-linecap="round"/>'+cuff(164,182,164,192)+glove(164,202,11)+'<circle class="mk-hand" cx="164" cy="202" r="1" fill="none"/></g>';
  const guard = '<g class="h-guard">'+
    limb('M52 100 L24 140 L60 156',20)+'<path d="M46 104 L24 136" stroke="'+sl+'" stroke-width="3" stroke-linecap="round"/>'+cuff(54,152,64,156)+glove(72,158,11)+
    limb('M148 100 L180 130 L176 84',20)+'<path d="M154 102 L178 126" stroke="'+sl+'" stroke-width="3" stroke-linecap="round"/>'+cuff(176,92,176,82)+glove(176,72,11.5)+
    '</g>';
  const cross = '<g class="h-cross">'+
    limb('M52 100 L90 126 L172 116',20)+limb('M148 100 L160 172 L160 68',20)+
    '<path d="M100 116 L186 114" stroke="'+sl+'" stroke-width="3.5" stroke-linecap="round"/>'+cuff(178,116,188,116)+glove(198,116,11)+
    '<path d="M160 164 L160 74" stroke="'+sl+'" stroke-width="3.2" stroke-linecap="round"/>'+cuff(160,74,160,64)+glove(160,54,11)+
    '<circle cx="160" cy="116" r="14" fill="#bff3ff" filter="url(#'+p+'gl)"/><circle cx="160" cy="116" r="5.5" fill="#fff"/></g>';
  /* henshin overlays — shown by .henshin-N classes */
  const hen = '<g class="h-pauldron" opacity=".95">'+
    '<ellipse cx="48" cy="100" rx="16" ry="12" fill="#bff3ff" filter="url(#'+p+'gl)" opacity=".85"/><ellipse cx="152" cy="100" rx="16" ry="12" fill="#bff3ff" filter="url(#'+p+'gl)" opacity=".85"/>'+
    '<path d="M34 96 L48 88 L62 98 Z" fill="'+sv+'" stroke="'+ol+'" stroke-width="1.6"/><path d="M138 98 L152 88 L166 96 Z" fill="'+sv+'" stroke="'+ol+'" stroke-width="1.6"/>'+
    '</g>'+
    '<g class="h-meteor" stroke="#7ff0ff" stroke-width="3" fill="none" stroke-linecap="round" opacity=".9">'+
    '<path d="M108 8 L128 -18"/><path d="M118 20 L142 -6"/><path d="M40 120 L18 96"/><path d="M160 120 L186 92"/>'+
    '<circle cx="132" cy="-10" r="3" fill="#fff"/><circle cx="22" cy="100" r="2.5" fill="#fff"/>'+
    '</g>'+
    '<g class="h-crystal" opacity=".95">'+
    '<path d="M72 86 L80 70 L88 86 Z" fill="#b58cff" stroke="#fff" stroke-width="1.2"/><path d="M112 86 L120 68 L128 86 Z" fill="#7ff0ff" stroke="#fff" stroke-width="1.2"/>'+
    '<path d="M40 130 L48 112 L56 130 Z" fill="#ff7ad9" stroke="#fff" stroke-width="1.2"/><path d="M144 130 L152 112 L160 130 Z" fill="#ffe066" stroke="#fff" stroke-width="1.2"/>'+
    '</g>'+
    '<g class="h-wings" opacity=".92">'+
    '<path d="M70 120 C20 90 -10 110 8 150 C30 130 50 140 70 150 Z" fill="#ff7ad9" filter="url(#'+p+'gl)" opacity=".75"/>'+
    '<path d="M130 120 C180 90 210 110 192 150 C170 130 150 140 130 150 Z" fill="#7ff0ff" filter="url(#'+p+'gl)" opacity=".75"/>'+
    '<path d="M70 120 C30 100 10 120 28 148" stroke="#ffe066" stroke-width="2.5" fill="none"/><path d="M130 120 C170 100 190 120 172 148" stroke="#ffe066" stroke-width="2.5" fill="none"/>'+
    '</g>';
  return '<svg class="hero henshin-1" viewBox="0 0 200 340" preserveAspectRatio="xMidYMax meet" aria-hidden="true" style="--tc:#5ee7ff">'+
    '<defs>'+
    '<linearGradient id="'+p+'sv" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset=".4" stop-color="#e2e8f0"/><stop offset="1" stop-color="#8fa0b4"/></linearGradient>'+
    '<linearGradient id="'+p+'rd" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ff7a6e"/><stop offset=".5" stop-color="#e53935"/><stop offset="1" stop-color="#9e1c1c"/></linearGradient>'+
    '<linearGradient id="'+p+'gd" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffe566"/><stop offset=".55" stop-color="#f0b429"/><stop offset="1" stop-color="#c98a0a"/></linearGradient>'+
    '<radialGradient id="'+p+'ey" cx=".5" cy=".4" r=".7"><stop offset="0" stop-color="#ffffff"/><stop offset=".4" stop-color="#9efbff"/><stop offset="1" stop-color="#1494b8"/></radialGradient>'+
    '<filter id="'+p+'gl" x="-80%" y="-80%" width="260%" height="260%"><feGaussianBlur stdDeviation="3.4"/></filter>'+
    '</defs>'+
    '<ellipse class="h-aura" cx="100" cy="170" rx="94" ry="155" fill="#a8f0ff" filter="url(#'+p+'gl)" opacity=".55"/>'+
    hen+
    '<ellipse cx="100" cy="326" rx="72" ry="8" fill="#000" opacity=".28"/>'+
    legL + legR + kick + armL + armR + torso + head + guard + cross +
    '<circle class="mk-beam" cx="160" cy="116" r="1" fill="none"/>'+
    '</svg>';
}

const MONS = {
  /* 列表靈感・卡通同人重畫（剪影要一眼分得開）＋圖鑑資料 */
  fire:{name:'獄炎哥爾贊', nick:'熔岩甲獸・地心噴火', kind:'熔岩甲獸', habitat:'地心火山帶', lore:'背脊噴出地心熔岩，甲殼一裂就會噴火柱。答錯乘數就會俾佢燒到腳底發熱！', body:'#c4451a', light:'#ff8a3d', dark:'#5c1a08', belly:'#ffd28a', shot:'#ff6a00'},
  ice:{name:'霜翼佩吉拉', nick:'絕對零度・霜翼凍結', kind:'霜翼怪獸', habitat:'極地暴風雪', lore:'雙翼拍落就係絕對零度。城市會即刻結冰，連超人奧米加都要打震先頂得住。', body:'#7ec8f5', light:'#e8f7ff', dark:'#1a5a8a', belly:'#ffffff', shot:'#bae6fd'},
  thunder:{name:'隱雷內隆嘎', nick:'十萬伏特・隱身雷鞭', kind:'隱雷怪獸', habitat:'雷暴雲層', lore:'會隱身嘅雷電怪獸，只剩下一對發光眼睛。雷鞭一抽，倍數表都要記清楚先避得開！', body:'#f5d76e', light:'#fff6b0', dark:'#8a6200', belly:'#fffde7', shot:'#fde047'},
  rock:{name:'哥莫拉', nick:'超振動・斷空新月角', kind:'古代怪獸', habitat:'原始荒原', lore:'傳說中嘅古代怪獸，額上新月角可以震碎岩石。硬碰硬就靠光速飛踢同爆裂光拳！', body:'#8b8f98', light:'#d0d4dc', dark:'#3a3e46', belly:'#c8b89a', shot:'#a8a29e'},
  poison:{name:'雙尾怪', nick:'雙尾纏殺・地底暗殺', kind:'雙尾毒獸', habitat:'地底毒沼', lore:'兩條毒尾可以分別攻擊。一見到綠光球就要小心——答啱題先斬斷佢嘅暗殺線！', body:'#6b7a3a', light:'#b8c878', dark:'#2f3618', belly:'#dfe8a8', shot:'#a3e635'},
  sea:{name:'深淵鯊獸', nick:'深淵黑洞・撕空一咬', kind:'深淵鯊獸', habitat:'深海裂谷', lore:'鯊魚頭加雙足，一口可以撕開海面。深淵黑洞會吸走錯答案——要答啱先游得返上嚟！', body:'#3a5a72', light:'#7aa0b8', dark:'#142430', belly:'#c5d8e4', shot:'#38bdf8'},
  boss:{name:'災厄魔王', short:'災厄魔王', nick:'千芒閃光・混沌吞噬', kind:'混沌魔王', habitat:'次元裂縫', lore:'雙翼展開就會放出千芒閃光。混沌核心一旦覺醒，成個城市都會陷入黑暗！', body:'#5b2aa8', light:'#c4a0ff', dark:'#1a0838', belly:'#f0e6ff', shot:'#ff4d6d', boss:true},
  kanegon:{name:'食錢怪', nick:'銅臭大爆發・偽幣彈幕', kind:'金幣怪獸', habitat:'銀行金庫', lore:'最鍾意食金幣嘅錢包怪獸。打敗佢就會吐出金幣雨——記住乘數先搶得返啲錢！', body:'#c9793a', light:'#f3b872', dark:'#6e3710', belly:'#e0a050', shot:'#ffd23f'},
  dada:{name:'三面怪人達達', nick:'三面幻影・次元亂光', kind:'三面怪人', habitat:'異次元基地', lore:'最終大頭目！每次被打中都會變面。三面亂光可以同時從三個方向襲擊——要連擊先拆穿幻影！', body:'#222', light:'#fff', dark:'#111', belly:'#fff', shot:'#ff6fb0', boss:true, final:true},
  graim:{name:'格萊姆', nick:'地獄鑽頭・地脈貫通裂', kind:'熱線怪獸', habitat:'地底礦脈', lore:'《超人奧米加》登場嘅鑽頭角怪獸。鼻尖鑽頭可以貫通地脈，熱線一射就係熔岩！', body:'#6b6f7a', light:'#b3b8c2', dark:'#2f3238', belly:'#f2c230', shot:'#ff8a1c', omega:true},
  dugrid:{name:'多格利德', nick:'鈾金大口・毒瓣吞噬', kind:'水棲毒獸', habitat:'毒沼濕地', lore:'大大嘅嘴巴同毒瓣襟。一口吞落去，連能量都消化——要快啲答啱先塞住佢張口！', body:'#5b4636', light:'#a0806a', dark:'#2a1d14', belly:'#e8b93a', frill:'#d8323a', shot:'#a3e635', omega:true},
  pegunos:{name:'佩古諾斯', nick:'無重蒼穹・羽翼俯衝斬', kind:'無重力怪獸', habitat:'高空雲海', lore:'識飛嘅企鵝型怪獸，無重力狀態下俯衝極快。一浮起身就要準備十字死光迎接！', body:'#1f3f86', light:'#5a84d8', dark:'#0e1f4a', belly:'#eef3fa', beak:'#ffcc33', shot:'#bfefff', omega:true},
  therizirus:{name:'特利吉拉斯', nick:'赤鐮隱形・千裂一閃', kind:'刃爪怪獸', habitat:'夜影森林', lore:'會隱形嘅刃爪怪獸。赤鐮一閃，影子先至見到傷口——專心答題先睇穿隱形！', body:'#2b3039', light:'#6a7486', dark:'#12151b', belly:'#c8324d', shot:'#ff4d6d', omega:true},
  ohebinushi:{name:'大蛇主命', nick:'神州長頸・九天一嘯掃', kind:'傳說蛇獸', habitat:'神州山脈', lore:'超長身軀嘅傳說蛇獸。頸一掃就係九天，山都會震。長身對手要用螺旋旋風拳！', body:'#4a5147', light:'#8e9a86', dark:'#1f241d', belly:'#efe4c4', accent:'#d84a3a', shot:'#ffd166', omega:true},
  gedrago:{name:'蓋多拉哥', nick:'粉紅毛毛・友情爆走衝', kind:'猛突怪獸', habitat:'粉紅草原', lore:'粉紅毛毛怪獸，睇落得意但其實衝力驚人。友情爆走衝——唔好俾外表呃到！', body:'#d8418f', light:'#f59ac6', dark:'#7d1b4f', belly:'#6b3a44', horn:'#a7adb7', shot:'#ff8fc8', omega:true},
  rekiness:{name:'雷基尼斯', nick:'流星守護・虹晶特訓彈', kind:'流星怪獸', habitat:'流星軌道', lore:'超人奧米加嘅流星夥伴！特訓時會射出虹晶彈。答啱就係特訓成功，一齊變得更強！', body:'#2f7fe0', light:'#9fd8ff', dark:'#123a7a', belly:'#bfe4ff', shot:'#b58cff', omega:true, friend:true},
  trigaron:{name:'特萊加隆', nick:'黑金流星・翼刃特訓斬', kind:'流星怪獸', habitat:'流星軌道', lore:'黑金配色嘅流星夥伴，翼刃鋒利。同雷基尼斯一齊特訓，鍛鍊超人嘅連擊技巧！', body:'#2c3038', light:'#6a7280', dark:'#101216', belly:'#8a93a3', gold:'#ffc21a', shot:'#ffc21a', omega:true, friend:true},
  vugsect:{name:'瓦古塞克特', short:'瓦古塞克特', nick:'甲殼雙鐮・破界破壞光', kind:'宇宙甲獸', habitat:'宇宙空洞', lore:'宇宙甲獸中頭目。雙鐮可以切開空間，破界破壞光直轟能量核心——連擊必殺先打碎甲殼！', body:'#2c2342', light:'#7a68a8', dark:'#130d22', belly:'#4a3b6b', shot:'#ff3b6b', boss:true, omega:true}
};
const DEX_ORDER=['graim','dugrid','pegunos','therizirus','ohebinushi','gedrago','rekiness','trigaron','vugsect','kanegon','dada','boss','fire','ice','thunder','rock','poison','sea'];

function monsterSVG(type, p){
  if(type==='kanegon') return kanegonSVG(p);
  if(type==='dada') return dadaSVG(p);
  if(type==='graim') return graimSVG(p); if(type==='dugrid') return dugridSVG(p); if(type==='pegunos') return pegunosSVG(p);
  if(type==='therizirus') return therizirusSVG(p); if(type==='ohebinushi') return ohebinushiSVG(p); if(type==='gedrago') return gedragoSVG(p);
  if(type==='rekiness') return rekinessSVG(p); if(type==='trigaron') return trigaronSVG(p); if(type==='vugsect') return vugsectSVG(p);
  if(type==='fire') return fireSVG(p); if(type==='ice') return iceSVG(p); if(type==='thunder') return thunderSVG(p);
  if(type==='rock') return rockSVG(p); if(type==='poison') return poisonSVG(p); if(type==='sea') return seaSVG(p);
  if(type==='boss') return bossSVG(p);
  return graimSVG(p);
}

/* 獄炎哥爾贊: 熔岩甲獸 — 厚甲、背脊火柱、岩漿裂紋 */
function fireSVG(p){ const m=MONS.fire, dk=m.dark, bd=`url(#${p}bd)`;
  const inner=`
  <g class="m-flame"><path d="M118 70 C104 40 118 18 124 0 C132 22 148 16 146 -4 C164 20 170 48 158 68 C172 60 180 46 178 30 C192 54 184 78 168 88 Z" fill="#ffb703" stroke="#e85d04" stroke-width="3"/><path d="M130 72 C124 52 134 42 136 28 C142 44 152 40 150 26 C162 48 156 70 148 78 Z" fill="#fff3b0"/></g>
  <path d="M176 196 Q228 200 236 148 L224 154 L226 136 L214 148 L208 132 L198 150 Q190 176 170 178 Z" fill="${bd}" stroke="${dk}" stroke-width="3" stroke-linejoin="round"/>
  ${omFeet(dk,'#ffd28a',[90,158])}
  <path d="M58 214 C40 160 56 96 112 82 C168 70 206 128 198 214 Q128 228 58 214 Z" fill="${bd}" stroke="${dk}" stroke-width="3"/>
  <path d="M78 208 C68 170 82 128 116 122 C152 118 168 162 160 208 Q118 218 78 208Z" fill="${m.belly}" stroke="#b45309" stroke-width="2"/>
  <g stroke="#ea580c" stroke-width="3" fill="none" stroke-linecap="round"><path d="M92 150 Q118 142 148 152"/><path d="M86 172 Q118 184 154 170"/><path d="M90 194 Q118 200 150 192"/></g>
  <g fill="#ff6a00" opacity=".85"><path d="M100 146 L108 168 L116 148Z"/><path d="M130 168 L138 190 L146 170Z"/><path d="M74 180 L82 200 L90 182Z"/></g>
  <ellipse cx="62" cy="148" rx="14" ry="24" transform="rotate(32 62 148)" fill="${bd}" stroke="${dk}" stroke-width="3"/>
  <g fill="#ffd28a" stroke="${dk}" stroke-width="1.5"><circle cx="46" cy="132" r="4"/><circle cx="52" cy="126" r="4"/><circle cx="58" cy="122" r="3.5"/></g>
  <ellipse cx="186" cy="150" rx="12" ry="22" transform="rotate(-18 186 150)" fill="${bd}" stroke="${dk}" stroke-width="3"/>
  <path d="M88 52 L96 8 L112 48 L124 4 L138 50 L152 18 L148 64 Z" fill="#ff8a3d" stroke="${dk}" stroke-width="2.5" stroke-linejoin="round"/>
  <path d="M70 88 C64 52 92 34 120 38 C150 42 166 70 158 100 Q116 118 70 88Z" fill="${bd}" stroke="${dk}" stroke-width="3"/>
  <path d="M92 70 L100 92 L112 74 L124 96 L136 72" stroke="#ff6a00" stroke-width="3" fill="none" stroke-linecap="round"/>
  <g class="m-eyes">${omEye(98,74,12,dk,'#ff6a00')}${omEye(128,72,11,dk,'#ff6a00')}</g>
  ${omOuch([[98,74,9],[128,72,8]])}
  <path d="M84 58 L110 66" stroke="${dk}" stroke-width="6" stroke-linecap="round"/><path d="M118 62 L146 54" stroke="${dk}" stroke-width="6" stroke-linecap="round"/>
  <ellipse cx="84" cy="98" rx="8" ry="5" fill="#ff7a9a" opacity=".55"/><ellipse cx="146" cy="94" rx="8" ry="5" fill="#ff7a9a" opacity=".55"/>
  <path d="M96 108 Q118 126 142 106" stroke="${dk}" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M104 112 L108 120 L112 112Z" fill="#fff"/><path d="M126 112 L130 120 L134 110Z" fill="#fff"/>
  <g class="m-flame"><path d="M210 120 C202 100 216 88 220 70 C228 90 240 98 232 120Z" fill="#ffb703" stroke="#e85d04" stroke-width="2.5"/></g>
  <circle class="mk-core" cx="120" cy="150" r="1" fill="none"/><circle class="mk-mouth" cx="110" cy="112" r="1" fill="none"/>`;
  return omSvg('fire',p,m,inner); }

/* 霜翼佩吉拉: 霜翼巨獸 — 大冰翼、水晶角、凍結鱗片 */
function iceSVG(p){ const m=MONS.ice, dk=m.dark, bd=`url(#${p}bd)`;
  const crystal=(x,y,h,w,c)=>`<path d="M${x} ${y} L${x-w} ${y+h*.45} L${x} ${y+h} L${x+w} ${y+h*.45}Z" fill="${c}" stroke="${dk}" stroke-width="2.2" stroke-linejoin="round"/>`;
  const inner=`
  <g class="ic-wing" fill="#e8f7ff" stroke="${dk}" stroke-width="3" stroke-linejoin="round">
    <path d="M150 100 Q210 60 232 30 Q220 70 210 100 Q228 90 236 70 Q224 110 198 130 Q170 140 152 124 Z"/>
    <path d="M70 110 Q20 70 4 40 Q16 80 30 112 Q10 100 2 78 Q18 120 50 136 Q68 138 74 122 Z"/>
    <path d="M168 90 Q200 50 214 28" stroke="#8fd8ff" stroke-width="2" fill="none"/><path d="M52 100 Q24 64 12 44" stroke="#8fd8ff" stroke-width="2" fill="none"/>
  </g>
  ${omFeet(dk,'#ffffff',[92,158])}
  <path d="M188 198 Q230 190 234 150 Q220 160 212 148 Q208 176 180 180Z" fill="${bd}" stroke="${dk}" stroke-width="3"/>
  <path d="M64 212 C48 160 62 100 116 88 C172 78 200 136 192 212 Q126 226 64 212Z" fill="${bd}" stroke="${dk}" stroke-width="3"/>
  <ellipse cx="120" cy="168" rx="42" ry="36" fill="${m.belly}"/>
  <g stroke="#8fd8ff" stroke-width="3" stroke-linecap="round" fill="none"><path d="M100 150 L100 186M88 158 L112 176M88 176 L112 158"/><path d="M132 152 L132 188M120 160 L144 178M120 178 L144 160"/></g>
  <ellipse cx="58" cy="146" rx="11" ry="20" transform="rotate(36 58 146)" fill="${bd}" stroke="${dk}" stroke-width="3"/>
  <g fill="#fff"><circle cx="44" cy="132" r="3.5"/><circle cx="50" cy="127" r="3.5"/></g>
  ${crystal(108,18,48,10,'#e8f7ff')}${crystal(128,10,56,11,'#bae6fd')}${crystal(148,22,42,9,'#e8f7ff')}${crystal(88,40,28,7,'#bae6fd')}
  <path d="M72 92 C66 56 92 38 120 42 C150 46 164 72 156 100 Q116 116 72 92Z" fill="${bd}" stroke="${dk}" stroke-width="3"/>
  <path d="M84 100 Q120 118 156 98 Q120 108 84 100Z" fill="#fff" opacity=".7"/>
  <g class="m-eyes">${omEye(100,76,12,dk,'#38bdf8')}${omEye(130,74,11,dk,'#38bdf8')}</g>
  ${omOuch([[100,76,9],[130,74,8]])}
  <path d="M86 60 L112 68" stroke="${dk}" stroke-width="5" stroke-linecap="round"/><path d="M120 64 L148 56" stroke="${dk}" stroke-width="5" stroke-linecap="round"/>
  <ellipse cx="84" cy="98" rx="8" ry="4" fill="#ff7a9a" opacity=".4"/><ellipse cx="148" cy="94" rx="8" ry="4" fill="#ff7a9a" opacity=".4"/>
  <path d="M100 108 Q120 122 142 106" stroke="${dk}" stroke-width="3" fill="none" stroke-linecap="round"/>
  <g class="m-float" fill="#e8f7ff" stroke="${dk}" stroke-width="1.5" opacity=".9">${crystal(22,70,18,5,'#bae6fd')}${crystal(210,86,16,4,'#e8f7ff')}</g>
  <circle class="mk-core" cx="120" cy="150" r="1" fill="none"/><circle class="mk-mouth" cx="110" cy="112" r="1" fill="none"/>`;
  return omSvg('ice',p,m,inner); }

/* 隱雷內隆嘎: 雷電隱獸 — 細長黃身、雷角、電弧（會隱身） */
function thunderSVG(p){ const m=MONS.thunder, dk=m.dark, bd=`url(#${p}bd)`;
  const bolt=(x,y,s)=>`<path d="M${x} ${y} L${x-s*.4} ${y+s*.55} L${x+s*.15} ${y+s*.5} L${x-s*.1} ${y+s} L${x+s*.55} ${y+s*.4} L${x} ${y+s*.45} L${x+s*.35} ${y}Z" fill="#fff06a" stroke="${dk}" stroke-width="2" stroke-linejoin="round"/>`;
  const inner=`<g class="thun-cloak">
  <g class="m-spark" stroke="#fff06a" stroke-width="2.5" fill="none" stroke-linecap="round">${bolt(28,50,22)}${bolt(200,40,18)}${bolt(216,120,14)}</g>
  <path d="M176 200 Q226 194 232 148 Q218 158 210 146 Q206 174 170 178Z" fill="${bd}" stroke="${dk}" stroke-width="3"/>
  ${omFeet(dk,'#fffde7',[88,156])}
  <path d="M72 210 C54 150 70 86 118 74 C168 64 198 122 188 210 Q128 224 72 210Z" fill="${bd}" stroke="${dk}" stroke-width="3"/>
  <ellipse cx="120" cy="160" rx="36" ry="40" fill="${m.belly}"/>
  <g stroke="${dk}" stroke-width="6" stroke-linecap="round" fill="none" opacity=".35"><path d="M168 90 Q186 108 190 130"/><path d="M188 148 Q200 164 202 182"/><path d="M68 118 Q56 136 54 156"/></g>
  <ellipse cx="56" cy="140" rx="10" ry="22" transform="rotate(28 56 140)" fill="${bd}" stroke="${dk}" stroke-width="3"/>
  <g fill="#fff"><circle cx="42" cy="124" r="3"/><circle cx="48" cy="119" r="3"/></g>
  <ellipse cx="184" cy="146" rx="9" ry="20" transform="rotate(-20 184 146)" fill="${bd}" stroke="${dk}" stroke-width="3"/>
  ${bolt(96,8,36)}${bolt(136,4,40)}
  <path d="M78 86 C72 52 96 36 120 40 C146 44 160 68 152 96 Q116 110 78 86Z" fill="${bd}" stroke="${dk}" stroke-width="3"/>
  <g class="m-eyes">${omEye(100,70,11,dk,'#eab308')}${omEye(128,68,10,dk,'#eab308')}</g>
  ${omOuch([[100,70,8],[128,68,7]])}
  <path d="M88 54 L112 62" stroke="${dk}" stroke-width="5" stroke-linecap="round"/><path d="M118 58 L144 50" stroke="${dk}" stroke-width="5" stroke-linecap="round"/>
  <ellipse cx="86" cy="94" rx="7" ry="4" fill="#ff7a9a" opacity=".5"/><ellipse cx="146" cy="90" rx="7" ry="4" fill="#ff7a9a" opacity=".5"/>
  <path d="M100 102 Q120 116 140 100" stroke="${dk}" stroke-width="3" fill="none" stroke-linecap="round"/>
  <circle class="mk-core" cx="120" cy="150" r="1" fill="none"/><circle class="mk-mouth" cx="108" cy="106" r="1" fill="none"/></g>`;
  return omSvg('thunder',p,m,inner); }

/* 哥莫拉: 古代怪獸 — 粗壯岩身、巨大新月角、獠牙 */
function rockSVG(p){ const m=MONS.rock, dk=m.dark, bd=`url(#${p}bd)`;
  const bump=(x,y,r)=>`<circle cx="${x}" cy="${y}" r="${r}" fill="${dk}" opacity=".28"/>`;
  const inner=`
  <path d="M170 200 Q224 206 234 160 Q220 170 212 156 Q206 184 164 182Z" fill="${bd}" stroke="${dk}" stroke-width="3" stroke-linejoin="round"/>
  ${omFeet(dk,'#c8b89a',[88,158])}
  <path d="M52 214 C36 158 52 96 108 84 C166 72 208 130 200 214 Q124 230 52 214Z" fill="${bd}" stroke="${dk}" stroke-width="3"/>
  <ellipse cx="118" cy="172" rx="46" ry="38" fill="${m.belly}"/>
  ${bump(168,120,8)}${bump(180,168,6)}${bump(70,168,7)}${bump(150,100,5)}${bump(96,140,6)}${bump(140,190,5)}
  <ellipse cx="54" cy="150" rx="16" ry="26" transform="rotate(30 54 150)" fill="${bd}" stroke="${dk}" stroke-width="3"/>
  <g fill="#c8b89a" stroke="${dk}" stroke-width="1.8" stroke-linejoin="round"><path d="M40 136 L18 128 L36 150Z"/><path d="M38 148 L14 152 L40 158Z"/><path d="M42 156 L22 172 L48 162Z"/></g>
  <ellipse cx="190" cy="152" rx="14" ry="24" transform="rotate(-16 190 152)" fill="${bd}" stroke="${dk}" stroke-width="3"/>
  <path d="M100 78 L118 2 L148 78 Z" fill="#a8a29e" stroke="${dk}" stroke-width="3" stroke-linejoin="round"/>
  <path d="M108 78 L118 18 L138 78" fill="#d0d4dc" stroke="none" opacity=".7"/>
  <path d="M86 70 L92 42 L108 68Z" fill="#8b8f98" stroke="${dk}" stroke-width="2"/><path d="M148 72 L162 48 L158 78Z" fill="#8b8f98" stroke="${dk}" stroke-width="2"/>
  <path d="M68 96 C62 58 90 38 120 42 C152 46 170 74 162 106 Q116 122 68 96Z" fill="${bd}" stroke="${dk}" stroke-width="3"/>
  <g fill="#efe8d8" stroke="${dk}" stroke-width="2" stroke-linejoin="round"><path d="M78 112 L62 128 L80 124Z"/><path d="M150 110 L168 126 L148 122Z"/></g>
  <g class="m-eyes">${omEye(98,78,13,dk,'#57534e')}${omEye(132,76,12,dk,'#57534e')}</g>
  ${omOuch([[98,78,10],[132,76,9]])}
  <path d="M84 60 L112 70" stroke="${dk}" stroke-width="7" stroke-linecap="round"/><path d="M122 66 L152 56" stroke="${dk}" stroke-width="7" stroke-linecap="round"/>
  <ellipse cx="82" cy="104" rx="9" ry="5" fill="#ff7a9a" opacity=".45"/><ellipse cx="150" cy="100" rx="9" ry="5" fill="#ff7a9a" opacity=".45"/>
  <path d="M96 116 Q120 136 146 114" stroke="${dk}" stroke-width="3.5" fill="none" stroke-linecap="round"/><path d="M106 122 L110 132 L114 122Z" fill="#fff"/><path d="M128 122 L132 132 L136 120Z" fill="#fff"/>
  <circle class="mk-core" cx="120" cy="155" r="1" fill="none"/><circle class="mk-mouth" cx="100" cy="120" r="1" fill="none"/>`;
  return omSvg('rock',p,m,inner); }

/* 雙尾怪: 雙尾毒獸 — 兩條長鞭尾、蟲形頭、毒囊 */
function poisonSVG(p){ const m=MONS.poison, dk=m.dark, bd=`url(#${p}bd)`;
  const inner=`
  <g class="tt-tail" fill="none" stroke-linecap="round">
    <path d="M160 160 Q210 120 228 60" stroke="${dk}" stroke-width="14"/><path d="M160 160 Q210 120 228 60" stroke="${m.body}" stroke-width="9"/>
    <path d="M148 176 Q200 200 230 170" stroke="${dk}" stroke-width="14"/><path d="M148 176 Q200 200 230 170" stroke="${m.light}" stroke-width="9"/>
    <circle cx="228" cy="60" r="10" fill="#a3e635" stroke="#4d7c0f" stroke-width="2.5"/><circle cx="230" cy="170" r="10" fill="#a3e635" stroke="#4d7c0f" stroke-width="2.5"/>
    <circle cx="228" cy="60" r="4" fill="#ecfccb"/><circle cx="230" cy="170" r="4" fill="#ecfccb"/>
  </g>
  ${omFeet(dk,'#dfe8a8',[90,158])}
  <path d="M70 212 C52 162 64 108 110 96 C158 86 190 136 182 212 Q124 226 70 212Z" fill="${bd}" stroke="${dk}" stroke-width="3"/>
  <ellipse cx="118" cy="168" rx="38" ry="34" fill="${m.belly}"/>
  <g fill="#c084fc" opacity=".7"><circle cx="140" cy="140" r="8"/><circle cx="156" cy="170" r="5"/><circle cx="100" cy="150" r="6"/><circle cx="84" cy="186" r="5"/></g>
  <ellipse cx="56" cy="148" rx="11" ry="20" transform="rotate(34 56 148)" fill="${bd}" stroke="${dk}" stroke-width="3"/>
  <g fill="#dfe8a8"><circle cx="42" cy="134" r="3.5"/><circle cx="48" cy="129" r="3.5"/></g>
  <path d="M100 48 Q88 18 74 6" stroke="${dk}" stroke-width="5" fill="none" stroke-linecap="round"/><path d="M132 48 Q146 16 162 4" stroke="${dk}" stroke-width="5" fill="none" stroke-linecap="round"/>
  <circle cx="74" cy="6" r="9" fill="#b6f25c" stroke="#4d7c0f" stroke-width="2.5"/><circle cx="162" cy="4" r="9" fill="#b6f25c" stroke="#4d7c0f" stroke-width="2.5"/>
  <path d="M78 90 C72 54 96 36 120 40 C146 44 160 68 152 96 Q116 112 78 90Z" fill="${bd}" stroke="${dk}" stroke-width="3"/>
  <g class="m-eyes">${omEye(100,72,11,dk,'#84cc16')}${omEye(130,70,10,dk,'#84cc16')}</g>
  ${omOuch([[100,72,8],[130,70,7]])}
  <path d="M88 56 L112 64" stroke="${dk}" stroke-width="5" stroke-linecap="round"/><path d="M118 60 L144 52" stroke="${dk}" stroke-width="5" stroke-linecap="round"/>
  <ellipse cx="86" cy="96" rx="7" ry="4" fill="#ff7a9a" opacity=".45"/><ellipse cx="146" cy="92" rx="7" ry="4" fill="#ff7a9a" opacity=".45"/>
  <path d="M100 106 Q120 120 140 104" stroke="${dk}" stroke-width="3" fill="none" stroke-linecap="round"/>
  <g class="m-float" fill="#a3e635" opacity=".8"><circle cx="24" cy="90" r="7" stroke="#4d7c0f" stroke-width="1.5"/><circle cx="16" cy="112" r="4"/><circle cx="34" cy="70" r="3"/></g>
  <circle class="mk-core" cx="118" cy="155" r="1" fill="none"/><circle class="mk-mouth" cx="110" cy="110" r="1" fill="none"/>`;
  return omSvg('poison',p,m,inner); }

/* 深淵鯊獸: 鯊魚人 — 鯊頭、背鰭、流線身軀 */
function seaSVG(p){ const m=MONS.sea, dk=m.dark, bd=`url(#${p}bd)`;
  const inner=`
  <path d="M130 70 Q148 8 176 28 Q156 40 150 78Z" fill="#12a594" stroke="${dk}" stroke-width="3"/>
  <path d="M188 120 Q234 100 236 140 Q214 132 198 152Z" fill="#12a594" stroke="${dk}" stroke-width="3"/>
  <path d="M176 198 Q228 204 236 158 Q222 168 214 154 Q208 180 168 180Z" fill="${bd}" stroke="${dk}" stroke-width="3"/>
  ${omFeet(dk,'#c5d8e4',[90,158])}
  <path d="M62 212 C46 158 58 104 108 90 C160 78 198 128 190 212 Q124 226 62 212Z" fill="${bd}" stroke="${dk}" stroke-width="3"/>
  <path d="M84 206 C74 168 86 130 118 124 C150 120 162 164 154 206 Q118 216 84 206Z" fill="${m.belly}" stroke="#7aa0b8" stroke-width="2"/>
  <g stroke="${dk}" stroke-width="2.5" fill="none" opacity=".45"><path d="M168 130 q8 8 0 16"/><path d="M176 128 q8 8 0 16"/><path d="M92 160 Q118 170 148 158"/><path d="M90 180 Q118 190 150 178"/></g>
  <ellipse cx="56" cy="150" rx="12" ry="22" transform="rotate(34 56 150)" fill="${bd}" stroke="${dk}" stroke-width="3"/>
  <g fill="#c5d8e4" stroke="${dk}" stroke-width="1.5"><circle cx="42" cy="136" r="3.5"/><circle cx="48" cy="131" r="3.5"/></g>
  <ellipse cx="184" cy="152" rx="11" ry="20" transform="rotate(-18 184 152)" fill="${bd}" stroke="${dk}" stroke-width="3"/>
  <path d="M40 100 C36 70 60 48 96 46 C130 44 152 64 148 92 C146 112 120 124 90 122 C60 120 42 114 40 100Z" fill="${bd}" stroke="${dk}" stroke-width="3"/>
  <path d="M42 108 Q90 124 146 100 Q120 140 70 136 Q48 128 42 108Z" fill="#0e7490" stroke="${dk}" stroke-width="2.5"/>
  <g fill="#fff"><path d="M56 112 l4 8 l4 -7z"/><path d="M72 118 l4 8 l4 -7z"/><path d="M88 120 l4 8 l4 -7z"/><path d="M104 118 l4 8 l4 -7z"/><path d="M120 114 l4 8 l4 -7z"/></g>
  <path d="M48 100 Q70 96 92 100" stroke="#7aa0b8" stroke-width="3" fill="none"/>
  <g class="m-eyes">${omEye(88,78,11,dk,'#0ea5e9')}${omEye(118,76,10,dk,'#0ea5e9')}</g>
  ${omOuch([[88,78,8],[118,76,7]])}
  <path d="M76 60 L100 66" stroke="${dk}" stroke-width="5" stroke-linecap="round"/><path d="M108 62 L134 56" stroke="${dk}" stroke-width="5" stroke-linecap="round"/>
  <g class="m-float"><path d="M22 76 Q28 62 34 76 A7 7 0 1 1 22 76Z" fill="#9ff3ff" stroke="#0d6b61" stroke-width="2"/></g>
  <circle class="mk-core" cx="120" cy="155" r="1" fill="none"/><circle class="mk-mouth" cx="70" cy="118" r="1" fill="none"/>`;
  return omSvg('sea',p,m,inner); }

/* 災厄魔王: 混沌魔王 — 雙翼、金冠、紅眼、混沌核心 */
function bossSVG(p){ const m=MONS.boss, dk=m.dark, bd=`url(#${p}bd)`;
  const inner=`
  <g class="bs-wing" fill="#2a0f5c" stroke="#150533" stroke-width="3" stroke-linejoin="round">
    <path d="M70 120 C28 78 8 90 -4 52 C14 64 26 58 36 42 C44 66 58 66 68 54 C72 82 82 98 94 108Z"/>
    <path d="M176 114 C210 66 234 76 246 40 C230 56 218 50 208 34 C200 58 188 56 178 44 C176 76 168 94 158 106Z"/>
  </g>
  <g fill="#f5f0e6" stroke="#44403c" stroke-width="2.5"><path d="M86 86 C62 72 58 44 72 28 C78 54 94 66 106 74Z"/><path d="M156 82 C178 64 180 38 166 22 C162 48 148 60 138 70Z"/></g>
  <path d="M96 76 L98 38 L112 58 L124 28 L136 58 L150 38 L152 74Z" fill="#fbbf24" stroke="#b45309" stroke-width="2.5" stroke-linejoin="round"/>
  <circle cx="124" cy="52" r="5" fill="#ef4444"/><circle cx="108" cy="60" r="3" fill="#38bdf8"/><circle cx="140" cy="60" r="3" fill="#38bdf8"/>
  <path d="M178 198 Q230 192 238 140 Q224 152 216 138 Q212 170 170 174Z" fill="${bd}" stroke="${dk}" stroke-width="3"/>
  ${omFeet(dk,'#f0e6ff',[90,158])}
  <path d="M56 214 C38 156 54 90 118 76 C182 64 214 130 204 214 Q128 230 56 214Z" fill="${bd}" stroke="${dk}" stroke-width="3"/>
  <ellipse cx="120" cy="165" rx="44" ry="40" fill="${m.belly}"/>
  <path d="M84 150 L118 198 L152 150" stroke="#fbbf24" stroke-width="4" fill="none" opacity=".75"/>
  <circle cx="120" cy="158" r="14" fill="#ff4d6d" filter="url(#${p}gl)"/><circle cx="120" cy="158" r="8" fill="#fff"/><circle cx="120" cy="158" r="5" fill="#ff4d6d"/>
  <ellipse cx="54" cy="148" rx="13" ry="24" transform="rotate(32 54 148)" fill="${bd}" stroke="${dk}" stroke-width="3"/>
  <g fill="#f0e6ff"><circle cx="40" cy="132" r="3.5"/><circle cx="46" cy="126" r="3.5"/></g>
  <ellipse cx="190" cy="150" rx="12" ry="22" transform="rotate(-18 190 150)" fill="${bd}" stroke="${dk}" stroke-width="3"/>
  <path d="M68 94 C62 54 90 34 120 38 C152 42 170 70 162 102 Q116 120 68 94Z" fill="${bd}" stroke="${dk}" stroke-width="3"/>
  <g class="m-eyes">${omEye(98,74,13,dk,'#e11d48')}${omEye(134,72,12,dk,'#e11d48')}</g>
  ${omOuch([[98,74,10],[134,72,9]])}
  <path d="M82 56 L114 68" stroke="${dk}" stroke-width="8" stroke-linecap="round"/><path d="M126 64 L160 52" stroke="${dk}" stroke-width="8" stroke-linecap="round"/>
  <ellipse cx="82" cy="102" rx="9" ry="5" fill="#ff7a9a" opacity=".55"/><ellipse cx="152" cy="98" rx="9" ry="5" fill="#ff7a9a" opacity=".55"/>
  <path d="M96 116 Q120 142 146 114 Q120 128 96 116Z" fill="#7f1d1d" stroke="${dk}" stroke-width="3"/><path d="M108 122 L112 134 L118 124Z" fill="#fff"/><path d="M128 122 L132 134 L138 120Z" fill="#fff"/>
  <circle class="mk-core" cx="120" cy="158" r="1" fill="none"/><circle class="mk-mouth" cx="110" cy="124" r="1" fill="none"/>`;
  return omSvg('boss',p,m,inner,`<filter id="${p}gl" x="-80%" y="-80%" width="260%" height="260%"><feGaussianBlur stdDeviation="4"/></filter>`); }


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
