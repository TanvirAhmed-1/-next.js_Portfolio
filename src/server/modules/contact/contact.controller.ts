import { catchAsync } from "@/server/shared/catchAsync";
import { sendResponse } from "@/server/shared/sendResponse";
import { ContactService } from "./contact.service";
import { ContactValidation } from "./contact.validation";

const submitContactForm = catchAsync(async (request: Request) => {
  const body = await request.json();
  const validatedData = ContactValidation.createContactZodSchema.parse(body);

  const result = await ContactService.createContactMessageInDB(validatedData);

  return sendResponse({
    statusCode: 201,
    success: true,
    message: "Your message has been sent successfully!",
    data: result,
  });
});

const getAllContactMessages = catchAsync(async () => {
  const result = await ContactService.getAllContactMessagesFromDB();

  return sendResponse({
    statusCode: 200,
    success: true,
    message: "Contact messages retrieved successfully",
    meta: {
      total: result.length,
    },
    data: result,
  });
});

export const ContactController = {
  submitContactForm,
  getAllContactMessages,
};

