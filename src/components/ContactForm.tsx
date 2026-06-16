"use client";

import { useActionState } from "react";
import { submitContact } from "@/app/contact/actions";
import type { ContactState } from "@/lib/contact";

const initial: ContactState = { status: "idle" };

const inputCls =
  "w-full rounded-xl border border-neutral-800 bg-neutral-950/60 px-4 py-3 text-sm text-neutral-100 placeholder:text-neutral-600 outline-none transition-colors focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/30 disabled:opacity-50";

export default function ContactForm() {
  const [state, action, pending] = useActionState(submitContact, initial);
  const fieldErrors = state.status === "error" ? state.fieldErrors : undefined;

  return (
    <form action={action} noValidate className="space-y-5">
      {state.status === "ok" && (
        <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">
          {state.message}
        </div>
      )}
      {state.status === "error" && (
        <div className="rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
          {state.message}
        </div>
      )}

      <Field label="お名前" name="name" required error={fieldErrors?.name}>
        <input className={inputCls} name="name" required disabled={pending} placeholder="山田 太郎" />
      </Field>

      <Field label="メールアドレス" name="email" required error={fieldErrors?.email}>
        <input
          className={inputCls}
          name="email"
          type="email"
          required
          disabled={pending}
          placeholder="you@example.com"
        />
      </Field>

      <Field label="会社・所属（任意）" name="company" error={fieldErrors?.company}>
        <input className={inputCls} name="company" disabled={pending} placeholder="株式会社〇〇" />
      </Field>

      <Field
        label="本文"
        name="message"
        required
        error={fieldErrors?.message}
        hint="10文字以上、4000文字以内で入力してください"
      >
        <textarea
          className={inputCls + " min-h-[150px] resize-y"}
          name="message"
          required
          disabled={pending}
          placeholder="ご用件をご記入ください。"
        />
      </Field>

      <button
        type="submit"
        disabled={pending}
        className="group relative inline-flex w-full justify-center overflow-hidden rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400 p-px font-semibold transition-shadow hover:shadow-[0_0_30px_-5px_rgba(16,185,129,0.6)] disabled:opacity-60"
      >
        <span className="w-full rounded-full bg-neutral-950 px-6 py-3 text-sm text-neutral-50 transition-colors group-hover:bg-transparent group-hover:text-neutral-950">
          {pending ? "送信中…" : "送信する"}
        </span>
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  required,
  error,
  hint,
  children,
}: {
  label: string;
  name: string;
  required?: boolean;
  error?: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm font-medium text-neutral-300">
        {label}
        {required && <span className="ml-1 text-emerald-400">*</span>}
      </label>
      {children}
      {error ? (
        <p className="mt-1.5 text-xs text-rose-300">{error}</p>
      ) : hint ? (
        <p className="mt-1.5 text-xs text-neutral-500">{hint}</p>
      ) : null}
    </div>
  );
}
