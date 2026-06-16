"use server";

import { randomUUID } from "node:crypto";
import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";
import {
  contactSchema,
  type ContactInput,
  type ContactState,
} from "@/lib/contact";

const region = process.env.AWS_REGION ?? "ap-northeast-1";

const ses = new SESClient({ region });
const ddb = DynamoDBDocumentClient.from(new DynamoDBClient({ region }));

export async function submitContact(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const raw: ContactInput = {
    name: String(formData.get("name") ?? ""),
    email: String(formData.get("email") ?? ""),
    company: String(formData.get("company") ?? "") || undefined,
    message: String(formData.get("message") ?? ""),
  };

  const parsed = contactSchema.safeParse(raw);
  if (!parsed.success) {
    const fieldErrors: Partial<Record<keyof ContactInput, string>> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as keyof ContactInput | undefined;
      if (key && !fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return {
      status: "error",
      message: "入力内容をご確認ください。",
      fieldErrors,
    };
  }

  const data = parsed.data;
  const id = randomUUID();
  const createdAt = new Date().toISOString();

  try {
    if (process.env.CONTACT_TABLE_NAME) {
      await ddb.send(
        new PutCommand({
          TableName: process.env.CONTACT_TABLE_NAME,
          Item: {
            id,
            createdAt,
            name: data.name,
            email: data.email,
            company: data.company ?? "",
            message: data.message,
          },
        }),
      );
    }

    const from = process.env.CONTACT_FROM_EMAIL;
    const to = process.env.CONTACT_TO_EMAIL;
    if (from && to) {
      await ses.send(
        new SendEmailCommand({
          Source: from,
          Destination: { ToAddresses: [to] },
          ReplyToAddresses: [data.email],
          Message: {
            Subject: {
              Data: `[Portfolio] お問い合わせ: ${data.name}`,
              Charset: "UTF-8",
            },
            Body: {
              Text: {
                Charset: "UTF-8",
                Data: [
                  `ID: ${id}`,
                  `日時: ${createdAt}`,
                  `お名前: ${data.name}`,
                  `Email: ${data.email}`,
                  `会社: ${data.company ?? "-"}`,
                  "",
                  "----- 本文 -----",
                  data.message,
                ].join("\n"),
              },
            },
          },
        }),
      );
    }
  } catch (err) {
    console.error("[contact] failed:", err);
    return {
      status: "error",
      message: "送信に失敗しました。時間をおいて再度お試しください。",
    };
  }

  return {
    status: "ok",
    message: "送信ありがとうございました。確認次第ご返信いたします。",
  };
}
