import type { Metadata } from "next";
import { Inter, Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { profile } from "@/data/profile";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const notoJp = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-noto-jp",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ryotaro-nakamura.com"),
  title: `${profile.nameEn} — ${profile.role}`,
  description:
    "中村 遼太郎のポートフォリオ。フロントエンドからAWSインフラ、AIまで横断し、実際に使われるプロダクトづくりを学んでいる学生エンジニア。",
  openGraph: {
    title: `${profile.nameEn} — ${profile.role}`,
    description:
      "AI × ヘルスケアを中心に、フロントからインフラまで横断してプロダクトを作る新卒エンジニアのポートフォリオ。",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" className={`dark ${inter.variable} ${notoJp.variable}`}>
      <body className="min-h-screen bg-neutral-950 font-sans text-neutral-50 antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
