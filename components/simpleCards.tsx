import { Project, Task, User } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import Image from "next/image";

function SimpleCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex w-full flex-col gap-2 rounded-lg bg-foreground/5 p-4 text-sm">
      {children}
    </div>
  );
}

export function SimpleProjectCard({ project }: { project: Project }) {
  return (
    <SimpleCard>
      <div>
        <strong>Id: </strong>
        <span>{project.id}</span>
      </div>

      <div>
        <strong>Name: </strong>
        <span>{project.name}</span>
      </div>

      <div>
        <strong>Description: </strong>
        <span>{project.description}</span>
      </div>

      <div>
        <strong>Start Date: </strong>
        <span>{formatDate(project.startDate, "-")}</span>
      </div>

      <div>
        <strong>End Date: </strong>
        <span>{formatDate(project.endDate, "-")}</span>
      </div>

      <div>
        <strong>Tasks: </strong>
        <span>
          {project.tasks && project.tasks.map((task) => task.id).join(" ")}
        </span>
      </div>
    </SimpleCard>
  );
}

export function SimpleTaskCard({ task }: { task: Task }) {
  return (
    <SimpleCard>
      <div>
        <strong>Attatchments:</strong>
        <div className="flex flex-wrap gap-2">
          {task.attachments.map((attachment) => (
            <Image
              key={attachment.id}
              src={"/" + attachment.fileURL}
              alt={attachment.fileName ?? `Attachment ${attachment.id}`}
              width={800}
              height={800}
              className="h-56 flex-1 basis-96 rounded object-cover"
            />
          ))}
        </div>
      </div>

      <div>
        <strong>Id: </strong>
        <span>{task.id}</span>
      </div>

      <div>
        <strong>Title: </strong>
        <span>{task.title}</span>
      </div>

      <div>
        <strong>Description: </strong>
        <span>{task.description ?? "No description provided"}</span>
      </div>

      <div>
        <strong>Status: </strong>
        <span>{task.status}</span>
      </div>

      <div>
        <strong>Priority: </strong>
        <span>{task.priority}</span>
      </div>

      <div>
        <strong>Tags: </strong>
        <span>{task.tags}</span>
      </div>

      <div>
        <strong>Start Date: </strong>
        <span>{formatDate(task.startDate, "-")}</span>
      </div>

      <div>
        <strong>Due Date: </strong>
        <span>{formatDate(task.dueDate, "-")}</span>
      </div>

      <div>
        <strong>Author: </strong>
        <span>{task.author.username}</span>
      </div>

      <div>
        <strong>Assignee: </strong>
        <span>{task.assignee.username}</span>
      </div>
    </SimpleCard>
  );
}

export function SimpleUserCard({ user }: { user: User }) {
  return (
    <SimpleCard>
      <div>
        <strong>Id:</strong>
        <span>{user.userId}</span>
      </div>

      <div>
        <strong>Username:</strong>
        <span>{user.username}</span>
      </div>
    </SimpleCard>
  );
}
