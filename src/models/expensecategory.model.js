import mongoose from "mongoose";

const expenseCategorySchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        date: {
            type: Date,
            required: false,
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        }
    },
    {
        timestamps: true,
        collection: 'expensecategory',
    }
);

const ExpenseCategory = mongoose.model("ExpenseCategory", expenseCategorySchema);

export default ExpenseCategory;
