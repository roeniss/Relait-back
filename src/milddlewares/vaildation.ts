import * as express from "express";
import * as jwt from "jsonwebtoken";
import { isObj, decryptJwt, JwtPayload, Jwt } from "../lib/helper";
import fetch, { FetchError, Response as FetchResponse } from "node-fetch";
import { Seat } from "../db";

export const hasValidLoginBody = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): express.Response | void => {
  const body = req.body;
  if (!body.uniqueId || !body.vender) return res.sendStatus(422);
  return next();
};

export const isValidUser = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): express.Response | void => {
  if (!req.body.JWT) return res.sendStatus(422);

  const payload: JwtPayload | null = decryptJwt(req.body.JWT);
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
    leaveAt === undefined ||
    descriptionGiver === undefined ||
    cafeName === undefined ||
    spaceKakaoMapId === undefined ||
    address === undefined ||
    geoLocation === undefined ||
    havePlug === undefined ||
    thumbnailUrl === undefined ||
    descriptionSeat === undefined
    // || descriptionCloseTime === undefined // optional
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
