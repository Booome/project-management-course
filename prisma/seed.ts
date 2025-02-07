import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();

async function deleteAllData(modelNames: string[]) {
  const remainModels = [...modelNames];

  while (remainModels.length > 0) {
    const modelName = remainModels.shift();
    if (!modelName) {
      throw new Error("No model name to clear data from");
    }
    const model: any = prisma[modelName as keyof typeof prisma];
    try {
      await model.deleteMany({});
      console.log(`Cleared data from ${modelName}`);
    } catch (error) {
      remainModels.push(modelName);
      // console.error(`Error clearing data from ${modelName}:`, error);
    }
  }
}

async function main() {
  const dataDirectory = path.join(__dirname, "seedData");

  const modelNames = ["team", "project", "projectTeam", "user", "task", "attachment", "comment", "taskAssignment"];

  const orderedFileNames = [
    ["team.json", "team"],
    ["project.json", "project"],
    ["projectTeam.json", "projectTeam"],
    ["user.json", "user"],
    ["task.json", "task"],
    ["attachment.json", "attachment"],
    ["comment.json", "comment"],
    ["taskAssignment.json", "taskAssignment"],
    ["update_team.json", "team"],
  ];

  await deleteAllData(modelNames);

  for (const [fileName, modelName] of orderedFileNames) {
    const filePath = path.join(dataDirectory, fileName);
    const jsonData = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    const model: any = prisma[modelName as keyof typeof prisma];

    try {
      for (const data of jsonData) {
        if (fileName.startsWith("update_")) {
          await model.update({ where: { id: data.id }, data });
          console.log(`Updated ${modelName} with id ${JSON.stringify(data)}`);
        } else {
          await model.create({ data });
          console.log(`Created ${modelName} with id ${JSON.stringify(data)}`);
        }
      }
    } catch (error) {
      console.error(`Error seeding data for ${modelName}:`, error);
    }
  }
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());
