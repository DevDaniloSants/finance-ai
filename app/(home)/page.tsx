import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Navbar from "../_components/navbar";
import SummaryCards from "./_components/summary-cards";
import TimeSelect from "./_components/time-select";
import { isMatch } from "date-fns";
import { getTransactionsYears } from "../_data-access/transaction/get-transactions-years";

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

  const years = await getTransactionsYears();

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

  return (
    <>
      <Navbar />
      <div className="space-y-6 p-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <TimeSelect years={years} />
        </div>
        <div className="grid grid-cols-[2fr,1fr] space-x-6">
          <div>
            <SummaryCards month={month} year={year} />
          </div>
          <div>2</div>
        </div>
      </div>
    </>
  );
};

export default Home;
