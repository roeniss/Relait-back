import * as jwt from "jsonwebtoken";
import { User } from "../db";

/**
 * Descypt JSON web token using string, then return object if valid otherwise null, which mean token invalid
 * (Invalid token example: modified, expired)
 *
 */
export const decryptJwt = (jwonwebtoken: Jwt): JwtPayload => {
  try {
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) throw new Error("No JWT Secret");
    const payload: JwtPayload = <JwtPayload>jwt.verify(jwonwebtoken, jwtSecret);
    return payload;
  } catch (error) {
    throw error;
  }
};

// TODO: 이 아래는 확인 요망

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
  const expire = process.env.JWT_EXPIRE;
  if (!expire) throw new Error("No expire date environment variable");
  const token = jwt.sign(payload, jwtSecret, { expiresIn: process.env.JWT_EXPIRE });
  return token;
};

export const isObj = (target: any): boolean => typeof target === "object" && target !== null;

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
