import moment from "moment-timezone";
moment.tz.setDefault("Asia/Seoul");

const offsetTime = (minutes: number): Date => {
  const m = moment();
  m.add(minutes, "m");
  return m.toDate();
};

export { offsetTime, moment };
