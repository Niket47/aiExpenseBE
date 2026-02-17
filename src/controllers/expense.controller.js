import { errorResponse, successResponse } from "../helpers/response.js";
import Expense from "../models/expense.model.js";


const addExpense = async (req, res) => {
    try {
        const { title, amount, category, description, date } = req.body;

        if (!title) {
            return errorResponse(res, 'Title is required', 400);
        }

        if (!amount) {
            return errorResponse(res, 'Amount is required', 400);
        }

        if (!category) {
            return errorResponse(res, 'Category is required', 400);
        }

        if (!date) {
            return errorResponse(res, 'Date is required', 400);
        }

        const parsedDate = new Date(date);

        if (isNaN(parsedDate.getTime())) {
            return errorResponse(res, 'Invalid date format. Use ISO format (YYYY-MM-DD)', 400);
        }

        const expense = await Expense.create({
            title,
            amount,
            category,
            description,
            date: parsedDate,
            userId: req.user.id,
        });

        if (expense) {
            const message = "Expense created successfully";
            return successResponse(res, message, expense, 201);
        }

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getExpenses = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;     // default page 1
        const limit = parseInt(req.query.limit) || 10;  // default 10 items

        const skip = (page - 1) * limit;

        const [expenses, total] = await Promise.all([
            Expense.find({ userId: req.user.id })  // IMPORTANT → user specific
                .sort({ date: -1 })                // newest first (optional)
                .skip(skip)
                .limit(limit),

            Expense.countDocuments({ userId: req.user.id })
        ]);

        res.status(200).json({
            message: "Expenses fetched successfully",
            data: expenses,
            pagination: {
                total,
                page,
                limit,
                pages: Math.ceil(total / limit),
            }
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getExpenseById = async (req, res) => {
    try {
        const id = req.params.id
        if (!id) {
            return errorResponse(res, 'Expense ID is required', 400);
        }
        const expense = await Expense.findById(id);
        if (!expense) return res.status(404).json({ message: "Expense not found" });

        res.status(200).json({ message: "Expense found", data: expense });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateExpense = async (req, res) => {
    try {
        const [updated] = await Expense.update(req.body, {
            where: { id: req.params.id },
        });

        if (!updated) return res.status(404).json({ message: "Expense not found" });

        const updatedExpense = await Expense.findById(req.params.id);
        res.status(200).json({ message: "Expense updated", data: updatedExpense });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteExpense = async (req, res) => {
    try {
        const deleted = await Expense.destroy({
            where: { id: req.params.id },
        });

        if (!deleted) return res.status(404).json({ message: "Expense not found" });

        res.status(200).json({ message: "Expense deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const expenseController = {
    addExpense,
    getExpenses,
    getExpenseById
}
export default expenseController