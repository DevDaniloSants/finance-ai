import { Card, CardContent, CardHeader } from "@/app/_components/ui/card";

import { ReactNode } from "react";
import SummaryTypeBadge from "./summary-type-badge";
import AddTransactionButton from "@/app/_components/add-transaction-button";

interface SummaryCardProps {
  icon: ReactNode;
  title: string;
  amount: number;
  size?: "small" | "large";
  transactionType?: string;
}

const SummaryCard = ({
  icon,
  title,
  amount,
  transactionType,
  size = "small",
}: SummaryCardProps) => {
  return (
    <Card className={`${size === "large" ? "bg-white bg-opacity-5" : ""}`}>
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
          {Intl.NumberFormat("pt-Br", {
            style: "currency",
            currency: "BRL",
          }).format(amount)}
        </p>
        {size === "large" && <AddTransactionButton />}
      </CardContent>
    </Card>
  );
};

export default SummaryCard;
