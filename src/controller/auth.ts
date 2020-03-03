// TODO: JWT는 나중에 파일 분리
import * as jwt from "jsonwebtoken";
import DB from "../db";

const mockUser = { vender: "1", uniqueId: "1234567890" };

const AuthController = {
  login: async (vender: string, uniqueId: string): Promise<string> => {
    // TODO: 인풋 유효성 검증..?
    const users = await DB.findUser(vender, uniqueId);

    // TODO: process.env 별도 분리
    const JWT_SECRET = process.env.JWT_SECRET || "";
    if (!!users.length) {
      // 기존 유저 --> 토큰 제공
      const user = users[0];
      const { id, nickname } = user;
      const payload = { id, nickname };
      const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "14d" });
      return token;
    } else {
      return "";
    }
  },
  signup: async (vender: string, uniqueId: string, nickname: string): Promise<string> => {
    const user = await DB.createUser(vender, uniqueId, nickname);
    const { id /*,nickname*/ } = user;
    // TODO: process.env 별도 분리
    const JWT_SECRET = process.env.JWT_SECRET || "";
    const payload = { id, nickname };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "14d" });
    return token;
  },
};

export default AuthController;
