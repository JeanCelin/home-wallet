import { Prisma } from "../generated/prisma/client";
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
  return;
}

export async function incomeAggregate() {
  const income = await prisma.transaction.aggregate({
    where: {
      type: "INCOME",
    },
    _sum: {
      amount: true,
    },
  });

  return income._sum.amount ?? new Prisma.Decimal(0);
}

export async function expenseAggregate() {
  const expense = await prisma.transaction.aggregate({
    where: {
      type: "EXPENSE",
    },
    _sum: {
      amount: true,
    },
  });

  return expense._sum.amount ?? new Prisma.Decimal(0);
}

export async function transactionSummary(){
  return prisma.transaction.groupBy({
    by: ["type"],
    _sum: {
      amount: true
    }
  })
}