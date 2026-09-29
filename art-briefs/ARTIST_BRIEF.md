# 超人乘數表 — 畫師 Brief（整合包）
更新日期：2026-09-29  
風格：Q 版／半寫實卡通，銀紅超人，夜城背景遊戲用。透明底 PNG。

---

## 總覽：要畫咩

| # | 工序 | 優先 | 張數（建議） | 說明 |
|---|------|------|--------------|------|
| **1** | 五段變身 × 出招姿整合 | ★★★ | 見下方矩陣 | 出招姿要跟變身段同一套裝甲 |
| **2** | 怪獸反擊出招圖 | ★★★ | 18（或先 6 隻核心） | 每隻「攻擊中」一幀 |
| **3** | 大 boss 電影結局 | ★★ | 2–4 張 key art | 對齊 final_04 星煌爆／cinema |
| **4** | 怪獸裁切修正 | ★★ | 至少 2（虛幻魔＋星辰霸王） | 過窄嘅重畫／加闊 |
| **5** | 元素擾亂特效（可選） | ★ | 6 套小特效 | 火燒／閃電／冰霜等（或用程式做） |

唔使畫（程式改）：戰績掣、圖鑑文案數值。

---

## 1. 五段變身 × 出招姿勢整合（最重要）

### 問題
- **待機五段**（`hero_h1`～`h5`）已有：裝甲隨連擊升級（肩甲→流星→水晶→翼）。
- **出招姿**（踢／光／拳／奧米加／防禦／勝利）多數仲似 **H1 基礎款**，打到 H5 時出招會「脫裝」。

對照圖：
- `brief_henshin_contact.png` — 五段待機
- `brief_poses_contact.png` — 現有出招
- `brief_henshin_vs_pose_mismatch.png` — H5 vs 踢姿不一致

### 變身段定義（連擊門檻）

| 段 | 檔名 | 連擊 | 外觀重點 |
|----|------|------|----------|
| H1 | hero_h1.png | 0–2 | 銀紅基礎體、黃眼、金 V、圓計時器 |
| H2 | hero_h2.png | 3–4 | + 肩甲／護肩 |
| H3 | hero_h3.png | 5–6 | + 流星／護腕層 |
| H4 | hero_h4.png | 7 | + 胸水晶發光 |
| H5 | hero_h5.png | 8+ | + 背翼／全裝最終型 |

### 出招姿定義（遊戲實際用法）

| 姿 | 現用檔 | 遊戲用途 |
|----|--------|----------|
| kick | hero_pose_kick.png | 迴旋踢、彗星翻踢 |
| beam | hero_pose_beam.png | 斯派修姆光線、強化射 |
| punch | hero_pose_punch.png | 拳、飛盤、旋風（多招共用） |
| omega | hero_pose_omega.png | 星煌爆／彩虹終結 |
| guard | hero_pose_guard.png | 答錯被怪獸反擊時防禦 |
| win | hero_pose_win.png | 勝利結算 |

### 請畫師交付：姿 × 段 矩陣

**方案 A（完整・推薦）**：6 姿 × 5 段 = **30 張**  
檔名建議：`hero_h{1-5}_pose_{kick|beam|punch|omega|guard|win}.png`

**方案 B（精簡）**：每姿只畫 **H1 / H3 / H5** 三檔 = **18 張**，中間段程式拉伸／複用。

### 技術規格
- 畫布：**統一透明底**，建議 **520×520**（或高度 520、寬度可伸但角色重心對齊）
- **腳底／重心**：所有姿同一水平線（戰鬥左右站位唔好上下跳）
- **線稿／上色／光澤**：必須同現有 H1–H5 待機同一套筆觸
- 出招姿要睇得出「同一段裝甲」（翼、肩、水晶唔好無咗）
- 可保留現有待機 `hero_h1`～`h5` 若已 OK；重點係 **pose 跟段升級**

---

## 2. 怪獸反擊出招圖

### 問題
答錯時英雄切 `guard`，怪獸而家只有 **待機圖**，未有「揮拳／噴火」攻擊幀。

