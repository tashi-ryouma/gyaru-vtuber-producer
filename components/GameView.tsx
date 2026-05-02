'use client';
import { useEffect, useMemo, useState } from 'react';
import { actions, adoptedTitle, heroine } from '@/lib/game/content';
import { useGameStore } from '@/lib/game/store';

const percentKeys = ['mental', 'stamina', 'buzz', 'flameRisk', 'affection', 'charm', 'streamingSkill'] as const;
const byCat = { 配信: ['chat', 'game', 'asmr', 'song'], SNS: ['sns', 'short'], 育成: ['lesson', 'visual', 'costume'], 管理: ['rest', 'care', 'collab', 'sponsor'] };

function HeroFallback() {
  return <div className='h-[520px] rounded-2xl bg-[radial-gradient(circle_at_30%_20%,#f472b6_0,#7e22ce_45%,#111827_80%)] relative overflow-hidden border border-fuchsia-400/40'>
    <div className='absolute inset-0 opacity-30 bg-[linear-gradient(120deg,transparent,rgba(255,255,255,.12),transparent)] animate-pulse' />
    <svg viewBox='0 0 400 520' className='absolute inset-0 w-full h-full'>
      <ellipse cx='200' cy='430' rx='120' ry='55' fill='#111827'/><circle cx='200' cy='170' r='72' fill='#f6d1c1'/>
      <path d='M120 170c0-70 40-120 80-120s80 50 80 120c0 0-22-24-80-24s-80 24-80 24z' fill='#3f1f60'/>
      <circle cx='172' cy='170' r='11' fill='#be185d'/><circle cx='228' cy='170' r='11' fill='#be185d'/>
      <rect x='160' y='206' width='80' height='14' rx='7' fill='#fb7185'/>
      <path d='M120 280c28-40 132-40 160 0v150H120z' fill='#1f2937'/><path d='M145 296h110v30H145z' fill='#ec4899'/>
    </svg>
    <div className='absolute bottom-3 left-3 text-xs bg-black/40 px-2 py-1 rounded'>Lunaria fallback visual</div>
  </div>;
}

export default function GameView() {
  const { stats, log, logs, lastCg, unlocks, doAction, save, load, reset, delta, toast } = useGameStore();
  const [actionPulse, setActionPulse] = useState('');
  const [hasBase, setHasBase] = useState(false);
  useEffect(() => { const i = new Image(); i.onload = () => setHasBase(true); i.onerror = () => setHasBase(false); i.src = '/generated/base.png'; }, [stats.day]);
  const cats = useMemo(() => Object.entries(byCat).map(([name, ids]) => [name, actions.filter((a) => ids.includes(a.id))] as const), []);
  return <main className='min-h-screen p-3 md:p-8 bg-gradient-to-b from-zinc-950 via-purple-950/40 to-black'>
    <header className='mb-4'><h1 className='text-3xl md:text-4xl font-black tracking-tight text-fuchsia-300'>{adoptedTitle}</h1><p className='text-zinc-300'>成人女性ギャルVTuber育成 / Dayを進めてバズを狙え</p></header>
    {!process.env.NEXT_PUBLIC_DUMMY && <p className='card p-3 text-sm mb-3'>初回ガイド: ①「画像生成管理」で基準立ち絵(base)と表情を生成 → ②メイン画面で自動反映。APIキー未設定でも仮ビジュアルでプレイ可能。</p>}
    {toast && <div className='fixed top-4 right-4 z-20 bg-emerald-500 text-black font-bold px-3 py-2 rounded-xl shadow-lg'>{toast}</div>}
    <div className='grid lg:grid-cols-3 gap-4'>
      <section className='card p-3'>{hasBase ? <img src='/generated/base.png' className='rounded-2xl w-full h-[520px] object-cover border border-pink-400/40'/> : <HeroFallback />}
        <h2 className='text-2xl mt-2 text-pink-300 font-bold'>{heroine.name}</h2><p className='text-xs text-zinc-300'>{heroine.age} / {heroine.profile}</p></section>
      <section className='card p-4 lg:col-span-2'>
        <div className='grid grid-cols-2 md:grid-cols-4 gap-2 text-sm'>{Object.entries(stats).map(([k, v]) => <div key={k} className='bg-zinc-800/90 rounded-xl p-2 border border-zinc-700'><b className='text-pink-200'>{k}</b><div className={delta[k as keyof typeof delta] ? 'text-emerald-300 font-bold' : ''}>{v} {delta[k as keyof typeof delta] ? `(${(delta as any)[k] > 0 ? '+' : ''}${(delta as any)[k]})` : ''}</div>{percentKeys.includes(k as any) && <div className='h-1.5 bg-zinc-700 mt-1 rounded'><div className={`h-1.5 rounded ${k === 'flameRisk' ? 'bg-rose-500' : 'bg-fuchsia-400'}`} style={{ width: `${v}%` }} /></div>}</div>)}</div>
        <div className='mt-3 p-3 rounded-xl bg-black/30 border border-fuchsia-500/30'><p className='text-fuchsia-200 font-semibold'>{log}</p>{lastCg && <img src={`/generated/${lastCg}.png`} onError={(e) => ((e.currentTarget.src = '/placeholders/event.svg'))} className='rounded-xl mt-2 max-h-56 border border-fuchsia-300/30' />}</div>
      </section>
    </div>
    <section className='card p-4 mt-4 space-y-3'>{cats.map(([name, list]) => <div key={name}><h3 className='text-pink-300 font-bold mb-2'>{name}</h3><div className='grid sm:grid-cols-2 lg:grid-cols-4 gap-2'>{list.map((a) => <button key={a.id} onClick={() => { setActionPulse(a.label); doAction(a.id); setTimeout(() => setActionPulse(''), 500); }} className='rounded-xl bg-fuchsia-700/70 hover:bg-fuchsia-500 p-3 text-left border border-fuchsia-300/30 active:scale-95 transition'><div className='font-semibold'>{a.label}</div><div className='text-xs opacity-90'>{a.desc}</div></button>)}</div></div>)}</section>
    {actionPulse && <div className='fixed bottom-6 left-1/2 -translate-x-1/2 bg-pink-500 text-black font-black px-4 py-2 rounded-full'>✨ {actionPulse} 実行！ Day {stats.day}</div>}
    <section className='grid lg:grid-cols-2 gap-4 mt-4'><div className='card p-4'><h3 className='text-pink-300 font-bold'>履歴</h3><ul className='text-xs mt-2 space-y-1'>{logs.map((l, i) => <li key={i} className='bg-zinc-800 rounded p-2'>{l}</li>)}</ul></div><div className='card p-4'><h3 className='text-pink-300 font-bold'>解放要素</h3><p className='text-sm'>衣装: {unlocks.outfits.join(', ')}</p><p className='text-sm'>表情: {unlocks.expressions.join(', ')}</p><p className='text-sm'>称号: {unlocks.titles.join(', ') || 'なし'}</p><p className='text-sm'>実績: {unlocks.achievements.join(', ') || 'なし'}</p><div className='flex flex-wrap gap-2 mt-3'><button onClick={save} className='px-3 py-2 rounded bg-emerald-600'>セーブ</button><button onClick={load} className='px-3 py-2 rounded bg-sky-600'>ロード</button><button onClick={reset} className='px-3 py-2 rounded bg-rose-700'>リセット</button><a href='/gallery' className='px-3 py-2 rounded bg-zinc-700'>ギャラリー</a><a href='/generator' className='px-3 py-2 rounded bg-zinc-700'>画像生成管理</a></div></div></section>
  </main>;
}
