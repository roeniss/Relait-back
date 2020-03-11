import { Sequelize, Model, DataTypes } from "sequelize";

export class User extends Model {
  public id!: number;

  public vender!: number;
  public uniqueId!: string;
  public userStatus!: number;
  public readonly withdrawnAt!: Date;

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

// TODO: 이 아래는 확인 요망
export class SeatSchema extends Model {
  public id!: number;

  public address!: string;
  public geoLocation!: string;
  public leaveAt!: Date;
  public userId!: number;
  public havePlug!: Boolean;
  public seatStatus!: number;

  public descriptionGiver!: string;
  public descriptionSeat!: string;
  public descriptionWorktime!: string;
  public thumbnail!: string;

  public bookUserId!: number | null;
  public bookedAt!: Date | null;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}
