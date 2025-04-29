import express from "express";
import cookieParsar from "cookie-parser";
import { PORT } from "./config/env.js";
import connectToDatabase from "./database/mongodb.js";
import errorMiddleware from "./middleware/error.middleware.js";
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import subscriptionRouter from "./routes/subscription.routes.js";

const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParsar());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/subscriptions", subscriptionRouter);

//This middleware will run if a error occured
app.use(errorMiddleware);

app.listen(PORT, async () => {
    console.log("Server is listening on PORT " + PORT);
    await connectToDatabase();
});
