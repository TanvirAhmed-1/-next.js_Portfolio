import { NextResponse } from "next/server";
import { UserService } from "@/server/modules/user/user.service";

export async function GET() {
  try {
    const superAdmin = await UserService.seedSuperAdmin();
    return NextResponse.json({
      success: true,
      message: "Super admin verified/initialized successfully",
      data: {
        id: superAdmin?.id,
        name: superAdmin?.name,
        email: superAdmin?.email,
        role: superAdmin?.role,
        status: superAdmin?.status,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to seed super admin",
      },
      { status: 500 }
    );
  }
}

export async function POST() {
  return GET();
}

