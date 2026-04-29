import prisma from "../lib/prisma.js";

const cartInclude = { weapons: true, armors: true };

export async function getCartByUserId(userId) {
  return prisma.cart.findUnique({ where: { userId }, include: cartInclude });
}

export async function createCart(userId) {
  return prisma.cart.create({ data: { userId }, include: cartInclude });
}

export async function addWeaponToCart(cartId, weaponId) {
  return prisma.cart.update({
    where: { id: cartId },
    data: { weapons: { connect: { id: weaponId } } },
    include: cartInclude,
  });
}

export async function addArmorToCart(cartId, armorId) {
  return prisma.cart.update({
    where: { id: cartId },
    data: { armors: { connect: { id: armorId } } },
    include: cartInclude,
  });
}

export async function removeWeaponFromCart(cartId, weaponId) {
  return prisma.cart.update({
    where: { id: cartId },
    data: { weapons: { disconnect: { id: weaponId } } },
    include: cartInclude,
  });
}

export async function removeArmorFromCart(cartId, armorId) {
  return prisma.cart.update({
    where: { id: cartId },
    data: { armors: { disconnect: { id: armorId } } },
    include: cartInclude,
  });
}

export async function clearCart(cartId) {
  return prisma.cart.update({
    where: { id: cartId },
    data: {
      weapons: { set: [] },
      armors: { set: [] },
    },
    include: cartInclude,
  });
}
