const { getLogger } = require("../core/logging");
const yearRepository = require("../repository/year");

const debugLog = (message, meta = {}) => {
  if (!this.logger) this.logger = getLogger();
  this.logger.debug(message, meta);
};

/**
 * Get all years
 *
 * @returns {Promise<{items: Array, count: number}>} list of years and total count
 */
const getAll = async () => {
  debugLog("Fetching all years");
  const items = await yearRepository.findAll();
  const count = await yearRepository.findCount();
  return { items, count };
};

/**
 * Get year by id
 *
 * @param {number} id the id of the year
 *
 * @returns {Promise<object>} the year
 */
const getById = (id) => {
  debugLog(`Fetching year with id ${id}`);
  return yearRepository.findById(id);
};

/**
 * Create a new year
 *
 * @param {object} year The year to create
 * @param {string} year.startDate The start date of the year
 * @param {string} year.endDate The end date of the year
 *
 * @returns {Promise<object>} the newly created year
 */
const create = async ({ startDate, endDate }) => {
  const newYear = { startDate, endDate };
  debugLog(
    `Creating new year with startDate ${startDate} and endDate ${endDate}`
  );
  const id = await yearRepository.create(newYear);
  return getById(id);
};

/**
 * Update an year by id
 *
 * @param {number} id the id of the year
 * @param {object} year the year to update
 * @param {string} year.startDate the start date of the year
 * @param {string} year.endDate the end date of the year
 *
 * @returns {Promise<object>} the updated year
 */
const updateById = async (id, { startDate, endDate }) => {
  const updatedYear = { startDate, endDate };
  debugLog(
    `Updating year with id ${id} with startDate ${startDate} and endDate ${endDate}`
  );
  await yearRepository.updateById(id, updatedYear);
  return getById(id);
};

/**
 * Delete an year by id
 *
 * @param {number} id the id of the year
 */
const deleteById = async (id) => {
  debugLog(`Deleting year with id ${id}`);
  await yearRepository.deleteById(id);
};

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};
