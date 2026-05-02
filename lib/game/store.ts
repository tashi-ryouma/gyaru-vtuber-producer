'use client';
import { create } from 'zustand';
import { actions } from './content';
import { Stats, Unlocks } from './types';

type EventDef = { id: string; text: string; effect: Partial<Stats>; cg: string; mood: 'good' | 'bad' };
const initialStats: Stats = { day: 1, fanCount: 300, subscribers: 100, revenue: 0, mental: 80, stamina: 80, buzz: 10, flameRisk: 5, affection: 40, charm: 45, streamingSkill: 35 };
const initialUnlocks: Unlocks = { outfits: ['streamingOutfit'], expressions: ['base', 'smile'], gallery: ['title'], achievements: [], titles: [] };
const clamp = (n: number) => Math.max(0, Math.min(100, n));

const events: EventDef[] = [
  { id: 'viral', text: 'バズる！切り抜き拡散で急上昇！', effect: { fanCount: 500, subscribers: 280, buzz: 16 }, cg: 'eventBuzz', mood: 'good' },
  { id: 'flame', text: '炎上しかける…謝罪対応で鎮火。', effect: { mental: -10, flameRisk: 14, affection: -7 }, cg: 'eventFlame', mood: 'bad' },
  { id: 'sick', text: '体調不良で配信短縮。', effect: { stamina: -18, mental: -8 }, cg: 'eventAnniversary', mood: 'bad' },
  { id: 'god', text: '神ファンサで人気急上昇！', effect: { affection: 12, fanCount: 360, revenue: 7000 }, cg: 'eventFanservice', mood: 'good' },
  { id: 'superchat', text: 'スパチャフィーバー！', effect: { revenue: 25000, buzz: 8 }, cg: 'eventSuperchat', mood: 'good' },
  { id: 'anniv', text: '記念配信イベント大成功！', effect: { subscribers: 220, affection: 9, buzz: 8 }, cg: 'eventAnniversary', mood: 'good' },
];

type State = { stats: Stats; log: string; logs: string[]; delta: Partial<Stats>; lastCg?: string; unlocks: Unlocks; toast?: string; doAction: (id: string) => void; save: () => void; load: () => void; reset: () => void };

const applyEffect = (s: Stats, e: Partial<Stats>) => {
  const next = { ...s };
  Object.entries(e).forEach(([k, v]) => ((next as any)[k] += v as number));
  ['mental', 'stamina', 'buzz', 'flameRisk', 'affection', 'charm', 'streamingSkill'].forEach((k) => ((next as any)[k] = clamp((next as any)[k])));
  return next;
};

export const useGameStore = create<State>((set, get) => ({
  stats: initialStats, log: 'チュートリアル: 行動を選んで1日進めよう！', logs: [], delta: {}, unlocks: initialUnlocks,
  doAction: (id) => {
    const act = actions.find((a) => a.id === id); if (!act) return;
    const before = get().stats;
    let s = applyEffect({ ...before, day: before.day + 1 }, act.effect);
    let log = `Day${s.day}: ${act.label} → ${act.desc}`;
    let cg = '';
    const badBias = s.flameRisk > 60 || s.mental < 30 || s.stamina < 25;
    const goodBias = s.charm > 70 || s.affection > 70 || s.streamingSkill > 70;
    const roll = Math.random();
    const trigger = roll < (badBias ? 0.55 : goodBias ? 0.45 : 0.35);
    if (trigger) {
      const pool = events.filter((e) => (badBias ? e.mood === 'bad' : goodBias ? e.mood === 'good' : true));
      const ev = pool[Math.floor(Math.random() * pool.length)];
      s = applyEffect(s, ev.effect); log += ` / EVENT: ${ev.text}`; cg = ev.cg;
    }
    const u = { ...get().unlocks, outfits: [...get().unlocks.outfits], expressions: [...get().unlocks.expressions], achievements: [...get().unlocks.achievements], titles: [...get().unlocks.titles], gallery: [...get().unlocks.gallery] };
    const unlocked: string[] = [];
    if (s.fanCount > 2000 && !u.outfits.includes('specialOutfit')) { u.outfits.push('specialOutfit'); unlocked.push('解放衣装'); }
    if (s.affection > 70 && !u.expressions.includes('teasing')) { u.expressions.push('teasing'); unlocked.push('新表情 teasing'); }
    if (s.revenue > 50000 && !u.achievements.includes('初の5万円突破')) { u.achievements.push('初の5万円突破'); unlocked.push('実績:初の5万円突破'); }
    if (s.subscribers > 2000 && !u.titles.includes('ネオンの女王')) { u.titles.push('ネオンの女王'); unlocked.push('称号:ネオンの女王'); }
    const delta: Partial<Stats> = {};
    Object.keys(before).forEach((k) => ((delta as any)[k] = (s as any)[k] - (before as any)[k]));
    const toast = unlocked.length ? `🎉 ${unlocked.join(' / ')}` : undefined;
    set({ stats: s, log, lastCg: cg, unlocks: u, delta, toast, logs: [log, ...get().logs].slice(0, 8) });
  },
  save: () => localStorage.setItem('gyaru-save', JSON.stringify({ stats: get().stats, unlocks: get().unlocks, logs: get().logs })),
  load: () => { const raw = localStorage.getItem('gyaru-save'); if (!raw) return; const d = JSON.parse(raw); set({ stats: d.stats, unlocks: d.unlocks, logs: d.logs || [], log: 'セーブデータ読込完了！', toast: '📂 ロード成功' }); },
  reset: () => set({ stats: initialStats, unlocks: initialUnlocks, logs: [], log: 'リセットしました。', lastCg: undefined, delta: {}, toast: '🔁 初期化完了' })
}));
