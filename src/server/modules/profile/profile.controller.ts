import { catchAsync } from "@/server/shared/catchAsync";
import { sendResponse } from "@/server/shared/sendResponse";
import { ProfileService } from "./profile.service";
import { ProfileValidation } from "./profile.validation";

const getProfile = catchAsync(async () => {
  const result = await ProfileService.getProfileFromDB();

  return sendResponse({
    statusCode: 200,
    success: true,
    message: "Profile retrieved successfully",
    data: result,
  });
});

const updateProfile = catchAsync(async (request: Request) => {
  const body = await request.json();
  const validatedData = ProfileValidation.updateProfileZodSchema.parse(body);

  const result = await ProfileService.updateProfileInDB(validatedData);

  return sendResponse({
    statusCode: 200,
    success: true,
    message: "Profile updated successfully",
    data: result,
  });
});

export const ProfileController = {
  getProfile,
  updateProfile,
};

