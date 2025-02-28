import { NextRequest, NextResponse } from "next/server";
import { createPrismaClient } from "../awsApi";

export async function GET(request: NextRequest) {
  try {
    const prismaClient = await createPrismaClient(request);
    const users = await prismaClient.user.findMany({
      include: {
        team: true,
      },
    });
    return NextResponse.json(users);
  } catch (error: unknown) {
    return NextResponse.json(
      {
        message: `Failed to fetch users: ${error instanceof Error ? error.message : JSON.stringify(error)}`,
      },
      { status: 500 },
    );
  }
}
