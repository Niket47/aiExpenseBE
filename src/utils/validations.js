import Joi from "joi";

export const checkUserName = (name) => {
    return Joi.object({
        name: Joi.string()
            .trim()
            .min(3)
            .max(25)
            .pattern(/^[a-zA-Z0-9 ]*$/)
            .allow(null)
            .optional(),
    }).validate({ name });
};

export const checkAmount = (amount) => {
    return Joi.object({
        amount: Joi.number()
            .min(3)
            .max(10)
            .required()
    }).validate({ amount });
};

export const validateExpensePayload = (payload) => {
    const schema = Joi.object({
        title: Joi.string().trim().min(3).max(50).required(),
        amount: Joi.number().positive().required(),
        category: Joi.string().valid("Food", "Travel", "Transport", "Health", "Other").optional(),
        description: Joi.string().max(255).allow("").optional()
    });

    return schema.validate(payload);
};