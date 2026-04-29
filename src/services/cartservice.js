import * as cartRepo from "../repositories/cartrepository.js";
import * as weaponRepo from "../repositories/weaponrepository.js";
import * as armorRepo from "../repositories/armorrepository.js";

export async function startCart(userId) {
  const existing = await cartRepo.getCartByUserId(userId);
  if (existing) throw { status: 400, message: "User already has a cart" };
  return cartRepo.createCart(userId);
}

export async function addItemToCart(userId, itemId, itemType) {
  const cart = await cartRepo.getCartByUserId(+userId);
  if (!cart) throw { status: 404, message: "Cart not found" };

  if (itemType === "weapon") {
    const weapon = await weaponRepo.getWeaponById(+itemId);
    if (!weapon) throw { status: 404, message: "Weapon not found" };
    return cartRepo.addWeaponToCart(cart.id, +itemId);
  } else {
    const armor = await armorRepo.getArmorById(+itemId);
    if (!armor) throw { status: 404, message: "Armor not found" };
    return cartRepo.addArmorToCart(cart.id, +itemId);
  }
}

export async function removeItemFromCart(userId, itemId, itemType) {
  const cart = await cartRepo.getCartByUserId(+userId);
  if (!cart) throw { status: 404, message: "Cart not found" };

  if (itemType === "weapon") {
    return cartRepo.removeWeaponFromCart(cart.id, +itemId);
  } else {
    return cartRepo.removeArmorFromCart(cart.id, +itemId);
  }
}

export async function purchaseCart(userId) {
  const cart = await cartRepo.getCartByUserId(+userId);
  if (!cart) throw { status: 404, message: "Cart not found" };
  if (cart.weapons.length === 0 && cart.armors.length === 0) {
    throw { status: 400, message: "Cart is empty" };
  }
  await cartRepo.clearCart(cart.id);
  return { message: "Purchase successful. Cart has been emptied." };
}

export async function getCart(userId) {
  const cart = await cartRepo.getCartByUserId(userId);
  if (!cart) throw { status: 404, message: "Cart not found" };
  return cart;
}