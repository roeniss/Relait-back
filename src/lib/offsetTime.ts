import moment, { Moment } from "moment-timezone";
moment.tz.setDefault("Asia/Seoul");
const KOREAN_OFFSET = 9;
const SEQUELIZE_FORMAT = "YYYY-MM-DD HH:mm:ss.SSS";

export const dateWithOffset = (minutes: number): Date => {
  const m = moment();
  m.add(minutes, "m");
  return m.toDate();
};

export const midnightShiftedFor = (days: number): string => {
  const m = moment();
  m.hour(0);
  m.minute(0);
  m.second(0);
  m.add(days, "d");
  return m.format(SEQUELIZE_FORMAT);
};
