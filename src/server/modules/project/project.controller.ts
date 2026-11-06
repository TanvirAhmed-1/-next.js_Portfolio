import { catchAsync } from "@/server/shared/catchAsync";
import { sendResponse } from "@/server/shared/sendResponse";
import { ProjectService } from "./project.service";
import { ProjectValidation } from "./project.validation";
import { AppError } from "@/server/errors/AppError";

const createProject = catchAsync(async (request: Request) => {
  const body = await request.json();
  const validatedData = ProjectValidation.createProjectZodSchema.parse(body);

  const result = await ProjectService.createProjectIntoDB(validatedData);

  return sendResponse({
    statusCode: 201,
    success: true,
    message: "Project created successfully",
    data: result,
  });
});

const getAllProjects = catchAsync(async (request: Request) => {
  const { searchParams } = new URL(request.url);
  const searchTerm = searchParams.get("searchTerm") || undefined;
  const category = (searchParams.get("category") as any) || undefined;
  const featured =
    searchParams.get("featured") !== null
      ? searchParams.get("featured") === "true"
      : undefined;

  const result = await ProjectService.getAllProjectsFromDB({
    searchTerm,
    category,
    featured,
  });

  return sendResponse({
    statusCode: 200,
    success: true,
    message: "Projects retrieved successfully",
    meta: {
      total: result.length,
    },
    data: result,
  });
});

const getSingleProject = catchAsync(
  async (_request: Request, { params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    const result = await ProjectService.getSingleProjectFromDB(id);

    if (!result) {
      throw new AppError(404, "Project not found");
    }

    return sendResponse({
      statusCode: 200,
      success: true,
      message: "Project retrieved successfully",
      data: result,
    });
  }
);

const updateProject = catchAsync(
  async (request: Request, { params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    const body = await request.json();
    const validatedData = ProjectValidation.updateProjectZodSchema.parse(body);

    const result = await ProjectService.updateProjectInDB(id, validatedData);

    if (!result) {
      throw new AppError(404, "Project not found");
    }

    return sendResponse({
      statusCode: 200,
      success: true,
      message: "Project updated successfully",
      data: result,
    });
  }
);

const deleteProject = catchAsync(
  async (_request: Request, { params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    const result = await ProjectService.deleteProjectFromDB(id);

    if (!result) {
      throw new AppError(404, "Project not found");
    }

    return sendResponse({
      statusCode: 200,
      success: true,
      message: "Project deleted successfully",
      data: null,
    });
  }
);

export const ProjectController = {
  createProject,
  getAllProjects,
  getSingleProject,
  updateProject,
  deleteProject,
};

