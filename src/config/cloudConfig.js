import { v2 as cloudinary } from "cloudinary";

export const cloudinaryConfiguration = cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const prefixCloudinaryDbUrl =
    process.env.CLOUDINARY_PREFIX_DB_URL;


export default cloudinary;