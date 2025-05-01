import User from "../models/user.model.js";

export const getUsers = async (req, res, next) => {
    const page = parseInt(req.params.page);
    const limit = 10;
    const skip = (page - 1) * limit;

    try {
        const users = await User.find()
            .skip(skip)
            .limit(limit)
            .select("-password -__v");

        res.status(200).json({
            success: true,
            message: "Users fetched successfully",
            data: users,
        });
    } catch (err) {
        next(err);
    }
};

export const getUser = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId).select("-password -__v");

        if (!user) {
            const err = new Error("User not found");
            err.statusCode = 404;
            throw err;
        }

        res.status(200).json({
            success: true,
            message: "User fetched successfully",
            data: user,
        });
    } catch (err) {
        next(err);
    }
};
