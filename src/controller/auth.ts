import * as express from "express";
import { User } from "../db";
import { makeJwt, JwtPayload, decryptJwt } from "../lib/helper";
import { FindOrCreateOptions, DestroyOptions } from "sequelize";

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

// ----------------- below: for debug

//
// Delete current user from database (for Debugging)
// If not logged in, just return 204.
// 204: No content (no error found)
//
export const deleteUser = async (
  req: express.Request,
  res: express.Response
) => {
  const { authorization } = req.headers;
  // 토큰이 없음
  if (!authorization || authorization.split(" ").length < 2)
    return res.sendStatus(204);
  const [type, JWT] = authorization.split(" ");
  // 토큰의 타입이 비정상
  if (type !== "Bearer") return res.sendStatus(204);
  const payload: JwtPayload | null = decryptJwt(JWT);
  // 토큰 자체가 비정상
  if (!payload) return res.sendStatus(204);

  const options: DestroyOptions = {
    where: { id: payload.id },
  };

  // 토큰 내용을 저장
  try {
    const deletedNum = await User.destroy(options);
    return res.sendStatus(204);
  } catch (e) {
    return res.sendStatus(500);
  }
};
