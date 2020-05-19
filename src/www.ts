import "../env";
import { checkEnvs } from "./lib";
checkEnvs();
import app from "./App";
import { moment } from "./lib";

// -----------------------------
//  init server
// -----------------------------
const port = Number(process.env.PORT) || 9000;
const { NODE_ENV } = process.env;

if (NODE_ENV === "local" || NODE_ENV === "development") {
  app
    .listen(port, () => {
      const curDate = moment().toDate();
      console.log(`Express server listening at ${port} (${curDate})`);
    })
    .on("error", (err) => console.error(err));
} else if (NODE_ENV === "production") {
  // TODO: TBD
} else {
  console.error(`'NODE_ENV' env value is unprocessable: ${NODE_ENV}`);
  process.exit(1);
}
