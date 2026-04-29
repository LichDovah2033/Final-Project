import { Prisma } from "@prisma/client";

export function errorHandler(err, _req, res, _next) {
  if (err.status) {
    return res.status(err.status).json({ message: err.message });
  }

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === "P2002") {
      return res.status(409).json({ message: "A record with this value already exists." });
    }
    if (err.code === "P2025") {
      return res.status(404).json({ message: "Record not found." });
    }
  }

  console.error(err);
  res.status(500).json({ message: "Internal server error" });
}
