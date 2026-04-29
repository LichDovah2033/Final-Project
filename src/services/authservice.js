import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as userRepo from "../repositories/userrepository.js";

const JWT_SECRET = process.env.JWT_SECRET;
const SALT_ROUNDS = 10;

export async function signup(username, password) {
  const existing = await userRepo.getUserByUsername(username);
  if (existing) throw { status: 409, message: "Username already taken" };

  const hashed = await bcrypt.hash(password, SALT_ROUNDS);
  const user = await userRepo.createUser({ username, password: hashed });

  const { password: _, ...safeUser } = user;
  return safeUser;
}

export async function login(username, password) {
  const user = await userRepo.getUserByUsername(username);
  if (!user) throw { status: 401, message: "Invalid credentials" };

  const match = await bcrypt.compare(password, user.password);
  if (!match) throw { status: 401, message: "Invalid credentials" };

  const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, {
    expiresIn: "7d",
  });

  return { token };
}
