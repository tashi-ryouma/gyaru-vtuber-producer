'use client';
import { create } from 'zustand';
import { actions } from './content';
import { Stats, Unlocks } from './types';

const initialStats: Stats = { day:1, fanCount:300, subscribers:100, revenue:0, mental:80, stamina:80, buzz:10, flameRisk:5, affection:40, charm:45, streamingSkill:35 };
const initialUnlocks: Unlocks = { outfits:['streamingOutfit'], expressions:['base','smile'], gallery:['title'], achievements:[], titles:[] };

const clamp=(n:number)=>Math.max(0,Math.min(100,n));
const events = [
 {id:'viral', text:'バズる！切り抜き拡散で急上昇！', effect:{fanCount:400,subscribers:260,buzz:15},cg:'eventBuzz'},
 {id:'flame', text:'炎上しかける…即対応で鎮火へ。', effect:{mental:-8,flameRisk:12,affection:-4},cg:'eventFlame'},
 {id:'sick', text:'体調不良でパフォーマンス低下。', effect:{stamina:-15,mental:-10},cg:'eventAnniversary'},
 {id:'god', text:'神ファンサで人気急上昇！', effect:{affection:12,fanCount:300,revenue:5000},cg:'eventFanservice'},
 {id:'superchat', text:'スパチャフィーバー！', effect:{revenue:20000,buzz:9},cg:'eventSuperchat'},
 {id:'anniv', text:'記念配信成功！', effect:{subscribers:200,affection:8,buzz:8},cg:'eventAnniversary'},
];

type State={stats:Stats;log:string;lastCg?:string;unlocks:Unlocks;doAction:(id:string)=>void;save:()=>void;load:()=>void;reset:()=>void};
export const useGameStore=create<State>((set,get)=>({stats:initialStats,log:'チュートリアル: 行動を選んで1日進めよう！',unlocks:initialUnlocks,
doAction:(id)=>{const act=actions.find(a=>a.id===id);if(!act)return; let s={...get().stats,day:get().stats.day+1};
 Object.entries(act.effect).forEach(([k,v])=>{(s as any)[k]+=v as number;});
 ['mental','stamina','buzz','flameRisk','affection','charm','streamingSkill'].forEach(k=>{(s as any)[k]=clamp((s as any)[k]);});
 let log=`${act.label}実行: ${act.desc}`; let cg=''; if(Math.random()<0.35){const ev=events[Math.floor(Math.random()*events.length)]; Object.entries(ev.effect).forEach(([k,v])=>{(s as any)[k]+=v as number;}); ['mental','stamina','buzz','flameRisk','affection','charm','streamingSkill'].forEach(k=>{(s as any)[k]=clamp((s as any)[k]);}); log += ` / イベント: ${ev.text}`; cg=ev.cg; }
 const u={...get().unlocks}; if(s.fanCount>2000&&!u.outfits.includes('specialOutfit'))u.outfits.push('specialOutfit'); if(s.affection>70&&!u.expressions.includes('teasing'))u.expressions.push('teasing'); if(s.revenue>50000&&!u.achievements.includes('初の5万円突破'))u.achievements.push('初の5万円突破');
 set({stats:s,log,lastCg:cg,unlocks:u});
}, save:()=>localStorage.setItem('gyaru-save',JSON.stringify({stats:get().stats,unlocks:get().unlocks})),
load:()=>{const raw=localStorage.getItem('gyaru-save'); if(!raw)return; const d=JSON.parse(raw); set({stats:d.stats,unlocks:d.unlocks,log:'セーブデータ読込完了！'});},
reset:()=>set({stats:initialStats,unlocks:initialUnlocks,log:'リセットしました。',lastCg:undefined})
}));
