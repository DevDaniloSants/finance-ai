"use client";

import { Pie, PieChart } from "recharts";

import { Card, CardContent } from "@/app/_components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/app/_components/ui/chart";
import { TransactionTypes } from "@prisma/client";
import { TransactionPercentagePerType } from "@/app/_data-access/transaction/types";
import PercentageItem from "./percentage-item";
import { PiggyBank, TrendingDown, TrendingUp } from "lucide-react";

interface TransactionsPieChartProps {
  depositsTotal: number;
  investmentsTotal: number;
  expensesTotal: number;
  typesPercentage: TransactionPercentagePerType;
}

const chartConfig = {
  [TransactionTypes.DEPOSIT]: {
    label: "Depósito R$",
    color: "#55B02E",
  },
  [TransactionTypes.EXPENSE]: {
    label: "Despesa R$",
    color: "#E93030",
  },
  [TransactionTypes.INVESTMENT]: {
    label: "Investimento R$",
    color: "#FFFF",
  },
} satisfies ChartConfig;

const TransactionsPieChart = ({
  depositsTotal,
  expensesTotal,
  investmentsTotal,
  typesPercentage,
}: TransactionsPieChartProps) => {
  const transactionsTotal = depositsTotal + expensesTotal + investmentsTotal;

  const chartData = [
    {
      type: TransactionTypes.DEPOSIT,
      amount: depositsTotal,
      fill: "#55B02E",
    },
    {
      type: TransactionTypes.EXPENSE,
      amount: expensesTotal,
      fill: "#E93030",
    },
    {
      type: TransactionTypes.INVESTMENT,
      amount: investmentsTotal,
      fill: "#FFFF",
    },
  ];

  return (
    <Card className="flex flex-col px-6 py-1">
      <CardContent className="flex-1">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={
                transactionsTotal > 0
                  ? chartData
                  : [{ type: "Sem transações -", amount: 1, fill: "#161518" }]
              }
              dataKey="amount"
              nameKey="type"
              innerRadius={80}
            />
          </PieChart>
        </ChartContainer>
        <div className="space-y-3">
          <PercentageItem
            icon={<TrendingUp className="text-primary" size={16} />}
            value={typesPercentage.DEPOSIT}
            title="Ganhos"
          />
          <PercentageItem
            icon={<TrendingDown className="text-danger" size={16} />}
            value={typesPercentage.EXPENSE}
            title="Gastos"
          />
          <PercentageItem
            icon={<PiggyBank size={16} />}
            value={typesPercentage.INVESTMENT}
            title="Investimentos"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default TransactionsPieChart;
