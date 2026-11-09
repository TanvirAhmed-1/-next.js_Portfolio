import { NextRequest } from "next/server";
import { ServiceController } from "@/server/modules/service/service.controller";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  return ServiceController.getService(request, context);
}

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  return ServiceController.updateService(request, context);
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  return ServiceController.deleteService(request, context);
}

