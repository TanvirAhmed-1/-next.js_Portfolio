import { NextRequest } from "next/server";
import { catchAsync } from "@/server/shared/catchAsync";
import { sendResponse } from "@/server/shared/sendResponse";
import { EducationService } from "@/server/modules/education/education.service";

export const GET = catchAsync(async () => {
  const result = await EducationService.getAllEducationsFromDB();

  return sendResponse({
    statusCode: 200,
    success: true,
    message: "Educations retrieved successfully",
    data: result,
  });
});

export const POST = catchAsync(async (req: NextRequest) => {
  const body = await req.json();
  const result = await EducationService.createEducationIntoDB(body);

  return sendResponse({
    statusCode: 201,
    success: true,
    message: "Education qualification created successfully",
    data: result,
  });
});

