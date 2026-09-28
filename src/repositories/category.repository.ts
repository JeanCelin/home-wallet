import { prisma } from "../lib/prisma";

export function createCategory(name: string) {
  return prisma.category.create({
    data: { name },
  });
}

export function findCategoryByName(name: string) {
  return prisma.category.findFirst({
    where: {
      name: name
    },
  });
}
