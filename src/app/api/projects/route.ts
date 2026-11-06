import { NextResponse } from "next/server";
import { getProjects, addProject } from "@/lib/storage";
import { projectSchema } from "@/lib/validations";

export async function GET() {
  try {
    const projects = getProjects();
    return NextResponse.json({ success: true, data: projects });
  } catch (error) {
    console.error("GET /api/projects error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = projectSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, errors: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { tags, ...rest } = parsed.data;
    const tagsArray = Array.isArray(tags)
      ? tags
      : tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean);

    const project = addProject({
      ...rest,
      tags: tagsArray,
      liveUrl: rest.liveUrl || undefined,
      githubUrl: rest.githubUrl || undefined,
      longDescription: rest.longDescription || rest.description,
    });

    return NextResponse.json({ success: true, data: project }, { status: 201 });
  } catch (error) {
    console.error("POST /api/projects error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create project" },
      { status: 500 }
    );
  }
}

