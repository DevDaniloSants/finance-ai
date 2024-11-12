import { CardContent, CardHeader } from "@/app/_components/ui/card";
import { Progress } from "@/app/_components/ui/progress";
import { ScrollArea } from "@/app/_components/ui/scroll-area";
import { TRANSACTION_CATEGORY_LABELS } from "@/app/_constants/transaction";
import { TotalExpensesPerCategory } from "@/app/_data-access/transaction/types";

interface ExpensesPerCategoryProps {
  totalExpensesPerCategory: TotalExpensesPerCategory[];
}

const ExpensesPerCategory = ({
  totalExpensesPerCategory,
}: ExpensesPerCategoryProps) => {
  return (
    <ScrollArea className="col-span-2 h-full rounded-md border pb-6">
      <CardHeader className="space-y-6">
        <p className="text-lg font-bold">Gastos por categoria</p>
        <hr className="border-white border-opacity-5" />
      </CardHeader>
      <CardContent className="space-y-3">
        {totalExpensesPerCategory.map((item, i) => (
          <div key={`${item.category}-${i}`} className="flex flex-col gap-2">
            <div className="flex w-full items-center justify-between">
              <p className="text-sm font-semibold">
                {TRANSACTION_CATEGORY_LABELS[item.category]}
              </p>
              <p className="text-sm">{item.percentageOfTotal}%</p>
            </div>
            <Progress value={item.percentageOfTotal} />
            <p className="text-xs text-muted-foreground">
              {Intl.NumberFormat("pt-Br", {
                style: "currency",
                currency: "BRL",
              }).format(item.totalAmount)}
            </p>
          </div>
        ))}
      </CardContent>
    </ScrollArea>
  );
};

export default ExpensesPerCategory;
