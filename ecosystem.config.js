module.exports = {
  apps: [
    {
      script: "node_modules/.bin/ts-node src/www.ts",
      name: "app",
      watch: "src",
      watch_delay: 1000,
      log_date_format: "YYYY-MM-DD HH:mm Z",
      error_file: "log/pm2.error.log",
      out_file: "log/pm2.out.log",
      env_development: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
      },
    },
  ],
};
