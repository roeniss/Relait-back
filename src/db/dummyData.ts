import { User, Seat } from "./schema";
import { getOffsetTime, mysqlDateFormat } from "../lib/helper";

const users = [
  { vender: "1", uniqueId: "123456789" },
  { vender: "1", uniqueId: "1357913579" },
  { vender: "1", uniqueId: "987654321" },
];

export const addDummyData = async () => {
  await User.bulkCreate(users).then(() => {
    console.log(`[Dummy] add ${users.length} users data :`, users);
  });
  // await Seat.bulkCreate(seats).then(() => {
  //   console.log(`[Dummy] add ${seats.length} seats data :`, users);
  // });
};
