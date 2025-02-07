import { prismaClient } from "../../prismaClient";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ taskId: string }> },
) {
  try {
    const data = await request.json();
    const { taskId } = await params;

    const task = await prismaClient.task.update({
      where: { id: parseInt(taskId) },
      data,
    });

    return Response.json(task);
  } catch (error: any) {
    return Response.json(
      { message: `Failed to update task: ${error.message}` },
      { status: 500 },
    );
  }
}
