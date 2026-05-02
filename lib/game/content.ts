import { Action } from './types';
export const titleOptions = ["ネオギャル☆ストリームシンデレラ","Gal Beat VTuber Producer","小悪魔配信メイクアップ！","バズれ、ギャル姫VTuber","ピンクネオンの推し育成"];
export const adoptedTitle = titleOptions[0];
export const heroine = {
 name:'天城ルナリア', age:'24歳（成人女性）',
 profile:'明るく距離感近めのギャル系VTuber。努力家で毎晩配信研究を欠かさない。',
 tone:'「～じゃん？」「マジでありがと♡」', style:'雑談＋ゲーム＋歌。ASMR風ファンサも上手い。',
 likes:'コスメ収集、音ゲー、深夜ラーメン', weakness:'メンタル消耗とSNS炎上耐性が低め', charm:'強い目力、表情管理、神レス能力'
};
export const actions: Action[] = [
 {id:'chat',label:'雑談配信',desc:'好感度とファンを安定獲得',effect:{fanCount:120,affection:5,stamina:-8,mental:-2}},
 {id:'game',label:'ゲーム配信',desc:'登録者とスキル上昇',effect:{subscribers:90,streamingSkill:4,stamina:-10}},
 {id:'asmr',label:'ASMR風ファンサ配信',desc:'収益と魅力が伸びるが炎上リスク微増',effect:{revenue:7000,affection:8,charm:4,flameRisk:5,stamina:-14}},
 {id:'song',label:'歌配信',desc:'話題性アップ',effect:{buzz:7,fanCount:80,stamina:-12}},
 {id:'sns',label:'SNS投稿',desc:'拡散狙い',effect:{buzz:6,fanCount:60,flameRisk:4}},
 {id:'short',label:'ショート動画投稿',desc:'新規流入',effect:{subscribers:120,buzz:5,stamina:-4}},
 {id:'lesson',label:'レッスン',desc:'地道なスキル育成',effect:{streamingSkill:7,stamina:-8,revenue:-500}},
 {id:'visual',label:'ビジュアル研究',desc:'魅力上昇',effect:{charm:6,revenue:-2000,stamina:-6}},
 {id:'costume',label:'衣装調整',desc:'魅力＆話題性アップ',effect:{charm:5,buzz:4,revenue:-3000}},
 {id:'rest',label:'休息',desc:'体力とメンタル回復',effect:{stamina:20,mental:14}},
 {id:'care',label:'メンタルケア',desc:'炎上耐性を整える',effect:{mental:18,flameRisk:-8,revenue:-1000}},
 {id:'collab',label:'コラボ対応',desc:'爆発力あるが不安定',effect:{fanCount:180,buzz:12,flameRisk:6,stamina:-16}},
 {id:'sponsor',label:'案件対応',desc:'収益大、印象に注意',effect:{revenue:15000,affection:-3,flameRisk:3,stamina:-10}},
];
