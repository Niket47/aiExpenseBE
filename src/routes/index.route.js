import { Router } from "express";
import userRouter from "./user.routes.js"
import expenseRouter from "./expense.routes.js"
import uplodsRouter from "./uplods.route.js"
import aiRouter from "./ai.generate.routes.js"
import categoryRouter from "./expensecategory.routes.js"
import incomeRouter from "./income.routes.js"

const router = Router()

router.use("/user", userRouter)
router.use("/expense", expenseRouter)
router.use("/income", incomeRouter)
router.use("/image", uplodsRouter)
router.use("/ai", aiRouter)
router.use("/expense-category", categoryRouter)


export default router
