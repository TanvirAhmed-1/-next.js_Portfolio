import { NextRequest, NextResponse } from "next/server";
import { UserService } from "./user.service";
import { UserValidation } from "./user.validation";
import { sendResponse } from "@/server/shared/sendResponse";
import { catchAsync } from "@/server/shared/catchAsync";

// Login handler
export const login = catchAsync(async (req: NextRequest) => {
  const body = await req.json();
  const validated = UserValidation.loginUserValidationSchema.parse(body);

  const authData = await UserService.loginUser(validated);

  const response = NextResponse.json({
    success: true,
    statusCode: 200,
    message: "Login successful",
    data: authData,
  });

  // Set secure cookie for admin session
  response.cookies.set("admin_session", "authenticated", {
    httpOnly: false,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });

  return response;
});

// Get all users
export const getUsers = catchAsync(async () => {
  const users = await UserService.getAllUsers();
  return sendResponse({
    success: true,
    statusCode: 200,
    message: "Users retrieved successfully",
    data: users,
  });
});

// Create user
export const createUser = catchAsync(async (req: NextRequest) => {
  const body = await req.json();
  const validated = UserValidation.createUserValidationSchema.parse(body);
  const user = await UserService.createUser(validated as any);

  return sendResponse({
    success: true,
    statusCode: 201,
    message: "User created successfully",
    data: user,
  });
});

export const UserController = {
  login,
  getUsers,
  createUser,
};

