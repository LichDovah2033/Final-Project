import prisma from "../lib/prisma.js";

export async function getUserByUsername(username) {
  return prisma.user.findUnique({ where: { username } });
}

export async function getUserById(id) {
  return prisma.user.findUnique({ where: { id } });
}

export async function createUser(data) {
  return prisma.user.create({ data });
}
