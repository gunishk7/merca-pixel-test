const Sentry = require('@sentry/node');
const { env } = require('../../../config/vars');

const catchException = (error) => {
  if (env === 'production') {
    return Sentry.captureException(error);
  }
  return console.log(error);
};

module.exports = {
  catchException,
};
