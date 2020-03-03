const { Sequelize, DataTypes } = require("sequelize");

export const UserModelSchema = {
  nickname: {
    type: DataTypes.STRING,
  },
  vender: {
    type: DataTypes.INTEGER,
  },
  uniqueId: {
    type: DataTypes.STRING,
  },
  loginStatus: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
  },
};

export const SeatModelSchema = {
  location: {
    type: DataTypes.STRING,
  },
  leaveAt: {
    type: DataTypes.DATE,
  },
  userId: {
    type: DataTypes.INTEGER,
  },
  havePlug: {
    type: DataTypes.BOOLEAN,
  },
  seatStatus: {
    type: DataTypes.INTEGER,
  },
  reserveId: {
    type: DataTypes.INTEGER,
  },
  description: {
    type: DataTypes.TEXT,
  },
};

export const BookModelSchema = {
  bookStatus: {
    type: DataTypes.INTEGER,
  },
  seatId: {
    type: DataTypes.INTEGER,
  },
  bookUserId: {
    type: DataTypes.INTEGER,
  },
  bookedAt: {
    type: DataTypes.DATE,
  },
};
