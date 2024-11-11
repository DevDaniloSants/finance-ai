import { Badge } from "@/app/_components/ui/badge";
import { TransactionTypes } from "@prisma/client";
import { ReactNode } from "react";

interface SummaryTypeBadgeProps {
  transactionType?: TransactionTypes;
  children: ReactNode;
}

const SummaryTypeBadge = ({
  transactionType,
  children,
}: SummaryTypeBadgeProps) => {
  const getTypeBadge = () => {
    if (transactionType === TransactionTypes.DEPOSIT) {
      return " bg-danger bg-opacity-10  hover:bg-danger hover:bg-opacity-10";
    }

    if (transactionType === TransactionTypes.EXPENSE) {
      return "bg-muted hover:bg-muted";
    }

    if (transactionType === TransactionTypes.INVESTMENT) {
      return " bg-white bg-opacity-15 hover:bg-white hover:bg-opacity-15";
    }

    return "bg-black hover:bg-black ";
  };

  return (
    <Badge className={`${getTypeBadge()} rounded-[8px] p-2`}>{children}</Badge>
  );
};

export default SummaryTypeBadge;
