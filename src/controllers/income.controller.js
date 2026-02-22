import { errorResponse, successResponse } from "../helpers/response.js";
import Income from "../models/income.model.js";


const addIncome = async (req, res) => {
    try {
        const { title, description, amount, category, date } = req.body;

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

        const userId = req.user.id;
        const income = await Income.create({
            title,
            description,
            amount,
            category,
            date: parsedDate,
            userId
        });
        return successResponse(res, "Income added successfully", income, 201);
    } catch (error) {
        return errorResponse(res, "Internal server error", error, 500);
    }
}


const getIncomes = async (req, res) => {
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

        const [incomes, total] = await Promise.all([
            Income.find(query)  // IMPORTANT → user specific
                .sort({ date: -1 })                // newest first (optional)
                .skip(skip)
                .limit(limit),
            Income.countDocuments(query)
        ]);

        res.status(200).json({
            message: "Incomes fetched successfully",
            data: incomes,
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

const getIncomeById = async (req, res) => {
    try {
        const id = req.params.id
        if (!id) {
            return errorResponse(res, 'Income ID is required', 400);
        }
        const income = await Income.findById(id);
        if (!income) return res.status(404).json({ message: "Income not found" });

        // res.status(200).json({ message: "Income found", data: income });
        return successResponse(res, "Income found", income, 200);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateIncome = async (req, res) => {
    try {
        const id = req.params.id
        if (!id) {
            return errorResponse(res, 'Income ID is required', 400);
        }
        const income = await Income.findById(id);
        if (!income) return errorResponse(res, 'Income not found', 404);

        const updateData = {
            title: req.body.title,
            amount: req.body.amount,
            category: req.body.category,
            description: req.body.description,
            date: req.body.date,
            userId: req.user.id,
        }

        const updated = await Income.findByIdAndUpdate(id, updateData, { new: true });

        if (!updated) return errorResponse(res, 'Income not found', 404);

        const updatedIncome = await Income.findById(id);
        return successResponse(res, "Income updated", updatedIncome, 200);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteIncome = async (req, res) => {
    try {
        const id = req.params.id
        if (!id) {
            return errorResponse(res, 'Income ID is required', 400);
        }
        const income = await Income.findById(id);
        if (!income) return res.status(404).json({ message: "Income not found" });

        const deleted = await Income.findByIdAndDelete(id);

        if (!deleted) return res.status(404).json({ message: "Income not found" });

        // res.status(200).json({ message: "Income deleted" });
        return successResponse(res, "Income deleted", 200);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



const incomeController = {
    addIncome,
    getIncomes,
    getIncomeById,
    updateIncome,
    deleteIncome
}
export default incomeController