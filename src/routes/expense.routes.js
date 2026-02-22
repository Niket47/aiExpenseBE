import express from "express";
const router = express.Router();
import expenseController from "../controllers/expense.controller.js"
import authenticate from "../middlewares/auth.middleware.js";


router.post("/addExpense", authenticate, expenseController.addExpense)
router.get("/getExpenses", authenticate, expenseController.getExpenses)
router.get("/getExpenseById/:id", authenticate, expenseController.getExpenseById)
router.put("/updateExpense/:id", authenticate, expenseController.updateExpense)
router.delete("/deleteExpense/:id", authenticate, expenseController.deleteExpense)


export default router;