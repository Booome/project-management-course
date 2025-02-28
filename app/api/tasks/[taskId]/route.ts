import { NextRequest, NextResponse } from "next/server";
import { createPrismaClient } from "../../awsApi";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ taskId: string }> },
) {
  try {
    const data = await request.json();
    const { taskId } = await params;

    const prismaClient = await createPrismaClient(request);
    const task = await prismaClient.task.update({
      where: { id: parseInt(taskId) },
      data,
    });

    return NextResponse.json(task);
  } catch (error: unknown) {
    return NextResponse.json(
      {
        message: `Failed to update task: ${error instanceof Error ? error.message : JSON.stringify(error)}`,
      },
      { status: 500 },
    );
  }
}
