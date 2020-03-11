import * as express from "express";
import * as jwt from "jsonwebtoken";
import { isObj, decryptJwt, JwtPayload, Jwt } from "../lib/helper";
import fetch, { FetchError, Response as FetchResponse } from "node-fetch";

export const checkLoginInput = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): express.Response | void => {
  const inputData: any = req.body;
  if (!inputData["uniqueId"] || !inputData["vender"]) return res.sendStatus(422);
  return next();
};

export const checkIsUser = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): express.Response | void => {
  try {
    const inputData: any = req.body;
    if (!inputData["JWT"]) return res.sendStatus(422);
    const payload: JwtPayload = decryptJwt(inputData["JWT"]);
    if (payload.userStatus != 1) return res.sendStatus(403);
    else return next();
  } catch (error) {
    console.log(error);
    if (
      error instanceof jwt.JsonWebTokenError ||
      error instanceof jwt.NotBeforeError ||
      error instanceof jwt.TokenExpiredError
    )
      return res.sendStatus(403);
    else throw error;
  }
};

// TODO: 이 아래는 검토가 필요함
export const checkSignupInput = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): express.Response | void => {
  const data: any = req.body;
  if (!isObj(data)) return res.sendStatus(422);
  else if (!data.uniqueId || !data.vender || !data.nickname || Object.getOwnPropertyNames(data).length != 3)
    return res.sendStatus(422);
  else return next();
};
interface kakaoFetchOptions {
  method: "GET" | "POST" | "DELETE" | "PUT";
  headers?: {
    Authorization: string;
  };
}
export const checkKakaoUniqueId = (uniqueId: string): Promise<boolean> => {
  const kakaoAccessTokenCheckUrl: string = "https://kapi.kakao.com/v1/user/access_token_info";
  const options: kakaoFetchOptions = {
    method: "GET",
    headers: { Authorization: `Bearer ${uniqueId}` },
  };
  return fetch(kakaoAccessTokenCheckUrl, options).then(
    (data: FetchResponse) => true,
    (err: FetchError) => false
  );
};

export const checkDeleteInput = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): express.Response | void => {
  const data: any = req.body;
  if (!isObj(data)) return res.sendStatus(422);
  else if (!data.JWT || Object.getOwnPropertyNames(data).length != 1) return res.sendStatus(422);
  else if (!decryptJwt(data.JWT)) return res.sendStatus(422);
  else return next();
};
