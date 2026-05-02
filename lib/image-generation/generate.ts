import fs from 'node:fs/promises';
import path from 'node:path';
import OpenAI from 'openai';
import { imagePrompts } from '@/data/imagePrompts';

export async function generateOne(key:string){
  const prompt=imagePrompts[key]; if(!prompt) throw new Error('unknown key');
  const out=path.join(process.cwd(),'public/generated',`${key}.png`);
  if(!process.env.OPENAI_API_KEY) return {key,fallback:true};
  const client=new OpenAI({apiKey:process.env.OPENAI_API_KEY});
  const model=process.env.OPENAI_IMAGE_MODEL || 'gpt-image-1';
  const res=await client.images.generate({model,prompt,size:'1024x1024'} as any);
  const b64=(res.data?.[0] as any)?.b64_json; if(!b64) throw new Error('no image');
  await fs.writeFile(out,Buffer.from(b64,'base64'));
  return {key,fallback:false};
}
export async function generateAll(){const keys=Object.keys(imagePrompts); const r=[]; for(const k of keys) r.push(await generateOne(k)); return r;}
