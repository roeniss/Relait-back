import DB from "../db";
import { User, makeJwt, Jwt } from "../lib/helper";
import { UserSchema } from "../db/schema";

export const login = async (user: User): Promise<Jwt | null> => {
  try {
    const condition: object = {
      where: {
        vender: user.vender,
        uniqueId: user.uniqueId,
      },
    };
    // TODO: 이거 왜 type check 안돼? (findAll)
    const loginUser: UserSchema | null = await DB.UserModel.findOne(condition);
    if (!loginUser) return null;

    // If the user exist, then:
    const token: Jwt = makeJwt(loginUser);
    return token;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const signup = async (user: User): Promise<Jwt | null> => {
  try {
    const condition = {
      vender: user.vender,
      uniqueId: user.uniqueId,
      nickname: user.nickname || "익명",
    };
    // TODO: create에 대하여, 위 findAll과 같은 물음
    const newUser: UserSchema = await DB.UserModel.create(condition);
    const token: Jwt = makeJwt(newUser);
    return token;
  } catch (error) {
    console.error(error);
    return null;
  }
};
