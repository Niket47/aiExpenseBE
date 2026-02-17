import { errorResponse, successResponse } from "../helpers/response.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import User from "../models/user.model.js";

const createUser = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;

        // Validate required fields
        if (!firstName || !lastName || !email || !password) {
            return errorResponse(res, "All fields are required (firstName, lastName, email, password)", 400);
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return errorResponse(res, "Invalid email format", 400);
        }

        // Validate password length
        if (password.length < 6) {
            return errorResponse(res, "Password must be at least 6 characters long", 400);
        }

        // Check if user already exists
        const userPresent = await User.findOne({
            email: email
        });

        if (userPresent) {
            return errorResponse(res, "User already exists", 409);
        }

        // Hash password
        const hashPassword = await bcrypt.hash(password, 10);

        // Create user
        const user = await User.create({
            firstName,
            lastName,
            email,
            password: hashPassword
        });

        // Remove password from response
        const userResponse = user.toObject();
        delete userResponse.password;

        const message = "User created successfully"
        return successResponse(res, message, userResponse, 201);

    } catch (error) {
        console.error("Error in createUser:", error);
        return errorResponse(res, error.message, 500);
    }
}

const logInUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Step 1: Find user by email
        const user = await User.findOne({ email });

        if (!user) {
            return errorResponse(res, 'User not found', 404);
        }

        // Step 2: Compare password
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return errorResponse(res, 'Invalid credentials', 401);
        }

        // Step 3: Generate JWT token
        const token = jwt.sign(
            {
                id: user.id,
                email: user.email,
            },
            "expenseappjwt",
            // { expiresIn: '7d' } // Token expires in 7 days
        );

        // Optional: Exclude password from returned user object
        const { password: _, ...userWithoutPassword } = user.toJSON();

        return successResponse(res, 'Login successful', {
            token,
            user: userWithoutPassword
        }, 200);

    } catch (error) {
        return errorResponse(res, error.message, 500);
    }
};


const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            const message = 'User not found'
            return errorResponse(res, message, 404);
        }
        const { password: _, ...userWithoutPassword } = user.toJSON();
        return successResponse(res, message, userWithoutPassword, 200);
    } catch (error) {
        return errorResponse(res, error.message);
    }
};



const userController = {
    createUser,
    logInUser,
    getUserById
}
export default userController