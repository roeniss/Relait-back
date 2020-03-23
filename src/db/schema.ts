import { Sequelize, Model, DataTypes } from "sequelize";

export class User extends Model {
  public id!: number;

  public vender!: number;
  public uniqueId!: string;
  public userStatus!: number;
  public withdrawnAt!: Date;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public static initialize(sequelize: Sequelize) {
    this.init(
      {
        vender: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        uniqueId: {
          type: DataTypes.STRING,
          allowNull: true,
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
      },
      {
        sequelize: sequelize,
        tableName: "User",
      }
    );
  }
}

export class Seat extends Model {
  public id!: number;

  public giverId!: number;
  public leaveAt!: string;
  public descriptionGiver!: string;
  public seatStatus!: number;

  public cafeName!: string;
  public spaceKakaoMapId!: string;
  public address!: string;
  public geoLocation!: string;
  public havePlug!: boolean;
  public thumbnailUrl!: string;
  public descriptionSeat!: string;
  public descriptionCloseTime!: string;

  public takerId!: number;
  public takenAt!: Date;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public static initialize(sequelize: Sequelize) {
    this.init(
      {
        giverId: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        leaveAt: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        descriptionGiver: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        seatStatus: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },

        cafeName: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        spaceKakaoMapId: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        address: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        geoLocation: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        havePlug: {
          type: DataTypes.BOOLEAN,
          allowNull: true,
        },
        thumbnailUrl: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        descriptionSeat: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        descriptionCloseTime: {
          type: DataTypes.STRING,
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
      },
      {
        sequelize: sequelize,
        tableName: "Seat",
      }
    );
  }
}
