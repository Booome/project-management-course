import { NextRequest, NextResponse } from "next/server";
import { createPrismaClient } from "../awsApi";

export async function GET(request: NextRequest) {
  try {
    const prismaClient = await createPrismaClient(request);
    const teams = await prismaClient.team.findMany({
      include: {
        users: true,
        productOwnerUser: true,
        projectManagerUser: true,
      },
    });
    return NextResponse.json(teams);
  } catch (error: unknown) {
    return NextResponse.json(
      {
        message: `Failed to fetch teams: ${error instanceof Error ? error.message : JSON.stringify(error)}`,
      },
      { status: 500 },
    );
  }
}
