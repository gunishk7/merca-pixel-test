const { Storage } = require('@google-cloud/storage');
const { BigQuery } = require('@google-cloud/bigquery');

/**
 * Initialize BigQuery Instance
 * @param {String} projectId
 * @returns BigQuery Instance
 */
const bigQueryInstance = (projectId = 'merca-01-394507') => new BigQuery({ projectId });

/**
 * Initialize Google Storage Instance
 * @param {String} projectId
 * @returns Google Storage Instance
 */
const storageInstance = (projectId = 'merca-01-394507') => new Storage({
  projectId,
  retryOptions: {
    autoRetry: true,
    retryDelayMultiplier: 3,
    totalTimeout: 500,
    maxRetryDelay: 60,
    maxRetries: 5,
  },
});

module.exports = {
  bigQueryInstance,
  storageInstance,
};
