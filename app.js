import express from "express";
import { PORT } from "./config/env.js";
import connectToDatabase from "./database/mongodb.js";

const app = express();

app.listen(PORT, async () => {
    console.log("Server is listening on PORT " + PORT);
    await connectToDatabase();
});
