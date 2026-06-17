export type ProjectRole = "frontend" | "backend" | "infra" | "fullstack";

export type ProjectImage = {
  src: string;
  alt: string;
  /**
   * 表示方法を決める種別。
   * screenshot=ブラウザ枠 / phone=端末モック+3Dチルト / diagram=図(白カード) / portrait=人物・アバター
   */
  kind: "screenshot" | "phone" | "diagram" | "portrait";
};

export type ProjectHighlight = {
  title: string;
  problem: string;
  approach: string;
  result: string;
};

/** スライド資料（提出スライドの該当ページをそのまま掲載） */
export type ProjectSlide = { src: string; alt: string };

export type Testimonial = { role: string; quote: string };

export type Project = {
  slug: string;
  title: string;
  tagline: string;
  period: string;
  team: string;
  roles: ProjectRole[];
  domain: string;
  /** 研究室 か インターン か */
  track: "研究室" | "インターン";
  /** Bento 上の大きさ。major = 大きく見せる主力 */
  scale: "major" | "minor";
  /** 代表メトリクス（カード/詳細のヒーローに大きく出す） */
  metric?: { value: string; label: string };
  techStack: string[];
  summary: string;
  responsibilities: string[];
  achievements: string[];
  highlights?: ProjectHighlight[];
  /** カード用サムネ。未指定なら images[0] を使う */
  cover?: ProjectImage;
  images?: ProjectImage[];
  slides?: ProjectSlide[];
  testimonials?: Testimonial[];
  architecture?: string;
  links?: { label: string; href: string }[];
  archived?: boolean;
  confidential?: boolean;
};

