import * as cartService from "../services/cartservice.js";

export async function startCart(req, res, next) {
  try {
    const cart = await cartService.startCart(req.user.id);
    res.status(201).json({ data: cart });
  } catch (err) { next(err); }
}

export async function addItemToCart(req, res, next) {
  try {
    const { itemId, itemType } = req.body;
    const cart = await cartService.addItemToCart(req.user.id, itemId, itemType);
    res.json({ data: cart });
  } catch (err) { next(err); }
}

export async function removeItemFromCart(req, res, next) {
  try {
    const { itemId, itemType } = req.body;
    const cart = await cartService.removeItemFromCart(req.user.id, itemId, itemType);
    res.json({ data: cart });
  } catch (err) { next(err); }
}

export async function purchaseCart(req, res, next) {
  try {
    const result = await cartService.purchaseCart(req.user.id);
    res.json(result);
  } catch (err) { next(err); }
}

export async function getCart(req, res, next) {
  try {
    const cart = await cartService.getCart(req.user.id);
    res.json({ data: cart });
  } catch (err) { next(err); }
}