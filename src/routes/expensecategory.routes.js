import express from "express";
const router = express.Router();
import expenseCategoryController from "../controllers/expensecategory.controller.js"
import authenticate from "../middlewares/auth.middleware.js";

router.post("/add-expense-category", authenticate, expenseCategoryController.addCategory)
router.get("/get-expense-category", authenticate, expenseCategoryController.getAllCategory)
// router.get("/getExpenseById/:id", authenticate, expenseController.getExpenseById)
// router.put("/updateExpense/:id", authenticate, expenseController.updateExpense)
// router.delete("/deleteExpense/:id", authenticate, expenseController.deleteExpense)


export default router;