// import { Seat } from "../db";
import { isNumber, Seat } from "../lib/helper";

// TODO: 아래 전부 검토 요망
export const getSeat = async (id: string): Promise<null | void> => {
  try {
    if (!isNumber(id) || !Number.isInteger(Number(id))) return null;
    const condition = { id };
    // const seat: Seat = await Seat.findOne({ where: { id: id } });
    // return seat;
  } catch (error) {
    console.error(error);
    throw new Error("Fail to do findAll() in Database");
  }
};
