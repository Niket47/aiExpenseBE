// import cloudinary from "../config/cloudConfig.js";


const uploadProfile = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }
        const profileData = {
            filename: req.file.filename,
            path: req.file.path,
            mimetype: req.file.mimetype,
        };

        // const imageUploadResult = await cloudinary.uploader.upload(profileData.path);

        return res.status(200).json({
            message: 'Profile uploaded successfully',
            data: {
                local: profileData,
                // url: imageUploadResult?.url
            },
        });

    } catch (error) {
        return res.status(500).json({
            message: 'Server error',
            error: error.message,
        });
    }
};

const uploadController = {
    uploadProfile
}
export default uploadController
