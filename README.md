# Portfolio — Ryotaro Nakamura

AI × ヘルスケアを中心に開発している中村遼太郎のポートフォリオサイト。
Next.js (App Router) + SST(OpenNext) で AWS 上に構築し、独自ドメイン・HTTPS・CI/CD まで自前で運用しています。

🌐 **Live: https://ryotaro-nakamura.com**

> 業務では AWS Amplify による素早いデプロイが多いため、本ポートフォリオは敢えて `OpenNext + SST` で
> CloudFront / Lambda / S3 / DynamoDB / SES / Route 53 / ACM といった AWS プリミティブを直接扱う構成にしています。

## 技術スタック

| レイヤー | 技術 |
|---|---|
| Frontend / SSR | Next.js 15 (App Router) / React 19 / TypeScript |
| UI | Tailwind CSS v3 + motion (framer-motion)。Aceternity UI 風のダークデザインを自作 (`src/components/ui/`)。点描グローブは `cobe` |
| Form / Validation | React Server Actions + zod |
| Backend (Contact) | AWS SES (自ドメイン DKIM 署名で送信) + DynamoDB (履歴保存) |
| Infra (IaC) | SST v3 + OpenNext → CloudFront + Lambda + S3 |
| DNS / 証明書 | Route 53 (独自ドメイン) + ACM (TLS) |
| CI/CD | GitHub Actions (OIDC) → `sst deploy` 自動デプロイ |

## 見どころ

- **独自ドメイン + HTTPS**: Route 53 で取得したドメインを ACM 証明書付きで CloudFront に紐付け。
- **お問い合わせフォーム**: Server Action → SES 送信 + DynamoDB 保存で完結し、外部 SaaS 依存なし。
  送信元はドメインを **Easy DKIM 署名** することで、Gmail 等への到達性 (SPF/DKIM/DMARC) を確保。
- **静的化の徹底**: プロジェクト詳細は `generateStaticParams` で SSG。動的処理はフォームの Server Action のみ。
- **インタラクティブ UI**: ドラッグで回せる点描グローブ (cobe) や、スクロール連動アニメーション (motion)。
- **push したら本番反映**: main への push で GitHub Actions が OIDC で AWS ロールを引き受け、`sst deploy` を自動実行。

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

サイトのコンテンツ (プロフィール・実績) は `src/data/profile.ts` と `src/data/projects.ts` に集約しています。

## ローカル開発

```bash
npm install
npm run dev          # → http://localhost:3000
```

検証:

```bash
npm run build        # 本番ビルド
npm run typecheck    # tsc --noEmit
```

## デプロイ

### CI/CD (推奨)

`main` ブランチへ push すると、GitHub Actions が OIDC で AWS ロールを引き受けて自動デプロイします。

```bash
git push origin main   # → typecheck → sst deploy (prod)
```

事前に AWS 側で以下が必要です:
- GitHub OIDC プロバイダ (`token.actions.githubusercontent.com`)
- デプロイ用 IAM ロール (信頼ポリシーを当該リポジトリ/ブランチにスコープ)

### 手動デプロイ

```bash
# 開発用: ローカル Next.js を動かしつつ SST で Lambda/SES 等を起動
npm run sst:dev

# 本番デプロイ
npm run sst:deploy
```

### Secrets (お問い合わせメール)

```bash
npx sst secret set ContactFromEmail "noreply@<your-domain>" --stage prod
npx sst secret set ContactToEmail   "<your-notify-email>"   --stage prod
```

> 送信元 (`ContactFromEmail`) は **自分が DNS を管理するドメイン**にし、SES でドメイン認証 + DKIM を設定すること。
> `@gmail.com` などを送信元にすると SPF/DKIM/DMARC が成立せず、受信側でスパム扱いになります。

### 削除

```bash
npm run sst:remove
```

## 設計上の工夫

- **マネージドの抽象を分解して扱う**: マネージドなホスティングではなく、CloudFront + Lambda + S3 の
  各プリミティブに分解し、IaC (SST / Pulumi) で構成。インフラの責務を明示的に管理している。
- **AWS で完結する構成**: お問い合わせは Server Action → SES + DynamoDB で完結。外部 SaaS に依存しない。
- **メール到達性の作り込み**: 送信元ドメインを DKIM 署名し、SPF/DKIM/DMARC を成立させて Gmail への到達性を確保。
- **OIDC ベースの CI/CD**: アクセスキーを GitHub に保存せず、OIDC で一時クレデンシャルを取得して `sst deploy`。
- **静的化の徹底**: プロジェクト詳細は `generateStaticParams` で SSG。動的処理はフォームの Server Action のみに限定し、コールドスタートの影響を抑えている。

## ライセンス

Personal use only.
