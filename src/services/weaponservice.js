import * as weaponRepo from "../repositories/weaponrepository.js";

export async function getAllWeapons() {
  return weaponRepo.getAllWeapons();
}

export async function getWeaponById(id) {
  const weapon = await weaponRepo.getWeaponById(+id);
  if (!weapon) throw { status: 404, message: "Weapon not found" };
  return weapon;
}

export async function createWeapon(data) {
  return weaponRepo.createWeapon(data);
}

export async function deleteWeapon(id) {
  const weapon = await weaponRepo.getWeaponById(+id);
  if (!weapon) throw { status: 404, message: "Weapon not found" };
  await weaponRepo.deleteWeapon(+id);
}

export async function deleteAllWeapons() {
  await weaponRepo.deleteAllWeapons();
}
