import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies?.token; // Check if `req.cookies` exists
        if (!token) {
            return res.status(401).json({
                message: "User not authenticated",
                success: false,
            });
        }

        const decoded = jwt.verify(token, process.env.USER_SECRET_KEY);
        if (!decoded) {
            return res.status(401).json({
                message: "Invalid token",
                success: false,
            });
        }

        req.id = decoded.userId; // Store user ID in `req` for subsequent middleware
        next(); // Proceed to the next middleware or controller
    } catch (error) {
        console.error("Authentication error:", error);
        return res.status(500).json({
            message: "Authentication failed",
            success: false,
        });
    }
};

export default isAuthenticated;
