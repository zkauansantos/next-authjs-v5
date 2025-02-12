import { PrismaClient } from '@prisma/client';

declare const globalThis: {
  prismaGlobal: PrismaClient;
} & typeof global;

const db = globalThis.prismaGlobal ?? new PrismaClient();

export default db;

if (process.env.NODE_ENV !== 'production') {
  globalThis.prismaGlobal = db;
}
