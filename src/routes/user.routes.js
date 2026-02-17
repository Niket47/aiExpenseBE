import express from "express";
const router = express.Router();
import userController from "../controllers/user.controller.js"


router.post("/createUser", userController.createUser)
router.post("/logIn", userController.logInUser)


export default router;