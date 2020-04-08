// TS reference : https://github.com/thrymgjol/typescript-sequelize-example/blob/master/app/models/index.ts

import { Sequelize, Options } from "sequelize";
import * as dbConfig from "./config";
import { User, Seat } from "./schema";
import { addDummyData } from "./dummyData";
const sequelize: Sequelize = new Sequelize(
  dbConfig.DB_NAME,
  dbConfig.DB_USER,
  dbConfig.DB_PASSWORD,
  <Options>dbConfig.dbOptions
);

const models: any[] = [User, Seat];
models.forEach((model) => model.initialize(sequelize));

if (process.env.NODE_ENV === "prod") {
  sequelize.sync();
} else {
  // sequelize.sync({ force: true }).then(addDummyData);
  sequelize.sync();
}

export { sequelize, User, Seat };
