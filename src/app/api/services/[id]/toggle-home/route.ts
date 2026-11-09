import { NextRequest } from "next/server";
import { ServiceController } from "@/server/modules/service/service.controller";

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  return ServiceController.toggleHome(request, context);
}

