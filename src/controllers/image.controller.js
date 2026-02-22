import cloudinary from "../config/cloudConfig.js";
import { errorResponse, successResponse } from "../helpers/response.js";


const uploadImage = async (req, res) => {
    try {
        if (!req.file) {
            return errorResponse(res, 'No file uploaded', 400);
        }
        const profileData = {
            filename: req.file.filename,
            path: req.file.path,
            mimetype: req.file.mimetype,
        };

        const imageUploadResult = await cloudinary.uploader.upload(profileData.path, { folder: "aiExpense" });

        const message = 'Profile uploaded successfully';
        const data = {
            // local: profileData,
            url: imageUploadResult?.url
        }
        return successResponse(res, message, data, 201);

    } catch (error) {
        return errorResponse(res, 'Server error', error.message, 500);
    }
};

const uploadController = {
    uploadImage
}
export default uploadController
