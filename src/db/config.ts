export default {
  DB_NAME: process.env.DB_NAME || "",
  DB_PASSWORD: process.env.DB_PASSWORD || "",
  DB_HOST: process.env.DB_HOST || "",
  DB_DIALECT: process.env.DB_DIALECT || "mysql",
  DB_USER: process.env.DB_USER || "",
  DB_PEM: process.env.DB_PEM || ".",
  DB_REMOTE_HOST: process.env.DB_REMOTE_HOST || "",
  DB_REMOTE_USERNAME: process.env.DB_REMOTE_USERNAME || "",
};
