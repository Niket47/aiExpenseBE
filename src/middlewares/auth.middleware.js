import jwt from "jsonwebtoken";


const authenticate = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Unauthorized: No token provided" });
        }

        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(token, "expenseappjwt");
        req.user = decoded; // Add decoded token data to req.user

        next(); // Proceed to the next middleware or controller
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized: Invalid token", error: error.message });
    }
};

export default authenticate;
