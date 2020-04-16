import * as express from "express";
import * as jwt from "jsonwebtoken";
import { decryptJwt, JwtPayload, Jwt } from "../lib/helper";
import fetch, { FetchError, Response as FetchResponse } from "node-fetch";
import { Seat } from "../db";

export const hasValidLoginBody = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): express.Response | void => {
  const { uniqueId, vender } = req.body;
  if (!uniqueId ?? !vender) return res.sendStatus(422);
  return next();
};

export const isValidUser = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): express.Response | void => {
  const { JWT } = req.body;
  if (!JWT) return res.sendStatus(422);

  const payload: JwtPayload | null = decryptJwt(JWT);
  if (!payload || Number(payload.userStatus) !== 1) return res.sendStatus(403);

  return next();
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
    !leaveAt ??
    !descriptionGiver ??
    !cafeName ??
    !spaceKakaoMapId ??
    !address ??
    !geoLocation ??
    !havePlug ??
    !thumbnailUrl ??
    !descriptionSeat
    // descriptionCloseTime: optional
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
    leaveAt === undefined &&
    descriptionGiver === undefined &&
    cafeName === undefined &&
    spaceKakaoMapId === undefined &&
    address === undefined &&
    geoLocation === undefined &&
    havePlug === undefined &&
    thumbnailUrl === undefined &&
    descriptionSeat === undefined &&
    descriptionCloseTime === undefined
  ) {
    return res.sendStatus(422);
  }
  return next();
};
