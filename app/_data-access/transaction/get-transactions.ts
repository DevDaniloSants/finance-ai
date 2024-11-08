import "server-only";

import { db } from "@/app/_lib/prisma";
import { auth } from "@clerk/nextjs/server";

export const getTransactions = async () => {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const transactions = await db.transaction.findMany({
    where: {
      userId: userId,
    },
  });

  return transactions;
};
