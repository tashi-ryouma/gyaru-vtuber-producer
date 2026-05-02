# ai-gyaru-vtuber-sim (MVP)

成人女性ギャルVTuberを育成するブラウザゲームMVPです。1ターン1日で行動を選び、ファン数・収益・好感度を伸ばしつつ、メンタル/炎上リスクを管理します。

## 起動方法
1. `npm install`
2. `.env.local` を作成（任意）
3. `npm run dev`
4. `http://localhost:3000`

## 環境変数
- `OPENAI_API_KEY` (任意): 画像生成APIに必要
- `OPENAI_IMAGE_MODEL` (任意): 既定は `gpt-image-1`、互換モデルへ切替可能

## 画像生成機能
- `POST /api/generate-batch` で主要画像を一括生成
- `POST /api/generate-image` で個別生成 (`{ "key": "base" }`)
- プロンプトは `data/imagePrompts.ts` で管理
- 生成先は `public/generated/*.png`
- ゲームは保存済み画像を表示

## API未設定時
`OPENAI_API_KEY` 未設定の場合、生成APIは fallback レスポンスを返し、ゲーム内は `public/placeholders` のSVGを表示してそのまま遊べます。

## セーブ
- Zustand状態を `localStorage` (`gyaru-save`) へ保存/読込/リセット可能

## 拡張余地
- Supabase連携（クラウドセーブ、ユーザー管理）
- 課金導線（衣装パック、イベントパス）
- 追加キャラ、追加イベント、エンディング分岐

## 未検証点
- OpenAI Images API の実課金環境での大量一括生成コスト
- 画像モデル差異による品質ぶれ（`OPENAI_IMAGE_MODEL` 切替時）
