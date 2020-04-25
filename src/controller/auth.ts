import * as express from "express";
import { User } from "../db";
import { makeJwt } from "../lib/helper";

//
// (1) login || signup
// (2) send token to client
//
export const login = async (req: express.Request, res: express.Response) => {
  try {
    const { vender, uniqueId } = req.body;
    const condition = {
      where: {
        vender,
        uniqueId,
      },
    };

    const isExistentUser: User | null = await User.findOne(condition);
    const user: User = isExistentUser
      ? isExistentUser
      : await User.create(condition.where);
    const JWT = makeJwt(user);
    const statusCode = isExistentUser ? 200 : 201;
    res.setHeader("authorization", JWT);
    // const seat: Seat | null = await SeatController.haveSeat(JWT);
    return res.sendStatus(statusCode);
  } catch (error) {
    return res.sendStatus(500);
  }
};
