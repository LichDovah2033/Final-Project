import prisma from "../lib/prisma.js";

export async function getAllWeapons() {
  return prisma.weapon.findMany();
}

export async function getWeaponById(id) {
  return prisma.weapon.findUnique({ where: { id } });
}

export async function createWeapon(data) {
  return prisma.weapon.create({ data });
}

export async function deleteWeapon(id) {
  return prisma.weapon.delete({ where: { id } });
}

export async function deleteAllWeapons() {
  return prisma.weapon.deleteMany();
}
