import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Navbar from "../_components/navbar";
import SummaryCards from "./_components/summary-cards";
import TimeSelect from "./_components/time-select";
import { isMatch } from "date-fns";

import { getDashboard } from "../_data-access/transaction/get-dashboard";
import TransactionsPieChart from "./_components/transactions-pie-chart";
import { getTransactionsYears } from "../_data-access/transaction/get-transactions-years";
import ExpensesPerCategory from "./_components/expenses-per-category";
import LastTransactions from "./_components/last-transactions";
import { canUserAddTransaction } from "../_data-access/transaction/can-user-add-transaction";
import AiReportButton from "./_components/ai-report-button";

interface HomeProps {
  searchParams: {
    month: string;
    year: string;
  };
}

const Home = async ({ searchParams: { month, year } }: HomeProps) => {
  const { userId } = await auth();
  if (!userId) {
    redirect("/login");
  }

  const monthIsInvalid = !month || !isMatch(month, "MM");
  const yearIsInvalid = !year || !isMatch(year, "yyyy");

  if (monthIsInvalid || yearIsInvalid) {
    if (monthIsInvalid && !yearIsInvalid) {
      redirect(`?month=${new Date().getMonth() + 1}&year=${year}`);
    }
    if (yearIsInvalid && !monthIsInvalid) {
      redirect(`?month=${month}&year=${new Date().getFullYear()}`);
    }
    redirect(
      `?month=${new Date().getMonth() + 1}&year=${new Date().getFullYear()}`,
    );
  }

  const dashboard = await getDashboard({ month, year });
  const years = await getTransactionsYears();
  const userCanAddTransaction = await canUserAddTransaction();

  return (
    <>
      <Navbar />
      <div className="flex flex-col space-y-6 overflow-hidden p-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <div className="flex items-center gap-2">
            <AiReportButton month={month} year={year} />
            <TimeSelect years={years} />
          </div>
        </div>
        <div className="grid grid-cols-[2fr,1fr] gap-10 overflow-hidden">
          <div className="flex flex-col gap-6 overflow-hidden">
            <SummaryCards
              {...dashboard}
              userCanAddTransaction={userCanAddTransaction}
            />
            <div className="grid h-dvh grid-cols-3 grid-rows-1 gap-6 overflow-hidden">
              <TransactionsPieChart {...dashboard} />
              <ExpensesPerCategory
                totalExpensesPerCategory={dashboard.totalExpensesPerCategory}
              />
            </div>
          </div>

          <LastTransactions lastTransactions={dashboard.lastTransactions} />
        </div>
      </div>
    </>
  );
};

export default Home;
