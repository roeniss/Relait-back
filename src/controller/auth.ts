import * as express from "express";
import { User } from "../db";
import { jwtOperator } from "../lib";
import { FindOrCreateOptions, DestroyOptions, WhereOptions } from "sequelize";
import { Jwt } from "../../@types/JWT";

//
// (1) login || signup
// (2) add token to headers
// (3) return response to client
//
export const login: express.RequestHandler = async (req, res, next) => {
  const { vendor, uniqueId } = req.body;
  const whereOptions: WhereOptions & Partial<User> = {
    uniqueId,
  };
  if (vendor) whereOptions.vendor = vendor;
  // if (vendor) whereOptions.vendor = vendor;
  const condition: FindOrCreateOptions = {
    where: whereOptions,
  };
  try {
    const [user, created] = await User.findOrCreate(condition);
    const token: Jwt = jwtOperator.encryptBearerToken(user);
    // res.setHeader("authorization", JWT);
    const statusCode = created ? 201 : 200;
    return res.status(statusCode).json(token);
  } catch (e) {
    return next(e);
  }
};

// ----------------- below: for debug

//
// Delete current user from database (for Debugging)
// 204: No content (well deleted)
// 404: Not found
//
export const deleteUser = async (
  _req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const { id } = res.locals;
  const options: DestroyOptions = {
    where: { id },
  };

  // 토큰 내용을 저장
  try {
    const deletedNum = await User.destroy(options);
    if (deletedNum === 0) return res.sendStatus(404);
    return res.sendStatus(204);
  } catch (e) {
    return next(e);
  }
};
