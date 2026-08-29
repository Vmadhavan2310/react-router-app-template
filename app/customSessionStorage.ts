import prisma from "./db.server";
import { PrismaSessionStorage } from "@shopify/shopify-app-session-storage-prisma";

const base = new PrismaSessionStorage(prisma as any);

const customSessionStorage = {
  async storeSession(session: any) {
    const { id, ...updateWithoutId } = session as any;
    return prisma.session.upsert({
      where: { id },
      update: updateWithoutId,
      create: session,
    } as any);
  },
  loadSession: base.loadSession?.bind(base),
  deleteSession: base.deleteSession?.bind(base),
  findSessionsByShop: base.findSessionsByShop?.bind(base),
};

export default customSessionStorage;
