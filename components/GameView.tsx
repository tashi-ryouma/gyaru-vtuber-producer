'use client';
import { actions, adoptedTitle, heroine } from '@/lib/game/content';
import { useGameStore } from '@/lib/game/store';

const img=(k:string)=>`/generated/${k}.png`;
export default function GameView(){
  const {stats,log,lastCg,unlocks,doAction,save,load,reset}=useGameStore();
  return <main className='min-h-screen p-4 md:p-8 bg-gradient-to-b from-zinc-950 via-purple-950/40 to-zinc-950'>
    <h1 className='text-3xl font-bold text-fuchsia-300'>{adoptedTitle}</h1>
    <p className='text-sm text-zinc-300'>成人女性VTuber育成MVP</p>
    <div className='grid md:grid-cols-3 gap-4 mt-4'>
      <section className='card p-4 md:col-span-1'><img src={img('base')} onError={(e)=>((e.currentTarget.src='/placeholders/base.svg'))} className='rounded-xl w-full' />
      <h2 className='text-xl mt-2 text-pink-300'>{heroine.name}</h2><p className='text-xs'>{heroine.age} / {heroine.profile}</p><p className='text-xs mt-1'>{heroine.tone}</p></section>
      <section className='card p-4 md:col-span-2'>
        <div className='grid grid-cols-2 md:grid-cols-4 gap-2 text-sm'>{Object.entries(stats).map(([k,v])=><div key={k} className='bg-zinc-800 rounded p-2'><b>{k}</b><div>{v}</div></div>)}</div>
        <p className='mt-3 text-fuchsia-200'>{log}</p>{lastCg && <img src={img(lastCg)} onError={(e)=>((e.currentTarget.src='/placeholders/event.svg'))} className='rounded-xl mt-2 max-h-56'/>}
      </section>
    </div>
    <section className='card p-4 mt-4'><h3 className='text-lg text-pink-300'>行動選択</h3><div className='grid md:grid-cols-3 gap-2 mt-2'>{actions.map(a=><button key={a.id} onClick={()=>doAction(a.id)} className='rounded bg-fuchsia-600/70 hover:bg-fuchsia-500 p-2 text-left'><div>{a.label}</div><div className='text-xs opacity-80'>{a.desc}</div></button>)}</div></section>
    <section className='card p-4 mt-4 flex flex-wrap gap-2'><button onClick={save} className='px-3 py-2 rounded bg-emerald-600'>セーブ</button><button onClick={load} className='px-3 py-2 rounded bg-sky-600'>ロード</button><button onClick={reset} className='px-3 py-2 rounded bg-rose-700'>リセット</button><a href='/gallery' className='px-3 py-2 rounded bg-zinc-700'>ギャラリー</a><a href='/generator' className='px-3 py-2 rounded bg-zinc-700'>画像生成管理</a></section>
    <section className='card p-4 mt-4'><h3 className='text-pink-300'>解放要素</h3><p className='text-sm'>衣装: {unlocks.outfits.join(', ')}</p><p className='text-sm'>表情: {unlocks.expressions.join(', ')}</p><p className='text-sm'>実績: {unlocks.achievements.join(', ')||'なし'}</p></section>
  </main>
}
