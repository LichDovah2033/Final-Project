import * as armorRepo from "../repositories/armorrepository.js";

export async function getAllArmors() {
  return armorRepo.getAllArmors();
}

export async function getArmorById(id) {
  const armor = await armorRepo.getArmorById(+id);
  if (!armor) throw { status: 404, message: "Armor not found" };
  return armor;
}

export async function createArmor(data) {
  return armorRepo.createArmor(data);
}

export async function deleteArmor(id) {
  const armor = await armorRepo.getArmorById(+id);
  if (!armor) throw { status: 404, message: "Armor not found" };
  await armorRepo.deleteArmor(+id);
}

export async function deleteAllArmors() {
  await armorRepo.deleteAllArmors();
}
