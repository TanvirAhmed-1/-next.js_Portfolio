import { catchAsync } from "@/server/shared/catchAsync";
import { sendResponse } from "@/server/shared/sendResponse";
import { SkillService } from "./skill.service";
import { SkillValidation } from "./skill.validation";
import { AppError } from "@/server/errors/AppError";

const createSkill = catchAsync(async (request: Request) => {
  const body = await request.json();
  const validatedData = SkillValidation.createSkillZodSchema.parse(body);

  const result = await SkillService.createSkillIntoDB(validatedData);

  return sendResponse({
    statusCode: 201,
    success: true,
    message: "Skill created successfully",
    data: result,
  });
});

const getAllSkills = catchAsync(async (request: Request) => {
  const { searchParams } = new URL(request.url);
  const searchTerm = searchParams.get("searchTerm") || undefined;
  const category = (searchParams.get("category") as any) || undefined;
  const level = (searchParams.get("level") as any) || undefined;

  const result = await SkillService.getAllSkillsFromDB({
    searchTerm,
    category,
    level,
  });

  return sendResponse({
    statusCode: 200,
    success: true,
    message: "Skills retrieved successfully",
    meta: {
      total: result.length,
    },
    data: result,
  });
});

const updateSkill = catchAsync(
  async (request: Request, { params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    const body = await request.json();
    const validatedData = SkillValidation.updateSkillZodSchema.parse(body);

    const result = await SkillService.updateSkillInDB(id, validatedData);

    if (!result) {
      throw new AppError(404, "Skill not found");
    }

    return sendResponse({
      statusCode: 200,
      success: true,
      message: "Skill updated successfully",
      data: result,
    });
  }
);

const deleteSkill = catchAsync(
  async (_request: Request, { params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    const result = await SkillService.deleteSkillFromDB(id);

    if (!result) {
      throw new AppError(404, "Skill not found");
    }

    return sendResponse({
      statusCode: 200,
      success: true,
      message: "Skill deleted successfully",
      data: null,
    });
  }
);

export const SkillController = {
  createSkill,
  getAllSkills,
  updateSkill,
  deleteSkill,
};

