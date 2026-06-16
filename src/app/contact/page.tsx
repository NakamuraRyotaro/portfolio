import ContactForm from "@/components/ContactForm";
import { profile } from "@/data/profile";
import { BackgroundBeams } from "@/components/ui/background-beams";
import Reveal from "@/components/ui/reveal";

export const metadata = {
  title: "Contact — Ryotaro Nakamura",
  description: "カジュアル面談・インターン・選考のお問い合わせ。",
};

export default function ContactPage() {
  return (
    <div className="relative min-h-[80vh] overflow-hidden">
      <BackgroundBeams />
      <div className="relative mx-auto max-w-xl px-6 py-24">
        <Reveal>
          <p className="text-center text-sm font-medium uppercase tracking-widest text-emerald-300">
            Contact
          </p>
          <h1 className="mt-3 text-center text-4xl font-bold tracking-tight md:text-5xl">
            お問い合わせ
          </h1>
          <p className="mx-auto mt-4 max-w-md text-center text-sm leading-relaxed text-neutral-400">
            カジュアル面談やインターン、選考のご連絡など、いつでも歓迎です。下記フォーム、または
            <a
              href={`mailto:${profile.email}`}
              className="text-emerald-400 underline-offset-4 hover:underline"
            >
              {" "}
              {profile.email}
            </a>{" "}
            までご連絡ください。
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-10">
          <div className="rounded-2xl border border-neutral-800 bg-neutral-900/50 p-6 backdrop-blur-sm md:p-8">
            <ContactForm />
          </div>
        </Reveal>
      </div>
    </div>
  );
}
