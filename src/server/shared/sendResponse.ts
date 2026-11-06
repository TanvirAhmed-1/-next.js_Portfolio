import { NextResponse } from "next/server";

export interface IApiResponse<T> {
  statusCode: number;
  success: boolean;
  message?: string | null;
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
  };
  data?: T | null;
}

export const sendResponse = <T>(data: IApiResponse<T>): NextResponse => {
  return NextResponse.json(
    {
      statusCode: data.statusCode,
      success: data.success,
      message: data.message || null,
      meta: data.meta || null,
      data: data.data !== undefined ? data.data : null,
    },
    { status: data.statusCode }
  );
};

