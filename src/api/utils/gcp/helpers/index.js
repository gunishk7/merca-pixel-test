const { splitEvery } = require('ramda');
const { tableInstance, insertService } = require('../services');
const { asyncForEach, devLog } = require('../../../global');

/**
 * Insert Rows in BigQuery Table
 * @param {Object} Options
 * @returns {Promise<void>}
 */
const insert = async ({
  projectId,
  datasetId,
  tableId,
  rows = [],
  batchSize = 1000,
}) => {
  const TableInstance = tableInstance({ projectId, datasetId, tableId });
  const chunked = splitEvery(batchSize, rows);
  await asyncForEach(chunked, async (chunk) => {
    await insertService({
      TableInstance,
      rows: chunk,
    });
  });
  devLog(`BigQuery Insert - ${projectId}.${datasetId}.${tableId}`);
};

module.exports = {
  insert,
};
