import { db } from "@/app/_lib/prisma";
import { Transaction, TransactionTypes } from "@prisma/client";
import {
  TotalExpensesPerCategory,
  TransactionPercentagePerType,
} from "./types";
import { auth } from "@clerk/nextjs/server";

interface GetTransactionsSummaryProps {
  month: string;
  year: string;
}

export const getDashboard = async ({
  month,
  year,
}: GetTransactionsSummaryProps) => {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }

  const where = {
    userId,
    date: {
      gte: new Date(`${year}-${month}-01`),
      lte: new Date(`${year}-${month}-31`),
    },
  };

  const depositsTotal = Number(
    (
      await db.transaction.aggregate({
        where: {
          ...where,
          type: "DEPOSIT",
        },
        _sum: {
          amount: true,
        },
      })
    )?._sum?.amount ?? 0,
  );

  const expensesTotal = Number(
    (
      await db.transaction.aggregate({
        where: {
          ...where,
          type: "EXPENSE",
        },
        _sum: {
          amount: true,
        },
      })
    )?._sum?.amount ?? 0,
  );

  const investmentsTotal = Number(
    (
      await db.transaction.aggregate({
        where: {
          ...where,
          type: "INVESTMENT",
        },
        _sum: {
          amount: true,
        },
      })
    )?._sum?.amount ?? 0,
  );

  const balance = depositsTotal - expensesTotal - investmentsTotal;

  const transactionsTotal = Number(
    (
      await db.transaction.aggregate({
        where: where,
        _sum: { amount: true },
      })
    )._sum?.amount,
  );

  const typesPercentage: TransactionPercentagePerType = {
    [TransactionTypes.EXPENSE]:
      transactionsTotal > 0
        ? Math.round((Number(expensesTotal || 0) / transactionsTotal) * 100)
        : 0,
    [TransactionTypes.DEPOSIT]:
      transactionsTotal > 0
        ? Math.round((Number(depositsTotal || 0) / transactionsTotal) * 100)
        : 0,
    [TransactionTypes.INVESTMENT]:
      transactionsTotal > 0
        ? Math.round((Number(investmentsTotal || 0) / transactionsTotal) * 100)
        : 0,
  };

  const totalExpensesPerCategory: TotalExpensesPerCategory[] = (
    await db.transaction.groupBy({
      by: ["category"],
      where: {
        ...where,
        type: TransactionTypes.EXPENSE,
      },
      _sum: {
        amount: true,
      },
    })
  ).map((item) => {
    const totalAmount = Number(item._sum.amount) || 0;
    const category = item.category;
    const categoryPercentage = Math.round(
      (totalAmount / Number(expensesTotal)) * 100,
    );

    return {
      category,
      totalAmount,
      percentageOfTotal: categoryPercentage,
    };
  });

  const lastTransactions: Transaction[] = await db.transaction.findMany({
    where,
    orderBy: {
      date: "desc",
    },
    take: 10,
  });

  return {
    depositsTotal,
    expensesTotal,
    investmentsTotal,
    balance,
    typesPercentage,
    totalExpensesPerCategory,
    lastTransactions,
  };
};
