import { NextResponse } from "next/server";
import { getSkills, addSkill } from "@/lib/storage";
import { skillSchema } from "@/lib/validations";

export async function GET() {
  try {
    const skills = getSkills();
    return NextResponse.json({ success: true, data: skills });
  } catch (error) {
    console.error("GET /api/skills error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch skills" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = skillSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, errors: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const skill = addSkill(parsed.data);
    return NextResponse.json({ success: true, data: skill }, { status: 201 });
  } catch (error) {
    console.error("POST /api/skills error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create skill" },
      { status: 500 }
    );
  }
}

