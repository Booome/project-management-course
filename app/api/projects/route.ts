import { NextRequest, NextResponse } from "next/server";
import { createPrismaClient } from "../awsApi";

export async function GET(request: NextRequest) {
  try {
    const prismaClient = await createPrismaClient(request);
    const projects = await prismaClient.project.findMany();

    return NextResponse.json(projects);
  } catch (error: unknown) {
    return NextResponse.json(
      {
        message: `Failed to fetch projects: ${error instanceof Error ? error.message : JSON.stringify(error)}`,
      },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { name, description, startDate, endDate } = await request.json();
    const prismaClient = await createPrismaClient(request);
    const project = await prismaClient.project.create({
      data: { name, description, startDate, endDate },
    });
    return NextResponse.json(project, { status: 201 });
  } catch (error: unknown) {
    return NextResponse.json(
      {
        message: `Failed to create project: ${error instanceof Error ? error.message : JSON.stringify(error)}`,
      },
      { status: 500 },
    );
  }
}
