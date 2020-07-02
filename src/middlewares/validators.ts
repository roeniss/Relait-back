import * as express from "express";
import { jwtOperator } from "../lib";

const isValidLoginBody: express.RequestHandler = (req, res, next) => {
  const { uniqueId /* , vendor */ } = req.body; // vendor: optional
  if (!_isAllDefined([uniqueId /* , vendor */])) {
    return res.sendStatus(422);
  }
  return next();
};

const isValidUser: express.RequestHandler = (req, res, next) => {
  const { authorization } = req.headers;
  if (!_isAllDefined(authorization)) {
    return res.sendStatus(401);
  }

  try {
    const payload = jwtOperator.decryptBearerToken(<string>authorization);
    const { userStatus } = payload;
    // 토큰은 정상이나 사용자 상태가 권한 부족
    if (userStatus !== 1) {
      return res.sendStatus(403);
    }

    // 유저 데이터 전달
    res.locals = payload;
  } catch (error) {
    // 불량 토큰
    return res.sendStatus(401);
  }

  return next();
};

export default { isValidLoginBody, isValidUser };

const _isAllDefined = (values: any[] | string | undefined) => {
  if (values === undefined) return undefined;
  if (typeof values === "string") return values !== undefined;
  return values.every((a) => a !== undefined);
};
