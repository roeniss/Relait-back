import * as express from "express";
import { User } from "../db";
import { makeJwt, Jwt } from "../lib/helper";

//
// (1) input validation
// (2) login || signup
// (3) send token to client
//
export const login = async (req: express.Request, res: express.Response) => {
  try {
    const body = req.body;
    if (!body.vender || !body.uniqueId) return res.sendStatus(422);

    // query
    const condition = {
      where: {
        vender: body.vender,
        uniqueId: body.uniqueId,
      },
    };
    const targetUser: User =
      (await User.findOne(condition)) || (await User.create(condition));

    const JWT: Jwt = makeJwt(targetUser);
    // const seat: Seat | null = await SeatController.haveSeat(JWT);
    return res.status(200).json({ JWT /* , SeatStatus */ });
  } catch (error) {
    return res.sendStatus(500);
  }
};
