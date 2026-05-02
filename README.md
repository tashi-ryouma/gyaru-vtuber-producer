# ai-gyaru-vtuber-sim

売れる同人/インディー水準を目指した、成人女性ギャルVTuber育成ゲームMVP。

## ローカル確認手順
1. `npm install`
2. `.env.local` 作成（任意）
3. `npm run dev`
4. `http://localhost:3000`
5. 行動ボタンを押すと Day が進み、結果ログ・ステータス差分・イベント演出が表示される

## 環境変数
- `OPENAI_API_KEY`: 画像生成有効化
- `OPENAI_IMAGE_MODEL`: 既定 `gpt-image-1`（環境に応じ切替）

## 画像生成の使い方
1. ゲーム画面の「画像生成管理」へ移動
2. `base / smile / wink / embarrassed / streamingOutfit / event*` などを個別生成、または一括生成
3. 生成後は `public/generated/*.png` に保存され、メイン画面とギャラリーで自動反映
4. 再生成ボタンで差し替え可能

## API未設定時の挙動
- `OPENAI_API_KEY` 未設定でもプレイ可能
- キャラはSVG仮ビジュアル（顔・髪・目付きのギャル風）で表示
- イベント画像も仮CG表示
- 生成API呼び出し時は未設定エラーをUI表示

## 実装要点
- Next.js + TypeScript + Tailwind + Zustand
- ターン制育成ループ / 行動カテゴリ / ランダムイベント重み付け
- localStorage セーブ/ロード/リセット
- 解放要素（衣装/表情/実績/称号）と履歴ログ
- OpenAI Images API はサーバー側Routeのみで実行

## 未検証点
- 実課金環境での画像大量生成コスト
- モデル差し替え時の画風ブレ
