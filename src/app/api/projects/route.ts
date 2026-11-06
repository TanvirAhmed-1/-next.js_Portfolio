import { ProjectController } from "@/server/modules/project/project.controller";

export const GET = ProjectController.getAllProjects;
export const POST = ProjectController.createProject;
