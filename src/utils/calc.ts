import type { Prisma } from "../generated/prisma/client";

export function sum(a: number, b: number) {
  return a + b;
}

export function sub(a: Prisma.Decimal, b: Prisma.Decimal) {
  return a.sub(b);
}
