import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(1, "お名前を入力してください").max(100),
  email: z.string().trim().email("メールアドレスの形式が正しくありません").max(200),
  company: z.string().trim().max(200).optional(),
  message: z
    .string()
    .trim()
    .min(10, "本文は10文字以上で入力してください")
    .max(4000, "本文は4000文字以内で入力してください"),
});

export type ContactInput = z.infer<typeof contactSchema>;

export type ContactState =
  | { status: "idle" }
  | { status: "ok"; message: string }
  | { status: "error"; message: string; fieldErrors?: Partial<Record<keyof ContactInput, string>> };
