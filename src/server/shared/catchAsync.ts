import { NextResponse } from "next/server";
import { AppError } from "@/server/errors/AppError";
import { ZodError } from "zod";

type AsyncRouteHandler = (...args: any[]) => Promise<NextResponse>;

export const catchAsync = (fn: AsyncRouteHandler) => {
  return async (...args: any[]): Promise<NextResponse> => {
    try {
      return await fn(...args);
    } catch (error: any) {
      console.error("API Error Caught:", error);

      if (error instanceof AppError) {
        return NextResponse.json(
          {
            statusCode: error.statusCode,
            success: false,
            message: error.message,
            data: null,
          },
          { status: error.statusCode }
        );
      }

      if (error instanceof ZodError) {
        return NextResponse.json(
          {
            statusCode: 400,
            success: false,
            message: "Validation Error",
            errors: error.flatten().fieldErrors,
            data: null,
          },
          { status: 400 }
        );
      }

      return NextResponse.json(
        {
          statusCode: 500,
          success: false,
          message: error?.message || "Internal Server Error",
          data: null,
        },
        { status: 500 }
      );
    }
  };
};

