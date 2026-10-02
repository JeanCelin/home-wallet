import { z } from "zod";

export const categorySchema = z.object({
  name: z
    .string("O nome da categoria deve ser um texto")
    .min(1, "O nome da categoria não pode estar vazio"),
});

export const categoryIdSchema = z.object({
  id: z.coerce.number("Adicione um número inteiro válido").int("Use apenas números inteiros").positive("Use apenas números positivos")
})