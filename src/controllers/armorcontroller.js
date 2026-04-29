import * as armorService from "../services/armorservice.js";

export async function getAllArmors(_req, res, next) {
  try {
    const armors = await armorService.getAllArmors();
    res.json({ data: armors });
  } catch (err) { next(err); }
}

export async function getArmorById(req, res, next) {
  try {
    const armor = await armorService.getArmorById(req.params.id);
    res.json({ data: armor });
  } catch (err) { next(err); }
}

export async function createArmor(req, res, next) {
  try {
    const armor = await armorService.createArmor(req.body);
    res.status(201).json({ data: armor });
  } catch (err) { next(err); }
}

export async function deleteArmor(req, res, next) {
  try {
    await armorService.deleteArmor(req.params.id);
    res.status(204).send();
  } catch (err) { next(err); }
}

export async function deleteAllArmors(_req, res, next) {
  try {
    await armorService.deleteAllArmors();
    res.status(204).send();
  } catch (err) { next(err); }
}
