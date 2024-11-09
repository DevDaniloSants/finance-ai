import { db } from "@/app/_lib/prisma";

import "server-only";

export const getTransactionsYears = async () => {
  const transactions = await db.transaction.findMany({
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
