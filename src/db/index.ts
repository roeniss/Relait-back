import { Sequelize, Model } from "sequelize";
import fs from "fs";
import path from "path";
import tunnel from "tunnel-ssh";
import { UserModelSchema, SeatModelSchema, BookModelSchema } from "./model";

class Database {
  private sequelize: Sequelize;
  private UserModel: any; // TODO: Model로 해야될 것 같은데 에러남
  private SeatModel: any;
  private BookModel: any;

  constructor() {
    const DB_NAME = process.env.DB_NAME || "db";
    const DB_PASSWORD = process.env.DB_PASSWORD || "";
    const DB_REMOTE_HOST = process.env.DB_REMOTE_HOST || "localhost";
    const DB_REMOTE_USERNAME = process.env.DB_REMOTE_USERNAME || "ubuntu";
    const DB_USER = process.env.DB_USER || "root";
    const PEM = process.env.DB_PEM || "";
    const cCA = fs.readFileSync(path.join(__dirname, PEM));

    this.sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
      host: "localhost",
      dialect: "mysql",
    });

    this.UserModel = this.sequelize.define("User", UserModelSchema);
    this.SeatModel = this.sequelize.define("Seat", SeatModelSchema);
    this.BookModel = this.sequelize.define("Book", BookModelSchema);

    if (process.env.NODE_ENV === "local") {
      const tunnelSshConfig = {
        username: DB_REMOTE_USERNAME,
        host: DB_REMOTE_HOST,
        port: 22,
        dstHost: "127.0.0.1",
        dstPort: 3306,
        localHost: "127.0.0.1",
        localPort: 3306,
        privateKey: cCA,
      };

      tunnel(tunnelSshConfig, async (error: Error, server: any) => {
        if (error) {
          console.error("[SSH Tunnel] FAIL :", error);
        } else {
          console.log("[SSH Tunnel] SUCCESS");
          await this.testConnect();
          await this.syncModel();
        }
      });
    } else {
      console.log("[SSH Tunnel] SUCCESS");
      (async () => {
        await this.testConnect();
        await this.syncModel();
      })();
    }
  }

  private async testConnect() {
    try {
      await this.sequelize.authenticate();
      console.log("[Sequelize] Connection SUCCESS");
    } catch (error) {
      console.error("[Sequelize] Connection FAIL :", error);
    }
  }

  private async syncModel() {
    try {
      await this.UserModel.sync();
      await this.SeatModel.sync();
      await this.BookModel.sync();

      console.log("[Sequelize] Model sync SUCCESS");
    } catch (error) {
      console.error("[Sequelize] Model sync FAIl :", error);
    }
  }

  public async findUser(vender: string, uniqueId: string) {
    try {
      const user = await this.UserModel.findAll({
        where: {
          vender,
          uniqueId,
        },
      });
      return user;
    } catch (error) {
      throw new Error(error);
    }
  }
  public async createUser(vender: string, uniqueId: string, nickname: string) {
    try {
      const user = await this.UserModel.create({
        vender,
        uniqueId,
        nickname,
      });
      return user;
    } catch (error) {
      throw new Error(error);
    }
  }
}

const DB = new Database();
export default DB;
