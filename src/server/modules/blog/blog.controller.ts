import { catchAsync } from "@/server/shared/catchAsync";
import { sendResponse } from "@/server/shared/sendResponse";
import { BlogService } from "./blog.service";
import { BlogValidation } from "./blog.validation";
import { AppError } from "@/server/errors/AppError";

const getAllBlogs = catchAsync(async () => {
  const result = await BlogService.getAllBlogsFromDB();

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
  async (_request: Request, { params }: { params: Promise<{ slug: string }> }) => {
    const { slug } = await params;
    const result = await BlogService.getSingleBlogFromDB(slug);

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

export const BlogController = {
  getAllBlogs,
  getSingleBlog,
  createBlog,
};

