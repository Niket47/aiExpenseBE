import { errorResponse, successResponse } from "../helpers/response.js";
import ExpenseCategory from "../models/expensecategory.model.js";

const addCategory = async (req, res) => {
    try {
        const { title, date } = req.body;

        if (!title) {
            return errorResponse(res, 'Title is required', 400);
        }

        const parsedDate = new Date(date);

        if (isNaN(parsedDate.getTime())) {
            return errorResponse(res, 'Invalid date format. Use ISO format (YYYY-MM-DD)', 400);
        }

        const response = await ExpenseCategory.create({
            title,
            date: parsedDate,
            userId: req.user.id,
        });

        if (response) {
            const message = "Category created successfully";
            return successResponse(res, message, response, 201);
        }
    } catch (error) {
        return errorResponse(res, error.message);
    }
}

const getAllCategory = async (req, res) => {
    try {
        const response = await ExpenseCategory.find({
            userId: req.user.id,
        }).sort({ createdAt: -1 });

        if (response) {
            const message = "Category fetched successfully";
            return successResponse(res, message, response, 200);
        }
    } catch (error) {
        return errorResponse(res, error.message);
    }
}




const expenseCategoryController = {
    addCategory,
    getAllCategory
}
export default expenseCategoryController