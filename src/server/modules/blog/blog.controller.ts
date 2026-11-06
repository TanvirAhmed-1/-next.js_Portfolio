import { catchAsync } from "@/server/shared/catchAsync";
import { sendResponse } from "@/server/shared/sendResponse";
import { BlogService } from "./blog.service";
import { BlogValidation } from "./blog.validation";
import { AppError } from "@/server/errors/AppError";

const getAllBlogs = catchAsync(async (request: Request) => {
  const { searchParams } = new URL(request.url);
  const includeAll = searchParams.get("all") === "true";

  const result = await BlogService.getAllBlogsFromDB(includeAll);

  return sendResponse({
    statusCode: 200,
    success: true,
    message: "Blogs retrieved successfully",
    meta: {
      total: result.length,
    },
    data: result,
  });
});

const getSingleBlog = catchAsync(
  async (_request: Request, { params }: { params: Promise<{ id?: string; slug?: string }> }) => {
    const resolvedParams = await params;
    const identifier = resolvedParams.id || resolvedParams.slug;
    if (!identifier) {
      throw new AppError(400, "Identifier is required");
    }

    const result = await BlogService.getSingleBlogFromDB(identifier);

    if (!result) {
      throw new AppError(404, "Blog article not found");
    }

    return sendResponse({
      statusCode: 200,
      success: true,
      message: "Blog retrieved successfully",
      data: result,
    });
  }
);

const createBlog = catchAsync(async (request: Request) => {
  const body = await request.json();
  const validatedData = BlogValidation.createBlogZodSchema.parse(body);

  const result = await BlogService.createBlogIntoDB(validatedData);

  return sendResponse({
    statusCode: 201,
    success: true,
    message: "Blog created successfully",
    data: result,
  });
});

const updateBlog = catchAsync(
  async (request: Request, { params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    const body = await request.json();
    const validatedData = BlogValidation.updateBlogZodSchema.parse(body);

    const result = await BlogService.updateBlogInDB(id, validatedData);

    if (!result) {
      throw new AppError(404, "Blog article not found to update");
    }

    return sendResponse({
      statusCode: 200,
      success: true,
      message: "Blog updated successfully",
      data: result,
    });
  }
);

const deleteBlog = catchAsync(
  async (_request: Request, { params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    const result = await BlogService.deleteBlogFromDB(id);

    if (!result) {
      throw new AppError(404, "Blog article not found to delete");
    }

    return sendResponse({
      statusCode: 200,
      success: true,
      message: "Blog deleted successfully",
      data: result,
    });
  }
);

export const BlogController = {
  getAllBlogs,
  getSingleBlog,
  createBlog,
  updateBlog,
  deleteBlog,
};
