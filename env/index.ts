import * as path from "path";
import * as dotenv from "dotenv";

const { NODE_ENV } = process.env;
dotenv.config({ path: path.join(__dirname, `.env.${NODE_ENV}`) });
