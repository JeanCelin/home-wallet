import { z } from "zod";

export const transactionSchema = z.object({
  date: z.iso.date("Insira uma data válida. Ex: 2026-10-01").optional(),
  type: z.enum(["INCOME", "EXPENSE"]),
  name: z
    .string("Este campo aceita apenas textos")
    .optional(),
  amount: z
    .number("Use apenas números")
    .positive("Use apenas números positivos")
    .refine(
      (value) => Number.isInteger(value * 100),
      "O valor deve ter no máximo 2 casas decimais",
    ),
  categoryId: z.coerce
    .number("Adicione um número inteiro válido")
    .int("Use apenas números inteiros")
    .positive("Use apenas números positivos"),
});

export const transactionIdSchema = z.object({
  id: z.coerce
    .number("Adicione um número inteiro válido")
    .int("Use apenas números inteiros")
    .positive("Use apenas números positivos"),
});

export const transactionQuerySchema = z.object({
    type: z.enum(["INCOME", "EXPENSE"]).optional(),
  name: z.string().trim().min(1).optional(),
});

export type CreateTransactionData = z.infer<typeof transactionSchema>;
