module.exports = {
  apps : [{
    script: 'node_modules/.bin/ts-node src/www.ts',
    name: 'API',
    watch: 'src',
    watch_delay: 1000,
    log_date_format: 'YYYY-MM-DD HH:mm Z',
    error_file: 'log/pm2.error.log',
    out_file: 'log/pm2.out.log',
    env: {
        'NODE_ENV': 'development'
    }
  }]
};
