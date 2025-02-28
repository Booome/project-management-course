import { NextRequest, NextResponse } from "next/server";
import { createPrismaClient } from "../awsApi";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query");

  if (!query) {
    return NextResponse.json({ error: "Query is required" }, { status: 400 });
  }

  const prismaClient = await createPrismaClient(request);

  try {
    const projects = await prismaClient.project.findMany({
      where: {
        OR: [
          { name: { contains: query, mode: "insensitive" } },
          { description: { contains: query, mode: "insensitive" } },
        ],
      },
    });

    const tasks = await prismaClient.task.findMany({
      where: {
        OR: [
          { title: { contains: query, mode: "insensitive" } },
          { description: { contains: query, mode: "insensitive" } },
        ],
      },
      include: {
        attachments: true,
        author: true,
        assignee: true,
      },
    });

    const users = await prismaClient.user.findMany({
      where: {
        OR: [{ username: { contains: query, mode: "insensitive" } }],
      },
    });

    return NextResponse.json({ projects, tasks, users });
  } catch (error: unknown) {
    return NextResponse.json(
      {
        error: `Failed to search: ${error instanceof Error ? error.message : JSON.stringify(error)}`,
      },
      { status: 500 },
    );
  }
}
