import { NextRequest } from "next/server";
import { ServiceService } from "./service.service";
import { ServiceValidation } from "./service.validation";
import { sendResponse } from "@/server/shared/sendResponse";
import { catchAsync } from "@/server/shared/catchAsync";

export const getServices = catchAsync(async (req: NextRequest) => {
  const url = new URL(req.url);
  const homeOnly = url.searchParams.get("home") === "true";
  const status = url.searchParams.get("status") || undefined;
  const search = url.searchParams.get("search") || undefined;

  const filters: any = {};
  if (homeOnly) {
    filters.showOnHome = true;
    filters.status = "ACTIVE";
  } else if (status) {
    filters.status = status;
  }
  if (search) {
    filters.searchTerm = search;
  }

  const services = await ServiceService.getAllServices(filters);

  return sendResponse({
    success: true,
    statusCode: 200,
    message: "Services retrieved successfully",
    data: services,
  });
});

export const getService = catchAsync(async (req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const service = await ServiceService.getServiceByIdOrSlug(id);

  if (!service) {
    return sendResponse({
      success: false,
      statusCode: 404,
      message: "Service not found",
      data: null,
    });
  }

  return sendResponse({
    success: true,
    statusCode: 200,
    message: "Service retrieved successfully",
    data: service,
  });
});

export const createService = catchAsync(async (req: NextRequest) => {
  const body = await req.json();
  const validated = ServiceValidation.createServiceValidationSchema.parse(body);
  const service = await ServiceService.createService(validated);

  return sendResponse({
    success: true,
    statusCode: 201,
    message: "Service created successfully",
    data: service,
  });
});

export const updateService = catchAsync(async (req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const body = await req.json();
  const validated = ServiceValidation.updateServiceValidationSchema.parse(body);
  const service = await ServiceService.updateService(id, validated);

  return sendResponse({
    success: true,
    statusCode: 200,
    message: "Service updated successfully",
    data: service,
  });
});

export const toggleHome = catchAsync(async (req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const service = await ServiceService.toggleHomeVisibility(id);

  return sendResponse({
    success: true,
    statusCode: 200,
    message: "Home visibility updated successfully",
    data: service,
  });
});

export const toggleStatus = catchAsync(async (req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const service = await ServiceService.toggleStatus(id);

  return sendResponse({
    success: true,
    statusCode: 200,
    message: "Service status updated successfully",
    data: service,
  });
});

export const deleteService = catchAsync(async (req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  await ServiceService.deleteService(id);

  return sendResponse({
    success: true,
    statusCode: 200,
    message: "Service deleted successfully",
    data: null,
  });
});

export const ServiceController = {
  getServices,
  getService,
  createService,
  updateService,
  toggleHome,
  toggleStatus,
  deleteService,
};

