import { prisma } from "../lib/prisma";
import type { CreateTransactionData } from "../schemas/transaction.schema";

export async function createTransaction(data: CreateTransactionData) {
  const transaction = await prisma.transaction.create({
    data: {
      date: data.date,
      type: data.type,
      amount: data.amount,
      name: data.name ?? null,
      category: {
        connect: {
          id: data.categoryId,
        },
      },
    },
  });

  return transaction;
}

export async function updateTransaction(
  id: number,
  data: CreateTransactionData,
) {
  const transaction = await prisma.transaction.update({
    where: { id },
    data: {
      date: data.date,
      type: data.type,
      amount: data.amount,
      name: data.name ?? null,
      category: {
        connect: {
          id: data.categoryId,
        },
      },
    },
  });

  return transaction;
}

export async function findAllTransactions() {
  return await prisma.transaction.findMany();
}

export async function findTransactionById(id: number) {
  return await prisma.transaction.findUnique({
    where: { id },
  });
}

export async function deleteTransactionById(id: number) {
  await prisma.transaction.delete({ where: { id } });
  return
}
