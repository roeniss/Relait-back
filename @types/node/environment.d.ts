export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "local" | "development" | "production";
    }
  }
}
