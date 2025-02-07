import { NextRequest, NextResponse } from "next/server";
import { prismaClient } from "../../prismaClient";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ taskId: string }> },
) {
  try {
    const data = await request.json();
    const { taskId } = await params;

    const task = await prismaClient.task.update({
      where: { id: parseInt(taskId) },
      data,
    });

    return NextResponse.json(task);
  } catch (error: any) {
    return NextResponse.json(
      { message: `Failed to update task: ${error.message}` },
      { status: 500 },
    );
  }
}
