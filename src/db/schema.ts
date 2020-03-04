const { Model } = require("sequelize");

export const enum Vender {
  "Kakao",
  "Email",
  "Naver",
}
export const enum LoginStatus {
  "EmailNotChecked",
  "Active",
  "Withdrawed",
  "Deactive",
}
export const enum SeatStatus {
  "Deactive",
  "Available",
  "Reserved",
}
export const enum BookStatus {
  "Deactive",
  "Available",
  "Reserved",
}

export class UserSchema extends Model {
  public id!: number;

  public nickname!: string | null; // '!' == Definite Assignment Assertions
  public vender!: Vender;
  public uniqueId!: string;
  public loginStatus!: LoginStatus;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export class SeatSchema extends Model {
  public id!: number;

  public address!: string;
  public geoLocation!: string;
  public leaveAt!: Date;
  public userId!: number;
  public havePlug!: Boolean;
  public seatStatus!: SeatStatus;

  public descriptionGiver!: string;
  public descriptionSeat!: string;
  public descriptionWorktime!: string;
  public thumbnail!: string;

  public bookUserId!: number | null;
  public bookedAt!: Date | null;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}
