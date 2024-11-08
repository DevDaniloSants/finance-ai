import {
  TransactionCategory,
  TransactionPaymentMethod,
  TransactionTypes,
} from "@prisma/client";
import { z } from "zod";

export const upsertTransactionSchema = z.object({
  name: z.string().trim().min(1),
  amount: z.number().min(1),
  type: z.nativeEnum(TransactionTypes),
  paymentMethod: z.nativeEnum(TransactionPaymentMethod),
  category: z.nativeEnum(TransactionCategory),
  date: z.date(),
});
