import { imageKeys } from '@/data/imagePrompts';
export default function Gallery() {
  return <main className='p-6'><a href='/' className='text-pink-300'>←戻る</a><h1 className='text-2xl font-bold'>ギャラリー</h1><div className='grid md:grid-cols-4 gap-3 mt-4'>{imageKeys.map((k) => <div key={k} className='card p-2'><img src={`/generated/${k}.png`} onError={(e) => ((e.currentTarget.src = '/placeholders/base.svg'))} className='rounded h-40 object-cover w-full' /><p className='text-xs mt-1'>{k}</p></div>)}</div></main>;
}
