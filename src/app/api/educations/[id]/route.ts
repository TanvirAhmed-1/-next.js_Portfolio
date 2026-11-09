import { NextRequest } from "next/server";
import { catchAsync } from "@/server/shared/catchAsync";
import { sendResponse } from "@/server/shared/sendResponse";
import { EducationService } from "@/server/modules/education/education.service";

export const GET = catchAsync(async (_req: NextRequest, context: { params: Promise<{ id: string }> }) => {
  const { id } = await context.params;
  const result = await EducationService.getEducationByIdFromDB(id);

  return sendResponse({
    statusCode: 200,
    success: true,
    message: "Education qualification retrieved successfully",
    data: result,
  });
});

export const PUT = catchAsync(async (req: NextRequest, context: { params: Promise<{ id: string }> }) => {
  const { id } = await context.params;
  const body = await req.json();
  const result = await EducationService.updateEducationInDB(id, body);

  return sendResponse({
    statusCode: 200,
    success: true,
    message: "Education qualification updated successfully",
    data: result,
  });
});

export const PATCH = PUT;

export const DELETE = catchAsync(async (_req: NextRequest, context: { params: Promise<{ id: string }> }) => {
  const { id } = await context.params;
  const result = await EducationService.deleteEducationFromDB(id);

  return sendResponse({
    statusCode: 200,
    success: true,
    message: "Education qualification deleted successfully",
    data: result,
  });
});

