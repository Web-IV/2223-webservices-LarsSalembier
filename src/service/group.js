const { getLogger } = require("../core/logging");
const groupRepository = require("../repository/group");

const debugLog = (message, meta = {}) => {
  if (!this.logger) this.logger = getLogger();
  this.logger.debug(message, meta);
};

/**
 * Get all groups
 *
 * @returns {Promise<{items: Array, count: number}>} list of groups and total count
 */
const getAll = async () => {
  debugLog("Fetching all groups");
  const items = await groupRepository.findAll();
  const count = await groupRepository.findCount();
  return { items, count };
};

/**
 * Get group by id
 *
 * @param {number} id the id of the group
 *
 * @returns {Promise<object>} the group
 */
const getById = (id) => {
  debugLog(`Fetching group with id ${id}`);
  return groupRepository.findById(id);
};

/**
 * Create a new group
 *
 * @param {object} group The group to create
 * @param {string} group.name The name of the group
 * @param {string} group.color The color of the group
 * @param {string} group.mascotName The mascot name of the group
 * @param {string} group.targetAudience The target audience of the group
 *
 * @returns {Promise<object>} the newly created group
 */
const create = async ({ name, color, mascotName, targetAudience }) => {
  const newGroup = { name, color, mascotName, targetAudience };
  debugLog(`Creating new group with name ${name} and color ${color}`);
  const id = await groupRepository.create(newGroup);
  return getById(id);
};

/**
 * Update a group by id
 *
 * @param {number} id the id of the group
 * @param {object} group the group to update
 * @param {string} group.name the name of the group
 * @param {string} group.color the color of the group
 * @param {string} group.mascotName the mascot name of the group
 * @param {string} group.targetAudience the target audience of the group
 *
 * @returns {Promise<object>} the updated group
 */
const updateById = async (id, { name, color, mascotName, targetAudience }) => {
  const updatedGroup = { name, color, mascotName, targetAudience };
  debugLog(`Updating group with id ${id} with name ${name} and color ${color}`);
  await groupRepository.updateById(id, updatedGroup);
  return getById(id);
};

/**
 * Delete a group by id
 *
 * @param {number} id the id of the group
 */
const deleteById = async (id) => {
  debugLog(`Deleting group with id ${id}`);
  await groupRepository.deleteById(id);
};

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};
