import { ContactController } from "@/server/modules/contact/contact.controller";

export const POST = ContactController.submitContactForm;
export const GET = ContactController.getAllContactMessages;

