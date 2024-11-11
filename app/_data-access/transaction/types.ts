import { TransactionTypes } from "@prisma/client";

export type TransactionPercentagePerType = {
  [key in TransactionTypes]: number;
};
