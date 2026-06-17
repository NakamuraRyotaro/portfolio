# Portfolio — Ryotaro Nakamura

中村遼太郎のポートフォリオサイトです。
Next.js (App Router) を SST (OpenNext) で AWS 上にデプロイし、独自ドメイン・HTTPS・CI/CD まで自前で構築・運用しています。

🌐 **Live:** https://ryotaro-nakamura.com

---

## 主な機能

- **独自ドメイン + HTTPS** — Route 53 で取得したドメインを、ACM 証明書付きで CloudFront に配信。
- **お問い合わせフォーム** — Server Action から SES 送信 + DynamoDB 保存まで完結。外部 SaaS に依存しない。
- **インタラクティブな UI** — ドラッグで回せる点描グローブ (cobe) と、スクロール連動アニメーション (motion)。
- **自動デプロイ** — `main` への push で GitHub Actions が OIDC で AWS ロールを引き受け、`sst deploy` を実行。

---

## 技術スタック

| レイヤー | 技術 |
| --- | --- |
| Frontend / SSR | Next.js 15 (App Router) / React 19 / TypeScript |
| UI | Tailwind CSS v3 + motion (framer-motion)。Aceternity UI 風のダーク基調なデザインを自作 (`src/components/ui/`) |
| 3D / インタラクション | 点描グローブは cobe（ドラッグで回転） |
| Form / Validation | React Server Actions + zod |
| Backend (Contact) | AWS SES（自ドメインを DKIM 署名して送信）+ DynamoDB（送信履歴を保存） |
| Infra (IaC) | SST v3 + OpenNext → CloudFront + Lambda + S3 |
| DNS / 証明書 | Route 53（独自ドメイン）+ ACM（TLS） |
| CI/CD | GitHub Actions (OIDC) → `sst deploy` |

---

## アーキテクチャ・設計

- **マネージドな抽象に乗りきらない** — ホスティングをまるごとマネージドサービスに任せるのではなく、CloudFront / Lambda / S3 のプリミティブに分解し、SST (Pulumi) で IaC として構成。インフラの責務を明示的に管理しています。
- **AWS で完結させる** — お問い合わせは Server Action → SES + DynamoDB で完結させ、フォーム SaaS への依存をなくしました。
- **メール到達性の確保** — 送信元ドメインを DKIM 署名し、SPF / DKIM / DMARC を成立させることで Gmail などへの到達性を担保しています。
- **鍵を持たない CI/CD** — アクセスキーを GitHub に保存せず、OIDC で一時クレデンシャルを取得して `sst deploy`。
- **静的化でコールドスタートを抑制** — プロジェクト詳細は `generateStaticParams` で SSG 化し、動的処理はフォームの Server Action のみに限定しています。

---

## ディレクトリ構成

```
src/
├── app/
│   ├── layout.tsx           # 共通レイアウト + メタ情報
│   ├── icon.svg             # ファビコン (RN ロゴ)
│   ├── page.tsx             # トップ (ヒーロー + 主要プロジェクト + スタック)
│   ├── about/page.tsx       # 自己紹介・経歴・スキル
│   ├── projects/
│   │   ├── page.tsx         # プロジェクト一覧
│   │   └── [slug]/page.tsx  # プロジェクト詳細 (SSG)
│   └── contact/
│       ├── page.tsx         # お問い合わせ
│       └── actions.ts       # Server Action (SES + DynamoDB)
├── components/              # Header / Footer / ProjectCard / ContactForm
│   └── ui/                  # 自作の Aceternity 風コンポーネント群
├── data/                    # projects.ts / profile.ts (サイトのコンテンツ)
└── lib/                     # contact.ts (zod スキーマ) / utils.ts (cn)
sst.config.ts                # SST / OpenNext のインフラ定義
.github/workflows/deploy.yml # CI/CD (OIDC → sst deploy)
```

サイトのコンテンツ（プロフィール・実績）は `src/data/profile.ts` と `src/data/projects.ts` に集約しています。

---

## セットアップ

```bash
npm install
npm run dev          # → http://localhost:3000
```

ビルド・型チェック:

```bash
npm run build        # 本番ビルド
npm run typecheck    # tsc --noEmit
```

---

## デプロイ

### CI/CD（推奨）

`main` ブランチへ push すると、GitHub Actions が OIDC で AWS ロールを引き受けて自動デプロイします。

```bash
git push origin main   # → typecheck → sst deploy (prod)
```

事前に AWS 側で以下が必要です:

- GitHub OIDC プロバイダ (`token.actions.githubusercontent.com`)
- デプロイ用 IAM ロール（信頼ポリシーを当該リポジトリ / ブランチにスコープ）

### 手動デプロイ

```bash
# 開発用: ローカル Next.js を動かしつつ SST で Lambda/SES 等を起動
npm run sst:dev

# 本番デプロイ
npm run sst:deploy
```

### 環境変数 / Secrets

```bash
npx sst secret set ContactFromEmail "noreply@<your-domain>" --stage prod
npx sst secret set ContactToEmail   "<your-notify-email>"   --stage prod
```

送信元 (`ContactFromEmail`) は **自分が DNS を管理するドメイン** にし、SES でドメイン認証 + DKIM を設定してください。
`@gmail.com` などを送信元にすると SPF / DKIM / DMARC が成立せず、受信側でスパム扱いになります。

### リソース削除

```bash
npm run sst:remove
```

---

## ライセンス

Personal use only.