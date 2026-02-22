import { errorResponse, successResponse } from "../helpers/response.js";
import { generateAiResponse } from "../services/ai.services.js";


const generateExpenseDescription = async (req, res) => {
    try {
        const { title, category, } = req.body;

        if (!title) {
            return errorResponse(res, 'Title is required', 400);
        }

        if (!category) {
            return errorResponse(res, 'Category is required', 400);
        }

        const prompt = `
                Rewrite the following expense entry into a clean, natural, and professional transaction description.

                User Input:
                Title: ${title}
                Category: ${category}

                Context:
                This text will be displayed inside a personal expense tracker app.

                Requirements:
                - Keep meaning identical
                - Correct grammar and wording
                - Sound natural and human
                - Very concise (one to two lines sentence)
                - No marketing tone
                - No extra details or assumptions
                - easy to understand
                - easy to remember

                Clean Description:
                `;

        const response = await generateAiResponse(prompt);
        console.log(response.text, "resai");

        if (response.text) {
            const message = "Description generated successfully";
            return successResponse(res, message, response.text, 200);
        }

    } catch (error) {
        return errorResponse(res, error.message);
    }
};


const aiController = {
    generateExpenseDescription
}
export default aiController