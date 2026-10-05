import type { TransactionType } from "../generated/prisma/enums";


export type TransactionFilters  = {
  type?: TransactionType | undefined,
  name?: string | undefined
}