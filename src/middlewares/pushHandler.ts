export interface PUSH_TYPE {
  type: Number;
}

enum PUSHTYPE {
  TAKE,
  CANCEL,
  ARRIVAl,
  REMIND, // cron?
}
// reference: https://luckyyowu.tistory.com/401 [TypeScript TIPS] Interface 를 써야할 때와 Type 을 써야할 때

const sendPushNotification = (pushType: PUSH_TYPE, to: number) => {};
