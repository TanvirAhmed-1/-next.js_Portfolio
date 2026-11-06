import { NextRequest } from "next/server";
import { UserController } from "@/server/modules/user/user.controller";

export async function POST(request: NextRequest) {
  return UserController.login(request);
}
