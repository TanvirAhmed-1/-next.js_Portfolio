import { BlogController } from "@/server/modules/blog/blog.controller";

export const GET = BlogController.getAllBlogs;
export const POST = BlogController.createBlog;

