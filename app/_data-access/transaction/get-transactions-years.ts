import { db } from "@/app/_lib/prisma";
import { auth } from "@clerk/nextjs/server";

import "server-only";

export const getTransactionsYears = async () => {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const transactions = await db.transaction.findMany({
    where: {
      userId,
    },
    select: {
      date: true,
    },
  });

  const years = Array.from(
    new Set(
      transactions.map((transaction) =>
        new Date(transaction.date).getFullYear(),
      ),
    ),
  );

  years.sort((a, b) => a - b);

  return years;
};
