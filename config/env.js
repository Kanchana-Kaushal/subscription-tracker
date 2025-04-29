import dotenv from "dotenv";
dotenv.config();

export const PORT = process.env.PORT;
export const databaseConnString = process.env.DB_CONN_STRING;
export const jwtSecretKey = process.env.JWT_SECRET;
export const jwtExpiresIn = process.env.JWT_EXP_IN;
