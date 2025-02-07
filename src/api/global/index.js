const R = require('ramda');
const { env } = require('../../config/vars');

/**
 * async function to convert array of request to batches
 * @param {Array} array
 * @param {Function} callback
 */
const asyncForEach = async (array, callback) => {
  for (let i = 0; i < array.length; i += 1) {
    // eslint-disable-next-line no-await-in-loop
    await callback(array[i], i);
  }
};

/**
 * Delay
 * @param {Number} ms milli second
 */
// eslint-disable-next-line no-promise-executor-return
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Returns Table Object
 * @param {String} path
 * @returns {Object} { projectId, datasetId, tableId }
 */
const decodeBigQueryPath = (path) => {
  const [projectId, datasetId, tableId] = R.split('.', path);
  return { projectId, datasetId, tableId };
};

/**
 * Console logs in development
 * @param {String} message
 */
const devLog = (message) => {
  if (env === 'development') {
    console.log(message);
  }
};

module.exports = {
  delay,
  asyncForEach,
  decodeBigQueryPath,
  devLog,
};
