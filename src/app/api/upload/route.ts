import { NextResponse } from "next/server";
import { uploadToCloudinary } from "@/server/shared/cloudinary";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const folder = (formData.get("folder") as string) || "tanvir_portfolio";

    if (!file) {
      return NextResponse.json(
        { success: false, error: "No image file provided" },
        { status: 400 }
      );
    }

    // Convert file to Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const result = await uploadToCloudinary(buffer, folder);

    return NextResponse.json({
      success: true,
      statusCode: 200,
      message: "Image uploaded successfully to Cloudinary",
      data: result,
    });
  } catch (error: any) {
    console.error("Cloudinary upload API error:", error);
    return NextResponse.json(
      {
        success: false,
        statusCode: 500,
        error: error.message || "Failed to upload image to Cloudinary",
      },
      { status: 500 }
    );
  }
}

