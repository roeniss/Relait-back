export {};

declare global {
  namespace NodeJS {
    interface IProcessEnv {
      /**
       * Environment variables used in current app
       */
      NODE_ENV?: string;
      PEM?: string;
      DB_NAME?: string;
      DB_PASSWORD?: string;
      DB_HOST?: string;
      DB_DIALECT?: string;
      DB_REMOTE_HOST?: string;
      DB_REMOTE_USERNAME?: string;
      DB_USER?: string;
      JWT_SECRET?: string;
      PORT?: string;
    }
    interface ProcessEnv extends IProcessEnv {}
  }
}
