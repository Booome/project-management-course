import { prismaClient } from "@/app/api/prismaClient";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const projects = await prismaClient.project.findMany();
    return NextResponse.json(projects);
  } catch (error: any) {
    return NextResponse.json(
      {
        message: `Failed to fetch projects: ${error.message}`,
      },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { name, description, startDate, endDate } = await request.json();
    const project = await prismaClient.project.create({
      data: { name, description, startDate, endDate },
    });
    return NextResponse.json(project, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      {
        message: `Failed to create project: ${error.message}`,
      },
      { status: 500 },
    );
  }
}
