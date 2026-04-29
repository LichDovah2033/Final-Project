import prisma from "../lib/prisma.js";

export async function getAllArmors() {
  return prisma.armor.findMany();
}

export async function getArmorById(id) {
  return prisma.armor.findUnique({ where: { id } });
}

export async function createArmor(data) {
  return prisma.armor.create({ data });
}

export async function deleteArmor(id) {
  return prisma.armor.delete({ where: { id } });
}

export async function deleteAllArmors() {
  return prisma.armor.deleteMany();
}
