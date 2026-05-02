import { NextResponse } from 'next/server';
import { generateAll, listGenerated } from '@/lib/image-generation/generate';

export async function GET() {
  return NextResponse.json({ generated: await listGenerated(), hasApiKey: Boolean(process.env.OPENAI_API_KEY) });
}

export async function POST() {
  try {
    return NextResponse.json({ results: await generateAll() });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
