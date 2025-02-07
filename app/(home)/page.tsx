"use client";

import { ProjectStatus } from "./ProjectStatus";
import { TaskPriorityDistribution } from "./TaskPriorityDistribution";
import { YourTasks } from "./YourTasks";

export default function Page() {
  return (
    <div className="flex flex-col gap-4 px-4 py-8">
      <h1 className="text-2xl font-bold">Home</h1>
      <div className="flex flex-col gap-4 lg:flex-row">
        <TaskPriorityDistribution />
        <ProjectStatus />
      </div>
      <YourTasks />
    </div>
  );
}
