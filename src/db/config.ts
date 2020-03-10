const DB_NAME: string = process.env.DB_NAME || "";
const DB_PASSWORD: string = process.env.DB_PASSWORD || "";
const DB_HOST: string = process.env.DB_HOST || "";
const DB_DIALECT: string = process.env.DB_DIALECT || "";
const DB_USER: string = process.env.DB_USER || "";

console.log(DB_NAME, DB_PASSWORD, DB_HOST, DB_DIALECT, DB_USER);
const dbOptions = {
  host: DB_HOST,
  dialect: DB_DIALECT,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};

export { DB_NAME, DB_PASSWORD, DB_USER, dbOptions };
