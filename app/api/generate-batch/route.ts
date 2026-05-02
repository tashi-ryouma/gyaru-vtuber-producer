import { NextResponse } from 'next/server';
import { generateAll } from '@/lib/image-generation/generate';
export async function POST(){ try{return NextResponse.json({results:await generateAll()});}catch(e:any){return NextResponse.json({error:e.message},{status:500});}}
