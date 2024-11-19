import SummaryCard from "./summary-card";
import {
  PiggyBankIcon,
  TrendingDown,
  TrendingUp,
  WalletIcon,
} from "lucide-react";

interface SummaryCardProps {
  depositsTotal: number;
  expensesTotal: number;
  investmentsTotal: number;
  balance: number;
  userCanAddTransaction: boolean;
}

const SummaryCards = async ({
  depositsTotal,
  expensesTotal,
  investmentsTotal,
  balance,
  userCanAddTransaction,
}: SummaryCardProps) => {
  return (
    <div className="space-y-6">
      <SummaryCard
        icon={<WalletIcon size={16} />}
        amount={balance}
        title="Saldo"
        size="large"
        userCanAddTransaction={userCanAddTransaction}
      />
      <div className="grid grid-cols-3 gap-6">
        <SummaryCard
          transactionType="INVESTMENT"
          icon={<PiggyBankIcon size={16} className="text-white" />}
          amount={investmentsTotal}
          title="Investido"
        />
        <SummaryCard
          transactionType="EXPENSE"
          icon={<TrendingUp size={16} className="text-primary" />}
          amount={depositsTotal}
          title="Receita"
        />
        <SummaryCard
          transactionType="DEPOSIT"
          icon={<TrendingDown size={16} className="text-danger" />}
          amount={expensesTotal}
          title="Despesa"
        />
      </div>
    </div>
  );
};

export default SummaryCards;
