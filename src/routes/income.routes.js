import express from "express";
const router = express.Router();
import incomeController from "../controllers/income.controller.js"
import authenticate from "../middlewares/auth.middleware.js";


router.post("/addIncome", authenticate, incomeController.addIncome)
router.get("/getIncomes", authenticate, incomeController.getIncomes)
router.get("/getIncomeById/:id", authenticate, incomeController.getIncomeById)
router.put("/updateIncome/:id", authenticate, incomeController.updateIncome)
router.delete("/deleteIncome/:id", authenticate, incomeController.deleteIncome)


export default router;