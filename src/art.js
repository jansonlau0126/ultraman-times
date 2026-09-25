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

/* Fan-art hero: 超人奧米加 (red body & face, silver lines, thick red crest, blue compound eyes, pentagon timer). Drawn from scratch. p = unique id prefix */
function pent(cx,cy,r){ const pts=[]; for(let i=0;i<5;i++){ const a=(-90+i*72)*Math.PI/180; pts.push((cx+Math.cos(a)*r).toFixed(1)+','+(cy+Math.sin(a)*r).toFixed(1)); } return pts.join(' '); }
function heroSVG(p){
  const sv='url(#'+p+'sv)', rd='url(#'+p+'rd)', ol='#3a1016', sl='#e6ebf2';
  const legL = '<g class="h-legL"><path d="M74 190 L95 190 L93 256 L76 256 Z" fill="'+rd+'" stroke="'+ol+'" stroke-width="2.5"/><path d="M77 196 L80 196 L79 252 L77.5 252Z" fill="'+sl+'"/><path d="M70 250 Q84 243 98 250 L99 279 Q84 285 67 279 Z" fill="'+rd+'" stroke="'+ol+'" stroke-width="2.5"/><path d="M70 262 Q84 257 98 262" stroke="'+sl+'" stroke-width="2.5" fill="none"/></g>';
  const legR = '<g class="h-legR"><path d="M105 190 L126 190 L124 256 L107 256 Z" fill="'+rd+'" stroke="'+ol+'" stroke-width="2.5"/><path d="M120 196 L123 196 L121.5 252 L120 252Z" fill="'+sl+'"/><path d="M102 250 Q116 243 130 250 L133 279 Q116 285 101 279 Z" fill="'+rd+'" stroke="'+ol+'" stroke-width="2.5"/><path d="M102 262 Q116 257 131 262" stroke="'+sl+'" stroke-width="2.5" fill="none"/></g>';
  const kick = '<g class="h-kick"><path d="M104 186 L126 184 L182 172 L186 192 L126 206 L104 204 Z" fill="'+rd+'" stroke="'+ol+'" stroke-width="2.5"/><path d="M130 187 L181 176 L181.5 180 L130.5 191Z" fill="'+sl+'"/><path d="M176 164 Q198 164 200 182 Q200 200 178 200 Z" fill="'+rd+'" stroke="'+ol+'" stroke-width="2.5"/><path d="M184 166 L184 199" stroke="'+sl+'" stroke-width="2.5"/></g>';
  const torso = '<path d="M60 122 Q100 108 140 122 L134 196 Q100 206 66 196 Z" fill="'+rd+'" stroke="'+ol+'" stroke-width="2.5"/>'+
    '<path d="M66 124 Q100 114 134 124 L129 148 Q118 170 100 172 Q82 170 71 148 Z" fill="'+sv+'" stroke="'+ol+'" stroke-width="2.5"/>'+
    '<path d="M74 132 Q100 124 126 132" stroke="#1d2230" stroke-width="2" fill="none"/>'+
    '<path d="M72 150 Q79 174 76 196" stroke="'+sl+'" stroke-width="3" fill="none"/><path d="M128 150 Q121 174 124 196" stroke="'+sl+'" stroke-width="3" fill="none"/>'+
    '<path d="M100 172 L100 188" stroke="'+sl+'" stroke-width="2.5"/>'+
    '<rect x="68" y="186" width="64" height="9" rx="4" fill="#b3121a" stroke="'+ol+'" stroke-width="2"/>'+
    '<polygon points="'+pent(100,149,16.5)+'" fill="#3d4352" stroke="#1d2230" stroke-width="2" stroke-linejoin="round"/>'+
    '<polygon class="h-tglow" points="'+pent(100,149,15)+'" filter="url(#'+p+'gl)" opacity=".9"/>'+
    '<polygon class="h-timer" points="'+pent(100,149,11.5)+'" stroke-linejoin="round"/>'+
    '<g class="h-spiral"><path d="M100 149 m0 -1.5 a1.5 1.5 0 1 1 -1.5 1.5 a3.5 3.5 0 0 1 3.5 -3.5 a5.5 5.5 0 0 1 5.5 5.5 a7.5 7.5 0 0 1 -7.5 7.5" stroke="#fff" stroke-width="1.4" fill="none" opacity=".8"/><circle cx="95" cy="145" r=".9" fill="#fff"/><circle cx="105" cy="153" r=".8" fill="#fff"/><circle cx="104" cy="144" r=".6" fill="#fff"/></g>'+
    '<circle class="mk-chest" cx="100" cy="149" r="1" fill="none"/>';
  const armL = '<g class="h-armL"><path d="M61 123 Q49 126 47 142 L44 182 L59 184 L64 142 Z" fill="'+rd+'" stroke="'+ol+'" stroke-width="2.5"/><path d="M50 140 L52.5 140 L49 181 L46.5 181Z" fill="'+sl+'"/><circle cx="51" cy="191" r="11" fill="'+sv+'" stroke="'+ol+'" stroke-width="2.5"/></g>';
  const armR = '<g class="h-armR"><path d="M139 123 Q151 126 153 142 L156 182 L141 184 L136 142 Z" fill="'+rd+'" stroke="'+ol+'" stroke-width="2.5"/><path d="M147.5 140 L150 140 L153.5 181 L151 181Z" fill="'+sl+'"/><circle cx="149" cy="191" r="11" fill="'+sv+'" stroke="'+ol+'" stroke-width="2.5"/><circle class="mk-hand" cx="149" cy="191" r="1" fill="none"/></g>';
  /* "+" cross pose: right forearm vertical, left forearm horizontal crossing it */
  const cross = '<g class="h-cross">'+
    '<path d="M137 124 L152 121 L164 166 L149 171 Z" fill="'+rd+'" stroke="'+ol+'" stroke-width="2.5"/>'+
    '<rect x="149" y="88" width="17" height="84" rx="8" fill="'+rd+'" stroke="'+ol+'" stroke-width="2.5"/><path d="M156 96 L159 96 L159 166 L156 166Z" fill="'+sl+'"/>'+
    '<circle cx="157.5" cy="86" r="10" fill="'+sv+'" stroke="'+ol+'" stroke-width="2.5"/>'+
    '<path d="M60 122 Q50 134 60 142 Q74 146 96 140 L118 136 L118 120 L94 124 Q76 126 68 118Z" fill="'+rd+'" stroke="'+ol+'" stroke-width="2.5"/>'+
    '<rect x="112" y="118" width="74" height="17" rx="8" fill="'+rd+'" stroke="'+ol+'" stroke-width="2.5"/><path d="M118 125 L180 125 L180 128 L118 128Z" fill="'+sl+'"/>'+
    '<circle cx="189" cy="126.5" r="9.5" fill="'+sv+'" stroke="'+ol+'" stroke-width="2.5"/>'+
    '<circle cx="158" cy="126.5" r="11" fill="#bff3ff" filter="url(#'+p+'gl)"/></g>';
  const slug = '<g class="h-slug"><path d="M86 48 C85 28 92 12 100 2 C108 12 115 28 114 48 Z" fill="'+rd+'" stroke="'+ol+'" stroke-width="2.5" stroke-linejoin="round"/>'+
    '<path d="M100 8 C96 20 95 32 96 46" stroke="#ff8a8a" stroke-width="3" fill="none" opacity=".8"/><path d="M104 12 C107 24 108 34 107 46" stroke="'+sl+'" stroke-width="2" fill="none"/>'+
    '<polygon points="'+pent(100,38,5)+'" fill="#bfe9ff" stroke="#3d4352" stroke-width="1.5"/><circle class="mk-slug" cx="100" cy="24" r="1" fill="none"/></g>';
  const head = '<g class="h-head">'+
    '<rect x="90" y="106" width="20" height="16" fill="#b3121a" stroke="'+ol+'" stroke-width="2"/>'+
    '<ellipse cx="100" cy="72" rx="38" ry="42" fill="'+rd+'" stroke="'+ol+'" stroke-width="2.5"/>'+
    '<path d="M65 60 Q62 82 72 100" stroke="'+sl+'" stroke-width="3" fill="none"/><path d="M135 60 Q138 82 128 100" stroke="'+sl+'" stroke-width="3" fill="none"/>'+
    '<path d="M72 50 Q100 30 128 50 L123 57 Q100 42 77 57 Z" fill="'+sv+'" stroke="'+ol+'" stroke-width="1.5"/>'+
    slug+
    '<path d="M95 57 L100 63 L105 57" stroke="'+sl+'" stroke-width="2.5" fill="none" stroke-linejoin="round"/>'+
    '<path d="M83 91 Q100 86 117 91 Q116 108 100 112 Q84 108 83 91Z" fill="'+sv+'" stroke="'+ol+'" stroke-width="2"/>'+
    '<path d="M92 99 Q100 104 108 99" stroke="#3d4352" stroke-width="2.5" fill="none" stroke-linecap="round"/>'+
    '<ellipse class="h-eyeglow" cx="83" cy="74" rx="18" ry="13" fill="#8feaff" filter="url(#'+p+'gl)"/><ellipse class="h-eyeglow" cx="117" cy="74" rx="18" ry="13" fill="#8feaff" filter="url(#'+p+'gl)"/>'+
    '<path d="M67 70 Q71 61 86 63 Q97 65 97 74 Q96 85 84 85 Q70 83 67 70 Z" fill="url(#'+p+'ey)" stroke="#0b3f7a" stroke-width="1.8"/>'+
    '<path d="M133 70 Q129 61 114 63 Q103 65 103 74 Q104 85 116 85 Q130 83 133 70 Z" fill="url(#'+p+'ey)" stroke="#0b3f7a" stroke-width="1.8"/>'+
    '<g stroke="#ffffff" stroke-width=".9" opacity=".45" fill="none"><path d="M72 71 Q84 67 95 72M74 78 Q85 75 95 79M84 64 L84 84"/><path d="M128 71 Q116 67 105 72M126 78 Q115 75 105 79M116 64 L116 84"/></g>'+
    '<ellipse cx="80" cy="68" rx="4" ry="2.4" fill="#fff" opacity=".85"/><ellipse cx="112" cy="68" rx="4" ry="2.4" fill="#fff" opacity=".85"/>'+
    '</g>';
  return '<svg class="hero" viewBox="0 0 200 300" preserveAspectRatio="xMidYMax meet" aria-hidden="true" style="--tc:#38bdf8">'+
    '<defs>'+
    '<linearGradient id="'+p+'sv" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset=".5" stop-color="#dfe5ee"/><stop offset="1" stop-color="#98a5b8"/></linearGradient>'+
    '<linearGradient id="'+p+'rd" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ff5a5a"/><stop offset=".55" stop-color="#e3222a"/><stop offset="1" stop-color="#a50f16"/></linearGradient>'+
    '<radialGradient id="'+p+'ey" cx=".45" cy=".4" r=".7"><stop offset="0" stop-color="#f2ffff"/><stop offset=".45" stop-color="#8ee6ff"/><stop offset="1" stop-color="#1f86e6"/></radialGradient>'+
    '<filter id="'+p+'gl" x="-80%" y="-80%" width="260%" height="260%"><feGaussianBlur stdDeviation="4"/></filter>'+
    '</defs>'+
    '<ellipse class="h-aura" cx="100" cy="165" rx="92" ry="138" fill="#a8f0ff" filter="url(#'+p+'gl)" opacity=".7"/>'+
    '<ellipse cx="100" cy="284" rx="52" ry="8" fill="#000" opacity=".28"/>'+
    legL + legR + kick + armL + torso + head + armR + cross +
    '<circle class="mk-beam" cx="160" cy="126.5" r="1" fill="none"/>'+
    '</svg>';
}