參考：`brief_monster_attack_needed.png`

### 請畫
每隻怪獸 **1 張攻擊中 Pose**（透明底，約 **360×360**，同現有 `mon_*.png` 比例）。

檔名：`mon_{id}_attack.png`

### 優先 6 隻（可先交）

| id | 名 | 攻擊動作建議 |
|----|----|--------------|
| lavaover | 炎獄霸王 | 雙拳／岩漿砸下、噴火 |
| heidragon | 滅世黑龍 | 張口噴黑炎 |
| thundwolf | 雷神戰狼 | 雷爪前撲 |
| steeltiran | 鋼鐵暴君 | 鏈鋸／絞肉揮擊 |
| phoenix | 不死鳥 | 展翼噴天火 |
| starlord | 星辰霸王 | 舉臂召流星 |

其餘 12 隻可第二批（跟圖鑑必殺反擊名）：

| id | 必殺感覺 |
|----|----------|
| holyturt | 絕對零度光線（殼發光射線） |
| sandwyrm | 萬毒蝕骨霧（噴紫霧） |
| ninjacat | 永暗影遁（影子撲擊） |
| icetiran | 冰封吐息 |
| mtngod | 砸地裂地 |
| manflower | 藤蔓鞭打 |
| illusdemon | 幻滅光閃 |
| seaking | 掀浪 |
| deathscorp | 揚沙甩尾 |
| nightmare | 催眠眼神 |
| galmoth | 星塵振翅 |
| flamecrab | 火球彈射 |

---

## 3. 大 boss 電影結局（final_04）

### 問題
現有 cinema 係 letterbox＋特效；要對齊概念 **final_04** 星煌爆／電影質感。

現況截圖：`brief_cinema_current.png`

### 請畫（建議 2–4 張 key art，16:9 或遊戲舞台比例）
1. **對峙**：H5 超人 vs 星辰霸王，電影寬銀幕構圖  
2. **星煌爆蓄力**：胸／雙手能量爆發  
3. **流星天墜粉碎**：霸王被擊破／崩解  
4. （可選）勝利定格：超人 win 姿＋夜城

若有 final_04 原圖請一併交畫師對色同構圖。

---

## 4. 怪獸裁切修正

對照：`brief_monster_crops.png`、`brief_illusdemon_crop.png`

| 檔 | 現尺寸 | 問題 | 要求 |
|----|--------|------|------|
| mon_illusdemon.png | **144×360** | 極窄，圖鑑／戰鬥都扁 | 重畫或加闊至約 **340×360**，角色飽滿 |
| mon_starlord.png | 259×360 | 偏瘦 | 略加闊／補氣勢至約 320–360 寬 |
| 其他 | ~300–360 方 | OK | 可不動 |

統一：主體置中、腳底留白一致、透明底。

---

## 5. 元素擾亂特效（可選・可程式代替）

若畫：每元素 **小循環／貼圖**（唔使全畫面插畫）  
火 burn／電 lightning／冰 frost／岩 crack／毒 miasma／影 shadow  
用於答錯時按鈕震動＋元素反饋（取消舊全畫面擾亂）。

---

## 交貨 Checklist（畀畫師）

- [ ] 方案 A 或 B：pose × henshin 矩陣 PNG  
- [ ] 優先 6 隻 `mon_*_attack.png`（其餘可後）  
- [ ] cinema key art 2–4 張  
- [ ] `mon_illusdemon`（＋建議 `mon_starlord`）裁切修正  
- [ ] 全部透明底、命名跟表、同現有筆觸統一  

## 現有資產路徑（工程內）
`assets/battle/hero_h1.png` … `hero_h5.png`  
`assets/battle/hero_pose_*.png`  
`assets/battle/mon_*.png`
EOF

# also copy to store
cp /opt/cursor/artifacts/art-briefs/ARTIST_BRIEF.md /cursor/stores/self/ARTIST_BRIEF.md
wc -l /opt/cursor/artifacts/art-briefs/ARTIST_BRIEF.md
ls /opt/cursor/artifacts/art-briefs/
