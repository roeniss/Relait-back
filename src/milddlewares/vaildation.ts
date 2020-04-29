import * as express from "express";
import * as jwt from "jsonwebtoken";
import { decryptJwt, JwtPayload, Jwt } from "../lib/helper";

export const hasValidLoginBody = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): express.Response | void => {
  const { uniqueId, vender } = req.body;
  if (!uniqueId || !vender) return res.sendStatus(422);
  return next();
};

export const isValidUser = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): express.Response | void => {
  const { authorization } = req.headers;
  // 토큰이 없음
  if (!authorization || authorization.split(" ").length < 2)
    return res.sendStatus(401);
  const [type, JWT] = authorization.split(" ");
  // 토큰의 타입이 비정상
  if (type !== "Bearer") return res.sendStatus(401);
  const payload: JwtPayload | null = decryptJwt(JWT);
  // 토큰 자체가 비정상
  if (!payload) return res.sendStatus(401);
  // 토큰은 정상이나 사용자 상태가 권한 부족
  if (Number(payload.userStatus) !== 1) return res.sendStatus(403);

  // 토큰 내용을 저장
  res.locals = payload;
  return next();
};

/** if array, return true only when every elements are null || undefined */
const isNullOrUndefined = (target: any): boolean => {
  if (Array.isArray(target))
    return target.filter(isNullOrUndefined).length === target.length;
  else return target === null || target === undefined;
};

export const haveParamsToCreateSeat = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): express.Response | void => {
  const {
    leaveAt,
    descriptionGiver,
    cafeName,
    spaceKakaoMapId,
    address,
    geoLocation,
    havePlug,
    thumbnailUrl,
    descriptionSeat,
    // descriptionCloseTime, // optional
  } = req.body;
  if (
    !isNullOrUndefined([
      leaveAt,
      descriptionGiver,
      cafeName,
      spaceKakaoMapId,
      address,
      geoLocation,
      havePlug,
      thumbnailUrl,
      descriptionSeat,
      // descriptionCloseTime: optional
    ])
  ) {
    return res.sendStatus(422);
  }
  return next();
};

export const haveParamsToUpdateSeat = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): express.Response | void => {
  const {
    leaveAt,
    descriptionGiver,
    cafeName,
    spaceKakaoMapId,
    address,
    geoLocation,
    havePlug,
    thumbnailUrl,
    descriptionSeat,
    descriptionCloseTime,
  } = req.body;
  if (
    !isNullOrUndefined([
      leaveAt,
      descriptionGiver,
      cafeName,
      spaceKakaoMapId,
      address,
      geoLocation,
      havePlug,
      thumbnailUrl,
      descriptionSeat,
      descriptionCloseTime,
    ])
  ) {
    return res.sendStatus(422);
  }
  return next();
};
