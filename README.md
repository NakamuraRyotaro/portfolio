# Portfolio — Ryotaro Nakamura

Next.js (App Router) + MUI v6 + SST(OpenNext) で構築したポートフォリオサイト。

> 業務ではAWS Amplifyによる素早いデプロイが多いため、本ポートフォリオは敢えて `OpenNext + SST` で AWS プリミティブ (CloudFront / Lambda / DynamoDB / SES) を直接扱う構成にしています。

## 技術スタック

- **Frontend / SSR**: Next.js 15 (App Router) / React 19 / TypeScript
- **UI**: MUI v6 (`@mui/material`) + AppRouterCacheProvider
- **Form**: React Server Actions + zod
- **Backend (Contact)**: AWS SES (送信) + DynamoDB (履歴保存)
- **Infra (IaC)**: SST v3 + OpenNext (CloudFront + Lambda + S3)

## ディレクトリ構成

```
src/
├── app/
│   ├── layout.tsx          # 共通レイアウト + テーマ
│   ├── page.tsx            # トップページ
│   ├── about/page.tsx      # 自己紹介
│   ├── projects/
│   │   ├── page.tsx        # プロジェクト一覧
│   │   └── [slug]/page.tsx # プロジェクト詳細 (SSG)
│   └── contact/
│       ├── page.tsx        # お問い合わせ
│       └── actions.ts      # Server Action (SES + DynamoDB)
├── components/             # Header / Footer / ProjectCard / ContactForm
├── data/                   # projects.ts / profile.ts (コンテンツ)
├── lib/contact.ts          # zod スキーマ
└── theme/theme.ts          # MUIテーマ
sst.config.ts               # SST/OpenNext デプロイ定義
```

## ローカル開発

```bash
npm install
npm run dev
# → http://localhost:3000
```

ビルド確認:

```bash
npm run build
npm run typecheck
```

## コンテンツの書き換えポイント

ドラフトのため、以下の TODO を埋めてください。

- `src/data/profile.ts`
  - `links.github` / `links.x` / `links.linkedin` のURL
  - `summary` の自己紹介文
- `src/data/projects.ts`
  - 各プロジェクトの `summary` / `responsibilities` / `achievements`
  - 数値 (X件、X%、Xms など) を実データに差し替え
  - 公開できるなら `links` に GitHub / Demo URL を追加

## デプロイ (SST + OpenNext on AWS)

### 前提

- AWS CLI が `~/.aws/credentials` で設定済み (Amplifyで使ってるアカウントでOK)
- 送信元/送信先のメールアドレス (またはドメイン) を **SES で verify 済み**
  - SESサンドボックス中はTo側もverify必須
- リージョン: `ap-northeast-1` (sst.config.ts で設定)

### 初回セットアップ

```bash
# SSTのプラットフォームコードを取得 (.sst/ ができる)
npx sst install

# SES送信元/送信先を Secret に登録
npx sst secret set ContactFromEmail "noreply@yourdomain.example" --stage prod
npx sst secret set ContactToEmail   "ryotaro.nakamura@evem-japan.com" --stage prod
```

### デプロイ

```bash
# 開発用: ローカルのNext.jsを動かしつつ、SSTでLambda/SES等を立ち上げる
npm run sst:dev

# 本番デプロイ
npm run sst:deploy
```

成功すると CloudFront のURLが出力されます。独自ドメインを使う場合は `sst.config.ts` の `domain` ブロック (TODO コメントあり) を有効化してください。

### 削除

```bash
npm run sst:remove
```

## アピールポイント (面接でのトーク用)

- **Amplify と OpenNext の比較**: 業務では Amplify を使っているが、抽象の中身を理解したくて、本サイトでは CloudFront + Lambda + S3 の各プリミティブに分解して IaC (SST/Pulumi) でデプロイしている。
- **AWS統一の構成**: お問い合わせフォームは Server Action → SES + DynamoDB で完結し、外部SaaS依存を持たない。
- **静的化の徹底**: プロジェクト詳細ページは `generateStaticParams` で SSG、フォームのみ Server Action で動的処理。Lambda コールドスタート影響を最小化。

## ライセンス

Personal use only.
