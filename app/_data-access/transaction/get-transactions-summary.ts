import "server-only";

import { db } from "@/app/_lib/prisma";

export const getDepositsTotal = async ({ month }: { month: string }) => {
  return Number(
    (
      await db.transaction.aggregate({
        where: {
          date: {
            gte: new Date(`2024-${month}-01`),
            lte: new Date(`2024-${month}-31`),
          },
          type: "DEPOSIT",
        },
        _sum: {
          amount: true,
        },
      })
    )?._sum?.amount ?? 0,
  );
};
export const getExpensesTotal = async ({ month }: { month: string }) => {
  return Number(
    (
      await db.transaction.aggregate({
        where: {
          date: {
            gte: new Date(`2024-${month}-01`),
            lte: new Date(`2024-${month}-31`),
          },
          type: "EXPENSE",
        },
        _sum: {
          amount: true,
        },
      })
    )?._sum?.amount ?? 0,
  );
};
export const getInvestmentsTotal = async ({ month }: { month: string }) => {
  return Number(
    (
      await db.transaction.aggregate({
        where: {
          date: {
            gte: new Date(`2024-${month}-01`),
            lte: new Date(`2024-${month}-31`),
          },
          type: "INVESTMENT",
        },
        _sum: {
          amount: true,
        },
      })
    )?._sum?.amount ?? 0,
  );
};
