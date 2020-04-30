import { User, Seat, sequelize } from "./schema";

if (process.env.NODE_ENV === "prod") {
  sequelize.sync();
} else {
  sequelize.sync();
}

export { sequelize, User, Seat };
