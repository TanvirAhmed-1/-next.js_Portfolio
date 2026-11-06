import { BlogController } from "@/server/modules/blog/blog.controller";

export const GET = BlogController.getSingleBlog;
export const PUT = BlogController.updateBlog;
export const PATCH = BlogController.updateBlog;
export const DELETE = BlogController.deleteBlog;

