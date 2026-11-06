import { NextResponse } from "next/server";
import { resetData } from "@/lib/storage";

export async function POST() {
  try {
    const data = resetData();
    return NextResponse.json({
      success: true,
      message: "Data reset to defaults successfully",
      data,
    });
  } catch (error) {
    console.error("POST /api/reset error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to reset data" },
      { status: 500 }
    );
  }
}

