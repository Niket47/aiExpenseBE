import { Router } from "express";
import userRouter from "./user.routes.js"
import expenseRouter from "./expense.routes.js"
import uplodsRouter from "./uplods.route.js"

const router = Router()

router.use("/user", userRouter)
router.use("/expense", expenseRouter)
router.use("/image", uplodsRouter)


export default router
