import { DataTable } from "../_components/ui/data-table";
import { transactionsColumns } from "./_columns";
import AddTransactionButton from "../_components/add-transaction-button";
import Navbar from "../_components/navbar";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getTransactions } from "../_data-access/transaction/get-transactions";

const TransactionsPage = async () => {
  const { userId } = await auth();
  if (!userId) {
    redirect("/login");
  }

  const transactions = await getTransactions();

  return (
    <>
      <Navbar />
      <div className="space-y-6 p-6">
        <div className="flex w-full items-center justify-between">
          <h1 className="text-3xl font-bold">Transações</h1>
          <AddTransactionButton />
        </div>
        <DataTable columns={transactionsColumns} data={transactions} />
      </div>
    </>
  );
};

export default TransactionsPage;
