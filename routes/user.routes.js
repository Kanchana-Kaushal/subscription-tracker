import { Router } from "express";
import { getUsers, getUser } from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.get("/:page", getUsers);

userRouter.get("/user/:id", getUser);

userRouter.post("/", (req, res) => {
    res.send({ title: "Create a new user" });
});

userRouter.put("/:id", (req, res) => {
    res.send({ title: "Update user" });
});

userRouter.delete("/:id", (req, res) => {
    res.send({ title: "Delete user" });
});

export default userRouter;
