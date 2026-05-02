import fs from 'node:fs/promises';
import path from 'node:path';
import OpenAI from 'openai';
import { imageKeys, imagePrompts } from '@/data/imagePrompts';

export async function generateOne(key: string) {
  const item = imagePrompts[key];
  if (!item) throw new Error('unknown key');
  const out = path.join(process.cwd(), 'public/generated', `${key}.png`);
  if (!process.env.OPENAI_API_KEY) return { key, fallback: true, error: 'OPENAI_API_KEY is not set' };
  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const model = process.env.OPENAI_IMAGE_MODEL || 'gpt-image-1';
  const res = await client.images.generate({ model, prompt: item.prompt, size: '1024x1024' } as any);
  const b64 = (res.data?.[0] as any)?.b64_json;
  if (!b64) throw new Error('no image returned');
  await fs.writeFile(out, Buffer.from(b64, 'base64'));
  return { key, fallback: false };
}

export async function generateAll() {
  const r = [];
  for (const k of imageKeys) r.push(await generateOne(k));
  return r;
}

export async function listGenerated() {
  const dir = path.join(process.cwd(), 'public/generated');
  const files = await fs.readdir(dir).catch(() => [] as string[]);
  const mapped = imageKeys.map((key) => ({ key, exists: files.includes(`${key}.png`) }));
  return mapped;
}
