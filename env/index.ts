import path from "path";
import dotenv from "dotenv";

if (process.env.NODE_ENV === "production") {
  dotenv.config({ path: path.join(__dirname, "env", ".env.production") });
} else if (process.env.NODE_ENV === "development") {
  dotenv.config({ path: path.join(__dirname, "env", ".env.development") });
} else if (process.env.NODE_ENV === "local") {
  dotenv.config({ path: path.join(__dirname, "env", ".env.local") });
} else {
}
