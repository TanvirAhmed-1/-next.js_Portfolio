import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "dczux9dym",
  api_key: process.env.CLOUDINARY_API_KEY || "836625327334786",
  api_secret: process.env.CLOUDINARY_API_SECRET || "4ZJn_oXqBO9VbEOyCwoWqtU0VOI",
  secure: true,
});

export interface CloudinaryUploadResult {
  secure_url: string;
  public_id: string;
  width?: number;
  height?: number;
  format?: string;
  bytes?: number;
}

export const uploadToCloudinary = async (
  fileBuffer: Buffer,
  folder: string = "tanvir_portfolio"
): Promise<CloudinaryUploadResult> => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: "auto",
        transformation: [{ quality: "auto", fetch_format: "auto" }],
      },
      (error, result) => {
        if (error) {
          console.error("Cloudinary upload error:", error);
          return reject(error);
        }
        if (!result) {
          return reject(new Error("Empty response from Cloudinary"));
        }
        resolve({
          secure_url: result.secure_url,
          public_id: result.public_id,
          width: result.width,
          height: result.height,
          format: result.format,
          bytes: result.bytes,
        });
      }
    );
    uploadStream.end(fileBuffer);
  });
};

export { cloudinary };

