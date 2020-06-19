import "../env";
import app from "./App";
import { moment } from "./lib";

// -----------------------------
//  check env variables
// -----------------------------
const _checkEnvVars = () => {
  const {
    DB_NAME,
    DB_USER,
    DB_PASSWORD,
    DB_HOST,
    DB_DIALECT,
    JWT_EXPIRE,
    JWT_SECRET,
  } = process.env;

  [
    DB_NAME,
    DB_USER,
    DB_PASSWORD,
    DB_HOST,
    DB_DIALECT,
    JWT_EXPIRE,
    JWT_SECRET,
  ].forEach((envVal) => {
    if (!envVal) {
      console.error(`${envVal} should be specified`);
      process.exit(1);
    }
  });
};

_checkEnvVars();

// -----------------------------
//  init server
// -----------------------------
const port = Number(process.env.PORT) || 9000;
const { NODE_ENV } = process.env;

if (
  NODE_ENV === "local" ||
  NODE_ENV === "development" ||
  NODE_ENV === "production"
) {
  app
    .listen(port, () => {
      const curDate = moment().toDate();
      console.log(`Express server listening at ${port} (${curDate})`);
    })
    .on("error", (err) => console.error(err));
} else {
  console.error(`'NODE_ENV' env value is unprocessable: ${NODE_ENV}`);
  process.exit(1);
}
