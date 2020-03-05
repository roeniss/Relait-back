import * as jwt from "jsonwebtoken";
import { UserSchema } from "../db/schema";

// for type validation
export interface Invaild {
  errorMessage: string;
}

// common types
export interface User {
  vender: number;
  uniqueId: string;
  nickname?: string;
}

interface JwtPayload {
  id: number;
  nickname: string;
  iat?: number;
  exp?: number;
}

export type Jwt = string;

export const isDev = (env: string | undefined): boolean => (!env || env !== "production" ? true : false);

export const makeJwt = (user: UserSchema): Jwt => {
  const payload: JwtPayload = {
    id: user.id,
    nickname: user.nickname || "익명",
  };
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) throw new Error("No JWT Secret");
  const token = jwt.sign(payload, jwtSecret, { expiresIn: process.env.JWT_EXPIRE || "14d" });
  return token;
};

const isObj = (target: any): boolean => typeof target === "object" && target !== null;

export const getDataFromJwt = (token: Jwt): JwtPayload | null => {
  try {
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) throw new Error("No JWT Secret");
    const resultToken: string | object = jwt.verify(token, jwtSecret);
    if (!isObj(resultToken)) return null;
    const payload = <JwtPayload>resultToken;
    const curTime = new Date().getDate() / 1000;
    if (payload.exp && payload.exp - curTime > 0) return { id: 1, nickname: "2" };
    else null;
  } catch (error) {
    console.error(error);
    return null;
  }
  return null;
};
