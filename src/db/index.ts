// TS reference : https://github.com/thrymgjol/typescript-sequelize-example/blob/master/app/models/index.ts

import { Sequelize, Options } from "sequelize";
import * as dbConfig from "./config";
import { User, SeatSchema } from "./schema";
const sequelize: Sequelize = new Sequelize(
  dbConfig.DB_NAME,
  dbConfig.DB_USER,
  dbConfig.DB_PASSWORD,
  <Options>dbConfig.dbOptions
);

const models: any[] = [User];
models.forEach((model) => model.initialize(sequelize));

if (process.env.NODE_ENV === "prod") {
  sequelize.sync();
} else {
  sequelize.sync(/* { force: true } */);
}

export { sequelize, User };

// TODO: 아래 검토 요망

// class Database {
//   private sequelize: Sequelize;
//   public UserModel: UserSchema;
//   public SeatModel: SeatSchema;

//   constructor() {
//     const { DB_NAME, DB_PASSWORD, DB_HOST, DB_USER } = dbConfig;
//     this.sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
//       host: DB_HOST,
//       dialect: "mysql",
//       pool: {
//         max: 5,
//         min: 0,
//         acquire: 30000,
//         idle: 10000,
//       },
//     });

//     this.UserModel = UserSchema;
//     this.SeatModel = this.defineSeatModel();

//     this.connectToDatabase();
//   }

//   private async connectToDatabase(): Promise<void> {
//     console.log("[SSH Tunnel] SUCCESS");
//     await this.testConnection();
//     await this.syncModel();
//   }

//   private async testConnection(): Promise<void> {
//     try {
//       await this.sequelize.authenticate();
//       console.log("[Sequelize] Connection test SUCCESS");
//     } catch (error) {
//       console.error("[Sequelize] Connection test FAIL :", error);
//       process.exit(1);
//     }
//   }
//   private async syncModel(): Promise<void> {
//     try {
//       await this.UserModel.sync({ alter: true, force: true });
//       await this.SeatModel.sync({ alter: true, force: true });
//       console.log("[Sequelize] Model sync SUCCESS");
//     } catch (error) {
//       console.error("[Sequelize] Model sync FAIl :", error);
//       process.exit(1);
//     }
//   }

//   private defineSeatModel(): SeatSchema {
//     // TODO: defineUserModel의 TODO와 같음
//     return SeatSchema.init(
//       {
//         id: {
//           type: DataTypes.INTEGER.UNSIGNED,
//           autoIncrement: true,
//           primaryKey: true,
//         },
//         address: {
//           type: DataTypes.STRING,
//           allowNull: false,
//         },
//         geoLocation: {
//           type: DataTypes.STRING,
//           allowNull: false,
//         },
//         leaveAt: {
//           type: DataTypes.DATE,
//           allowNull: false,
//         },
//         userId: {
//           type: DataTypes.INTEGER.UNSIGNED,
//           allowNull: false,
//         },
//         havePlug: {
//           type: DataTypes.BOOLEAN,
//           allowNull: false,
//         },
//         seatStatus: {
//           type: DataTypes.INTEGER,
//           allowNull: false,
//         },
//         descriptionGiver: {
//           type: DataTypes.STRING,
//           allowNull: false,
//         },
//         descriptionSeat: {
//           type: DataTypes.STRING,
//           allowNull: false,
//         },
//         descriptionWorktime: {
//           type: DataTypes.STRING,
//           allowNull: false,
//         },
//         thumbnail: {
//           type: DataTypes.STRING,
//           allowNull: false,
//         },
//         bookUserId: {
//           type: DataTypes.INTEGER.UNSIGNED,
//           allowNull: true,
//         },
//         bookedAt: {
//           type: DataTypes.STRING,
//           allowNull: true,
//         },
//       },
//       {
//         tableName: "Seat",
//         sequelize: this.sequelize,
//       }
//     );
//   }
// }

// const DB: Database = new Database();
// export default DB;
