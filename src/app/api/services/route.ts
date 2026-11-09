import { NextRequest } from "next/server";
import { ServiceController } from "@/server/modules/service/service.controller";

export async function GET(request: NextRequest) {
  return ServiceController.getServices(request);
}

export async function POST(request: NextRequest) {
  return ServiceController.createService(request);
}

