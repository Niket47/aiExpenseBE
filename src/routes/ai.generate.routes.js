import express from "express";
const router = express.Router();
import aiController from "../controllers/ai.controller.js"
import authenticate from "../middlewares/auth.middleware.js";


router.post("/generateExpenseDec", authenticate, aiController.generateExpenseDescription)



export default router;