const { getLogger } = require("../core/logging");
const ServiceError = require("../core/ServiceError");
const leaderRepository = require("../repository/leader");

const debugLog = (message, meta = {}) => {
  if (!this.logger) this.logger = getLogger();
  this.logger.debug(message, meta);
};

/**
 * Get all leaders
 *
 * @returns {Promise<{items: Array, count: number}>} list of leaders and total count
 */
const getAll = async () => {
  debugLog("Fetching all leaders");
  const items = await leaderRepository.findAll();
  const count = await leaderRepository.findCount();
  return { items, count };
};

/**
 * Get leader by id
 *
 * @param {number} id the id of the leader
 *
 * @returns {Promise<object>} the leader
 *
 * @throws {ServiceError.notFound} if the leader is not found
 */
const getById = async (id) => {
  debugLog(`Fetching leader with id ${id}`);
  const leader = await leaderRepository.findById(id);
  if (!leader) {
    throw new ServiceError.notFound(`Leader with id ${id} not found`, { id });
  }
  return leader;
};

/**
 * Create a new leader
 *
 * @param {object} leader The leader to create
 * @param {number} leader.personId The id of the person of the leader
 * @param {number} leader.groupId The id of the group of the leader
 * @param {number} leader.yearId The id of the year of the leader
 *
 * @returns {Promise<object>} the created leader
 */
const create = async (leader) => {
  debugLog("Creating new leader", leader);
  const id = await leaderRepository.create(leader);
  return getById(id);
};

/**
 * Update a leader by id
 *
 * @param {number} id The id of the leader to update
 * @param {object} leader The leader to update
 * @param {number} leader.personId The id of the person of the leader
 * @param {number} leader.groupId The id of the group of the leader
 * @param {number} leader.yearId The id of the year of the leader
 *
 * @returns {Promise<object>} the updated leader
 *
 * @throws {ServiceError.notFound} if the leader is not found
 */
const updateById = async (id, updatedLeaderData) => {
  debugLog(`Updating leader with id ${id}`, updatedLeaderData);
  await leaderRepository.updateById(id, updatedLeaderData);
  return getById(id);
};

/**
 * Delete a leader by id
 *
 * @param {number} id The id of the leader to delete
 *
 * @throws {ServiceError.notFound} if the leader is not found
 */
const deleteById = async (id) => {
  debugLog(`Deleting leader with id ${id}`);
  const deleted = await leaderRepository.deleteById(id);
  if (!deleted) {
    throw new ServiceError.notFound(`Leader with id ${id} not found`, { id });
  }
};

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};
