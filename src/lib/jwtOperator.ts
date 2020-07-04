import * as jwt from "jsonwebtoken";
import { User } from "../db";
import { InvalidTokenType, EmptyTokenValue } from "./errorTypes";
import { JWTPayload } from "../../@types/JwtPayload";

// Possible error types:
// jwt : JsonWebTokenError, NotBeforeError, TokenExpiredError;
// custom : InvalidTokenType, EmptyTokenValue
const decryptBearerToken = (token: string) => {
  try {
    const value = isValidBearer(token);
    const JWT_SECRET = <string>process.env.JWT_SECRET;
    return <Partial<User>>jwt.verify(value, JWT_SECRET);
  } catch (error) {
    throw error;
  }
};

const encryptBearerToken = (user: User): JWTPayload => {
  const payload: Partial<User> = {
    id: user.id,
    userStatus: user.userStatus,
  };
  const JWT_SECRET = <string>process.env.JWT_SECRET;
  const JWT_EXPIRE = <string>process.env.JWT_EXPIRE;
  const options: jwt.SignOptions = {
    expiresIn: JWT_EXPIRE,
  };
  return { token: jwt.sign(payload, JWT_SECRET, options) };
};

export default { decryptBearerToken, encryptBearerToken };

const isValidBearer = (token: string) => {
  const [type, value] = token.split(" ");
  if (type.toLowerCase() !== "bearer") throw new InvalidTokenType();
  if (!value) throw new EmptyTokenValue();
  return value;
};
