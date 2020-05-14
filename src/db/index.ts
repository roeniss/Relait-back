import { User, Seat, sequelize } from "./schema";
import { userSeed, seatSeed } from "./seed";

if (process.env.NODE_ENV === "prod") {
  sequelize.sync();
} else {
  sequelize.sync({ force: true }).then(() => {
    let deletedId: number;
    User.bulkCreate(userSeed)
      .then((users) => {
        const lastUser = users.pop();
        if (lastUser) lastUser.destroy();
      })
      .then(() => Seat.bulkCreate(seatSeed))
      .then((seats) => {
        seats.forEach((seat) => {
          if (seat.giverId === deletedId || seat.takerId === deletedId)
            seat.destroy();
        });
      });
  });
}

export { sequelize, User, Seat };
