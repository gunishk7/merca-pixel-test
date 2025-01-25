const { bigQueryInstance } = require('../client');

/**
 * BigQuery Table Instance
 * @param {Object} options
 * @returns {Table} Table Instance
 */
const tableInstance = ({ projectId, datasetId, tableId }) => bigQueryInstance(projectId)
  .dataset(datasetId).table(tableId);

/**
 * BigQuery Insert Job
 * @param {Object} options
 * @returns {Promise<InsertRowsResponse>} InsertRowsResponse
 */
const insertService = ({ TableInstance, rows }) => TableInstance.insert(rows);

module.exports = {
  tableInstance,
  insertService,
};
