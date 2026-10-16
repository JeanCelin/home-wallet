import { prisma } from "../lib/prisma";

export async function createMarket(name: string) {
  return await prisma.market.create({
    data: {
      name,
    },
  });
}

export async function deleteMarket(id: number) {
  return await prisma.market.delete({
    where: {
      id,
    },
  });
}

export async function updateMarket(id: number, name: string) {
  return await prisma.market.update({
    where: {
      id,
    },
    data: {
      name,
    },
  });
}

export async function getMarket(id: number) {
  return await prisma.market.findUnique({
    where: { id },
  });
}
