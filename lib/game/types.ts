export type Stats = { day:number; fanCount:number; subscribers:number; revenue:number; mental:number; stamina:number; buzz:number; flameRisk:number; affection:number; charm:number; streamingSkill:number };
export type Action = { id:string; label:string; effect: Partial<Stats>; desc:string };
export type Unlocks = { outfits:string[]; expressions:string[]; gallery:string[]; achievements:string[]; titles:string[] };
