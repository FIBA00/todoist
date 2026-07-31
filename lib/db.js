import { PrismaClient } from "../generated/prisma/client";

const globalForPrisma = globalThis;

export const prisma =
  globalForPrisma ||
  new PrismaClient({
    log: ["error", "warn"],
  });
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
