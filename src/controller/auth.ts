import * as express from "express";
import { User } from "../db";
import { makeJwt, Jwt } from "../lib/helper";

//
// (1) login || signup
// (2) send token to client
//
export const login = async (req: express.Request, res: express.Response) => {
  try {
    const body = req.body;
    const condition = {
      where: {
        vender: body.vender,
        uniqueId: body.uniqueId,
      },
    };

    let isExistentUser: User | null = await User.findOne(condition);
    const user: User = isExistentUser
      ? isExistentUser
      : await User.create(condition.where);
    const JWT: Jwt = makeJwt(user);
    const statusCode = isExistentUser ? 200 : 201;
    // const seat: Seat | null = await SeatController.haveSeat(JWT);
    return res.status(statusCode).json({ JWT /* , SeatStatus */ });
  } catch (error) {
    return res.sendStatus(500);
  }
};
