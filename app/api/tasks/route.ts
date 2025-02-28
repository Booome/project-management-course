import { NextRequest, NextResponse } from "next/server";
import { createPrismaClient } from "../awsApi";

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const param = url.searchParams.get("param");

    const prismaClient = await createPrismaClient(request);
    const tasks = await prismaClient.task.findMany(
      param ? JSON.parse(param) : {},
    );

    return NextResponse.json(tasks);
  } catch (error: unknown) {
    return NextResponse.json(
      {
        message: `Failed to fetch tasks: ${error instanceof Error ? error.message : JSON.stringify(error)}`,
      },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const {
      title,
      description,
      status,
      priority,
      tags,
      startDate,
      dueDate,
      points,
      projectId,
      authorUserId,
      assignedUserId,
    } = await request.json();

    const prismaClient = await createPrismaClient(request);
    const task = await prismaClient.task.create({
      data: {
        title,
        description,
        status,
        priority,
        tags,
        startDate,
        dueDate,
        points,
        projectId,
        authorUserId,
        assignedUserId,
      },
    });

    return NextResponse.json(task, { status: 201 });
  } catch (error: unknown) {
    return NextResponse.json(
      {
        message: `Failed to create task: ${error instanceof Error ? error.message : JSON.stringify(error)}`,
      },
      { status: 500 },
    );
  }
}
