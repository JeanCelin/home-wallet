import { prisma } from "../lib/prisma";
import type { CreateTransactionData } from "../schemas/transaction.schema";

export async function createTransaction(data: CreateTransactionData) {
  const transaction = await prisma.transaction.create({
    data: {
      date: data.date,
      type: data.type,
      amount: data.amount,
      name: data.name?? null,
      category: {
        connect: {
          id: data.categoryId,
        },
      },
    },
  });

  return transaction;
}

