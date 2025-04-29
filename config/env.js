import dotenv from "dotenv";
dotenv.config();

export const PORT = process.env.PORT;
export const databaseConnString = process.env.DB_CONN_STRING;
