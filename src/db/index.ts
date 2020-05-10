import { User, Seat, sequelize } from "./schema";
import { userSeed, seatSeed } from "./seed";

if (process.env.NODE_ENV === "prod") {
  sequelize.sync();
} else {
  sequelize.sync({ force: true }).then(() => {
    let deletedId: number;
    User.bulkCreate(userSeed)
      .then((users) => {
        deletedId = users[users.length - 1].id;
        users[users.length - 1].destroy();
      })
      .then((_) => Seat.bulkCreate(seatSeed))
      .then((seats) => {
        seats.forEach((seat) => {
          if (seat.giverId === deletedId || seat.takerId === deletedId)
            seat.destroy();
        });
      });
  });
}

export { sequelize, User, Seat };
