import { NextResponse } from "next/server";
import { updateSkill, deleteSkill } from "@/lib/storage";
import { skillSchema } from "@/lib/validations";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const parsed = skillSchema.partial().safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, errors: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const updated = updateSkill(id, parsed.data);
    if (!updated) {
      return NextResponse.json(
        { success: false, error: "Skill not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error("PUT /api/skills/[id] error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update skill" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const deleted = deleteSkill(id);
    if (!deleted) {
      return NextResponse.json(
        { success: false, error: "Skill not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, message: "Skill deleted successfully" });
  } catch (error) {
    console.error("DELETE /api/skills/[id] error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete skill" },
      { status: 500 }
    );
  }
}

