export {};

declare global {
  namespace NodeJS {
    interface IProcessEnv {
      // 인텔리센스말곤 딱히 해주는게 없다
      NODE_ENV: string;
      PEM: string;
      DB_NAME: string;
      DB_PASSWORD: string;
      DB_HOST: string;
      DB_DIALECT: string;
      DB_REMOTE_HOST: string;
      DB_REMOTE_USERNAME: string;
      DB_USER: string;
      JWT_SECRET: string;
      PORT: string;
    }
    interface ProcessEnv extends IProcessEnv {}
  }
}
