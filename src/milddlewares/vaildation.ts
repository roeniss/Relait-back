import * as express from "express";
import { isObj, getDataFromJwt, JwtPayload } from "../lib/helper";
import fetch, { FetchError, Response as FetchResponse } from "node-fetch";

export const checkLoginInput = (req: express.Request, res: express.Response, next: express.NextFunction): express.Response | void => {
  const inputData: any = req.body;
  if (!inputData["uniqueId"] || !inputData["vender"]) return res.sendStatus(422);
  return next();
};

// TODO: 이 아래는 검토가 필요함
export const checkSignupInput = (req: express.Request, res: express.Response, next: express.NextFunction): express.Response | void => {
  const data: any = req.body;
  if (!isObj(data)) return res.sendStatus(422);
  else if (!data.uniqueId || !data.vender || !data.nickname || Object.getOwnPropertyNames(data).length != 3) return res.sendStatus(422);
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

export const checkDeleteInput = (req: express.Request, res: express.Response, next: express.NextFunction): express.Response | void => {
  const data: any = req.body;
  if (!isObj(data)) return res.sendStatus(422);
  else if (!data.JWT || Object.getOwnPropertyNames(data).length != 1) return res.sendStatus(422);
  else if (!getDataFromJwt(data.JWT)) return res.sendStatus(422);
  else return next();
};

export const checkUser = (req: express.Request, res: express.Response, next: express.NextFunction): express.Response | void => {
  const data: any = req.body;
  if (!isObj(data)) return res.sendStatus(422);
  const jwtPayload: JwtPayload | null = getDataFromJwt(data.JWT);
  if (!jwtPayload) return res.sendStatus(422);
  else if (jwtPayload.userStatus != 1) return res.sendStatus(403);
  else return next();
};
