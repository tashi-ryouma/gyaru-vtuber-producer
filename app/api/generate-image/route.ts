import { NextRequest, NextResponse } from 'next/server';
import { generateOne } from '@/lib/image-generation/generate';
export async function POST(req:NextRequest){const {key}=await req.json(); try{return NextResponse.json(await generateOne(key));}catch(e:any){return NextResponse.json({error:e.message},{status:500});}}
