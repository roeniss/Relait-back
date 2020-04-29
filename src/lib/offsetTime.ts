import moment from "moment-timezone";
// moment.tz.setDefault("Asia/Seoul");
const KOREAN_OFFSET = 9;
const SEQUELIZE_FORMAT = "YYYY-MM-DD HH:mm:ss.SSS";

export const datetimeBeforeMin = (minutes: number): string => {
  const m: moment.Moment = moment();
  m.add(minutes, "m");
  return m.format(SEQUELIZE_FORMAT);
};

export const midnightShiftedFor = (days: number): string => {
  const m: moment.Moment = moment();
  m.hour(0);
  m.minute(0);
  m.second(0);
  m.add(days, "d");
  return m.format(SEQUELIZE_FORMAT);
};
