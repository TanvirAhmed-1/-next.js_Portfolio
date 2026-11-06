import { ProjectController } from "@/server/modules/project/project.controller";

export const GET = ProjectController.getSingleProject;
export const PUT = ProjectController.updateProject;
export const DELETE = ProjectController.deleteProject;
