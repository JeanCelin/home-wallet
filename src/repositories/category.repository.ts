import { prisma } from "../lib/prisma";
import type { CategoryFilters } from "../types/category-filters";

export function createCategory(name: string) {
  return prisma.category.create({
    data: { name },
  });
}

export function findCategoryById(id: number) {
  return prisma.category.findFirst({
    where: {
      id: id,
    },
  });
}

export function findCategories(filters: CategoryFilters) {
  return prisma.category.findMany({
    where:{
      ...(filters.name?.length && {
        OR: filters.name.map((name)=>({
          name:{
            contains: name,
            mode: "insensitive"
          }
        }))
      })
    }
  })}

export function findCategoryByName(name: string) {
  return prisma.category.findFirst({
    where: {
      name: name,
    },
  });
}

export function updateCategoryById(id: number, name: string) {
  return prisma.category.update({
    where: { id: id },
    data: {
      name: name,
    },
  });
}

export function deleteCategory(id: number) {
  return prisma.category.delete({
    where: { id },
  });
}

export function hasTransactions(id: number) {
  return prisma.transaction.count({
    where: {
      categoryId: id,
    },
  });
}
