import { prismaClient } from "@/app/api/prismaClient";

export async function GET(request: Request) {
  try {
    const projects = await prismaClient.project.findMany();
    return Response.json(projects);
  } catch (error: any) {
    return Response.json(
      {
        message: `Failed to fetch projects: ${error.message}`,
      },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const { name, description, startDate, endDate } = await request.json();
    const project = await prismaClient.project.create({
      data: { name, description, startDate, endDate },
    });
    return Response.json(project, { status: 201 });
  } catch (error: any) {
    return Response.json(
      {
        message: `Failed to create project: ${error.message}`,
      },
      { status: 500 },
    );
  }
}
