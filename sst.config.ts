/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "portfolio",
      removal: input?.stage === "prod" ? "retain" : "remove",
      home: "aws",
      providers: {
        aws: {
          region: "ap-northeast-1",
        },
      },
    };
  },
  async run() {
    // お問い合わせ履歴を保存するDynamoDB
    const contactTable = new sst.aws.Dynamo("ContactTable", {
      fields: {
        id: "string",
        createdAt: "string",
      },
      primaryIndex: { hashKey: "id" },
      globalIndexes: {
        ByCreatedAt: { hashKey: "createdAt" },
      },
    });

    // 送信元/送信先メール (SESで verify 済みのアドレスを設定する)
    // TODO: 自分のドメイン or アドレスを SES verify した上で値を入れる
    const fromEmail = new sst.Secret("ContactFromEmail");
    const toEmail = new sst.Secret("ContactToEmail");

    const site = new sst.aws.Nextjs("Web", {
      link: [contactTable, fromEmail, toEmail],
      environment: {
        CONTACT_TABLE_NAME: contactTable.name,
        CONTACT_FROM_EMAIL: fromEmail.value,
        CONTACT_TO_EMAIL: toEmail.value,
      },
      permissions: [
        {
          actions: ["ses:SendEmail", "ses:SendRawEmail"],
          resources: ["*"],
        },
      ],
      // Route53で管理しているドメイン (register-domain で取得済み)
      domain: {
        name: "ryotaro-nakamura.com",
      },
    });

    return {
      url: site.url,
      contactTable: contactTable.name,
    };
  },
});
