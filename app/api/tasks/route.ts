import { prismaClient } from "../prismaClient";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    if (url.searchParams.get("projectId") === null) {
      throw new Error("Project ID is required");
    }
    const projectId = parseInt(url.searchParams.get("projectId")!);

    const tasks = await prismaClient.task.findMany({
      where: {
        projectId: projectId,
      },
      include: {
        author: true,
        assignee: true,
        comments: true,
        attachments: true,
      },
    });

    return Response.json(tasks);
  } catch (error: any) {
    return Response.json(
      { message: `Failed to fetch tasks: ${error.message}` },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
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

    return Response.json(task, { status: 201 });
  } catch (error: any) {
    return Response.json(
      { message: `Failed to create task: ${error.message}` },
      { status: 500 },
    );
  }
}
