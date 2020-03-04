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
