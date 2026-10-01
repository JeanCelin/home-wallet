import { prisma } from "../lib/prisma";

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

export function findCategories() {
  return prisma.category.findMany();
}

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
