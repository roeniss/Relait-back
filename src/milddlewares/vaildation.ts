import * as express from "express";
import * as jwt from "jsonwebtoken";
import { isObj, decryptJwt, JwtPayload, Jwt } from "../lib/helper";
import fetch, { FetchError, Response as FetchResponse } from "node-fetch";

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
  const inputData = req.body;
  if (!inputData.JWT) return res.sendStatus(422);

  const payload: JwtPayload | null = decryptJwt(inputData.JWT);
  if (!payload || Number(payload.userStatus) !== 1) return res.sendStatus(403);

  return next();
};
