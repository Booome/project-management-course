import { PrismaClient } from "@prisma/client";

class PrismaClientSingleton {
  private static instance: PrismaClient | undefined;

  private constructor() {}

  public static getInstance(): PrismaClient | undefined {
    if (!PrismaClientSingleton.instance) {
      PrismaClientSingleton.instance = new PrismaClient();
    }
    return PrismaClientSingleton.instance;
  }
}

const prismaClient = PrismaClientSingleton.getInstance();
