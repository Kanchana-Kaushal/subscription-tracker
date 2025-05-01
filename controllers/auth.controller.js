import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { jwtSecretKey, jwtExpiresIn } from "../config/env.js";
import bcrypt from "bcryptjs";

export const signUp = async (req, res, next) => {
    const { name, email, password } = req.body;

    const userAlreadyExists = await User.findOne({ email });

    if (userAlreadyExists) {
        const err = new Error("User for this email is already exists");
        err.statusCode = 404;
        throw err;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    try {
        const user = new User({
            name,
            email,
            password: hashedPassword,
        });

        const newUser = await user.save();

        const token = jwt.sign({ email }, jwtSecretKey, {
            expiresIn: jwtExpiresIn,
        });

        res.status(200).json({
            success: true,
            message: "User created successfully",
            data: {
                name: newUser.name,
                userId: user._id,
                email: newUser.email,
                token,
            },
        });
    } catch (err) {
        next(err);
    }
};

export const signIn = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            const err = new Error(
                "User for this email address does not exists"
            );
            err.statusCode = 404;
            throw err;
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
            const err = new Error("Your password is incorrect");
            err.statusCode = 404;
            throw err;
        }

        const token = jwt.sign({ email }, jwtSecretKey, {
            expiresIn: jwtExpiresIn,
        });

        res.status(200).json({
            success: true,
            message: "User signed in successfully",
            data: {
                name: user.name,
                userId: user._id,
                email,
                token,
            },
        });
    } catch (err) {
        next(err);
    }
};

export const signOut = async (req, res, next) => {
    res.send({ title: "Sign Out" });
};
