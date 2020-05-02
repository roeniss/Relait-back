import * as express from "express";
import { User } from "../db";
import { makeJwt } from "../lib/helper";
import { FindOrCreateOptions } from "sequelize";

//
// (1) login || signup
// (2) add token to headers
// (3) return response to client
//
export const login = async (req: express.Request, res: express.Response) => {
  const { vender, uniqueId } = req.body;
  try {
    const condition: FindOrCreateOptions = {
      where: {
        vender,
        uniqueId,
      },
    };

    const [user, created] = await User.findOrCreate(condition);
    const JWT = makeJwt(user);
    res.setHeader("authorization", JWT);
    const statusCode = created ? 201 : 200;
    return res.sendStatus(statusCode);
  } catch (error) {
    return res.sendStatus(500);
  }
};
