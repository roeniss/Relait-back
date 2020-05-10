import { User, Seat, sequelize } from "./schema";

if (process.env.NODE_ENV === "prod") {
  sequelize.sync();
} else {
  sequelize.sync({ force: true });
}

export { sequelize, User, Seat };
