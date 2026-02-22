import { Router } from "express";
import upload from '../middlewares/upload.middleware.js';
import uploadController from "../controllers/image.controller.js";

const router = Router()

router.post("/uploads", upload.single('image'), uploadController.uploadImage)

export default router;

