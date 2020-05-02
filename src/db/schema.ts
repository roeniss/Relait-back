import {
  Sequelize,
  Model,
  DataTypes,
  ModelAttributes,
  InitOptions,
  HasManyGetAssociationsMixin,
  HasManyAddAssociationMixin,
  HasManyHasAssociationMixin,
  HasManyCountAssociationsMixin,
  HasManyCreateAssociationMixin,
  Association,
  Options,
} from "sequelize";
import * as dbConfig from "./config";

//-------------------------
//    Initialize Sequelize
//-------------------------

export const sequelize: Sequelize = new Sequelize(
  dbConfig.DB_NAME,
  dbConfig.DB_USER,
  dbConfig.DB_PASSWORD,
  <Options>dbConfig.dbOptions
);

//-------------------------
//    Schemas
//-------------------------

export class User extends Model {
  public id!: number;

  public vender!: number;
  public uniqueId!: string;
  public userStatus!: number;
  public withdrawnAt!: Date | null;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // associations
  public getSeats!: HasManyGetAssociationsMixin<Seat>;
  public addSeat!: HasManyAddAssociationMixin<Seat, number>;
  public hasSeat!: HasManyHasAssociationMixin<Seat, number>;
  public countSeats!: HasManyCountAssociationsMixin;
  public createSeat!: HasManyCreateAssociationMixin<Seat>;

  public readonly seats?: Seat[];
  public static associations: {
    seats: Association<User, Seat>;
  };

  public static initialize(sequelize: Sequelize) {
    const modelAttributes: ModelAttributes = {
      vender: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      uniqueId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      userStatus: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: "1",
      },
      withdrawnAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    };
    const initOptions: InitOptions<User> = {
      sequelize,
      tableName: "User",
      paranoid: true,
    };
    this.init(modelAttributes, initOptions);
  }
}

export class Seat extends Model {
  public id!: number;

  // about giver
  public giverId!: number;
  public leaveAt!: Date;
  public descriptionGiver!: string | null;
  public seatStatus!: number;

  // about cafe
  public cafeName!: string;
  public spaceKakaoMapId!: string;
  public address!: string;
  public geoLocation!: string;
  public havePlug!: boolean;
  public thumbnailUrl!: string | null;
  public descriptionSeat!: string;
  public descriptionCloseTime!: Date | null;

  public takerId!: number | null;
  public takenAt!: Date | null;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public static initialize(sequelize: Sequelize) {
    const modelAttributes: ModelAttributes = {
      giverId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      leaveAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      descriptionGiver: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      seatStatus: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },

      cafeName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      spaceKakaoMapId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      geoLocation: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      havePlug: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      thumbnailUrl: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      descriptionSeat: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      descriptionCloseTime: {
        type: DataTypes.DATE,
        allowNull: true,
      },

      takerId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      takenAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    };
    const initOptions: InitOptions<Seat> = {
      sequelize,
      tableName: "Seat",
      paranoid: true,
    };
    this.init(modelAttributes, initOptions);
  }
}

//-------------------------
//    Set Relations
//-------------------------

const models: Array<any> = [User, Seat];
models.forEach((model) => model.initialize(sequelize));

User.hasMany(Seat, {
  sourceKey: "id",
  foreignKey: "giverId",
  as: "seats",
});
