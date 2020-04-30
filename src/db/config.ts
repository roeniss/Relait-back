import { Options, Dialect } from "sequelize";
const DB_NAME = <string>process.env.DB_NAME;
const DB_PASSWORD = <string>process.env.DB_PASSWORD;
const DB_HOST = <string>process.env.DB_HOST;
const DB_DIALECT = <Dialect>process.env.DB_DIALECT;
const DB_USER = <string>process.env.DB_USER;

const hasUndefined = (each: any) => typeof each === "undefined";

if ([DB_NAME, DB_PASSWORD, DB_HOST, DB_DIALECT, DB_USER].some(hasUndefined)) {
  console.error("please fill in environment values for DB");
  process.exit(1);
}

const dbOptions: Options = {
  host: DB_HOST,
  dialect: DB_DIALECT,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  logging: (...msg: any) =>
    console.log(
      `📘[Sequelize] 
  ㄴ${msg[0]}`
    ),
};

export { DB_NAME, DB_PASSWORD, DB_USER, dbOptions };
