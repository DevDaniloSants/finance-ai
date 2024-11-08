"use server";

import { db } from "@/app/_lib/prisma";
import { auth } from "@clerk/nextjs/server";
import {
  TransactionCategory,
  TransactionPaymentMethod,
  TransactionTypes,
} from "@prisma/client";

import { revalidatePath } from "next/cache";
import { upsertTransactionSchema } from "./schema";

interface UpsertTransactionParams {
  id?: string;
  name: string;
  amount: number;
  category: TransactionCategory;
  date: Date;
  paymentMethod: TransactionPaymentMethod;
  type: TransactionTypes;
}

export const upsertTransaction = async (params: UpsertTransactionParams) => {
  upsertTransactionSchema.parse(params);

  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  await db.transaction.upsert({
    update: {
      ...params,
      userId,
    },
    create: {
      ...params,
      userId,
    },
    where: {
      id: params?.id ?? "",
    },
  });
  revalidatePath("/transactions");
};
