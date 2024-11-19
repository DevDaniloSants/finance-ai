"use client";

import { Card, CardContent, CardHeader } from "@/app/_components/ui/card";

import { ReactNode } from "react";
import SummaryTypeBadge from "./summary-type-badge";
import AddTransactionButton from "@/app/_components/add-transaction-button";
import { TransactionTypes } from "@prisma/client";
import CountUp from "react-countup";

interface SummaryCardProps {
  icon: ReactNode;
  title: string;
  amount: number;
  size?: "small" | "large";
  transactionType?: TransactionTypes;
  userCanAddTransaction?: boolean;
}

const SummaryCard = ({
  icon,
  title,
  amount,
  transactionType,
  size = "small",
  userCanAddTransaction,
}: SummaryCardProps) => {
  return (
    <Card
      className={`${size === "large" ? "bg-white bg-opacity-5" : "transition-colors duration-700 hover:bg-white hover:bg-opacity-5"}`}
    >
      <CardHeader className="flex-row gap-2">
        <SummaryTypeBadge transactionType={transactionType}>
          {icon}
        </SummaryTypeBadge>

        <p
          className={`text-sm ${size === "large" ? "text-white text-opacity-70" : "text-muted-foreground"}`}
        >
          {title}
        </p>
      </CardHeader>
      <CardContent className="flex justify-between">
        <p
          className={`font-bold ${size === "large" ? "text-4xl text-white" : "text-2xl"}`}
        >
          <CountUp
            start={0}
            end={amount}
            duration={2}
            useEasing={true}
            decimals={2}
            formattingFn={(value) =>
              Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(value)
            }
          />
        </p>

        {size === "large" && (
          <AddTransactionButton userCanAddTransaction={userCanAddTransaction} />
        )}
      </CardContent>
    </Card>
  );
};

export default SummaryCard;
