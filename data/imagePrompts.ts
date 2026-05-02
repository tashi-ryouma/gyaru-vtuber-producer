const CORE = `Same character in all images: "Lunaria Amagi", adult woman age 24, gyaru VTuber, mature face proportions, long layered ash-blonde hair with pink inner highlights, sharp magenta eyes, glossy lips, stylish makeup, black choker with neon heart charm, pink-black-white color theme, streamer idol aura, high-detail anime illustration.`;
const SAFETY = `Avoid: nude, explicit sexual content, childlike, underage, school uniform fetish, loli look, cheap AI look, blurry, distorted face, extra fingers, bad hands, watermark, text artifacts, inconsistent design.`;

export const imagePrompts: Record<string, { label: string; prompt: string; group: string }> = {
  title: { label: 'タイトルKV', group: 'core', prompt: `${CORE} Title key visual for game cover, dynamic neon streamer room, confident smile, premium polished composition. ${SAFETY}` },
  base: { label: '基準立ち絵', group: 'portrait', prompt: `${CORE} Full body standing portrait, neutral pose, direct eye contact. ${SAFETY}` },
  smile: { label: '笑顔', group: 'expression', prompt: `${CORE} Bust-up portrait, bright smile, warm fanservice mood. ${SAFETY}` },
  wink: { label: 'ウインク', group: 'expression', prompt: `${CORE} Bust-up portrait, playful wink, little-devil charm, safe and classy. ${SAFETY}` },
  embarrassed: { label: '照れ', group: 'expression', prompt: `${CORE} Bust-up portrait, embarrassed blush and shy smile. ${SAFETY}` },
  surprised: { label: '驚き', group: 'expression', prompt: `${CORE} Bust-up portrait, surprised expression with vivid lighting. ${SAFETY}` },
  sad: { label: '落ち込み', group: 'expression', prompt: `${CORE} Bust-up portrait, slightly sad emotional expression. ${SAFETY}` },
  teasing: { label: '小悪魔笑み', group: 'expression', prompt: `${CORE} Bust-up portrait, teasing smirk, mature flirty vibe but non-explicit. ${SAFETY}` },
  streamingOutfit: { label: '配信衣装', group: 'outfit', prompt: `${CORE} Full body with signature streaming outfit, neon accessories, streamer-ready. ${SAFETY}` },
  casualOutfit: { label: '私服風', group: 'outfit', prompt: `${CORE} Full body with chic street casual outfit. ${SAFETY}` },
  celebratoryOutfit: { label: '記念衣装', group: 'outfit', prompt: `${CORE} Full body with anniversary celebratory outfit, sparkle effects. ${SAFETY}` },
  fanserviceOutfit: { label: 'ファンサ衣装', group: 'outfit', prompt: `${CORE} Full body with cute fanservice outfit, slightly exciting but tasteful and safe. ${SAFETY}` },
  specialOutfit: { label: '解放衣装', group: 'outfit', prompt: `${CORE} Full body with special unlocked premium outfit, dramatic lighting. ${SAFETY}` },
  eventBuzz: { label: 'バズCG', group: 'event', prompt: `${CORE} Event CG, viral explosion with social notifications, ecstatic expression. ${SAFETY}` },
  eventAnniversary: { label: '記念配信CG', group: 'event', prompt: `${CORE} Event CG, anniversary live stream celebration and confetti. ${SAFETY}` },
  eventSuperchat: { label: 'スパチャCG', group: 'event', prompt: `${CORE} Event CG, superchat fever with colorful donations flooding. ${SAFETY}` },
  eventFlame: { label: '炎上しかけCG', group: 'event', prompt: `${CORE} Event CG, near-controversy tension, anxious but composed reaction. ${SAFETY}` },
  eventFanservice: { label: '神ファンサCG', group: 'event', prompt: `${CORE} Event CG, god-tier fanservice moment and explosive crowd hype. ${SAFETY}` },
};

export const imageKeys = Object.keys(imagePrompts);
