import { prisma, isDatabaseConfigured } from "@/server/shared/prisma";
import { IContactMessage } from "./contact.interface";

const createContactMessageInDB = async (payload: any): Promise<IContactMessage> => {
  if (isDatabaseConfigured()) {
    try {
      const result = await prisma.contactMessage.create({
        data: payload,
      });
      return result as unknown as IContactMessage;
    } catch (error) {
      console.warn("Prisma contact create error:", error);
    }
  }

  return {
    id: `contact-${Date.now()}`,
    ...payload,
    read: false,
    createdAt: new Date().toISOString(),
  };
};

const getAllContactMessagesFromDB = async (): Promise<IContactMessage[]> => {
  if (isDatabaseConfigured()) {
    try {
      const result = await prisma.contactMessage.findMany({
        orderBy: { createdAt: "desc" },
      });
      return result as unknown as IContactMessage[];
    } catch (error) {
      console.warn("Prisma contact find error:", error);
    }
  }

  return [];
};

export const ContactService = {
  createContactMessageInDB,
  getAllContactMessagesFromDB,
};

