import {
  getDepositsTotal,
  getExpensesTotal,
  getInvestmentsTotal,
} from "@/app/_data-access/transaction/get-transactions-summary";
import SummaryCard from "./summary-card";
import {
  PiggyBankIcon,
  TrendingDown,
  TrendingUp,
  WalletIcon,
} from "lucide-react";

interface SummaryCardProps {
  month: string;
}

const SummaryCards = async ({ month }: SummaryCardProps) => {
  const depositsTotal = await getDepositsTotal({ month });
  const expensesTotal = await getExpensesTotal({ month });
  const investmentsTotal = await getInvestmentsTotal({ month });

  const balance = depositsTotal - expensesTotal - investmentsTotal;
  return (
    <div className="space-y-6">
      <SummaryCard
        icon={<WalletIcon size={16} />}
        amount={balance}
        title="Saldo"
        size="large"
      />
      <div className="grid grid-cols-3 gap-6">
        <SummaryCard
          transactionType="investment"
          icon={<PiggyBankIcon size={16} className="text-white" />}
          amount={investmentsTotal}
          title="Investido"
        />
        <SummaryCard
          transactionType="expense"
          icon={<TrendingUp size={16} className="text-primary" />}
          amount={expensesTotal}
          title="Receita"
        />
        <SummaryCard
          transactionType="deposit"
          icon={<TrendingDown size={16} className="text-danger" />}
          amount={depositsTotal}
          title="Despesa"
        />
      </div>
    </div>
  );
};

export default SummaryCards;
