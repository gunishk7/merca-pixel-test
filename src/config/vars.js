const path = require('path');

require('dotenv-safe').config({
  path: path.join(__dirname, '../../.env'),
  sample: path.join(__dirname, '../../.env.example'),
});

module.exports = {
  selfUrl: process.env.SELF,
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  secret: process.env.SECRET,
  logs: process.env.NODE_ENV === 'production' ? 'combined' : 'dev',
  sentry:
    process.env.NODE_ENV === 'production'
      ? process.env.SENTRY
      : process.env.SENTRY_DEV,
};
