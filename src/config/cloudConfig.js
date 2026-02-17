import { v2 as cloudinary } from "cloudinary";

export const cloudinaryConfiguration = cloudinary.config({
    cloud_name: "wewe",
    api_key: "12",
    api_secret: "we",
});

export const prefixCloudinaryDbUrl =
    "http://res.cloudinary.com/dbpvij2f9/image/upload/";

export default cloudinary;