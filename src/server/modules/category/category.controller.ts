import { NextRequest } from "next/server";
import { CategoryService } from "./category.service";
import { sendResponse } from "@/server/shared/sendResponse";
import { catchAsync } from "@/server/shared/catchAsync";

export const getCategories = catchAsync(async () => {
  const categories = await CategoryService.getAllCategories();
  return sendResponse({
    success: true,
    statusCode: 200,
    message: "Categories retrieved successfully",
    data: categories,
  });
});

export const createCategory = catchAsync(async (req: NextRequest) => {
  const body = await req.json();
  const category = await CategoryService.createCategory(body.name);

  return sendResponse({
    success: true,
    statusCode: 201,
    message: "Category created successfully",
    data: category,
  });
});

export const deleteCategory = catchAsync(async (req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  await CategoryService.deleteCategory(id);

  return sendResponse({
    success: true,
    statusCode: 200,
    message: "Category deleted successfully",
    data: null,
  });
});

export const CategoryController = {
  getCategories,
  createCategory,
  deleteCategory,
};

