import * as authService from "../services/authservice.js";

export async function signup(req, res, next) {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: "Username and password are required" });
    }
    const user = await authService.signup(username, password);
    res.status(201).json({ data: user });
  } catch (err) { next(err); }
}

export async function login(req, res, next) {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: "Username and password are required" });
    }
    const result = await authService.login(username, password);
    res.json(result);
  } catch (err) { next(err); }
}
