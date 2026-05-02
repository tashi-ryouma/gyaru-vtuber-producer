'use client';
import { useEffect, useState } from 'react';
import { imageKeys, imagePrompts } from '@/data/imagePrompts';

type Item = { key: string; exists: boolean };
export default function Generator() {
  const [msg, setMsg] = useState('');
  const [items, setItems] = useState<Item[]>([]);
  const [hasApiKey, setHasApiKey] = useState(false);
  const refresh = async () => { const r = await fetch('/api/generate-batch'); const j = await r.json(); setItems(j.generated || []); setHasApiKey(j.hasApiKey); };
  useEffect(() => { refresh(); }, []);
  const generateOne = async (key: string) => { setMsg(`${key} 生成中...`); const r = await fetch('/api/generate-image', { method: 'POST', body: JSON.stringify({ key }) }); const j = await r.json(); setMsg(j.error ? `失敗: ${j.error}` : `${key} 生成成功`); refresh(); };
  const generateAll = async () => { setMsg('一括生成中...'); const r = await fetch('/api/generate-batch', { method: 'POST' }); const j = await r.json(); setMsg(j.error ? `失敗: ${j.error}` : '一括生成完了'); refresh(); };
  return <main className='p-6'>
    <a href='/' className='text-pink-300'>←戻る</a><h1 className='text-2xl font-bold'>画像生成管理</h1>
    <p className='text-sm mt-1'>手順: 1) base/smile/wink を優先生成 2) outfit/eventCG を追加生成 3) メイン画面へ戻ると自動反映。</p>
    {!hasApiKey && <p className='mt-2 p-2 rounded bg-amber-500/20 border border-amber-400 text-amber-200'>OPENAI_API_KEY未設定: 画像生成APIは実行不可。仮ビジュアルでプレイ可能です。</p>}
    <button onClick={generateAll} className='mt-3 px-3 py-2 rounded bg-fuchsia-600'>主要画像を一括生成</button><p className='text-sm mt-2'>{msg}</p>
    <div className='grid md:grid-cols-3 gap-3 mt-4'>{imageKeys.map((k) => { const st = items.find((i) => i.key === k); return <div key={k} className='card p-3'><img src={`/generated/${k}.png?${Date.now()}`} onError={(e) => ((e.currentTarget.src = '/placeholders/base.svg'))} className='rounded-lg h-40 w-full object-cover' /><p className='text-sm mt-1'>{imagePrompts[k].label} ({k})</p><p className='text-xs'>{st?.exists ? '✅ 生成済み' : '未生成'}</p><button onClick={() => generateOne(k)} className='mt-2 px-2 py-1 rounded bg-zinc-700'>この画像を生成/再生成</button></div>; })}</div>
  </main>;
}
