import { Button } from "@/app/_components/ui/button";
import { CardContent, CardHeader, CardTitle } from "@/app/_components/ui/card";
import { ScrollArea } from "@/app/_components/ui/scroll-area";
import { TRANSACTION_PAYMENT_METHOD_ICONS } from "@/app/_constants/transaction";
import { formatCurrency } from "@/app/_utils/currency";
import { Transaction, TransactionTypes } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

interface LastTransactionsProps {
  lastTransactions: Transaction[];
}

const LastTransactions = ({ lastTransactions }: LastTransactionsProps) => {
  const getAmountColor = (transaction: Transaction) => {
    if (transaction.type === TransactionTypes.EXPENSE) {
      return "text-red-500";
    }
    if (transaction.type === TransactionTypes.DEPOSIT) {
      return "text-primary";
    }
    return "text-white";
  };
  const getAmountPrefix = (transaction: Transaction) => {
    if (
      transaction.type === TransactionTypes.EXPENSE ||
      transaction.type === TransactionTypes.INVESTMENT
    ) {
      return "-";
    }
    return "+";
  };

  return (
    <ScrollArea className="h-full rounded-2xl border pb-6">
      <CardHeader className="space-y-6">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Últimas Transções</CardTitle>
          <Button variant="outline" className="rounded-full" asChild>
            <Link href="/transactions">Ver mais</Link>
          </Button>
        </div>
        <hr className="border-white border-opacity-5" />
      </CardHeader>
      <CardContent className="space-y-6">
        {lastTransactions.map((transaction) => (
          <div
            className="flex items-center justify-between"
            key={transaction.id}
          >
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-white bg-opacity-[3%] p-2">
                <Image
                  src={
                    TRANSACTION_PAYMENT_METHOD_ICONS[transaction.paymentMethod]
                  }
                  alt={transaction.paymentMethod}
                  width={20}
                  height={20}
                />
              </div>
              <div>
                <p className="text-sm">{transaction.name}</p>
                <p className="text-sm text-muted-foreground">
                  {new Date(transaction.date).toLocaleString("pt-Br", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>
            <p className={`text-sm font-bold ${getAmountColor(transaction)}`}>
              {getAmountPrefix(transaction)}
              {formatCurrency(Number(transaction.amount))}
            </p>
          </div>
        ))}
      </CardContent>
    </ScrollArea>
  );
};

export default LastTransactions;
