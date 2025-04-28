import { Router } from "express";

const userRouter = Router();

userRouter.get("/", (req, res) => ({ title: "Get all users" }));

userRouter.get("/:id", (req, res) => ({ title: "Get user by ID" }));

userRouter.post("/", (req, res) => ({ title: "Create a new user" }));

userRouter.put("/:id", (req, res) => ({ title: "Update user" }));

userRouter.delete("/:id", (req, res) => ({ title: "Delete user" }));

export default userRouter;
