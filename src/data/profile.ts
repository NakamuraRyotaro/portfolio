export const profile = {
  name: "中村 遼太郎",
  nameEn: "Ryotaro Nakamura",
  title: "AI Application Engineer（2028卒 / 同志社大学院）",
  tagline:
    "AI × ヘルスケアを中心に、フロントエンドからインフラまで横断してプロダクトを開発しています。",
  email: "nakamura.ryotaro1121@gmail.com",
  // T字型ポジショニング（採用者目線エージェントの助言）
  positioning:
    "バックエンド / AWSインフラを軸に、フロント・AIまで横断。研究室とインターンで、実際に使われるプロダクトづくりを実践しながら学んでいます。",
  links: {
    github: "https://github.com/NakamuraRyotaro",
    x: "",
    linkedin: "",
  },
  // 「私について」スライド相当の基本情報
  facts: [
    { label: "出身地", value: "長野県" },
    { label: "大学", value: "同志社大学 生命医科学部" },
    { label: "大学院", value: "同志社大学大学院 (2026/4〜)" },
    { label: "研究室", value: "ティッシュエンジニアリング研究室" },
    { label: "GitHub", value: "NakamuraRyotaro" },
  ],
  summary: [
    "同志社大学 生命医科学部で医療と機械工学を横断的に学び、大学2年の秋に ChatGPT に触れて「AIが今後世界を変える」と確信。AIアプリケーションの開発を行う研究室に配属し、精神科領域のAIアプリ開発に従事している。",
    "研究室では、診察と診察の間にAIが問診で患者をフォローする精神科問診支援アプリと、診療音声から診療録(SOAP)を自動生成するアプリを、フロントエンド・バックエンド・インフラを横断して開発。Claude / Bedrock / Transcribe などの AI と AWS マネージドサービスを組み合わせた実運用に耐える構成を意識している。",
    "並行して、AIスタートアップでの特許侵害予防調査RAGのPoC開発、自社開発系ベンチャーでの AIアバター (Live2D) 対話プロダクト、ITコンサルでの kintone × AI 連携ソリューションなど、複数のインターンで実プロダクト開発を経験。",
  ],
  // 「経歴について」スライド相当のタイムライン
  timeline: [
    {
      date: "2022/04",
      title: "同志社大学 生命医科学部 入学",
      detail: "医療と機械工学を掛け合わせた分野を横断的に学ぶ。",
    },
    {
      date: "2025/04",
      title: "AIアプリの開発を行う研究室に配属",
      detail:
        "画像診断やチャットbotなどのアプリ開発を行う研究室に配属し、精神科領域のAIアプリケーション開発に従事。",
    },
    {
      date: "2025/05 — 09",
      title: "AIスタートアップ インターン",
      detail:
        "大学OBが起業したAIスタートアップで、特許調査会社案件のデモ・PoC開発を行い、本開発につなげた。",
      companies: [{ name: "ONIXION", url: "https://onixion.com/" }],
    },
    {
      date: "2025/12 —",
      title: "インターンを2社で開始",
      detail:
        "ITコンサル: kintone × AI の連携ソリューションの開発・提供。自社開発系ベンチャー: AI × Live2D (アバター) を組み合わせた新規プロダクトの開発メンバーとして活動。",
      companies: [
        { name: "EVeM", url: "https://www.evem-management.com/" },
        { name: "Novagrid", url: "https://www.novagrid.tech/company" },
      ],
    },
    {
      date: "2026/04",
      title: "同志社大学大学院 入学",
      detail:
        "精神科問診支援アプリ、リアルタイム文字起こし・診療録自動生成アプリの開発に継続して従事。",
    },
  ],
  skills: {
    languages: ["TypeScript", "Python", "JavaScript", "SQL"],
    frontend: ["React", "Next.js", "MUI", "LIFF", "Live2D"],
    backend: ["FastAPI", "SQLAlchemy", "WebSocket", "REST"],
    infra: [
      "AWS (App Runner, ECS Fargate, Lambda, EventBridge, RDS, Cognito, SES, SNS, S3, ECR, ALB)",
      "Docker",
      "GitHub Actions (CI/CD)",
      "SST / OpenNext",
    ],
    ai: [
      "Claude API",
      "LangChain",
      "Amazon Bedrock",
      "Amazon Transcribe",
      "Vercel AI SDK",
      "RAG (Chroma)",
      "SpeechBrain",
      "LLMアプリケーション設計",
    ],
  },
};

export type Profile = typeof profile;
