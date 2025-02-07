import { NextRequest, NextResponse } from "next/server";
import { prismaClient } from "../prismaClient";

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const param = url.searchParams.get("param");

    console.log(param);

    const tasks = await prismaClient.task.findMany(
      param ? JSON.parse(param) : {},
    );

    return NextResponse.json(tasks);
  } catch (error: any) {
    return NextResponse.json(
      { message: `Failed to fetch tasks: ${error.message}` },
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
  } catch (error: any) {
    return NextResponse.json(
      { message: `Failed to create task: ${error.message}` },
      { status: 500 },
    );
  }
}
