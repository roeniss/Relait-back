import * as jwt from "jsonwebtoken";
import { User } from "../db";

// for type validation
export interface Invaild {
  errorMessage: string;
}

export interface JwtPayload {
  id: number;
  userStatus: number;
  iat?: number;
  exp?: number;
}

export type Jwt = string;

export const isDev = (env: string | undefined): boolean => (!env || env !== "production" ? true : false);

export const makeJwt = (user: User): Jwt => {
  const payload: JwtPayload = {
    id: user.id,
    userStatus: user.userStatus,
  };
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) throw new Error("No JWT Secret");
  const token = jwt.sign(payload, jwtSecret, { expiresIn: process.env.JWT_EXPIRE || "14d" });
  return token;
};

export const isObj = (target: any): boolean => typeof target === "object" && target !== null;

export const getDataFromJwt = (token: Jwt): JwtPayload | null => {
  try {
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) throw new Error("No JWT Secret");
    const resultToken: string | object = jwt.verify(token, jwtSecret);
    if (!isObj(resultToken)) return null;
    const payload = <JwtPayload>resultToken;
    const curTime = new Date().getDate() / 1000;
    if (payload.exp && payload.exp - curTime > 0) return payload;
    else null;
  } catch (error) {
    // console.error(error);
    return null;
  }
  return null;
};
interface ErrorObject {
  name: string;
  message: string;
  stack?: string;
}
export const errorToString = (value: Error | string) => {
  if (value instanceof Error) {
    const container: ErrorObject = { name: "", message: "", stack: "" };
    container["name"] = value.name;
    container["message"] = value.message;
    container["stack"] = value.stack || "";
    return JSON.stringify(container);
  } else {
    value;
  }
};

export const isNumber = (value: string | number): boolean => {
  return value != null && value !== "" && !isNaN(Number(value.toString()));
};

export interface Seat {
  string: number;
}
