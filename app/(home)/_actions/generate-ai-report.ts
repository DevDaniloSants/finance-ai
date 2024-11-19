"use server";

import { auth, clerkClient } from "@clerk/nextjs/server";
import { generateAiReportSchema, GenerateAiReportSchema } from "./schema";
import { db } from "@/app/_lib/prisma";
import OpenAi from "openai";

export const generateAiReport = async ({
  month,
  year,
}: GenerateAiReportSchema) => {
  generateAiReportSchema.parse({ month, year });

  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = (await clerkClient()).users.getUser(userId);
  const hasPremiumPlan =
    (await user).publicMetadata.subscriptionPlan === "premium";
  if (!hasPremiumPlan)
    throw new Error("You need a premium plan to generate AI reports");

  const openAI = new OpenAi({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const transactions = await db.transaction.findMany({
    where: {
      userId,
      date: {
        gte: new Date(`${year}-${month}-01`),
        lte: new Date(`${year}-${month}-31`),
      },
    },
  });

  const content = `Gere um relatório com insights sobre as minhas finanças, com dicas e orientações de como melhorar minha vida financeira. As transações estão divididas por ponto e vírgula.Transações do tipo INVESTIMENT também são consideradas despesas na hora de calcular o saldo final. A estrutura de cada uma é {DATA}-{TIPO}-{VALOR}-{CATEGORIA}. São elas:
  ${transactions
    .map(
      (transaction) =>
        `${transaction.date.toLocaleDateString("pt-BR")}-R$${transaction.amount}-${transaction.type}-${transaction.category}`,
    )
    .join(";")}`;

  const completion = await openAI.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content:
          "Você é um especialista em gestão e organização de finanças pessoais. Você ajuda as pessoas a organizarem melhor as suas finanças.",
      },
      {
        role: "user",
        content,
      },
    ],
  });

  return completion.choices[0].message.content;
};
