import * as dotenv from "dotenv";

dotenv.config();

export const environment = process.env.NODE_ENV;
export const port = process.env.PORT;
export const logDir = process.env.LOG_DIR;
