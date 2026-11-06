import { NextRequest } from "next/server";
import { CategoryController } from "@/server/modules/category/category.controller";

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  return CategoryController.deleteCategory(request, context);
}

