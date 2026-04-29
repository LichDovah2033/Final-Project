import * as weaponService from "../services/weaponservice.js";

export async function getAllWeapons(_req, res, next) {
  try {
    const weapons = await weaponService.getAllWeapons();
    res.json({ data: weapons });
  } catch (err) { next(err); }
}

export async function getWeaponById(req, res, next) {
  try {
    const weapon = await weaponService.getWeaponById(req.params.id);
    res.json({ data: weapon });
  } catch (err) { next(err); }
}

export async function createWeapon(req, res, next) {
  try {
    const weapon = await weaponService.createWeapon(req.body);
    res.status(201).json({ data: weapon });
  } catch (err) { next(err); }
}

export async function deleteWeapon(req, res, next) {
  try {
    await weaponService.deleteWeapon(req.params.id);
    res.status(204).send();
  } catch (err) { next(err); }
}

export async function deleteAllWeapons(_req, res, next) {
  try {
    await weaponService.deleteAllWeapons();
    res.status(204).send();
  } catch (err) { next(err); }
}
