import { prismaClient } from "@/app/api/prismaClient";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const users = await prismaClient.user.findMany({
      include: {
        team: true,
      },
    });
    return NextResponse.json(users);
  } catch (error: any) {
    return NextResponse.json(
      { message: `Failed to fetch users: ${error.message}` },
      { status: 500 },
    );
  }
}