export const projects: Project[] = [
  {
    slug: "mental-health-followup",
    title: "精神科問診支援アプリ",
    tagline:
      "診察と診察の間に、AIが問診で患者をフォローし、医師に診療補助情報を届ける",
    period: "2025/04 — 現在",
    team: "研究室 / 共同開発 ・ 担当: フロント全般・インフラ・AI連携バックエンド",
    roles: ["frontend", "backend", "infra"],
    domain: "ヘルスケア / メンタルヘルス",
    track: "研究室",
    scale: "major",
    metric: { value: "30% → 70%", label: "1ヶ月継続利用率を改善" },
    techStack: [
      "React",
      "TypeScript",
      "MUI",
      "LIFF",
      "Python",
      "FastAPI",
      "LangChain",
      "SQLAlchemy",
      "Claude API",
      "LINE Messaging API",
      "App Runner",
      "Lambda",
      "EventBridge",
      "RDS",
      "Cognito",
      "GitHub Actions",
    ],
    summary:
      "精神科クリニックの診療時間は5〜10分程度が一般的で、短い診察では患者の症状変化を把握しきれない。診察と診察の間に、LINE/LIFF のアンケートと AI の会話で患者から継続的に情報を集め、医師用画面で体調・服薬状況・症状を可視化するアプリを開発した。",
    responsibilities: [
      "フロントエンド: LIFF による3種類のアンケート画面 / 診療データ可視化グラフの実装",
      "バックエンド: 会話フェーズ別プロンプト管理 / 希死念慮等の非同期リスク判定 / 医師アプリ連携API",
      "インフラ: App Runner 内のスケジューラを Lambda + EventBridge へ移行、CI/CD を整備",
    ],
    achievements: [
      "1ヶ月の継続利用率を約30% → 70% に改善",
      "定期アンケートの重複送信を EventBridge + Lambda への再設計で恒久対応",
      "臨床試験で「短い診察時間でも症状を細かく把握できた」等の医師フィードバックを獲得",
    ],
    highlights: [
      {
        title: "アンケートの重複送信を「根治」した",
        problem:
          "初期構成では App Runner 上の APScheduler で定期送信していたが、スケールアウト時に複数コンテナでジョブが起動し、同一患者への重複送信が発生していた。",
        approach:
          "CloudWatch Logs にコンテナ識別情報を出力して原因を特定。MySQL のロックで1コンテナのみ実行する暫定対応を経て、定期処理を EventBridge + Lambda へ切り出し、Web API と分離して再設計した。",
        result:
          "重複送信の再発をゼロにし、送信履歴・状態を管理できる実運用に耐える定期送信基盤へ改善した。",
      },
      {
        title: "継続利用率を 30% → 70% に引き上げた",
        problem:
          "初期の臨床試験では、1ヶ月間の継続利用率が約3割に留まっていた。",
        approach:
          "医師フィードバックと患者の利用ログから原因仮説を立て、気分アンケートを起点に AI から会話を開始して会話負担を軽減。さらに会話要約が担当医に共有されると明示し、利用意義を可視化した。",
        result:
          "会話設計と運用の両面から改善し、1ヶ月間の継続利用率を約7割まで引き上げた。",
      },
      {
        title: "安全性: リスク判定を全メッセージで並列実行",
        problem:
          "メンタルヘルス領域では、希死念慮や犯罪リスクの検出漏れが致命的になりうる。",
        approach:
          "全メッセージに対してリスク判定 (希死念慮・犯罪リスク) を並列で実行し、検出時は会話を中断して即座に相談機関の案内へ切り替える設計にした。",
        result:
          "通常の会話フローを止めずに、安全性を担保する仕組みを実装した。",
      },
    ],
    images: [
      { src: "/work/medpal/doctor-dashboard.png", alt: "医師用ダッシュボード: 体調・服薬・症状を可視化", kind: "screenshot" },
      { src: "/work/medpal/line-chat.png", alt: "LINE上でのAI問診チャット画面", kind: "phone" },
      { src: "/work/medpal/survey-mood.png", alt: "気分アンケート (絵文字スライダーUI)", kind: "phone" },
    ],
    slides: [
      { src: "/work/medpal/slides/architecture.png", alt: "AWSアーキテクチャ（Cognito / LINE Messaging API / Claude API / App Runner / Lambda + EventBridge / RDS）" },
      { src: "/work/medpal/slides/tech-stack.png", alt: "技術スタックと主な担当箇所（フロント / バックエンド / インフラ）" },
      { src: "/work/medpal/slides/survey.png", alt: "LIFFで実装した3種類のアンケート（気分・体調・残薬）" },
      { src: "/work/medpal/slides/conversation.png", alt: "会話機能の設計フロー（リスク判定の並列実行・問診/自由問診のフェーズ管理）" },
      { src: "/work/medpal/slides/dup-send.png", alt: "直面した課題①: アンケートの重複送信を EventBridge + Lambda で再設計" },
      { src: "/work/medpal/slides/retention.png", alt: "直面した課題②: 1ヶ月継続利用率を3割→7割へ改善" },
    ],
    architecture:
      "認証認可は AWS Cognito、外部連携は LINE Messaging API / Claude API。API は App Runner、定期アンケート送信は Lambda + EventBridge。App Runner / Lambda は VPC 内から RDS にアクセスし、外向き通信は NAT Gateway 経由。",
    links: [],
    confidential: true,
  },
  {
    slug: "clinical-soap-generator",
    title: "診療録自動生成アプリ",
    tagline:
      "診療音声をリアルタイムに文字起こしし、医師の診療録(SOAP)を自動生成する",
    period: "2025/12 — 現在",
    team: "研究室 / 共同開発 ・ 担当: 文字起こし→SOAP生成パイプライン・AWSインフラ設計・MFA",
    roles: ["backend", "infra"],
    domain: "ヘルスケア / 音声認識",
    track: "研究室",
    scale: "major",
    metric: { value: "リアルタイム", label: "音声→SOAPを1分ごとに段階生成" },
    techStack: [
      "Python",
      "FastAPI",
      "SQLAlchemy",
      "React",
      "TypeScript",
      "WebSocket",
      "Amazon Transcribe",
      "Amazon Bedrock",
      "SpeechBrain",
      "ECS Fargate",
      "App Runner",
      "ALB",
      "RDS",
      "Cognito",
      "SNS",
      "SES",
    ],
    summary:
      "医師は診療時間の約半分をカルテ入力に費やしている。診療音声をリアルタイムで文字起こしし、診療録(SOAP)を自動生成することで、医師をカルテ入力の負担から解放し、診療に集中できるようにするアプリを開発した。",
    responsibilities: [
      "バックエンド: 診療音声のリアルタイム文字起こし → カルテ(SOAP)自動生成パイプラインの設計・実装",
      "インフラ: AWS全体のアーキテクチャ設計 (VPC / ECS Fargate / ALB / RDS / Cognito)",
      "認証: セキュリティ強化のため MFA (多要素認証) を実装 (Cognito + SNS(SMS) + SES(メール))",
    ],
    achievements: [
      "診療中に SOAP が段階的に形成される過程を可視化し、聞き漏らしを低減するUXを設計",
      "SpeechBrain の声紋照合で話者識別を補正し、SOAP生成精度を向上",
      "WebSocket 音声は ECS Fargate、通常APIは App Runner に分離しコンピュートを最適化",
    ],
    highlights: [
      {
        title: "LLMの医師・患者「誤認識」を声紋照合で解消",
        problem:
          "Transcribe 単体では話者分離はできるが「どちらが医師か」は特定できない。医師の質問が患者発話として扱われ、診療録に誤って反映されるリスクがあった (例: 医師『最近消えてしまいたいことは?』→ SOAP『希死念慮あり』)。",
        approach:
          "医師の声を事前に声紋登録し、SpeechBrain で話者音声をベクトル化して照合。話者ラベルを役割に再ラベリングした上で、ラベル付き発話を Bedrock に入力して SOAP を生成した。",
        result:
          "話者の取り違えによる診療録の誤反映を防ぎ、Bedrock による SOAP 生成の精度を高めた。",
      },
      {
        title: "負荷特性で用途別にコンピュートを分離",
        problem:
          "常時接続の WebSocket 音声ストリーミングと、通常の HTTP API では負荷特性・スケール要件が大きく異なる。",
        approach:
          "WebSocket の音声ストリーミングは ECS Fargate、通常APIは App Runner に分離。RDS は Private Subnet に配置し、EC2 Bastion 経由のみアクセス可能にした。",
        result:
          "用途に応じてコンピュートを最適化し、セキュリティと安定運用を両立した。",
      },
      {
        title: "SOAPの分割生成 + Human in the Loop",
        problem:
          "診療の最後にまとめて生成すると、医師は「どこまで聞けているか」を診療中に把握できない。",
        approach:
          "1分ごとに新規発話を整理して Bedrock で SOAP に追記し、形成過程を可視化。AIが生成した SOAP は最終的に医師が確認・修正した上で確定保存する設計にした。",
        result:
          "診療中の聞き漏らしを低減しつつ、医師が最終責任を持てる安全な運用フローを実現した。",
      },
    ],
    images: [
      { src: "/work/clinnote/doctor-soap.png", alt: "医師用: 診療音声のリアルタイム文字起こしとSOAP自動生成", kind: "screenshot" },
    ],
    slides: [
      { src: "/work/clinnote/slides/architecture.png", alt: "AWSアーキテクチャ（WebSocket音声=ECS Fargate / 通常API=App Runner / Transcribe / Bedrock / RDS）" },
      { src: "/work/clinnote/slides/tech-stack.png", alt: "技術スタックと主な担当箇所（バックエンド / インフラ / 認証）" },
      { src: "/work/clinnote/slides/soap-split.png", alt: "診療録(SOAP)の分割生成 — 1分ごとにBedrockで追記し、診療中に形成過程を可視化" },
      { src: "/work/clinnote/slides/speaker-id.png", alt: "話者識別の補正 — 医師の声紋をSpeechBrainで照合し、役割を再ラベリングしてからSOAP生成" },
    ],
    architecture:
      "WebSocket の音声ストリーミングは ECS Fargate、通常APIは App Runner に分離。RDS は Private Subnet に配置し EC2 Bastion 経由のみアクセス可能。音声認識に Amazon Transcribe、SOAP生成に Amazon Bedrock を採用し、AI機能を AWS マネージドサービスで構成。",
    links: [],
    confidential: true,
  },
  {
    slug: "ai-avatar-live2d",
    title: "AIアバター対話プロダクト (Live2D)",
    tagline:
      "会話の文脈に応じて、Live2Dアバターの表情をリアルタイムに切り替える対話体験",
    period: "2025/12 — 現在",
    team: "自社開発系ベンチャー / 新規プロダクト開発メンバー",
    roles: ["frontend", "backend"],
    domain: "AI / HR・マネジメント支援",
    track: "インターン",
    scale: "minor",
    metric: { value: "文脈 → 表情", label: "tool_useで感情をリアルタイム制御" },
    techStack: [
      "Next.js",
      "TypeScript",
      "Vercel AI SDK",
      "Claude API",
      "Live2D",
      "TTS",
      "WebSocket",
    ],
    summary:
      "トレーナーによるマネジメント支援サービスを、AIアバターによるリアルな対話体験へ進化させる新規プロダクトの開発メンバーとして参加。Vercel AI SDK と Live2D を組み合わせ、会話の文脈に応じてアバターの表情をリアルタイムに切り替える機能を実装した。",
    responsibilities: [
      "Claude API の tool_use (setEmotion) で会話文脈から表情を判定する仕組みを実装",
      "テキスト位置 × 表情を紐づけ、文ごとに TTS で音声合成 → Live2D アバターで表情切替 + リップシンク",
    ],
    achievements: [
      "悩みには共感の表情、挨拶・通常会話では笑顔、など文脈に応じた自然な表情表現を実現",
    ],
    cover: { src: "/work/avatar/smile.png", alt: "Live2Dアバター（対話デモ）", kind: "portrait" },
    slides: [
      { src: "/work/avatar/slides/overview.png", alt: "発話 → Claude API(tool_use: setEmotion) → TTS → Live2Dの表情切替 のシーケンスと表情例" },
    ],
    links: [],
    confidential: true,
  },
  {
    slug: "patent-rag-poc",
    title: "特許侵害予防調査 RAG (PoC)",
    tagline: "特許データを読み込み、3段階推論パイプラインで被覆有無を判定する",
    period: "2025/06 — 2025/09",
    team: "AIスタートアップ / PoC開発 ・ 担当: バックエンド",
    roles: ["backend"],
    domain: "リーガルテック / 特許",
    track: "インターン",
    scale: "minor",
    metric: { value: "3段階推論", label: "請求項ツリー化 → 用語定義 → 被覆判定" },
    techStack: ["Python", "LangChain", "Chroma", "Streamlit", "RAG"],
    summary:
      "大学OBが起業したAIスタートアップで、特許調査会社向け案件のデモ・PoC開発を担当。特許データ(Excel)を前処理してベクトルストアに格納し、調査テーマに類似する候補特許を検索、3段階推論パイプラインで被覆有無を判定する特許侵害予防調査RAGを開発した。",
    responsibilities: [
      "特許データ(Excel)の請求項・明細書を前処理し、Chroma Vector Store に格納",
      "調査テーマに類似する候補特許を上位 k 件検索",
      "3段階推論パイプライン (請求項ツリー化・未定義用語抽出 → 明細書から用語定義抽出 → 定義込みで被覆判定) を実装",
      "権利範囲・サマリー・回避策・リスク評価を Excel に出力",
    ],
    achievements: ["デモ開発と PoC 開発を担い、本開発につなげた"],
    images: [
      {
        src: "/work/patent/pipeline.png",
        alt: "入力データ → 前処理 → 検索基盤(Chroma) → 3段階の詳細解析 → Excel出力 のパイプライン",
        kind: "diagram",
      },
    ],
    archived: true,
    confidential: true,
  },
];

export const getProjectBySlug = (slug: string): Project | undefined =>
  projects.find((p) => p.slug === slug);
