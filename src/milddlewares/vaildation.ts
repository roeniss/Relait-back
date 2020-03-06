import * as express from "express";
import { isObj, getDataFromJwt } from "../lib/helper";
import fetch, { FetchError, Response as FetchResponse } from "node-fetch";

export const checkLoginInput = (req: express.Request, res: express.Response, next: express.NextFunction): express.Response | void => {
  const data: any = req.body;
  // 422: "이 응답은 서버가 요청을 이해하고 요청 문법도 올바르지만 요청된 지시를 따를 수 없음을 나타냅니다." https://developer.mozilla.org/ko/docs/Web/HTTP/Status/422
  if (!isObj(data)) return res.sendStatus(422);
  else if (!data.uniqueId || !data.vender || Object.getOwnPropertyNames(data).length != 2) return res.sendStatus(422);
  else return next();
};

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
