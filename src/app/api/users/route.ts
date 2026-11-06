import { NextRequest } from "next/server";
import { UserController } from "@/server/modules/user/user.controller";

export async function GET() {
  return UserController.getUsers();
}

export async function POST(request: NextRequest) {
  return UserController.createUser(request);
}

