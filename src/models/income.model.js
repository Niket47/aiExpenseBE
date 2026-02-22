import mongoose from "mongoose";

const incomeSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: false,
        },
        amount: {
            type: Number,
            required: true,
        },
        category: {
            type: String,
            required: false,
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
        collection: 'income',
    }
);

const Income = mongoose.model("Income", incomeSchema);

export default Income;
