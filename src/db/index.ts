import { Sequelize, Model, DataTypes } from "sequelize";
import fs, { exists } from "fs";
import path from "path";
import tunnel from "tunnel-ssh";
import dbConfig from "./config";
import { UserSchema, SeatSchema } from "./schema";
import { User } from "../lib/helper";

class Database {
  private sequelize: Sequelize;
  public UserModel: UserSchema;
  public SeatModel: SeatSchema;

  constructor() {
    const { DB_NAME, DB_PASSWORD, DB_HOST, DB_USER } = dbConfig;

    this.sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
      host: DB_HOST,
      dialect: "mysql",
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
      },
    });

    this.UserModel = this.defineUserModel();
    this.SeatModel = this.defineSeatModel();

    this.connectDatabase();
  }

  private async connectDatabase(): Promise<void> {
    const { DB_REMOTE_HOST, DB_REMOTE_USERNAME, DB_PEM } = dbConfig;

    // if (process.env.NODE_ENV === "local") {
    //   const cCA: Buffer = fs.readFileSync(path.join(__dirname, DB_PEM));
    //   const tunnelSshConfig: Object = {
    //     username: DB_REMOTE_USERNAME,
    //     host: DB_REMOTE_HOST,
    //     port: 22,
    //     dstHost: "127.0.0.1",
    //     dstPort: 3306,
    //     localHost: "127.0.0.1",
    //     localPort: 3306,
    //     privateKey: cCA,
    //   };

    //   await tunnel(tunnelSshConfig, (error: Error, server: any): void => {
    //     if (error) {
    //       console.error("[SSH Tunnel] FAIL :", error);
    //       throw new Error("SSH Tunneling fail");
    //     }
    //   });
    // }
    console.log("[SSH Tunnel] SUCCESS");
    await this.testConnect();
    await this.syncModel();
  }

  private async testConnect(): Promise<void> {
    try {
      await this.sequelize.authenticate();
      console.log("[Sequelize] Connection test SUCCESS");
    } catch (error) {
      console.error("[Sequelize] Connection test FAIL :", error);
      process.exit(1);
    }
  }
  private defineUserModel(): UserSchema {
    return UserSchema.init(
      // TODO: schema가 전혀 강제를 못해주고 있는 것 같다. 뭘 잘못 한거지?
      {
        id: {
          type: DataTypes.INTEGER.UNSIGNED,
          autoIncrement: true,
          primaryKey: true,
        },
        nickname: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        vender: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        uniqueId: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        loginStatus: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
      },
      {
        tableName: "User",
        sequelize: this.sequelize,
      }
    );
  }
  private defineSeatModel(): SeatSchema {
    // TODO: defineUserModel의 TODO와 같음
    return SeatSchema.init(
      {
        id: {
          type: DataTypes.INTEGER.UNSIGNED,
          autoIncrement: true,
          primaryKey: true,
        },
        address: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        geoLocation: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        leaveAt: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        userId: {
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: false,
        },
        havePlug: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
        },
        seatStatus: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        descriptionGiver: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        descriptionSeat: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        descriptionWorktime: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        thumbnail: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        bookUserId: {
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: true,
        },
        bookedAt: {
          type: DataTypes.STRING,
          allowNull: true,
        },
      },
      {
        tableName: "Seat",
        sequelize: this.sequelize,
      }
    );
  }

  private async syncModel(): Promise<void> {
    try {
      await this.UserModel.sync({ force: false });
      await this.SeatModel.sync({ force: false });
      console.log("[Sequelize] Model sync SUCCESS");
    } catch (error) {
      console.error("[Sequelize] Model sync FAIl :", error);
      process.exit(1);
    }
  }
}

const DB: Database = new Database();
export default DB;
