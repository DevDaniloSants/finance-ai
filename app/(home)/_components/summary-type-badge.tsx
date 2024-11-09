import { Badge } from "@/app/_components/ui/badge";
import { ReactNode } from "react";

interface SummaryTypeBadgeProps {
  transactionType?: string;
  children: ReactNode;
}

const SummaryTypeBadge = ({
  transactionType,
  children,
}: SummaryTypeBadgeProps) => {
  if (transactionType === "deposit") {
    return (
      <Badge className="rounded-[8px] bg-danger bg-opacity-10 p-2 hover:bg-danger hover:bg-opacity-10">
        {children}
      </Badge>
    );
  }
  if (transactionType === "expense") {
    return (
      <Badge className="rounded-[8px] bg-muted p-2 hover:bg-muted">
        {children}
      </Badge>
    );
  }
  if (transactionType === "investment") {
    return (
      <Badge className="rounded-[8px] bg-white bg-opacity-15 p-2 hover:bg-white hover:bg-opacity-15">
        {children}
      </Badge>
    );
  }

  return (
    <Badge className="rounded-[8px] bg-slate-950 p-[10px] hover:bg-black">
      {children}
    </Badge>
  );
};

export default SummaryTypeBadge;
