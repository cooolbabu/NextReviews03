import { PrismaClient } from "@prisma/client";

// export const db = new PrismaClient({
//   //log: [{ emit: "stdout", level: "query" }],
// });

export const db = new createPrismaClient();

/** @returns {PrismaClient} */
function createPrismaClient() {
  if (!globalThis.prismaClient)
    globalThis.prismaClient = new PrismaClient({
      //log: [{ emit: "stdout", level: "query" }],
    });

  return globalThis.prismaClient;
}