const MONS = {
  fire:{name:'火焰怪獸', nick:'炎炎', body:'#ff6b3d', light:'#ffb08a', dark:'#b93a0e', belly:'#ffe0b0', shot:'#ff9f1c'},
  ice:{name:'冰凍怪獸', nick:'雪雪', body:'#6cc9f7', light:'#c8efff', dark:'#1d6fa5', belly:'#eefaff', shot:'#bae6fd'},
  thunder:{name:'雷電怪獸', nick:'閃閃', body:'#f7c21b', light:'#ffe98a', dark:'#9a6206', belly:'#fff6cf', shot:'#fde047'},
  rock:{name:'岩石怪獸', nick:'石頭哥', body:'#a67c5b', light:'#d9b594', dark:'#5f3f28', belly:'#ecd6bb', shot:'#c8a27c'},
  poison:{name:'毒霧怪獸', nick:'紫紫', body:'#a35cf0', light:'#d2b0ff', dark:'#5b1d9a', belly:'#f0e3ff', shot:'#b6f25c'},
  sea:{name:'海浪怪獸', nick:'浪浪', body:'#27c4b0', light:'#98f0e2', dark:'#0d6b61', belly:'#d8fff7', shot:'#5ee8ff'},
  boss:{name:'魔王怪獸', nick:'黑暗大魔王', body:'#5b2aa8', light:'#9f7ae0', dark:'#240b52', belly:'#c8b3f5', shot:'#ff4d6d', boss:true},
  kanegon:{name:'食錢怪', nick:'最鍾意食金幣', body:'#c9793a', light:'#f3b872', dark:'#6e3710', belly:'#e0a050', shot:'#ffd23f'},
  dada:{name:'三面怪人達達', nick:'最終大頭目', body:'#222', light:'#fff', dark:'#111', belly:'#fff', shot:'#ff6fb0', boss:true, final:true}
};

function monsterSVG(type, p){
  if(type==='kanegon') return kanegonSVG(p);
  if(type==='dada') return dadaSVG(p);
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
