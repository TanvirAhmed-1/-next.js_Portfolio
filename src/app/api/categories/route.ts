import { NextRequest } from "next/server";
import { CategoryController } from "@/server/modules/category/category.controller";

export async function GET() {
  return CategoryController.getCategories();
}

export async function POST(request: NextRequest) {
  return CategoryController.createCategory(request);
}

