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
        const search = req.query.search || "";
        const page = parseInt(req.query.page) || 1;     // default page 1
        const limit = parseInt(req.query.limit) || 10;  // default 10 items

        const skip = (page - 1) * limit;

        const query = { userId: req.user.id };
        if (search) {
            query.$or = [
                { title: { $regex: search, $options: "i" } },
                { category: { $regex: search, $options: "i" } },
                { description: { $regex: search, $options: "i" } },
            ];
        }

        const [expenses, total] = await Promise.all([
            Expense.find(query)  // IMPORTANT → user specific
                .sort({ date: -1 })                // newest first (optional)
                .skip(skip)
                .limit(limit),
            Expense.countDocuments(query)
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
        const id = req.params.id
        if (!id) {
            return errorResponse(res, 'Expense ID is required', 400);
        }
        const expense = await Expense.findById(id);
        if (!expense) return errorResponse(res, 'Expense not found', 404);

        const updateData = {
            title: req.body.title,
            amount: req.body.amount,
            category: req.body.category,
            description: req.body.description,
            date: req.body.date,
            userId: req.user.id,
        }

        const updated = await Expense.findByIdAndUpdate(id, updateData, { new: true });

        if (!updated) return errorResponse(res, 'Expense not found', 404);

        const updatedExpense = await Expense.findById(id);
        res.status(200).json({ message: "Expense updated", data: updatedExpense });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteExpense = async (req, res) => {
    try {
        const id = req.params.id
        if (!id) {
            return errorResponse(res, 'Expense ID is required', 400);
        }
        const expense = await Expense.findById(id);
        if (!expense) return res.status(404).json({ message: "Expense not found" });

        const deleted = await Expense.findByIdAndDelete(id);

        if (!deleted) return res.status(404).json({ message: "Expense not found" });

        res.status(200).json({ message: "Expense deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const expenseController = {
    addExpense,
    getExpenses,
    getExpenseById,
    updateExpense,
    deleteExpense
}
export default expenseController