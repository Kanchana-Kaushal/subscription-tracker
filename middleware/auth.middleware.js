import { jwtSecretKey } from "../config/env.js";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

const authorize = async (req, res, next) => {
    try {
        let token;

        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer")
        ) {
            token = req.headers.authorization.split(" ")[1];
        }

        if (!token) {
            res.status(401).json({
                success: false,
                message: "User Unauthorized",
            });

            return;
        }

        const decoded = jwt.verify(token, jwtSecretKey);

        const user = User.findById(decoded.userid);

        if (!user) {
            res.status(401).json({
                success: false,
                message: "User Unauthorized",
            });
            return;
        }

        req.user = user;

        next();
    } catch (err) {
        res.status(401).json({ message: "Unauthorized", error: err.message });
    }
};

export default authorize;
