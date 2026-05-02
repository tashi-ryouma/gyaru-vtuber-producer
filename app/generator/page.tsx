'use client';
import { useState } from 'react';
export default function Generator(){const [msg,setMsg]=useState('');
const run=async()=>{setMsg('生成中...'); const r=await fetch('/api/generate-batch',{method:'POST'}); const j=await r.json(); setMsg(JSON.stringify(j));};
return <main className='p-6'><a href='/' className='text-pink-300'>←戻る</a><h1 className='text-2xl'>画像生成管理</h1><p>OPENAI_API_KEY未設定時はプレースホルダーで継続可能</p><button onClick={run} className='mt-3 px-3 py-2 rounded bg-fuchsia-600'>主要画像を一括生成</button><pre className='mt-3 text-xs whitespace-pre-wrap'>{msg}</pre></main>;}
